'use strict';

window.map = (function () {
  var mapPinMain = document.querySelector('.map__pin--main');

  var renderAds = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.card.ads.length; j++) {
      fragment.appendChild(window.card.createAd(window.card.ads[j]));
    }
    window.htmlSelectors.mapPins.appendChild(fragment);
  };

  // функция фото
  var getPhotos = function (array, block) {
    var fragmentPhoto = document.createDocumentFragment();

    block.innerHTML = '';

    for (var i = 0; i < array.length; i++) {
      var photo = document.createElement('img');
      photo.src = array[i];
      photo.width = 45;
      photo.classList.add('popup__photo');

      fragmentPhoto.appendChild(photo);
    }

    return block.appendChild(fragmentPhoto);
  };

  // функция фич
  var fragmentFeatures = document.createDocumentFragment();
  var createFeatures = function (featuresList) {
    featuresList.forEach(function (feature) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + feature;
      fragmentFeatures.appendChild(featureElement);
      return featureElement;
    });
    return fragmentFeatures;
  };

  // карточка объявления
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var createMapCard = function (ad) {
    var mapCard = cardTemplate.cloneNode(true);
    var mapCardTitle = mapCard.querySelector('.popup__title');
    var mapCardAdress = mapCard.querySelector('.popup__text--address');
    var mapCardPrice = mapCard.querySelector('.popup__text--price');
    var mapCardType = mapCard.querySelector('.popup__type');
    var mapCardCapacity = mapCard.querySelector('.popup__text--capacity');
    var mapCardTime = mapCard.querySelector('.popup__text--time');
    var mapCardDescription = mapCard.querySelector('.popup__description');
    var mapCardAvatar = mapCard.querySelector('.popup__avatar');
    var mapCardFeaturesContainer = mapCard.querySelector('.popup__features');
    var mapCardFeatures = mapCardFeaturesContainer.children;
    var mapCardPhotosContainer = mapCard.querySelector('.popup__photos');

    mapCardTitle.textContent = ad.offer.title;
    mapCardAdress.textContent = ad.offer.address;
    mapCardPrice.textContent = ad.offer.price + '₽/ночь';
    mapCardCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    mapCardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    mapCardDescription.textContent = ad.offer.description;
    mapCardAvatar.src = ad.author.avatar;

    // фотографии
    getPhotos(ad.offer.photos, mapCardPhotosContainer);
    // удаляем фичи из разметки
    for (var i = mapCardFeatures.length; i--;) {
      mapCardFeaturesContainer.removeChild(mapCardFeatures[i]);
    }
    // добавляем фичи из массива
    mapCardFeaturesContainer.appendChild(createFeatures(ad.offer.features));
    // типы жилья
    switch (ad.offer.type) {
      case ('flat'):
        mapCardType.textContent = 'квартира';
        break;
      case ('bungalo'):
        mapCardType.textContent = 'бунгало';
        break;
      case ('house'):
        mapCardType.textContent = 'дом';
        break;
      case ('palace'):
        mapCardType.textContent = 'дворец';
        break;
    }

    return mapCard;
  };

  var mapCards = document.querySelectorAll('.map__card');
  var closeButtons = document.querySelectorAll('.popup__close');

  var hideMapCards = function () {
    for (var k = 0; k < mapCards.length; k++) {
      mapCards[k].classList.add('hidden');
    }
  };

  hideMapCards();

  var onClickOpenCard = function (element, data) {
    element.addEventListener('click', function () {
      data.classList.remove('hidden');
      window.disabledAvailable.makeElementsDisabled(window.htmlSelectors.mapPinsCollection);
    });
  };

  var onClickCloseCard = function (element, data) {
    element.addEventListener('click', function () {
      data.classList.add('hidden');
      window.disabledAvailable.makeElementsAvailable(window.htmlSelectors.mapPinsCollection);
      mapPinMain.setAttribute('disabled', true);
    });
  };

  var onEscCloseCard = function (data) {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        data.classList.add('hidden');
        window.disabledAvailable.makeElementsAvailable(window.htmlSelectors.mapPinsCollection);
        mapPinMain.setAttribute('disabled', true);
      }
    });
  };

  var openCard = function () {
    for (var i = 0; i < mapCards.length; i++) {
      onClickOpenCard(window.htmlSelectors.mapPinsCollection[i + 2], mapCards[i]);
    }
  };

  var closeCard = function () {
    for (var i = 0; i < mapCards.length; i++) {
      onClickCloseCard(window.htmlSelectors.closeButtons[i], mapCards[i]);
      onEscCloseCard(mapCards[i]);
    }
    document.removeEventListener('keydown', onEscCloseCard);
  };

  return {
    renderAds: renderAds,
    createMapCard: createMapCard,
    closeButtons: closeButtons,
    hideMapCards: hideMapCards(),
    onClickOpenCard: onClickOpenCard,
    onClickCloseCard: onClickCloseCard,
    onEscCloseCard: onEscCloseCard,
    openCard: openCard,
    closeCard: closeCard,
    mapPinMain: mapPinMain,
  };
})();
