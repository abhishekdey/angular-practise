angular.module( "GenderSelection" ).directive(
    "primaryLayout",
    function() {

        // Return the directive configuration.
        return({
            link: link,
            restrict: "A",
            controller: primaryController,
            templateUrl: "primary-layout.html"
        });

        // I bind the JavaScript events to the scope.
        function link() {
            console.log( "Primary layout directive linking." );
        }

        function primaryController($scope){
            $scope.maleUser = angular.copy($scope.$parent.gender);
            $scope.$parent.gender.address = 'bangalore';
        }
    }
);