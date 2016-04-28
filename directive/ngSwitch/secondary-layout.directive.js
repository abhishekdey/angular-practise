angular.module( "GenderSelection" ).directive(
    "secondaryLayout",
    function() {

        // Return the directive configuration.
        return({
            link: link,
            restrict: "A",
            templateUrl: "secondary-layout.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {
            console.log( "Secondary layout directive linking." );
        }
    }
);