'use strict';

(function () {
  window.utils.makeElementsDisabled(window.htmlSelectors.mapFeatures);
  window.utils.makeElementsDisabled(window.htmlSelectors.mapFiltersSelects);
  window.utils.hideElements(window.renderedSelectors.mapPinsCollection);

  var onClickOpenCard = function (element, data) {
    element.addEventListener('click', function () {
      window.card.removeCard();
      window.card.renderMapCard(data);
    });
  };


  var onClickCloseCard = function (element, data) {
    element.addEventListener('click', function () {

      data.classList.add('hidden');
      window.utils.makeElementsAvailable(window.renderedSelectors.mapPinsCollection);

    });
  };

  var onEscCloseCard = function (data) {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        data.classList.add('hidden');
        window.utils.makeElementsAvailable(window.renderedSelectors.mapPinsCollection);
      }
    });
  };

  var openCard = function () {
    window.pin.ads.forEach(function (item, index) {
      onClickOpenCard(window.renderedSelectors.mapPinsCollection[index], item);
    });
  };

  openCard();

  var closeCard = function () {
    for (var i = 0; i < window.renderedSelectors.mapCards.length; i++) {
      onClickCloseCard(window.renderedSelectors.closeButtons[i], window.renderedSelectors.mapCards[i]);
      onEscCloseCard(window.renderedSelectors.mapCards[i]);
    }
    document.removeEventListener('keydown', onEscCloseCard);
  };

  var makePageActive = function () {

    window.htmlSelectors.map.classList.remove('map--faded');
    window.htmlSelectors.adForm.classList.remove('ad-form--disabled');
    window.utils.makeElementsAvailable(window.htmlSelectors.mapFeatures);
    window.utils.makeElementsAvailable(window.htmlSelectors.mapFilter);

    closeCard();
    window.utils.showElements(window.renderedSelectors.mapPinsCollection);
  };

  var makeElementActive = function (evt) {
    if (evt.button === 0) {
      makePageActive();
    }
  };

  window.htmlSelectors.mapPinMain.addEventListener('mousedown', makeElementActive);
  window.htmlSelectors.mapPinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      makePageActive();
    }
    window.htmlSelectors.mapPinMain.removeEventListener('keydown', function () {
      evt.preventDefault();
      if (evt.key === 'Enter') {
        makePageActive();
      }
    });
  });
})();
