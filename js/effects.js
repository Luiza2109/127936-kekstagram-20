'use strict';

(function () {
  var EFFECT_ORIGINAL = 'none';

  var inputScaleValue = document.querySelector('.scale__control--value');
  var buttonSmaller = document.querySelector('.scale__control--smaller');
  var buttonBigger = document.querySelector('.scale__control--bigger');
  var effectFields = document.querySelector('.img-upload__effects');
  var photoPreparation = document.querySelector('.img-upload__preview > img');
  var effectLevel = document.querySelector('.effect-level');
  var effectsRadio = document.querySelectorAll('.effects__radio');
  var textDescription = document.querySelector('.text__description');
  var hashtagInput = document.querySelector('.text__hashtags');

  var ScaleValue = {
    MAX: 100,
    MIN: 25,
    STEP: 25
  };

  var ScalePhoto = {
    MAX: 1,
    MIN: 0.25,
    STEP: 0.25
  };

  var currentScale = ScaleValue.MAX;
  var currentPhoto = ScalePhoto.MAX;

  var setScale = function (value) {
    currentScale = value;
    inputScaleValue.value = value + '%';
  };

  var scaleControlSmaller = function () {
    if (ScaleValue.MIN <= currentScale - ScaleValue.STEP) {
      setScale(currentScale - ScaleValue.STEP);
      currentPhoto -= ScalePhoto.STEP;
      photoPreparation.style.transform = 'scale(' + currentPhoto + ')';
    }
  };

  var scaleControlBigger = function () {
    if (ScaleValue.MAX >= currentScale + ScaleValue.STEP) {
      setScale(currentScale + ScaleValue.STEP);
      currentPhoto += ScalePhoto.STEP;
      photoPreparation.style.transform = 'scale(' + currentPhoto + ')';
    }
  };

  buttonSmaller.addEventListener('click', function () {
    scaleControlSmaller();
  });

  buttonBigger.addEventListener('click', function () {
    scaleControlBigger();
  });

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

    if (photoPreparation.className) {
      effectLevel.classList.remove('hidden');
    } else {
      effectLevel.classList.add('hidden');
    }
  };

  var onEffectChange = function (evt) {
    applyEffect(evt.target.value);
  };

  effectFields.addEventListener('change', function (evt) {
    onEffectChange(evt);
  });

  var renderReset = function () {
    inputScaleValue.value = ScaleValue.MAX + '%';
    window.slider.reset();

    if (ScaleValue.MAX >= currentScale + ScaleValue.STEP || ScaleValue.MIN <= currentScale - ScaleValue.STEP) {
      setScale(currentScale = ScaleValue.MAX);
      currentPhoto = ScalePhoto.MAX;
      photoPreparation.style.transform = 'scale(' + currentPhoto + ')';
    }

    photoPreparation.className = EffectClass.NONE;
    effectsRadio[0].checked = true;
    effectLevel.classList.add('hidden');

    textDescription.value = '';
    hashtagInput.value = '';
    hashtagInput.style.outline = '';
  };

  window.effects = {
    renderReset: renderReset
  };
})();
