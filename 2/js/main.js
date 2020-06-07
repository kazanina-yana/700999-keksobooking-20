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
        'title': getRandomNumber(1, titles.length),
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
  var adItemImage = adTemplate.querySelector('img');

  adItem.style.left = ad.location.x - AD_WIDTH / 2 + 'px';
  adItem.style.top = ad.location.y - AD_HEIGHT + 'px';

  adItemImage.src = ad.author.avatar;
  adItemImage.alt = ad.offer.title;

  return adItem;
};

/* Отрисовывает метки*/
var renderAds = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < ads.length; j++) {
    fragment.appendChild(createAd(ads[j]));
  }
  mapPins.appendChild(fragment);
};

renderAds();
