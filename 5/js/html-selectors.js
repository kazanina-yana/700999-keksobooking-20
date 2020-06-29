'use strict';

window.htmlSelectors = (function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinsCollection = mapPins.children;
  var mapFilter = document.querySelector('.map__filters');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapCards = document.querySelectorAll('.map__card');

  var mapFiltersSelects = document.querySelectorAll('.map__filter');
  var mapFeaturesFieldset = document.querySelector('.map__features');
  var mapFeatures = mapFeaturesFieldset.children;
  var adForm = document.querySelector('.ad-form');

  return {
    map: map,
    mapPins: mapPins,
    mapPinsCollection: mapPinsCollection,
    mapFilter: mapFilter,
    mapFilters: mapFilters,
    mapCards: mapCards,

    mapFiltersSelects: mapFiltersSelects,
    mapFeaturesFieldset: mapFeaturesFieldset,
    mapFeatures: mapFeatures,
    adForm: adForm
  };
})();
