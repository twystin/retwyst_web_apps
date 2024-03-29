angular.module('consoleApp', ['ui.router', 'ui.bootstrap', 'ngCookies', 'angularMoment', 'oitozero.ngSweetAlert', 'angular-loading-bar', 'ngAnimate', 'ngStorage', 'ordinal', 'ngFileUpload', 'uiGmapgoogle-maps', 'mgo-angular-wizard', 'ui.select2', 'frapontillo.bootstrap-switch', 'ui.tree', 'toastr', 'ordinal', 'notification', 'ngAudio'])
    .run(['$rootScope', '$state', '$cookies', '$notification', 'ngAudio', 'consoleRESTSvc', function($rootScope, $state, $cookies, $notification, ngAudio, consoleRESTSvc) {
        $rootScope.faye = new Faye.Client('/faye');
        $rootScope.user = $cookies.get('user');
        $rootScope.token = $cookies.get('token');
        $rootScope.role = $cookies.get('role');
        $rootScope.sound = ngAudio.load('sounds/song1.wav');
        $rootScope.sound.loop = true;
        $rootScope.paths = JSON.parse($cookies.get('paths') || '[]');

        $rootScope.setHandler = function(handler) {
            $rootScope.handler = handler;
        }

        $rootScope.notification_count = 0;
        _.each($rootScope.paths, function(path) {
            $rootScope.faye.subscribe(path, function(message) {
                var title;

                if ($rootScope.handler) {
                    $rootScope.handler(message);
                } else {
                    console.log('faye message', message);
                    $rootScope.notification_count += 1;
                    $rootScope.sound.play();

                    if (message.type === 'new') {
                        title = 'New Order'
                    } else {
                        title = 'Order Update'
                    }

                    var notification = $notification(title, {
                        body: message.message || 'Message here',
                        delay: 0,
                        dir: 'auto'
                    });

                    notification.$on('click', function() {
                        console.debug('The user has clicked in my notification.');
                        $state.go('console.orders_manage', {
                            show: message.type !== 'new'?message.type:undefined
                        }, {
                            reload: true
                        });
                        notification.close();
                        // $rootScope.sound.stop();
                    });

                    notification.$on('close', function() {
                        console.debug('The user has closed my notification.');
                        notification.close();
                        $rootScope.notification_count -= 1;
                        if (!$rootScope.notification_count) {
                            $rootScope.sound.stop();
                        }
                    });
                }
            });
        });
        $rootScope.$on('$stateChangeStart', function(_, toState, _, fromState) {
            if (fromState.name === 'console.orders_manage') {
                $rootScope.handler = undefined;
            }

            $('document').ready(function() {
                $(window).scrollTop(0);
            });

            $rootScope.current_state = toState.name;
        })
    }])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('console', {
                url: '',
                templateUrl: 'templates/header.html',
                controller: 'RootController'
            })
            .state('console.default', {
                url: '/',
                templateUrl: 'templates/merchants/manage.html',
                controller: 'MerchantManageController'
            })
            .state('console.login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
            .state('console.register_merchant', {
                url: '/merchants/new',
                templateUrl: 'templates/merchants/register.html',
                controller: 'RegisterMerchantController'
            })
            .state('console.outlets_manage', {
                url: '/outlets',
                templateUrl: 'templates/outlets/manage.html',
                controller: 'OutletManageController'
            })
            .state('console.outlets_view', {
                url: '/outlets/:outlet_id',
                templateUrl: 'templates/outlets/view.html',
                controller: 'OutletViewController'
            })
            .state('console.offers_manage', {
                url: '/offers',
                templateUrl: 'templates/offers/manage.html',
                controller: 'OfferManageController'
            })
            .state('console.offers_view', {
                url: '/offers/:offer_id',
                templateUrl: 'templates/offers/view.html',
                controller: 'OfferViewController'
            })
            .state('console.orders_manage', {
                url: '/orders?show',
                templateUrl: 'templates/orders/manage.html',
                controller: 'OrderManageController'
            })
            .state('console.orders_view', {
                url: '/orders/:order_id',
                templateUrl: 'templates/orders/view.html',
                controller: 'OrderViewController'
            })
            .state('console.bills_manage', {
                url: '/bills',
                templateUrl: 'templates/bills/manage.html',
                controller: 'BillManageController'
            })
            .state('console.bills_view', {
                url: '/bills/:bill_id',
                templateUrl: 'templates/bills/view.html',
                controller: 'BillViewController'
            })
            .state('console.menus_create', {
                url: '/menus/create',
                templateUrl: 'templates/menus/create.html',
                controller: 'MenuCreateController'
            })
            .state('console.menus_manage', {
                url: '/menus',
                templateUrl: 'templates/menus/manage.html',
                controller: 'MenuManageController'
            })
            .state('console.menus_edit', {
                url: '/menus/edit/:menu_id',
                templateUrl: 'templates/menus/edit.html',
                controller: 'MenuEditController'
            })
            .state('console.menus_view', {
                url: '/menus/view/:menu_id',
                templateUrl: 'templates/menus/view.html',
                controller: 'MenuViewController'
            })
            .state('console.suggested_outlets_manage', {
                url: '/suggested_outlets',
                templateUrl: 'templates/suggested_outlets/manage.html',
                controller: 'SuggestedOutletManageController'
            })
            .state('console.suggested_offers_manage', {
                url: '/suggested_offers',
                templateUrl: 'templates/suggested_offers/manage.html',
                controller: 'SuggestedOfferManageController'
            })
            .state('console.suggested_offers_view', {
                url: '/suggested_offers/:suggested_offer_id',
                templateUrl: 'templates/suggested_offers/view.html',
                controller: 'SuggestedOfferViewController'
            })
            .state('console.user_feedbacks_manage', {
                url: '/user_feedbacks',
                templateUrl: 'templates/user_feedbacks/manage.html',
                controller: 'UserFeedbackManageController'
            })
            .state('console.write_to_twysts_manage', {
                url: '/write_to_twyst',
                templateUrl: 'templates/write_to_twyst/manage.html',
                controller: 'WriteToTwystManageController'
            })
            .state('console.reported_problems_manage', {
                url: '/reported_problems',
                templateUrl: 'templates/reported_problems/manage.html',
                controller: 'ReportedProblemManageController'
            })
            .state('console.bulk_checkin', {
                url: '/bulk_checkin',
                templateUrl: 'templates/bulk_checkin/manage.html',
                controller: 'BulkCheckinController'
            })
            .state('console.menu_update_requests_manage', {
                url: '/menu_update_requests',
                templateUrl: 'templates/menu_update_requests/manage.html',
                controller: 'MenuUpdateRequestManageController'
            })
            .state('console.shopping_offers_manage', {
                url: '/shopping_offers',
                templateUrl: 'templates/shopping_offers/manage.html',
                controller: 'ShoppingOffersManageController'
            })
            .state('console.shopping_offers_create', {
                url: '/shopping_offers/create',
                templateUrl: 'templates/shopping_offers/create.html',
                controller: 'ShoppingOfferCreateController'
            })
            .state('console.shopping_offers_edit', {
                url: '/shopping_offers/:offer_id',
                templateUrl: 'templates/shopping_offers/edit.html',
                controller: 'ShoppingOfferUpdateController'
            })
            .state('console.cashback_coupon_manage', {
                url: '/cashback_coupon',
                templateUrl: 'templates/cashback_coupon/manage.html',
                controller: 'CashbackCouponManageController'
            })
            .state('console.cashback_coupon_create', {
                url: '/cashback_coupon/create',
                templateUrl: 'templates/cashback_coupon/create.html',
                controller: 'CashbackCouponCreateController'
            })
            .state('console.cashback_coupon_edit', {
                url: '/cashback_coupon/:coupon_id',
                templateUrl: 'templates/cashback_coupon/edit.html',
                controller: 'CashbackCouponUpdateController'
            })
            .state('console.banner_manage', {
                url: '/banners',
                templateUrl: 'templates/banners/manage.html',
                controller: 'BannerManageController'
            })
            .state('console.banner_create', {
                url: '/banners/create',
                templateUrl: 'templates/banners/create.html',
                controller: 'BannerCreateController'
            })
            .state('console.banner_edit', {
                url: '/banner/:banner_id',
                templateUrl: 'templates/banners/edit.html',
                controller: 'BannerUpdateController'
            })
            .state('console.promo_notifications', {
                url: '/notifications',
                templateUrl: 'templates/promo_notifications/manage.html',
                controller: 'PromoNotificationsController'
            })
            .state('console.bulk_sms', {
                url: '/bulk_sms',
                templateUrl: 'templates/bulk_sms/manage.html',
                controller: 'BulkSMSController'
            })
            .state('console.test_payment', {
                url: '/test_payment',
                templateUrl: 'templates/test_payment.html',
                controller: 'TestPaymentController'
            });
    }]);
