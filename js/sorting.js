'use strict';
(function () {
  var MAX_LENGTH_PHOTOS = 10;

  var imgFiltersForm = document.querySelector('.img-filters__form');
  var imgFiltersButton = imgFiltersForm.querySelectorAll('.img-filters__button');
  var defaultButtonSort = imgFiltersForm.querySelector('#filter-default');
  var randomButtonSort = imgFiltersForm.querySelector('#filter-random');
  var discussedButtonSort = imgFiltersForm.querySelector('#filter-discussed');
  var usersContainer = document.querySelector('.pictures');

  var removeBtnActiveClass = function () {
    imgFiltersButton.forEach(function (item) {
      if (item.classList.contains('img-filters__button--active')) {
        item.classList.remove('img-filters__button--active');
      }
    });
  };

  var clearGallery = function () {
    var photos = document.querySelectorAll('.picture');

    photos.forEach(function (item) {
      usersContainer.removeChild(item);
    });
  };

  var getDiscussedFilter = function (photo) {
    var clonePhotos = photo.slice();

    clonePhotos.sort(function (a, b) {
      return a.comments.length < b.comments.length ? 1 : -1;
    });
    return clonePhotos;
  };

  var getRandomPhotos = function (photo) {
    var cloneRandomPhotos = photo.slice();
    var cloneRandomArr = window.util.getRandomArrays(cloneRandomPhotos);

    return cloneRandomArr.slice(0, MAX_LENGTH_PHOTOS);
  };

  imgFiltersButton.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      var data = window.data;
      var target = evt.target;
      clearGallery();
      removeBtnActiveClass(evt);
      target.classList.add('img-filters__button--active');

      if (target === defaultButtonSort) {
        window.picture.renderPhotos(data);
      }

      if (target === randomButtonSort) {
        window.picture.renderPhotos(getRandomPhotos(data));
      }

      if (target === discussedButtonSort) {
        window.picture.renderPhotos(getDiscussedFilter(data));
      }
    });
  });
})();
