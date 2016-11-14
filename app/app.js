'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.home',
  'myApp.contact',
  'myApp.charts'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])

.controller('myAppCtrl',['$scope','$rootScope','$location','$cookies','$window','$timeout',function($scope,$rootScope,$location,$cookies,$window,$timeout){
  $rootScope.userName = $cookies.get('email');
  console.log("current logged userName :: " + $scope.userName);

  $scope.isThisMobileDevice = function() {
      isThisMobileDevice();
  }

  $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

  if (!$rootScope.userName) {
    $rootScope.menuContent = [
      {tabName:'/home',tabUrl:'#/home',iconName:'glyphicon glyphicon-home menuIcon',tabVal:'Home'}
    ];
  }else {
    $rootScope.menuContent = [
      {tabName:'/home',tabUrl:'#/home',iconName:'glyphicon glyphicon-home menuIcon',tabVal:'Home'},
      {tabName:'/contact',tabUrl:'#/contact',iconName:'glyphicon glyphicon-phone-alt menuIcon',tabVal:'Contact Us'},
      {tabName:'/charts',tabUrl:'#/charts',iconName:'glyphicon glyphicon-stats menuIcon',tabVal:'charts'}
    ];
  }

  $scope.UserLogout = function(){
    $cookies.remove('email');
    console.log("user logged out");
    $rootScope.userName = undefined;
    $scope.logoutMsg = "User logged out successfully."
    $window.location.reload();
    //Show suceess message for only 2 seconds
    $scope.isShowLogoutMessage = true;
    $timeout(function() {
          $scope.isShowLogoutMessage = false;
    },2000);
  }

  $scope.onMenuClick = function(){
    console.log("called hide function");
    if(isThisMobileDevice()){
      $("#wrapper").toggleClass("toggled");
    }
  }

  $scope.openUserDetailsPopover = function(){
      $('.userDetailsPopover').popover({html:true});
  }

}]);
