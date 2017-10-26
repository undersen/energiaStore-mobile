"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("WelcomeController", ["$scope", "$state","$ionicPlatform","$rootScope","translationService","$resource","popUpService","StorageLanguageModel","$cordovaStatusbar",
  function($scope, $state,$ionicPlatform,$rootScope,translationService,$resource,popUpService,StorageLanguageModel,$cordovaStatusbar) {
  $ionicPlatform.ready(function() {

    $scope.translations = {};

    if (window.StatusBar) {
      $cordovaStatusbar.overlaysWebView(false);
      $cordovaStatusbar.style(0);
      $cordovaStatusbar.hide();
    }


    $scope.chooseLanguage = function(_language = 'es'){

        StorageLanguageModel.setCurrentLanguage(_language);
        $resource(translationService.getTranslation()).get(function (data) {

            $scope.translations = data;
            $scope.popUpLanguage();

        });

    };



    $scope.popUpLanguage = function(){
        popUpService.showPopUpWelcomeLanguage($scope.translations).then(function(_response){
            $state.go('introduction');

        })


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
