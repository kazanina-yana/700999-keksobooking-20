'use strict';

window.activePage = (function () {
  var makePageActive = function () {
    window.map.mapPinMain.setAttribute('disabled', true);

    window.htmlSelectors.map.classList.remove('map--faded');
    window.htmlSelectors.adForm.classList.remove('ad-form--disabled');
    window.disabledAvailable.makeElementsAvailable(window.htmlSelectors.mapFilters);
    window.disabledAvailable.makeElementsAvailable(window.htmlSelectors.mapFeatures);
    window.disabledAvailable.makeElementsAvailable(window.htmlSelectors.mapFilter);
    window.map.renderAds();

    window.openCloseCard.openCard();
    window.openCloseCard.closeCard();
  };

  return {
    makePageActive: makePageActive
  };
})();
