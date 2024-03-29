angular.module('consoleApp').controller('WriteToTwystManageController', ['$scope', 'consoleRESTSvc', '$filter',
    function($scope, consoleRESTSvc, $filter) {

        $scope.searchKeywords = '';

        $scope.write_to_twyst = [];

        $scope.filtered_write_to_twyst = [];

        $scope.row = '';

        $scope.numPerPageOpt = [5, 10, 20, 40];

        $scope.numPerPage = $scope.numPerPageOpt[1];

        $scope.currentPage = 1;

        $scope.current_page_write_to_twyst = [];

        consoleRESTSvc.getAllEvents('write_to_twyst').then(function(res) {
            console.log(res);
            $scope.write_to_twyst = res.data;
            $scope.search();
            $scope.select($scope.currentPage);
        }, function(err) {
            console.log(err);
        });

        $scope.select = function(page) {
            var end, start;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.current_page_write_to_twyst = $scope.filtered_write_to_twyst.slice(start, end);
        };

        $scope.onFilterChange = function() {
            $scope.select(1);
            $scope.currentPage = 1;
            return $scope.row = '';
        };

        $scope.onNumPerPageChange = function() {
            $scope.select(1);
            $scope.currentPage = 1;
        };

        $scope.onOrderChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
        };

        $scope.search = function() {
            $scope.filtered_write_to_twyst = $filter('filter')($scope.write_to_twyst, $scope.searchKeywords);
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
            $scope.filtered_write_to_twyst = $filter('orderBy')($scope.write_to_twyst, rowName);
            if ($scope.view_status) {
                $scope.sort($scope.view_status);
            }
            return $scope.onOrderChange();
        };

        $scope.sort = function(sort_by) {
            console.log('view_status', sort_by);
            if ($scope.row) {
                $scope.filtered_write_to_twyst = $filter('orderBy')($scope.write_to_twyst, $scope.row);
            } else {
                $scope.filtered_write_to_twyst = $scope.write_to_twyst;
            }
            $scope.filtered_write_to_twyst = _.filter($scope.filtered_write_to_twyst, function(write) {
                return write.event_meta.status.indexOf(sort_by) !== -1;
            });
            $scope.onFilterChange();
        };
    }
])
