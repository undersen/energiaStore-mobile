"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("FactorController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","$ionicModal","$cordovaCamera","FactorPenalty","StorageUserModel","translationService","$resource","popUpService",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,$ionicModal,$cordovaCamera,FactorPenalty,StorageUserModel,translationService,$resource,popUpService) {

    $ionicPlatform.ready(function() {

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {
            $scope.translations = data;
        });

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

      $scope.chooseManual = function(){
          _input_penalty.attr('disabled', false);
          _button_camera.attr('disabled', true);
          _button_galley.attr('disabled', true);
        $scope.factorType.type="manual";
      };
      $scope.chooseImage = function(){
          _button_camera.attr('disabled', false);
          _button_galley.attr('disabled', false);
          _input_penalty.attr('disabled', true);
        $scope.factorType.type="image";
      };


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
        }, function(_err) {
          Materialize.toast("Problemas con la camara",4000);
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
          // isPictureChanged=true;
        }, function(_err) {
          Materialize.toast("Problemas con la galeria",4000);
          console.error(_err);

        });
      };


      $scope.createFactorPenalty =  function (){

      if($scope.factorType.photo !== undefined){
        $scope.factorType.power_factor = '';
      }

        let calculation = $scope.factorType;

        FactorPenalty.create(calculation,$scope.user).then(function(_response){
            popUpService.showPopUpCreateFactor($scope.translations);
            console.log(_response)
        },function(_error){
          console.error(_error);
            popUpService.showPopUpFailCreateFactor($scope.translations);
        })
      };



    });
  }]);
}).call(this);
