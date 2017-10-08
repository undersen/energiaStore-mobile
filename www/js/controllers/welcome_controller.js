"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("WelcomeController", ["$scope", "$state","$ionicPlatform","$rootScope",
  function($scope, $state,$ionicPlatform,$rootScope) {

  $ionicPlatform.ready(function() {

    $scope.spanish = function(){
      $rootScope.lang = "en";
      $scope.goToSlide()
    };

    $scope.english = function(){
      $rootScope.lang = "es";
        $scope.goToSlide()
    };


    $scope.goToSlide = function(){
      $state.go('introduction',{reload:true})
    };

    $ionicPlatform.registerBackButtonAction(function () {
      ionic.Platform.exitApp();
    }, 100);




    });
  }]);
}).call(this);
