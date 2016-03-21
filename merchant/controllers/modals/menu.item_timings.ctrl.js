angular.module('merchantApp').controller('MenuItemTimingsController', ['$scope', '$modalInstance', 'item', 'SweetAlert', '$q', function($scope, $modalInstance, item, SweetAlert, $q) {
    $scope.item = {
        item_availability: {
            available_hours: {
                monday: {
                    closed: false,
                    timings: [{}]
                },
                tuesday: {
                    closed: false,
                    timings: [{}]
                },
                wednesday: {
                    closed: false,
                    timings: [{}]
                },
                thursday: {
                    closed: false,
                    timings: [{}]
                },
                friday: {
                    closed: false,
                    timings: [{}]
                },
                saturday: {
                    closed: false,
                    timings: [{}]
                },
                sunday: {
                    closed: false,
                    timings: [{}]
                }
            },
            days_of_the_week: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }
    };

    $scope.check_days = {
        'monday': true,
        'tuesday': true,
        'wednesday': true,
        'thursday': true,
        'friday': true,
        'saturday': true,
        'sunday': true
    };

    $scope.$watchCollection('check_days', function(newVal) {
        if (!newVal) {
            return;
        }

        $scope.item.item_availability.days_of_the_week = _.compact(_.map(newVal,
            function(val, key) {
                return val ? key : undefined;
            }
        ));

    });


    $scope.days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    $scope.item = _.merge($scope.item, item);
    console.log($scope.item);
    _.each($scope.days, function(day) {
        if ($scope.item.item_availability.days_of_the_week.indexOf(day) === -1) {
            $scope.check_days[day] = false;
        }
    });
    
    if ($scope.item.item_availability.start_date) {
    	$scope.item.item_availability.start_date = new Date($scope.item.item_availability.start_date);
    }

    if ($scope.item.item_availability.end_date) {
    	$scope.item.item_availability.end_date = new Date($scope.item.item_availability.end_date);
    }

    $scope.getMaxRange = function() {
        return new Array(_.reduce($scope.item.item_availability.available_hours, function(obj1, obj2) {
            if (!_.has(obj1, 'timings')) {
                return obj1 >= obj2.timings.length ? obj1 : obj2.timings.length;
            } else {
                return obj1.timings.length > obj2.timings.length ? obj1.timings.length : obj2.timings.length;
            }
        }));
    };

    $scope.initializeTiming = function(day, index, list) {

        if (list[day].timings[index].open && list[day].timings[index].close) {
            
            var openTime = new Date();
            openTime.setHours(list[day].timings[index].open.hr);
            openTime.setMinutes(list[day].timings[index].open.min);
            openTime.setSeconds(0);
            openTime.setMilliseconds(0);

            var closeTime = new Date();
            closeTime.setHours(list[day].timings[index].close.hr);
            closeTime.setMinutes(list[day].timings[index].close.min);
            closeTime.setSeconds(0);
            closeTime.setMilliseconds(0);

            list[day].timings[index].open.time = openTime;
            list[day].timings[index].close.time = closeTime;

        } else {

            var openTime = new Date();
            openTime.setHours(0);
            openTime.setMinutes(1);
            openTime.setSeconds(0);
            openTime.setMilliseconds(0);

            var closeTime = new Date();
            closeTime.setHours(0);
            closeTime.setMinutes(0);
            closeTime.setSeconds(0);
            closeTime.setMilliseconds(0);

            list[day].timings[index] = {
                open: {
                    hr: 0,
                    min: 1,
                    time: openTime
                },
                close: {
                    hr: 0,
                    min: 0,
                    time: closeTime
                }
            };
        }
    };

    $scope.updateTiming = function(day, list) {
        if (list[day].closed) {
            list[day].timings = [];
        } else {
            list[day].timings = [{}];
        }
    };

    $scope.removeTiming = function(day, index, list) {
        list[day].timings.splice(index, 1);
    };

    $scope.updateTime = function(day, index, list) {
        var _timing = list[day].timings[index];

        if (_timing.open.time) {
            _timing.open.hr = _timing.open.time.getHours();
            _timing.open.min = _timing.open.time.getMinutes();
        }

        if (_timing.close.time) {
            _timing.close.hr = _timing.close.time.getHours();
            _timing.close.min = _timing.close.time.getMinutes();
        }
    };

    $scope.addNewTiming = function(day, list) {
        list[day].timings.push({});
    };

    $scope.cloneToAllDays = function(the_day, list) {
        _.each(list, function(schedule, day) {
            if (day !== the_day) {
                schedule.timings = _.cloneDeep(list[the_day].timings);
                schedule.closed = list[the_day].closed;
            }
        });
    };

    $scope.validate_timings = function() {
        var deferred = $q.defer();
        if ((_.get($scope.item, 'item_availability.start_date') && !_.get($scope.item, 'item_availability.end_date')) || (!_.get($scope.item, 'item_availability.start_date') && _.get($scope.item, 'item_availability.end_date'))) {
            deferred.reject('Either specify "both" or "neither" start date and end date.');
        } else if ($scope.item.item_availability.start_date && $scope.item.item_availability.end_date && ($scope.item.item_availability.start_date >= $scope.item.item_availability.end_date)) {
            deferred.reject('Start date must be before end date');
        } else if (!_.get($scope.item, 'item_availability.days_of_the_week') || !$scope.item.item_availability.days_of_the_week.length) {
            deferred.reject('Item must be available on atleast one day');
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    };

    $scope.resolveChanges = function() {
        $scope.validate_timings().then(function() {
            $modalInstance.close($scope.item);
        }, function(err) {
            SweetAlert.swal('Validtion error', err, 'error');
        });
    };

    $scope.discardChanges = function() {
        $modalInstance.dismiss('Cancel');
    };
}]);
