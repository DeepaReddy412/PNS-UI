routerApp.controller('FriendRequestController', [ '$scope', '$location',
		'$rootScope', '$http', '$timeout','$window',
		function($scope, $location, $rootScope, $http, $timeout,$window) {

			$scope.urlBase = 'http://localhost:8080';
            $scope.currentUser= localStorage.getItem('user');
			
			$scope.getRequests = function() {
				console.log('FriendRequestController called');
								
				$http
				.get(
						$scope.urlBase
								+ '/requests/getallusers?email='
								+ $scope.currentUser)
				.then(
						function(response) {
							console.log('hi called');
							$scope.userList = response.data;
							$rootScope.notifications=$scope.userList.length;
							console.log($scope.userList);
							
							if ($scope.userList.length === 0) {					
							    $scope.infoMessage = true;
								$timeout(
										function() {
											$scope.infoMessage = false;
										}, 3000);
							} else {
								$scope.userList = response.data;
							}
							
						});
			}
			$scope.getRequests();
			
			$scope.accept=function(user)
			{
				console.log(user);
				$http
				.post(
						$scope.urlBase
								+ '/requests/acceptReq?from='
								+$scope.currentUser+"&to="+user.id)
				.then(
						function(response) {
							console.log('hi called');
							$scope.userList = response.data;
							console.log($scope.userList);
							if ($scope.userList.length === 0) {					
							    $scope.infoMessage = true;
							    console.log("pokl");
							    $window.location.reload();
								$timeout(
										function() {
											$scope.infoMessage = false;
										}, 3000);
							} else {
								$scope.userList = response.data;
								
								//$location.path('/request');
							}
							
							
						});
			}

		} ]);