"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("ProfileController", ["$scope", "$state","$ionicPlatform","$resource","translationService",
  function($scope, $state,$ionicPlatform,$resource,translationService) {
    $ionicPlatform.ready(function() {

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {
            $scope.translations = data;
        });






    });
  }]);
}).call(this);
