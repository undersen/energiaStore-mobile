"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("MiddlewareController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","$timeout","StorageUserModel","$ionicPopup",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,StorageUserModel,$ionicPopup) {
    $ionicPlatform.ready(function() {





      $scope.handleGoTo = function(_index){

        switch (_index) {
          case 1:
          StorageUserModel.setCurrentUser({
            type_user:'user'
          });
          $state.go('login');
          break;

          case 2:

          $scope.workingOnPopUp();

          break;

          case 3:

          StorageUserModel.setCurrentUser({
            type_user:'explorer'
          });
          $state.go('dashboard');
          break;
          default:
          break;
        }



      }


      $scope.getHelp = function(){
        $state.go('tutorialTypeUser');
      }


      $scope.workingOnPopUp = function(){
        var myPopup = $ionicPopup.show({
          animation: 'fade-in',
          title: '<img src="./img/working-on.png" class="img-about-us">',
          subTitle: '<span class="popup-title">Ups!</span>',
          template: '<p class="popup-subtitle">Esta sección aun esta en desarrollo, vuelve a intentarlo pronto',
          scope: $scope,
          buttons: [
            {
              text: 'Entendido',
              type: 'button-afirmative',
              onTap: function(e) {
                // $state.go('middleware')
              }
            }]
        });
      }


    });
  }]);
}).call(this);
