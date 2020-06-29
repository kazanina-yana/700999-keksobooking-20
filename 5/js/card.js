'use strict';

window.card = (function () {
  var ads = [];

  var createArray = function (array) {

    for (var i = 1; i <= window.data.ADS_QUANTITY; i++) {
      var addressX = window.randomFunction.getRandomNumber(100, 1200);
      var addressY = window.randomFunction.getRandomNumber(130, 630);

      array.push({
        'author': {
          'avatar': 'img/avatars/user0' + i + '.png'
        },
        'offer': {
          'title': window.randomFunction.getRandomArrayIndex(window.data.titles),
          'address': addressX + ', ' + addressY,
          'price': window.randomFunction.getRandomNumber(100, 10000),
          'type': window.randomFunction.getRandomArrayIndex(window.data.type),
          'rooms': window.randomFunction.getRandomNumber(1, 5),
          'guests': window.randomFunction.getRandomNumber(1, 10),
          'checkin': window.randomFunction.getRandomArrayIndex(window.data.checkin),
          'checkout': window.randomFunction.getRandomArrayIndex(window.data.checkout),
          'features': window.randomFunction.getRandomArray(window.data.features),
          'description': window.randomFunction.getRandomArrayIndex(window.data.description),
          'photos': window.randomFunction.getRandomArray(window.data.photos)
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

    adItem.style.left = ad.location.x - window.data.AD_WIDTH / 2 + 'px';
    adItem.style.top = ad.location.y - window.data.AD_HEIGHT + 'px';

    adItemImage.src = ad.author.avatar;
    adItemImage.alt = ad.offer.title;

    return adItem;
  };

  return {
    ads: ads,
    createArray: createArray,
    adTemplate: adTemplate,
    createAd: createAd
  };
})();
