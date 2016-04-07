(function(){
    var app = angular.module("myModule",["ngRoute"]);

    app.config(function($routeProvider){
        $routeProvider
            .when("/main",{
                templateUrl:"userName.html",
                controller:"usernameController"
            }) .when("/user/:username",{
                templateUrl:"userRepodetails.html",
                controller:"repoController"
            })
            .otherwise({
                redirectTo:"/main"
            });
    });
}());