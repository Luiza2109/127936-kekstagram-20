'use strict';

(function () {
  var socialCommentInput = document.querySelector('.social__footer-text');
  var body = document.querySelector('body');
  var usersContainer = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var pictures = document.querySelectorAll('.picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  var onPopupEscPress = function (evt) {
    if (socialCommentInput === document.activeElement) {
      return;
    }
    window.util.isEscEvent(evt, onPictureCloseClick);
  };

  var onPictureOpenClick = function (evt) {
    var user = evt.target.closest('.picture');
    body.classList.add('modal-open');

    pictures.forEach(function (item, i) {
      if (user === item) {
        bigPicture.classList.remove('hidden');
        window.picture.renderBigPicture(i);
        window.picture.renderCommentPhoto(i);
      }
    });

    document.addEventListener('keydown', onPopupEscPress);
  };

  pictures.forEach(function (item) {
    item.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, onPictureOpenClick);
    });
  });

  var onPictureCloseClick = function () {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
  };

  usersContainer.addEventListener('click', function (evt) {
    onPictureOpenClick(evt);
  });

  bigPictureCancel.addEventListener('click', function (evt) {
    onPictureCloseClick(evt);
  });
})();
