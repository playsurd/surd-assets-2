/* Stub for the YouTube Playables SDK (ytgame).
 *
 * These games were ripped from YouTube Playables, where the real SDK talks to the
 * YouTube host over postMessage. Outside that iframe the real SDK's promises never
 * resolve, so the game hangs at load. This stub implements the API surface the games
 * call, resolving immediately, so the game boots and runs standalone. Saves go to
 * localStorage instead of YouTube's cloud.
 */
(function () {
  var KEY = 'ytgame_save';
  var noop = function () {};
  function resolved(v) { return Promise.resolve(v); }

  window.ytgame = {
    SDK_VERSION: '2.0',
    IN_PLAYABLES_ENV: false,

    game: {
      firstFrameReady: noop,
      gameReady: noop,
      // real SDK returns the cloud save; we return whatever's in localStorage
      loadData: function () {
        try { return resolved(localStorage.getItem(KEY) || ''); }
        catch (e) { return resolved(''); }
      },
      saveData: function (data) {
        try { localStorage.setItem(KEY, String(data)); } catch (e) {}
        return resolved();
      },
    },

    system: {
      getLanguage: function () { return (navigator.language || 'en-US'); },
      isAudioEnabled: function () { return true; },
      onAudioEnabledChange: noop,
      onPause: noop,
      onResume: noop,
    },

    // ads never fill — the callbacks/promises just resolve as "no ad shown"
    ads: {
      AdResult: { AD_FINISHED: 'AD_FINISHED', AD_ERROR: 'AD_ERROR', NOT_READY: 'NOT_READY' },
      requestAd: function () { return resolved('NOT_READY'); },
      requestInterstitialAd: function () { return resolved('NOT_READY'); },
    },

    engagement: {
      sendScore: function () { return resolved(); },
    },

    health: {
      logError: noop,
      logWarning: noop,
    },
  };
})();
