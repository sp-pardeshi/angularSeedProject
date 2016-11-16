'use strict';

angular.module('myApp.tree', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'ui.grid',
  'ui.grid.treeView',
  'ui.grid.exporter',
  'ui.grid.selection'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tree', {
    templateUrl: 'components/tree/tree.html',
    controller: 'treeController'
  });
}])

.controller('treeController',
  [
    '$scope',
    '$http',
    '$interval',
    'uiGridTreeViewConstants',
      function ($scope, $http, $interval, uiGridTreeViewConstants ) {
      $scope.gridOptions = {
        enableSorting: true,
        enableFiltering: true,
        showTreeExpandNoChildren: true,
        exporterMenuCsv: true,
        enableGridMenu: true,
        columnDefs: [
          { name: 'name', width: '30%' },
          { name: 'gender', width: '20%' },
          { name: 'age', width: '20%' },
          { name: 'company', width: '25%' },
          { name: 'state', width: '35%' },
          { name: 'balance', width: '25%', cellFilter: 'currency' }
        ],
        onRegisterApi: function( gridApi ) {
          $scope.gridApi = gridApi;
        }
      };

      $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
      .success(function(data) {
       for ( var i = 0; i < data.length; i++ ){
         data[i].state = data[i].address.state;
         data[i].balance = Number( data[i].balance.slice(1).replace(/,/,'') );

       }
       data[0].$$treeLevel = 0;
       data[1].$$treeLevel = 1;
       data[10].$$treeLevel = 2;
       data[20].$$treeLevel = 3;
       data[40].$$treeLevel = 4;


       data[60].$$treeLevel = 0;
       data[61].$$treeLevel = 1;
       data[90].$$treeLevel = 1;

       data[120].$$treeLevel = 0;
       data[121].$$treeLevel = 1;
       data[150].$$treeLevel = 1;

       data[180].$$treeLevel = 0;
       data[181].$$treeLevel = 1;
       data[210].$$treeLevel = 1;

       data[240].$$treeLevel = 0;
       data[241].$$treeLevel = 1;
       data[270].$$treeLevel = 1;

       data[300].$$treeLevel = 0;
       data[301].$$treeLevel = 1;
       data[330].$$treeLevel = 1;

       $scope.gridOptions.data = data;
      });

      $scope.expandAll = function(){
        $scope.gridApi.treeBase.expandAllRows();
      };

      $scope.toggleRow = function( rowNum ){
        $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
      };

      $scope.toggleExpandNoChildren = function(){
        $scope.gridOptions.showTreeExpandNoChildren = !$scope.gridOptions.showTreeExpandNoChildren;
        $scope.gridApi.grid.refresh();
      };
}]);
