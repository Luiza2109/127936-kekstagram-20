'use strict';

(function () {
  var pageBody = document.querySelector('body');
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var usersContainer = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var socialCommentList = bigPicture.querySelector('.social__comments');
  var socialComments = bigPicture.querySelectorAll('.social__comment');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentCount = bigPicture.querySelector('.comments-count');
  var socialCaption = document.querySelector('.social__caption');
  var socialCommentInput = document.querySelector('.social__footer-text');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');

  var ShowComment = {
    START: 0,
    MAX: 5,
  };

  var renderPhoto = function (photo) {
    var userPhoto = similarPictureTemplate.cloneNode(true);

    userPhoto.querySelector('.picture__img').src = photo.url;
    userPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
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

  var onErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var renderComment = function (photo) {
    var userComment = socialComments[0].cloneNode(true);

    userComment.querySelector('.social__comment .social__picture').src = photo.avatar;
    userComment.querySelector('.social__text').textContent = photo.message;
    userComment.querySelector('.social__comment .social__picture').alt = photo.name;

    return userComment;
  };

  var onLoad = function (data) {
    appendPhotoFragment(data);

    var renderCommentsPhoto = function (i, commentCount) {
      var fragment = document.createDocumentFragment();

      var comments = data[i].comments.slice(commentCount * 5, (commentCount + 1) * 5);

      console.log(comments)

      comments.forEach(function (item) {
        fragment.appendChild(renderComment(item));
      });

      if (commentCount === 0) {
        socialCommentList.textContent = '';
      }

      socialCommentList.appendChild(fragment);

      return fragment;
    };

    var renderList = function (i) {
      var countComments = 0;

      renderCommentsPhoto(i, countComments);

      /*var arrayComments = Array.from(socialCommentList.children);
      var maxCountComents = arrayComments.slice(0, ShowComment.MAX);
      var exceptCountComents = arrayComments.slice(ShowComment.MAX);

      exceptCountComents.forEach(function (item) {
        item.classList.add('hidden');
      });

      if (ShowComment.MAX >= arrayComments.length) {
        socialCommentCount.textContent = arrayComments.length + ' из ' + data[i].comments.length + ' комментариев';
        commentsLoader.classList.add('hidden');
      }*/

      commentsLoader.addEventListener('click', function (evt) {
        var max = data[i].comments.length;

        countComments++;
        renderCommentsPhoto(i, countComments)

        if (ShowComment.MAX * (countComments + 1) >= max) {
          commentsLoader.classList.add('hidden');
        }
      });
    };

    var renderBigPicture = function (i) {
      bigPictureImg.src = data[i].url;
      likesCount.textContent = data[i].likes;

      commentCount.textContent = data[i].comments.length;
      socialCaption.textContent = data[i].description;

      pageBody.classList.add('modal-open');

      renderList(i);
    };

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
        }
      });

      document.addEventListener('keydown', onPopupEscPress);
    };

    var pictures = document.querySelectorAll('.picture');

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
      socialCommentInput.value = '';
      onPictureCloseClick();
    });
  };

  window.backend.load(onLoad, onErrorMessage);

  /*window.picture = {
    renderCommentsPhoto: onLoad.renderCommentsPhoto(i)
  };*/

})();
