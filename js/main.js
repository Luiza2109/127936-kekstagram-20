'use strict';

var PHOTO_COUNT = 25;
var socialCaption = document.querySelector('.social__caption');
var usersContainer = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

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

var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

var loadingPhoto = document.querySelector('#upload-file');
var editPhoto = document.querySelector('.img-upload__overlay');
var closeEditPhoto = document.querySelector('#upload-cancel');

var buttonSmaller = document.querySelector('.scale__control--smaller');
var buttonBigger = document.querySelector('.scale__control--bigger');
var inputScaleValue = document.querySelector('.scale__control--value');
var photoPreparation = document.querySelector('.img-upload__preview > img');

var imgUploadForm = document.querySelector('#upload-select-image');
var hashtagInput = imgUploadForm.querySelector('.text__hashtags');
var commentUser = document.querySelector('.text__description');
var socialCommentInput = document.querySelector('.social__footer-text');

var previewImage = document.querySelector('.img-upload__preview img');
var effectFields = document.querySelector('.img-upload__effects');

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

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayItem = function (array) {
  return array[getRandomInRange(0, array.length - 1)];
};

var createComment = function () {
  return {
    message: getRandomArrayItem(MESSAGE_USERS),
    name: getRandomArrayItem(NICK_NAMES),
    avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg'
  };
};

var createCommentsArray = function () {
  var comments = [];
  for (var i = 1; i <= getRandomInRange(1, 15); i++) {
    comments.push(createComment());
  }

  return comments;
};

var createPhoto = function (i) {
  return {
    url: 'photos/' + i + '.jpg',
    description: socialCaption.textContent,
    comments: createComment(),
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

var arrayPhotos = createPhotos();

var renderPhoto = function (photo) {
  var userPhoto = similarPictureTemplate.cloneNode(true);

  userPhoto.querySelector('.picture__img').src = photo.url;
  userPhoto.querySelector('.picture__comments').textContent = createCommentsArray().length;
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

appendPhotoFragment(arrayPhotos);

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

var renderCommentPhoto = function (i) {
  return socialPictures.forEach(function (item) {
    item.src = createCommentsArray()[i].avatar;
    item.alt = createCommentsArray()[i].name;
  });
};

renderCommentPhoto(0);

var renderBigPicture = function (i) {
  bigPictureImg.src = arrayPhotos[i].url;
  likesCount.textContent = arrayPhotos[i].likes;

  commentCount.textContent = createCommentsArray().length;
  socialCaption.textContent = arrayPhotos[i].description;

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  body.classList.add('modal-open');
};

var Keyboard = {
  ESC_KEY: 'Escape',
  ENTER_KEY: 'Enter'
};

var pictures = document.querySelectorAll('.picture');

var onPopupEscPress = function (evt) {
  if (socialCommentInput === document.activeElement) {
    return;
  }

  if (evt.key === Keyboard.ESC_KEY) {
    evt.preventDefault();
    onPictureCloseClick(evt);
  }
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

pictures.forEach(function (item) {
  item.addEventListener('keydown', function (evt) {
    if (evt.key === Keyboard.ENTER_KEY) {
      onPictureOpenClick();
    }
  });
});

var onPictureCloseClick = function (evt) {
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

var onEditPopupEscPress = function (evt) {
  if (hashtagInput === document.activeElement || commentUser === document.activeElement) {
    return;
  }

  if (evt.key === Keyboard.ESC_KEY) {
    evt.preventDefault();
    onEditPhotoCloseClick();
  }
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

loadingPhoto.addEventListener('change', function (evt) {
  onEditPhotoOpenChange();
});

loadingPhoto.addEventListener('keydown', function (evt) {
  if (evt.key === Keyboard.ENTER_KEY) {
    onEditPhotoOpenChange();
  }
});

closeEditPhoto.addEventListener('click', function () {
  onEditPhotoCloseClick();
});

var scaleValue = {
  MAX: 100,
  MIN: 25,
  STEP: 25
};

var scalePhoto = {
  MAX: 1,
  MIN: 0.25,
  STEP: 0.25
};

var currentScale = scaleValue.MAX;
var currentPhoto = scalePhoto.MAX;
inputScaleValue.value = currentScale + '%';

var setScale = function (value) {
  currentScale = value;
  inputScaleValue.value = value + '%';
};

var scaleControlSmaller = function () {
  if (scaleValue.MIN <= currentScale - scaleValue.STEP) {
    setScale(currentScale - scaleValue.STEP);
    currentPhoto -= scalePhoto.STEP;
    photoPreparation.style.transform = "scale("+ currentPhoto +")";
  }
};

var scaleControlBigger = function () {
  if (scaleValue.MAX >= currentScale + scaleValue.STEP) {
    setScale(currentScale + scaleValue.STEP);
    currentPhoto += scalePhoto.STEP;
    photoPreparation.style.transform = "scale("+ currentPhoto +")";
  }
};

buttonSmaller.addEventListener('click', function () {
  scaleControlSmaller();
});

buttonBigger.addEventListener('click', function () {
  scaleControlBigger();
});

var EFFECT_ORIGINAL = 'none';

var EffectClass = {
  NONE: '',
  NAME: 'effects__preview--'
};

var currentEffect = EFFECT_ORIGINAL;

var getEffectClass = function () {
  return currentEffect === EFFECT_ORIGINAL
    ? EffectClass.NONE
    : EffectClass.NAME + currentEffect;
};

var applyEffect = function (effect) {
  currentEffect = effect;

  photoPreparation.style.filter = '';
  photoPreparation.className = getEffectClass();
};

var onEffectChange = function (evt) {
  applyEffect(evt.target.value);
};

effectFields.addEventListener('change', function (evt) {
  onEffectChange(evt);
});

// хеш теги.

var TagLength = {
  MIN: 2,
  MAX: 20,
  MAX_HASHTAG: 5
};

var ValidateMessage = {
  NO_ERRORS: '',
  TOO_SHORT: 'Имя должно состоять минимум из ' + TagLength.MIN + '-х символов',
  TOO_LONG: 'Имя должно состоять максимум из ' + TagLength.MAX + '-х символов',
  TOO_TWICE: 'Один и тот же хэш-тег не может быть использован дважды',
  TOO_MAX: 'нельзя указать больше' + TagLength.MAX_HASHTAG + ' хэш-тегов',
  TOO_SPECIAL_SYMBOL: 'не может содержать данный символ',
  TOO_SYMBOL_LATTICE: 'хэш-тег должен начинаться с символа' + ' #'
};

var INVALID_TAG_REGEXP = /\#[^0-9a-zA-Zа-яА-ЯёЁ]+/;

var validateTags = function (hashtags) {

  if (hashtags.length > TagLength.MAX_HASHTAG) {
    return ValidateMessage.TOO_MAX;
  }

  for (var i = 0; i < hashtags.length; i++) {
    var tag = hashtags[i];

    if (tag.lastIndexOf('#') > 0) {
      return ValidateMessage.TOO_SYMBOL_LATTICE;
    }
    if (tag.length <= TagLength.MIN) {
      return ValidateMessage.TOO_SHORT;
    }
    if (tag.length >= TagLength.MAX) {
      return ValidateMessage.TOO_LONG;
    }
    if (hashtags.indexOf(tag, i + 1)) {
      return ValidateMessage.TOO_LONG;
    }
    if (INVALID_TAG_REGEXP.test(tag)) {
      return ValidateMessage.TOO_SPECIAL_SYMBOL;
    }
  }

    return ValidateMessage.NO_ERRORS;
};

var onHashtagInput = function (evt) {
  var hashtags = evt.target.value.toLowerCase().split(' ');
  var message = validateTags(hashtags);
  hashtagInput.setCustomValidity(message);
};

hashtagInput.addEventListener('input', onHashtagInput);
