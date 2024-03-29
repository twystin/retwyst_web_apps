var twystApp = angular.module('twystApp',['ui.router', 'oitozero.ngSweetAlert', 'ui.bootstrap']);
twystApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);
  $urlRouterProvider.when('','/home');
  $urlRouterProvider.when('/','/home');
  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state('home',{
      url: '/home',
      templateUrl: 'home/templates/home.html',
      controller: 'MainController'
    })
    .state('optout',{
      url: '/optout/:channel/:_id/:name',
      templateUrl: 'home/templates/optout_sms.html'
    })
    .state('email_verification',{
      url:'/home/:is_verified/:user/:email',
      templateUrl: 'home/templates/home.html',
      controller: 'MainController'
    })
    .state('dunno',{
      url: '/404',
      templateUrl: 'home/templates/404.html'
    });

});

twystApp.controller('MainController', ['$rootScope','$scope', '$http', '$location', 'SweetAlert', function($rootScope, $scope, $http, $location, SweetAlert) {

  $rootScope.login_notification = null;
	$scope.optout = {};
	$scope.optout.block_all = false;
	$rootScope.verifiedObject = $location.path();
  $rootScope.verifiedObject = $rootScope.verifiedObject.split('/').splice(2,$rootScope.verifiedObject.split('/').length);
  $rootScope.verifiedObject.is_verified  = $rootScope.verifiedObject[0];
  $rootScope.verifiedObject.user         = $rootScope.verifiedObject[1];
  $rootScope.verifiedObject.email        = $rootScope.verifiedObject[2];
	if(typeof $rootScope.verifiedObject !== "undefined") {
		if($rootScope.verifiedObject.is_verified === "true"){
			$rootScope.login_notification = "Congratulations "+ $rootScope.verifiedObject.user +"! your email: "+ $rootScope.verifiedObject.email + " is now verified.";
      $(".notifications").delay(1000).fadeIn(500,"linear", function(){window.location='/'});
		} else if ($rootScope.verifiedObject.verified === "false") {
			$rootScope.login_notification = "Sorry! Seems like that was an invalid link.";
		}
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
