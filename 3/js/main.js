'use strict';

var ADS_QUANTITY = 8;
var AD_WIDTH = 50;
var AD_HEIGHT = 70;

var titles = ['первый', 'второй', 'третий', 'четвертый', 'пятый', 'шестой', 'седьмой', 'восьмой'];
var type = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = checkin;
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var description = ['новая', 'модель', 'организационной', 'деятельности', 'позволяет', 'выполнять'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapFilters = document.querySelector('.map__filters-container');

map.classList.remove('map--faded');

// случайное значениe массива
var getRandomArrayIndex = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// случайное значение из диапазона
var getRandomNumber = function (min, max) {
  var random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(random);
};

var ads = [];

// случайная длина массива
var getRandomArray = function (array) {
  return array.slice(Math.round(Math.random() * array.length));
};

var createArray = function (array) {

  for (var i = 1; i <= ADS_QUANTITY; i++) {
    var addressX = getRandomNumber(100, 1200);
    var addressY = getRandomNumber(130, 630);

    array.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'title': getRandomArrayIndex(titles),
        'address': addressX + ', ' + addressY,
        'price': getRandomNumber(100, 10000),
        'type': getRandomArrayIndex(type),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 10),
        'checkin': getRandomArrayIndex(checkin),
        'checkout': getRandomArrayIndex(checkout),
        'features': getRandomArray(features),
        'description': getRandomArrayIndex(description),
        'photos': getRandomArray(photos)
      },
      'location': {
        'x': addressX,
        'y': addressY
      }
    });
  }

  return array;
};

createArray(ads);

var adTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var createAd = function (ad) {
  var adItem = adTemplate.cloneNode(true);
  var adItemImage = adItem.querySelector('img');

  adItem.style.left = ad.location.x - AD_WIDTH / 2 + 'px';
  adItem.style.top = ad.location.y - AD_HEIGHT + 'px';

  adItemImage.src = ad.author.avatar;
  adItemImage.alt = ad.offer.title;

  return adItem;
};

var renderAds = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < ads.length; j++) {
    fragment.appendChild(createAd(ads[j]));
  }
  mapPins.appendChild(fragment);
};

renderAds();

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

  // иконки фич
  for (var i = 0; i < mapCardFeatures.length; i++) {
    var remove = true;
    for (var j = 0; j < ad.offer.features.length; j++) {
      var featureClass = 'popup__feature--' + ad.offer.features[j];
      if (mapCardFeatures[i].classList.contains(featureClass)) {
        remove = false;
      }
    }
    if (remove) {
      mapCardFeaturesContainer.removeChild(mapCardFeatures[i]);
      i = i - 1;
    }
  }

  mapCardTitle.textContent = ad.offer.title;
  mapCardAdress.textContent = ad.offer.address;
  mapCardPrice.textContent = ad.offer.price + '₽/ночь';
  mapCardCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  mapCardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  mapCardDescription.textContent = ad.offer.description;
  mapCardAvatar.src = ad.author.avatar;


  // фотографии
  getPhotos(ad.offer.photos, mapCardPhotosContainer);

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

var renderMapCard = function () {
  var fragmentSecond = document.createDocumentFragment();
  fragmentSecond.appendChild(createMapCard(ads[0]));
  map.insertBefore(fragmentSecond, mapFilters);
};

renderMapCard();
