'use strict';

window.randomFunction = (function () {
  // случайное значениe массива
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

  return {
    getRandomArrayIndex: getRandomArrayIndex,
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray
  };
})();
