"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("FactorController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","$ionicModal","$cordovaCamera","FactorPenalty","StorageUserModel","translationService","$resource","popUpService","$cordovaStatusbar","Quotation","Utils","$cordovaActionSheet","$ionicLoading","$cordovaFileOpener2","$cordovaFileTransfer",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,$ionicModal,$cordovaCamera,FactorPenalty,StorageUserModel,translationService,$resource,popUpService,$cordovaStatusbar,Quotation,Utils,$cordovaActionSheet,$ionicLoading,$cordovaFileOpener2,$cordovaFileTransfer) {

    $ionicPlatform.ready(function() {

      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
        $scope.translations = data;
        $scope.options = { title: $scope.translations.ACTION_SHEET_PHOTO_TITLE, buttonLabels: [$scope.translations.ACTION_SHEET_PHOTO_CAMERA, $scope.translations.ACTION_SHEET_PHOTO_GALERY], addCancelButtonWithLabel: "Cancelar", androidEnableCancelButton: true, winphoneEnableCancelButton: true };
      });

      if (window.StatusBar) {
        $cordovaStatusbar.overlaysWebView(false);
        $cordovaStatusbar.style(1);
        $cordovaStatusbar.styleHex("#1AA55E");
        $cordovaStatusbar.show();
      }

      $scope.image = "img/placeholder.png";

      $scope.os = ionic.Platform.platform();
      $scope.user = StorageUserModel.getCurrentUser();


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
        if($scope.factorType.power_factor === undefined || $scope.factorType.power_factor === 0){
          Utils.validateToast($scope.translations.QUOTATION_AMOUNT_EMPTY);
          return;
        }

        if($scope.factorType.power_factor < 1000 ){
          Utils.validateToast($scope.translations.QUOTATION_AMOUNT_MINIMUM);
          return;
        }

let calculation = $scope.factorType;

if(StorageUserModel.getCurrentUser().type_user === 'explorer'){

  popUpService.showPopUpRegister($scope.translations).then(function(_response){



  },function(_error){

  })

  StorageQuotation.setQuotation(calculation);

}else{
        $ionicLoading.show({
          template: `${$scope.translations.LOADING}...`
        }).then(function () {


            $scope.CreateQuoate(calculation);
          });
        }
    }



    $scope.CreateQuoate = function(calculation){

      FactorPenalty.create(calculation,$scope.user).then(function(_response){

        $scope.getPDF(_response.data.calculation,_response.data.id);
        // $ionicLoading.hide();
        // popUpService.showPopUpCreateFactor($scope.translations).then(function(_response){
        //
        //   $state.go("dashboard");
        //
        // },function(error){
        //
        // });
        console.log(_response)
      },function(_error){

        console.error(_error);
        $ionicLoading.hide();
        popUpService.showPopUpFailCreateFactor($scope.translations).then(function(_response){
          $state.go("dashboard");
        });
      })
    }



      if (window.cordova){
        $scope.showPopUpImage = function(){
          $cordovaActionSheet
          .show($scope.options)
          .then(function(btnIndex) {


            switch (btnIndex) {
              case 1:
                $scope.openCamera();
                break;
                case 2:
                  $scope.openGallery();
                  break;
              default:
              break;

            }

          });
        }
      }

      $ionicPlatform.registerBackButtonAction(function () {
          $state.go("dashboard");
      }, 100);

      $scope.goToProjects= function(){
        $state.go('project');
      }
      $scope.goToProfile= function(){
        $state.go('settings');
      }
      $scope.goToQuotes= function(){

        $state.go('factor');
      }




      $scope.getPDF = function(param1,_quotation_id){
        // PDF.getPDF(user,$state.params.id_quotation,_quotation_id).then(function(_response){
        //
        //
        // },function(_error){
        //
        // })

        var url = `http://kvar.herokuapp.com/api/calculations/${param1}/quotations/${_quotation_id}/pdf`;

        $scope.downloadFile(url);




      }
  $scope.downloadFile = function(_url, _file_name) {

        var targetPath = cordova.file.dataDirectory;
        var trustHosts = true;
        var params= {};
        params.headers={
          token: StorageUserModel.getCurrentUser().authentication_token,
          username: StorageUserModel.getCurrentUser().username
        };


        var path = targetPath + _file_name;

        $cordovaFileTransfer.download(_url, targetPath+'pdf.pdf', params, trustHosts).then(
          function(result) {
            $ionicLoading.hide();
            console.log(result);
            $scope.openFile(targetPath+'pdf.pdf')


          },
          function(err) {

            // $scope.openFile(_file_name);
            console.log(err);
            // Error
          },
          function(progress) {
            // Materialize.toast("Descargando PDF",4000);
            $timeout(function() {
              $scope.downloadProgress =
              progress.loaded / progress.total * 100;
              if ($scope.downloadProgress === 100) {
                $("#btn-play-pdf").removeClass("disabled");
              }
            });
          }
        );
      };


      $scope.openFile = function(_path_file) {
        // // let path = targetPath +'/'+ _file_name;
        // var path = targetPath + _file_name;
        // console.log(path);

        $cordovaFileOpener2
        .open(_path_file, "application/pdf").then(
          function(_response) {
            console.log(_response);

            setTimeout(function () {

              $state.go("dashboard");
            }, 1000);

          },
          function(err) {
            console.error(err);

            // An error occurred. Show a message to the user
          }
        );
      };



    });
  }]);
}).call(this);
