'use strict';

(function () {
  var socialCaption = document.querySelector('.social__caption');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentCount = bigPicture.querySelector('.comments-count');
  var socialCommentList = bigPicture.querySelector('.social__comments');
  var socialComment = bigPicture.querySelector('.social__comment');
  var socialPictures = bigPicture.querySelectorAll('.social__picture');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

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
      item.src = window.data.createCommentsArray()[0].avatar;
      item.alt = window.data.createCommentsArray()[0].name;
    });
  };

  renderCommentPhoto();

  var renderBigPicture = function (i) {
    bigPictureImg.src = window.data.arrayPhotos[i].url;
    likesCount.textContent = window.data.arrayPhotos[i].likes;

    commentCount.textContent = window.data.createCommentsArray.length;
    socialCaption.textContent = window.data.arrayPhotos[i].description;

    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  };

  window.picture = {
    renderCommentPhoto: renderCommentPhoto,
    renderBigPicture: renderBigPicture,
    renderComment: renderComment
  };
})();
