(function() { 
  'use strict';

  angular.module('myApp', [])
  .controller('PromisesPromisesCtrl', function($scope, asyncService) {
    $scope.log = [
    ];

    $scope.urls = [
      { url: 'ajax1.html'},
      { url: 'ajax2.html'},
      { url: 'ajax3.html'}
    ];

    $scope.addUrl = function() {
      $scope.urls.push('http://');
    };

    $scope.executeCalls = function() {
       $scope.log.length = 0;

       asyncService.loadDataFromUrls($scope.urls)
         .then(
           function(data) {
           $scope.results = data;
           $scope.log.push(Date.now() + ' - SUCCESS = ' + JSON.stringify(data));
          },
          function(error) {
           $scope.log.push(Date.now() + ' - ERROR - calls failed, error is\n\n' + JSON.stringify(error));
          },
          function(update) {
           $scope.log.push(Date.now() + ' - UPDATE - ' + update);
          });
    };

  //It's better to deal with the $http errors in the service layer,
  // so that the controller doesn't need to handle redirects, 404s, etc?
  }).service('asyncService', function($http, $q) {
      return {
        loadDataFromUrls: function(urls) {
          var deferred = $q.defer();
          var urlCalls = [];
          angular.forEach(urls, function(url) {
            urlCalls.push($http.get(url.url));
          });
          // they may, in fact, all be done, but this
          // executes the callbacks in then, once they are
          // completely finished.
          // $q.all function accepts an array of promises
          $q.all(urlCalls)
          .then(
            function(results) {
            deferred.resolve(
              JSON.stringify(results))
          },
          function(errors) {
            deferred.reject(errors);
          },
          function(updates) {
            deferred.update(updates);
          });
          return deferred.promise;
        }
      };
    });
  }());
