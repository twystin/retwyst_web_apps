angular.module('consoleApp').controller('CashbackCouponCreateController', ['$scope', '$state', 'consoleRESTSvc', '$filter', '$modal', 'SweetAlert',
    function($scope, $state, consoleRESTSvc, $modal, $filter, SweetAlert) {
      $scope.searchKeywords = '';
      $scope.view_status = '';
      $scope.outlets = [];
      $scope.filtered_outlets = [];
      $scope.coupon = {
      };
      $scope.event_matches = {
          'on every': 'On Every',
          'after': 'After',
          'on only': 'On Only'
      };

        $scope.createCoupon = function() {
          if (!_.get($scope.coupon, 'code')) {
            SweetAlert.swal('Validation Error', 'Coupon code not present', 'warning');
          } else if (!_.get($scope.coupon, 'max_use_limit')) {
            SweetAlert.swal('Validation Error', 'Maximum use limit not present', 'warning');
          } else if (!_.get($scope.coupon, 'per_user_limit')) {
            SweetAlert.swal('Validation Error', 'Per user limit not present', 'warning');
          } else if (!_.get($scope.coupon.validity, 'start')) {
            SweetAlert.swal('Validation Error', 'Start date not present', 'warning');
          } else if (!_.get($scope.coupon.validity, 'end')) {
            SweetAlert.swal('Validation Error', 'End date not present', 'warning');
          } else if (!_.get($scope.coupon.actions.reward.reward_meta, 'reward_type')) {
            SweetAlert.swal('Validation Error', 'Reward type not present', 'warning');
          } else if (!_.get($scope.coupon.actions.reward.reward_meta, 'off') && $scope.coupon.actions.reward.reward_meta.reward_type === "flatoff" ) {
            SweetAlert.swal('Validation Error', 'Flat off amount not input', 'warning');
          }  else if (!_.get($scope.coupon.actions.reward.reward_meta, 'spend') && $scope.coupon.actions.reward.reward_meta.reward_type === "flatoff" ) {
            SweetAlert.swal('Validation Error', 'Minimum spending amount not input', 'warning');
          }  else if (!_.get($scope.coupon.actions.reward.reward_meta, 'percent') && $scope.coupon.actions.reward.reward_meta.reward_type === "discount" ) {
            SweetAlert.swal('Validation Error', 'Discount % not input', 'warning');
          }  else if (!_.get($scope.coupon.actions.reward.reward_meta, 'max') && $scope.coupon.actions.reward.reward_meta.reward_type === "discount" ) {
            SweetAlert.swal('Validation Error', 'Maximum discount amount not input', 'warning');
          } else if (!_.get($scope.coupon.rule, 'event_match')) {
            SweetAlert.swal('Validation Error', 'Offer rules not applied', 'warning');
          } else if ($scope.coupon.rule.event_match === "on every") {
              if (!_.get($scope.coupon.rule, 'event_count')) {
                SweetAlert.swal('Validation Error', 'Event count not present', 'warning');
              }  else if (!_.get($scope.coupon.rule, 'event_start')) {
                SweetAlert.swal('Validation Error', 'Event start not present', 'warning');
              } else if (!_.get($scope.coupon.rule, 'event_end')) {
                SweetAlert.swal('Validation Error', 'Event end not present', 'warning');
              }
          } else if ($scope.coupon.rule.event_match === "after") {
              if (!_.get($scope.coupon.rule, 'event_start')){
                SweetAlert.swal('Validation Error', 'Event start not present', 'warning');
              }  else if (!_.get($scope.coupon.rule, 'event_end')) {
                SweetAlert.swal('Validation Error', 'Event end not present', 'warning');
              }
        } else if ($scope.coupon.rule.event_match === "on only") {
            if (!_.get($scope.coupon.rule, 'event_count')){
              SweetAlert.swal('Validation Error', 'Event count not present', 'warning');
            }
        } else {
            consoleRESTSvc.createCoupon($scope.coupon).then(function(res) {

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
          }
        };
    }
]);
