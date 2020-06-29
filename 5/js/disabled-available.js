'use strict';

window.disabledAvailable = (function () {
  var makeElementsDisabled = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].setAttribute('disabled', true);
    }
  };

  var makeElementsAvailable = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].removeAttribute('disabled');
    }
  };

  makeElementsDisabled(window.htmlSelectors.mapFeatures);
  makeElementsDisabled(window.htmlSelectors.mapFiltersSelects);

  return {
    makeElementsDisabled: makeElementsDisabled,
    makeElementsAvailable: makeElementsAvailable
  };
})();
