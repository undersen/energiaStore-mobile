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

      // Platform stuff here.
      // if(StorageUserModel.getCurrentUser()){
      //   if(StorageUserModel.getCurrentUser().token == undefined){
      //     // utilService.deleteStorageData();
      //   }else{
      //     debugger;
      //     $state.go("introduction",{},{ reload: true })
      //   }
      // }else{
      //   // utilService.deleteStorageData();
      // }

      $state.go("introduction",{},{ reload: true })
    });

  }]);
}).call(this);
