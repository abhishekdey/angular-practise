/**
 * Created by Abhishek Dey on 25/8/15.
 */

// let's assume that scope was dependency injected as the $rootScope
foodMeApp.factory('customer', function($rootScope) {
    var scope = $rootScope;
    scope.name = 'misko';
    scope.counter = 0;

    console.log(expect(scope.counter).toEqual(0));
    scope.$watch('name', function(newValue, oldValue) {
        scope.counter = scope.counter + 1;
    });
    expect(scope.counter).toEqual(0);

    scope.$digest();
    // the listener is always called during the first $digest loop after it was registered
    expect(scope.counter).toEqual(1);

    scope.$digest();
    // but now it will not be called unless the value changes
    expect(scope.counter).toEqual(1);

    scope.name = 'adam';
    scope.$digest();
    expect(scope.counter).toEqual(2);


 /*__________________________________________________________________________________________________________*/

// Using a function as a watchExpression
    /*that $watchCollection does a shallow comparison of the properties of the object
    (or the items in the collection if the model is an array).
    This means that changing a property deeper inside the object/collection that the first level will not trigger a re-rendering.*/


    var food;
    scope.foodCounter = 0;
    expect(scope.foodCounter).toEqual(0);
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
    expect(scope.foodCounter).toEqual(0);

    // Run the digest but since food has not changed count will still be zero
    scope.$digest();
    expect(scope.foodCounter).toEqual(0);

    // Update food and run digest.  Now the counter will increment
    food = 'cheeseburger';
    scope.$digest();
    expect(scope.foodCounter).toEqual(1);
});