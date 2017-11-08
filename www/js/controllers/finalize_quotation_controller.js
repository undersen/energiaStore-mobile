"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("FinalizedQuotationController", ["$scope", "$state","$ionicPlatform","StorageUserModel","translationService","$resource","$cordovaStatusbar","$ionicLoading","Utils","Quotation","$cordovaActionSheet","$cordovaCamera","PDF","$cordovaFileTransfer","$cordovaFileOpener2",
  function($scope, $state,$ionicPlatform,StorageUserModel,translationService,$resource,$cordovaStatusbar,$ionicLoading,Utils,Quotation,$cordovaActionSheet,$cordovaCamera,PDF,$cordovaFileTransfer,$cordovaFileOpener2) {

    $ionicPlatform.ready(function() {
      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
          $scope.translations = data;
          var options = { title: $scope.translations.ACTION_SHEET_PHOTO_TITLE, buttonLabels: [$scope.translations.ACTION_SHEET_PHOTO_CAMERA, $scope.translations.ACTION_SHEET_PHOTO_GALERY], addCancelButtonWithLabel: "Cancelar", androidEnableCancelButton: true, winphoneEnableCancelButton: true };
      });


      $scope.image = "img/placeholder.png";
      var user = StorageUserModel.getCurrentUser();

      $scope.quote={};


            $scope.FinishQuotation = function(){


              var quote={
               calculation_id:$state.params.id_quotation,
               user_id:user.id,
               comment:$scope.quote.comments,
               reference:$scope.quote.photo
            }


                Quotation.Create(user, quote).then(function(_response) {
                  debugger;
                    $scope.getPDF(_response.data.id);
                  }, function(_error) {
                    debugger;
                  });
            }

            $scope.validateQuotation =  function (){
              $scope.FinishQuotation();
            }

            $scope.getPDF = function(_quotation_id){
              // PDF.getPDF(user,$state.params.id_quotation,_quotation_id).then(function(_response){
              //   debugger;
              //
              // },function(_error){
              //
              // })

                var url = `http://kvar.herokuapp.com/api/calculations/${$state.params.id_quotation}/quotations/${_quotation_id}/pdf`;

                $scope.downloadFile(url);



            }


            $scope.downloadFile = function(_url, _file_name) {

              var targetPath = cordova.file.dataDirectory;
              var trustHosts = true;
              var params= {};
              params.headers={
                token: user.authentication_token,
                username: user.username
              };


              var path = targetPath + _file_name;

              $cordovaFileTransfer.download(_url, targetPath+'pdf.js', params, trustHosts).then(
                function(result) {
                  debugger;
                  console.log(result);
                  $scope.openFile(targetPath+'pdf.js')


                },
                function(err) {
                  debugger;
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
                },
                function(err) {
                  console.error(err);
                  debugger;
                  // An error occurred. Show a message to the user
                }
              );
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
                $scope.quote.photo = "data:image/jpeg;base64," + _imageData;
                $scope.image = $scope.quote.photo
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
                $scope.quote.photo = "data:image/jpeg;base64," + _imageData;
                $scope.image = $scope.quote.photo
                // isPictureChanged=true;
              }, function(_err) {

                Utils.validateToast($scope.ERROR_GALLERY);
                console.error(_err);

              });
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
