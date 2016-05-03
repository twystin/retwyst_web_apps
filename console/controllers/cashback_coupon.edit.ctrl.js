angular.module('consoleApp').controller('CashbackCouponUpdateController', ['$scope', 'consoleRESTSvc', '$filter', '$modal', 'SweetAlert', '$state', '$stateParams',
    function($scope, consoleRESTSvc, $modal, SweetAlert, $state, $filter, $stateParams) {
      $scope.searchKeywords = '';
      $scope.view_status = '';
      $scope.outlets = [];
      $scope.filtered_outlets = [];
      $scope.coupon = {};

      consoleRESTSvc.getCoupon($stateParams.coupon_id).then(function(res) {
          console.log("response", res);
          $scope.coupon = _.merge($scope.coupon, res.data);
          console.log("coupon", $scope.coupon);
      }, function(err) {
          console.log("error",err);
      })



        $scope.updateCoupon = function(id) {

          // if (!_.get($scope.coupon, 'code')) {
          //   SweetAlert.swal('Validation Error', 'Coupon code not present', 'warning');
          // } else if (!_.get($scope.coupon, 'max_use_limit')) {
          //   SweetAlert.swal('Validation Error', 'Maximum use limit not present', 'warning');
          // } else if (!_.get($scope.coupon, 'per_user_limit')) {
          //   SweetAlert.swal('Validation Error', 'Per user limit not present', 'warning');
          // } else if (!_.get($scope.coupon, 'start_date')) {
          //   SweetAlert.swal('Validation Error', 'Start date not present', 'warning');
          // } else if (!_.get($scope.coupon, 'end_date')) {
          //   SweetAlert.swal('Validation Error', 'End date not present', 'warning');
          // } else if (!_.get($scope.coupon.actions.reward.reward_meta, 'reward_type')) {
          //   SweetAlert.swal('Validation Error', 'Reward type not present', 'warning');
          // } else if (!_.get($scope.coupon.actions.reward, 'header')) {
          //   SweetAlert.swal('Validation Error', 'Header not present', 'warning');
          // } else if (!_.get($scope.coupon.actions.reward, 'line1')) {
          //   SweetAlert.swal('Validation Error', 'Line 1 not present', 'warning');
          // }  else if (!_.get($scope.coupon.actions.reward, 'line2')) {
          //   SweetAlert.swal('Validation Error', 'Line 1 not present', 'warning');
          // }  else if (!_.get($scope.coupon.actions.reward.reward_meta, 'off') && $scope.coupon.actions.reward.reward_meta.reward_type === "flatoff" ) {
          //   SweetAlert.swal('Validation Error', 'Flat off amount not input', 'warning');
          // }  else if (!_.get($scope.coupon.actions.reward.reward_meta, 'spend') && $scope.coupon.actions.reward.reward_meta.reward_type === "flatoff" ) {
          //   SweetAlert.swal('Validation Error', 'Minimum spending amount not input', 'warning');
          // }  else if (!_.get($scope.coupon.actions.reward.reward_meta, 'percent') && $scope.coupon.actions.reward.reward_meta.reward_type === "discount" ) {
          //   SweetAlert.swal('Validation Error', 'Discount % not input', 'warning');
          // }  else if (!_.get($scope.coupon.actions.reward.reward_meta, 'max') && $scope.coupon.actions.reward.reward_meta.reward_type === "discount" ) {
          //   SweetAlert.swal('Validation Error', 'Maximum discount amount not input', 'warning');
          // } else {
            consoleRESTSvc.updateCouponOffer($scope.coupon).then(function(res) {
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
//          }
        };
    }
]);
