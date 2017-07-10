routerApp.controller('ForgotPasswordController', [ '$scope', '$location', '$rootScope',
		'$http', function($scope, $location, $rootScope, $http) {

			$scope.urlBase = 'http://localhost:8080';
			$scope.forgotPassword = function(uname) {
				console.log(uname);
				$http.get($scope.urlBase + '/register/getUserByEmail?email='+uname).then(function(response)
						{
					console.log("getting into fp method");
					console.log(response.data);
					$scope.isExists=response.data;
					console.log($scope.isExists);
					if($scope.isExists.present){
						$location.path('newPassword');
						}
					else{
						$scope.errorMessage = 'Invalid username.';
					}
			});}
			
			
		$scope.validatePassword = function(uname) {
				console.log('validated password');
				console.log(uname);
				$scope.pwd=uname;
				
				  if ($scope.pwd.newPassword != $scope.pwd.oldPassword) {
					    $scope.IsMatch=true;
					    console.log("true");
					    return false;
					  }
					  $scope.IsMatch=false;
					  console.log("false");
					  $location.path('login');
					}			

		} ]);

