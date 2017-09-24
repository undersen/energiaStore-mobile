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
          Materialize.toast("Complete correo",4000);
          return;
        }

        if($scope.user.password == undefined || $scope.user.password == ""){
          Materialize.toast("Complete contraseña",4000);
          return;
        }

        Session.login($scope.user).then(function(_response){
          debugger;
          StorageUserModel.setCurrentUser(_response.data);
          $state.go("dashboard")
        },function(_error){
          Materialize.toast("Usuario incorrecto",4000);
          return;

        })

      }

      $ionicPlatform.registerBackButtonAction(function () {

      }, 100);


    });
  }]);
}).call(this);
