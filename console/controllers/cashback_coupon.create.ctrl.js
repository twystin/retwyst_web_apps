angular.module('consoleApp').controller('CashbackCouponCreateController', ['$scope', 'consoleRESTSvc', '$filter', '$modal', 'SweetAlert', '$state',
    function($scope, consoleRESTSvc, $modal, SweetAlert, $state, $filter) {
      $scope.searchKeywords = '';
      $scope.view_status = '';
      $scope.outlets = [];

      console.log("SweetAlert: ", SweetAlert);
      $scope.filtered_outlets = [];

      $scope.coupon = {
        offers:[],
        code:"#154652",
        all:true,
        only_on_first_order:true,
        max_use_limit:15,
        per_user_limit:"5",
        start_date: new Date(2016, 3, 22),
        end_date: new Date(2016, 3, 23),
        actions:{
          reward:{
            reward_meta: {
              reward_type:"flatoff",
            }
          }
        }
      };

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
