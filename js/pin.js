'use strict';

(function () {
  var renderMapCards = function () {
    var fragmentSecond = document.createDocumentFragment();
    for (var j = 0; j < window.data.ads.length; j++) {
      fragmentSecond.appendChild(window.map.createMapCard(window.data.ads[j]));
      window.htmlSelectors.map.insertBefore(fragmentSecond, window.htmlSelectors.mapFilters);
    }
  };

  renderMapCards();

  var makeElementActive = function (evt) {
    if (evt.button === 0) {
      window.activePage.makePageActive();
    }
  };

  window.htmlSelectors.mapPinMain.addEventListener('mousedown', makeElementActive);
  window.htmlSelectors.mapPinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      window.activePage.makePageActive();
    }
    window.htmlSelectors.mapPinMain.removeEventListener('keydown', function () {
      evt.preventDefault();
      if (evt.key === 'Enter') {
        window.activePage.makePageActive();
      }
    });
  });

  window.pin = {
    renderMapCards: renderMapCards,
    makeElementActive: makeElementActive
  };
})();
