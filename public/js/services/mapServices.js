/*
*register a map service for search engine app.
*/
"use strict";
angular.module('mapServices', [])
    //factory a google map Service with default options.
    .factory('mapServ', function() {
        var mapServices = {};
        //set the default options for google map.
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