'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram';

  var successLoading = document.querySelector('.success');
  var errorLoading = document.querySelector('.error');
  var pageBody = document.querySelector('body');

  var onCloseSuccessPopupEsc = function () {
    pageBody.classList.add('modal-open');
    successLoading.classList.remove('hidden');

    document.addEventListener('keydown', window.success.onResponsePopupEscPress);
  };

  var onCloseErrorPopupEsc = function () {
    pageBody.classList.add('modal-open');
    errorLoading.classList.remove('hidden');

    document.addEventListener('keydown', window.success.onResponsePopupEscPress);
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          onCloseSuccessPopupEsc();
          break;
        default:
          onCloseErrorPopupEsc(); //почему при ошибке сервера не срабатывает?
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
