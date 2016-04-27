angular.module('consoleApp').controller('PromoNotificationsController', ['$scope', 'consoleRESTSvc', '$modal', 'SweetAlert', '$state',
    function($scope, consoleRESTSvc, $modal, SweetAlert, $state) {
        $scope.promo = {
          message:"ONE PLUS ONE",
          detail:"For any product get another for free!",
          outlets: null,
          coupon_code:"#1PFREE"
        };
        $scope.all = true,

        $scope.createNotification = function() {
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
          console.log("promo", $scope.promo);
          if($scope.all) {
            $scope.promo.outlets = null;
          }
        		consoleRESTSvc.createNotification($scope.promo).then(function(res) {
        			console.log('res', res);
        			SweetAlert.swal({
        				title: 'SUCCESS',
        				text: 'Notification created successfully',
        				type: 'success'
        			}, function() {
        				$state.go('^.promo_notifications', {}, {
        					reload: true
        				});
        			});
        		}, function(err) {
        			SweetAlert.swal('Internal Error', err.message?err.message:'Something went wrong', 'error');
        		});
        	//}
        };
    }
]);
