/**
 * Created by Abhishek Dey on 5-9-15.
 */

/*https://docs.angularjs.org/api/ng/service/$compile*/
var myModule = angular.module();

myModule.directive('directiveName', function factory(injectables) {
    var directiveDefinitionObject = {
        priority: 0,//The priority is used to sort the directives before their compile functions get called.
                    // Priority is defined as a number. Directives with greater numerical priority are compiled first.

        template: '<div></div>', // or // function(tElement, tAttrs) { ... },
                                // or // templateUrl: 'directive.html',

        transclude: false,
        restrict: 'A',
        templateNamespace: 'html',
        scope: false,
        controller: function($scope, $element, $attrs, $transclude, otherInjectables) { },
        controllerAs: 'stringIdentifier',
        bindToController: false,
        require: 'siblingDirectiveName', // or ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
        compile: function compile(tElement, tAttrs, transclude) {

            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {},
                post: function postLink(scope, iElement, iAttrs, controller) {}
            }

            // or return function postLink( ... ) { ... }
        },

        // or
        // link: {
        //  pre: function preLink(scope, iElement, iAttrs, controller) { ... },
        //  post: function postLink(scope, iElement, iAttrs, controller) { ... }
        // }
        // or link: function postLink( ... ) { ... }
    };
    return directiveDefinitionObject;
});



/*the above can be simplified as*/
var myModule = angular.module();

myModule.directive('directiveName', function factory(injectables) {
    var directiveDefinitionObject = {
        link: function postLink(scope, iElement, iAttrs) {}
    };
    return directiveDefinitionObject;
    // or
    // return function postLink(scope, iElement, iAttrs) { ... }
});