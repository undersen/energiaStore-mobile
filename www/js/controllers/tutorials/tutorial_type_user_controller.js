"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("TutorialTypeUserController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","$timeout","$ionicPopup",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,$ionicPopup) {
    $ionicPlatform.ready(function() {




      const containerId = $('#content-id');
      // const worldId = $('#world-animate');
      // const notification_1 = $('#notification-id-1');
      // const notification_2 = $('#notification-id-2');
      // var  hasChangeSlide3 = false;


      $scope.shouldShowBackButton=false;
      $scope.RightButtonText = 'Siguiente';
      $scope.LeftButtonText = 'Atras';


      $scope.init = function(){
        debugger;

        if($state.params.flag == 'config'){}else{
          var myPopup = $ionicPopup.show({
            animation: 'fade-in',
            title: '<img src="./img/common/stars.png">',
            subTitle: '<span class="popup-title">Bienvenido</span>',
            template: '<p class="popup-subtitle">A continuacion te explicaremos los distintos perfiles que existen en energiaStore</p>',
            scope: $scope,
            buttons: [
              { text: 'Cancelar',
              type: 'button-cancel'
            },
            {
              text: 'Comenzar',
              type: 'button-afirmative',
              onTap: function(e) {

              }
            }
          ]
        });
      }
    }


    $scope.finish = function(){

      if($state.params.flag == 'config'){
        $state.go('tutorials')
      }else{

        var myPopup = $ionicPopup.show({
          animation: 'fade-in',
          title: '<img src="./img/common/flying_email.png">',
          subTitle: '<span class="popup-title">Fin Tutorial</span>',
          template: '<p class="popup-subtitle">si aun tienes dudas puedes contactarnos en la seccion de configuracion."',
          scope: $scope,
          buttons: [
            {
              text: 'Entendido',
              type: 'button-afirmative',
              onTap: function(e) {

                if(!$state.params.flag == 'config'){
                $state.go('middleware')
                }else{
                  $state.go('tutorials')
                }
              }
            }
          ]
        });
      }
    }




    $scope.slideHasChanged = function(_index){

      switch (_index) {
        case 0:
        containerId.addClass('slider-one');
        containerId.removeClass('slider-two');
        $scope.shouldShowBackButton=false;
        break;
        case 1:
        containerId.addClass('slider-two');
        containerId.removeClass('slider-three');
        $scope.shouldShowBackButton=true;

        break;
        case 2:
        containerId.addClass('slider-three');
        containerId.removeClass('slider-two');
        $scope.RightButtonText = 'Finalizar';


        break;
        default:

      }
    };


    $scope.goBack = function(){
      $ionicSlideBoxDelegate.previous();
    }

    $scope.goAhead = function(){
      if(($ionicSlideBoxDelegate.currentIndex()+1) === $ionicSlideBoxDelegate.slidesCount()){
        $scope.finish();
      }else{
        $ionicSlideBoxDelegate.next();
      }
    }


  });
}]);
}).call(this);
