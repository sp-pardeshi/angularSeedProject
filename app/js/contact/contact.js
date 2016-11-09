'use strict';

angular.module('myApp.contact', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'components/contact/contact.html',
    controller: 'contactController'
  });
}])

.controller('contactController', function($scope,$rootScope,$timeout) {
  var custArr = [];
  //Check if global array is not empty, if it is then add glabal array element to local array.
  if($rootScope.CustomerContactDetails != undefined){
    custArr = $rootScope.CustomerContactDetails;
  }

  //This function adds the customer details to global array.
  $scope.submitContactForm = function(){
    //push to local array
    custArr.push($scope.cust);
    //set local array data to global array.
    $rootScope.CustomerContactDetails=custArr;
    //flush cust object data.
    $scope.cust = null;
    //set form data prestine to does not show error on form due to null value of cust object
    $scope.contactForm.$setPristine();
    $scope.contactForm.$setUntouched();
    $scope.msg = "Query submitted successfully."
    //Show suceess message for only 3 seconds
    $scope.isShowSucessMessage = true;
    $timeout(function() {
          $scope.isShowSucessMessage = false;
    },3000);
  }

  //reset the form field data.And does not display any error message on form
  $scope.resetFormData = function(){
      //set all properties under object to null or empty
      $scope.cust = {
        "Name":"",
        "Email":"",
        "Subject":"",
        "Msg":""
      };
    //set form data prestine to does not show error on form due to null value of cust object
    $scope.contactForm.$setPristine();
  }
});
