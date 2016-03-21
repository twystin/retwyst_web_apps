angular.module('consoleApp').controller('OfferManageController', ['$scope', 'consoleRESTSvc', '$filter', 'SweetAlert',
    function($scope, consoleRESTSvc, $filter, SweetAlert) {

        $scope.searchKeywords = '';

        $scope.offers = [];

        $scope.filtered_offers = [];

        $scope.row = '';

        $scope.numPerPageOpt = [5, 10, 20, 40];

        $scope.numPerPage = $scope.numPerPageOpt[1];

        $scope.currentPage = 1;

        $scope.current_page_offers = [];

        consoleRESTSvc.getOffers().then(function(res) {
            console.log(res);
            $scope.offers = res.data;
            $scope.search();
            $scope.select($scope.currentPage);
        }, function(err) {
            console.log(err);
        });

        $scope.select = function(page) {
            var end, start;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.current_page_offers = $scope.filtered_offers.slice(start, end);
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
            $scope.filtered_offers = $filter('filter')($scope.offers, $scope.searchKeywords);
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
            $scope.filtered_offers = $filter('orderBy')($scope.offers, rowName);
            if ($scope.view_status) {
                $scope.sort($scope.view_status);
            }
            return $scope.onOrderChange();
        };

        $scope.sort = function(sort_by) {
            console.log('view_status', sort_by);
            if ($scope.row) {
                $scope.filtered_offers = $filter('orderBy')($scope.offers, $scope.row);
            } else {
                $scope.filtered_offers = $scope.offers;
            }
            $scope.filtered_offers = _.filter($scope.filtered_offers, function(offer) {
                return offer.offer_status.indexOf(sort_by) !== -1;
            });
            $scope.onFilterChange();
        };

        $scope.updateOfferStatus = function(offer) {
            consoleRESTSvc.updateOfferStatus(offer).then(function(res) {
                console.log(res);
                SweetAlert.swal("SUCCESS", "Offer status updated", 'success');
            }, function(err) {
                console.log(err);
                if (err.message) {
                    SweetAlert.swal('ERROR', err.message, 'error');
                } else {
                    SweetAlert.swal('ERROR', 'Unable to update the offer status right now', 'error');
                }
            });
        };
    }
])
