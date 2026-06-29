# Michicho SDK — How It Works

## The big picture

Your Unity game runs inside an `<iframe>` on **michicho.com**.
The game and the portal can't access each other's code directly (cross-origin),
but they can send messages back and forth using `postMessage`.

```
Unity Game (iframe)                   michicho.com portal
────────────────────                  ─────────────────────
MichichoSDK.ShowInterstitial()  ───▶  shows ad overlay
                                ◀───  sends "ad done" signal
game resumes                          
                                
MichichoSDK.Track("level_end")  ───▶  fires Google Analytics event
MichichoSDK.UnlockAchievement() ───▶  saves to Supabase (future)
```

---

## The two files

### `MichichoSDK.jslib` — the JS bridge
Unity WebGL can't call browser APIs directly from C#.
This file is JavaScript that Unity compiles into the WebGL build.
It exposes functions that C# can call, and each one sends a `postMessage` to the parent page (the portal).

### `MichichoSDK.cs` — the C# API
This is the MonoBehaviour you add to your scene.
It wraps the jslib calls into clean static methods.
In the Unity Editor (not WebGL), all calls just log to the console so you can test without a browser.

---

## Setup

1. Copy both files into your Unity project (see [README.md](README.md) for exact paths).
2. Create an empty GameObject, name it **`MichichoSDK`** (exact name matters — the browser uses it to call back into Unity).
3. Attach the `MichichoSDK` script to it.

---

## Full API

```csharp
// ── Ads ──────────────────────────────────────────────────────────────────────

// Show an interstitial ad. Pause the game first. Resume it in the callback.
Time.timeScale = 0;
MichichoSDK.ShowInterstitial(() => {
    Time.timeScale = 1;
});

// ── Analytics ────────────────────────────────────────────────────────────────

// Simple event (no extra data)
MichichoSDK.Track("game_start");
MichichoSDK.Track("level_complete");
MichichoSDK.Track("game_over");

// Event with data (plain JSON string)
MichichoSDK.Track("level_complete", "{\"level\":3,\"time\":42.5}");
MichichoSDK.Track("score_posted",   "{\"score\":9800}");

// ── Achievements ─────────────────────────────────────────────────────────────

MichichoSDK.UnlockAchievement("first_win");
MichichoSDK.UnlockAchievement("speedrun");
```

---

## Message protocol (what's actually sent over postMessage)

```js
// Game → Portal
{ type: 'michi_ad' }
{ type: 'michi_track',       event: 'level_complete', data: { level: 3 } }
{ type: 'michi_achievement', id: 'first_win' }

// Portal → Game
{ type: 'michi_ad_done' }   // fires MichichoSDK.OnAdComplete() in C#
```

---

## Testing in the Unity Editor

- `ShowInterstitial` auto-resolves after 0.5 seconds — the callback fires normally.
- `Track` and `UnlockAchievement` print to the Console.
- No browser needed to test the game flow.

## Testing in a real browser (before publishing)

Build for WebGL, open `index.html` in a local server (Unity's "Build and Run" does this).
Open the browser console — you'll see `[Michi] track: ...` logs from the portal side
whenever the game sends a message.

---

## Adding this game to the portal

Once the WebGL build is deployed to GitHub Pages, add one entry to
`portal/src/data/mockGames.js` in the CodenamesRandomizer repo:

```js
{
  id: '5',
  slug: 'my-game',
  title: 'My Game',
  description: 'Short description.',
  category: 'action',
  play_url: 'https://baurawson.github.io/my-game/',
  is_featured: false,
  is_new: true,
  player_count: 0,
  tags: ['action'],
  color: '#DC2626',
}
```

Then Claude rebuilds and commits — you push.
