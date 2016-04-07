/**
 * Created by Abhishek Dey on 14/6/15.
 */


var app = angular.module("myModule");

app.controller('usernameController',['$scope','$interval','$location',function($scope,$interval,$location){
    $scope.username = 'angular';
    $scope.counter = 5;

    /*
     $scope.search = function(){
     $http.get('angularRepo.json')                   //inline json file
     .then(success , error);
     }
     */

    $scope.search = function(username){
        $scope.counter = null;
        $location.path("/user/" + username);
    }

    var counterDecrement = function(){
        $scope.counter -= 1;
        if($scope.counter < 1){
            console.log($scope.username + " counter less than 1");
            $scope.search($scope.username);
        }
    }

    var startCounterDecrement = function(){
        $interval(counterDecrement,1000,5);
    }

    startCounterDecrement();
}]);
