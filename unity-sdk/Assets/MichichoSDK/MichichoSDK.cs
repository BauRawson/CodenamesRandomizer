using System;
using System.Runtime.InteropServices;
using UnityEngine;

/// <summary>
/// Michicho Portal SDK — connects your Unity WebGL game to michicho.com.
///
/// SETUP (do this once per game):
///   1. Create an empty GameObject in your first scene.
///   2. Name it exactly "MichichoSDK".
///   3. Drag this script onto it.
///   Done. The SDK survives scene loads automatically.
///
/// USAGE anywhere in your code:
///   MichichoSDK.ShowInterstitial(ResumeGame);   // show an ad, then call ResumeGame()
///   MichichoSDK.Track("level_complete", "{\"level\":3}");
///   MichichoSDK.UnlockAchievement("first_win");
/// </summary>
public class MichichoSDK : MonoBehaviour
{
    public static MichichoSDK Instance { get; private set; }

    private static Action _onAdComplete;

    // ── JS imports (only compiled in WebGL builds, not in the editor) ─────────
#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")] static extern void Michi_Init();
    [DllImport("__Internal")] static extern void Michi_ShowAd();
    [DllImport("__Internal")] static extern void Michi_Track(string eventName, string json);
    [DllImport("__Internal")] static extern void Michi_Achievement(string id);
#endif

    void Awake()
    {
        // Singleton — only one instance ever exists, survives scene changes
        if (Instance != null) { Destroy(gameObject); return; }
        Instance = this;
        DontDestroyOnLoad(gameObject);

#if UNITY_WEBGL && !UNITY_EDITOR
        Michi_Init();   // start listening for portal → game messages
#endif
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /// <summary>
    /// Show an interstitial ad. Pause your game BEFORE calling this.
    /// onComplete fires when the player dismisses the ad — resume your game there.
    ///
    /// Example:
    ///   Time.timeScale = 0;
    ///   MichichoSDK.ShowInterstitial(() => Time.timeScale = 1);
    /// </summary>
    public static void ShowInterstitial(Action onComplete = null)
    {
        _onAdComplete = onComplete;
#if UNITY_WEBGL && !UNITY_EDITOR
        Michi_ShowAd();
#else
        // In the Unity editor, auto-resolve after half a second so you can test
        Debug.Log("[MichichoSDK] ShowInterstitial — resolving automatically in editor");
        if (Instance != null) Instance.Invoke(nameof(EditorAdDone), 0.5f);
#endif
    }

    /// <summary>
    /// Track a gameplay event. json is optional extra data.
    ///
    /// Example:
    ///   MichichoSDK.Track("level_complete");
    ///   MichichoSDK.Track("score_posted", "{\"score\":4200}");
    /// </summary>
    public static void Track(string eventName, string json = "{}")
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        Michi_Track(eventName, json);
#else
        Debug.Log($"[MichichoSDK] Track: {eventName}  {json}");
#endif
    }

    /// <summary>
    /// Unlock an achievement by its ID string (you define the IDs).
    ///
    /// Example:
    ///   MichichoSDK.UnlockAchievement("first_win");
    /// </summary>
    public static void UnlockAchievement(string id)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        Michi_Achievement(id);
#else
        Debug.Log($"[MichichoSDK] Achievement: {id}");
#endif
    }

    // ── Called by the browser (via SendMessage from the .jslib) ──────────────

    // Do NOT call this yourself. The portal triggers it when the ad finishes.
    public void OnAdComplete()
    {
        _onAdComplete?.Invoke();
        _onAdComplete = null;
    }

    void EditorAdDone()
    {
        _onAdComplete?.Invoke();
        _onAdComplete = null;
    }
}
