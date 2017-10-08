"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("QuotationController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","$ionicPopup","StorageUserModel","Calculation",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,$ionicPopup,StorageUserModel,Calculation) {

    $ionicPlatform.ready(function() {

      $scope.has_quotation=false;
      $scope.calculations ={};

      $scope.back = function(){
        $state.go("dashboard");
      };

      $scope.init = function(){

        $scope.getCalculation();

      };

      $scope.doRefreshQuotation = function(){

        $scope.getCalculation();
      };

      $scope.addQuotationPopUp = function (){


        $scope.data = {};

        // Custom popup
        let myPopup = $ionicPopup.show({
          template: ` <div class="input-field col s12">
          <input id="quotation_name" type="text" class="validate" ng-model="data.name"><label for="quotation_name">Nombre cotizacion</label></div>
          <div class="input-field col s12">
          <input id="quotation_kwh_price" type="number" min="0" class="validate" ng-model="data.price"><label for="quotation_kw_price">Precio KW (clp)</label></div>`,
          title: 'Crear cotizacion',
          // subTitle: 'Subtitle',
          scope: $scope,

          buttons: [
            { text: 'Cancelar' }, {
              text: '<b>Crear</b>',
              cssClass:'special-color',
              type: 'button-positive',

              onTap: function(e) {

                if (!$scope.data.name ) {
                  Materialize.toast("Ingrese nombre cotizacion",4000);
                  //don't allow the user to close unless he enters model...
                  e.preventDefault();
                } else if (!$scope.data.price){
                  Materialize.toast("Ingrese precio cotizacion",4000);
                  e.preventDefault();
                }else{
                  $scope.craeteCalculation($scope.data);
                  // return $scope.data.model;
                }
              }
            }
          ]
        });

        myPopup.then(function(res) {
          console.log('Tapped!', res);
        });
      };

      $scope.craeteCalculation= function (data){
        Calculation.create(data,StorageUserModel.getCurrentUser()).then(function(_response){

        Materialize.toast("Cotizacion creada", 4000);
        $scope.calculations ={};
        $scope.getCalculation();
        console.log(_response);

        },function(_error){
          Materialize.toast("Error al crear la cotizacion");
          console.log(_error);
        })

      };


      $scope.getCalculation =  function (){

        Calculation.getAll(StorageUserModel.getCurrentUser()).then(function(_response){
          $scope.calculations = _response.data;
          $scope.$broadcast('scroll.refreshComplete');
          console.log(_response);
        },function(_error){
          Materialize.toast("Error al descargar las cotizaciones",4000);
          $scope.$broadcast('scroll.refreshComplete');
          console.error(_error);
        })

      };

      $scope.goToCalculation = function(_index){
        $state.go("motors",{id_quotation: _index},{ reload: true });
      }


    });
  }]);
}).call(this);
