/**
 * Created by Abhishek Dey on 8-9-15.
 */

/*To create a cache object, we use the $cacheFactory and create a cache by ID:*/
    var cache = $cacheFactory('myCache');

/*Custom Cache*/
/*______________________________Caching through $http ____________________________________*/
$http({
    method: 'GET',
    url: '/api/users.json',
    cache: true
});

// Or, using the .get helper


// Now, every request that is made through $http to the URL /api/users.json will be stored in the default $http cache.
// The key for this request in the $http cache is the full-path URL.
/* The key for this request in the $http cache is the full-path URL.*/
/* The default $http cache can be particularly useful when our data doesn't change very often. We can set it like so:*/
   $http.get('/api/users.json', {

/*By passing the true parameter in the $http options, we’re telling the $http service to use the default cache.
 It’s useful to use the default cache if we don’t want to mess with the cache all that often.*/
    cache: true
});

/*To reference the $http default request, we simply fetch the cache through the $cacheFactory by ID:*/
    var cache = $cacheFactory.get('$http');

/*With the cache in hand, we can do all the normal operations we need and want to do on it, such as retrieve
the cached responses, clear items from the cache, or blow away all cached references:*/

// Fetch the cache for the previous request
    var usersCache = cache.get('http://example.com/api/users.json');

// Delete the cache entry for the previous request
    cache.remove('http://example.com/api/users.json');

// Start over and remove the entire cache
    cache.removeAll();


//The info() method returns the ID, size, and options of the cache object.


/* ___________________________Setting Default Cache for $http  __________________________________*/

/*Although it is easy, it’s not convenient to need to pass an instance of the cache every time we want to make an $http
request, especially if we’re using the same cache for every request.
We can set the cache object that $http uses by default through the $httpProvider in a .config() method on our module.
Note that in this config block we have to inject both $httpProvider and $cacheFactory.*/

    angular.module('myApp', [])
    .config(function($httpProvider, $cacheFactory) {
        $httpProvider.defaults.cache =
            $cacheFactory('myCache', {capacity: 20});
    });

/*The $http service will no longer use the default cache it creates for us; it will use our own cache i.e myCache,
    which is effectively now a Least Recently Used (LRU) cache.*/


angular.module('superCache')
    .factory('superCache', ['$cacheFactory', function($cacheFactory) {
        return $cacheFactory('super-cache');
    }]);
