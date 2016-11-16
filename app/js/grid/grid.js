'use strict';

angular.module('myApp.grid',
  [
    'ngRoute',
    'ngTouch',
    'ui.grid',
    'ui.grid.pagination',
    'ui.grid.edit',
    'ui.grid.exporter',
    'ui.grid.selection',
    'ui.grid.moveColumns'
  ]
)

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/grid', {
    templateUrl: 'components/grid/grid.html',
    controller: 'gridController'
  });
}])

.controller('gridController',
  [
    '$scope',
    'uiGridConstants',
    '$http',
    '$interval',
    '$q',
      function ($scope, uiGridConstants, $http, $interval, $q){

  var data = [];
  var today = new Date();
  $scope.filter = {
    filterValue:""
  };

  var fakeI18n = function( title ){
    var deferred = $q.defer();
    $interval( function() {
      deferred.resolve( 'col: ' + title );
    }, 1000, 1);
    return deferred.promise;
  };

$scope.gridOptions = {
  //Grid properties
    showGridFooter: true,
    showColumnFooter: true,
    enableFiltering: false,
    paginationPageSizes: [25, 50, 75],
    paginationPageSize: 25,
    exporterMenuCsv: true,
    enableGridMenu: true,
    gridMenuTitleFilter: fakeI18n,
    //coloumn properties
    columnDefs: [
        {
          field: 'name',
          width: '20%',
          displayName:'Employee name',
          headerCellClass: 'blue',
          enableHiding: false
        },
        {
          field: 'address.street',
          aggregationType: uiGridConstants.aggregationTypes.sum,
          width: '15%'
        },
        {
          field: 'age',
          aggregationType: uiGridConstants.aggregationTypes.avg,
          aggregationHideLabel: true,
          width: '13%'
        },
        {
          field:'balance',
          displayName:'Account balance',
          width:'15%',
          cellTooltip:
            function( row, col ) {
                return 'Emp Name: ' + row.entity.name + ' Balance: ' + row.entity.balance;
            },
          headerTooltip:
            function( col ) {
                return 'Header: ' + col.displayName;
            }
        },
        {
           name: 'customCellTemplate',
           field: 'age',
           width: '20%',
           footerCellTemplate:
               '<div class="ui-grid-cell-contents"'+
                  'style="background-color: Red;color: White">'+
                  'custom template'+
                '</div>'
         },
        {
          name: 'registered',
          field: 'registered',
          width: '20%',
          cellFilter: 'date',
          footerCellFilter: 'date',
          aggregationType: uiGridConstants.aggregationTypes.avg,
          enableCellEdit:false
        },
        {
          field: 'gender',
          width:'15%'
        }
    ],
    data: data,
    onRegisterApi: function( gridApi ){
      $scope.gridApi = gridApi;
      $scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 );
      // interval of zero just to allow the directive to have initialized
      $interval( function() {
        gridApi.core.addToGridMenu( gridApi.grid, [{ title: 'Dynamic item', order: 100}]);
      }, 0, 1);

      gridApi.core.on.columnVisibilityChanged( $scope, function( changedColumn ){
        $scope.columnChanged = {
          name: changedColumn.colDef.name,
          visible: changedColumn.colDef.visible
        };
      });
    }
};

//toggle button state changing manually
$scope.toggleFooter = function() {
  $scope.gridOptions.showGridFooter = !$scope.gridOptions.showGridFooter;
  $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
};

$scope.toggleColumnFooter = function() {
  $scope.gridOptions.showColumnFooter = !$scope.gridOptions.showColumnFooter;
  $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
};

$scope.selectAll = function() {
  $scope.gridApi.selection.selectAllRows();
};

$scope.clearAll = function() {
  $scope.gridApi.selection.clearSelectedRows();
};

//fetching data from server side.
$http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
  });


$scope.getFilteredData = function() {
  $scope.gridApi.grid.refresh();
};

$scope.singleFilter = function( renderableRows ){
  var filterInput = $scope.filter.filterValue;
  filterInput = filterInput.replace(/[&\/\\#+()$~%'":*?<>{}]/g, '');
  var matcher = new RegExp(filterInput);

  renderableRows.forEach( function( row ) {
    var match = false;
    [ 'name', 'balance','gender' ].forEach(function( field ){
      if ( row.entity[field].match(matcher) ){
        match = true;
      }
    });
    if ( !match ){
      row.visible = false;
    }
  });
  return renderableRows;
};

}]);
