function SearchCtrl ($scope, $document, searchServ) {
  "use strict";

  $scope.map = {
    center: $scope.ll,
    zoom: 10,
    draggable: true,
    control: {},
    markers: [],
    events: {
      click: function ($markerModel, searchServ) {
        searchServ.selectedModelId = $markerModel.id;

        $scope.map.markers.forEach(function (marker) {
          marker.icon = '';
        });
        $markerModel.icon = 'img/blue_marker.png';

        $scope.$apply();
        $scope.$broadcast('activeListItem');
        $scope.map.control.refresh();
      },
      //A bug in anguler-google-maps requires this in order for events to work
      tilesloaded: function (map) {
        $scope.$apply(function () {
          $scope.mapInstance = map;
        });
      }
    }
  };


  $scope.$on('activeListItem', function () {
    searchServ.places.forEach(function (place, index) {

      place.active = ''; //Deactivate any that are currently on
      $scope.$apply();

      if (place.id === searchServ.selectedModelId) {
        place.active = 'bg-primary';
        $scope.$apply();

        /**
         * The following provides scroll animation
         * The last two numbers represent offset from the top and
         * speed of transition
         */
        var element = angular.element(document.getElementById(searchServ.selectedModelId));
        $document.scrollToElement(element, 100, 100);
      }
    });
  });

  $scope.places = searchServ.places;//List of results to be displayed on page render
  $scope.map.markers= searchServ.markers; //Map Markers with corresponding id's

  $scope.currentPage = searchServ.currentPage;
  $scope.displayMessage = searchServ.displayMessage;

  $scope.$on('refreshMap', function () {
    $scope.map.control.refresh(searchServ.ll);
  });


  $scope.highLightMarker = function (id) {
    searchServ.places.forEach(function (place) {
      place.active = '';
      if (place.id === id) {
        place.active = 'bg-primary';
      }
    });

    $scope.map.markers.forEach(function(marker) {
      marker.icon = '';
      if (marker.id === id) {
        marker.icon = 'img/blue_marker.png';
      }
    });

    $scope.map.control.refresh();
  };

  $scope.pageChange = function () {
    searchServ.places = [];
    searchServ.markers = [];
    searchServ.loadNextPage($scope.currentPage);
  };
}
