'use strict';

(function () {
  var effectFields = document.querySelector('.img-upload__effects');
  var photoPreparation = document.querySelector('.img-upload__preview > img');

  var EFFECT_ORIGINAL = 'none';

  var EffectClass = {
    NONE: '',
    NAME: 'effects__preview--'
  };

  var currentEffect = EFFECT_ORIGINAL;

  var getEffectClass = function () {
    return currentEffect === EFFECT_ORIGINAL
      ? EffectClass.NONE
      : EffectClass.NAME + currentEffect;
  };

  var applyEffect = function (effect) {
    currentEffect = effect;

    photoPreparation.style.filter = '';
    photoPreparation.className = getEffectClass();
  };

  var onEffectChange = function (evt) {
    applyEffect(evt.target.value);
  };

  effectFields.addEventListener('change', function (evt) {
    onEffectChange(evt);
  });
})();
