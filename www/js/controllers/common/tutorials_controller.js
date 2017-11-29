"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("TutorialsController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","$timeout","StorageUserModel","StorageLanguageModel","$ionicPopup",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,StorageUserModel,StorageLanguageModel,$ionicPopup) {
    $ionicPlatform.ready(function() {

      $scope.chooseLanguage = function(_language){
        StorageLanguageModel.setCurrentLanguage(_language);
        $resource(translationService.getTranslation()).get(function (data) {
          $scope.translations = data;
          // $ionicSlideBoxDelegate.next();
        });
      }



      $scope.chooseTutorial = function (_index){
        debugger;
        switch (_index) {
          case 1:
          $state.go('tutorialTypeUser',{flag:'config'})
          break;
          case 2 :
          $state.go('tutorialFactor',{flag:'config'})
          break;
          default:
            $scope.popUpNotTutorial();
          break;

        }
      }



      $scope.popUpNotTutorial = function(){

        var myPopup = $ionicPopup.show({
          animation: 'fade-in',
          title: '<img src="./img/special_icons/lookfor.png">',
          subTitle: '<span class="popup-title">Ups!</span>',
          template: '<p class="popup-subtitle">Este tutorial aun esta e desarrollo, vuelve pronto."',
          scope: $scope,
          buttons: [
          {
            text: 'Entendido',
            type: 'button-afirmative',
            onTap: function(e) {
              // $state.go('middleware')
            }
          }
        ]
      });
    }


    $scope.goBack = function(){
      $state.go('settings');
    }


    });
  }]);
}).call(this);
