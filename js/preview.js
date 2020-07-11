'use strict';

(function () {
  var pageBody = document.querySelector('body');
  var loadingPhoto = document.querySelector('#upload-file');
  var editPhoto = document.querySelector('.img-upload__overlay');
  var closeEditPhoto = document.querySelector('#upload-cancel');
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentUser = document.querySelector('.text__description');
  var imgUploadForm = document.querySelector('#upload-select-image');

  var onEditPopupEscPress = function (evt) {
    if (hashtagInput === document.activeElement || commentUser === document.activeElement) {
      return;
    }
    window.util.escEvent(evt, onEditPhotoCloseClick);
  };

  var onEditPhotoOpenChange = function () {
    pageBody.classList.add('modal-open');
    editPhoto.classList.remove('hidden');

    document.addEventListener('keydown', onEditPopupEscPress);
  };

  var onEditPhotoCloseClick = function () {
    pageBody.classList.remove('modal-open');
    editPhoto.classList.add('hidden');
    loadingPhoto.value = '';

    document.removeEventListener('keydown', onEditPopupEscPress);
  };

  loadingPhoto.addEventListener('change', function () {
    window.effects.renderReset();
    onEditPhotoOpenChange();
  });

  closeEditPhoto.addEventListener('click', function () {
    onEditPhotoCloseClick();
  });

  var onSubmitForm = function (evt) {
    window.backend.save(new FormData(imgUploadForm), function () {
      loadingPhoto.value = '';
      editPhoto.classList.add('hidden');
    });
    evt.preventDefault();
  };

  imgUploadForm.addEventListener('submit', onSubmitForm);
})();
