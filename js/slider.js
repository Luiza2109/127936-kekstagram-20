'use strict';

(function () {
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var photoPreparation = document.querySelector('.img-upload__preview > img');

  var filters = {
    chrome: function (depth) {
      return 'filter: grayscale(' + (1 / effectLevelLine.clientWidth * depth) + ')';
    },
    sepia: function (depth) {
      return 'filter: sepia(' + (1 / effectLevelLine.clientWidth * depth) + ')';
    },
    marvin: function (depth) {
      return 'filter: invert(' + `(${100 / effectLevelLine.clientWidth * depth}%)` + ')'; //линтер ругается на обратные ковычки
    },
    phobos: function (depth) {
      return 'filter: blur(' + `(${3 / effectLevelLine.clientWidth * depth}px)` + ')';
    },
    heat: function (depth) {
      return 'filter: brightness(' + (3 / effectLevelLine.clientWidth * depth) + ')';
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

  var changeFilter = function () {
    photoPreparation.className = window.effects.getEffectClass();
    console.log(photoPreparation.className);
  };

  changeFilter()

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

        photoPreparation.style = filters.chrome(effectLeft);
        //photoPreparation.style = filters.sepia(effectLeft);
        //photoPreparation.style = filters.marvin(effectLeft);
        //photoPreparation.style = filters.phobos(effectLeft);
        //photoPreparation.style = filters.heat(effectLeft);
        console.log(filters.chrome(effectLeft));
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
