"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("IntroductionController", ["$scope", "$state","$ionicPlatform","$resource","translationService",
  function($scope, $state,$ionicPlatform,$resource,translationService) {
  $ionicPlatform.ready(function() {

      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
          $scope.translations = data;
      });

    $scope.goToLogin = function(){

      $state.go("login");

    };

    $ionicPlatform.registerBackButtonAction(function () {
    }, 100);


    });
  }]);
}).call(this);
