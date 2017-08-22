"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("MotorsController", ["$scope", "$state","$ionicPlatform","Calculation","StorageUserModel",
  function($scope, $state,$ionicPlatform,Calculation,StorageUserModel) {
    $ionicPlatform.ready(function() {


      $scope.init = function(){
debugger;
        Calculation.getByIndex($state.params.id_quotation,StorageUserModel.getCurrentUser()).then(function(_response){
debugger;




        },function(_error){
          debugger;
        })
      }




    });
  }]);
}).call(this);
