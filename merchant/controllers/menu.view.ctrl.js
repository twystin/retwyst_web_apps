angular.module('merchantApp').controller('MenuViewController', ['$scope', 'merchantRESTSvc', 'SweetAlert', '$state', '$q', '$modal', '$stateParams',
    function($scope, merchantRESTSvc, SweetAlert, $state, $q, $modal, $stateParams) {
        merchantRESTSvc.getOutlets().then(function(res) {
            $scope.outlets = res.data;
            $scope.getMenu();
        }, function(err) {
            $scope.outlets = [];
            console.log(err);
            $scope.getMenu();
        });

        $scope.menu = {
            status: 'active',
            menu_categories: []
        };

        $scope.getMenu = function() {
            merchantRESTSvc.getMenu($stateParams.menu_id).then(function(res) {
                $scope.menu = _.extend($scope.menu, res.data);
            }, function(err) {
                if (err.message) {
                    SweetAlert.swal('Service Error', err.message, 'error');
                } else {
                    SweetAlert.swal('Service Error', 'Something went wrong.', 'error');
                }
            });
        };

        $scope.toggle = function(scope) {
            scope.toggle();
        };
    }
]);
