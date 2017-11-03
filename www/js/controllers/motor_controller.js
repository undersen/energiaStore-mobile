"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("MotorsController", ["$scope", "$state","$ionicPlatform","Calculation","StorageUserModel","Motors","$ionicModal","popUpService","$resource","translationService","Quotation","$cordovaStatusbar","Utils",
  function($scope, $state,$ionicPlatform,Calculation,StorageUserModel,Motors,$ionicModal,popUpService,$resource,translationService,Quotation,$cordovaStatusbar,Utils) {
    $ionicPlatform.ready(function() {

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {
            $scope.translations = data;
        });

        var user = StorageUserModel.getCurrentUser();


      $scope.motors =[];
      $scope.motor = {};
      $scope.user = StorageUserModel.getCurrentUser();
      $scope.quote={
         calculation_id:'',
         user_id:'',
         comment:'',
         reference:''
      }


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
        $state.go("calculation");
      };


      $scope.createMotor = function (){

        if($scope.motor.name === undefined || $scope.motor.name === '') {
          Utils.validateToast($scope.translations.MOTOR_COMPLETE_NAME);
          return;
        }

        if($scope.motor.voltaje === undefined || $scope.motor.voltaje === 0) {
          Utils.validateToast($scope.translations.MOTOR_COMPLETE_VOLT);
          return;
        }

        if($scope.motor.amp === undefined || $scope.motor.amp === 0) {
          Utils.validateToast($scope.translations.MOTOR_COMPLETE_AMP);
          return;
        }


        if($scope.motor.power_factor === undefined || $scope.motor.power_factor === 0) {
          Utils.validateToast($scope.translations.MOTOR_COMPLETE_FTP);
          return;
        }

        if($scope.motor.hours === undefined || $scope.motor.hours === 0) {
          Utils.validateToast($scope.translations.MOTOR_COMPLETE_HOURS_DAY);
          return;
        }

        if($scope.motor.days === undefined || $scope.motor.days === 0) {
          Utils.validateToast($scope.translations.MOTOR_COMPLETE_DAYS_MONTH);
          return;
        }

        Motors.create($scope.user,$scope.motor,$state.params.id_quotation).then(function(_response){


          Utils.validateToast($scope.translations.MOTOR_ADD_SUCCESS);
          console.log(_response);
          $scope.getMotors();
        },function(_error){
          Materialize.toast("Problemas al agregar motor",4000);
          Utils.validateToast($scope.translations.MOTOR_ADD_FAIL);
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
        let _title;
        let _body;

        switch (_index) {
          case 1:
              _title = $scope.translations.MODAL_HELPER_MOTOR_TITLE;
              _body = $scope.translations.MODAL_HELPER_MOTOR_body;
          break;

          case 2:
              _title = $scope.translations.MODAL_HELPER_AMP_TITLE;
              _body = $scope.translations.MODAL_HELPER_AMP_BODY;

          break;

          case 3:
              _title = $scope.translations.MODAL_HELPER_VOLTAJE_TITLE;
              _body = $scope.translations.MODAL_HELPER_VOLTAJE_BODY;
          break;


          case 4:
              _title = $scope.translations.MODAL_HELPER_POWER_FACTOR_TITLE;
              _body = $scope.translations.MODAL_HELPER_POWER_FACTOR_BODY;
              break;

          case 5:
              _title = $scope.translations.MODAL_HELPER_HOURS_DAY_TITLE;
              _body = $scope.translations.MODAL_HELPER_HOURS_DAY_BODY;
          break;

          case 6:
              _title = $scope.translations.MODAL_HELPER_DAYS_MONTH_TITLE;
              _body = $scope.translations.MODAL_HELPER_DAYS_MONTH_BODY;
          break;
          default:
          break;

          popUpService.showPopUpHelpMotor(_title,_body);
        }
      };



      $scope.FinishQuotation = function(){

        var quote={
         calculation_id:2,
         user_id:3,
         comment:'efwefwef',
         reference:''
      }

          Quotation.Create(user, quote).then(function(_response) {
              debugger;
            }, function(_error) {
              debugger;
            });
      }

      $scope.validateQuotation =  function (){
        $scope.FinishQuotation();
      }


      $scope.goToQuotation= function(){

        $state.go('finalizeQuotation')

        // popUpService.showpopUpGoToQuotation().then(function(_response){
        //   if(_response === 1){
        //
        //   }else{
        //
        //   }
        //
        // })
      }

      //
      //
      // $ionicModal
      //   .fromTemplateUrl("modal-quotation", {
      //     scope: $scope,
      //     animation: "slide-in-up"
      //   })
      //   .then(function(modal_quotation) {
      //     $scope.modalQuotation = modal_quotation;
      //   });
      //
      // $scope.openModalMotor = function() {
      //   $scope.modalQuotation.show();
      // };
      // $scope.closeModalMotor = function() {
      //   $scope.modalQuotation.hide();
      // };
      // // Cleanup the modal when we're done with it!
      // $scope.$on("$destroy", function() {
      //   $scope.modalQuotation.remove();
      // });
      // // Execute action on hide modal
      // $scope.$on("modalQuotation.hidden", function() {
      //   // Execute action
      // });
      // // Execute action on remove modal
      // $scope.$on("modalQuotation.removed", function() {
      //   // Execute action
      // });
      //




    });
  }]);
}).call(this);
