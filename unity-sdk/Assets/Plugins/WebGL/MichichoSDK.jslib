mergeInto(LibraryManager.library, {

  // Called once on Awake — sets up the listener so the portal can talk back to Unity
  Michi_Init: function () {
    window.addEventListener('message', function (e) {
      if (!e.data || !e.data.type) return;
      if (e.data.type === 'michi_ad_done') {
        // Tells Unity the ad finished — triggers OnAdComplete() in MichichoSDK.cs
        SendMessage('MichichoSDK', 'OnAdComplete');
      }
    });
  },

  // Asks the portal to show an interstitial ad
  Michi_ShowAd: function () {
    window.parent.postMessage({ type: 'michi_ad' }, '*');
  },

  // Sends an analytics event to the portal
  Michi_Track: function (eventNamePtr, jsonPtr) {
    var event = UTF8ToString(eventNamePtr);
    var json  = UTF8ToString(jsonPtr);
    var data  = {};
    try { data = JSON.parse(json); } catch (e) {}
    window.parent.postMessage({ type: 'michi_track', event: event, data: data }, '*');
  },

  // Unlocks an achievement
  Michi_Achievement: function (idPtr) {
    window.parent.postMessage({ type: 'michi_achievement', id: UTF8ToString(idPtr) }, '*');
  }

});
