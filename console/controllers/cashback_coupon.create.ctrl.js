angular.module('consoleApp').controller('CashbackCouponCreateController', ['$scope', 'consoleRESTSvc', '$filter', '$modal', 'SweetAlert', '$state',
    function($scope, consoleRESTSvc, $modal, SweetAlert, $state, $filter) {
      $scope.searchKeywords = '';
      $scope.view_status = '';
      $scope.outlets = [];

      $scope.filtered_outlets = [];

      $scope.coupon = {
        offers:[],
        code:"#154652",
        Outlets:"",
        only_on_first_order:"true",
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

      consoleRESTSvc.getOutlets().then(function(res) {
        console.log(res);
        $scope.outlets = res.data;
        $scope.search();
      }, function(err) {
        console.log(err);
      });

      $scope.search = function() {
        $scope.filtered_outlets = $filter('filter')($scope.outlets, $scope.searchKeywords);
        if ($scope.view_status) {
          consol.log($scope.view_status);
          //              $scope.sort($scope.view_status);
        }
        //          return $scope.onFilterChange();
      };

      console.log("scope.search()",$scope.search);

        $scope.createCoupon = function() {
        	// if (!_.get($scope.offer, 'partner_name')) {
        	// 	SweetAlert.swal('Validation Error', 'Partner name required', 'warning');
        	// } else if (!_.get($scope.offer, 'contact_person')) {
        	// 	SweetAlert.swal('Validation Error', 'Contact person\'s name required', 'warning');
        	// } else if (!_.get($scope.offer, 'email')) {
        	// 	SweetAlert.swal('Validation Error', 'Contact person\'s email required', 'warning');
        	// } else if (!_.get($scope.offer, 'phone')) {
        	// 	SweetAlert.swal('Validation Error', 'Contact person\'s phone number required', 'warning');
        	// } else if (!_.get($scope.offer, 'source')) {
          //       SweetAlert.swal('Validation Error', 'offer source required', 'warning');
          //   } else if (!_.get($scope.offer, 'logo')) {
          //       SweetAlert.swal('Validation Error', 'source logo required', 'warning');
          //   }
          //   else if (!_.get($scope.offer, 'offers') || !$scope.offer.offers.length) {
        	// 	SweetAlert.swal('Validation Error', 'Atleast add one cashback offer', 'warning');
        	// } else {
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
