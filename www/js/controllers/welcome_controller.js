"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("WelcomeController", ["$scope", "$state","$ionicPlatform","$rootScope","translationService","$resource","popUpService","StorageLanguageModel",
  function($scope, $state,$ionicPlatform,$rootScope,translationService,$resource,popUpService,StorageLanguageModel) {
  $ionicPlatform.ready(function() {

    $scope.translations = {};


    $scope.chooseLanguage = function(_language = 'es'){

        StorageLanguageModel.setCurrentLanguage(_language);
        $resource(translationService.getTranslation()).get(function (data) {

            $scope.translations = data;
            $scope.popUpLanguage();

        });

    };



    $scope.popUpLanguage = function(){
        popUpService.showPopUpWelcomeLanguage($scope.translations).then(function(_response){

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
