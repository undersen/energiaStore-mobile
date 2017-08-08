"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("SettingsController", ["$scope", "$state","$ionicPlatform","$rootScope",
  function($scope, $state,$ionicPlatform,$rootScope) {

  $ionicPlatform.ready(function() {

    $scope.updateUser = function(){

    }

    $scope.changeLanguage = function(){

    }

    $scope.backButton = function(){
        $state.go("dashboard");
    }

    $ionicPlatform.registerBackButtonAction(function () {
      $scope.backButton();
    }, 100);



    });
  }]);
}).call(this);
