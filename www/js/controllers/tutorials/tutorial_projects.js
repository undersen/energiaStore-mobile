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

        console.log($state);

    }


    $scope.finish = function(){
      $state.go("tutorials");
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
    $ionicSlideBoxDelegate.next();
  }


});
}]);
}).call(this);
