"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("LoginController", ["$scope", "$state","$ionicPlatform","StorageUserModel","Session","translationService","$resource","$cordovaStatusbar","$ionicLoading",
  function($scope, $state,$ionicPlatform,StorageUserModel,Session,translationService,$resource,$cordovaStatusbar,$ionicLoading) {

    $ionicPlatform.ready(function() {

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {

            $scope.translations = data;
            console.log($scope.translations);
        });

        $scope.user ={};

      $scope.goToRegister = function(){

        $state.go("register");

      };


      $scope.login= function (){

        $ionicLoading.show({
          templateUrl:"loading.html",
        });

        if($scope.user.email === undefined || $scope.user.email === ""){
          Materialize.toast($scope.translations.LOGIN_EMAIL_EMPTY_ERROR,4000);
          return;
        }

        if($scope.user.password === undefined || $scope.user.password === ""){
          Materialize.toast($scope.translations.LOGIN_PASSWORD_EMPTY_ERROR,4000);
          return;
        }

        Session.login($scope.user).then(function(_response){
          StorageUserModel.setCurrentUser(_response.data);
          $state.go("dashboard");
          console.log(_response);
          $ionicLoading.hide();
        },function(_error){
          Materialize.toast($scope.translations.LOGIN_ERROR,4000);
          console.error(_error);
          $ionicLoading.hide();
        })
      };

      $ionicPlatform.registerBackButtonAction(function () {

      }, 100);


    });
  }]);
}).call(this);
