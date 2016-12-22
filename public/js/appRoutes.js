angular.module('appRoutes', ['ui.router']).config(['$stateProvider', '$routeProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $routeProvider, $locationProvider, $httpProvider) {

    $stateProvider
        .state('searchFlight', {
            url: '/',
            controller: 'SearchFlightController as vm',
            templateUrl: 'views/searchFlight.html'
        })
        .state('allFlights', {
            url: '/allFlights',
            controller: "AllFlights as vm",
            templateUrl: 'views/allFlights.html',
            params: {'data': null},
            resolve: {
                allFlights: function ($http, $stateParams) {
                    var data = JSON.stringify($stateParams.data);
                    // return $http.get('/allFlights/'+data);
                    return $http({
                        method: 'POST',
                        url: '/allFlights',
                        data: $stateParams.data,
                    });
                }
                //
                //
                // return $http.get('/allFlights');
            }

        });
    $locationProvider.html5Mode(true);

}]);


