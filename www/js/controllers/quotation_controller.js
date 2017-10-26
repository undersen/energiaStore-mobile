"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  app.controller("QuotationController", [
    "$scope",
    "$state",
    "$ionicPlatform",
    "Calculation",
    "StorageUserModel",
    "Motors",
    "$ionicModal",
    "popUpService",
    "$resource",
    "translationService",
    "Quotation",
    "$cordovaStatusbar",
    function(
      $scope,
      $state,
      $ionicPlatform,
      Calculation,
      StorageUserModel,
      Motors,
      $ionicModal,
      popUpService,
      $resource,
      translationService,
      Quotation,
      $cordovaStatusbar
    ) {
      $ionicPlatform.ready(function() {
        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function(data) {
          $scope.translations = data;
        });

        var user = StorageUserModel.getCurrentUser();





         if (window.cordova) {
           var targetPath = cordova.file.dataDirectory;
           // let url = "https://www.ucm.es/data/cont/docs/471-2013-10-29-IdeologiaSW.pdf";
           var trustHosts = true;
           var options = {};

           $scope.checkFile = function(_file_name, _url) {
             debugger;

             var file_path = _file_name;

             $cordovaFile
               .checkFile(targetPath, file_path)
               .then(
                 function(success) {
                   // $('#quiz-button-id').removeClass('disabled');
                   // $scope.openFile(_file_name);
                   // console.log(success);
                   $("#btn-play-pdf").removeClass("disabled");
                 },
                 function(error) {
                   console.error(error);
                   $scope.downloadFile(_url, _file_name);
                 }
               );
           };

           $scope.openFile = function(_file_name) {
             // let path = targetPath +'/'+ _file_name;
             var path = targetPath + _file_name;
             console.log(path);

             $cordovaFileOpener2
               .open(path, "application/pdf")
               .then(
                 function() {
                   debugger;
                   $scope.hide();
                   $scope.lesson.status = "ok";
                   $("#quiz-button-id").removeClass("disabled");

                   setTimeout(function() {
                     popUpService
                       .showPopupGeneric(
                         "¡Felicitaciones!",
                         "Has terminado tu desafío,<p> ahora es tiempo de aprobar",
                         "video_lesson"
                       )
                       .then(function(_response) {
                         if (_response) {
                           $state.go(
                             "quizQuestion",
                             {
                               idCourse: $stateParams.idCourse,
                               idQuiz: $stateParams.idQuiz
                             },
                             { reload: true }
                           );
                         } else {
                           // player.play();
                           $scope.openFile();
                         }
                       });
                   });
                 },
                 function(err) {
                   console.error(err);
                   debugger;
                   // An error occurred. Show a message to the user
                 }
               );
           };

           $scope.downloadFile = function(_url, _file_name) {
             var path = targetPath + _file_name;

             $cordovaFileTransfer
               .download(_url, path, options, trustHosts)
               .then(
                 function(result) {
                   console.log(result);
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
         }

        
      });
    }
  ]);
}.call());
