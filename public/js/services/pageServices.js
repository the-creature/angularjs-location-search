"use strict";
angular.module('pageServices', [
  'fourSquareService',
  'yelpServices',
  'locationServices'
])
  .factory('searchServ', function ($rootScope, $location, $q, findFromAdd, findCity, fourSquareServ, yelpServ) {
    var messageSearches = {};
    messageSearches.displayMessage = 'Hungry?'; //To be display when there are no results to display.

    messageSearches.ll = $rootScope.ll || {};
    messageSearches.places = [];

    messageSearches.markers = [];
    messageSearches.selectedModelId = 0;

    messageSearches.pageLimit= 12;
    messageSearches.currentPage = 1;

    messageSearches.query = '';
    messageSearches.near  = '';

    messageSearches.prepSearch = function (query, near) {
      this.query = query;
      this.near  = near;
      this.searchNow();
    };

    messageSearches.searchNow = function () {
      var promises = [];

      var offset = (messageSearches.pageLimit) * (messageSearches.currentPage - 1);

      promises.push(fourSquareServ.get({
          near: messageSearches.near,
          query: messageSearches.query,
          limit: messageSearches.pageLimit,
          offset: offset
      })
      .$promise.then(function (res) {
        if (res.response.venues) {
          var venues = res.response.venues;

          venues.map(function (venue) {
            venue.active = ''; //For list item highlighting
            if (!venue.location.address) {
              findCity.get({}, {
                latlng: venue.location.lat + ',' + venue.location.lng
              })
                .$promise.then(function (res) {
                  venue.add = res.results[0].formatted_address;
                });
            } else {
              venue.add = venue.location.address;
            }

            messageSearches.markers.push({//Add venue to map markers
              latitude: venue.location.lat,
              longitude:venue.location.lng,
              id: venue.id
            });
            messageSearches.places.push(venue);
          });

        }
        return 'Foursquare success';
      })
      .catch(function (res) { //Error from Foursquare
      }));

      promises.push(yelpServ.get({
        location: messageSearches.near,
        term: messageSearches.query,
        limit: messageSearches.pageLimit + 1,
        offset: offset
      })
        .$promise.then(function (res) {
          if(res.total > 0) {
            res.businesses.map(function(business) {
              var addressArr = business.location.display_address,
                  add = addressArr.join(',');
              findFromAdd.get({}, {
                add: add
              })
                .$promise.then(function (res) {
                  if (res.results[0]) {
                    messageSearches.markers.push({//Add to map markers
                      latitude : res.results[0].geometry.location.lat,
                      longitude: res.results[0].geometry.location.lng,
                      id: business.id,
                      icon: ''
                    });
                    business.add = res.results[0].formatted_address;
                    business.active = ''; //for list item highlighting
                    messageSearches.places.push(business);
                  }
                }
              );
            });
          }
          return 'Yelp success';
        })
        .catch(function (res) {//Error from Yelp
        }));

      return $q.all(promises).then(function () {//All api returned successfully, now redirect to results

        //Only to display when places is empty after search
        messageSearches.displayMessage = 'No results found';
        $location.path('#/search');
      });
    };

    messageSearches.loadNextPage = function (newPage) {
      messageSearches.currentPage = newPage;
      messageSearches.places = [];
      messageSearches.markers = [];
      this.searchNow();
    };

    messageSearches.refreshMap = function (ll) {
      messageSearches.ll = ll;
      $rootScope.$broadcast('refreshMap');
    };

    return messageSearches;
  });