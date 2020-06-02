'use strict';

var PHOTO_COUNT = 25;
var socialCommentСount = document.querySelector('.social__comments').children.length;
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
  return array[Math.floor(Math.random() * array.length)];
};

var createComments = function () {
  return {
    message: getRandomArrayItem(messageUsers),
    name: getRandomArrayItem(nickNames),
    avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg'
  };
};

var photos = [];

var createPhoto = function (photo) {
  for (var i = 1; i <= PHOTO_COUNT; i++) {
    photo.push({
      url: 'photos/' + i + '.jpg',
      description: socialCommentСount,
      comments: createComments(),
      likes: getRandomInRange(15, 200)
    });
  }

  return photo;
};

createPhoto(photos);

var renderPhoto = function (photo) {
  var userPhoto = similarPictureTemplate.cloneNode(true);

  userPhoto.querySelector('.picture__img').src = photo.url;
  userPhoto.querySelector('.picture__comments').textContent = photo.description;
  userPhoto.querySelector('.picture__likes').textContent = photo.likes;

  return userPhoto;
};

var fragment = document.createDocumentFragment();

photos.forEach(function(i) {
  fragment.appendChild(renderPhoto(i));
});

usersСontainer.appendChild(fragment);

//не совсем понятно с description, строка — описание фотографии. как это должно выглядеть,
//в виде количества комментариев? или это описание где на фото должно быть??
