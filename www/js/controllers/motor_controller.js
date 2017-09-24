"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("MotorsController", ["$scope", "$state","$ionicPlatform","Calculation","StorageUserModel","Motors","$ionicModal",
  function($scope, $state,$ionicPlatform,Calculation,StorageUserModel,Motors,$ionicModal) {
    $ionicPlatform.ready(function() {

    $scope.motors =[];

    $scope.user = StorageUserModel.getCurrentUser();

      $scope.init = function(){

        Motors.getByCalculation($state.params.id_quotation,StorageUserModel.getCurrentUser()).then(function(_response){


        $scope.motors = _response.data;

        },function(_error){
          console.log(_error);
        })
      }

      $ionicModal.fromTemplateUrl('modal-motor', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modalMotor = modal;
      });


      $scope.openModalMotor = function() {
        $scope.modalMotor.show();
      };
      $scope.closeModalMotor = function() {
        $scope.modalMotor.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modalMotor.remove();
      });
      // Execute action on hide modal
      $scope.$on('modalMotor.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modalMotor.removed', function() {
        // Execute action
      });



    $scope.back = function(){
      $state.go("quotation");
    }


$scope.createMotor = function (){
    Motor.create().then(function(_response){

  Materialize.toast("Motor agregado",4000)
  },function(_error){
  Materialize.toast("Problemas al agregar motor",4000);
})
}




    });
  }]);
}).call(this);
