function UserCtrl ($scope, localStorageService, $location, UserLogin) {
  "use strict";
  $scope.login = function (user ) {
    UserLogin.save({}, user,
      function (res) {
        localStorageService.set('sid' , res.id);
        localStorageService.set('uid' , res.uid);
        localStorageService.set('path', res.path);
        localStorageService.set('ts'  , new Date().getTime().toString());
        $location.path('/search');
      },
      function (res) {
      });
  };
}