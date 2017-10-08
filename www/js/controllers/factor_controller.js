"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("FactorController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","$ionicModal","$cordovaCamera","FactorPenalty","StorageUserModel","$ionicPopup",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,$ionicModal,$cordovaCamera,FactorPenalty,StorageUserModel,$ionicPopup) {

    $ionicPlatform.ready(function() {

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
        $('#input-penalty').attr('disabled', false);
        $('#button-camera').attr('disabled', true);
        $('#button-gallery').attr('disabled', true);
        $scope.factorType.type="manual";
      }
      $scope.chooseImage = function(){
        $('#button-camera').attr('disabled', false);
        $('#button-gallery').attr('disabled', false);
        $('#input-penalty').attr('disabled', true);
        $scope.factorType.type="image";
      };


      $scope.openCamera = function (){

        var options = {
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
          console.log(_err);

        });
      };


      $scope.createFactorPenalty =  function (){

      if($scope.factorType.photo !== undefined){
        $scope.factorType.power_factor = '';
      }

        let calculation = $scope.factorType;
        $scope.showpopUpFail();
        FactorPenalty.create(calculation,$scope.user).then(function(_response){
        $scope.showpopUpCreate();
        },function(_error){
          console.error(_error);
        $scope.showpopUpFail();
        })
      };


      $scope.showpopUpCreate = function(){

          let button_exit_lesson = [{ text: 'Entendido',  type: 'button-special',onTap: function(e) {
            $state.go("dashboard");
          }}];

          $ionicPopup.show({
            title: '<div class="congrats"></div><img src="img/special_icons/check1.png" class="modal-img-config">',
            subTitle: '<br><span class="modal-body-config">Cotizacion realizada de manera exitosa, EnergiaStore se pondra en contacto con usted para enviar su cotización.</span>',
            cssClass: 'successClass',
            buttons:button_exit_lesson,
          })
    };

    $scope.showpopUpFail = function(){

        let button_exit_lesson = [{ text: 'Entendido',  type: 'button-special',onTap: function(e) {
          $state.go("dashboard");
        }}];


        $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/special_icons/pulgar3_bad.png" class="modal-img-config">',
          subTitle: '<br><span class="modal-body-config">Ups no hemos podido realizar tu cotizacion, porfavor intentalo mas tarde.</span>',
          cssClass: 'successClass',
          buttons:button_exit_lesson,
        })
  }

    });
  }]);
}).call(this);
