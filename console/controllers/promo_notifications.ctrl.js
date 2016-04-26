angular.module('consoleApp').controller('PromoNotificationsController', ['$scope', 'consoleRESTSvc', '$modal', 'SweetAlert', '$state',
    function($scope, consoleRESTSvc, $modal, SweetAlert, $state) {
        $scope.coupon = {
          offers:[],
          code:"#154652",
          Outlets:"abc",
          only_on_first_order:"true",
          max_use_limit:15,
          per_user_limit:"5",
          start_date: new Date(2016, 3, 22),
          end_date: new Date(2016, 3, 23),

        };

        $scope.addNewOffer = function() {
            _id = undefined;
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/cashback_offer.tmpl.html',
                controller: 'CashbackOfferTemplateController',
                size: 'lg',
                resolve: {
                    is_new: function() {
                        return true;
                    },
                    cashback_offer: function() {
                        return {
                            offer_status: 'draft',
                            offer_applicability: {
                                monday: {
                                    closed: false,
                                    timings: [{}]
                                },
                                tuesday: {
                                    closed: false,
                                    timings: [{}]
                                },
                                wednesday: {
                                    closed: false,
                                    timings: [{}]
                                },
                                thursday: {
                                    closed: false,
                                    timings: [{}]
                                },
                                friday: {
                                    closed: false,
                                    timings: [{}]
                                },
                                saturday: {
                                    closed: false,
                                    timings: [{}]
                                },
                                sunday: {
                                    closed: false,
                                    timings: [{}]
                                }
                            }
                        };
                    }
                }
            });

            modalInstance.result.then(function(offer_obj) {
                _id = undefined;
                $scope.offer.offers.push(offer_obj);
            });
        };

        $scope.updateOffer = function(index) {
            _id = $scope.offer._id;

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/cashback_offer.tmpl.html',
                controller: 'CashbackOfferTemplateController',
                size: 'lg',
                resolve: {
                    is_new: function() {
                        return false;
                    },
                    cashback_offer: function() {
                        return _.cloneDeep($scope.offer.offers[index])
                    }
                }
            });

            modalInstance.result.then(function(offer_obj) {
                _id = undefined;
                $scope.offer.offers[index] = offer_obj;
            });
        };

        $scope.removeOffer = function(index) {
            SweetAlert.swal({
                title: 'Delete Offer?',
                text: 'This change (once saved) is irrevesable',
                type: 'error',
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!"
            }, function(confirm) {
                if (confirm) {
                    $scope.offer.offers.splice(index, 1);
                }
            });
        };

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
        				text: 'Cashback offers created successfully',
        				type: 'success'
        			}, function() {
        				$state.go('^.cashback_offers_manage', {}, {
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
