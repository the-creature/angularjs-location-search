"use strict";
angular.module('mapServices', [])
.factory('mapServ', function () {
    var mapServices = {};
    mapServices.map = {
      center: {
        latitude: 37.8,
        longitude: -122.4
      },
      zoom: 10,
      draggable: true,
      control: {}
    };
    return mapServices;
  });