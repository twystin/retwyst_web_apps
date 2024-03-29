angular.module('consoleApp').controller('SuggestedOfferManageController', ['$scope', 'consoleRESTSvc', '$filter',
    function($scope, consoleRESTSvc, $filter) {

        $scope.searchKeywords = '';

        $scope.suggested_offers = [];

        $scope.filtered_suggested_offers = [];

        $scope.row = '';

        $scope.numPerPageOpt = [5, 10, 20, 40];

        $scope.numPerPage = $scope.numPerPageOpt[1];

        $scope.currentPage = 1;

        $scope.current_page_suggested_offers = [];

        consoleRESTSvc.getAllEvents('submit_offer').then(function(res) {
            console.log(res);
            $scope.suggested_offers = res.data;
            $scope.search();
            $scope.select($scope.currentPage);
        }, function(err) {
            console.log(err);
        });

        $scope.select = function(page) {
            var end, start;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.current_page_suggested_offers = $scope.filtered_suggested_offers.slice(start, end);
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
            $scope.filtered_suggested_offers = $filter('filter')($scope.suggested_offers, $scope.searchKeywords);
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
            $scope.filtered_suggested_offers = $filter('orderBy')($scope.suggested_offers, rowName);
            if ($scope.view_status) {
                $scope.sort($scope.view_status);
            }
            return $scope.onOrderChange();
        };

        $scope.sort = function(sort_by) {
            console.log('view_status', sort_by);
            if ($scope.row) {
                $scope.filtered_suggested_offers = $filter('orderBy')($scope.suggested_offers, $scope.row);
            } else {
                $scope.filtered_suggested_offers = $scope.suggested_offers;
            }
            $scope.filtered_suggested_offers = _.filter($scope.filtered_suggested_offers, function(suggested_offer) {
                return suggested_offer.event_meta.status.indexOf(sort_by) !== -1;
            });
            $scope.onFilterChange();
        };
    }
])
