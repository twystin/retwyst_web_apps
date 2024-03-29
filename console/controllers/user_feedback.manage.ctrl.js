angular.module('consoleApp').controller('UserFeedbackManageController', ['$scope', 'consoleRESTSvc', '$filter',
    function($scope, consoleRESTSvc, $filter) {

        $scope.searchKeywords = '';

        $scope.user_feedbacks = [];

        $scope.filtered_user_feedbacks = [];

        $scope.row = '';

        $scope.numPerPageOpt = [5, 10, 20, 40];

        $scope.numPerPage = $scope.numPerPageOpt[1];

        $scope.currentPage = 1;

        $scope.current_page_user_feedbacks = [];

        consoleRESTSvc.getAllEvents('feedback').then(function(res) {
            console.log(res);
            $scope.user_feedbacks = res.data;
            $scope.search();
            $scope.select($scope.currentPage);
        }, function(err) {
            console.log(err);
        });

        $scope.select = function(page) {
            var end, start;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.current_page_user_feedbacks = $scope.filtered_user_feedbacks.slice(start, end);
        };

        $scope.onFilterChange = function() {
            $scope.select(1);
            $scope.currentPage = 1;
            return $scope.row = '';
        };

        $scope.onNumPerPageChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
        };

        $scope.onOrderChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
        };

        $scope.search = function() {
            $scope.filtered_user_feedbacks = $filter('filter')($scope.user_feedbacks, $scope.searchKeywords);
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
            $scope.filtered_user_feedbacks = $filter('orderBy')($scope.user_feedbacks, rowName);
            if ($scope.view_status) {
                $scope.sort($scope.view_status);
            }
            return $scope.onOrderChange();
        };

        $scope.sort = function(sort_by) {
            console.log('view_status', sort_by);
            if ($scope.row) {
                $scope.filtered_user_feedbacks = $filter('orderBy')($scope.user_feedbacks, $scope.row);
            } else {
                $scope.filtered_user_feedbacks = $scope.user_feedbacks;
            }
            $scope.filtered_user_feedbacks = _.filter($scope.filtered_user_feedbacks, function(user_feedback) {
                return user_feedback.event_meta.status.indexOf(sort_by) !== -1;
            });
            $scope.onFilterChange();
        };
    }
])
