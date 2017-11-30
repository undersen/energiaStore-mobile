"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("SettingsController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","$timeout","StorageUserModel","StorageLanguageModel","$ionicPopup","$cordovaActionSheet","StorageStatus","StorageProject","StorageMotor","StorageQuotation","$ionicModal",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,StorageUserModel,StorageLanguageModel,$ionicPopup,$cordovaActionSheet,StorageStatus,StorageProject,StorageMotor,StorageQuotation,$ionicModal) {

    $scope.user = StorageUserModel.getCurrentUser();

    $ionicPlatform.ready(function() {

      if (window.StatusBar) {
        $cordovaStatusbar.overlaysWebView(false);
        $cordovaStatusbar.style(1);
        switch (StorageUserModel.getCurrentUser().type_user) {
          case 'explorer':
          $cordovaStatusbar.styleHex("#62BED4");
          break;
          case 'user':
          $cordovaStatusbar.styleHex("#62D485");
          break;

          case 'partner':
          $cordovaStatusbar.styleHex("#F5A623");
          break;
          default:

        }
        $cordovaStatusbar.show();
      }

      // $scope.chooseLanguage = function(_language){
      //   StorageLanguageModel.setCurrentLanguage(_language);
      //   $resource(translationService.getTranslation()).get(function (data) {
      //       $scope.translations = data;

      //         $scope.deleteData()
      //       }}];
      //   });
      //
      //   $ionicSlideBoxDelegate.enableSlide(false);
      //
      // }

      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
        $scope.translations = data;
        $scope.options = { title: $scope.translations.CHOOSE_LANGUAGE_TEXT, buttonLabels: [$scope.translations.CHOOSE_LANGUAGE_ENGLISH,$scope.translations.CHOOSE_LANGUAGE_SPANISH], addCancelButtonWithLabel: $scope.translations.CHOOSE_LANGUAGE_CANCEL, androidEnableCancelButton: true, winphoneEnableCancelButton: true };
        $scope.button_exit_lesson = [{ text: $scope.translations.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function(e) {
        }}]
        // $scope.init();
      });



      $scope.chooseCountry = function(country){
        $state.go('introduction')
      }
      $scope.goToProfile =  function(){
        $state.go('profile')
      }
      $scope.chooseLanguaje =  function(){
        $scope.showLanguageOptions();
      }
      $scope.chooseCountry =  function(){

      }
      $scope.goToTutorials =  function(){
        $state.go('tutorials')
      }

      $scope.goBack = function(){
        $state.go('dashboard');
      }

      $scope.FAQ =  function(){
        $scope.workingOnPopUp();
      }


      // $scope.logOut =  function(){
      //
      // }

      $scope.logOut = function (){

          var myPopup = $ionicPopup.show({
            animation: 'fade-in',
            title: '<img src="./img/logout.png" class="img-about-us">',
            subTitle: '<span class="popup-title">Salir de energiaStore</span>',
            template: '<p class="popup-subtitle">¿Estas seguro que deseas cerrar sesión?',
            scope: $scope,
            buttons: [
              { text: 'Cancelar',
              type: 'button-cancel'
            },
            {
              text: 'Salir',
              type: 'button-afirmative',
              onTap: function(e) {
                $scope.deleteData();
              }
            }
          ]
          });
        };


      $scope.workingOnPopUp = function(){
        var myPopup = $ionicPopup.show({
          animation: 'fade-in',
          title: '<img src="./img/working-on.png" class="img-about-us">',
          subTitle: '<span class="popup-title">Ups!</span>',
          template: '<p class="popup-subtitle">Esta sección aun esta en desarrollo, vuelve pronto',
          scope: $scope,
          buttons: [
            {
              text: 'Entendido',
              type: 'button-afirmative',
              onTap: function(e) {
                // $state.go('middleware')
              }
            }]
        });
      }


      $scope.aboutUs = function(){

        var myPopup = $ionicPopup.show({
          animation: 'fade-in',
          title: '<img src="./img/logo.png" class="img-about-us">',
          subTitle: '<span class="popup-title">EnergiaStore</span>',
          template: '<p class="popup-subtitle">Todos los derechos reservados 2017 ',
          scope: $scope,
          buttons: [
            {
              text: 'Entendido',
              type: 'button-afirmative',
              onTap: function(e) {
                // $state.go('middleware')
              }
            }
          ]
        });
      }


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
        StorageStatus.destroyStatus();
        StorageProject.destroyProjects();
        StorageMotor.destroyMotors();
        StorageQuotation.destroyQuotation();
        setTimeout(function () {
          $state.go("welcome")
        }, 100);
      };



      $ionicModal.fromTemplateUrl('modal-choose-country', {
        scope: $scope,
        animation: 'slide-in-up'

      }).then(function(modal) {
        $scope.modalChooseCountry = modal;
        $scope.modalChooseCountry.hardwareBackButtonClose = false;
      });


      $scope.openModalChooseCountry = function() {
        $scope.modalChooseCountry.show();
      };
      $scope.closeModalChooseCountry = function() {
        $scope.modalChooseCountry.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modalChooseCountry.remove();
      });
      // Execute action on hide modal
      $scope.$on('modalChooseCountry.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modalChooseCountry.removed', function() {
        // Execute action
      });


      $scope.chooseCountry = function(){
        $scope.closeModalChooseCountry();
      }

    });
  }]);
}).call(this);
