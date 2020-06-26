'use strict';

var ADS_QUANTITY = 8;
var AD_WIDTH = 50;
var AD_HEIGHT = 70;
var MAP_PIN_WIDTH = 65;
var MAP_PIN_HEIHGT = 65;

var titles = ['первый', 'второй', 'третий', 'четвертый', 'пятый', 'шестой', 'седьмой', 'восьмой'];
var type = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = checkin;
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var description = ['новая', 'модель', 'организационной', 'деятельности', 'позволяет', 'выполнять'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

var mapFilter = document.querySelector('.map__filters');
var mapFilters = mapFilter.children;


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

/*
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
*/

// карточка объявления
/* var cardTemplate = document.querySelector('#card')
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

// var renderMapCard = function () {
//   var fragmentSecond = document.createDocumentFragment();
//   fragmentSecond.appendChild(createMapCard(ads[0]));
//   map.insertBefore(fragmentSecond, mapFilters);
// };

// renderMapCard(); */


// Личный проект: доверяй, но проверяй (часть 1)
var mapFiltersSelects = document.querySelectorAll('.map__filter');
var mapFeaturesFieldset = document.querySelector('.map__features');
var mapFeatures = mapFeaturesFieldset.children;
var adForm = document.querySelector('.ad-form');
var adFormSubmit = document.querySelector('.ad-form__submit');

// функция фичи недоступны
var makeElementsDisabled = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('disabled', true);
  }
};

var makeElementsAvailable = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].removeAttribute('disabled');
  }
};

makeElementsDisabled(mapFeatures);
makeElementsDisabled(mapFiltersSelects);

// главный пин, показываем карту по нажатию
var mapPinMain = document.querySelector('.map__pin--main');


var makeElementActive = function (evt) {
  if (evt.button === 0) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    makeElementsAvailable(mapFilters);
    makeElementsAvailable(mapFeatures);
    renderAds();
  }
};

mapPinMain.addEventListener('mousedown', makeElementActive);
mapPinMain.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.key === 'Enter') {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    renderAds();
  }
});

var adressInput = document.querySelector('#address');

adressInput.value = (Math.round(MAP_PIN_WIDTH / 2 + mapPinMain.offsetLeft)) + ', ' + (Math.round(MAP_PIN_HEIHGT + mapPinMain.offsetTop));

// валидация формы
var adFormTitle = document.querySelector('#title');
adFormTitle.setAttribute('required', true);

var adFormType = document.querySelector('#type');

var adFormPrice = document.querySelector('#price');
adFormPrice.setAttribute('required', true);

var setMinValue = function () {
  switch (adFormType.value) {
    case ('bungalo'):
      adFormPrice.setAttribute('min', 0);
      adFormPrice.setAttribute('placeholder', 0);
      break;
    case ('flat'):
      adFormPrice.setAttribute('min', 1000);
      adFormPrice.setAttribute('placeholder', 1000);
      break;
    case ('house'):
      adFormPrice.setAttribute('min', 5000);
      adFormPrice.setAttribute('placeholder', 5000);
      break;
    case ('palace'):
      adFormPrice.setAttribute('min', 10000);
      adFormPrice.setAttribute('placeholder', 10000);
      break;
  }
};

adFormType.addEventListener('change', function (evt) {
  evt.preventDefault();
  setMinValue();
});

// спальные места
var roomNumber = document.querySelector('#room_number');
var roomCapacity = document.querySelector('#capacity');

var setRoomsToGuests = function () {
  if (roomNumber.value === '1' && (roomCapacity.value > roomNumber.value || roomCapacity.value === '0')) {
    roomNumber.setCustomValidity('Для 1 гостя');
  } else if (roomNumber.value === '2' && (roomCapacity.value > roomNumber.value || roomCapacity.value === '0')) {
    roomNumber.setCustomValidity('Для 2 гостей или для 1 гостя');
  } else if (roomNumber.value === '3' && roomCapacity.value === '0') {
    roomNumber.setCustomValidity('Для 3 гостей, для 2 гостей или для 1 гостя');
  } else if (roomNumber.value === '100') {
    roomNumber.setCustomValidity('Не для гостей');
  } else {
    roomNumber.setCustomValidity('');
  }
};

roomNumber.addEventListener('change', function (evt) {
  evt.preventDefault();

  setRoomsToGuests();
});

roomCapacity.addEventListener('change', function (evt) {
  evt.preventDefault();

  setRoomsToGuests();
});

// кастомные сообщения валидации
var checkAdFormTitleValidity = function () {
  var validityStateObject = adFormTitle.validity;
  if (validityStateObject.valueMissing) {
    adFormTitle.setCustomValidity('Пожалуйста заполните это поле!');
  } else if (validityStateObject.tooShort) {
    adFormTitle.setCustomValidity('Описание должно быть не менее 30 символов');
  } else {
    adFormTitle.setCustomValidity('');
  }
};

var checkAdFormPriceValidity = function () {
  var validityStateObject = adFormPrice.validity;
  if (validityStateObject.valueMissing) {
    adFormPrice.setCustomValidity('Пожалуйста заполните это поле!');
  } else if (validityStateObject.rangeUnderflow) {
    adFormPrice.setCustomValidity('Стомость должна быть больше ' + adFormPrice.min + ' руб');
  } else if (validityStateObject.rangeOverflow) {
    adFormPrice.setCustomValidity('Стомость должна быть меньше ' + adFormPrice.max + ' руб');
  } else {
    adFormPrice.setCustomValidity('');
  }
};

adFormPrice.addEventListener('invalid', function () {
  checkAdFormPriceValidity();
});

adFormTitle.addEventListener('invalid', function () {
  checkAdFormTitleValidity();
});

adFormSubmit.addEventListener('click', function () {
  if (roomNumber.value === '1' && (roomCapacity.value > roomNumber.value || roomCapacity.value === '0')) {
    roomNumber.setCustomValidity('Для 1 гостя');
  }
});


