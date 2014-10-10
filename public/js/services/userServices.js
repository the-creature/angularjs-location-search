/*
*register an user service  for search engine.
*/
"use strict";
angular.module('usersServices', ['ngResource'])
    .factory('UserLogin', function($resource) {
        return $resource('api/users/login');
    })
    .factory('UserLogout', function($resource) {
        return $resource('api/users/logout');
    })
    .factory('SignUp', function($resource) {
        return $resource('/api/users/');
    })
    .factory('CurrentUser', function($resource) { //not currently used but usefull
        return $resource('/api/users/me');
    });