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
          case 0:
          debugger;
          $scope.validateSlider1();

          // $ionicSlideBoxDelegate.slide(2)

          break;

          case 2:
          $scope.validateSlider1();


          break;

          case 3:
          $ionicSlideBoxDelegate.slide(1)

          break;
          default:

        }

      }


      $scope.validateSlider1 =function(){

        if ($scope.user.email == undefined || $scope.user.email == ''){
          Materialize.toast("Complete email",4000);
          return;
        }

        if ($scope.user.password == undefined || $scope.user.password == ''){
          Materialize.toast("Complete password.",4000);
          return;
        }

        if ($scope.user.password_confirmation == undefined || $scope.user.password_confirmation == ''){
          Materialize.toast("Complete confirmacion.",4000);
          return;
        }

        if ($scope.user.password_confirmation != $scope.user.password){
          Materialize.toast("Password no coinciden.",4000);
          return;
        }

        $scope.registerUser();

      }


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
      }

      // $scope.validateSlider2 = function (){
      //
      //
      //   if($scope.user.name == undefined || $scope.user.name == ''){
      //     Materialize.toast("",4000)
      //     return;
      //   }
      //
      //   if($scope.user.last_name == undefined || $scope.user.last_name == ''){
      //     Materialize.toast("",4000)
      //     return;
      //   }
      //
      //   if($scope.user.phone == undefined || $scope.user.phone == ''){
      //     Materialize.toast("",4000)
      //     return;
      //   }
      //
      //   if($scope.user.address == undefined || $scope.user.address == ''){
      //     Materialize.toast("",4000)
      //     return;
      //   }
      //
      //
      //
      //
      //
      //   $ionicSlideBoxDelegate.slide(2)
      // }

      // $scope.validateSlider2 = function (){
      //
      // }
      //
      //
      // $scope.completeUserInfo = function (){
      //
      // }


      $scope.finish= function(){
        $state.go("dashboard")
      }

      $ionicPlatform.registerBackButtonAction(function () {
        $scope.onBack();
      }, 100);

      $scope.disableSwipe = function() {
        $ionicSlideBoxDelegate.enableSlide(false);
      };


      $scope.onBack = function (){

      if ($ionicSlideBoxDelegate.currentIndex() == 0 ){ $state.go("login")}

      }


    });
  }]);
}).call(this);
