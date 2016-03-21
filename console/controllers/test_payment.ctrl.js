angular.module('consoleApp').controller('TestPaymentController', ['$scope', 'toastr', 'consoleRESTSvc', '$log',
    function($scope, toastr, consoleRESTSvc, $log) {

        $scope.calculate_checksum = function() {
            $scope.checksum = '915f037be216e5f6e2b7f235a3d5add73fda96e47461bbd6230a64bfb1082e12';
        }


    }
]);
