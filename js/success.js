'use strict';

(function () {
  var similarSuccessTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var similarErrorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var pageMain = document.querySelector('main');

  var appendSuccessFragment = function () {
    var codeSuccess = similarSuccessTemplate.cloneNode(true);
    pageMain.appendChild(codeSuccess);
  };

  appendSuccessFragment();

  var appendErrorFragment = function () {
    var codeError = similarErrorTemplate.cloneNode(true);
    pageMain.appendChild(codeError);
  };

  appendErrorFragment();

  var successLoading = document.querySelector('.success');
  var successButton = successLoading.querySelector('.success__button');
  var errorLoading = document.querySelector('.error');
  var errorButton = errorLoading.querySelector('.error__button');

  successLoading.classList.add('hidden');
  errorLoading.classList.add('hidden');

  var onResponsePopupEscPress = function (evt) {
    window.util.escEvent(evt, onResponsePopupCloseClick);
  };

  var onResponsePopupCloseClick = function () {
    successLoading.classList.add('hidden');
    errorLoading.classList.add('hidden');

    document.removeEventListener('keydown', onResponsePopupEscPress);
  };

  var onOutsideCloseClick = function (evt) {
    if (successLoading == evt.target || errorLoading == evt.target) {
      successLoading.classList.add('hidden');
      errorLoading.classList.add('hidden');
    }

    document.removeEventListener('keydown', onResponsePopupEscPress);
  };

  successLoading.addEventListener('click', function (evt) {
    onOutsideCloseClick(evt);
  });

  errorLoading.addEventListener('click', function (evt) {
    onOutsideCloseClick(evt);
  });

  successButton.addEventListener('click', function () {
    onResponsePopupCloseClick();
  });

  errorButton.addEventListener('click', function () {
    onResponsePopupCloseClick();
  });

  window.success = {
    appendSuccessFragment: appendSuccessFragment,
    onResponsePopupEscPress: onResponsePopupEscPress
  };
})();
