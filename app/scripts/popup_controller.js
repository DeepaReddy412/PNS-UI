routerApp.controller('PopupController', function ($scope,$http, $uibModalInstance, item) {
	
	$scope.urlBase = 'http://localhost:8080';
	$scope.currentUser= localStorage.getItem('user');
    $scope.item = item.name;
    console.log(item);
    $scope.showBlockTemplate=item.showblock;
    $scope.showRespondTemplate=item.showRepondTemplate;
    $scope.selected = {
        item: $scope.item
    };
    
    $scope.user=item;
    
    $scope.ok = function () {
    	$http
		.put(
				$scope.urlBase
						+ '/friends/block?from='
						+ $scope.currentUser
						+ "&to=" + $scope.user.id)
		.then(
				function(response) {
				console.log('blocked successfully');
			
				$uibModalInstance.close($scope.item);
				});
        
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.accept = function () {
    	
    	$http
		.post(
				$scope.urlBase
						+ '/requests/acceptReq?from='
						+$scope.currentUser+"&to="+$scope.user.id)
		.then(
				function(response) {
					console.log('hi accepted successfully');
					$uibModalInstance.close($scope.item);
					
				});
    };

    $scope.reject = function () {
        $uibModalInstance.dismiss('cancel');
    };
});