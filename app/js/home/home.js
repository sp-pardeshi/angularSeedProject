'use strict';

angular.module('myApp.home', ['ngRoute','ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'components/home/home.html',
    controller: 'homeController'
  });
}])

.factory('$remember', function() {
            function fetchValue(name) {
                var gCookieVal = document.cookie.split("; ");
                for (var i=0; i < gCookieVal.length; i++)
                {
                    // a name/value pair (a crumb) is separated by an equal sign
                    var gCrumb = gCookieVal[i].split("=");
                    if (name === gCrumb[0])
                    {
                        var value = '';
                        try {
                            value = angular.fromJson(gCrumb[1]);
                        } catch(e) {
                            value = unescape(gCrumb[1]);
                        }
                        return value;
                    }
                }
                // a cookie with the requested name does not exist
                return null;
            }
            return function(name, values) {
                if(arguments.length === 1) return fetchValue(name);
                var cookie = name + '=';
                if(typeof values === 'object') {
                    var expires = '';
                    cookie += (typeof values.value === 'object') ? angular.toJson(values.value) + ';' : values.value + ';';
                    if(values.expires) {
                        var date = new Date();
                        date.setTime( date.getTime() + (values.expires * 24 *60 * 60 * 1000));
                        expires = date.toGMTString();
                    }
                    cookie += (!values.session) ? 'expires=' + expires + ';' : '';
                    cookie += (values.path) ? 'path=' + values.path + ';' : '';
                    cookie += (values.secure) ? 'secure;' : '';
                } else {
                    cookie += values + ';';
                }
                document.cookie = cookie;
            }
    })


.controller('homeController', ['$scope','$cookies','$window','$remember', function($scope,$cookies,$window,$remember) {
  $scope.user = {
    "Email" : "",
    "Password" : ""
  };
  $scope.remember = false;

  if ($remember('username') && $remember('password') ) {
            $scope.remember = true;
            $scope.user = {
              "Email" : $remember('username'),
              "Password" : $remember('password')
            };
  }

    $scope.rememberMe = function() {
    $scope.remember=!$scope.remember;
    console.log("remember me function called");
    console.log("$scope.remember :: "+$scope.remember);

            if ($scope.remember) {
                $remember('username', $scope.user.Email);
                $remember('password', $scope.user.Password);
            } else {
                $remember('username', '');
                $remember('password', '');
            }
    };

   $scope.submitLoginForm = function(){
          var email = $scope.user.Email;
          var password = $scope.user.Password;
          $cookies.put('email',email);
          $window.location.reload();
  };
}]);
