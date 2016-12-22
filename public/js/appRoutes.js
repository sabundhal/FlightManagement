angular.module('appRoutes', ['ui.router']).config(['$stateProvider', '$routeProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $routeProvider, $locationProvider, $httpProvider) {

    $stateProvider
        .state('patientInfo', {
            url: '/',
            controller: 'PatientController as vm',
            templateUrl: 'views/patientInfo.html'
        })
        .state('allFlights', {
            url: '/allFlights',
            controller: "AllFlights as vm",
            templateUrl: 'views/allFlights.html',
            resolve: {
                allFlights: function ($http) {
                    return $http.get('/allFlights');
                }
            }
        });
    $locationProvider.html5Mode(true);

}]);


