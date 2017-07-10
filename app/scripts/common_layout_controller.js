routerApp.controller('CommonLayoutController', [
		'$scope',
		'$http',
		'$rootScope',
		'$location',
		'$window','$interval',
		function($scope, $http, $rootScope, $location, $window,$interval) {
			$scope.urlBase = 'http://localhost:8080';
			$scope.loggedInUser = localStorage.getItem('user');
			$scope.loggedIn = localStorage.getItem('loggedIn');
			$scope.showSearchButton=localStorage.getItem('showSearch');
			$scope.showChatWindow=false;
			$scope.loggeduser=localStorage.getItem('userName');
			
			if ($scope.loggedIn) {
				$scope.loggedInUser = localStorage.getItem('user');
				$scope.showLogout = true;
				$scope.showfIcon = false;
				$scope.showSearch=true;
				$scope.showFriendsIcon=true;
					$http
					.get(
							$scope.urlBase
									+ '/requests/getallusers?email='
									+ $scope.loggedInUser)
					.then(
							function(response) {
								$scope.userList = response.data;
								$rootScope.notifications=$scope.userList.length;
								console.log($scope.userList);
								
							});
					
					$scope.getUserList = (function() {
						$http.get(
								$scope.urlBase + '/dashboard/getallusers?email='
										+ localStorage.getItem('user')).then(
								function(response) {

									$scope.userList = response.data;
									if ($scope.userList.length === 0) {
										$location.path('dashboard');
										$rootScope.showProfile = false;
										$scope.showDropdown = false;
										$scope.infoMessage = true;
										$timeout(function() {
											$scope.infoMessage = false;
										}, 3000);
									} else {
										$rootScope.showProfile = false;
										$scope.showDropdown = true;
										$scope.emails = _.uniq(_.sortBy(_.pluck(
												$scope.userList, 'email')));
									}

								});
					});

					$scope.getUserList();

					$scope.getFriends = function () {
						
					    	$scope.loggedInUser = localStorage.getItem('user');
					    	$scope.showfIcon=true;
					    	$http
							.get(
									$scope.urlBase + '/friends?email=' + $scope.loggedInUser)
							.then(
									function(response) {
										console.log('Friends called again');
										console.log(response.data);
										$scope.frList = response.data;
										
									});
					        
					    };

				    $scope.getFriends();
				    
				    									
			} else {
				$scope.showLogout = false;
				$scope.showFriendsIcon=false;
				$scope.showfIcon = false;
			}

			$scope.logout = function() {
				localStorage.removeItem('user');
				localStorage.removeItem('loggedIn');
				localStorage.removeItem('userName');
				localStorage.removeItem('showSearch');
				localStorage.removeItem('showUserProfile');
				localStorage.removeItem('selectedEntity');
				localStorage.removeItem('ChatedWith');
				localStorage.removeItem('loggedInUserId');
				localStorage.removeItem('ChatUserId');
				localStorage.removeItem('history');
				localStorage.removeItem('userName');
				localStorage.removeItem('ChatUserName');
				localStorage.removeItem('messges');
				
				$location.path('/');
				$rootScope.showSearchButton=false;
				$window.location.reload();
			}
			
			$scope.dashboard = function() {
				$('#dashboard').addClass('active');
				$('#freqid').removeClass('active');
				$('#fid').removeClass('active');
				$location.path('/dashboard');			
			}
			
			$scope.frequest = function() {
				$location.path('/request');
				$('#freqid').addClass('active');
				$('#dashboard').removeClass('active');
				$('#fid').removeClass('active');
				$location.path('/request');	
			}
			
			$scope.friend = function() {
				$scope.showfIcon=true;
				$location.path('/friends');
			}
			
			$scope.profile = function() {
				$location.path('/profile');
			}
		
			$scope.isActive = function(viewLocation) {
				return viewLocation === $location.path();
			}
			
			
			$scope.selectEntity = function(selectedEntity) {
				$scope.selectedUserEmail = selectedEntity;
				localStorage.setItem('selectedEntity',$scope.selectedUserEmail);
			    localStorage.setItem('showUserProfile',true);
			    $window.location.reload();
			    $location.path('/dashboard');
			   
			}
			
			$scope.callChatWindow=function(user)
			{
				$scope.chatUser=JSON.stringify(user);
				$scope.chatUserObj=JSON.parse($scope.chatUser);
				console.log($scope.chatUserObj);
				localStorage.setItem('ChatUserId',$scope.chatUserObj.id);
				localStorage.setItem('ChatUserName',$scope.chatUserObj.name);
				$scope.userId=localStorage.getItem('ChatUserId');
				$scope.name=localStorage.getItem('ChatUserName');
				$http.post(
						$scope.urlBase
								+ '/chat/update?from='
								+ $scope.loggedInUser
								+ "&toId=" + $scope.userId)
				.then(
						function(response) {
						console.log('message count updated successfully');
					    $scope.getFriends();
						  
						})
				$location.path('/chats');
			    $window.location.reload();
		
			}
			
			   $scope.reload = function () {
								 	
				    	$http
						.get(
								$scope.urlBase + '/friends?email=' + $scope.loggedInUser)
						.then(
								function(response) {
									console.log('Friends called again');
									console.log(response.data);
									$scope.frList = response.data;
									
								});
				        
				    };
			   
			    $scope.reload();
			    $interval($scope.reload, 3000);
		} ]); 