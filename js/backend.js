'use strict';

(function () {
  var editPhoto = document.querySelector('.img-upload__overlay');

  var TIMEOUT_IN_MS = 100000;

  var StatusCode = {
    OK: 200
  };

  var addServerListener = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        editPhoto.classList.add('hidden');
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://javascript.pages.academy/kekstagram/data';
      addServerListener(xhr, onSuccess, onError);

      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://javascript.pages.academy/kekstagram';

      addServerListener(xhr, onSuccess, onError);

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          window.response.onOpenSuccessPopup();
        } else {
          window.response.onOpenErrorPopup();
        }
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();

