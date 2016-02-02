angular.module('consoleApp').controller('CashbackOfferUpdateController', ['$scope', 'consoleRESTSvc', '$modal', 'SweetAlert', '$state', '$stateParams',
    function($scope, consoleRESTSvc, $modal, SweetAlert, $state, $stateParams) {
        $scope.offer = {
            offers: []
        };

        consoleRESTSvc.getCashbackOffer($stateParams.offer_id).then(function(res) {
            $scope.offer = _.merge($scope.offer, res.data);
        }, function(err) {
            console.log(err);
        })

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
            _id = $scope.offer.offers[index]._id;
            
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

        $scope.updateCashbackOffer = function() {
        	if (!_.get($scope.offer, 'partner_name')) {
        		SweetAlert.swal('Validation Error', 'Partner name required', 'warning');
        	} else if (!_.get($scope.offer, 'contact_person')) {
        		SweetAlert.swal('Validation Error', 'Contact person\'s name required', 'warning');
        	} else if (!_.get($scope.offer, 'email')) {
        		SweetAlert.swal('Validation Error', 'Contact person\'s email required', 'warning');
        	} else if (!_.get($scope.offer, 'phone')) {
        		SweetAlert.swal('Validation Error', 'Contact person\'s phone number required', 'warning');
        	} else if (!_.get($scope.offer, 'offers') || !$scope.offer.offers.length) {
        		SweetAlert.swal('Validation Error', 'Atleast add one cashback offer', 'warning');
        	} else {
        		consoleRESTSvc.updateCashbackOffer($scope.offer).then(function(res) {
        			console.log('res', res);
        			SweetAlert.swal({
        				title: 'SUCCESS',
        				text: 'Cashback offers updated successfully',
        				type: 'success'
        			}, function() {
        				$state.go('^.cashback_offers_manage', {}, {
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
