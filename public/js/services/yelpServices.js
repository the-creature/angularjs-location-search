"use strict";
angular.module('yelpServices', [
  'ngResource',
])
  .factory('yelpServ', function ($resource) {
    return $resource('api/yelp');
  });