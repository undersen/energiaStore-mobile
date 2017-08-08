"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("BaseController", ["$scope", "$state","$ionicPlatform","StorageUserModel",
  function($scope, $state,$ionicPlatform,StorageUserModel) {

    $ionicPlatform.ready(function() {
      if(StorageUserModel.getCurrentUser()){
        if(StorageUserModel.getCurrentUser().authentication_token == undefined){
          $state.go("introduction",{},{ reload: true })
        }else{
          $state.go("dashboard",{},{ reload: true })
        }
      }else{
        $state.go("introduction",{},{ reload: true })
      }
    });
  }]);
}).call(this);
