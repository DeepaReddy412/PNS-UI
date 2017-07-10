routerApp.controller('FriendController', [ '$scope', '$location',
		'$rootScope', '$http', '$timeout','$uibModal','$window','$interval',
		function($scope, $location, $rootScope, $http, $timeout,$uibModal,$window,$interval) {

			$scope.urlBase = 'http://localhost:8080';
            $scope.currentUser= localStorage.getItem('user');
            $scope.showProfileInfo=false;
            $scope.showChatWindow=false;
			$scope.getFriends = function() {
				console.log('FriendController called');
								
			$http
			.get(
						$scope.urlBase
								+ '/friends?email='
								+ $scope.currentUser)
				.then(
						function(response) {
							console.log('hi called');
							$scope.userList = response.data;
							
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
			$scope.getFriends();

			$scope.viewProfile=function(email)
			{
				$scope.showProfileInfo=true;
				$scope.email=email;
				console.log(email);
				console.log($scope.userList);
				var obj=_.where($scope.userList, {email:$scope.email });
				console.log(obj);
				$scope.user=obj;
				console.log($scope.user);
			}
						
			
			 $scope.block = function (user) {
				    user.showblock=true;
			        var modalInstance = $uibModal.open({
			            templateUrl: 'app/views/popup.html',
			            controller: 'PopupController',
			            size: 'sm',
			            resolve: {
			                item: function () {
			                    return user;
			                }
			            }
			        });

			        modalInstance.result.then(function (selectedItem) {
			        	 if (selectedItem) {
				            	$window.location.reload();
				             }
			       	
			        });
			    };
			    
			    $scope.unblock= function (user) {
			    	$http.put(
							$scope.urlBase
									+ '/friends/unblock?from='
									+ $scope.currentUser
									+ "&to=" + user.id)
					.then(
							function(response) {
							console.log('unblocked successfully');
							$window.location.reload();
							});
			    };
			    
			    $scope.chat= function (user) {
			    	        console.log('entered into chat block');
							$scope.showChatWindow=true;
			    };
			    
		} ]);