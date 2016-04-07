/**
 * Created by Abhishek Dey on 13/6/15.
 */


    var app = angular.module("myModule");

    app.controller('repoController',['$scope','serviceFunction','$routeParams',function($scope,serviceFunction,$routeParams){
        /*
         $scope.search = function(){
         $http.get('angularRepo.json')  //inline json file
         .then(success , error);
         }
         */
        $scope.username = $routeParams.username;

        console.log($scope.username + " using service");

        var success = function(data){
            console.log("success");
            $scope.repos = data;
        }

        var error = function(reason){
            console.log(reason.data.message + " error");
            $scope.message = reason.data.message;
        }

        // //errror got
        // http://stackoverflow.com/questions/26834648/angularjs-uncaught-referenceerror-a-is-not-defined//url for link
        serviceFunction.getRepos($scope.username)
        // $http.get('angularRepo.json')       //inline json file

        .then(success,error);


    }]);