angular.module('consoleApp').controller('MenuCreateController', ['$scope', 'consoleRESTSvc', 'SweetAlert', '$state', '$q', '$modal',
    function($scope, consoleRESTSvc, SweetAlert, $state, $q, $modal) {

        $scope.menu_types = ['Dine-In', 'Takeaway', 'Delivery', 'Weekend', 'Dinner', 'All'];
        consoleRESTSvc.getOutlets().then(function(res) {
            $scope.outlets = res.data;
        }, function(err) {
            $scope.outlets = [];
            console.log(err);
        });

        $scope.menu = {
            status: 'active',
            charge_service_tax: true,
            menu_categories: []
        };

        $scope.toggle = function(scope) {
            scope.toggle();
        };

        $scope.addCategory = function() {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/menu.category.tmpl.html',
                controller: 'MenuCategoryController',
                size: 'lg',
                resolve: {
                    category: function() {
                        return {
                            sub_categories: [{
                                sub_category_name: 'Default',
                                items: []
                            }]
                        };
                    },
                    is_new: function() {
                        return true;
                    }
                }
            });

            modalInstance.result.then(function(category) {
                $scope.menu.menu_categories.push(category);
            });
        };

        $scope.cloneCategory = function(index) {
            SweetAlert.swal({
                title: 'Clone category!',
                text: 'Are you sure you want to clone this category?',
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'Clone It!'
            }, function(confirm) {
                if (confirm) {
                    $scope.menu.menu_categories.push(_.cloneDeep($scope.menu.menu_categories[index]));
                }
            });
        };

        $scope.editCategory = function(index) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/menu.category.tmpl.html',
                controller: 'MenuCategoryController',
                size: 'lg',
                resolve: {
                    category: function() {
                        return _.cloneDeep($scope.menu.menu_categories[index]);
                    },
                    is_new: function() {
                        return true;
                    }
                }
            });

            modalInstance.result.then(function(category) {
                $scope.menu.menu_categories[index] = category;
            });
        };

        $scope.removeCategory = function(index) {
            SweetAlert.swal({
                title: 'Delete category!',
                text: 'Are you sure you want to delete?',
                type: 'warning',
                confirmButtonColor: "#DD6B55",
                showCancelButton: true,
                confirmButtonText: 'Delete It!'
            }, function(confirm) {
                if (confirm) {
                    $scope.menu.menu_categories.splice(index, 1);
                }
            });
        };

        $scope.addSubCategory = function(category) {
            if (category.sub_categories.length === 1 && category.sub_categories[0].sub_category_name === 'Default' && category.sub_categories[0].items.length) {
                SweetAlert.swal({
                    title: 'Are you sure?',
                    text: 'Existing items will be shifted to the new sub category',
                    type: 'warning',
                    confirmButtonColor: '#DD6B55',
                    showCancelButton: 'true',
                    confirmButtonText: 'Yes, Continue'
                }, function(confirm) {
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: '../common/templates/partials/menu.sub_category.tmpl.html',
                        controller: 'MenuSubCategoryController',
                        size: 'lg',
                        resolve: {
                            sub_category: function() {
                                return {
                                    items: []
                                };
                            },
                            is_new: function() {
                                return true;
                            }
                        }
                    });

                    modalInstance.result.then(function(sub_category) {
                        category.sub_categories[0] = _.merge(category.sub_categories[0], sub_category);
                    });
                });
            } else {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '../common/templates/partials/menu.sub_category.tmpl.html',
                    controller: 'MenuSubCategoryController',
                    size: 'lg',
                    resolve: {
                        sub_category: function() {
                            return {
                                items: []
                            };
                        },
                        is_new: function() {
                            return true;
                        }
                    }
                });

                modalInstance.result.then(function(sub_category) {
                    if (category.sub_categories[0].sub_category_name === 'Default') {
                        category.sub_categories[0] = _.merge(category.sub_categories[0], sub_category);
                    } else {
                        category.sub_categories.push(sub_category);
                    }
                });
            }
        };

        $scope.cloneSubCategory = function(category, index) {
            SweetAlert.swal({
                title: 'Clone sub category!',
                text: 'Are you sure you want to clone this sub category?',
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'Clone It!'
            }, function(confirm) {
                if (confirm) {
                    category.sub_categories.push(_.cloneDeep(category.sub_categories[index]));
                }
            });
        };

        $scope.editSubCategory = function(category, index) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/menu.sub_category.tmpl.html',
                controller: 'MenuSubCategoryController',
                size: 'lg',
                resolve: {
                    sub_category: function() {
                        return _.cloneDeep(category.sub_categories[index]);
                    },
                    is_new: function() {
                        return false
                    }
                }
            });

            modalInstance.result.then(function(sub_category) {
                category.sub_categories[index] = sub_category;
            });
        };

        $scope.removeSubCategory = function(category, index) {
            SweetAlert.swal({
                title: 'Delete sub category!',
                text: 'Are you sure you want to delete?',
                type: 'warning',
                confirmButtonColor: "#DD6B55",
                showCancelButton: true,
                confirmButtonText: 'Delete It!'
            }, function(confirm) {
                if (confirm) {
                    category.sub_categories.splice(index, 1);
                }
            });
        };

        $scope.addItem = function(sub_category) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/menu.item.tmpl.html',
                controller: 'MenuItemController',
                size: 'lg',
                resolve: {
                    item: function() {
                        return {
                            item_type: 'type_1',
                            is_available: true,
                            option_price_is_additive: false,
                            option_is_addon: false,
                            is_vegetarian: true,
                            is_recommended: false,
                            item_available_on: [],
                            item_availability: {
                                regular_item: true
                            },
                            options: []
                        }
                    },
                    is_new: function() {
                        return true
                    },
                    limit_access: function() {
                        return false;
                    }
                }
            });

            modalInstance.result.then(function(item) {
                sub_category.items.push(item);
            });
        };

        $scope.cloneItem = function(sub_category, index) {
            SweetAlert.swal({
                title: 'Clone item!',
                text: 'Are you sure you want to clone this item?',
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'Clone It!'
            }, function(confirm) {
                if (confirm) {
                    sub_category.items.push(_.cloneDeep(sub_category.items[index]));
                }
            });
        };

        $scope.editItem = function(sub_category, index) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/menu.item.tmpl.html',
                controller: 'MenuItemController',
                size: 'lg',
                resolve: {
                    item: function() {
                        return _.cloneDeep(sub_category.items[index]);
                    },
                    is_new: function() {
                        return false;
                    },
                    limit_access: function() {
                        return false;
                    }
                }
            });

            modalInstance.result.then(function(item) {
                sub_category.items[index] = item;
            });
        };

        $scope.removeItem = function(sub_category, index) {
            SweetAlert.swal({
                title: 'Delete item!',
                text: 'Are you sure you want to delete?',
                type: 'warning',
                confirmButtonColor: "#DD6B55",
                showCancelButton: true,
                confirmButtonText: 'Delete It!'
            }, function(confirm) {
                if (confirm) {
                    sub_category.items.splice(index, 1);
                }
            });
        };

        $scope.addOption = function(item) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/menu.option.tmpl.html',
                controller: 'MenuOptionController',
                size: 'lg',
                resolve: {
                    option: function() {
                        return {
                            is_available: true,
                            is_vegetarian: true,
                            sub_options: [],
                            addons: []
                        };
                    },
                    is_new: function() {
                        return true;
                    },
                    option_title: function() {
                        return item.option_title;
                    },
                    limit_access: function() {
                        return false;
                    }
                }
            });

            modalInstance.result.then(function(option) {
                item.options.push(option);
            });
        };

        $scope.cloneOption = function(item, index) {
            SweetAlert.swal({
                title: 'Clone option!',
                text: 'Are you sure you want to clone this option?',
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'Clone It!'
            }, function(confirm) {
                if (confirm) {
                    item.options.push(_.cloneDeep(item.options[index]));
                }
            });
        };

        $scope.editOption = function(item, index) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/menu.option.tmpl.html',
                controller: 'MenuOptionController',
                size: 'lg',
                resolve: {
                    option: function() {
                        return _.cloneDeep(item.options[index]);
                    },
                    is_new: function() {
                        return false
                    },
                    option_title: function() {
                        return item.option_title;
                    },
                    limit_access: function() {
                        return false;
                    }
                }
            });

            modalInstance.result.then(function(option) {
                item.options[index] = option;
            });
        };

        $scope.removeOption = function(item, index) {
            SweetAlert.swal({
                title: 'Delete option!',
                text: 'Are you sure you want to delete?',
                type: 'warning',
                confirmButtonColor: "#DD6B55",
                showCancelButton: true,
                confirmButtonText: 'Delete It!'
            }, function(confirm) {
                if (confirm) {
                    item.options.splice(index, 1);
                }
            });
        };

        $scope.addSubOption = function(option) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/menu.sub_option.tmpl.html',
                controller: 'MenuSubOptionController',
                size: 'lg',
                resolve: {
                    sub_option: function() {
                        return {
                            sub_option_set: []
                        };
                    },
                    is_new: function() {
                        return true;
                    },
                    limit_access: function() {
                        return false;
                    }
                }
            });

            modalInstance.result.then(function(sub_option) {
                option.sub_options.push(sub_option);
            });
        };

        $scope.cloneSubOption = function(option, index) {
            SweetAlert.swal({
                title: 'Clone sub option!',
                text: 'Are you sure you want to clone these sub options?',
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'Clone It!'
            }, function(confirm) {
                if (confirm) {
                    option.sub_options.push(_.cloneDeep(option.sub_options[index]));
                }
            });
        };

        $scope.editSubOption = function(option, index) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/menu.sub_option.tmpl.html',
                controller: 'MenuSubOptionController',
                size: 'lg',
                resolve: {
                    sub_option: function() {
                        return _.cloneDeep(option.sub_options[index]);
                    },
                    is_new: function() {
                        return false
                    },
                    limit_access: function() {
                        return false;
                    }
                }
            });

            modalInstance.result.then(function(addon) {
                option.sub_options[index] = addon;
            });
        };

        $scope.removeSubOption = function(option, index) {
            SweetAlert.swal({
                title: 'Delete sub option set!',
                text: 'Are you sure you want to delete?',
                type: 'warning',
                confirmButtonColor: "#DD6B55",
                showCancelButton: true,
                confirmButtonText: 'Delete It!'
            }, function(confirm) {
                if (confirm) {
                    option.sub_options.splice(index, 1);
                }
            });
        };

        $scope.addAddon = function(option) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/menu.addon.tmpl.html',
                controller: 'MenuAddonController',
                size: 'lg',
                resolve: {
                    addon: function() {
                        return {
                            addon_set: []
                        };
                    },
                    is_new: function() {
                        return true
                    },
                    limit_access: function() {
                        return false;
                    }
                }
            });

            modalInstance.result.then(function(addon) {
                option.addons.push(addon);
            });
        };

        $scope.cloneAddon = function(option, index) {
            SweetAlert.swal({
                title: 'Clone addon!',
                text: 'Are you sure you want to clone these addons?',
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'Clone It!'
            }, function(confirm) {
                if (confirm) {
                    option.addons.push(_.cloneDeep(option.addons[index]));
                }
            });
        };

        $scope.editAddon = function(option, index) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '../common/templates/partials/menu.addon.tmpl.html',
                controller: 'MenuAddonController',
                size: 'lg',
                resolve: {
                    addon: function() {
                        return _.cloneDeep(option.addons[index]);
                    },
                    is_new: function() {
                        return false
                    },
                    limit_access: function() {
                        return false;
                    }
                }
            });

            modalInstance.result.then(function(addon) {
                option.addons[index] = addon;
            });
        };

        $scope.removeAddon = function(option, index) {
            SweetAlert.swal({
                title: 'Delete addon set!',
                text: 'Are you sure you want to delete?',
                type: 'warning',
                confirmButtonColor: "#DD6B55",
                showCancelButton: true,
                confirmButtonText: 'Delete It!'
            }, function(confirm) {
                if (confirm) {
                    option.addons.splice(index, 1);
                }
            });
        };

        $scope.createMenu = function() {
            $scope.reviewMenu().then(function() {
                consoleRESTSvc.createMenu($scope.menu).then(function(res) {
                    SweetAlert.swal({
                        title: 'Menu created successfully',
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Continue'
                    }, function() {
                        $state.go('^.menus_manage', {}, {
                            reload: true
                        });
                    });
                }, function(err) {
                    console.log(err);
                    if (err.message) {
                        SweetAlert.swal('Validation Error', err.message, 'error');
                    } else {
                        SweetAlert.swal('Service Error', 'Unable to create the menu right now', 'error');
                    }
                });
            }, function(err) {
                SweetAlert.swal('Validation error', err, 'error');
            });
        };

        $scope.reviewMenu = function() {
            var deferred = $q.defer();
            if (!$scope.menu.menu_type) {
                deferred.reject('Menu type required');
            } else if (!$scope.menu.menu_item_type) {
                deferred.reject('Please select menu items type');
            } else if (!$scope.menu.outlet) {
                deferred.reject('Please choose an outlet');
            } else if (!$scope.menu.menu_categories.length) {
                deferred.reject('Atleast one category must be added');
            } else {
                async.each($scope.menu.menu_categories, function(category, callback) {
                    if (!category.sub_categories.length) {
                        callback('Atleast one sub category must be added to all categories');
                    } else {
                        async.each(category.sub_categories, function(sub_category, callback) {
                            if (!sub_category.items.length) {
                                callback('Aleast one item must be present in all sub categories');
                            } else {
                                callback();
                            }
                        }, function(err) {
                            callback(err);
                        });
                    }
                }, function(err) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve();
                    }
                });
            }
            return deferred.promise;
        };
    }
])
