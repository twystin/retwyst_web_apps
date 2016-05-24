angular.module('consoleApp').controller('PromoNotificationsController', ['$scope', 'consoleRESTSvc', '$modal', 'SweetAlert', '$state',
    function($scope, consoleRESTSvc, $modal, SweetAlert, $state) {
        $scope.promo = {
          message:"Perfect Weather for Rs 150 Cashback",
          detail:"Perfect weather to Order Food and Enjoy Rs 150 Cashback on your 1st order(Min Rs 300) Use Code FLAT150 . Also Get Extra 10% Mobikwik Cashback",
          user_class:"default",
          outlets: null,
          coupon_code:"FLAT150",
        };
        $scope.all = true,

        $scope.createNotification = function() {

          $scope.promo.image = document.getElementsByClassName('img-polaroid')[0].src;

          if (!_.get($scope.promo, 'message')) {
        		SweetAlert.swal('Validation Error', 'A Header is required', 'warning');
        	} else if (!_.get($scope.promo, 'detail')) {
        		SweetAlert.swal('Validation Error', 'Detailed message is required', 'warning');
        	} else if (!_.get($scope.promo, 'coupon_code')) {
        		SweetAlert.swal('Validation Error', 'Coupon code required', 'warning');
        	} else if ($scope.promo.user_class === 'default') {
            SweetAlert.swal('Validation Error', 'Target required', 'warning');
        	} else if($scope.promo.user_class === 'test' && typeof $scope.promo.test_number === "undefined") {
            SweetAlert.swal('Validation Error', 'Target phone number required', 'warning');
          } else if (!_.get($scope.promo, 'image')) {
        		SweetAlert.swal('Validation Error', 'Image required', 'warning');
          } else if ($scope.promo.image.length === 0) {
        		SweetAlert.swal('Validation Error', 'Image required', 'warning');
        	} else {

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
          }
        };
    }
]);
