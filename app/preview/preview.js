'use strict';

angular.module('myApp.preview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preview', {
    templateUrl: 'preview/preview.html',
    controller: 'PreviewCtrl'
  });
}])

.controller('PreviewCtrl', ['$scope', '$window', function($scope, $window) {

    $scope.init = function () {
        console.log('Loading Viewer view');

        console.log('Creating the report viewer with default options');
        var viewer = new $window.Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);

        console.log('Creating a new report instance');
        var report = new $window.Stimulsoft.Report.StiReport();

        console.log('Load report from url');
        report.loadFile('reports/AWBPlainFull.mrt');

        console.log('Generating JSON data');
        var dataSet = new Stimulsoft.System.Data.DataSet("Demo");

        readJson('json/exampleAwb.json', function(json) {
            //report.dictionary.databases.clear();

            var dataSet = new Stimulsoft.System.Data.DataSet("AWBDataProvider");
            dataSet.readJson(json);

            report.regData("AWBDataProvider", "AWBDataProvider", dataSet);
            report.dictionary.synchronize();

            viewer.report = report;
            viewer.renderHtml('viewer');
        });
    };

    var readJson = function(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType('application/json');
        rawFile.open('GET', file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == '200') {
                callback(rawFile.responseText , rawFile.status);
            }
            else{
                callback('',rawFile.status);
            }
        };
        rawFile.send(null);
    }


}]);