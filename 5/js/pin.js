'use strict';

(function () {
  var ads = [];
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

  var renderAds = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < ads.length; j++) {
      fragment.appendChild(createAd(ads[j]));
    }
    window.htmlSelectors.mapPins.appendChild(fragment);
  };

  renderAds();
  window.pin = {
    ads: ads,
    renderAds: renderAds
  };
})();
