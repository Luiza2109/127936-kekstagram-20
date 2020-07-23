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

  var countComments = 0;

  var renderPhotos = window.util.debounce(function (data) {
    appendPhotoFragment(data);

    var getInitialComments = function (i) {
      var commentsCount = data[i].comments.slice(countComments * ShowComment.MAX, (countComments + 1) * ShowComment.MAX);

      return commentsCount;
    };

    var renderCommentsPhoto = function (i) {
      var fragment = document.createDocumentFragment();

      var initialComments = getInitialComments(i);
      var max = data[i].comments.length;

      initialComments.forEach(function (item) {
        fragment.appendChild(renderComment(item));
      });

      if (countComments === 0) {
        socialCommentList.textContent = '';
      }

      if (ShowComment.MAX * (countComments + 1) >= max) {
        socialCommentCount.firstChild.textContent = data[i].comments.length + ' из ';
        commentsLoader.classList.add('hidden');
      } else {
        socialCommentCount.firstChild.textContent = ShowComment.MAX + ' из ';
        commentsLoader.classList.remove('hidden');
      }

      socialCommentList.appendChild(fragment);
    };

    var onRenderComment = function (i) {
      countComments++;
      renderCommentsPhoto(i, countComments);
    };

    window.pictures = {
      getCurrentPhotoData: function () {
        return data[window.selectedPhotoIndex];
      },
      onCommentsLoader: function () {
        onRenderComment(window.selectedPhotoIndex, data);
      }
    };

    var renderBigPicture = function (i) {
      countComments = 0;

      bigPictureImg.src = data[i].url;
      likesCount.textContent = data[i].likes;

      commentCount.textContent = data[i].comments.length;
      socialCaption.textContent = data[i].description;

      pageBody.classList.add('modal-open');

      renderCommentsPhoto(i);
    };

    var onPopupEscPress = function (evt) {
      if (socialCommentInput === document.activeElement) {
        return;
      }

      window.util.pressEsc(evt, onPictureCloseClick);
    };

    var onPictureOpenClick = function (evt) {
      var user = evt.target.closest('.picture');

      pictures.forEach(function (item, i) {
        if (user === item) {
          bigPicture.classList.remove('hidden');
          renderBigPicture(i);
          window.selectedPhotoIndex = i;
        }
      });

      document.addEventListener('keydown', onPopupEscPress);
    };

    var pictures = document.querySelectorAll('.picture');

    pictures.forEach(function (item) {
      item.addEventListener('keydown', function (evt) {
        window.util.pressEnter(evt, onPictureOpenClick);
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
  });

  var onLoad = function (data) {
    window.data = data;
    renderPhotos(data);

    commentsLoader.addEventListener('click', function () {
      window.pictures.onCommentsLoader(window.pictures.getCurrentPhotoData());
      socialCommentCount.firstChild.textContent = socialCommentList.children.length + ' из ';
    });
  };

  window.backend.load(onLoad, onErrorMessage);

  window.picture = {
    renderPhotos: renderPhotos,
    appendPhotoFragment: appendPhotoFragment
  };
})();
