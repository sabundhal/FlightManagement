// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', [])

    .controller('SearchFlightController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
        var vm = this;
        vm.sources = ['Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
        vm.destinations = ['Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
        vm.seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        vm.seat = '2';
        vm.source = 'Bangalore';
        vm.destination = 'Kolkata';

        vm.submitForm = function () {
            var data = {
                source: vm.source,
                destination: vm.destination,
                seat: vm.seat
            };
            console.log("Data:");
            console.log(data);
            $state.go('allFlights', {data: data});
        };
    }])
    .controller('AllFlights', ['$scope', 'allFlights', '$filter', function ($scope, allFlights, $filter) {
        var vm = this;
        vm.allFlights = [];
        vm.sortType = "Price";
        vm.sortReverse = false;
        vm.slider = null;
        var minPrice = 0, maxPrice = 0;
        vm.durations = [
            {title: "All",min:null,max:null},
            {title: "< 2hrs", min: "0", max: "2"},
            {title: " 2hrs to <3 Hours", min: "2", max: "3"},
            {title: ">= 3 hrs", min: "3", max: "6"}
        ];
        vm.duration = vm.durations[0];
        vm.airlines = [];
        vm.airlines.push("All");
        vm.airline = vm.airlines[0];


        vm.timings = [
            {title: "All", min: null, max: null},
            {title: "12:00 AM to 2:59 AM", min: "12:00 AM", max: "2:59 AM"},
            {title: "3:00 AM to 5:59 AM", min: "3:00 AM", max: "5:59 AM"},
            {title: "6:00 AM to 8:59 AM", min: "6:00 AM", max: "8:59 AM"},
            {title: "9:00 AM to 11:59 AM", min: "9:00 AM", max: "11:59 AM"},
            {title: "12:00 PM to 2:59 PM", min: "12:00 PM", max: "2:59 PM"},
            {title: "3:00 PM to 5:59 PM", min: "3:00 PM", max: "5:59 PM"},
            {title: "6:00 PM to 8:59 PM", min: "6:00 PM", max: "8:59 PM"},
            {title: "9:00 PM to 11:59 PM", min: "9:00 PM", max: "11:59 PM"},

        ];
        vm.departure = vm.timings[0];
        vm.arrival = vm.timings[0];

        if (allFlights.data.length != 0) {
            console.log(allFlights);
            vm.allFlights = allFlights.data;
            vm.filterFlights = vm.allFlights;
            minPrice = parseInt(vm.allFlights[0].Price);
        }

        if (vm.allFlights.length != 0) {
            angular.forEach(vm.allFlights, function (flight) {
                var price = parseInt(flight.Price);

                var durationAray = flight.Duration.split(" ");

                if (durationAray.length == 2)
                    var durationMins = parseInt(durationAray[0]) * 60;
                else
                    var durationMins = parseInt(durationAray[0]) * 60 + parseInt(durationAray[2]);

                flight.durationMins = durationMins;
                if (price > maxPrice)
                    maxPrice = price;
                if (price < minPrice)
                    minPrice = price;

                if (vm.airlines.indexOf(flight.Airline) == -1)
                    vm.airlines.push(flight.Airline);

                //departure
                var departure = flight.Departure;
                var timeUnit = departure.substr(departure.length - 2);
                var minsArray = departure.substring(0, departure.indexOf(" ")).split(":");
                if (parseInt(minsArray[0]) == 12)
                    var mins = parseInt(minsArray[1]);
                else
                    var mins = parseInt(minsArray[0]) * 60 + parseInt(minsArray[1]);

                flight.DepartureSort = mins;
                if (timeUnit == "PM")
                    flight.DepartureSort += 12 * 60;

                //arrival
                var arrival = flight.Arrival;
                var timeUnit = arrival.substr(arrival.length - 2);
                var minsArray = arrival.substring(0, arrival.indexOf(" ")).split(":");
                if (parseInt(minsArray[0]) == 12)
                    var mins = parseInt(minsArray[1]);
                else
                    var mins = parseInt(minsArray[0]) * 60 + parseInt(minsArray[1]);
                flight.ArrivalSort = mins;
                if (timeUnit == "PM")
                    flight.ArrivalSort += 12 * 60;

                flight.seats = parseInt(flight["Seats Available"]);
                flight.imgUrl = "images/" + flight.Airline + ".png";

            });
            console.log("All flights");
            console.log(vm.allFlights);

            vm.slider = {
                min: minPrice,
                max: maxPrice,
                options: {
                    floor: minPrice,
                    ceil: maxPrice
                }
            };
        }


        // $scope.$on("slideEnded", function () {
        //     vm.filterFlights = $filter('priceFilter')(vm.allFlights, vm.slider.min, vm.slider.max);
        // });
    }]);
