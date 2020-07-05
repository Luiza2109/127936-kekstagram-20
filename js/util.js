'use strict';

(function () {
  var Keyboard = {
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter'
  };

  window.util = {
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
