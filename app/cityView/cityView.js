'use strict';

angular.module('myApp.cityView', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/cityView', {
            templateUrl: 'cityView/cityView.html',
            controller: 'CityViewCtrl'
        });
    }])

    .controller('CityViewCtrl', ['$scope', '$http', '$cookieStore', function($scope, $http, $cookieStore) {

        var saveToFavorites = function(zip) {
            var zips = $cookieStore.get('favoriteZips');
            if (!zips) {
                $cookieStore.put('favoriteZips', [zip]);
            } else {
                zips.push(zip);
                $cookieStore.put('favoriteZips', zips);
            }
        };

        $scope.submit = function() {
            saveToFavorites(this.searchProp);

            $http.get('http://api.wunderground.com/api/2d303951cc5cce45/conditions/q/' + this.searchProp + '.json').success(function(data) {
                $scope.results = true;
                $scope.currentConditions = data.current_observation;
            });
        };
    }]);
