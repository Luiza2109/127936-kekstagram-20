'use strict';

(function () {
  var commentUser = document.querySelector('.text__description');
  var imgUploadForm = document.querySelector('#upload-select-image');
  var hashtagInput = imgUploadForm.querySelector('.text__hashtags');
  var loadingPhoto = document.querySelector('#upload-file');
  var editPhoto = document.querySelector('.img-upload__overlay');
  var closeEditPhoto = document.querySelector('#upload-cancel');

  var onEditPopupEscPress = function (evt) {
    if (hashtagInput === document.activeElement || commentUser === document.activeElement) {
      return;
    }

    evt.preventDefault();
    window.util.isEscEvent(evt, onEditPhotoCloseClick);
  };

  var onEditPhotoOpenChange = function () {
    editPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onEditPopupEscPress);
  };

  var onEditPhotoCloseClick = function () {
    editPhoto.classList.add('hidden');
    loadingPhoto.value = '';
    document.removeEventListener('keydown', onEditPopupEscPress);
  };

  loadingPhoto.addEventListener('change', function () {
    onEditPhotoOpenChange();
  });

  loadingPhoto.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    window.util.isEnterEvent(evt, onEditPhotoOpenChange);
  });

  closeEditPhoto.addEventListener('click', function () {
    onEditPhotoCloseClick();
  });
})();
