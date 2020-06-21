'use strict';

(function () {
  var buttonSmaller = document.querySelector('.scale__control--smaller');
  var buttonBigger = document.querySelector('.scale__control--bigger');
  var inputScaleValue = document.querySelector('.scale__control--value');
  var photoPreparation = document.querySelector('.img-upload__preview > img');

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
  inputScaleValue.value = currentScale + '%';

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
})();
