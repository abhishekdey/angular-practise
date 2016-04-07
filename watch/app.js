/**
 * Created by Abhishek Dey on 25/8/15.
 */

var watchMe = angular.module('watchMe',[]);

watchMe.config(function(){
});

watchMe.run(function($rootScope) {
    var scope = $rootScope;
    scope.name = 'misko';
    scope.counter = 0;

    console.log("inital value of counter values " +scope.counter);

    scope.$watch('name', function(newValue, oldValue) {
        scope.counter = scope.counter + 1;
    });

    /*Usually, you don't call $digest() directly in controllers or in directives. Instead, you should call $apply()
    (typically from within a directive), which will force a $digest().*/
    scope.$digest();
    // the listener is always called during the first $digest loop after it was registered
    console.log("Always called during registration " + scope.counter);

    scope.$digest();
    // but now it will not be called unless the value changes
    console.log("Again it will not be called as newValue and oldValue is same " +scope.counter);

    scope.name = 'adam';
    scope.$digest();

    console.log("name changed from misko to adam hence counter value changed to " +scope.counter);


// Using a function as a watchExpression

    var food;
    scope.foodCounter = 0;

    console.log("fooCounter initial value is zero ?  " + scope.foodCounter);
    scope.$watch(
        // This function returns the value being watched. It is called for each turn of the $digest loop
        function() { return food; },
        // This is the change listener, called when the value returned from the above function changes
        function(newValue, oldValue) {
            if ( newValue !== oldValue ) {
                // Only increment the counter if the value changed
                scope.foodCounter = scope.foodCounter + 1;
            }
        }
    );
    // No digest has been run so the counter will be zero
    console.log("No digest run so value will be same as early " +scope.foodCounter);

    // Run the digest but since food has not changed count will still be zero
    scope.$digest();
    console.log("Digest run so value will be same as early as no changes seen " +scope.foodCounter);

    // Update food and run digest.  Now the counter will increment
    food = 'cheeseburger';
    scope.$digest();
    console.log("Digest run so value will not be same as early " +scope.foodCounter);
});


/*
* function $apply(expr) {
 try {
 return $eval(expr);
 } catch (e) {
 $exceptionHandler(e);
 } finally {
 $root.$digest();
 }
 }
* */