"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("FactorController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","$ionicModal","$cordovaCamera","FactorPenalty","StorageUserModel","translationService","$resource","popUpService","$cordovaStatusbar","Quotation","Utils","$cordovaActionSheet",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,$ionicModal,$cordovaCamera,FactorPenalty,StorageUserModel,translationService,$resource,popUpService,$cordovaStatusbar,Quotation,Utils,$cordovaActionSheet) {

    $ionicPlatform.ready(function() {

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {
            $scope.translations = data;
            var options = { title: $scope.translations.ACTION_SHEET_PHOTO_TITLE, buttonLabels: [$scope.translations.ACTION_SHEET_PHOTO_CAMERA, $scope.translations.ACTION_SHEET_PHOTO_GALERY], addCancelButtonWithLabel: "Cancelar", androidEnableCancelButton: true, winphoneEnableCancelButton: true };
        });

        if (window.StatusBar) {
          $cordovaStatusbar.overlaysWebView(false);
          $cordovaStatusbar.style(1);
          $cordovaStatusbar.styleHex("#1AA55E");
          $cordovaStatusbar.show();
        }

        $scope.image = "img/placeholder.png";

        $scope.os = ionic.Platform.platform();

        const _input_penalty = $('#input-penalty');
        const _button_camera = $('#button-camera');
        const _button_galley = $('#button-gallery');


      $scope.user =  StorageUserModel.getCurrentUser();

      $scope.factorType={};

      $scope.back = function(){
        $state.go("dashboard");
      };

      $scope.help = function(){
        $state.go("dashboard");
      };

      $scope.doRefresh = function(){
        Quotation.index($scope.user).then(function(_response){

          // _respose.data

          for (var i = 0; i < array.length; i++) {
            array[i]
          }

        },function(_error){
          debugger;

        })
      }


      $ionicModal.fromTemplateUrl('modal-help', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modalHelp = modal;
      });


      $scope.openModalHelp = function() {
        $scope.modalHelp.show();
      };
      $scope.closeModalHelp = function() {
        $scope.modalHelp.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modalHelp.remove();
      });
      // Execute action on hide modal
      $scope.$on('modalHelp.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modalHelp.removed', function() {
        // Execute action
      });


      $ionicModal.fromTemplateUrl('modal-factor', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modalFactor = modal;
      });


      $scope.openModalFactor = function() {
        $scope.modalFactor.show();
      };
      $scope.closeModalFactor = function() {
        $scope.modalFactor.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modalFactor.remove();
      });
      // Execute action on hide modal
      $scope.$on('modalFactor.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modalFactor.removed', function() {
        // Execute action
      });


      $scope.openCamera = function (){

        let options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 200,
          targetHeight: 200,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true,
          correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(function(_imageData) {
          $scope.factorType.photo = "data:image/jpeg;base64," + _imageData;
          $scope.image = $scope.factorType.photo;
        }, function(_err) {
          Utils.validateToast($scope.ERROR_CAMERA);
          console.log(_err);
        });

      };

      $scope.openGallery = function (){

        let options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 200,
          targetHeight: 200,
          popoverOptions: CameraPopoverOptions,
        };

        $cordovaCamera.getPicture(options).then(function(_imageData) {
          $scope.factorType.photo = "data:image/jpeg;base64," + _imageData;
          $scope.image = $scope.factorType.photo;
          // isPictureChanged=true;
        }, function(_err) {

          Utils.validateToast($scope.ERROR_GALLERY);
          console.error(_err);

        });
      };


      $scope.createFactorPenalty =  function (){



        let calculation = $scope.factorType;

        FactorPenalty.create(calculation,$scope.user).then(function(_response){
            popUpService.showPopUpCreateFactor($scope.translations);
            console.log(_response)
        },function(_error){
          console.error(_error);
          popUpService.showPopUpFailCreateFactor($scope.translations);
        })
      };




      if (window.cordova){
        $scope.showPopUpImage = function(){
          $cordovaActionSheet
          .show(options)
          .then(function(btnIndex) {
            if(btnIndex === 1 ){
              $scope.openCamera();
            }else{
              $scope.openGallery();
            }

          });
        }
      }




    });
  }]);
}).call(this);
