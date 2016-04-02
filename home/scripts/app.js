<<<<<<< HEAD
twystApp.controller('MainController', ['$scope', '$http', '$location', 'SweetAlert', function($scope, $http, $location, SweetAlert) {
=======
angular.module('homeApp', ['oitozero.ngSweetAlert', 'ui.bootstrap']).controller('MainController', ['$scope', '$http', '$location', 'SweetAlert', '$window', function($scope, $http, $location, SweetAlert, $window) {
>>>>>>> e2ab580b156d7e6899aad434557e7bfd84f2d77d

	$scope.login_notification = {};
	$scope.optout = {};
	$scope.optout.block_all = false;
<<<<<<< HEAD
	var verifiedObject = $location.path();
	console.log($scope.login_notification);
	console.log(user);
	if(verifiedObject.is_verified) {
		if(verifiedObject.is_verified === "true"){
			$scope.login_notification = "Congratulations "+ verifiedObject.user +" , your email: "+ verifiedObject.email + " is now verified.";
=======

	if($location.path() === "/home/optout_sms.html") {
		$scope.outlet_image = $location.search()._id;
		$scope.outlet_name = $location.search().name;
	}
	
	$scope.smsOptout = function(optout) {
		var data = {};
		data.block_all	= optout.block_all;
		data.phone = optout.phone;
		var channel	= $location.search().channel;
		data.outlet_id = $location.search()._id;		
		var error = false;

		if (!optout || !optout.phone) {
			error = true;
			SweetAlert.swal('Error', 'Please enter your phone number first', 'warning');
		} else if (!/^[0-9]{10}$/.test(optout.phone)) {
			error = true;
			SweetAlert.swal('Error', 'Please enter a valid phone number', 'warning');
		}

		if(!error) {
			$http.post('/optout/'+channel, data)
			.then(function(data) {
				if (data.data.response) {
					console.log(data);
					SweetAlert.swal("SUCCESS", data.data.message, "success");
					$window.location.href = 'http://twy.st/app';
				} 
				else {
					console.log(data);
					SweetAlert.swal("Error", data.data.message, "warning");
				}
			}, function(err) {
				console.log(err);
				SweetAlert.swal("Error", data.data.message, "warning");
			});	
		}	
	};

	var verifiedObject = $location.search();
	if(verifiedObject.verified) {
		if(verifiedObject.verified === "true"){
			$scope.login_notification.verified = "true";
			$scope.login_notification.name = verifiedObject.user;
			$scope.login_notification.email = verifiedObject.email;
>>>>>>> e2ab580b156d7e6899aad434557e7bfd84f2d77d
		} else if (verifiedObject.verified === "false") {
			$scope.login_notification = "Sorry! Seems like that was an invalid link.";
		}
		console.log($scope.login_notification);
	}

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

	$scope.get_link_on_phone = function() {
		console.log($scope.req.phone);
		if ($scope.sending_phone) {
			return;
		} else if (!$scope.req || !$scope.req.phone) {
			SweetAlert.swal('Validation error', 'Please enter your phone number first', 'warning');
		} else if (!/^[0-9]{10}$/.test($scope.req.phone)) {
			SweetAlert.swal('Validation error', 'Please enter a valid phone number', 'warning');
		} else {
			$scope.sending_phone = true;
			$http.post('/api/v4/get_link', {
				mobile: $scope.req.phone
			}).then(function(res) {
				console.log(res);
				$scope.sending_phone = false;
				if(res.data.response) {
					$scope.req = {};
					SweetAlert.swal("SUCCESS", "A link has been sent to your phone, and should be arriving shortly.", "success")
				} else {
					SweetAlert.Swal("ERROR", res.data.message?res.data.message: 'Sonething went wrong. Please try after sometime', 'error');
				}
			}, function(err) {
				console.log(err);
				$scope.sending_phone = false;
				SweetAlert.swal('ERROR', 'Error establishing connection. Please check your internet', 'error');
			});
		}
	};

	$scope.get_link_on_email = function() {
		if ($scope.sending_email) {
			return;
		} else if (!$scope.req || !$scope.req.email) {
			SweetAlert.swal('Validation error', 'Please enter your email ID first', 'warning');
		} else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test($scope.req.email)) {
			SweetAlert.swal('Validation error', 'Please enter a valid email ID.', 'warning');
		} else {
			$scope.sending_email = true;
			$http.post('/api/v4/get_link', {
				email: $scope.req.email
			}).then(function(res) {
				console.log(res);
				$scope.sending_email = false;
				if(res.data.response) {
					$scope.req = {};
					SweetAlert.swal("SUCCESS", "A link has been sent to your mail, and should be arriving shortly.", "success")
				} else {
					SweetAlert.Swal("ERROR", res.data.message?res.data.message: 'Sonething went wrong. Please try after sometime', 'error');
				}
			}, function(err) {
				console.log(err);
				$scope.sending_email = false;
				SweetAlert.swal('ERROR', 'Error establishing connection. Please check your internet', 'error');
			});
		}
	}
}]);
