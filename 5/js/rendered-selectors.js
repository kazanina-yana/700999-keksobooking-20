'use strict';

(function () {
  var mapCards = document.querySelectorAll('.map__card');
  var closeButtons = document.querySelectorAll('.popup__close');
  var mapPinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main');

  window.renderedSelectors = {
    mapPinsCollection: mapPinsCollection,
    closeButtons: closeButtons,
    mapCards: mapCards
  };
})();
