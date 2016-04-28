angular.module('consoleApp').controller('BannerUpdateController', ['$scope', 'consoleRESTSvc', '$modal', 'SweetAlert', '$state', '$stateParams',
    function($scope, consoleRESTSvc, $modal, SweetAlert, $state, $stateParams) {
        

        $scope.banner_types = {
            'single_outlet': 'Single Outlet',
            'multi_outlets': 'Multi Outlet',
            'third_party': 'Third Party',
            'landing_page': 'Landing Page'
        };
        
        consoleRESTSvc.getBanner($stateParams.banner_id).then(function(res) {
            $scope.banner = res.data;
            console.log($scope.banner)
            console.log(res.data)
        }, function(err) {
            console.log(err);
        })

        

        $scope.updateBanner = function() {
            if (!_.get($scope.banner, 'banner_type')) {
                SweetAlert.swal('Validation Error', 'Banner type required', 'warning');
            } else if (!_.get($scope.banner, 'banner_name')) {
                SweetAlert.swal('Validation Error', 'Banner\'s name required', 'warning');
            } else if (!_.get($scope.banner, 'header')) {
                SweetAlert.swal('Validation Error', 'Banner\'s header required', 'warning');
            }else if (!_.get($scope.banner, 'expiry_date')) {
                SweetAlert.swal('Validation Error', 'Banner\'s expiry date required', 'warning');
            } else if (!_.get($scope.banner, 'banner_image')) {
                SweetAlert.swal('Validation Error', 'Banner\'s image required', 'warning');
            
            }else {
                consoleRESTSvc.updateBanner($scope.banner).then(function(res) {
                    console.log('res', res);
                    SweetAlert.swal({
                        title: 'SUCCESS',
                        text: 'Banner updated successfully',
                        type: 'success'
                    }, function() {
                        $state.go('^.banner_manage', {}, {
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
