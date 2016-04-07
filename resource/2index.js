/**
 * Created by Abhishek Dey on 2-9-15.
 */


/*get access to http headers as*/

var User = $resource('/user/:userId', {userId:'@id'});
User.get({userId:123}, function(u, getResponseHeaders){
    u.abc = true;
    u.$save(function(u, putResponseHeaders) {
        //u => saved user object
        //putResponseHeaders => $http header getter
    });
});


/*access the raw $http promise via the $promise property on the object returned*/

var User = $resource('/user/:userId', {userId:'@id'});
User.get({userId:123})
    .$promise.then(function(user) {
        $scope.user = user;
    });

/*PUT Method*/

var app = angular.module('app', ['ngResource', 'ngRoute']);

// Some APIs expect a PUT request in the format URL/object/ID
// Here we are creating an 'update' method
app.factory('Notes', ['$resource', function($resource) {
    return $resource('/notes/:id', null,
        {
            'update': { method:'PUT' }
        });
}]);

// In our controller we get the ID from the URL using ngRoute and $routeParams
// We pass in $routeParams and our Notes factory along with $scope
app.controller('NotesCtrl', ['$scope', '$routeParams', 'Notes',
    function($scope, $routeParams, Notes) {
// First get a note object from the factory
        var note = Notes.get({ id:$routeParams.id });
        $id = note.id;

// Now call update passing in the ID first then the object you are updating
        Notes.update({ id:$id }, note);

// This will PUT /notes/ID with the note object in the request payload
    }]);