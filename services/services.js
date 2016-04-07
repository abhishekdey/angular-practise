/**
 * Created by Abhishek Dey on 9-9-15.
 */


angular.module('myApp', [])
    .run(function($rootScope) {
        $rootScope.test = new Date();
    })
    .controller('myCtrl', function($scope, $rootScope) {
        $scope.change = function() {
            $scope.test = new Date();
        };

        $scope.getOrig = function() {
            return $rootScope.test;
        };
    })
    .controller('myCtrl2', function($scope, $rootScope) {
        $scope.change = function() {
            $scope.test = new Date();
        };

        /*rootScope's value can be updated too*/
        $scope.changeRs = function() {
            $rootScope.test = new Date();
        };

        $scope.getOrig = function() {
            return $rootScope.test;
        };
    });


/*
  Sharing data between controllers is what Factories/Services are very good for.
  In short, it works something like this.*/


var app = angular.module('myApp', []);

app.factory('items', function() {
    var items = [];
    var itemsService = {};

    itemsService.add = function(item) {
        items.push(item);
    };
    itemsService.list = function() {
        return items; //get all elements
    };

    return itemsService; //return empty reference after adding data
});

function Ctrl1($scope,items) {
    $scope.list = items.list;
}

function Ctrl2($scope, items) {
    $scope.add = items.add;
}