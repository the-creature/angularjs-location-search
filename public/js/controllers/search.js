/*
*search controller for app.
*/
function SearchCtrl($scope, $document, searchServ) {
    "use strict";
    //define a google map with necessary options
    $scope.map = {
        center: $scope.ll,
        zoom: 10,
        draggable: true,
        control: {},
        markers: [],
        events: {
            click: function($markerModel, searchServ) {
                searchServ.selectedModelId = $markerModel.id;
                //clear the previous marked icon
                $scope.map.markers.forEach(function(marker) {
                    marker.icon = '';
                });
                //set the current clicked marker with icon.
                $markerModel.icon = 'img/blue_marker.png';
                //invoke the apply() method to get effect immediately.
                $scope.$apply();
                //broadcast 'activeListItem' event.
                $scope.$broadcast('activeListItem');
                $scope.map.control.refresh();
            },
            //A bug in anguler-google-maps requires this in order for events to work
            tilesloaded: function(map) {
                $scope.$apply(function() {
                    $scope.mapInstance = map;
                });
            }
        }
    };

    //watch 'activeListItem' event.
    $scope.$on('activeListItem', function() {
        //loop the searched item
        searchServ.places.forEach(function(place, index) {

            place.active = ''; //Deactivate any that are currently on
            $scope.$apply();
            //active the item by clicking the marker on the map.
            if (place.id === searchServ.selectedModelId) {
                //set the bg-primary class to active item.
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

    $scope.places = searchServ.places; //List of results to be displayed on page render
    $scope.map.markers = searchServ.markers; //Map Markers with corresponding id's

    $scope.currentPage = searchServ.currentPage;
    $scope.displayMessage = searchServ.displayMessage;

    $scope.$on('refreshMap', function() {
        $scope.map.control.refresh(searchServ.ll);
    });

    //high light the marker on google map.
    $scope.highLightMarker = function(id) {
        //high light the place item.
        searchServ.places.forEach(function(place) {
            place.active = '';
            if (place.id === id) {
                place.active = 'bg-primary';
            }
        });
        //high light the marker on the google map.
        $scope.map.markers.forEach(function(marker) {
            marker.icon = '';
            if (marker.id === id) {
                marker.icon = 'img/blue_marker.png';
            }
        });

        $scope.map.control.refresh();
    };
    //pagination 
    $scope.pageChange = function() {
        searchServ.places = [];
        searchServ.markers = [];
        searchServ.loadNextPage($scope.currentPage);
    };
}