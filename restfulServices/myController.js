/**
 * Created by Abhishek Dey on 13/6/15.
 */
var app = angular.module("myModule",[]);


app.controller('myController',['$scope',serviceFunction,'$interval',function($scope,serviceFunction , $interval){
   $scope.login = 'angular';
   $scope.counter = 5;


  $scope.search = function(username){

      $scope.counter = null;

      serviceFunction.getRepos(username)         //url for link
      // $http.get('angularRepo.json')                   //inline json file
           .then(success , error);
   }

   /*
        $scope.search = function(){
            $http.get('angularRepo.json')                   //inline json file
                .then(success , error);
        }
    */


    var counterDecrement = function(){
        $scope.counter -= 1;
        if($scope.counter < 1){
            console.log($scope.counter);
            $scope.search($scope.login);
        }
    }

    var startCounterDecrement = function(){
        $interval(counterDecrement,1000,5);
    }

    startCounterDecrement();

    var success = function(data){
        console.log("success");
        $scope.repos = data;
    }

    var error = function(data){
        console.log(data.message + " error");
        $scope.message = data.message;
    }
}]);

