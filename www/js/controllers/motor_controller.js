"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("MotorsController", ["$scope", "$state","$ionicPlatform","Calculation","StorageUserModel","Motors","$ionicModal","popUpService","$resource","translationService",
  function($scope, $state,$ionicPlatform,Calculation,StorageUserModel,Motors,$ionicModal,popUpService,$resource,translationService) {
    $ionicPlatform.ready(function() {

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {
            $scope.translations = data;
        });


      $scope.motors =[];
      $scope.motor = {};
      $scope.user = StorageUserModel.getCurrentUser();



      $scope.init = function(){
        $scope.getMotors();

      };

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
      };




      $scope.createMotor = function (){

        if($scope.motor.name === undefined || $scope.motor.name === '') {
          Materialize.toast("Complete nombre del motor",4000);
          return;
        }

        if($scope.motor.voltaje === undefined || $scope.motor.voltaje === 0) {
          Materialize.toast("Complete voltaje del motor",4000);
          return;
        }

        if($scope.motor.amp === undefined || $scope.motor.amp === 0) {
          Materialize.toast("Complete aperaje del motor",4000);
          return;
        }


        if($scope.motor.power_factor === undefined || $scope.motor.power_factor === 0) {
          Materialize.toast("Complete factor de potencia",4000);
          return;
        }

        if($scope.motor.hours === undefined || $scope.motor.hours === 0) {
          Materialize.toast("Complete horas al dia del motor",4000);
          return;
        }

        if($scope.motor.days === undefined || $scope.motor.days === 0) {
          Materialize.toast("Complete dias del mes del motor",4000);
          return;
        }




        Motor.create($scope.motor).then(function(_response){
          Materialize.toast("Motor agregado",4000);
          console.log(_response);

        },function(_error){
          Materialize.toast("Problemas al agregar motor",4000);
            console.error(_error);
        })
      };


      $scope.getMotors = function(){
        Motors.getByCalculation($state.params.id_quotation,StorageUserModel.getCurrentUser()).then(function(_response){
          $scope.motors = _response.data;

          console.log($scope.motors);
          $scope.$broadcast('scroll.refreshComplete');
        },function(_error){
          console.log(_error);
          $scope.$broadcast('scroll.refreshComplete');
        })
      };

      $scope.doRefreshMotors = function(){
        $scope.getMotors();
      };


      $scope.chooseShowpopUpHelp = function (_index){
        switch (_index) {
          case 1:
          popUpService.showPopUpHelpMotor("Nombre de equipo / motor","Corresponde al nombre ficticio con el cual sera identificado el equipo.");

          break;

          case 2:
          popUpService.showPopUpHelpMotor("Voltaje","");
          break;

          case 3:
          popUpService.showPopUpHelpMotor("Amperaje","");
          break;


          case 4:
          popUpService.showPopUpHelpMotor("Factor de potencia","");
          break;

          case 5:
          popUpService.showPopUpHelpMotor("Horas al día","");
          break;

          case 6:
          popUpService.showPopUpHelpMotor("Días al mes","");
          break;


          default:
          break;

        }
      };










    });
  }]);
}).call(this);
