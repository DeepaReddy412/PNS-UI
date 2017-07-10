routerApp
		.controller(
				'DashboardController',
				[
						'$scope',
						'$location',
						'$rootScope',
						'$http',
						'$timeout','$uibModal','$window',
						function($scope, $location, $rootScope, $http,$timeout,$uibModal,$window) {

							$scope.urlBase = 'http://localhost:8080';
							$scope.currentUser=localStorage.getItem('user');
							$scope.showProfile = false;
							$scope.showAddButton = true;
							$scope.showCancelButton=false;
							$scope.showBlockButton=false;
							$scope.showUnBlockButton=false;
							$scope.isCanceled = false;
							$scope.showRespondButton=false;
							$scope.respondButton="Respond to Friend Request";							
							$scope.button = "Add friend";
							$scope.cancelButton = "Cancel request";
							$scope.friendButton="Friend";
							
							$scope.showIcon = true;	
							$scope.showLogout=true;
							$scope.showDropdown = false;
							$scope.showUserProfileInfo=localStorage.getItem('showUserProfile');
							console.log('called dashboard');
							
							console.log($scope.showUserProfileInfo);
						
							$scope.profile=function(){
																
								$location.path('dashboard');
							}
							
							
							$scope.profile();
							
							$scope.getUserList = (function() {
								$http
										.get(
												$scope.urlBase
														+ '/dashboard/getallusers?email='
														+ localStorage
																.getItem('user'))
										.then(
												function(response) {

													$scope.userList = response.data;
													if ($scope.userList.length === 0) {
														$location
																.path('dashboard');
														$scope.showProfile = false;
														$scope.showDropdown = false;
														$scope.infoMessage = true;
														$timeout(
																function() {
																	$scope.infoMessage = false;
																}, 3000);
													} else {
														$scope.showProfile = false;
														$scope.showDropdown = true;
														$scope.emails = _
																.uniq(_
																		.sortBy(_
																				.pluck(
																						$scope.userList,
																						'email')));
													}
													
												});
							});

							$scope.getUserList();

					       $scope.getUsers=(function(email){
						   console.log(email);
						     $http.get(
									$scope.urlBase
											+ '/dashboard/users?from='
											+ localStorage
											.getItem('user')+"&to="+email)
							.then(
									function(response) {

										$scope.userInfo = response.data;
										console.log($scope.userInfo);
										console.log($scope.userInfo.status);
										if ($scope.userInfo.length === 0) {
											$scope.errorMessage = 'Invalid User';
											$scope.showProfile = false;
										} else {														
											$scope.selectedUser = email;
											$scope.showProfile = true;
											$scope.userInfo = response.data;
										  if($scope.userInfo.status==null)
											{
												console.log('Entered into add mode');
												$scope.showAddButton = true;
												$scope.showCancelButton=false;
												$scope.showRespondButton=false;
											}
										  else if($scope.userInfo.status=='REQUESTED' && $scope.userInfo.userType=='SENDER')
											{
												console.log('Entered into request mode');
												$scope.showRespondButton=true;
												$scope.showAddButton = false;
											}
										  else if($scope.userInfo.status=='REQUESTED' && $scope.userInfo.userType=='RECEIVER')
											{
												console.log('Entered into request mode');
												$scope.showCancelButton=true;
												$scope.showAddButton = false;
												$scope.showRespondButton=false;
											}
										  else if($scope.userInfo.status=='ACCEPTED' && $scope.userInfo.blocked==false)
											{
												console.log('Entered into friend mode');
												$scope.showAddButton = false;
												$scope.showCancelButton = false;
												$scope.showBlockButton=true;											
												$scope.showRespondButton=false;
											}
										  else if($scope.userInfo.status=='ACCEPTED' && $scope.userInfo.blocked==true)
											{
												console.log('Entered into blocked mode');
												$scope.showAddButton = false;
												$scope.showCancelButton = false;
												$scope.showBlockButton=false;
												$scope.showUnBlockButton=true;
												$scope.showRespondButton=false;
											}
										  else if($scope.userInfo.status=='CANCELED')
											{
												console.log('Entered into canceled mode');
												$scope.showAddButton = true;
												$scope.showCancelButton = false;
												$scope.showRespondButton=false;
											}
										}
										
									});
					        });
					       
					       
					   	if($scope.showUserProfileInfo)
						{
					   		console.log($scope.showUserProfileInfo);
					   		$scope.email1=localStorage.getItem('selectedEntity');
					   		console.log('its there!!!!');
					   		console.log($scope.email1);
					   		console.log($scope.showUserProfileInfo);
					   		$scope.getUsers($scope.email1);
						}
					
						/*	$scope.selectEntity = function(email) {
								$scope.searchFilter = email;
								$scope.showProfile=false;
								$scope.email=email;
								console.log($scope.email);
								$scope.getUsers($scope.email);
					
							}*/

							$scope.sendRequest = function(email) {
								$scope.email=email;
								$http
										.put(
												$scope.urlBase
														+ '/notification/sendFriendReq?from='
														+ localStorage
																.getItem('user')
														+ "&to=" + $scope.email)
										.then(
												function(response) {
												
													$scope.getUsers($scope.email);
													
													$scope.friendRequestMsg = "Friend request sent successfully";
													
													$scope.requestMsg = true;
													$timeout(
															function() {
																$scope.requestMsg = false;
															}, 1000);

												});
							}

							$scope.cancelRequest = function(email) {
								$scope.email=email;
								$scope.isCanceled = true;
								
								$http.put($scope.urlBase + '/notification/cancelReq?from=' +localStorage.getItem('user')+"&to="+$scope.email)
								.then(function(response) {
									 console.log(response.data);
 								     $scope.getUsers($scope.email);
								     $scope.friendRequestCancelMsg="Friend request canceled successfully";
									  									
									  $scope.requestCancelMsg = true;
										$timeout(
												function() {
													$scope.requestCancelMsg = false;
												}, 3000);
									 
								});
							}
							

							 $scope.respondtoreq = function (user) {
								    user.showRepondTemplate=true;
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
								    	console.log('entered into unblock mode');
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
						
						} ]);
