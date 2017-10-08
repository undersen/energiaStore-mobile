"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("RegisterController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","User","$ionicLoading","StorageUserModel",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,User,$ionicLoading,StorageUserModel) {

    $ionicPlatform.ready(function() {

      $scope.user={};

      $scope.goToRegister = function(){

        $state.go("register");

      };


      $scope.register= function (){

      };


      $scope.slideHasChanged= function(index){

        let _content_register = ("#content-register");

        switch (index) {
          case 0:

              _content_register .addClass("back-color1");
              _content_register .removeClass("back-color2");
          break;
          case 1:

              _content_register .removeClass("back-color3");
              _content_register .removeClass("back-color1");
              _content_register .addClass("back-color2");

          break;
          case 2:
              _content_register .removeClass("back-color2");
              _content_register .removeClass("back-color4");
              _content_register .addClass("back-color3");

          break;
          case 3:
              _content_register .addClass("welcome-background-4");
              _content_register .removeClass("welcome-background-3");
          break;

          default:

        }
      };

      $scope.nextButton = function(index){
        switch (index) {
          case 0:
          debugger;
          $scope.validateSlider1();

          // $ionicSlideBoxDelegate.slide(2)

          break;

          case 2:
          $scope.validateSlider1();


          break;

          case 3:
          $ionicSlideBoxDelegate.slide(1);

          break;
          default:

        }

      };


      $scope.validateSlider1 =function(){

        if ($scope.user.email === undefined || $scope.user.email === ''){
          Materialize.toast("Complete email",4000);
          return;
        }

        if ($scope.user.password === undefined || $scope.user.password === ''){
          Materialize.toast("Complete password.",4000);
          return;
        }

        if ($scope.user.password_confirmation === undefined || $scope.user.password_confirmation === ''){
          Materialize.toast("Complete confirmacion.",4000);
          return;
        }

        if ($scope.user.password_confirmation !== $scope.user.password){
          Materialize.toast("Password no coinciden.",4000);
          return;
        }

        $scope.registerUser();

      };


      $scope.registerUser = function (){

        $ionicLoading.show({
          templateUrl:"loading.html",
          noBackdrop: true
        });
        User.registerUser($scope.user).then(function(_response){

          StorageUserModel.setCurrentUser(_response.data);

          setTimeout(function () {
            $ionicLoading.hide();

            $ionicSlideBoxDelegate.slide(1)
          }, 2000);

        },function(_error){

          $ionicLoading.hide();
          Materialize.toast("Intenta con otro email",4000)

        })
      };


      $scope.finish= function(){
      debugger;
        $state.go("dashboard")
      };

      $ionicPlatform.registerBackButtonAction(function () {
        $scope.onBack();
      }, 100);

      $scope.disableSwipe = function() {
        $ionicSlideBoxDelegate.enableSlide(false);
      };


      $scope.onBack = function (){

      if ($ionicSlideBoxDelegate.currentIndex() === 0 ){ $state.go("login")}

      }


    });
  }]);
}).call(this);
