angular.module('consoleApp').controller('CashbackCouponCreateController', ['$scope', 'consoleRESTSvc', '$filter', '$modal', 'SweetAlert', '$state',
    function($scope, consoleRESTSvc, $modal, SweetAlert, $state, $filter) {
      $scope.searchKeywords = '';
      $scope.view_status = '';
      $scope.outlets = [];
      $scope.filtered_outlets = [];


        $scope.createCoupon = function() {
          console.log("coupon", $scope.coupon);
        		consoleRESTSvc.createCoupon($scope.coupon).then(function(res) {
        			console.log('res', res);
        			SweetAlert.swal({
        				title: 'SUCCESS',
        				text: 'Coupon created successfully',
        				type: 'success'
        			}, function() {
        				$state.go('^.cashback_coupon_manage', {}, {
        					reload: true
        				});
        			});
        		}, function(err) {
        			SweetAlert.swal('Internal Error', err.message?err.message:'Something went wrong', 'error');
        		});
        };
    }
]);
