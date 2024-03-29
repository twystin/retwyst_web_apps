angular.module('merchantApp').controller('DeliveryZoneController', ['$scope', '$modalInstance', 'delivery_zone', 'is_new', 'is_first', 'merchantRESTSvc', '$rootScope', 'SweetAlert', function($scope, $modalInstance, delivery_zone, is_new, is_first, merchantRESTSvc, $rootScope, SweetAlert) {
    merchantRESTSvc.getOutlets().then(function(res) {
        $scope.outlets = _.indexBy(res.data, '_id');
    }, function(err) {
        console.log(err);
        $scope.outlets = {};
    });
    $scope.checkModel = {};

    $scope.is_new = is_new;
    $scope.days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    $scope.delivery_zone = {
        delivery_timings: {
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
        order_accepts_till: {
            hr: '0',
            min: '0'
        }
    };

    $scope.delivery_zone = _.merge($scope.delivery_zone, delivery_zone);
    $scope.delivery_zone.order_accepts_till.time = new Date();
    $scope.delivery_zone.order_accepts_till.time.setMinutes($scope.delivery_zone.order_accepts_till.min);
    $scope.delivery_zone.order_accepts_till.time.setHours($scope.delivery_zone.order_accepts_till.hr);
    $scope.delivery_zone.order_accepts_till.time.setSeconds(0);
    $scope.delivery_zone.order_accepts_till.time.setMilliseconds(0);
    console.log('$scope.is_new', $scope.is_new);
    if (!$scope.is_new) {
        _.each($scope.delivery_zone.payment_options, function(mode) {
            console.log(mode);
            $scope.checkModel[mode] = true;
        });
    }

    $scope.$watchCollection('checkModel', function(obj) {
        if (!obj) {
            return;
        }
        var payment_options = _.compact(_.map(obj, function(val, key) {
            return val ? key : '';
        }));
        $scope.delivery_zone.payment_options = payment_options;
    });

    $scope.updatePackaging = function() {
        if (!$scope.delivery_zone.has_packaging_charge) {
            $scope.delivery_zone.packaging_charge = {};
        } else {
            $scope.delivery_zone.packaging_charge = {
                is_fixed: true
            }
        }
    };

    $scope.updateFixedCharge = function() {
        if ($scope.delivery_zone.packaging_charge.is_fixed) {
            $scope.delivery_zone.packaging_charge.charges = [];
        } else {
            $scope.delivery_zone.packaging_charge.charges = [{}];
        }
    };

    $scope.addPackagingSlab = function() {
        $scope.delivery_zone.packaging_charge.charges.push({});
    };

    $scope.removePackagingSlab = function(index) {
        $scope.delivery_zone.packaging_charge.charges.splice(index, 1);
    };

    $scope.getMaxRange = function() {
        return new Array(_.reduce($scope.delivery_zone.delivery_timings, function(obj1, obj2) {
            if (!_.has(obj1, 'timings')) {
                return obj1 >= obj2.timings.length ? obj1 : obj2.timings.length;
            } else {
                return obj1.timings.length > obj2.timings.length ? obj1.timings.length : obj2.timings.length;
            }
        }));
    };

    $scope.cloneTimings = function(obj) {
        if (obj._id) {
            $scope.delivery_zone.delivery_timings = _.indexBy(_.map(Object.keys($scope.outlets[obj._id].business_hours), function(day) {
                var timings = _.map($scope.outlets[obj._id].business_hours[day].timings, function(timing) {
                    delete timing._id;
                    var time = new Date();
                    time.setSeconds(0);
                    time.setMilliseconds(0);
                    timing.open.time = _.clone(time);
                    timing.open.time.setMinutes(timing.open.min);
                    timing.open.time.setHours(timing.open.hr);
                    timing.close.time = _.clone(time);
                    timing.close.time.setMinutes(timing.close.min);
                    timing.close.time.setHours(timing.close.hr);
                    return _.cloneDeep(timing);
                });

                return {
                    day: day,
                    timings: timings,
                    closed: $scope.outlets[obj._id].business_hours[day].closed
                };
            }), 'day');
            obj._id = '';
        }
    };

    $scope.addNewTiming = function(day, list) {
        list[day].timings.push({});
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

    $scope.updateTiming = function(day, list) {
        if (list[day].closed) {
            list[day].timings = [];
        } else {
            list[day].timings = [{}];
        }
    };

    $scope.initalizeTiming = function(day, index, list) {

        if (list[day].timings[index].open && list[day].timings[index].close) {
            return;
        }

        var openTime = new Date();
        if ($rootScope.isPaying) {
            openTime.setHours(9);
            openTime.setMinutes(0);
            openTime.setSeconds(0);
            openTime.setMilliseconds(0);
        } else {
            openTime.setHours(0);
            openTime.setMinutes(1);
            openTime.setSeconds(0);
            openTime.setMilliseconds(0);
        }

        var closeTime = new Date();
        if ($rootScope.isPaying) {
            closeTime.setHours(21);
            closeTime.setMinutes(0);
            closeTime.setSeconds(0);
            closeTime.setMilliseconds(0);
        } else {
            closeTime.setHours(0);
            closeTime.setMinutes(0);
            closeTime.setSeconds(0);
            closeTime.setMilliseconds(0);
        }

        if ($rootScope.isPaying) {
            list[day].timings[index] = {
                open: {
                    hr: 9,
                    min: 0,
                    time: openTime
                },
                close: {
                    hr: 21,
                    min: 0,
                    time: closeTime
                }
            };
        } else {
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

    $scope.cloneToAllDays = function(the_day, list) {
        _.each(list, function(schedule, day) {
            if (day !== the_day) {
                schedule.timings = _.cloneDeep(list[the_day].timings);
                schedule.closed = list[the_day].closed;
            }
        });
    };

    $scope.resolveDeliveryZone = function() {
        $scope.formFailure = false;
        if (!$scope.delivery_zone.zone_name) {
            $scope.formFailure = true;
            SweetAlert.swal("Validation error", "Zone name required", 'error');
        } else if (!$scope.delivery_zone.delivery_estimated_time) {
            $scope.formFailure = true;
            SweetAlert.swal('Validation error', 'Estimate delivery time required', 'error');
        } else if (!$scope.delivery_zone.min_amt_for_delivery && $scope.delivery_zone.min_amt_for_delivery !== 0) {
            $scope.formFailure = true;
            SweetAlert.swal('Validation error', 'Minimum delivery amount cannot be left blank', 'error');
        } else if (!$scope.delivery_zone.delivery_charge && $scope.delivery_zone.delivery_charge !== 0) {
            $scope.formFailure = true;
            SweetAlert.swal('Validation error', 'Delivery charge cannot be left blank', 'error');
        } else if (!$scope.delivery_zone.payment_options || !$scope.delivery_zone.payment_options.length) {
            $scope.formFailure = true;
            SweetAlert.swal('Validation error', 'Atleast one payment option must be selected', 'error');
        } else if ($scope.delivery_zone.has_packaging_charge) {
            if ($scope.delivery_zone.packaging_charge.is_fixed && !$scope.delivery_zone.packaging_charge.value) {
                $scope.formFailure = true;
                SweetAlert.swal('Validation error', 'Fixed charge amount required')
            } else if (!$scope.delivery_zone.packaging_charge.is_fixed && !$scope.delivery_zone.packaging_charge.charges.length) {
                SweetAlert.swal('Validation error', 'Atleast one slab reuqired for variable packaging charge', 'error');
            } else {
                var has_upper_packaging = false;
                async.each($scope.delivery_zone.packaging_charge.charges, function(charge, callback) {
                    if (!charge.start && charge.start !== 0) {
                        callback('Start amount required for all slabs');
                    } else if (!charge.value && charge.value !== 0) {
                        callback('Charge amount required for all slabs');
                    } else if (!charge.end) {
                        if (has_upper_packaging) {
                            callback('Exactly one slab should not have an upper bound');
                        } else {
                            has_upper_packaging = true;
                            callback();
                        }
                    } else {
                        async.each($scope.delivery_zone.packaging_charge.charges, function(charge2, callback) {
                            if (charge === charge2) {
                                callback();
                            } else if (((charge.start<= (charge2.end || 999999)) && ((charge2.end || 999999) <= (charge.end || 999999))) || ((charge.start <= charge2.start) && (charge2.start <= (charge.end || 999999))) || ((charge2.start <= (charge.end || 999999)) && ((charge.end || 999999) <= (charge2.end || 999999)))) {
                                callback('One or more slabs are colliding. Please recheck and fix to proceed');
                            } else {
                                callback();
                            }
                        }, function(err) {
                            callback(err);
                        });
                    }
                }, function(err) {
                    if (err) {
                        $scope.formFailure = true;
                        SweetAlert.swal('Validation error', err, 'error');
                    } else if (!$scope.delivery_zone.packaging_charge.is_fixed && !has_upper_packaging) {
                        $scope.formFailure = true;
                        SweetAlert.swal('Validation error', 'Exactly one slab should not have an upper bound', 'error');
                    } else if (is_first) {
                        var updated_params = _.cloneDeep(delivery_zone),
                            original_params = _.cloneDeep($scope.delivery_zone);
                        delete updated_params.coord;
                        delete original_params.coord;
                        delete updated_params.order_accepts_till.time;
                        delete original_params.order_accepts_till.time;
                        if (_.isEqual(updated_params, original_params)) {
                            $scope.formFailure = true;
                            SweetAlert.swal('Validation error', 'Please change atleast one parameter', 'error');
                        } else {
                            $modalInstance.close($scope.delivery_zone);
                        }
                    } else {
                        $modalInstance.close($scope.delivery_zone);
                    }
                });
            }
        } else if (is_first) {
            var updated_params = _.cloneDeep(delivery_zone),
                original_params = _.cloneDeep($scope.delivery_zone);
            delete updated_params.coord;
            delete original_params.coord;
            delete updated_params.order_accepts_till.time;
            delete original_params.order_accepts_till.time;
            if (_.isEqual(updated_params, original_params)) {
                $scope.formFailure = true;
                SweetAlert.swal('Validation error', 'Please change atleast one parameter', 'error');
            } else {
                $modalInstance.close($scope.delivery_zone);
            }
        } else {
            $modalInstance.close($scope.delivery_zone);
        }
    };

    $scope.discardDeliveryZone = function() {
        $modalInstance.dismiss('Cancel');
    };
}]);
