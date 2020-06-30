'use strict';

(function () {
  // var ads = [];
  var mapCards = document.querySelectorAll('.map__card');
  var closeButtons = document.querySelectorAll('.popup__close');

  var createArray = function (array) {

    for (var i = 1; i <= window.data.ADS_QUANTITY; i++) {
      var addressX = window.utils.getRandomNumber(100, 1200);
      var addressY = window.utils.getRandomNumber(130, 630);

      array.push({
        'author': {
          'avatar': 'img/avatars/user0' + i + '.png'
        },
        'offer': {
          'title': window.utils.getRandomArrayIndex(window.data.titles),
          'address': addressX + ', ' + addressY,
          'price': window.utils.getRandomNumber(100, 10000),
          'type': window.utils.getRandomArrayIndex(window.data.type),
          'rooms': window.utils.getRandomNumber(1, 5),
          'guests': window.utils.getRandomNumber(1, 10),
          'checkin': window.utils.getRandomArrayIndex(window.data.checkin),
          'checkout': window.utils.getRandomArrayIndex(window.data.checkout),
          'features': window.utils.getRandomArray(window.data.features),
          'description': window.utils.getRandomArrayIndex(window.data.description),
          'photos': window.utils.getRandomArray(window.data.photos)
        },
        'location': {
          'x': addressX,
          'y': addressY
        }
      });
    }

    return array;
  };

  createArray(window.data.ads);

  var adTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var createAd = function (ad) {
    var adItem = adTemplate.cloneNode(true);
    var adItemImage = adItem.querySelector('img');

    adItem.style.left = ad.location.x - window.data.AD_WIDTH / 2 + 'px';
    adItem.style.top = ad.location.y - window.data.AD_HEIGHT + 'px';

    adItemImage.src = ad.author.avatar;
    adItemImage.alt = ad.offer.title;

    return adItem;
  };

  var onClickOpenCard = function (element, data) {
    element.addEventListener('click', function () {
      data.classList.remove('hidden');
      window.utils.makeElementsDisabled(window.htmlSelectors.mapPinsCollection);
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
      window.utils.makeElementsAvailable(window.htmlSelectors.mapPinsCollection);
      window.htmlSelectors.mapPinMain.setAttribute('disabled', true);
    });
  };

  var onEscCloseCard = function (data) {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        data.classList.add('hidden');
        window.utils.makeElementsAvailable(window.htmlSelectors.mapPinsCollection);
        window.htmlSelectors.mapPinMain.setAttribute('disabled', true);
      }
    });
  };



  window.card = {
    // ads: ads,

    createAd: createAd,
    openCard: openCard,
    closeCard: closeCard,
    onClickOpenCard: onClickOpenCard,
    closeButtons: closeButtons,
    onClickCloseCard: onClickCloseCard,
    onEscCloseCard: onEscCloseCard
  };
})();
