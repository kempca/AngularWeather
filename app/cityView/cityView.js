'use strict';

angular.module('myApp.cityView', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/cityView/:zip', {
            templateUrl: 'cityView/cityView.html',
            controller: 'CityViewCtrl'
        });
    }])

    .controller('CityViewCtrl', ['$scope', '$http', '$routeParams', '$cookieStore', function($scope, $http, $routeParams, $cookieStore) {
        var saveToFavorites = function(zip) {
            var zips = $cookieStore.get('favoriteZips');
            if (!zips) {
                $cookieStore.put('favoriteZips', [zip]);
            } else {
                if (!_.contains(zips, zip) && zips.length < 4) {
                    zips.push(zip);
                    $cookieStore.put('favoriteZips', zips);
                }
            }
        };

        $http.get('http://api.wunderground.com/api/2d303951cc5cce45/conditions/q/' + $routeParams.zip + '.json').success(function(data) {
            $scope.currentConditions =  data.current_observation;
            saveToFavorites($routeParams.zip);
        });

    }]);
