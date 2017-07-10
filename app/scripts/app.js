//var routerApp = angular.module('routerApp', ['ngRoute']);
var routerApp = angular.module('routerApp', [ 'ui.router', 'ui.bootstrap' ]);

routerApp.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('login', {
		url : '/',
		templateUrl : 'app/views/login.html',
		controller : 'LoginController'
	}).state('reg', {
		url : '/reg',
		templateUrl : 'app/views/reg.html',
		controller : 'RegistrationController'
	}).state('dashboard', {
		url : '/dashboard',
		templateUrl : 'app/views/dashboard.html',
		controller : 'DashboardController'
	}).state('forgotPassword', {
		url : '/forgotPassword',
		templateUrl : 'app/views/forgot-password.html',
		controller : 'ForgotPasswordController'
	}).state('validate', {
		url : '/validate',
		templateUrl : 'app/views/fPassword.html',
		controller : 'ForgotPasswordController'
	}).state('newPassword', {
		url : '/newPassword',
		templateUrl : 'app/views/newPassword.html',
		controller : 'ForgotPasswordController'
	}).state('request', {
		url : '/request',
		templateUrl : 'app/views/viewFriendRequest.html',
		controller : 'FriendRequestController'
	}).state('friends', {
		url : '/friends',
		templateUrl : 'app/views/friends.html',
		controller : 'FriendController'
	}).state('profile', {
		url : '/profile',
		templateUrl : 'app/views/profile.html',
		controller : 'ProfileController'
	}).state('chats', {
		url : '/chats',
		templateUrl : 'app/views/chat.html',
		controller : 'chatController'
	})

}).run(
		[
			'$rootScope',
			'$location',
			'$http',
			'$window',
			function($rootScope, $location, $http,$window) {
				console.log('hi amala');
				$rootScope
						.$on(
								'$stateChangeStart',
								function(event, next) {
									console.log('hi df');
									var userAuthenticated = localStorage
											.getItem('loggedIn');
									console.log(userAuthenticated);
									if (!userAuthenticated) {
											
									$rootScope.savedLocation = $location
												.path();
									console.log($rootScope.savedLocation);
										$location.path('/');

									} else {
										$rootScope.savedLocation = $location
												.path();
										
								        if ($rootScope.savedLocation == '/') {
											$location.path('/dashboard');

										 }
									}
								});

			} ]);

/*routerApp
 .config([ '$routeProvider', function($routeProvider) {
 $routeProvider.when('/', {
 templateUrl : 'app/views/login.html',
 controller : 'LoginController'
 }).when("/register", {
 templateUrl : "app/views/register.html",
 controller : "RegistrationController"
 }).when("/dashboard", {
 templateUrl : "app/views/dashboard.html",
 controller : "DashboardController"
 }).when("/forgotPassword", {
 templateUrl: 'app/views/forgotPassword.html',
 controller:'ForgotPasswordController'
 }).otherwise({
 redirectTo : '/'
 });

 }]);*/