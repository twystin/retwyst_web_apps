angular.module('consoleApp').controller('CashbackOfferTemplateController', ['$scope', '$modalInstance', 'is_new', 'cashback_offer', 'SweetAlert', '$q',
    function($scope, $modalInstance, is_new, cashback_offer, SweetAlert, $q) {
        $scope.is_new = is_new;
        $scope.cashback_offer = {};
        $scope.cashback_offer = _.merge($scope.cashback_offer, cashback_offer);
        console.log('cashback_offer', cashback_offer);
        $scope.days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        $scope.resolveOffer = function() {
            $scope.validateOffer().then(function(res) {
                $scope.cashback_offer._id = _id;
                _id = undefined;
                $modalInstance.close($scope.cashback_offer);
            }, function(err) {
                SweetAlert.swal('Validation error', err, 'error');
            });
        };

        $scope.discardOffer = function() {
            $modalInstance.dismiss('Cancel');
        };

        $scope.getMaxRange = function() {
            return new Array(_.reduce($scope.cashback_offer.offer_applicability, function(obj1, obj2) {
                if (!_.has(obj1, 'timings')) {
                    return obj1 >= obj2.timings.length ? obj1 : obj2.timings.length;
                } else {
                    return obj1.timings.length > obj2.timings.length ? obj1.timings.length : obj2.timings.length;
                }
            }));
        };

        $scope.initalizeTiming = function(day, index, list) {

            if (list[day].timings[index].open && list[day].timings[index].close) {
                return;
            }

            var openTime = new Date();
            openTime.setHours(9);
            openTime.setMinutes(0);
            openTime.setSeconds(0);
            openTime.setMilliseconds(0);

            var closeTime = new Date();
            closeTime.setHours(21);
            closeTime.setMinutes(0);
            closeTime.setSeconds(0);
            closeTime.setMilliseconds(0);

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
        };

        $scope.addNewTiming = function(day, list) {
            list[day].timings.push({});
        };

        $scope.removeTiming = function(day, index, list) {
            list[day].timings.splice(index, 1);
        };

        $scope.updateTiming = function(day, list) {
            if (list[day].closed) {
                list[day].timings = [];
            } else {
                list[day].timings = [{}];
            }
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

        $scope.cloneToAllDays = function(the_day, list) {
            _.each(list, function(schedule, day) {
                if (day !== the_day) {
                    schedule.timings = _.cloneDeep(list[the_day].timings);
                    schedule.closed = list[the_day].closed;
                }
            });
        };

        $scope.scrollToTop = function() {
            $('document').ready(function() {
                $(window).scrollTop(0);
            });
        };

        $scope.validateOffer = function() {
            var deferred = $q.defer();
            if (!$scope.cashback_offer) {
                deferred.reject('Form not filled in yet');
            } else if (!_.get($scope.cashback_offer, 'offer_value')) {
                deferred.reject('Offer value cannot be left blank.');
            } else if (!_.get($scope.cashback_offer, 'offer_type')) {
                deferred.reject('Please choose the offer type');
            } else if (!_.get($scope.cashback_offer, 'offer_voucher_count')) {
                deferred.reject('Total voucher count required');
            } else if (!_.get($scope.cashback_offer, 'offer_text')) {
                deferred.reject('Offer text required');
            } else if (!_.get($scope.cashback_offer, 'offer_cost')) {
                deferred.reject('Offer cost (in Twyst Bucks) required');
            } else if (!_.get($scope.cashback_offer, 'offer_processing_fee')) {
                deferred.reject('Offer processing fee (in Twyst Bucks) required');
            } else if (!_.get($scope.cashback_offer, 'offer_status')) {
                deferred.reject('Please choose a valid offer status');
            } else if (!_.get($scope.cashback_offer, 'offer_start_date')) {
                deferred.reject('Valid offer start date required');
            } else if (!_.get($scope.cashback_offer, 'offer_end_date')) {
                deferred.reject('Valid offer end date required');
            } else {
                async.each($scope.days, function(day, callback) {
                    var schedule = $scope.cashback_offer.offer_applicability[day];
                    if (schedule.closed) {
                        callback();
                    } else {
                        async.each(schedule.timings, function(timing1, callback) {
                            if ((!timing1.open.hr && timing1.open.hr !== 0) || (!timing1.open.min && timing1.open.min !== 0) || (!timing1.close.hr && timing1.close.hr !== 0) || (!timing1.close.min && timing1.close.min !== 0)) {
                                callback("One or more timings invalid for " + day.toUpperCase());
                            } else {
                                async.each(schedule.timings, function(timing2, callback) {
                                    if ((!timing2.open.hr && timing2.open.hr !== 0) || (!timing2.open.min && timing2.open.min !== 0) || (!timing2.close.hr && timing2.close.hr !== 0) || (!timing2.close.min && timing2.close.min !== 0)) {
                                        callback("One or more timings invalid for " + day.toUpperCase());
                                    } else {
                                        var startMin1 = (timing1.open.hr * 60) + timing1.open.min,
                                            closeMin1 = (timing1.close.hr * 60) + timing1.close.min,
                                            startMin2 = (timing2.open.hr * 60) + timing2.open.min,
                                            closeMin2 = (timing2.close.hr * 60) + timing2.close.min;

                                        if (timing1 === timing2) {
                                            callback();
                                        } else if (((startMin1 <= closeMin2) && (closeMin2 <= closeMin1)) || ((startMin1 <= startMin2) && (startMin2 <= closeMin1)) || ((startMin2 <= closeMin1) && (closeMin1 <= closeMin2))) {
                                            callback("One or more timings invalid for " + day.toUpperCase());
                                        } else {
                                            callback();
                                        }
                                    }
                                }, function(err) {
                                    callback(err);
                                });
                            }
                        }, function(err) {
                            callback(err);
                        });
                    }
                }, function(err) {
                    if (err) {
                        $scope.showErrorMessage(err);
                        deferred.reject();
                    } else {
                        $scope.scrollToTop();
                        $scope.formFailure = false;
                        deferred.resolve(true);
                    }
                });
            }
            return deferred.promise;
        };

    }
]);
