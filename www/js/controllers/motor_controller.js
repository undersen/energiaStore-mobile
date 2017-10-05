"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("MotorsController", ["$scope", "$state","$ionicPlatform","Calculation","StorageUserModel","Motors","$ionicModal","$ionicPopup",
  function($scope, $state,$ionicPlatform,Calculation,StorageUserModel,Motors,$ionicModal,$ionicPopup) {
    $ionicPlatform.ready(function() {

      $scope.motors =[];
      $scope.motor = {};

      $scope.user = StorageUserModel.getCurrentUser();

      $scope.init = function(){
        $scope.getMotors();

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

        debugger;

        Motor.create().then(function(_response){

          Materialize.toast("Motor agregado",4000)
        },function(_error){
          Materialize.toast("Problemas al agregar motor",4000);
        })
      }


      $scope.getMotors = function(){
        Motors.getByCalculation($state.params.id_quotation,StorageUserModel.getCurrentUser()).then(function(_response){
          $scope.motors = _response.data;

          console.log($scope.motors);
          $scope.$broadcast('scroll.refreshComplete');
        },function(_error){
          console.log(_error);
          $scope.$broadcast('scroll.refreshComplete');
        })
      }

      $scope.doRefreshMotors = function(){
        $scope.getMotors();
      }


      $scope.chooseShowpopUpHelp = function (_index){
        switch (_index) {
          case 1:
          $scope.showpopUpHelp("Nombre de equipo / motor","Corresponde al nombre ficticio con el cual sera identificado el equipo.");
          break;

          case 2:
          $scope.showpopUpHelp("Fase","")
          break;

          case 3:
          $scope.showpopUpHelp("Voltaje","")
          break;


          case 4:
          $scope.showpopUpHelp("Tipo de medición","")
          break;

          case 5:
          $scope.showpopUpHelp("Amperaje","")
          break;

          case 6:
          $scope.showpopUpHelp("Factor de potencia","")
          break;

          case 7:
          $scope.showpopUpHelp("Horas al día","")
          break;

          case 8:
          $scope.showpopUpHelp("Días al mes","")
          break;
          default:

        }
      }




      $scope.showpopUpHelp = function(_title,_body){

        let button_exit_lesson = [{ text: 'Entendido',  type: 'button-special',onTap: function(e) {
          return true;
        }}]


        $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/special_icons/Growth_Badge_Color.png" class="modal-img-config">',
          subTitle: `<br><span class="modal-title-config">${_title}</span>
                    <br><span class="modal-body-config">${_body}</span>`,
          cssClass: 'successClass',
          buttons:button_exit_lesson,
        })

      }






    });
  }]);
}).call(this);
