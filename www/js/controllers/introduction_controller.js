"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("IntroductionController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar) {
  $ionicPlatform.ready(function() {

      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
          $scope.translations = data;
      });

      if (window.StatusBar) {
        $cordovaStatusbar.overlaysWebView(false);
        $cordovaStatusbar.style(1);
        $cordovaStatusbar.styleHex("#1AA55E");
        $cordovaStatusbar.show();
      }

    $scope.goToLogin = function(){

      $state.go("login");

    };

    $ionicPlatform.registerBackButtonAction(function () {
    }, 100);


    });
  }]);
}).call(this);
