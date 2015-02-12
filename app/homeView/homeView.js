'use strict';

angular.module('myApp.homeView', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homeView', {
    templateUrl: 'homeView/homeView.html',
    controller: 'HomeViewCtrl'
  });
}])

.controller('HomeViewCtrl', ['$scope', '$cookieStore', '$http', function($scope, $cookieStore, $http) {
        var favoriteZipCodes = $cookieStore.get('favoriteZips');
        $scope.favoriteCities = [];

        _.each(favoriteZipCodes, function(zipCode) {

            $http.get('http://api.wunderground.com/api/2d303951cc5cce45/conditions/q/' + zipCode + '.json').success(function(data) {
                $scope.favoriteCities.push({currentConditions : data.current_observation});
            });
        });

}]);

