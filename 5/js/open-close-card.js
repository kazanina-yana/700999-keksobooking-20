'use strict';

window.openCloseCard = (function () {
  var mapCards = document.querySelectorAll('.map__card');
  var closeButtons = document.querySelectorAll('.popup__close');

  var onClickOpenCard = function (element, data) {
    element.addEventListener('click', function () {
      data.classList.remove('hidden');
      window.disabledAvailable.makeElementsDisabled(window.htmlSelectors.mapPinsCollection);
    });
  };

  var openCard = function () {
    for (var i = 0; i < mapCards.length; i++) {
      onClickOpenCard(window.htmlSelectors.mapPinsCollection[i + 2], mapCards[i]);
    }
  };

  var closeCard = function () {
    for (var i = 0; i < mapCards.length; i++) {
      onClickCloseCard(closeButtons[i], mapCards[i]);
      onEscCloseCard(mapCards[i]);
    }
    document.removeEventListener('keydown', onEscCloseCard);
  };

  var onClickCloseCard = function (element, data) {
    element.addEventListener('click', function () {
      data.classList.add('hidden');
      window.disabledAvailable.makeElementsAvailable(window.htmlSelectors.mapPinsCollection);
      window.map.mapPinMain.setAttribute('disabled', true);
    });
  };

  var onEscCloseCard = function (data) {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        data.classList.add('hidden');
        window.disabledAvailable.makeElementsAvailable(window.htmlSelectors.mapPinsCollection);
        window.map.mapPinMain.setAttribute('disabled', true);
      }
    });
  };

  return {
    onClickOpenCard: onClickOpenCard,
    openCard: openCard,
    closeCard: closeCard,
    closeButtons: closeButtons,
    onClickCloseCard: onClickCloseCard,
    onEscCloseCard: onEscCloseCard
  };
})();
