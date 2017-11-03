"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("LoginController", ["$scope", "$state","$ionicPlatform","StorageUserModel","Session","translationService","$resource","$cordovaStatusbar","$ionicLoading","Utils",
  function($scope, $state,$ionicPlatform,StorageUserModel,Session,translationService,$resource,$cordovaStatusbar,$ionicLoading,Utils) {

    $ionicPlatform.ready(function() {

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {
            $scope.translations = data;
        });

        $scope.user ={};

      $scope.goToRegister = function(){
        $state.go("register");
      };


      $scope.login= function (){
        if($scope.user.email === undefined || $scope.user.email === ""){
          Utils.validateToast($scope.translations.LOGIN_EMAIL_EMPTY_ERROR);
          return;
        }

        if($scope.user.password === undefined || $scope.user.password === ""){
          Utils.validateToast($scope.translations.LOGIN_PASSWORD_EMPTY_ERROR);
          return;
        }

        $ionicLoading.show({
          template: `${$scope.translations.LOADING}...`
        });

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
