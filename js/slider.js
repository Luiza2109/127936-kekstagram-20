'use strict';

(function () {
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var photoPreparation = document.querySelector('.img-upload__preview > img');
  var effectsRadio = document.querySelectorAll('.effects__radio');

  var filters = {
    chrome: function (depth) {
      return 'grayscale(' + (1 / effectLevelLine.clientWidth * depth) + ')';
    },
    sepia: function (depth) {
      return 'sepia(' + (1 / effectLevelLine.clientWidth * depth) + ')';
    },
    marvin: function (depth) {
      return 'invert(' + (100 / effectLevelLine.clientWidth * depth) + '%)';
    },
    phobos: function (depth) {
      return 'blur(' + (3 / effectLevelLine.clientWidth * depth) + 'px)';
    },
    heat: function (depth) {
      return 'brightness(' + (3 / effectLevelLine.clientWidth * depth) + ')';
    }
  };

  var applyEffects = function (x) {
    switch(true) {
      case photoPreparation.classList.contains('effects__preview--chrome'):
        photoPreparation.style.filter = filters.chrome(x);
        break;
      case photoPreparation.classList.contains('effects__preview--sepia'):
        photoPreparation.style.filter = filters.sepia(x);
        break;
      case photoPreparation.classList.contains('effects__preview--marvin'):
        photoPreparation.style.filter = filters.marvin(x);
        break;
      case photoPreparation.classList.contains('effects__preview--phobos'):
        photoPreparation.style.filter = filters.phobos(x);
        break;
      case photoPreparation.classList.contains('effects__preview--heat'):
        photoPreparation.style.filter = filters.heat(x);
        break;
      default:
    }
  }

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
      var sliderNumber = (effectLevelPin.offsetLeft / effectLevelLine.offsetWidth).toFixed(1);

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
    resetSlider: resetSlider
  };
})();
