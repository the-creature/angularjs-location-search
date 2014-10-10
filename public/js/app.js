"use strict";
/**
 * Main app,create a restaurant search module app based on angular.
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
    ])
    //config page router for app.
    .config(function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'UserCtrl'
            })
            .when('/search', {
                templateUrl: 'templates/search.html',
                controller: 'SearchCtrl'
            })
            .when('/signup', {
                templateUrl: 'templates/signup.html',
                controller: 'SignUpCtrl'
            })
            .otherwise({
                redirectTo: '/search'
            });
    })
    //run the basic configs when app started.
    .run(function($rootScope, localStorageService) {
        //retrieve the default lat,lng for google map.
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

/*commented this function,jerry.
function mainRouter($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'UserCtrl'
        })
        .when('/search', {
            templateUrl: 'templates/search.html',
            controller: 'SearchCtrl'
        })
        .when('/signup', {
            templateUrl: 'templates/signup.html',
            controller: 'SignUpCtrl'
        })
        .otherwise({
            redirectTo: '/search'
        });
}
*/