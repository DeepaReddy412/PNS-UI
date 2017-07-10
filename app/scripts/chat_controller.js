routerApp.controller('chatController', [ '$scope', '$location',
		'$rootScope', '$http', '$timeout','$uibModal','$window','$interval',
		function($scope, $location, $rootScope, $http, $timeout,$uibModal,$window,$interval) {

			$scope.urlBase = 'http://localhost:8080';
			
            $scope.currentUser= localStorage.getItem('user');
            $scope.chatUser= localStorage.getItem('ChatUserId');
            $scope.currentUserId= localStorage.getItem('loggedInUserId');
            $scope.chatUserName=localStorage.getItem('ChatUserName');
            $scope.showProfileInfo=false;
        	$scope.getMessageList=function(){
        	
        	$http
			.get(
					$scope.urlBase
							+ '/chat/getAllMessages?from='
							+ $scope.currentUser
							+ "&toId=" + $scope.chatUser)
			.then(
					function(response) {
					$scope.msgs=response.data;
					
					console.log($scope.msgs);
					$scope.ml=$scope.msgs.length;
					angular     	
                          .forEach(
                        		  	$scope.msgs,
                        		  		function(response) {
                          var dt = response.delieveredOn ;
                          var date=dt.dayOfMonth+"-"+dt.month+"-"+dt.year;
                          var hours = dt.hour;
                          var minutes = dt.minute;
                          var ampm = hours >= 12 ? 'pm' : 'am';
                          hours = hours % 12;
                          hours = hours ? hours : 12; 
                          minutes = minutes < 10 ? '0' + minutes : minutes;
                          var strTime = hours + ':' + minutes + ' ' + ampm;   
                          response.date=date;
                          response.time=strTime;
                          $scope.dateList = _.uniq(_.sortBy(_.pluck($scope.msgs,'date')));
                          var elem = document.getElementById('messages');
                    	  elem.scrollTop = elem.scrollHeight;
                    	
                      })
                    
                    	 
				})
        	}
				
        	$scope.getMessageList();
        	$interval($scope.getMessageList, 1000);
					
			$scope.send= function (msg) {
			    	        console.log('entered into chat controler block');
			    	        console.log(msg);
			    	        $scope.msg=null;
			    			$http
							.post(
									$scope.urlBase
											+ '/chat?from='
											+ $scope.currentUser
											+ "&toId=" + $scope.chatUser+"&msg="+msg)
							.then(
									function(response) {

							          $interval($scope.getMessageList, 1000);
								
									})
							
			  }
			
			
		    
/*		    $scope.reload = function () {
						        $http.get($scope.urlBase
										+ '/chat/getAllMessages?from='
										+ $scope.currentUser
										+ "&toId=" + $scope.chatUser)
										.then(
												function(response) {
												console.log('messages');
												$scope.msgs=response.data;
												$scope.ml=$scope.msgs.length;
												  angular
									              .forEach(
									                      $scope.msgs,
									                      function(
									                              response) {
									                          var dt = response.delieveredOn ;
									                          var date=dt.dayOfMonth+"-"+dt.month+"-"+dt.year;
									                          var hours = dt.hour;
									                          var minutes = dt.minute;
									                          var ampm = hours >= 12 ? 'pm' : 'am';
									                          hours = hours % 12;
									                          hours = hours ? hours : 12; 
									                          minutes = minutes < 10 ? '0' + minutes : minutes;
									                          var strTime = hours + ':' + minutes + ' ' + ampm;   
									                          console.log(date);
									                          console.log(strTime);
									                          response.date=date;
									                          response.time=strTime;
									                       
									                      });
						            });
						    };
						    $scope.reload();
						    $interval($scope.reload, 3000);*/
			    
		} ]);