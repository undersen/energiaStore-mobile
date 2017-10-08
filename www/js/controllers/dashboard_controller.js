"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("DashboardController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","Session","StorageUserModel","popUpService","translationService","$resource",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,Session,StorageUserModel,popUpService,translationService,$resource) {

    $ionicPlatform.ready(function() {


        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {
            $scope.translations = data;
        });


      let user = StorageUserModel.getCurrentUser();

      $scope.init = function (){

        if(user.email === undefined){
            popUpService.showPopUpWelcome();
        }
      };

      $scope.goToQuotation = function(){$state.go("quotation");};

      $scope.goToFactor = function(){$state.go("factor");};

      $scope.goToSettings = function(){$state.go("settings");};










      $ionicPlatform.registerBackButtonAction(function () {
        // ionic.Platform.exitApp();
      }, 100);


    });
  }]);
}).call(this);
