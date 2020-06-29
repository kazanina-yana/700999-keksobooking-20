'use strict';

window.pin = (function () {
  var renderMapCards = function () {
    var fragmentSecond = document.createDocumentFragment();
    for (var j = 0; j < window.card.ads.length; j++) {
      fragmentSecond.appendChild(window.map.createMapCard(window.card.ads[j]));
      window.htmlSelectors.map.insertBefore(fragmentSecond, window.htmlSelectors.mapFilters);
    }
  };

  renderMapCards();

  var makeElementActive = function (evt) {
    if (evt.button === 0) {
      window.activePage.makePageActive();
    }
  };

  window.map.mapPinMain.addEventListener('mousedown', makeElementActive);
  window.map.mapPinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      window.activePage.makePageActive();
    }
    window.map.mapPinMain.removeEventListener('keydown', function () {
      evt.preventDefault();
      if (evt.key === 'Enter') {
        window.activePage.makePageActive();
      }
    });
  });

  return {
    renderMapCards: renderMapCards,
    makeElementActive: makeElementActive
  };
})();
