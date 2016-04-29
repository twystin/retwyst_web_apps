angular.module('consoleApp').controller('CashbackCouponManageController', ['$scope', 'consoleRESTSvc', '$filter', 'SweetAlert',
	function($scope, consoleRESTSvc, $filter, SweetAlert) {

		$scope.searchKeywords = '';

		$scope.coupon_offers = [];

		$scope.filtered_coupon_offers = [];

		$scope.row = '';

		$scope.numPerPageOpt = [5, 10, 20, 40];

		$scope.numPerPage = $scope.numPerPageOpt[1];

		$scope.currentPage = 1;

		$scope.current_page_coupon_offers = [];

		$scope.getCoupons = function() {
			consoleRESTSvc.getCoupons().then(function(res) {
				console.log(res);
				$scope.coupon_offers = res.data;
				$scope.search();
				$scope.select($scope.currentPage);
			}, function(err) {
				console.log(err);
			});
		};

		$scope.select = function(page) {
			var start, end;
			start = (page - 1) * $scope.numPerPage;
			end = start + $scope.numPerPage;
			return $scope.current_page_coupon_offers = $scope.filtered_coupon_offers.slice(start, end);
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
			$scope.filtered_coupon_offers = $filter('filter')($scope.coupon_offers, $scope.searchKeywords);
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
			$scope.filtered_coupon_offers = $filter('orderBy')($scope.coupon_offers, rowName);
            if ($scope.view_status) {
                $scope.sort($scope.view_status);
            }
            return $scope.onOrderChange();
		};

		$scope.removeCoupon = function(coupon_obj) {
				SweetAlert.swal({
						title: 'Are you sure?',
						text: 'You will not be able to recover this coupon',
						type: 'warning',
						showCancelButton: true,
						confirmButtonColor: "#DD6B55",
						confirmButtonText: 'Yes, Delete It!',
						closeOnConfirm: false
				}, function(confirm) {
						if (confirm) {
								consoleRESTSvc.deleteCouponOffer(coupon_obj).then(function(data) {
										SweetAlert.swal("SUCCESS", "Coupon deleted successfully", "success");
										$scope.getCoupons();
								}, function(err) {
										SweetAlert.swal({
												title: 'ERROR',
												text: 'Unable to delete this coupon right now',
												type: 'error',
												showCancelButton: false,
												confirmButtonColor: "#DD6B55",
												confirmButtonText: 'Continue',
												closeOnConfirm: true
										});
								});
						}
				});
		};
		$scope.getCoupons();
	}
]);
