angular.module('homeApp', ['oitozero.ngSweetAlert', 'ui.bootstrap']).controller('MainController', ['$scope', '$http', 'SweetAlert', function($scope, $http, SweetAlert) {
	
	$scope.contact_us = function() {
		if ($scope.disable_contact) {
			return;
		} else if (!$scope.contact) {
			SweetAlert.swal('Validation error', 'Please fill-in the form first', 'warning');
		} else if (!$scope.contact.name) {
			SweetAlert.swal('Validation error', 'Name required', 'warning');
		} else if (!$scope.contact.email || !/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test($scope.contact.email)) {
			SweetAlert.swal('Validation error', 'Valid email ID required', 'warning');
		} else if (!$scope.contact.comments || $scope.contact.comments.length < 50) {
			SweetAlert.swal('Validation error', 'Please provide your message (minimum 50 characters long).', 'warning');
		} else {
			$scope.disable_contact = true;
			$http.post('/api/v4/contact_us', $scope.contact)
				.then(function(res) {
					console.log(res);
					$scope.contact = {};
					if (res.data.response) {
						$scope.disable_contact = false;
						SweetAlert.swal("SUCCESS", "You message has been submitted. We will get back to you shortly", "success");
					} else {
						$scope.disable_contact = false;
						SweetAlert.swal('Internal error', 'Something went wrong. Please try after sometime', 'error');
					}
				}, function(err) {
					console.log(err);
					$scope.disable_contact = false;
					SweetAlert.swal('Internal error', 'Something went wrong. Please try after sometime', 'error');
				});
		}
	};
}])