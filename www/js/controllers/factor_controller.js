"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("FactorController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","$ionicModal","$cordovaCamera",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,$ionicModal,$cordovaCamera) {

    $ionicPlatform.ready(function() {

      $scope.factorType="";

      $scope.back = function(){
        $state.go("dashboard");
      }

      $scope.help = function(){
        $state.go("dashboard");
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




          $scope.chooseManual = function(){
            $('#input-penalty').attr('disabled', false);

            $('#button-camera').attr('disabled', true);
            $('#button-gallery').attr('disabled', true);

            $scope.factorType="manual";

          }
          $scope.chooseImage = function(){
            $('#button-camera').attr('disabled', false);
            $('#button-gallery').attr('disabled', false);

            $('#input-penalty').attr('disabled', true);

            $scope.factorType="image";
          }


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
                  $scope.image = "data:image/jpeg;base64," + _imageData;
                }, function(err) {
                  // error
                });

          }

          $scope.openGallery = function (){

            var options = {
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
                      $scope.image = "data:image/jpeg;base64," + _imageData;
                      // isPictureChanged=true;
                    }, function(_err) {
                      console.log(_err);
                    });

          }





    });
  }]);
}).call(this);
