function SignUpCtrl ($scope, $location, localStorageService, SignUp) {
  "use strict";
  $scope.signUp = function (user) {
    SignUp.save({},user,
    function (res) { //Todo: on success
      console.log(res);
      localStorageService.set('sid' , res.id);
      localStorageService.set('uid' , res.uid);
      localStorageService.set('path', res.path);
      localStorageService.set('ts'  , new Date().getTime().toString());
      $location.path('/search');
    },
    function (res) { //Todo: on error

    });
  };
}