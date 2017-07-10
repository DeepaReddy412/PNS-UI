routerApp.controller('RegistrationController', [ '$scope', '$location',
		'$rootScope', '$http', function($scope, $location, $rootScope, $http) {
	
			$scope.urlBase = 'http://localhost:8080';
			
			$scope.register = function(user) {
				console.log(user);
				$scope.user=user;
				console.log($scope.user);
				$http.get($scope.urlBase + '/register/getUserByEmail?email='+$scope.user.email).then(function(response)
						{
					console.log("getting into register method");
					console.log(response.data);
					$scope.isExists=response.data;
					if($scope.isExists.present)	{
						$scope.errorMessage = 'User Already Registered.Please Login With Valid Credentials.';
						}
					else{
						$http.put($scope.urlBase + '/register/save',$scope.user).then(function(response){
							console.log(response.data);
							$scope.user=response.data;
							if($scope.user.length===0)
								{
								$scope.errorMessage = 'Invalid username and password.';
								$location.path('register');
								}
							else
								{
								$rootScope.successMessage= 'Successfully registered.';
								$location.path('login');
								}
						})
						
					 }
				})
												
				
			}

		} ]);