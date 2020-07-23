'use strict';

(function () {
  var TIMEOUT_INTERVAL = 500;

  var Keyboard = {
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter'
  };

  var getRandomArrays = function (arrays) {
    var i;
    var j;
    var k;

    for (i = arrays.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      k = arrays[i];
      arrays[i] = arrays[j];
      arrays[j] = k;
    }

    return arrays;
  };

  window.util = {
    getRandomArrays: getRandomArrays,
    TIMEOUT_INTERVAL: TIMEOUT_INTERVAL,

    debounce: function (cb) {

      var lastTimeout = null;

      return function () {
        var parameters = arguments;

        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }

        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, TIMEOUT_INTERVAL);
      };
    },
    pressEsc: function (evt, action) {
      if (evt.key === Keyboard.ESC_KEY) {
        action(evt);
      }
    },
    pressEnter: function (evt, action) {
      if (evt.key === Keyboard.ENTER_KEY) {
        action(evt);
      }
    }
  };
})();
