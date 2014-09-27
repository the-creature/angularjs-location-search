"use strict";
/**
 * main app controller
 */
function AppCtrl (
  $scope,
  $location,
  $q,
  geolocation,
  getIp,
  ipLocate,
  localStorageService,
  UserLogout,
  findFromAdd,
  findCity,
  searchServ
  ) {

  $scope.logout = function () {
    UserLogout.save({}, {}, function () {
      localStorageService.set('sid', false);
      localStorageService.remove('uid');
      localStorageService.remove('path');
      localStorageService.remove('ts');
      $location.path('#/login');
    },
    function () {//logout err
    });
  };


  $scope.getLocal = function () {

    var promises = [
      geolocation.getLocation()
        .then(function (data) {

          $scope.ll = {
            latitude : data.coords.latitude,
            longitude: data.coords.longitude
          };
          searchServ.refreshMap($scope.ll);
          return 'geolocation success';

        })
        .catch(function () {//User declined access

          getIp.get({}).$promise.then(function (res) {

            ipLocate.get({}, {ip: res.ip})
              .$promise.then(function (res) {

                $scope.ll = {
                  latitude : res.latitude,
                  longitude: res.longitude
                };

                searchServ.refreshMap($scope.ll);

                return 'ipLocate success';
              })
              .catch(function(res) {
                return console.log('ipLocate failed');
              });
          })
          .catch(function () {
            return console.log('getIp failed');
          });
        }
      )
    ];

    $q.all(promises).then(function () {

      findCity.get({}, {
        latlng: $scope.ll.latitude + ',' + $scope.ll.longitude
      })
        .$promise.then(function(res) {
          $scope.thisPlace = res.results[0].formatted_address;
        });

    });
  };

  $scope.handleSearch = function (query, near) {

    if ($scope.didThisPlaceChange) {
      $scope.didThisPlaceChange = false;
      findFromAdd.get({}, {
        add: near
      })
        .$promise.then(function (res) {
          if (res.results) {
            var ll = res.results[0].geometry.location;
            $scope.ll = {
              latitude: ll.lat,
              longitude: ll.lng
            };
          }
        })
        .catch(function (res) {
          console.log(res);
        });
    }
    searchServ.markers = [];
    searchServ.places = [];

    searchServ.prepSearch(query, near);
  };

  $scope.thisPlaceChanged = function () {
    $scope.didThisPlaceChange = true;
  };
}