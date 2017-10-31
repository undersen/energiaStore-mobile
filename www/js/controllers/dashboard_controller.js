"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("DashboardController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","Session","StorageUserModel","popUpService","translationService","$resource","$ionicPopover","$cordovaActionSheet","$cordovaStatusbar","StorageLanguageModel","$ionicPopup","IonicClosePopupService",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,Session,StorageUserModel,popUpService,translationService,$resource,$ionicPopover,$cordovaActionSheet,$cordovaStatusbar,StorageLanguageModel,$ionicPopup,IonicClosePopupService) {

    $ionicPlatform.ready(function() {


      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
        $scope.translations = data;
      });
      if (window.StatusBar) {
        $cordovaStatusbar.overlaysWebView(false);
        $cordovaStatusbar.style(1);
        $cordovaStatusbar.styleHex("#1AA55E");
        $cordovaStatusbar.show();
      }


      let user = StorageUserModel.getCurrentUser();

      $scope.init = function (){

        if(user.email === undefined){
          popUpService.showPopUpWelcome();
        }
      };

      $scope.goToQuotation = function(){$state.go("calculation");};

      $scope.goToFactor = function(){$state.go("factor");};

      // $scope.goToSettings =

      $ionicPlatform.registerBackButtonAction(function () {

        if($ionicPopover.isShown()){
          $ionicPopover.hide()
        }else{
          ionic.Platform.exitApp();
        }

      }, 100);


      $scope.logOut = function (){

        let button_exit_lesson = [{ text: $scope.translations.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function(e) {
            $scope.deleteData()
        }}];

        let logoutPopUp = $ionicPopup.show({
            title: '<div class="congrats"></div><img src="img/special_icons/pulgar3_bad.png" class="modal-img-config">',
            subTitle: `<br><span class="modal-title-config">${$scope.translations.MODAL_LOGOUT_TITLE}</span><br><span class="modal-body-config">${$scope.translations.MODAL_LOGOUT_TEXT}</span>`,
            cssClass: 'successClass',
            buttons:button_exit_lesson,
        })
        IonicClosePopupService.register(logoutPopUp);
      };


      $ionicPopover
      .fromTemplateUrl("my-popover.html", { scope: $scope })
      .then(function(popover) {
        $scope.popover = popover;
      });
      $scope.openPopover = function($event) {
        $scope.popover.show($event);
      };
      $scope.closePopover = function() {
        $scope.popover.hide();
      };
      //Cleanup the popover when we're done with it!
      $scope.$on("$destroy", function() {
        $scope.popover.remove();
      });
      // Execute action on hidden popover
      $scope.$on("popover.hidden", function() {
        // Execute action
      });
      // Execute action on remove popover
      $scope.$on("popover.removed", function() {
        // Execute action
      });


      $scope.chooseLanguage = function(){
        $scope.closePopover();
        $scope.showLanguageOptions();
      }

      $scope.settings = function() {
        $scope.closePopover();
        $state.go("settings");
      };



      var options = { title: "Seleccione idioma", buttonLabels: ["Ingles", "Español"], addCancelButtonWithLabel: "Cancelar", androidEnableCancelButton: true, winphoneEnableCancelButton: true };

      if (window.cordova){
        $scope.showLanguageOptions = function(){
          $cordovaActionSheet
          .show(options)
          .then(function(btnIndex) {
            var index = btnIndex;

            switch (index) {
              case 1:
              StorageLanguageModel.setCurrentLanguage('es');
              break;

              case 2:
              StorageLanguageModel.setCurrentLanguage('en');
              break;
            }

            StorageLanguageModel.getCurrentLanguage()

            const languageFilePath = translationService.getTranslation();
            $resource(languageFilePath).get(function(data) {
              $scope.translations = data;
            });
          });
        }
      }

      $scope.deleteData= function (){
          StorageUserModel.destroyCurrentUser();
          $state.go("login")
      };

    });
  }]);
}).call(this);
