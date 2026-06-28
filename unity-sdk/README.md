# Michicho Unity SDK

Two files. Copy them into every game. That's it.

---

## Setup (once per game project)

### Step 1 — Copy the files

Copy these two files into your Unity project:

| File | Where to put it in Unity |
|---|---|
| `Assets/Plugins/WebGL/MichichoSDK.jslib` | `Assets/Plugins/WebGL/` (create folders if needed) |
| `Assets/MichichoSDK/MichichoSDK.cs` | Anywhere — `Assets/Scripts/` is fine |

### Step 2 — Add the GameObject

1. Open your **first/main scene** in Unity
2. Right-click in the Hierarchy → **Create Empty**
3. Name it exactly **`MichichoSDK`** (case-sensitive)
4. With it selected, click **Add Component** → search for **MichichoSDK** → add it

Done. The SDK loads once and survives scene changes automatically.

---

## Using it in your game

```csharp
// Show an interstitial ad (e.g. between levels)
// Pause your game first, resume it in the callback
Time.timeScale = 0;
MichichoSDK.ShowInterstitial(() => {
    Time.timeScale = 1;
});

// Track a gameplay event (goes to Google Analytics)
MichichoSDK.Track("level_complete");
MichichoSDK.Track("score_posted", "{\"score\":4200}");

// Unlock an achievement
MichichoSDK.UnlockAchievement("first_win");
```

Everything works in the Unity Editor too — ads auto-resolve instantly so you can test without interruption.

---

## Publishing the game

1. **File → Build Settings → WebGL → Build**
2. Push the build folder to a new GitHub repo
3. Enable GitHub Pages on that repo
4. Add the game URL to `portal/src/data/mockGames.js`
