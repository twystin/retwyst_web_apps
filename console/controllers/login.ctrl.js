angular.module('consoleApp').controller('LoginController', ['$scope', '$cookies', '$log', '$state', '$rootScope', 'consoleRESTSvc', 'SweetAlert',
    function($scope, $cookies, $log, $state, $rootScope, consoleRESTSvc, SweetAlert) {

        $scope.user = {
            isAdmin: true
        };

        if ($rootScope.token) {
            $state.go('console.orders_manage', {}, {
                reload: true
            });
        }

        $scope.logIn = function() {
            consoleRESTSvc.login($scope.user)
                .then(function(res) {
                    console.log(res);
                    $cookies.put('user', res.data.data.email);
                    $cookies.put('token', res.data.data.token);
                    $cookies.put('isPaying', res.data.data.is_paying);
                    $cookies.put('role', res.data.data.role);
                    $rootScope.user = res.data.data.email;
                    $rootScope.token = res.data.data.token;
                    $rootScope.isPaying = res.data.data.is_paying;
                    $rootScope.role = res.data.data.role;
                    $rootScope.paths = [];
                    if ($rootScope.role === 2) {
                        $rootScope.paths = ['/' + res.data.data.email.replace('.', '').replace('@', '')];
                        $cookies.put('paths', JSON.stringify($rootScope.paths));
                    } else {
                        $rootScope.paths = ['/console'];
                        $cookies.put('paths', JSON.stringify($rootScope.paths));
                    }
                    SweetAlert.swal({
                        title: 'Logged In Successfully',
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Continue',
                        closeOnConfirm: false
                    }, function() {
                        $state.go('console.orders_manage', {}, {
                            reload: true
                        });
                    });
                }, function(err) {
                    SweetAlert.swal({
                        title: 'ERROR',
                        text: err.data ? err.data : 'Invalid credentials',
                        type: 'error',
                        showCancelButton: false,
                        closeOnConfirm: true
                    });
                });
        }
    }
]);
