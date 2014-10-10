/*
* register a location service for search engin app.
*/
"use strict";
angular.module('locationServices', ['ngResource'])
    .factory('getIp', function($resource) { //Need to get ip when developing locally
            return $resource('http://jsonip.com');
        })
        /**
         * Get ip is necessary when testing locally,
         * otherwise, ip locate can be used without the ip param
         */
    .factory('ipLocate', function($resource) {
            var url = 'http://freegeoip.net/json/:ip';
            return $resource(url, {
                ip: '@ip'
            });
        })
    //find the place based on the user input
    .factory('findFromAdd', function($resource) {
        var url = 'https://maps.googleapis.com/maps/api/geocode/json';
        return $resource(url, {
            address: '@add',
            sensor: false,
            key: 'AIzaSyChBLxe-W3zitvaraGBp33M5naEiEH2qFk'
        });
    })
    //find the city based on the lat,lng.
    .factory('findCity', function($resource) {
        var url = 'https://maps.googleapis.com/maps/api/geocode/json';
        return $resource(url, {
            latlng: '@latlng',
            sensor: false,
            key: 'AIzaSyChBLxe-W3zitvaraGBp33M5naEiEH2qFk'
        });
    });