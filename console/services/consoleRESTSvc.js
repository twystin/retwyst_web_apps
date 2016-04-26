angular.module('consoleApp').factory('consoleRESTSvc', ['$http', '$q', '$cookies', '$localStorage',
    function($http, $q, $cookies, $localStorage) {
        var consoleRESTSvc = {};

        consoleRESTSvc.login = function(user) {
            var deferred = $q.defer();
            $http.post('/api/v4/accounts/login', user)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.logout = function() {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/accounts/logout?token=' + token)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.refreshOutlets = function() {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/outlets?token=' + token)
                .then(function(res) {
                    console.log(res);
                    if (res.data.response) {
                        // $localStorage['outlets'] = angular.toJson(res.data);
                        deferred.resolve(res.data);
                    } else {
                        // $localStorage['outlets'] = [];
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    $localStorage['outlets'] = [];
                    console.log(err);
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.refreshOffers = function() {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/offers?token=' + token)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.refreshQRs = function() {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/qr?token=' + token)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.getOutlets = function() {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/outlets?token=' + token)
                .then(function(res) {
                    console.log(res);
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.updateOutlet = function(outlet_obj) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.put('/api/v4/outlets/' + outlet_obj._id + '?token=' + token, outlet_obj)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };


        /*==================================
        =            OFFER APIs            =
        ==================================*/

        consoleRESTSvc.getOffers = function() {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/offers?token=' + token)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.getOffer = function(offer_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/offers/' + offer_id + '?token=' + token).then(function(res) {
                if (res.data.response) {
                    deferred.resolve(res.data);
                } else {
                    deferred.reject(res.data);
                }
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        consoleRESTSvc.updateOfferStatus = function(offer) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.put('/api/v4/offers/' + offer._id + '?token=' + token, offer)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.getQRs = function() {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/qr?token=' + token)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };


        /*===================================
        =            EVENTS APIs            =
        ===================================*/

        consoleRESTSvc.getAllEvents = function(event_type) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/events/list/' + event_type + '?token=' + token)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.getEvent = function(event_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/events/retrieve/' + event_id + '?token=' + token).then(function(res) {
                if (res.data.response) {
                    deferred.resolve(res.data);
                } else {
                    deferred.reject(res.data);
                }
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        consoleRESTSvc.updateEvent = function(event) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.put('/api/v4/events/update/' + event._id + '?token=' + token, event)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.bulkCheckin = function(data) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.post('/api/v4/checkin/bulk?token=' + token, data)
                .then(function(data) {
                    if (data.data.response) {
                        deferred.resolve(data.data);
                    } else {
                        deferred.reject(data.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.registerMerchant = function(merchant) {
            var deferred = $q.defer();
            $http.post('/api/v4/auth/register', merchant)
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                })
            return deferred.promise;
        };


        /*=================================
        =            MENU APIs            =
        =================================*/

        consoleRESTSvc.getMenus = function() {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/menu?token=' + token).then(
                function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                },
                function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.getMenu = function(menu_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/menus/' + menu_id + '?token=' + token).then(
                function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                },
                function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.deleteMenu = function(menu_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.delete('/api/v4/menus/' + menu_id + '?token=' + token)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.createMenu = function(menu) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.post('/api/v4/menu?token=' + token, menu)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.updateMenu = function(menu) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.put('/api/v4/menus/' + menu._id + '?token=' + token, menu)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise
        };

        consoleRESTSvc.cloneMenu = function(menu_id, outlet_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.post('/api/v4/menus/clone?token=' + token, {
                menu: menu_id,
                outlet: outlet_id
            }).then(function(res) {
                if (res.data.response) {
                    deferred.resolve(res.data);
                } else {
                    deferred.reject(res.data);
                }
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };


        /*==================================
        =            ORDER APIs            =
        ==================================*/

        consoleRESTSvc.getOrders = function() {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/orders?token=' + token)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.getOrder = function(order_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/orders?token=' + token)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.updateOrder = function(req_obj) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.put('/api/v4/outlet/order/' + req_obj._id + '?token=' + token, req_obj)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        /*===========================================
        =            COUPON OFFER APIs              =
        ===========================================*/

        consoleRESTSvc.getCoupons = function() {
          var deferred = $q.defer();
          var token = $cookies.get('token');
            $http.get('/api/v4/coupons?token='+token).then(function(res) {
                if (res.data.response) {
                    deferred.resolve(res.data);
                } else {
                    deferred.reject(res.data);
                }
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        consoleRESTSvc.getCoupon = function(offer_id) {
            var deferred = $q.defer();
            $http.get('/api/v4/coupons' + coupon_id).then(function(res) {
                if (res.data.response) {
                    deferred.resolve(res.data);
                } else {
                    deferred.reject(res.data);
                }
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        consoleRESTSvc.createCoupon = function(coupon_obj) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            console.log("coupon object",coupon_obj);
            $http.post('/api/v4/coupons?token='+token, coupon_obj)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.updateCouponOffer = function(offer_obj) {
            var deferred = $q.defer();
            $http.put('/api/v4/banners/' + offer_obj._id)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.deleteCouponOffer = function(offer_obj) {
            var deferred = $q.defer();
            $http.delete('/api/v4/banners/' + offer_obj._id)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        /*===========================================
        =            Shopping OFFER APIs            =
        ===========================================*/

        consoleRESTSvc.getShoppingOffers = function() {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/cashback/offers?token=' + token).then(function(res) {
                if (res.data.response) {
                    deferred.resolve(res.data);
                } else {
                    deferred.reject(res.data);
                }
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        consoleRESTSvc.getShoppingOffer = function(offer_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/cashback/offers/' + offer_id + '?token=' + token).then(function(res) {
                if (res.data.response) {
                    deferred.resolve(res.data);
                } else {
                    deferred.reject(res.data);
                }
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        consoleRESTSvc.createShoppingOffer = function(offer_obj) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.post('/api/v4/cashback/offers?token=' + token, offer_obj)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.updateShoppingOffer = function(offer_obj) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.put('/api/v4/cashback/offers/' + offer_obj._id + '?token=' + token, offer_obj)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        consoleRESTSvc.deleteShoppingOffer = function(offer_obj) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.delete('/api/v4/cashback/offers/' + offer_obj._id + '?token=' + token, offer_obj)
                .then(function(res) {
                    if (res.data.response) {
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };


        return consoleRESTSvc;
    }
])
