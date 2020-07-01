'use strict';

(function () {
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


  var renderMapCards = function () {
    var fragmentSecond = document.createDocumentFragment();
    for (var i = 0; i < window.pin.ads.length; i++) {
      fragmentSecond.appendChild(createMapCard(window.pin.ads[i]));
      window.htmlSelectors.map.insertBefore(fragmentSecond, window.htmlSelectors.mapFilters);
    }
  };

  renderMapCards();
})();
