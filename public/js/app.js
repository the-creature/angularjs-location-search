"use strict";
/**
 * Main app
 */
window.restaurantSearch = angular.module('restaurantSearch', [
  'ngRoute',
  'LocalStorageModule',
  'usersServices',
  'geolocation',
  'locationServices',
  'google-maps',
  'duScroll',
  'pageServices',
  'fourSquareService',
  'yelpServices',
  'ui.bootstrap'
]).config(mainRouter)
  .run(function (
    $rootScope,
    localStorageService
  ) {
    $rootScope.keys = localStorageService.keys();
    if (!$rootScope.keys.sid) {
      localStorageService.set('sid', false);
    }
    if ($rootScope.keys.ll) {
      $rootScope.ll = $rootScope.keys.ll;
    } else {
      $rootScope.ll = {
        latitude: 37.8,
        longitude: -122.4
      };
    }
});

function mainRouter ($routeProvider ) {
	$routeProvider
    .when('/login',  {templateUrl: 'templates/login.html' , controller: 'UserCtrl'  })
    .when('/search', {templateUrl: 'templates/search.html', controller: 'SearchCtrl'})
    .when('/signup', {templateUrl: 'templates/signup.html', controller: 'SignUpCtrl'})
    .otherwise({redirectTo: '/search'});
}