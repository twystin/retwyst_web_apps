angular.module('merchantApp').controller('OrderManageController', ['$scope', 'merchantRESTSvc', 'SweetAlert', '$state', '$q', '$modal', '$rootScope', 'ngAudio', '$notification',
    function($scope, merchantRESTSvc, SweetAlert, $state, $q, $modal, $rootScope, ngAudio, $notification) {
        $scope.showing = "pending";
        $scope.show_checkin = false;
        $scope.current_order = -1;

        $scope.updateShowing = function(text) {
            $scope.showing = text;
            $scope.filterOrders();
        };

        $scope.maxDate = new Date();
        $scope.minDate = new Date($scope.maxDate.getTime() - (7 * 24 * 60 * 60 * 1000));

        $scope.checkin = {
            date: new Date()
        };

        $scope.search = {};

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
            // $scope.order = $scope.filtered_orders[$scope.filtered_orders.length - 2];
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
            "order_status": "cancelled",
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
            "actions": [{
                "action_by": "54e5740127d46ad4117742ae",
                "action_type": "cancelled",
                "_id": "569f75235e0228b02e69d9b5",
                "action_at": "2016-01-20T11:52:29.485Z"
            }],
            "cashback": 0,
            "order_date": "2016-01-20T11:51:10.123Z",
            "__v": 0
        };
        $scope.orders.push($scope.order);

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

        $scope.checkinUser = function() {
            if (!$scope.checkin || !$scope.checkin.number) {
                SweetAlert.swal('Number required', 'Please enter the customer\'s mobile number', 'warning');
            } else if (!/^[0-9]{10}$/.test($scope.checkin.number)) {
                SweetAlert.swal('Invalid number!', 'Number entered is invalid. Please recheck', 'warning');
            } else {
                $scope.checking_in = true;
                var req_obj = {
                    event_meta: {
                        phone: $scope.checkin.number
                    },
                    event_outlet: $scope.choosen_outlet
                };
                if ($scope.checkin.date) {
                    var today = new Date();
                    $scope.checkin.date.setHours(today.getHours());
                    $scope.checkin.date.setMinutes(today.getMinutes());
                    req_obj.event_date = $scope.checkin.date;
                    req_obj.event_meta.date = new Date();
                }
                merchantRESTSvc.checkinUser(req_obj)
                    .then(function(res) {
                        $scope.checking_in = false;
                        $scope.checkin.number = '';
                        if (!_.has(res, 'data.checkins_to_go')) {
                            SweetAlert.swal({
                                title: 'Checkin successful',
                                text: 'Customer has also unlocked a new voucher',
                                type: 'success'
                            }, function(confirm) {
                                if (confirm) {
                                    $modal.open({
                                        animation: true,
                                        templateUrl: 'templates/partials/panel.voucher.tmpl.html',
                                        size: 'lg',
                                        controller: 'PanelVoucherController',
                                        resolve: {
                                            vouchers: function() {
                                                return [data.data];
                                            },
                                            outlet: function() {
                                                return $scope.choosen_outlet;
                                            }
                                        }
                                    });
                                }
                            });
                        } else {
                            SweetAlert.swal('Checkin successful', '', 'success');
                        }
                    }, function(err) {
                        $scope.checking_in = false;
                        $scope.checkin.number = '';
                        var error_msg;
                        if (err.data.indexOf('-') === -1) {
                            error_msg = err.data;
                        } else {
                            error_msg = err.data.slice(err.data.indexOf('-') + 2)
                        }
                        SweetAlert.swal('ERROR', error_msg, 'error');
                    });
            }
        }

        $scope.getVoucherByCode = function() {
            console.log($scope.search);
            if (!$scope.search.code || $scope.search.code.length !== 6) {
                SweetAlert.swal('Missing/Invalid Voucher Code', 'Please provide a valid voucher code to search', 'error');
            } else {
                $scope.searchingByCode = true;
                merchantRESTSvc.getVoucherByCode($scope.choosen_outlet, $scope.search.code)
                    .then(function(data) {
                        $scope.searchingByCode = false;
                        $scope.search = {};
                        if (data.data) {
                            // show voucher in modal
                            $modal.open({
                                animation: true,
                                templateUrl: 'templates/partials/panel.voucher.tmpl.html',
                                size: 'lg',
                                controller: 'PanelVoucherController',
                                resolve: {
                                    vouchers: function() {
                                        return [data.data];
                                    },
                                    outlet: function() {
                                        return $scope.choosen_outlet;
                                    }
                                }
                            });
                            console.log(data);
                        } else {
                            SweetAlert.swal('Not Found', 'No active voucher found with that code', 'warning');
                        }
                    }, function(err) {
                        $scope.searchingByCode = false;
                        SweetAlert.swal('Error', err.message ? err.message : 'Something went wrong', 'error');
                    });
            }
        }

        $scope.getVouchersByPhone = function() {
            if (!$scope.search || !$scope.search.number) {
                SweetAlert.swal('Missing number', 'Please enter the customer\'s number to search', 'warning');
            } else if (!/^[0-9]{10}$/.test($scope.search.number)) {
                SweetAlert.swal('Invalid number', 'Phone number entered is invalid. Please recheck', 'error');
            } else {
                $scope.seachingByPhone = true;
                merchantRESTSvc.getVouchersByPhone($scope.choosen_outlet, $scope.search.number)
                    .then(function(data) {
                        $scope.seachingByPhone = false;
                        $scope.search = {};
                        if (!data.data.length) {
                            SweetAlert.swal('No active vouchers', 'No active vouchers found for the customer');
                        } else {
                            $modal.open({
                                animation: true,
                                templateUrl: 'templates/partials/panel.voucher.tmpl.html',
                                size: 'lg',
                                controller: 'PanelVoucherController',
                                resolve: {
                                    vouchers: function() {
                                        return data.data;
                                    },
                                    outlet: function() {
                                        return $scope.choosen_outlet;
                                    }
                                }
                            });
                            console.log(data);
                        }
                    }, function(err) {
                        $scope.seachingByPhone = false;
                        SweetAlert.swal('ERROR', err.message ? err.message : 'Something went wrong', 'error');
                    });
            }
        }

        $scope.viewOrder = function(order, index) {
            $scope.order = order;
            $scope.current_order = index;
        };

    }
]);
