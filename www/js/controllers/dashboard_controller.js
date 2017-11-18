"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("DashboardController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","Session","StorageUserModel","popUpService","translationService","$resource","$ionicPopover","$cordovaActionSheet","$cordovaStatusbar","StorageLanguageModel","$ionicPopup","IonicClosePopupService","StorageStatus","StorageProject","StorageMotor","StorageQuotation",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,Session,StorageUserModel,popUpService,translationService,$resource,$ionicPopover,$cordovaActionSheet,$cordovaStatusbar,StorageLanguageModel,$ionicPopup,IonicClosePopupService,StorageStatus,StorageProject,StorageMotor,StorageQuotation) {

    $ionicPlatform.ready(function() {


      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
        $scope.translations = data;
        $scope.options = { title: $scope.translations.CHOOSE_LANGUAGE_TEXT, buttonLabels: [$scope.translations.CHOOSE_LANGUAGE_ENGLISH,$scope.translations.CHOOSE_LANGUAGE_SPANISH], addCancelButtonWithLabel: $scope.translations.CHOOSE_LANGUAGE_CANCEL, androidEnableCancelButton: true, winphoneEnableCancelButton: true };
        $scope.init();
      });
      if (window.StatusBar) {
        $cordovaStatusbar.overlaysWebView(false);
        $cordovaStatusbar.style(1);
        $cordovaStatusbar.styleHex("#1AA55E");
        $cordovaStatusbar.show();
      }


      let user = StorageUserModel.getCurrentUser();

      $scope.user = StorageUserModel.getCurrentUser();

      $scope.init = function (){

        if(user.type_user === 'explorer'){

          if(StorageStatus.getStatus() === undefined){
          popUpService.showPopUpExplorer($scope.translations).then(function(_response){

            StorageStatus.setStatus({status:true});

          });
        }
        }else{
          if(user.email === undefined){

            popUpService.showPopUpWelcome($scope.translations);
          }
        }
      };

      $scope.goToQuotation = function(){$state.go("project");};

      $scope.goToFactor = function(){$state.go("factor");};

      // $scope.goToSettings =

      $ionicPlatform.registerBackButtonAction(function () {


        ionic.Platform.exitApp();
      }, 100);


      $scope.logOut = function (){
        $scope.popover.hide();
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
        $scope.popover.hide();
        setTimeout(function () {
          $state.go("settings")
        }, 100);
      };

      if (window.cordova){
        $scope.showLanguageOptions = function(){
          $cordovaActionSheet
          .show($scope.options)
          .then(function(btnIndex) {
            switch (btnIndex) {
              case 1:
              StorageLanguageModel.setCurrentLanguage('en');
              break;

              case 2:
              StorageLanguageModel.setCurrentLanguage('es');
              break;
            }

            StorageLanguageModel.getCurrentLanguage()

            const languageFilePath = translationService.getTranslation();
            $resource(languageFilePath).get(function(data) {
              $scope.translations = data;
              $scope.options = { title: $scope.translations.CHOOSE_LANGUAGE_TEXT, buttonLabels: [$scope.translations.CHOOSE_LANGUAGE_ENGLISH,$scope.translations.CHOOSE_LANGUAGE_SPANISH], addCancelButtonWithLabel: $scope.translations.CHOOSE_LANGUAGE_CANCEL, androidEnableCancelButton: true, winphoneEnableCancelButton: true };
            });
          });
        }
      }

      $scope.deleteData= function (){
        StorageUserModel.destroyCurrentUser();


        setTimeout(function () {
          $state.go("login")
        }, 100);

      };


      $scope.exitExplorer = function(){

        popUpService.showPopUpExitExplorer($scope.translations).then(function(_response){

          StorageStatus.destroyStatus();
          StorageProject.destroyProjects();
          StorageMotor.destroyMotors();
          StorageQuotation.destroyQuotation();
          StorageUserModel.destroyCurrentUser();

          $scope.popover.hide();

          setTimeout(function () {
            $state.go("login");
          }, 100);

        },function(_error){
          $scope.popover.hide();
        })



      }

    });
  }]);
}).call(this);
