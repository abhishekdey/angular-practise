angular.module('GenderSelection', [])
    .controller('GenderSelectionController', ['$scope', function ($scope) {
        $scope.gender = {
            save : function(){
                console.log($scope.gender);
            }
        };

        $scope.$watch('gender.type', function (newVal) {
           /* if (newVal)
                console.log(newVal);*/
        });
    }]);