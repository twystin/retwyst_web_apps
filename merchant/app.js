angular.module('merchantApp', ['ui.router', 'ngAudio', 'ui.bootstrap', 'ngCookies', 'angularMoment', 'oitozero.ngSweetAlert', 'angular-loading-bar', 'ngAnimate', 'ngStorage', 'ordinal', 'ngFileUpload', 'uiGmapgoogle-maps', 'mgo-angular-wizard', 'ui.select2', 'frapontillo.bootstrap-switch', 'ui.tree', 'toastr', 'ordinal', 'notification'])
    .run(['$rootScope', '$state', '$cookies', 'ngAudio', '$notification', 'merchantRESTSvc', '$modal', function($rootScope, $state, $cookies, ngAudio, $notification, merchantRESTSvc, $modal) {
        $rootScope.handler = undefined;
        $rootScope.faye = new Faye.Client('/faye');
        $rootScope.token = $cookies.get('token');
        $rootScope.sound = ngAudio.load('sounds/song1.wav');
        $rootScope.sound.loop = true;
        $rootScope.sound.is_playing = false;
        $rootScope.isPaying = $cookies.get('isPaying') == 'true' ? true : false;
        $rootScope.subscribed_outlet = $cookies.get('subscribed_outlet') || '';

        merchantRESTSvc.getOutlets().then(function(res) {
            $rootScope.outlets = res.data;
        }, function(err) {
            console.log(err);
        })

        $rootScope.setHandler = function(handler) {
            $rootScope.handler = handler;
        }

        $rootScope.subscribeOutlet = function(outlet_id) {
            $rootScope.faye.subscribe('/' + outlet_id, function(message) {
                var title;
                
                if ($rootScope.handler) {
                    $rootScope.handler(message);
                } else {
                    console.log('faye message', message);
                    console.log('message outside panel', message);
                    $rootScope.notification_count += 1;

                    if (!$rootScope.sound.is_playing) {
                        $rootScope.sound.is_playing = true;
                        $rootScope.sound.play();
                    }

                    if (message.type === 'new') {
                        title = 'New Order';
                    } else {
                        title = 'Order Update';
                    }

                    var notification = $notification(title, {
                        body: (message.message) || 'You have an order',
                        delay: 0,
                        dir: 'auto'
                    });

                    notification.$on('click', function() {
                        console.debug('The user has clicked in my notification.');
                        $state.go('merchant.default', {
                            show: message.type
                        }, {
                            reload: true
                        });
                        notification.close();
                    });

                    notification.$on('close', function() {
                        console.debug('The user has closed my notification.');
                        notification.close();
                        $rootScope.notification_count -= 1;
                        if (!$rootScope.notification_count) {
                            $rootScope.sound.stop();
                            $rootScope.sound.is_playing = false;
                        }
                    });
                }
                
            });
            if ($rootScope.subscribed_outlet) {
                $rootScope.faye.unsubscribe('/' + $rootScope.subscribed_outlet);
            }
            $cookies.put('subscribed_outlet', outlet_id);
            $rootScope.subscribed_outlet = outlet_id;
        };

        if ($rootScope.subscribed_outlet) {
            $rootScope.subscribeOutlet($rootScope.subscribed_outlet);
        }

        $rootScope.$on('$stateChangeStart', function(_, toState, _, fromState) {
            if (fromState.name === 'merchant.default') {
                $rootScope.handler = undefined;
            }

            $('document').ready(function() {
                $(window).scrollTop(0);
            });
            
            $rootScope.current_state = toState.name;
        });
    }])
    .config(['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyBnVRxlTwkki9mi7GwRNv3SRseL6RNQRSI',
            v: '3.17',
            libraries: 'weather,geometry,visualization,drawing'
        });

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('merchant', {
                url: '',
                templateUrl: 'templates/header.html',
                controller: 'RootController'
            })
            .state('merchant.default', {
                url: '/?show',
                templateUrl: 'templates/order_panel.html',
                controller: 'OrderManageController'
            })
            .state('merchant.login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
            .state('merchant.outlets_manage', {
                url: '/outlets/manage',
                templateUrl: 'templates/outlets/manage.html',
                controller: 'OutletManageController'
            })
            .state('merchant.outlets_create', {
                url: '/outlets/create',
                templateUrl: 'templates/outlets/create.html',
                controller: 'OutletCreateController'
            })
            .state('merchant.outlets_edit', {
                url: '/outlets/edit/:outlet_id',
                templateUrl: 'templates/outlets/edit.html',
                controller: 'OutletEditController'
            })
            .state('merchant.outlets_view', {
                url: '/outlets/view/:outlet_id',
                templateUrl: 'templates/outlets/view.html',
                controller: 'OutletViewController'
            })
            .state('merchant.menus_manage', {
                url: '/menus/manage',
                templateUrl: 'templates/menus/manage.html',
                controller: 'MenuManageController'
            })
            .state('merchant.menus_edit', {
                url: '/menus/edit/:menu_id',
                templateUrl: 'templates/menus/edit.html',
                controller: 'MenuEditController'
            })
            .state('merchant.menus_request_update', {
                url: '/menus/request/:menu_id',
                templateUrl: 'templates/menus/request.html',
                controller: 'MenuRequestUpdateController'
            })
            .state('merchant.menus_view', {
                url: '/menus/view/:menu_id',
                templateUrl: 'templates/menus/view.html',
                controller: 'MenuViewController'
            })
            .state('merchant.offers_manage', {
                url: '/offers/manage',
                templateUrl: 'templates/offers/manage.html',
                controller: 'OfferManageController'
            })
            .state('merchant.offers_create', {
                url: '/offers/create',
                templateUrl: 'templates/offers/create.html',
                controller: 'OfferCreateController'
            })
            .state('merchant.offers_edit', {
                url: '/offers/edit/:offer_id',
                templateUrl: 'templates/offers/edit.html',
                controller: 'OfferEditController'
            })
            .state('merchant.offers_view', {
                url: '/offers/view/:offer_id',
                templateUrl: 'templates/offers/view.html',
                controller: 'OfferViewController'
            })
            .state('merchant.bills_manage', {
                url: '/bills/manage',
                templateUrl: 'templates/bills/manage.html',
                controller: 'BillManageController'
            })
            .state('merchant.bills_view', {
                url: '/bills/view/:bill_id',
                templateUrl: 'templates/bills/view.html',
                controller: 'BillViewController'
            })
            .state('merchant.checkin_panel', {
                url: '/checkin',
                templateUrl: 'templates/checkin_panel.html',
                controller: 'CheckinController'
            })
            .state('merchant.order_panel', {
                url: '/?show',
                templateUrl: 'templates/order_panel.html',
                controller: 'OrderManageController'
            })
    }]);
