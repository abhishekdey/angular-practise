/**
 * Created by Abhishek Dey on 10/8/15.
 */

app.directive('exampleDirective', function() {
    return {
        controller: function($scope, $element){
            // does nothing, but must exist to pass to linkFn
        },
        link: function (scope, elem, attrs, ctrl) {
            ctrl.key = 'value'
        }
    }
});

app.directive('childDirective', function() {
    return {
        require: '^exampleDirective',
        link: function($scope, $element, attr, exampleDirectiveCtrl){

        /*This does not work because the child post-link function runs before the parent post-link function:*/
        console.log(exampleDirectiveCtrl.key); // undefined
    }
    }
});


/*Change the parent link function into:*/
            //solution
/*
compile: function () {
    return {
        post: function (scope, elem, attrs, ctrl) {
            ctrl.key = 'value'
        }
    }
}*/