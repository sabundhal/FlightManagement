// public/js/app.js
angular.module('MyApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'rzModule'])
    .directive('dobasync', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.dobasync = function (modelValue, viewValue) {
                    var birthDate = new Date();

                    birthDate.setFullYear(viewValue.substring(0, viewValue.indexOf("-")));
                    birthDate.setMonth(viewValue.substring(viewValue.indexOf("-") + 1, viewValue.lastIndexOf("-")) - 1);
                    birthDate.setDate(viewValue.substring(viewValue.lastIndexOf("-") + 1, viewValue.length));

                    var currentDate = new Date();

                    if (birthDate >= currentDate) {

                        return false;
                    }
                    return true;
                };
            }
        };
    })
    .filter('priceFilter', function () {

        return function (input, slider) {

            var output = [];
            var min = slider.min;
            var max = slider.max;
            angular.forEach(input, function (flight) {
                var price = parseInt(flight.Price);
                if (price >= min && price <= max)
                    output.push(flight);
            });
            return output;
        }

    })
    .filter('durationFilter', function () {

        return function (input, duration) {
            if (duration == null || JSON.parse(duration).title=="All")
                return input;
            var duration = JSON.parse(duration);
            var min = parseInt(duration.min) * 60;
            var max = parseInt(duration.max) * 60;
            var output = [];

            angular.forEach(input, function (flight) {
                var durationMins = flight.durationMins;
                if (durationMins >= min && durationMins < max)
                    output.push(flight);
            });
            return output;
        }

    })
    .filter('airlineFilter', function () {

        return function (input, airline) {
            if (airline == null || airline=="All")
                return input;
            var output = [];
            angular.forEach(input, function (flight) {
                if (airline == flight.Airline)
                    output.push(flight);
            });
            return output;
        }

    })
    .filter('departureFilter', function () {

        return function (input, departure) {
            if (departure == null)
                return input;

            var output = [];

            var departure = JSON.parse(departure);
            if (departure.min == null)
                return input;

            var timeUnit = departure.min.substring(departure.min.length - 2, departure.min.length);
            var minTime = departure.min.substring(0, departure.min.indexOf(":"));
            var maxTime = departure.max.substring(0, departure.max.indexOf(":"));
            angular.forEach(input, function (flight) {
                var departureUnit = flight.Departure.substring(flight.Departure.length - 2, flight.Departure.length);
                var departureTime = flight.Departure.substring(0, flight.Departure.indexOf(":"));

                if (departureUnit == timeUnit) {
                    var time = parseInt(departureTime);
                    minTime = parseInt(minTime);
                    maxTime = parseInt(maxTime);
                    if (minTime == "12") {
                        if (time == "12" || time == "1" || time == "2")
                            output.push(flight);
                    } else if (time >= minTime && time <= maxTime) {
                        output.push(flight);
                    }

                }
            });
            return output;
        }

    })
    .filter('arrivalFilter', function () {

        return function (input, arrival) {
            if (arrival == null)
                return input;

            var output = [];
            var arrival = JSON.parse(arrival);
            if (arrival.min == null)
                return input;
            var timeUnit = arrival.min.substring(arrival.min.length - 2, arrival.min.length);
            var minTime = arrival.min.substring(0, arrival.min.indexOf(":"));
            var maxTime = arrival.max.substring(0, arrival.max.indexOf(":"));
            angular.forEach(input, function (flight) {
                var arrivalUnit = flight.Arrival.substring(flight.Arrival.length - 2, flight.Arrival.length);
                var arrivalTime = flight.Arrival.substring(0, flight.Arrival.indexOf(":"));

                if (arrivalUnit == timeUnit) {
                    var time = parseInt(arrivalTime);
                    minTime = parseInt(minTime);
                    maxTime = parseInt(maxTime);
                    if (minTime == "12") {
                        if (time == "12" || time == "1" || time == "2")
                            output.push(flight);
                    } else if (time >= minTime && time <= maxTime) {
                        output.push(flight);
                    }

                }
            });
            return output;
        }

    })
    .filter('searchFilter', function () {
        return function (input, option) {
            if (option == null || option.trim() == "") {
                return input
            }
            else {
                var array = [];
                option = option.trim();
                option = option.toLowerCase();
                for (var i = 0; i < input.length; i++) {
                    if (input[i].firstName.toLowerCase().indexOf(option) != -1)
                        array.push(input[i]);
                }
                return array;
            }

        }
    });
