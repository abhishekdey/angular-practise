/**
 * Created by adey on 21-05-2016.
 */
var app = angular.module('app', ['ui.grid', 'ui.grid.selection', 'ui.grid.grouping', 'ui.grid.treeView', 'ui.grid.edit']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.predLevel1Alternative = [];
    var Level1Key = 0;
    $scope.predLevel2Alternative = [];
    $scope.predLevel3Alternative = [];
    $scope.predLevel4Alternative = [];
    $scope.gridOptions = {};

    $scope.getCategoryLevelDropDown = function (predLevelAlternative, predLevelArray, predLevel, levelName) {
        var tempArray = predLevelAlternative.replace(/[\[\]'"]+/g, '');
        var position;
        tempArray = tempArray.split(',');
        angular.forEach(tempArray, function (tempData) {
            var flag = false;
            if (predLevelArray.length > 0) {
                angular.forEach(predLevelArray, function (predLevelData, key) {
                    if (tempData === predLevelData[levelName]) {
                        flag = true;
                    }
                    if (predLevel === predLevelData[levelName]) {
                        position = key;
                    }
                });

                if (flag === false) {
                    predLevelArray.push({id: tempData});
                    predLevelArray[predLevelArray.length - 1][levelName] = tempData;
                }
            }
            else {
                predLevelArray.push({id: predLevel});
                predLevelArray[predLevelArray.length - 1][levelName] = predLevel;
                predLevelArray.push({id: tempData});
                predLevelArray[predLevelArray.length - 1][levelName] = tempData;
                position = 1;
            }
        });
        return predLevel;
    };

    $scope.createGridData = function (data) {
        var tempData = {};
        tempData.glAccountDescription = data.glAccountDescription;
        tempData.supplierName = data.supplierName;
        tempData.transactionDetails = data.transactionDetails;
        tempData.amountSpent = parseInt(data.amountSpent);
        tempData.gcsatCompliance = data.gcsatCompliance;
        tempData.predLevel1 = $scope.getCategoryLevelDropDown(data.predLevel1Alternative, $scope.predLevel1Alternative, data.predLevel1, 'predLevel1');
        tempData.predLevel2 = $scope.getCategoryLevelDropDown(data.predLevel2Alternative, $scope.predLevel2Alternative, data.predLevel2, 'predLevel2');
        tempData.predLevel3 = $scope.getCategoryLevelDropDown(data.predLevel3Alternative, $scope.predLevel3Alternative, data.predLevel3, 'predLevel3');
        tempData.predLevel4 = $scope.getCategoryLevelDropDown(data.predLevel4Alternative, $scope.predLevel4Alternative, data.predLevel4, 'predLevel4');
        $scope.gridOptions.data.push(tempData);
    };

    $http.get('classificationDetails.json')
        .success(function (data) {
            $scope.classificationList = data;

            $scope.gridOptions = {
                enableFiltering: true,
                treeRowHeaderAlwaysVisible: false,
                columnDefs: [
                    {name: 'glAccountDescription', display: 'desc', width: '30%'},
                    {name: 'supplierName', width: '10%'},
                    {name: 'transactionDetails', width: '10%'},
                    {name: 'amountSpent', width: '5%'},
                    {name: 'gcsatCompliance', width: '5%'},
                    {
                        name: 'predLevel1',
                        displayName: 'PredLevel1',
                        editableCellTemplate: 'ui-grid/dropdownEditor',
                        width: '10%',
                        editDropdownValueLabel: 'predLevel1',
                        editDropdownOptionsArray: $scope.predLevel1Alternative
                    },
                    {
                        name: 'predLevel2', displayName: 'PredLevel2',
                        editableCellTemplate: 'ui-grid/dropdownEditor',
                        width: '10%',
                        editDropdownValueLabel: 'predLevel2',
                        editDropdownOptionsArray: $scope.predLevel2Alternative
                    },
                    {
                        name: 'predLevel3', displayName: 'PredLevel3',
                        editableCellTemplate: 'ui-grid/dropdownEditor',
                        width: '10%',
                        editDropdownValueLabel: 'predLevel3',
                        editDropdownOptionsArray: $scope.predLevel3Alternative
                    },
                    {
                        name: 'predLevel4',displayName: 'PredLevel4',
                        editableCellTemplate: 'ui-grid/dropdownEditor',
                        width: '10%',
                        editDropdownValueLabel: 'predLevel4',
                        editDropdownOptionsArray: $scope.predLevel4Alternative
                    }
                ],
                data: []
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