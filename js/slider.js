'use strict';

(function () {
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var photoPreparation = document.querySelector('.img-upload__preview > img');

  var filters = {
    setChrome: function (depth) {
      return 'grayscale(' + (1 / effectLevelLine.clientWidth * depth) + ')';
    },
    setSepia: function (depth) {
      return 'sepia(' + (1 / effectLevelLine.clientWidth * depth) + ')';
    },
    setMarvin: function (depth) {
      return 'invert(' + (100 / effectLevelLine.clientWidth * depth) + '%)';
    },
    setPhobos: function (depth) {
      return 'blur(' + (3 / effectLevelLine.clientWidth * depth) + 'px)';
    },
    setHeat: function (depth) {
      return 'brightness(' + (3 / effectLevelLine.clientWidth * depth) + ')';
    }
  };

  var applyEffects = function (x) {
    switch (true) {
      case photoPreparation.classList.contains('effects__preview--chrome'):
        photoPreparation.style.filter = filters.setChrome(x);
        break;
      case photoPreparation.classList.contains('effects__preview--sepia'):
        photoPreparation.style.filter = filters.setSepia(x);
        break;
      case photoPreparation.classList.contains('effects__preview--marvin'):
        photoPreparation.style.filter = filters.setMarvin(x);
        break;
      case photoPreparation.classList.contains('effects__preview--phobos'):
        photoPreparation.style.filter = filters.setPhobos(x);
        break;
      case photoPreparation.classList.contains('effects__preview--heat'):
        photoPreparation.style.filter = filters.setHeat(x);
        break;
      default:
    }
  };

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

        effectLevelDepth.style.width = effectLevelPin.style.left;

        applyEffects(effectLeft);
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
    reset: resetSlider
  };
})();
