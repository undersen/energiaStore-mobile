"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("FinalizedQuotationController", ["$scope", "$state","$ionicPlatform","StorageUserModel","Session","translationService","$resource","$cordovaStatusbar","$ionicLoading","Utils",
  function($scope, $state,$ionicPlatform,StorageUserModel,Session,translationService,$resource,$cordovaStatusbar,$ionicLoading,Utils) {

    $ionicPlatform.ready(function() {
      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
          $scope.translations = data;
      });


    });
  }]);
}).call(this);
