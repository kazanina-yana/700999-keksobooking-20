'use strict';

var titles = ['первый', 'второй', 'третий', 'четвертый', 'пятый', 'шестой', 'седьмой', 'восьмой'];
var type = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var description = ['новая', 'модель', 'организационной', 'деятельности', 'позволяет', 'выполнять'];
// var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// случайное значениe массива
var getRandomArrayIndex = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// случайное значение из диапазона
var getRandomNumber = function (min, max) {
  var random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(random);
};

// случайная длина массива
// var getRandomArrayLength = function (array) {

// на эту строку ругается npm test: 'Return statement should not contain assignment '
// return array.length = [Math.round(Math.random() * array.length)];
// };

// перемешивание массива
// var shuffleArray = function (array) {
//   for (var i = array.length - 1; i > 0; i--) {
//     var j = Math.floor(Math.random() * (i + 1));

//     // на эту строку ругается npm test: "Parsing error: Assigning to rvalue"
//     // [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

var ads = [];

var featuresLength = 6;
features.length = getRandomNumber(1, featuresLength);


var createArray = function (array) {
  for (var i = 0; i < 8; i++) {
    array.push({
      'author': {
        'avatar': 'img/avatars/user' + '0' + (i + 1) + '.png'
      },
      'offer': {
        'title': titles[i],

        // не работает
        // 'address': 2,

        'price': getRandomNumber(100, 10000),
        'type': getRandomArrayIndex(type),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 10),
        'checkin': getRandomArrayIndex(checkin),

        // не работает
        'features': features,

        'description': getRandomArrayIndex(description),

        // не работает
        // 'photos': getRandomArrayLength(photos)[i + Math.round(Math.random() * photos.length)]
      },
      'location': {
        'x': getRandomNumber(100, 1200),
        'y': getRandomNumber(130, 630)
      }
    });
  }

  return array;
};

createArray(ads);
// console.log(createArray(ads));

var adTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');


// не работает
var renderAd = function (ad) {
  var adItem = adTemplate.cloneNode(true);
  adItem.querySelector('.map__pin').src = ad.avatar;
  adItem.querySelector('.map__pin').style = 'left: 200px top: 300px;';
  adItem.querySelector('.map__pin').alt = ad.title;
  return adItem;
};

var fragment = document.createDocumentFragment();

// не работает
for (var j = 0; j < ads.length; j++) {
  fragment.appendChild(renderAd(ads[j]));
}

adTemplate.appendChild(fragment);
