angular.module('consoleApp').controller('MenuItemController', ['$scope', '$modalInstance', '$modal', 'item', 'is_new', 'limit_access', 'SweetAlert', '$q',
    function($scope, $modalInstance, $modal, item, is_new, limit_access, SweetAlert, $q) {

        $scope.is_new = is_new;
        $scope.limit_access = limit_access;
        $scope.item = item;
        if (!is_new) {
            _.each($scope.days, function(day) {
                $scope.checkModel[day] = $scope.item.item_available_on.indexOf(day) !== -1 ? true : false;
            });
            if ($scope.item.item_availability.start_date) {
                $scope.item.item_availability.start_date = new Date($scope.item.item_availability.start_date);
            }
            if ($scope.item.item_availability.end_date) {
                $scope.item.item_availability.end_date = new Date($scope.item.item_availability.end_date);
            }
        }

        $scope.checkModal = {};
        $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        $scope.$watchCollection('checkModal', function() {
            $scope.item.item_available_on = [];
            angular.forEach($scope.checkModal, function(val, key) {
                if (val) {
                    $scope.item.item_available_on.push(key);
                }
            });
        });

        $scope.updateItemTimings = function(val, updateFlag) {
            if (val !== true && val !== false) {
                return;
            }

            if ($scope.item.item_availability.regular_item === true) {
                delete $scope.item.item_availability.start_date;
                delete $scope.item.item_availability.end_date;
                $scope.item.item_availability.days_of_the_week = [];
                $scope.item.item_availability.available_hours = {
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
                };
            } else {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '../common/templates/partials/menu.item_timings.tmpl.html',
                    size: 'lg',
                    controller: 'MenuItemTimingsController',
                    resolve: {
                        item: function() {
                            return _.cloneDeep($scope.item);
                        }
                    }
                });

                modalInstance.result.then(function(item_obj) {
                    console.log('item_obj', item_obj);
                    $scope.item = item_obj;
                }, function() {
                    if (!updateFlag) {
                        $scope.item.item_availability.regular_item = true;
                    }
                });
            }
        }

        $scope.resolveItem = function() {
            $scope.validateItem().then(function() {
                $modalInstance.close($scope.item);
            }, function(err) {
                SweetAlert.swal("Validation Erorr", err, 'error');
            });
        };

        $scope.discardItem = function() {
            $modalInstance.dismiss('Cancel');
        };

        $scope.validateItem = function() {
            var deferred = $q.defer();
            if (!$scope.item.item_name) {
                deferred.reject('Item name required.');
            } else if (!$scope.item.item_cost && $scope.item.item_cost !== 0) {
                deferred.reject('Item cost required.');
            } else if (!$scope.item.item_tags || !$scope.item.item_tags.length) {
                deferred.reject('Atleast one tag required')
            } else if (!$scope.item.item_type) {
                deferred.reject('Item type must be selected');
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        };
    }
])
