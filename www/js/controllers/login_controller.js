"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("LoginController", ["$scope", "$state","$ionicPlatform",
  function($scope, $state,$ionicPlatform) {

  $ionicPlatform.ready(function() {

    $scope.goToRegister = function(){

      $state.go("register");

    }


$scope.login= function (){

  $state.go("dashboard");

}




    });
  }]);
}).call(this);
