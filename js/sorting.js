'use strict';
(function () {
  var MAX_LENGTH_PHOTOS = 10;

  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = document.querySelector('.img-filters__form');
  var imgFiltersButton = imgFiltersForm.querySelectorAll('.img-filters__button');
  var defaultButtonSort = imgFiltersForm.querySelector('#filter-default');
  var randomButtonSort = imgFiltersForm.querySelector('#filter-random');
  var discussedButtonSort = imgFiltersForm.querySelector('#filter-discussed');
  var usersContainer = document.querySelector('.pictures');
  var data = window.data;

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

  var getRandomPhotos = function () {
    var someRandomPhotos = data.map(function (element) {
      return [element, Math.random()];
    })
    .sort(function (a, b) {
      return a[1] - b[1];
    })
    .map(function (element) {
      return element[0];
    })
    .slice((data.length - MAX_LENGTH_PHOTOS), data.length);

    return someRandomPhotos;
  };

  var getDiscussedFilter = function () {
    var clonePfotos = data.slice();

    clonePfotos.sort(function (a, b) {
      return a.comments.length < b.comments.length ? 1 : -1;
    });
    return clonePfotos;
  };

  var onFilterButtonClick = window.debounce(function () {
    imgFilters.classList.remove('img-filters--inactive');

    imgFiltersForm.addEventListener('click', function (evt) {
      var target = evt.target;

      clearGallery();

      removeBtnActiveClass(evt);
      target.classList.add('img-filters__button--active');

      if (target === defaultButtonSort) {
        window.picture.appendPhotoFragment(data);
      }

      if (target === randomButtonSort) {
        getRandomPhotos();
        window.picture.appendPhotoFragment(getRandomPhotos());
      }

      if (target === discussedButtonSort) {
        getDiscussedFilter();
        window.picture.appendPhotoFragment(getDiscussedFilter());
      }
    });
  });

  onFilterButtonClick();

})();
