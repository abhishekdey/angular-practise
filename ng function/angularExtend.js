/**
 * Created by Abhishek Dey on 7-9-15.
 */


/*http://moduscreate.com/angularjs-tricks-with-angular-extend/*
 https://docs.angularjs.org/api/ng/function/angular.extend
/
 */

/*angular.extend(src, object1).*/

app.controller("ThingController", [ "$scope", function($scope) {
    $scope.thingOne = "one";
    $scope.thingTwo = "two";
    $scope.getThings = function() {
        return $scope.thingOne + " " + $scope.thingTwo;
    };
}]);


app.controller("ThingController", [ "$scope", function($scope) {
    angular.extend($scope, {
        thingOne: "one",
        thingTwo: "two",
        getThings: function() {
            return $scope.thingOne + " " + $scope.thingTwo;
        }
    });
}]);


app.controller("ThingController", [ "$scope", function($scope) {
    // models
    angular.extend($scope, {
        thingOne: "one",
    thingTwo: "two"
});

// methods
angular.extend($scope, {
    // in HTML template, something like {{ getThings() }}
    getThings: function() {
        return $scope.thingOne + " " + $scope.thingTwo;
    }
});
}]);



app.controller("ThingController", [ "$scope", function($scope) {
    // private
    var _thingOne = "one",
    _thingTwo = "two";

    // models
    angular.extend($scope, {
        get thingOne() {
            return _thingOne;
        },
        set thingOne(value) {
            if (value !== "one" && value !== "two") {
                throw new Error("Invalid value ("+value+") for thingOne");
            };
            
        },
        get thingTwo() {
            return _thingTwo;
        },
        set thingTwo(value) {
            if (value !== "two" && value !== "three")
            {
                throw new Error("Invalid value("+value +") for thingTwo");
            }
        }
    });

    // methods
    angular.extend($scope, {
        // in HTML template, something like {{ things }}
        get things() {
            return thingOne + " " + thingTwo;
        }
    });
}]);



var debug = true,
    Logger = {
        print: function(s) {
            return debug ? s : ""
        }
    };


app.controller('ControllerOne', [ '$scope', function($scope) {
    // mixin $scope
    angular.extend($scope, Logger);
    // define our $scope
    angular.extend($scope, {
        myVar: 1,
        log: function() { this.print(this.myVar); }
    });
}]);

app.controller('ControllerTwo', [ '$scope', function($scope) {
    // mixin $scope
    angular.extend($scope, Logger);
    // define our $scope
    angular.extend($scope, {
        myVar: 2,
        log: function() { this.print(this.myVar); }
    });
}]);