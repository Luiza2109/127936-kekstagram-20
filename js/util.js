'use strict';

(function () {
  var TIMEOUT_INTERVAL = 500;

  var Keyboard = {
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter'
  };

  var randomArray = function (arr) {
    var i;
    var j;
    var k;

    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      k = arr[i];
      arr[i] = arr[j];
      arr[j] = k;
    }

    return arr;
  };

  window.util = {
    randomArray: randomArray,
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
    getRandomInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomArrayItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    escEvent: function (evt, action) {
      if (evt.key === Keyboard.ESC_KEY) {
        action(evt);
      }
    },
    enterEvent: function (evt, action) {
      if (evt.key === Keyboard.ENTER_KEY) {
        action(evt);
      }
    }
  };
})();
