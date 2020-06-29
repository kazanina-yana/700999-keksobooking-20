'use strict';

window.hideCards = (function () {
  var mapCards = document.querySelectorAll('.map__card');

  var hideMapCards = function () {
    for (var k = 0; k < mapCards.length; k++) {
      mapCards[k].classList.add('hidden');
    }
  };
  hideMapCards();

  return {
    mapCards: mapCards,
    hideMapCards: hideMapCards
  };
})();
