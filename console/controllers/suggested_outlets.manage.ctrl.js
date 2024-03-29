angular.module('consoleApp').controller('SuggestedOutletManageController', ['$scope', 'consoleRESTSvc', '$filter',
    function($scope, consoleRESTSvc, $filter) {

        $scope.searchKeywords = '';

        $scope.suggested_outlets = [];

        $scope.filtered_suggested_outlets = [];

        $scope.row = '';

        $scope.numPerPageOpt = [5, 10, 20, 40];

        $scope.numPerPage = $scope.numPerPageOpt[1];

        $scope.currentPage = 1;

        $scope.current_page_suggested_outlets = [];

        consoleRESTSvc.getAllEvents('suggestion').then(function(res) {
            console.log(res);
            $scope.suggested_outlets = res.data;
            $scope.search();
            $scope.select($scope.currentPage);
        }, function(err) {
            console.log(err);
        });

        $scope.select = function(page) {
            var end, start;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.current_page_suggested_outlets = $scope.filtered_suggested_outlets.slice(start, end);
        };

        $scope.onFilterChange = function() {
            $scope.select(1);
            $scope.currentPage = 1;
            return $scope.row = '';
        };

        $scope.onNumPerPageChange = function() {
            $scope.select(1);
            return $scoep.currentPage = 1;
        };

        $scope.onOrderChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
        };

        $scope.search = function() {
            $scope.filtered_suggested_outlets = $filter('filter')($scope.suggested_outlets, $scope.searchKeywords);
            if ($scope.view_status) {
                $scope.sort($scope.view_status);
            }
            return $scope.onFilterChange();
        };

        $scope.order = function(rowName) {
            if ($scope.row === rowName) {
                return;
            }

            $scope.row = rowName;
            $scope.filtered_suggested_outlets = $filter('orderBy')($scope.suggested_outlets, rowName);
            if ($scope.view_status) {
                $scope.sort($scope.view_status);
            }
            return $scope.onOrderChange();
        };

        $scope.sort = function(sort_by) {
            console.log('view_status', sort_by);
            if ($scope.row) {
                $scope.filtered_suggested_outlets = $filter('orderBy')($scope.suggested_outlets, $scope.row);
            } else {
                $scope.filtered_suggested_outlets = $scope.suggested_outlets;
            }
            $scope.filtered_suggested_outlets = _.filter($scope.filtered_suggested_outlets, function(suggested_outlet) {
                return suggested_outlet.event_meta.status.indexOf(sort_by) !== -1;
            });
            $scope.onFilterChange();
        };
    }
])
