'use strict';

(function () {
  var PHOTO_COUNT = 25;
  var socialCaption = document.querySelector('.social__caption');

  var MESSAGE_USERS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var NICK_NAMES = [
    'Артём',
    'Никита',
    'Ева',
    'Вероника',
    'Любовь'
  ];

  var createComment = function () {
    return {
      message: window.util.getRandomArrayItem(MESSAGE_USERS),
      name: window.util.getRandomArrayItem(NICK_NAMES),
      avatar: 'img/avatar-' + window.util.getRandomInRange(1, 6) + '.svg'
    };
  };

  var createCommentsArray = function () {
    var comments = [];
    for (var i = 1; i <= window.util.getRandomInRange(1, 15); i++) {
      comments.push(createComment());
    }

    return comments;
  };

  var createPhoto = function (i) {
    return {
      url: 'photos/' + i + '.jpg',
      description: socialCaption.textContent,
      comments: createComment(),
      likes: window.util.getRandomInRange(15, 200)
    };
  };

  var createPhotos = function () {
    var photos = [];
    for (var i = 1; i <= PHOTO_COUNT; i++) {
      photos.push(createPhoto(i));
    }

    return photos;
  };

  var arrayPhotos = createPhotos();

  window.data = {
    createCommentsArray: createCommentsArray,
    arrayPhotos: arrayPhotos
  };
})();
