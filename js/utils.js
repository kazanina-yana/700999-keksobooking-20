'use strict';
 (function () {
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

  var getRandomArrayIndex = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  // случайное значение из диапазона
  var getRandomNumber = function (min, max) {
    var random = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(random);
  };

  var getRandomArray = function (array) {
    return array.slice(Math.round(Math.random() * array.length));
  };

  window.utils = {
    makeElementsDisabled: makeElementsDisabled,
    makeElementsAvailable: makeElementsAvailable,
    getRandomArrayIndex: getRandomArrayIndex,
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray
  }
 })();
