'use strict';
(function () {
  var MAX_LENGTH_PHOTOS = 10;

  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = document.querySelector('.img-filters__form');
  var imgFiltersButton = imgFiltersForm.querySelectorAll('.img-filters__button');
  var defaultButtonSort = imgFiltersForm.querySelector('#filter-default');
  var randomButtonSort = imgFiltersForm.querySelector('#filter-random');
  var discussedButtonSort = imgFiltersForm.querySelector('#filter-discussed');

  imgFilters.classList.remove('img-filters--inactive');

  var onLoad = function (data) {

    imgFiltersForm.addEventListener('click', function (evt) {
      var target = evt.target;

      if (target === randomButtonSort) {
        console.log(200);

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

        console.log(getRandomPhotos());
      }
    });
  };

  window.backend.load(onLoad);
})();
