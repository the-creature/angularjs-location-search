/*
*define an user controller for search engine.
*/
function UserCtrl($scope, localStorageService, $location, UserLogin) {
    "use strict";
    //define a login method for this controller.
    $scope.login = function(user) {
        //invoke User login service to save user info.
        UserLogin.save({}, user,
            function(res) {
                localStorageService.set('sid', res.id);
                localStorageService.set('uid', res.uid);
                localStorageService.set('path', res.path);
                localStorageService.set('ts', new Date().getTime().toString());
                //change the current view to search view.
                $location.path('/search');
            },
            function(res) {
                
            });
    };
}