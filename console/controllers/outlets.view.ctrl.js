angular.module('consoleApp').controller('OutletViewController', ['$scope', 'consoleRESTSvc', '$stateParams', '$modal',
    function($scope, consoleRESTSvc, $stateParams, $modal) {

        $scope.days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        $scope.map = {
            center: {
                latitude: 28.805422897457665,
                longitude: 77.16647699812655
            },
            zoom: 14
        };

        $scope.marker = {
            id: 0,
            coords: {
                latitude: 28.6078341976,
                longitude: 77.2465642784
            }
        };

        consoleRESTSvc.getOutlets().then(function(res) {
            console.log(res);
            angular.forEach(res.data, function(outlet) {
                if (outlet._id === $stateParams.outlet_id) {
                    $scope.outlet = angular.copy(outlet);
                    $scope.outlet.attributes.cost_for_two.min = $scope.outlet.attributes.cost_for_two.min.toString();
                    $scope.outlet.attributes.cost_for_two.max = $scope.outlet.attributes.cost_for_two.max.toString();
                    $scope.map.center = {
                        latitude: $scope.outlet.contact.location.coords.latitude,
                        longitude: $scope.outlet.contact.location.coords.longitude
                    };
                    $scope.marker.coords = {
                        latitude: $scope.outlet.contact.location.coords.latitude,
                        longitude: $scope.outlet.contact.location.coords.longitude
                    };
                    angular.forEach($scope.outlet.business_hours, function(schedule) {
                        angular.forEach(schedule.timings, function(timing) {
                            var _time = new Date();
                            _time.setHours(timing.open.hr);
                            _time.setMinutes(timing.open.min);
                            _time.setSeconds(0);
                            _time.setMilliseconds(0);
                            timing.open.time = _.clone(_time);
                            _time.setHours(timing.close.hr);
                            _time.setMinutes(timing.close.min);
                            timing.close.time = _.clone(_time);
                        });
                    });
                }
            });
        }, function(err) {
            console.log(err);
        });

        $scope.updateCashbackAndCommission = function() {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/outlet.cashback_commission.tmpl.html',
                size: 'md',
                controller: 'CashbackCommissionController',
                resolve: {
                    outlet: function() {
                        return $scope.outlet;
                    }
                }
            });

            modalInstance.result.then(function(outlet) {
                $scope.outlet = outlet;
            });
        };
    }
])
