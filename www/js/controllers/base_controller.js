"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("BaseController", ["$scope", "$state","$ionicPlatform","StorageUserModel","$resource","translationService",
  function($scope, $state,$ionicPlatform,StorageUserModel,$resource,translationService) {

    $ionicPlatform.ready(function() {

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {
            $scope.translations = data;
        });


      if(StorageUserModel.getCurrentUser()){
        if(StorageUserModel.getCurrentUser().authentication_token === undefined){
          $state.go("introduction",{},{ reload: true })
        }else{
          $state.go("dashboard",{},{ reload: true })
        }
      }else{
        $state.go("welcome",{},{ reload: true })
      }
    });
  }]);
}).call(this);
