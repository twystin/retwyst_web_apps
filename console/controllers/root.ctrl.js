angular.module('consoleApp').controller('RootController', ['$scope', '$rootScope', '$state', 'consoleRESTSvc', '$cookies', 'SweetAlert', function($scope, $rootScope, $state, consoleRESTSvc, $cookies, SweetAlert) {
    if (!$rootScope.token && ($state.current.name !== 'console.login')) {
        $state.go('console.login', {}, {
            reload: true
        });
    }

    $scope.logout = function() {
        consoleRESTSvc.logout().then(function(data) {
            if (data.response) {
                $cookies.remove('user');
                $cookies.remove('token');
                $cookies.remove('role');
                $cookies.put('paths', '[]');
                $rootScope.user = undefined;
                $rootScope.token = undefined;
                $rootScope.role = undefined;
                $rootScope.paths = [];
                SweetAlert.swal({
                    title: "SUCCESS",
                    text: "Logged out successfully",
                    type: "success"
                }, function() {
                    $state.go('console.login', {}, {
                        reload: true
                    });
                });
            } else {
                SweetAlert.swal("ERROR", data.message, "error");
            }
        }, function(err) {
            if (err.message) {
                SweetAlert.swal("ERROR", err.message, "error");
            }
        });
    }
}]);
