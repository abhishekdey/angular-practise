/**
 * Created by adey on 21-05-2016.
 */
var app = angular.module('app', ['ui.grid', 'ui.grid.selection', 'ui.grid.grouping', 'ui.grid.treeView']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.createGridData = function (data) {
        var tempData = {};
        tempData.glAccountDescription = data.glAccountDescription;
        tempData.supplierName = data.supplierName;
        tempData.transactionDetails = data.transactionDetails;
        tempData.amountSpent = parseInt(data.amountSpent);
        tempData.gcsatCompliance = data.gcsatCompliance;
        tempData.predLevel1 = data.predLevel1;
        tempData.predLevel2 = data.predLevel2;
        tempData.predLevel3 = data.predLevel3;
        tempData.predLevel4 = data.predLevel4;
        $scope.gridOptions.data.push(tempData);
    };

    
    $http.get('classificationDetails.json')
        .success(function (data) {
            $scope.classificationList = data;

            $scope.gridOptions = {
                enableFiltering: true,
                treeRowHeaderAlwaysVisible: false,
                columnDefs: [
                    {name: 'glAccountDescription', width: '30%'},
                    {name: 'supplierName', width: '10%'},
                    {name: 'transactionDetails', width: '10%'},
                    {name: 'amountSpent', width: '5%'},
                    {name: 'gcsatCompliance', width: '5%'},
                    {name: 'predLevel1', width: '10%'},
                    {name: 'predLevel2', width: '10%'},
                    {name: 'predLevel3', width: '10%'},
                    {name: 'predLevel4', width: '10%'}
                ]
            };

            $scope.gridOptions.data = [];
            var parentIncrement, incrementId = 0;
            angular.forEach($scope.classificationList, function (data) {
                angular.forEach(data, function (values, key) {
                    $scope.createGridData(values);
                    if (key === 0 && data.length > 1) {
                        $scope.gridOptions.data[incrementId].$$treeLevel = 0;
                        parentIncrement = incrementId;

                        if (data.length > 1) {
                            $scope.createGridData(values);
                            incrementId++;
                        }
                    }

                    else if (key > 0 && data.length > 1) {
                        $scope.gridOptions.data[parentIncrement].amountSpent += parseInt($scope.gridOptions.data[incrementId].amountSpent);
                    }

                    incrementId++;
                });
            });
        });
}]);