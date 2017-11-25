"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("MiddlewareController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","$timeout","StorageUserModel",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,StorageUserModel) {
    $ionicPlatform.ready(function() {





      $scope.handleGoTo = function(_index){

        switch (_index) {
          case 1:
            $state.go("userLogin");
          break;

          case 2:
            $state.go("PartnerLogin");
          break;

          case 3:

          StorageUserModel.setCurrentUser({
            type_user:'explorer'
          });
          $state.go("dashboard");

          break;
          default:
        }
      }


      $scope.getHelp = function(){
        $state.go('tutorialTypeUser');
      }



    });
  }]);
}).call(this);
