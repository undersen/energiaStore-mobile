"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("DashboardController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","Session","StorageUserModel",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,Session,StorageUserModel) {

    $ionicPlatform.ready(function() {

      $scope.goToQuotation = function(){

        $state.go("quotation");

      }


      $scope.goToFactor = function(){

        $state.go("factor");

      }

      $scope.goToSettings = function(){

        $state.go("settings");

      }




      $scope.logOut = function (){
        Session.logout().then(function(){

          debugger;
          StorageUserModel.destroyCurrentUser();

        },function(){

        })
      }


      $ionicPlatform.registerBackButtonAction(function () {
        // ionic.Platform.exitApp();
      }, 100);


    });
  }]);
}).call(this);
