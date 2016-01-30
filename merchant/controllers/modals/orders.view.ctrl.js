angular.module('merchantApp').controller('OrderViewController', ['$scope', '$modalInstance', 'order', 'merchantRESTSvc', 'SweetAlert', function($scope, $modalInstance, order, merchantRESTSvc, SweetAlert) {
    console.log('order', order);

    $scope.order = order;

    $scope.getItemPrice = function(item) {
        var price = 0;
        if (!item.option || !item.option._id) {
            return item.item_price;
        } else {
            price += item.option.option_cost;
            _.each(item.sub_options, function(sub_option) {
                price += sub_option.sub_option_set[0].sub_option_cost;
            });
            _.each(item.addons, function(addon) {
                _.each(addon.addon_set, function(addon_obj) {
                    price += addon_obj.addon_cost;
                });
            });
            return price;
        }
    };

    $scope.getItemTotal = function() {
        var item_total = 0;
        _.each(order.items, function(item) {
            if (!item.option || !item.option._id) {
                item_total += item.item_price;
            } else {
                var price = item.option.option_cost;
                _.each(item.sub_options, function(sub_option) {
                    price += sub_option.sub_option_set[0].sub_option_cost;
                });
                _.each(item.addons, function(addon) {
                    _.each(addon.addon_set, function(addon_obj) {
                        price += addon_obj.addon_cost;
                    });
                });
                item_total += price;
            }
        });
        return item_total;
    };

    $scope.initEndTime = function() {
        if ($scope.order.order_status === 'accepted') {
            $scope.order.end_time = new Date($scope.order.order_date).getTime() + ($scope.order.estimate_time * 60 * 1000);
        }
    };

    $scope.acceptOrder = function() {
        if (!$scope.order || !$scope.order.estimate_time) {
            SweetAlert.swal("Validation error", "Please provide valid estimate delivery time", "error");
        } else {
            var updated_order = {};
            updated_order.update_type = 'accept';
            updated_order.estimate_time = $scope.order.estimate_time;
            merchantRESTSvc.updateOrder(updated_order)
                .then(function(res) {
                    console.log(res);
                    SweetAlert.swal('Update successful', "Order accepted successfully", "success");
                    $scope.order.order_status = 'accepted';
                    $scope.initEndTime();
                }, function(err) {
                    console.log(err);
                });
        }
    };

    $scope.rejectOrder = function() {
        var updated_order = {};
        updated_order.update_type = 'reject';
        merchantRESTSvc.updateOrder(updated_order)
            .then(function(res) {
                console.log(res);
                SweetAlert.swal('Update successful', "Order rejected successfully", "info");
                $scope.order.order_status = 'rejected';
            }, function(err) {
                console.log(err);
            });
    };

    $scope.dispatchOrder = function() {
        var updated_order = {};
        updated_order.update_type = 'dispatch';
        merchantRESTSvc.updateOrder(updated_order)
            .then(function(res) {
                console.log(res);
                SweetAlert.swal('Update successful', 'Order status updated to "DISPATCHED"', 'success');
                $scope.order.order_status = 'dispatched';
            }, function(err) {
                console.log(err);
            });
    };

}]);
