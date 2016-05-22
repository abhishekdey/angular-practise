/**
 * Created by adey on 21-05-2016.
 */
var app = angular.module('app', ['ui.grid', 'ui.grid.selection', 'ui.grid.grouping', 'ui.grid.treeView', 'ui.grid.edit']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.predLevel1Alternative = [];
    $scope.predLevel2Alternative = [];
    $scope.predLevel3Alternative = [];
    $scope.predLevel4Alternative = [];
    $scope.gridOptions = {};
    $scope.gridOptions.data = [];

    $scope.getCategoryLevelDropDown = function (predLevelAlternative, predLevelArray, predLevel) {
        console.log(predLevelAlternative);
        var tempArray = predLevelAlternative.replace(/[\[\]'"]+/g, '');
        var position;
        tempArray = tempArray.split(',');
        angular.forEach(tempArray, function (tempData) {
            if (predLevelArray.length > 0) {
                angular.forEach(predLevelArray, function (predLevelData, key) {
                    if (tempData !== predLevelData.size) {
                        var size = predLevelArray.length;
                        predLevelArray.push({size: tempData});
                    }

                    if (predLevel === predLevelData) {
                        position = key;
                    }
                });
            }
            else {
                predLevelArray.push({0: predLevel});
                var size = predLevelArray.length;
                predLevelArray.push({size: tempData});
                position = 0;
            }
        });
        return position;
    };

    $scope.createGridData = function (data) {
        var tempData = {};
        tempData.glAccountDescription = data.glAccountDescription;
        tempData.supplierName = data.supplierName;
        tempData.transactionDetails = data.transactionDetails;
        tempData.amountSpent = parseInt(data.amountSpent);
        tempData.gcsatCompliance = data.gcsatCompliance;
        //tempData.predLevel1 = $scope.getCategoryLevelDropDown(data.predLevel1Alternative, $scope.predLevel1Alternative, data.predLevel1);
        //tempData.predLevel2 = $scope.getCategoryLevelDropDown(data.predLevel2Alternative, $scope.predLevel2Alternative, data.predLevel2);
        //tempData.predLevel3 = $scope.getCategoryLevelDropDown(data.predLevel3Alternative, $scope.predLevel3Alternative, data.predLevel3);
        //tempData.predLevel4 = $scope.getCategoryLevelDropDown(data.predLevel4Alternative, $scope.predLevel4Alternative, data.predLevel4);
        //tempData.predLevel1 = data.predLevel1;
        if (data.predLevel1 === 'Information Technology') {
            tempData.predLevel1 = 2;
        } else {
            tempData.predLevel1 = 1;
        }

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
                    {name: 'glAccountDescription',display:'desc', width: '30%'},
                    {name: 'supplierName', width: '10%'},
                    {name: 'transactionDetails', width: '10%'},
                    {name: 'amountSpent', width: '5%'},
                    {name: 'gcsatCompliance', width: '5%'},
                    {
                        name: 'predLevel1',
                        displayName: 'PredLevel1',
                        editableCellTemplate: 'ui-grid/dropdownEditor',
                        width: '20%',
                        cellFilter: 'mapPredLevel1',
                        editDropdownValueLabel: 'predLevel1',
                        editDropdownOptionsArray: [
                            {id: 0, predLevel1: 'Business Services'},
                            {id: 1, predLevel1: 'Non-Sourceable'},
                            {id: 2, predLevel1: 'Information Technology'}
                        ]
                    },
                    {name: 'predLevel2', width: '10%'},
                    {name: 'predLevel3', width: '10%'},
                    {name: 'predLevel4', width: '10%'}
                ]
            };
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

app.filter('mapPredLevel1', function () {
    var predLevel1Hash = {
        0: 'Business Services',
        1: 'Non-Sourceable',
        2: 'Information Technology'
    };

    return function (input) {
        if (!input) {
            return '';
        } else {
            return predLevel1Hash[input];
        }
    }
});/*
app.filter('mapPredLevel2', function () {
    var predLevel2Hash = {
        0: 'Temporary Labor',
        1: 'Logistics, Transportation & Freight Equipment'
    };

    return function (input) {
        if (!input) {
            return '';
        } else {
            return predLevel2Hash[input];
        }
    }
});
app.filter('mapPredLevel3', function () {

    var predLevel3Hash = {
        0: 'IT Temporary Labor',
        1: 'Lifting, Handling, Loading & Unloading Equipment'
    };

    return function (input) {
        if (!input) {
            return '';
        } else {
            return predLevel3Hash[input];
        }
    }
});
app.filter('mapPredLevel4', function () {
    var predLevel1Map = {
        0: 'IT Temporary Labor',
        1: 'Lifting, Handling, Loading & Unloading Equipment'
    };

    return function (input) {
        if (!input) {
            return '';
        } else {
            return predLevel1Map[input];
        }
    }
});*/