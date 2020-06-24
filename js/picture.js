'use strict';

(function () {
  var pageBody = document.querySelector('body');
  var usersContainer = document.querySelector('.pictures');
  var socialCaption = document.querySelector('.social__caption');
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var socialCommentList = bigPicture.querySelector('.social__comments');
  var socialComment = bigPicture.querySelector('.social__comment');
  var socialPictures = bigPicture.querySelectorAll('.social__picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentCount = bigPicture.querySelector('.comments-count');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var socialCommentInput = document.querySelector('.social__footer-text');

  var renderPhoto = function (photo) {
    var userPhoto = similarPictureTemplate.cloneNode(true);

    userPhoto.querySelector('.picture__img').src = photo.url;
    userPhoto.querySelector('.picture__comments').textContent = window.data.createCommentsArray().length;
    userPhoto.querySelector('.picture__likes').textContent = photo.likes;

    return userPhoto;
  };

  var appendPhotoFragment = function (photo) {
    var fragment = document.createDocumentFragment();

    photo.forEach(function (i) {
      fragment.appendChild(renderPhoto(i));
    });

    usersContainer.appendChild(fragment);
  };

  appendPhotoFragment(window.data.arrayPhotos);

  var renderComment = function () {
    var fragment = document.createDocumentFragment();

    var userComment = socialComment.cloneNode(true);

    fragment.appendChild(userComment);

    if (socialCommentList.firstElementChild) {
      socialCommentList.removeChild(socialCommentList.firstElementChild);
    }
    socialCommentList.appendChild(fragment);
  };

  renderComment();

  var renderCommentPhoto = function () {
    return socialPictures.forEach(function (item) {
      var comments = window.data.createCommentsArray();
      item.src = comments[0].avatar;
      item.alt = comments[0].name;
    });
  };

  renderCommentPhoto();

  var renderBigPicture = function (i) {
    bigPictureImg.src = window.data.arrayPhotos[i].url;
    likesCount.textContent = window.data.arrayPhotos[i].likes;

    commentCount.textContent = window.data.createCommentsArray().length;
    socialCaption.textContent = window.data.arrayPhotos[i].description;

    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    pageBody.classList.add('modal-open');
  };

  var pictures = document.querySelectorAll('.picture');

  var onPopupEscPress = function (evt) {
    if (socialCommentInput === document.activeElement) {
      return;
    }

    window.util.escEvent(evt, onPictureCloseClick);
  };

  var onPictureOpenClick = function (evt) {
    var user = evt.target.closest('.picture');

    pictures.forEach(function (item, i) {
      if (user === item) {
        bigPicture.classList.remove('hidden');
        renderBigPicture(i);
        renderCommentPhoto(i);
      }
    });

    document.addEventListener('keydown', onPopupEscPress);
  };

  pictures.forEach(function (item) {
    item.addEventListener('keydown', function (evt) {
      window.util.enterEvent(evt, onPictureOpenClick);
    });
  });

  var onPictureCloseClick = function () {
    pageBody.classList.remove('modal-open');
    bigPicture.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
  };

  usersContainer.addEventListener('click', function (evt) {
    onPictureOpenClick(evt);
  });

  bigPictureCancel.addEventListener('click', function () {
    onPictureCloseClick();
  });
})();
