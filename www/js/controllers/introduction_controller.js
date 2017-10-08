"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("IntroductionController", ["$scope", "$state","$ionicPlatform",
  function($scope, $state,$ionicPlatform) {

  $ionicPlatform.ready(function() {

    $scope.goToLogin = function(){

      $state.go("login");

    };

    $ionicPlatform.registerBackButtonAction(function () {
    }, 100);


    });
  }]);
}).call(this);
