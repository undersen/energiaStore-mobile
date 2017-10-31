"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("DashboardController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","Session","StorageUserModel","popUpService","translationService","$resource","$ionicPopover","$cordovaActionSheet","$cordovaStatusbar","StorageLanguageModel",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,Session,StorageUserModel,popUpService,translationService,$resource,$ionicPopover,$cordovaActionSheet,$cordovaStatusbar,StorageLanguageModel) {

    $ionicPlatform.ready(function() {


        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {
            $scope.translations = data;
        });
        if (window.StatusBar) {
          $cordovaStatusbar.overlaysWebView(false);
          $cordovaStatusbar.style(1);
          $cordovaStatusbar.styleHex("#1AA55E");
          $cordovaStatusbar.show();
        }


      let user = StorageUserModel.getCurrentUser();

      $scope.init = function (){

        if(user.email === undefined){
            popUpService.showPopUpWelcome();
        }
      };

      $scope.goToQuotation = function(){$state.go("calculation");};

      $scope.goToFactor = function(){$state.go("factor");};

      // $scope.goToSettings =

      $ionicPlatform.registerBackButtonAction(function () {
        // ionic.Platform.exitApp();
      }, 100);


      $scope.logOut = function (){
          popUpService.showpopUpLogOut($scope.translations).then(function(_response){
              if(_response){
                  try{
                      Session.logout().then(function(){
                          $scope.deleteData();

                      },function(_error){
                          $scope.deleteData();

                      })
                  }catch(_error){
                      $scope.deleteData();
                  }
              }
          });
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
    $scope.closePopover();
    $state.go("settings");
  };



  var options = { title: "Seleccione idioma", buttonLabels: ["Ingles", "Español"], addCancelButtonWithLabel: "Cancelar", androidEnableCancelButton: true, winphoneEnableCancelButton: true };

   if (window.cordova){
     $scope.showLanguageOptions = function(){
     $cordovaActionSheet
       .show(options)
       .then(function(btnIndex) {
         var index = btnIndex;

         switch (index) {
           case 1:
          StorageLanguageModel.setCurrentLanguage('es');
             break;

           case 2:
           StorageLanguageModel.setCurrentLanguage('en');
             break;
         }

         StorageLanguageModel.getCurrentLanguage()

          const languageFilePath = translationService.getTranslation();
          $resource(languageFilePath).get(function(data) {
            $scope.translations = data;
          });

       });
      }
    }



    });
  }]);
}).call(this);
