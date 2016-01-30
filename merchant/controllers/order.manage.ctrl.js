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
                $scope.orders.push($scope.order);
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

        $scope.order = {
            "_id": "569f74d6d485f59b2ec1cd36",
            "user": {
                "_id": "54e5740127d46ad4117742ae",
                "first_name": "Full",
                "last_name": "Name",
                "phone": "4321233243",
                "email": "email@domain.com"
            },
            "outlet": "540ea3d32f61834b5170eb10",
            "order_number": "TWBBR116S5FT",
            "offer_used": "56168becef75fc1f5d5647b8",
            "order_status": "pending",
            "order_value_without_offer": 3244,
            "order_value_with_offer": 2919.5999999999999091,
            "menu_id": "5680efbfe5b619416c628896",
            "tax_paid": 552.5343000000000302,
            "actual_amount_paid": 3472.1342999999997119,
            "address": {
                "line1": "A5/16",
                "line2": "Sector 26A",
                "landmark": "Near Qutab Plaza",
                "pin": 122002,
                "city": "Gurgaon",
                "state": "Haryana",
                "tag": "home"
            },
            "items": [{
                "_id": "5680efc0e5b619416c628899",
                "item_name": "Choco Mocha Cake",
                "item_quantity": 1,
                "item_cost": "130",
                "option": {
                    "option_cost": 365,
                    "option_value": "Half Kg",
                    "_id": "5680f18ce5b619416c6288aa",
                    "is_vegetarian": true,
                    "addons": [{
                        "addon_title": "test",
                        "addon_set": [{
                            "addon_value": "qwer",
                            "addon_cost": 10
                        }]
                    }],
                    "sub_options": [{
                        "sub_option_title": "test",
                        "sub_option_set": [{
                            "sub_option_value": "sda",
                            "sub_option_cost": 20
                        }]
                    }],
                    "option_is_addon": false
                },
                "item_tags": [
                    "coffee cakes"
                ]
            }, {
                "_id": "5680f18ce5b619416c6288a5",
                "item_name": "Coffee Crunch Cake",
                "item_quantity": 1,
                "item_cost": "130",
                "option": {
                    "option_cost": 645,
                    "option_value": "One Kg",
                    "_id": "5680f18ce5b619416c6288a6",
                    "is_vegetarian": true,
                    "addons": [],
                    "sub_options": [],
                    "option_is_addon": false
                },
                "item_tags": [
                    "coffee cakes"
                ]
            }, {
                "_id": "5680f18ce5b619416c6288a1",
                "item_name": "Tiramisu Cake",
                "item_quantity": 1,
                "item_cost": "130",
                "option": {
                    "option_cost": 645,
                    "option_value": "One Kg",
                    "_id": "5680f18ce5b619416c6288a2",
                    "is_vegetarian": true,
                    "addons": [],
                    "sub_options": [],
                    "option_is_addon": false
                },
                "item_tags": [
                    "coffee cakes"
                ]
            }, {
                "_id": "5680f18ce5b619416c62889a",
                "item_name": "Coffee Almond and Berry Cake",
                "item_quantity": 1,
                "item_cost": "410",
                "option": {
                    "option_cost": 799,
                    "option_value": "One Kg",
                    "_id": "5680f18ce5b619416c62889b",
                    "is_vegetarian": true,
                    "addons": [],
                    "sub_options": [],
                    "option_is_addon": false
                },
                "item_tags": [
                    "coffee cakes"
                ]
            }, {
                "_id": "5680f330e5b619416c6288be",
                "item_name": "Choco Marble Cake",
                "item_quantity": 1,
                "item_cost": "130",
                "option": {
                    "option_cost": 660,
                    "option_value": "One Kg",
                    "_id": "5680f330e5b619416c6288bf",
                    "is_vegetarian": true,
                    "addons": [],
                    "sub_options": [],
                    "option_is_addon": false
                },
                "item_tags": [
                    "choco and cream combo"
                ]
            }, {
                "_id": "5680f330e5b619416c6288b6",
                "item_name": "Italian Cassatta Cake",
                "item_quantity": 1,
                "item_cost": "130",
                "option": {
                    "option_cost": 130,
                    "option_value": "Two Pieces",
                    "_id": "5680f330e5b619416c6288b9",
                    "is_vegetarian": true,
                    "addons": [],
                    "sub_options": [],
                    "option_is_addon": false
                },
                "item_tags": [
                    "choco and cream combo"
                ]
            }],
            "is_favourite": false,
            "user_rating": 0,
            "actions": [],
            "cashback": 0,
            "order_date": "2016-01-20T11:51:10.123Z",
            "__v": 0
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
