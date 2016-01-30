angular.module('merchantApp').controller('OrderManageController', ['$scope', 'merchantRESTSvc', 'SweetAlert',
    function($scope, merchantRESTSvc, SweetAlert) {
        $scope.showing = "pending";
        
        $scope.current_order = -1;

        $scope.reject_reasons = [
            'Reason 1',
            'Reason 2',
            'Reason 3',
            'Reason 4'
        ];

        $scope.updateShowing = function(text) {
            $scope.showing = text;
            $scope.filterOrders();
        };

        $scope.choosen_outlet;

        merchantRESTSvc.getOutlets().then(function(res) {
            $scope.outlets = _.indexBy(res.data, '_id');
            if (Object.keys($scope.outlets).length) {
                $scope.choosen_outlet = res.data[0]._id;
                $scope.getOrders();
            }
        }, function(err) {
            console.log(err);
            $scope.outlets = {};
        });

        $scope.orders = [];
        $scope.filtered_orders = [];

        $scope.getOrders = function() {
            merchantRESTSvc.getOrders($scope.choosen_outlet).then(function(res) {
                console.log(res);
                $scope.orders = res.data;
                $scope.filterOrders();
            }, function(err) {
                console.log(err);
            });
        }

        $scope.filterOrders = function() {
            $scope.filtered_orders = _.filter($scope.orders, function(order) {
                return order.order_status === $scope.showing;
            });
        };

        $scope.getItemPrice = function(item) {
            var total_price = 0;
            if (!item.option && !item.option._id) {
                return item.item_cost;
            } else {
                total_price += item.option.option_cost;
                if (item.option.option_is_addon === true) {
                    total_price += item.item_cost;
                }
                if (item.option.sub_options && item.option.sub_options.length) {
                    _.each(item.option.sub_options, function(sub_option) {
                        total_price += sub_option.sub_option_set[0].sub_option_cost;
                    });
                }
                if (item.option.addons && item.option.addons.length) {
                    _.each(item.option.addons, function(addon) {
                        _.each(addon.addon_set, function(addon_obj) {
                            total_price += addon_obj.addon_cost;
                        });
                    });
                }
                return total_price;
            }
        };

        $scope.updateEstimateTime = function(order, delta) {
            order.estimate_time += delta;
        }

        $scope.getDiscount = function(order) {
            return (order.order_value_without_offer - order.order_value_with_offer) + (order.order_value_with_offer * (order.cash_back / 100));
        }

        $scope.viewOrder = function(order, index) {
            $scope.order = order;
            $scope.current_order = index;
        };

        $scope.acceptOrder = function() {
            var updated_order = _.cloneDeep($scope.order);
            updated_order.update_type = 'accept';
            SweetAlert.swal({
                title: 'Estimate Time?',
                text: 'Provide an estimate time for delivery - in minutes.',
                type: 'input',
                showCancelButton: true,
                closeOnConfirm: false,
                animation: 'slide-from-top'
            }, function(inputValue) {
                var estimate_time;

                if (!inputValue) {
                    swal.showInputError('Estimate delivery time (in mins.) required');
                    return false;
                } else {
                    try {
                        estimate_time = Number(inputValue);
                        if (estimate_time === estimate_time) {
                            updated_order.estimate_time = estimate_time;
                            merchantRESTSvc.updateOrder(updated_order).then(function(res) {
                                console.log(res);
                                $scope.order.order_status = 'accepted';
                                $scope.order.actions.push({
                                    "action_type": "accepted",
                                    "action_at": new Date()
                                });
                                $scope.orders[$scope.current_order] = $scope.order;
                                SweetAlert.swal('SUCCESS', 'Order accepted successfully', 'success');
                                $scope.filterOrders();
                            }, function(err) {
                                console.log(err);
                                SweetAlert.swal('ERROR', err.message ? err.message : 'Something went wrong. Please try after sometime.', 'error');
                            });
                        } else {
                            swal.showInputError('Valid estimate delivery time(in minutes) required');
                            return false;
                        }
                    } catch (e) {
                        swal.showInputError('Valid estimate delivery time(in minutes) required');
                        return false
                    }
                }
            });
        };

        $scope.showReject = function() {
            $scope.show_reject_msg = true;
        };

        $scope.rejectOrder = function(reason) {
            var updated_order = _.cloneDeep($scope.order);
            updated_order.update_type = 'reject';
            SweetAlert.swal({
                title: 'Are you sure?',
                text: 'This is an irreversible change. Do you still want to proceed?',
                type: 'warning',
                showCancelButton: true,
                closeOnConfirm: false,
                animation: 'slide-from-top'
            }, function(confirm) {
                if(confirm) {
                    updated_order.reject_reason = reason;
                    merchantRESTSvc.updateOrder(updated_order).then(function(res) {
                        $scope.order.order_status = 'rejected';
                        $scope.order.actions.push({
                            "action_type": "rejected",
                            "action_at": new Date(),
                            "comments": reason
                        });
                        $scope.orders[$scope.current_order] = $scope.order;
                        SweetAlert.swal('SUCCESS', 'Order rejected successfully', 'info');
                        $scope.filterOrders();
                    }, function(err) {
                        console.log(err);
                        SweetAlert.swal('ERROR', err.message ? err.message : 'Something went wrong. Please try after sometime.', 'error');
                    });
                    return true;
                }
            });
        };

        $scope.dispatchOrder = function() {
            var updated_order = _.cloneDeep($scope.order);
            updated_order.update_type = 'dispatch';
            merchantRESTSvc.updateOrder(updated_order).then(function(res) {
                $scope.order.order_status = 'dispatched';
                $scope.order.actions.push({
                    action_type: 'dispatched',
                    action_at: new Date()
                });
                $scope.orders[$scope.current_order] = $scope.order;
                SweetAlert.swal('SUCCESS', 'Order dispatch updated successfully', 'success');
                $scope.filterOrders();
            }, function(err) {
                console.log(err);
                SweetAlert.swal('ERROR', err.message ? err.message : 'Something went wrong. Please try after sometime.', 'error');
            });
        };

    }
]);
