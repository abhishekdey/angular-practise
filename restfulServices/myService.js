/**
 * Created by Abhishek Dey on 14/6/15.
 */

(function(){
    var serviceFunction = function($http){

        var getRepos = function(username){
            return $http.get("https://api.github.com/users/" + username + "/repos").then(function(response){
                return response.data;
            });
        };
        return {
            getRepos : getRepos  //calling the function getRepos
        };
    };

    var app = angular.module("myModule");
    app.factory("serviceFunction",serviceFunction);
}());