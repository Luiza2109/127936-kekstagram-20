'use strict';

(function () {
  var pageBody = document.querySelector('body');
  var loadingPhoto = document.querySelector('#upload-file');
  var editPhoto = document.querySelector('.img-upload__overlay');
  var closeEditPhoto = document.querySelector('#upload-cancel');
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentUser = document.querySelector('.text__description');
  var inputScaleValue = document.querySelector('.scale__control--value');
  var buttonSmaller = document.querySelector('.scale__control--smaller');
  var buttonBigger = document.querySelector('.scale__control--bigger');
  var effectFields = document.querySelector('.img-upload__effects');
  var photoPreparation = document.querySelector('.img-upload__preview > img');
  var effectLevel = document.querySelector('.effect-level');
  var imgUploadForm = document.querySelector('#upload-select-image');

  var scaleValue = {
    MAX: 100,
    MIN: 25,
    STEP: 25
  };

  var scalePhoto = {
    MAX: 1,
    MIN: 0.25,
    STEP: 0.25
  };

  var currentScale = scaleValue.MAX;
  var currentPhoto = scalePhoto.MAX;

  var setScale = function (value) {
    currentScale = value;
    inputScaleValue.value = value + '%';
  };

  var scaleControlSmaller = function () {
    if (scaleValue.MIN <= currentScale - scaleValue.STEP) {
      setScale(currentScale - scaleValue.STEP);
      currentPhoto -= scalePhoto.STEP;
      photoPreparation.style.transform = 'scale(' + currentPhoto + ')';
    }
  };

  var scaleControlBigger = function () {
    if (scaleValue.MAX >= currentScale + scaleValue.STEP) {
      setScale(currentScale + scaleValue.STEP);
      currentPhoto += scalePhoto.STEP;
      photoPreparation.style.transform = 'scale(' + currentPhoto + ')';
    }
  };

  buttonSmaller.addEventListener('click', function () {
    scaleControlSmaller();
  });

  buttonBigger.addEventListener('click', function () {
    scaleControlBigger();
  });

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

    if (photoPreparation.className == EffectClass.NAME + currentEffect) {
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

  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var EffectLineRect = {
    LEFT: 0,
    RIGHT: 453,
  };

  var resetSlider = function () {
    effectLevelDepth.style.width = 100 + '%';
    effectLevelValue.value = 100;
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

  var renderReset = function () {
    inputScaleValue.value = '100' + '%';
    photoPreparation.style.transform = 'scale(1)';
    effectLevel.classList.add('hidden');
    resetSlider();
  };

  var onEditPopupEscPress = function (evt) {
    if (hashtagInput === document.activeElement || commentUser === document.activeElement) {
      return;
    }
    window.util.escEvent(evt, onEditPhotoCloseClick);
  };

  var onEditPhotoOpenChange = function () {
    pageBody.classList.add('modal-open');
    editPhoto.classList.remove('hidden');

    renderReset();
    document.addEventListener('keydown', onEditPopupEscPress);
  };

  var onEditPhotoCloseClick = function () {
    pageBody.classList.remove('modal-open');
    editPhoto.classList.add('hidden');
    loadingPhoto.value = '';
    document.removeEventListener('keydown', onEditPopupEscPress);
  };

  loadingPhoto.addEventListener('change', function () {
    onEditPhotoOpenChange();
  });

  closeEditPhoto.addEventListener('click', function () {
    onEditPhotoCloseClick();
  });

  imgUploadForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(imgUploadForm), function (response) {
      editPhoto.classList.add('hidden');
    });
    evt.preventDefault();
    imgUploadForm.reset();
  });
})();
