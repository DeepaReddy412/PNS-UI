routerApp.controller('ProfileController', [ '$scope', '$location','$rootScope', '$http','$timeout',
		function($scope, $location, $rootScope, $http,$timeout) {

			$scope.urlBase = 'http://localhost:8080';
			
            $scope.currentUser= localStorage.getItem('user');
            $scope.currentUserId= localStorage.getItem('loggedInUserId');
			console.log('Profile called');
			
			$http.get($scope.urlBase+"/login/getProfile?email="+ $scope.currentUser).then(function(response){
				$scope.user=response.data;
				console.log($scope.user);
				$location.path('/profile');
			})
			
			
			$scope.update = function(user) {
				console.log(user);
				$scope.user=user;
				console.log($scope.user);
				
				$http.put($scope.urlBase + '/login/update/user',$scope.user).then(function(response){
				
				   $http.get($scope.urlBase+"/login/getProfile?email="+ $scope.currentUser).then(function(response){
						$scope.user=response.data;
						console.log($scope.user);
						$scope.successMessage = true;
							$timeout(
									function() {
										$scope.successMessage = false;
									}, 3000);
						
					   })
								
				})
				
			
			}
			
		} ]);