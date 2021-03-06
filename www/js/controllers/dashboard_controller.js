"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("DashboardController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","Session","StorageUserModel","popUpService","translationService","$resource","$ionicPopover","$cordovaActionSheet","$cordovaStatusbar","StorageLanguageModel","$ionicPopup","IonicClosePopupService","StorageStatus","StorageProject","StorageMotor","StorageQuotation","User","$ionicModal","$ionicLoading",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,Session,StorageUserModel,popUpService,translationService,$resource,$ionicPopover,$cordovaActionSheet,$cordovaStatusbar,StorageLanguageModel,$ionicPopup,IonicClosePopupService,StorageStatus,StorageProject,StorageMotor,StorageQuotation,User,$ionicModal,$ionicLoading) {

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
      $scope.register = {};
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

      $scope.goToProject = function(){$state.go("project");};

      $scope.goToPenaltyEnergyEffiency = function(){$state.go("factor");};

      $scope.goToQuotes = function(){$state.go("quotation");};

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
          subTitle: `<br><span class="modal-title-config">${$scope.translations.MODAL_LOGOUT_TITLE}</span><br><span class="modal-body-subtitle">${$scope.translations.MODAL_LOGOUT_TEXT}</span>`,
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

          if(_response === true){
              $scope.popover.hide();
          }else{
            StorageStatus.destroyStatus();
            StorageProject.destroyProjects();
            StorageMotor.destroyMotors();
            StorageQuotation.destroyQuotation();
            StorageUserModel.destroyCurrentUser();

            $scope.popover.hide();

            setTimeout(function () {
              $state.go("login");
            }, 100);
          }
        },function(_error){

        })
      }


      $scope.goToProfile =  function(){
        if(StorageUserModel.getCurrentUser().type_user === 'explorer'){
          $scope.openModalRegister();
        }else{
          $state.go("settings");
        }
      }

      $scope.goToProjects =  function(){
          $state.go("project");
      }



      $scope.registerUser = function (){

        $ionicLoading.show({
          template: `${$scope.translations.LOADING}...`
        });
        User.registerUser($scope.register).then(function(_response){

          StorageUserModel.setCurrentUser(_response.data);
          setTimeout(function () {
            $ionicLoading.hide();
            $ionicSlideBoxDelegate.slide(1)
          }, 2000);

        },function(_error){
          $ionicLoading.hide();
          console.error(_error)

        })
      };



      $ionicModal.fromTemplateUrl('modal-register', {
        scope: $scope,
        animation: 'slide-in-up'

      }).then(function(modal) {
        $scope.modalRegister = modal;
        $scope.modalRegister.hardwareBackButtonClose = false;
      });


      $scope.openModalRegister = function() {
        $scope.modalRegister.show();
      };
      $scope.closeModalRegister = function() {
        $scope.modalRegister.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modalRegister.remove();
      });
      // Execute action on hide modal
      $scope.$on('modalRegister.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modalRegister.removed', function() {
        // Execute action
      });




      $scope.validateSlider1 =function(){

        if ($scope.register.email === undefined || $scope.register.email === ''){
          Utils.validateToast($scope.translations.REGISTER_EMAIL_EMPTY_ERROR);
          return;
        }

        if ($scope.register.password === undefined || $scope.register.password === ''){
          Utils.validateToast($scope.translations.REGISTER_PASSWORD_EMPTY_ERROR);
          return;
        }

        if ($scope.register.password_confirmation === undefined || $scope.register.password_confirmation === ''){
          Utils.validateToast($scope.translations.REGISTER_PASSWORD_CONFIRMATION_EMPTY_ERROR);
          return;
        }

        if ($scope.register.password_confirmation !== $scope.register.password){
          Utils.validateToast($scope.translations.REGISTER_PASSWORD_CONFIRMATION_UNMATCH_ERROR);
          return;
        }

        var user = $scope.register;

        $scope.registerUser(user);

      };


      $scope.registerUser = function (_user){

        $ionicLoading.show({
          templateUrl:"loading.html",
          noBackdrop: true
        });
        User.registerUser(_user).then(function(_response){

          StorageUserModel.setCurrentUser(_response.data);

          setTimeout(function () {
            $ionicLoading.hide();

            $ionicSlideBoxDelegate.slide(1)
          }, 2000);

        },function(_error){

          $ionicLoading.hide();
          // Materialize.toast($scope.translations.REGISTER_SLIDER_1_ERROR,4000)
          console.error(_error)

        })
      };


      $scope.finish= function(){
        $scope.closeModalRegister();
        // $state.go("dashboard")
      };

    });
  }]);
}).call(this);
