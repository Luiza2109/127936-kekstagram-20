'use strict';

(function () {
  var HASHTAG_PATTERN = /[A-Za-z0-9А-аЯ-я#]/g;

  var imgUploadForm = document.querySelector('#upload-select-image');
  var hashtagInput = imgUploadForm.querySelector('.text__hashtags');

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
    TOO_MAX: 'Нельзя указать больше ' + TagLength.MAX_HASHTAG + ' хэш-тегов',
    TOO_SPECIAL_SYMBOL: 'Хэш-тег может содержать только буквы и цифры',
    TOO_SYMBOL_LATTICE: 'Хэш-тег должен начинаться с символа ' + ' #'
  };

  var StyleError = {
    NO_ERRORS: '',
    ERRORS: '2px solid red'
  };

  var checkLengthTag = function (tags) {
    var arrayHashtags = tags.slice().trim().replace(/\s{2,}/g, ' ').toLowerCase().split(' ');

    for (var i = 0; i < arrayHashtags.length; i++) {
      if (arrayHashtags[i].length < TagLength.MIN) {
        hashtagInput.style.outline = StyleError.ERRORS;
        return true;
      }
    }

    return false;
  };

  var checkSpecialSymbol = function (tags) {
    var arrayHashtags = tags.slice().trim().replace(/\s{2,}/g, ' ').toLowerCase().split(' ');

    for (var i = 0; i < arrayHashtags.length; i++) {
      var arrayTags = arrayHashtags[i].match(HASHTAG_PATTERN);
      if (arrayTags.length < arrayHashtags[i].length) {
        hashtagInput.style.outline = StyleError.ERRORS;
        return true;
      }
    }

    return false;
  };

  var validateTags = function (hashtags) {
    var arrayHashtags = hashtags.slice().trim().replace(/\s{2,}/g, ' ').toLowerCase().split(' ');

    for (var i = 0; i < arrayHashtags.length; i++) {
      switch (true) {
        case arrayHashtags[i][0].slice(0, 1) !== '#':
          hashtagInput.style.outline = StyleError.ERRORS;
          hashtagInput.setCustomValidity(ValidateMessage.TOO_SYMBOL_LATTICE);
          break;
        case checkLengthTag(hashtags):
          hashtagInput.setCustomValidity(ValidateMessage.TOO_SHORT);
          break;
        case checkSpecialSymbol(hashtags):
          hashtagInput.setCustomValidity(ValidateMessage.TOO_SPECIAL_SYMBOL);
          break;
        case arrayHashtags[i].length > TagLength.MAX:
          hashtagInput.style.outline = StyleError.ERRORS;
          hashtagInput.setCustomValidity(ValidateMessage.TOO_LONG);
          break;
        case arrayHashtags.length > TagLength.MAX_HASHTAG:
          hashtagInput.style.outline = StyleError.ERRORS;
          hashtagInput.setCustomValidity(ValidateMessage.TOO_MAX);
          break;
        case arrayHashtags.indexOf(arrayHashtags[i]) !== i:
          hashtagInput.style.outline = StyleError.ERRORS;
          hashtagInput.setCustomValidity(ValidateMessage.TOO_TWICE);
          break;
        default:
          hashtagInput.style.outline = StyleError.NO_ERRORS;
          hashtagInput.setCustomValidity(ValidateMessage.NO_ERRORS);
      }
    }

    return false;
  };

  var onHashtagInput = function (evt) {
    hashtagInput.setCustomValidity(ValidateMessage.NO_ERRORS);
    hashtagInput.style.outline = StyleError.NO_ERRORS;
    var hashtags = evt.target.value;

    if (hashtags.length > 0) {
      validateTags(hashtags);
    }
  };

  hashtagInput.addEventListener('input', onHashtagInput);
})();
