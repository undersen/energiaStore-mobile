"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("DashboardController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","Session","StorageUserModel","$ionicPopup",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,Session,StorageUserModel,$ionicPopup) {

    $ionicPlatform.ready(function() {

      let user = StorageUserModel.getCurrentUser();

      $scope.init = function (){

        if(user.email == undefined){

          $scope.showpopUpAccount();


        }

      }

      $scope.goToQuotation = function(){

        $state.go("quotation");

      }


      $scope.goToFactor = function(){

        $state.go("factor");

      }

      $scope.goToSettings = function(){

        $state.go("settings");

      }



      $scope.showpopUpAccount = function(){

          let button_exit_lesson = [{ text: 'Vamos alla',  type: 'button-special',onTap: function(e) {
            $state.go("settings");
          }}]


          $ionicPopup.show({
            title: '<div class="congrats"></div><img src="img/special_icons/bandera1.png" class="modal-img-config">',
            subTitle: '<br><span class="modal-body-config">Bienvendio a EnergiaStore, comencemos completando tu perfil con tu infromacion basica.</span>',
            cssClass: 'successClass',
            buttons:button_exit_lesson,
          })
    }






      $ionicPlatform.registerBackButtonAction(function () {
        // ionic.Platform.exitApp();
      }, 100);


    });
  }]);
}).call(this);
