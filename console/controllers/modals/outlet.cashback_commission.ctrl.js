angular.module('consoleApp').controller('CashbackCommissionController', function($scope, $modalInstance, outlet, SweetAlert, consoleRESTSvc, $q) {

    $scope.outlet = outlet;

    $scope.updateCommission = function() {
        if ($scope.outlet.twyst_meta.twyst_commission.is_fixed) {
            $scope.outlet.twyst_meta.twyst_commission.commission_slab = [];
        } else {
            delete $scope.outlet.twyst_meta.twyst_commission.value;
            $scope.addCommissionSlab();
        }
    };

    $scope.addCommissionSlab = function() {
        $scope.outlet.twyst_meta.twyst_commission.commission_slab.push({});
    };

    $scope.addCashbackSlab = function() {
        $scope.outlet.twyst_meta.cashback_info.order_amount_slab.push({});
    };

    $scope.removeSlab = function(list, index) {
        list.splice(index, 1);
    };

    $scope.validateCommission = function() {
        var deferred = $q.defer();
        var has_upper_bound = false;

        if (_.get($scope.outlet, 'twyst_meta.twyst_commission.is_fixed') && !_.get($scope.outlet, 'twyst_meta.twyst_commission.value')) {
            deferred.reject('Fixed commission requires commisssion percentage');
        } else {
            async.each($scope.outlet.twyst_meta.twyst_commission.commission_slab, function(slab, callback) {
                if (!slab.start && slab.start !== 0) {
                    callback('All commission slabs must have valid start amount');
                } else if (!slab.value) {
                    callback('All commission slabs must have valid commission percentage');
                } else if (!slab.end) {
                    if (has_upper_bound) {
                        callback('Exactly one commission should not have an upper bound.');
                    } else {
                        has_upper_bound = true;
                        callback();
                    }
                } else if (slab.end <= slab.start) {
                    callback('Slab start must be lesser than slab end');
                } else {
                    async.each($scope.outlet.twyst_meta.twyst_commission.commission_slab, function(slab2, callback) {
                        if (slab === slab2) {
                            callback();
                        } else if (((slab.start <= (slab2.end || 99999999)) && ((slab2.end || 99999999) <= (slab.end || 99999999))) || ((slab.start <= slab2.start) && (slab2.start <= (slab.end || 99999999))) || ((slab2.start <= (slab.end || 99999999)) && ((slab.end || 99999999) <= (slab2.end || 99999999)))) {
                            callback('One or more commission slabs are conflicting');
                        } else {
                            callback();
                        }
                    }, function(err) {
                        console.log('err', err);
                        callback(err);
                    })
                }
            }, function(err) {
                if (err) {
                    deferred.reject(err);
                } else if (!_.get($scope.outlet, 'twyst_meta.twyst_commission.is_fixed') && !has_upper_bound) {
                    deferred.reject('A commission slab with no upper bound required');
                } else {
                    deferred.resolve();
                }
            });
        }

        return deferred.promise;
    };

    $scope.validateCashback = function() {
        var deferred = $q.defer();
        var check_upper_cashback = false;

        if (!_.get($scope.outlet, 'twyst_meta.cashback_info.base_cashback') && _.get($scope.outlet, 'twyst_meta.cashback_info.base_cashback') !== 0) {
            deferred.reject('Base cashback percent required');
        } else if (!_.get($scope.outlet, 'twyst_meta.cashback_info.in_app_ratio')) {
            deferred.reject('Commission ratio required for In-App payment');
        } else if (!_.get($scope.outlet, 'twyst_meta.cashback_info.cod_ratio')) {
            deferred.reject('Commission ratio required for C.O.D. payment');
        } else {
            async.each($scope.outlet.twyst_meta.cashback_info.order_amount_slab, function(slab, callback) {
                if (!slab.start && slab.start !== 0) {
                    callback('All cashback slabs must have valid starting amount');
                } else if (!slab.ratio) {
                    callback('Cashback ratio required for all slabs.');
                } else if (!slab.end) {
                    if (check_upper_cashback) {
                        callback('Exactly one commission should not have an upper bound.');
                    } else {
                        check_upper_cashback = true;
                        callback();
                    }
                } else if (slab.end <= slab.start) {
                    callback('Slab start must be lesser than slab end');
                } else {
                    async.each($scope.outlet.twyst_meta.cashback_info.order_amount_slab, function(slab2, callback) {
                        if (slab === slab2) {
                            callback();
                        } else if (((slab.start <= (slab2.end || 99999999)) && ((slab2.end || 99999999) <= (slab.end || 99999999))) || ((slab.start <= slab2.start) && (slab2.start <= (slab.end || 99999999))) || ((slab2.start <= (slab.end || 99999999)) && ((slab.end || 99999999) <= (slab2.end || 99999999)))) {
                            callback('One or more commission slabs are conflicting');
                        } else {
                            callback();
                        }
                    }, function(err) {
                        callback(err);
                    });
                }
            }, function(err) {
                if (err) {
                    deferred.reject(err);
                } else if (_.get($scope.outlet, 'twyst_meta.cashback_info.order_amount_slab') && $scope.outlet.twyst_meta.cashback_info.order_amount_slab.length !== 0 && !check_upper_cashback) {
                    deferred.reject('Eactly one cashback slab must not have an upper bound');
                } else {
                    deferred.resolve();
                }
            })
        }

        return deferred.promise;
    };

    $scope.updateInfo = function() {
        var _showErrorMessage = function(err_msg) {
            $scope.formFailure = true;
            SweetAlert.swal('Validation Error', err_msg, 'error');
        };

        $scope.validateCommission().then(function() {
            $scope.validateCashback().then(function() {
                consoleRESTSvc.updateOutlet($scope.outlet).then(function(res) {
                    console.log(res);
                    SweetAlert.swal('SUCCESS', 'Cashback and Commission updated successfully', 'success');
                    $modalInstance.close($scope.outlet);
                }, function(err) {
                    console.log(err);
                })
            }, function(err) {
                _showErrorMessage(err);
            });
        }, function(err) {
            _showErrorMessage(err);
        })
    };

    $scope.discardInfo = function() {
        $modalInstance.dismiss('Cancel');
    };

})
