'use strict';

var PHOTO_COUNT = 25;
var socialCaption = document.querySelector('.social__caption');
var usersСontainer = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var messageUsers = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var nickNames = [
  'Артём',
  'Никита',
  'Ева',
  'Вероника',
  'Любовь'
];

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayItem = function (array) {
  return array[getRandomInRange(0, array.length - 1)];
};

var createComments = function () {
  return {
    message: getRandomArrayItem(messageUsers),
    name: getRandomArrayItem(nickNames),
    avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg'
  };
};

var createCommentsArray = function () {
  var comments = [];
  for (var i = 1; i <= getRandomInRange(1, 15); i++) {
    comments.push(createComments());
  }

  return comments;
};

var createPhoto = function (i) {
  return {
    url: 'photos/' + i + '.jpg',
    description: socialCaption.textContent,
    comments: createComments(),
    likes: getRandomInRange(15, 200)
  };
};

var createPhotos = function () {
  var photos = [];
  for (var i = 1; i <= PHOTO_COUNT; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
};

createPhotos();

var renderPhoto = function (photo) {
  var userPhoto = similarPictureTemplate.cloneNode(true);
  var commentsCount = createCommentsArray().length;

  userPhoto.querySelector('.picture__img').src = photo.url;
  userPhoto.querySelector('.picture__comments').textContent = commentsCount;
  userPhoto.querySelector('.picture__likes').textContent = photo.likes;

  return userPhoto;
};

var appendFragment = function (photo) {
  var fragment = document.createDocumentFragment();

  photo.forEach(function (i) {
    fragment.appendChild(renderPhoto(i));
  });

  usersСontainer.appendChild(fragment);
  return fragment;
};

appendFragment(createPhotos());

var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
var likesCount = bigPicture.querySelector('.likes-count');
var commentCount = bigPicture.querySelector('.comments-count');
var socialCommentList = bigPicture.querySelector('.social__comments');
var socialComment = bigPicture.querySelector('.social__comment');
var socialPictures = bigPicture.querySelectorAll('.social__picture');
var socialCommentCount = bigPicture.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var body = document.querySelector('body');

bigPicture.classList.remove('hidden');

var renderBigPicture = function (i) {
  bigPictureImg.src = createPhotos()[i].url;
  likesCount.textContent = createPhotos()[i].likes;
  commentCount.textContent = createCommentsArray().length;
  socialCaption.textContent = createPhotos()[i].description;

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  body.classList.add('modal-open');
};

var renderCommentPhoto = function (i) {
  socialPictures.forEach(function (item) {
    item.src = createCommentsArray()[i].avatar;
    item.alt = createCommentsArray()[i].name;
  });
};

var renderComment = function () {
  var fragment = document.createDocumentFragment();

  var userComment = socialComment.cloneNode(true);

  fragment.appendChild(userComment);
  socialCommentList.removeChild(socialCommentList.firstElementChild);
  socialCommentList.appendChild(fragment);

  renderBigPicture(0);
  renderCommentPhoto(0);
  return fragment;
};

renderComment();
