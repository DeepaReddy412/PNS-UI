routerApp.controller('LoginController', [ '$scope', '$location', '$rootScope','$window',
		'$http', function($scope, $location, $rootScope,$window,$http) {

			$scope.urlBase = 'http://localhost:8080';
			$scope.login = function(loginUser) {
				$scope.user=loginUser;
				$scope.showIcon = false;
				console.log('Login User!');
				console.log($scope.user);
				console.log($scope.user.password);
				$http.get($scope.urlBase+"/login/getUser?email="+$scope.user.userName+"&password="+$scope.user.password).then(function(response){
					$scope.userObj=response.data;
					console.log($scope.userObj);
					if($scope.userObj.length===0)
						{
						console.log($scope.userObj);
						$location.path('login');
						$scope.errorMessage = 'Invalid username and password.';
						$scope.showLogout=false;
						}
					else
						{
						console.log('login controller called');
						console.log($scope.userObj.id);
						localStorage.setItem('loggedIn',true);
						localStorage.setItem('user',$scope.user.userName);
						localStorage.setItem('userName',$scope.userObj.name);
						localStorage.setItem('loggedInUserId',$scope.userObj.id);
						localStorage.setItem('showSearch',true);
						$window.location.reload();
						$location.path('/dashboard');
						$scope.showLogout=true;
						}
				})
			}

		} ]);