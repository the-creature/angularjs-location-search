/*
 * define a four square service  for search engine app.
 */
"use strict";
angular.module('fourSquareService', ['ngResource'])
    //factory a four square service.
    .factory('fourSquareServ', function($resource) {
        var requestUri = 'https://api.foursquare.com/v2/venues/:action',
            requestParms = {
                clientId: "GHFS54WOC452C20VWBZLEC55D5SUVZNCTTKU0EVLBO3NC251",
                clientSecret: "3N4CEEUJGZT0A3XHY34TCHMFVGYP3Z5EWP5LZLBJ22DDAFCP",
                version: "20140430"
            }
        return $resource(requestUri, {
            action: 'search',
            client_id: requestParms.clientId,
            client_secret: requestParms.clientSecret,
            v: requestParms.version,
            venuePhotos: '1',
            callback: 'JSON_CALLBACK'
        }, {
            get: {
                method: 'JSONP'
            }
        });
    });