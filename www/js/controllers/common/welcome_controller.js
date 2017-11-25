"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("WelcomeController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","$timeout","StorageUserModel","StorageLanguageModel",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,StorageUserModel,StorageLanguageModel) {
    $ionicPlatform.ready(function() {



      $scope.chooseLanguage = function(_language){
        StorageLanguageModel.setCurrentLanguage(_language);
        $resource(translationService.getTranslation()).get(function (data) {
            $scope.translations = data;
            $ionicSlideBoxDelegate.next();
        });


      }
      $scope.chooseCountry = function(country){
        debugger;
        $state.go('introduction')
      }



    });
  }]);
}).call(this);
