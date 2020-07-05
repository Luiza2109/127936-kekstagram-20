'use strict';

(function () {
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var EffectLineRect = {
    LEFT: 0,
    RIGHT: 453,
  };

  var resetSlider = function () {
    effectLevelDepth.style.width = 100 + '%';
    effectLevelLine.value = 100;
    effectLevelPin.style.left = 100 + '%';
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var effectLeft = effectLevelPin.offsetLeft - shift.x;

      if (effectLeft >= EffectLineRect.LEFT && effectLeft <= EffectLineRect.RIGHT) {
        var px = effectLeft + 'px';
        effectLevelPin.style.left = px;
        effectLevelDepth.style.width = px;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, {once: true});
  });

  window.slider = {
    resetSlider: resetSlider
  };
})();
