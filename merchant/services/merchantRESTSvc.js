angular.module('merchantApp').factory('merchantRESTSvc', ['$http', '$q', '$cookies', '$rootScope',
    function($http, $q, $cookies, $rootScope) {
        var merchantRESTSvc = {};

        merchantRESTSvc.login = function(user) {
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
        }

        merchantRESTSvc.logout = function() {
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
        }

        merchantRESTSvc.getOutlets = function() {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/outlets?token=' + token)
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
        }

        merchantRESTSvc.getOutlet = function(outlet_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/outlets/' + outlet_id + '?token=' + token)
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
        }

        merchantRESTSvc.createOutlet = function(outlet) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.post('/api/v4/outlets?token=' + token, outlet)
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
        }

        merchantRESTSvc.updateOutlet = function(outlet) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.put('/api/v4/outlets/' + outlet._id + '?token=' + token, outlet)
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
        }

        merchantRESTSvc.deleteOutlet = function(outlet_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.delete('/api/v4/outlets/' + outlet_id + '?token=' + token)
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
        }

        merchantRESTSvc.createOffer = function(offer) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.post('/api/v4/offers?token=' + token, offer)
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
        }

        merchantRESTSvc.getOffer = function(offer_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/offers/' + offer_id + '?token=' + token)
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
        }

        merchantRESTSvc.updateOffer = function(offer) {
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

        merchantRESTSvc.deleteOffer = function(offer_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.delete('/api/v4/offers/' + offer_id + '?token=' + token)
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
        }

        merchantRESTSvc.getBills = function() {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/events/list/upload_bill?token=' + token)
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
        }

        merchantRESTSvc.getBill = function(bill_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/events/retrieve/' + bill_id + '?token=' + token)
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
        }

        merchantRESTSvc.updateBill = function(bill) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.put('/api/v4/events/update/' + bill._id + '?token=' + token, bill)
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
        }

        merchantRESTSvc.getAllMenus = function() {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            if ($rootScope.menus && $rootScope.menus.length) {
                deferred.resolve({
                    data: $rootScope.menus
                });
            } else {
                $http.get('/api/v4/menu?token=' + token).then(function(res) {
                    if (res.data.response) {
                        $rootScope.menus = res.data.data;
                        deferred.resolve(res.data);
                    } else {
                        deferred.reject(res.data);
                    }
                }, function(err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        merchantRESTSvc.getMenu = function(menu_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/menus/' + menu_id + '?token=' + token)
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
        }

        merchantRESTSvc.createMenu = function(menu_obj) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.post('/api/v4/menu?token=' + token, menu_obj)
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
        }

        merchantRESTSvc.updateMenu = function(menu_obj) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.put('/api/v4/menus/' + menu_obj._id + '?token=' + token, menu_obj)
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
        }

        merchantRESTSvc.cloneMenu = function(menu_id, outlet_id) {
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
        }

        merchantRESTSvc.deleteMenu = function(menu_id) {
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
        }

        merchantRESTSvc.getLocations = function() {
            var deferred = $q.defer();
            $http.get('/api/v4/locations')
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
        }

        merchantRESTSvc.getOrders = function(outlet_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/outlet/orders/' + outlet_id + '?token=' + token)
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
        }

        merchantRESTSvc.updateOrder = function(order) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.put('/api/v4/outlet/order/' + order._id + '?token=' + token, order)
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
        }

        merchantRESTSvc.getOrder = function(order_id) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.get('/api/v4/order/' + order_id + '?token=' + token)
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
        }

        merchantRESTSvc.menuUpdateRequest = function(req_obj) {
            var deferred = $q.defer();
            var token = $cookies.get('token');
            $http.post('/api/v4/menu/request_update?token=' + token, req_obj).then(function(res) {
                if (res.data.response) {
                    deferred.resolve(res.data);
                } else {
                    deferred.reject(res.data);
                }
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        return merchantRESTSvc;
    }
]);
