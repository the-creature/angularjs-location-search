/*
*sign up controller for search engine app.
*/
function SignUpCtrl($scope, $location, localStorageService, SignUp) {
    "use strict";
    //define sigin up method for this controller.
    $scope.signUp = function(user) {
        //invoke Sign up service to save user info.
        SignUp.save({}, user,
            function(res) { //Todo: on success
                //store the user info to local storge.
                localStorageService.set('sid', res.id);
                localStorageService.set('uid', res.uid);
                localStorageService.set('path', res.path);
                localStorageService.set('ts', new Date().getTime().toString());
                //change the current view to search view.
                $location.path('/search');
            },
            function(res) { //Todo: on error

            });
    };
}