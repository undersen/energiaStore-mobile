"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("RegisterController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate) {

    $ionicPlatform.ready(function() {

      $scope.goToRegister = function(){

        $state.go("register");

      }


      $scope.register= function (){

      }


      $scope.slideHasChanged= function(index){

        switch (index) {
          case 0:

          $("#content-register").addClass("back-color1")
          $("#content-register").removeClass("back-color2")
          break;
          case 1:

          $("#content-register").removeClass("back-color3")
          $("#content-register").removeClass("back-color1")
          $("#content-register").addClass("back-color2")

          break;
          case 2:
          $("#content-register").removeClass("back-color2")
          $("#content-register").removeClass("back-color4")
          $("#content-register").addClass("back-color3")

          break;
          case 3:
          $("#content-register").addClass("welcome-background-4")
          $("#content-register").removeClass("welcome-background-3")
          break;

          default:

        }
      }

      $scope.nextButton = function(index){
        switch (index) {
          case 1:
          $ionicSlideBoxDelegate.slideTo(2)

          break;

          case 2:
          $ionicSlideBoxDelegate.slideTo(2)

          break;

          case 3:
          $ionicSlideBoxDelegate.slideTo(1)

          break;
          default:

        }

      }




    });
  }]);
}).call(this);
