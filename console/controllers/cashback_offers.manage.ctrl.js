angular.module('consoleApp').controller('CashbackOffersManageController', ['$scope', 'consoleRESTSvc', '$filter',
	function($scope, consoleRESTSvc, $filter) {

		$scope.searchKeywords = '';

		$scope.cashback_offers = [];

		$scope.filtered_cashback_offers = [];

		$scope.row = '';

		$scope.numPerPageOpt = [5, 10, 20, 40];

		$scope.numPerPage = $scope.numPerPageOpt[1];

		$scope.currentPage = 1;

		$scope.current_page_cashback_offers = [];

		consoleRESTSvc.getCashbackOffers().then(function(res) {
			console.log(res);
			$scope.cashback_offers = res.data;
			$scope.search();
			$scope.select($scope.currentPage);
		}, function(err) {
			console.log(err);
		});

		$scope.select = function(page) {
			var start, end;
			start = (page - 1) * $scope.numPerPage;
			end = start + $scope.numPerPage;
			return $scope.current_page_cashback_offers = $scope.filtered_cashback_offers.slice(start, end);
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
			$scope.filtered_cashback_offers = $filter('filter')($scope.cashback_offers, $scope.searchKeywords);
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
			$scope.filtered_cashback_offers = $filter('orderBy')($scope.cashback_offers, rowName);
            if ($scope.view_status) {
                $scope.sort($scope.view_status);
            }
            return $scope.onOrderChange();
		};
	}
]);