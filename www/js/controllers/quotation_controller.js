"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  app.controller("QuotationController", ["$scope","$state","$ionicPlatform","Calculation","StorageUserModel","Motors","$ionicModal","popUpService","$resource","translationService","Quotation","$cordovaStatusbar","Utils","$ionicSlideBoxDelegate","Factor","$cordovaFileTransfer","$cordovaFileOpener2","$ionicLoading",
  function($scope,$state,$ionicPlatform,Calculation,StorageUserModel,Motors,$ionicModal,popUpService,$resource,translationService,Quotation,$cordovaStatusbar,Utils,$ionicSlideBoxDelegate,Factor,$cordovaFileTransfer,$cordovaFileOpener2,$ionicLoading) {
    $scope.design = {};
    switch (StorageUserModel.getCurrentUser().type_user) {
      case 'user':
      debugger;
      $scope.design.header = 'user-color'
      $scope.design.footer = 'user-color'
      $scope.design.color = '#62D485'
      break;

      case 'partner':
      $scope.design.header = 'partner-color'
      $scope.design.footer = 'partner-color'
      $scope.design.color = '#62BED4'
      break;

      case 'explorer':
      $scope.design.header = 'explorer-color'
      $scope.design.footer = 'explorer-color'
      $scope.design.color = '#F5A623'
      break;
      default:
      $scope.design.header = 'user-color'
      $scope.design.footer = 'user-color'
      $scope.design.color = '#62D485'
      break;
    }






    $ionicPlatform.ready(function() {

      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function(data) {
        $scope.translations = data;
      });
      $scope.platform = ionic.Platform.platform()

      $scope.init = function(){
        debugger;
        $scope.getFactors();
        $scope.getCalculation();
      }

      $scope.right = function(){
        $('#tabulator').addClass('total-left');
        $ionicSlideBoxDelegate.slide(1);

      }

      $scope.left = function(){
        $('#tabulator').removeClass('total-left');
        $ionicSlideBoxDelegate.slide(0);
      }


      $scope.viewPdfProject = function(project_id){

        console.log(project_id);




      }



      $scope.getFactors = function(){
        // debugger;
        // if(StorageUserModel.getCurrentUser().type_user === 'explorer'){
        //   // debugger;
        //
        //   // $scope.factors[0] = StorageFactorModel.getFactors();
        //   $scope.$broadcast("scroll.refreshComplete");
        //
        //
        // }else{
        Factor.getAllFactors(StorageUserModel.getCurrentUser()).then(function(_response){

          $scope.factors = _response.data;
          debugger;
          $scope.$broadcast("scroll.refreshComplete");


        },function(_error){

        })
        // }

      }




      $scope.viewPdf = function(calculation){

        $ionicLoading.show({
          template: `${$scope.translations.LOADING}...`
        }).then(function () {
          var url = `http://kvar.herokuapp.com/api/calculations/${calculation.calculation_id}/quotations/${calculation.id}/pdf`;
          $scope.downloadFile(url);
        });

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
            // $timeout(function() {
            //   $scope.downloadProgress =
            //   progress.loaded / progress.total * 100;
            //   if ($scope.downloadProgress === 100) {
            //     $("#btn-play-pdf").removeClass("disabled");
            //   }
            // });
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
            // $scope.closeModalQuote();
            // $state.go('factor',{},{reload:true})

          },
          function(err) {
            console.error(err);

            // An error occurred. Show a message to the user
          }
        );
      };


      $scope.getCalculation = function() {
        Calculation.getAll(StorageUserModel.getCurrentUser()).then(
          function(_response) {
            $scope.calculations = _response.data;
            $scope.$broadcast("scroll.refreshComplete");
            console.log(_response);
            $ionicLoading.hide()
          },
          function(_error) {
            $ionicLoading.hide()
            httpUtilities.validateHTTPResponse(_error,popUpService,$scope.translations);

            // Utils.validateToast($scope.translations.QUOTATION_ERROR_DOWNLOAD_INFO);
            $scope.$broadcast("scroll.refreshComplete");
            console.error(_error);

          }
        );
      };

      $scope.goBack = function(){
        $state.go("dashboard");
      }


      $scope.goToProjects= function(){
        $state.go("project");

      }
      $scope.goToProfile= function(){
        $state.go("settings");

      }

      $scope.goToDashboard= function(){
        $state.go("dashboard");
      }


    });
  }
]);
}.call());
