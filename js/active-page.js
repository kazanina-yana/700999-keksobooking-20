'use strict';

(function () {
  var makePageActive = function () {
    window.htmlSelectors.mapPinMain.setAttribute('disabled', true);

    window.htmlSelectors.map.classList.remove('map--faded');
    window.htmlSelectors.adForm.classList.remove('ad-form--disabled');
    window.utils.makeElementsAvailable(window.htmlSelectors.mapFilters);
    window.utils.makeElementsAvailable(window.htmlSelectors.mapFeatures);
    window.utils.makeElementsAvailable(window.htmlSelectors.mapFilter);
    window.map.renderAds();

    window.card.openCard();
    window.card.closeCard();
  };

  window.activePage = {
    makePageActive: makePageActive
  };
})();
