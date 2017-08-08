"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("LoginController", ["$scope", "$state","$ionicPlatform","StorageUserModel","Session",
  function($scope, $state,$ionicPlatform,StorageUserModel,Session) {

    $scope.user ={};

    $ionicPlatform.ready(function() {

      $scope.goToRegister = function(){

        $state.go("register");

      }


      $scope.login= function (){

        if($scope.user.email == undefined || $scope.user.email == ""){

          return;
        }

        if($scope.user.password == undefined || $scope.user.password == ""){

          return;
        }

        Session.login($scope.user).then(function(_response){
          debugger;
          StorageUserModel.setCurrentUser(_response.data);
          $state.go("dashboard")
        },function(_error){
          Materialize.toast("",4000);
          return;

        })

      }

      $ionicPlatform.registerBackButtonAction(function () {
        
      }, 100);


    });
  }]);
}).call(this);
