
    /*  angular.injector(modules, [strictDi]);  */
// create an injector
var $injector = angular.injector(['ng']);

// use the injector to kick off your application
// use the type inference to auto inject arguments, or use implicit injection
$injector.invoke(function($rootScope, $compile, $document) {
    $compile($document)($rootScope);
    $rootScope.$digest();
});


/*Perhaps, you want to inject and compile some markup after the application has been bootstrapped.
  You can do this using the extra injector() added to JQuery/jqLite elements. See angular.element.*/

var $div = $('<div ng-controller="MyCtrl">{{content.label}}</div>');
$(document.body).append($div);

angular.element(document).injector().invoke(function($compile) {
    var scope = angular.element($div).scope();
    $compile($div)(scope);
});