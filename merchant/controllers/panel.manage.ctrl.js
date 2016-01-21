angular.module('merchantApp')
    .controller('PanelController', ['$scope', 'merchantRESTSvc', '$stateParams',
        function($scope, merchantRESTSvc, $stateParams) {


            merchantRESTSvc.getOutlets().then(function(res) {
                angular.forEach(res.data.outlets, function(outlet) {
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
                $log.log('err', err);
            });

            var client = new Faye.Client('/faye',{
                timeout: 100
            });
            console.log('mememem')
            console.log($stateParams.outlet_id)
            client.subscribe('/'+$stateParams.outlet_id, function(message) {
                console.log(message);
            });
        }
    ]);