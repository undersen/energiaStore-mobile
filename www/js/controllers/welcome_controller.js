"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("WelcomeController", ["$scope", "$state","$ionicPlatform","$rootScope","translationService","$resource",
  function($scope, $state,$ionicPlatform,$rootScope,translationService,$resource) {
  $ionicPlatform.ready(function() {

      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
          $scope.translations = data;
      });

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
