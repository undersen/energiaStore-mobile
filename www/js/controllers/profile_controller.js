"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("ProfileController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar) {
    $ionicPlatform.ready(function() {

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {
            $scope.translations = data;
        });






    });
  }]);
}).call(this);
