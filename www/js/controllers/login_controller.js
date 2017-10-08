"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("LoginController", ["$scope", "$state","$ionicPlatform","StorageUserModel","Session","translationService","$resource",
  function($scope, $state,$ionicPlatform,StorageUserModel,Session,translationService,$resource) {


      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
          $scope.translations = data;
      });

    $scope.user ={};

    $ionicPlatform.ready(function() {

      $scope.goToRegister = function(){

        $state.go("register");

      };


      $scope.login= function (){

        if($scope.user.email === undefined || $scope.user.email === ""){
          Materialize.toast($scope.translations.login_email_empty_error,4000);
          return;
        }

        if($scope.user.password === undefined || $scope.user.password === ""){
          Materialize.toast($scope.translations.login_password_empty_error,4000);
          return;
        }

        Session.login($scope.user).then(function(_response){
          StorageUserModel.setCurrentUser(_response.data);
          $state.go("dashboard")
          console.log(_response)
        },function(_error){
          Materialize.toast($scope.translations.login_error,4000);
          console.log(_error)

        })

      };

      $ionicPlatform.registerBackButtonAction(function () {

      }, 100);


    });
  }]);
}).call(this);
