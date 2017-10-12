"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("QuotationController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","$ionicPopup","StorageUserModel","Calculation","translationService","$resource",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,$ionicPopup,StorageUserModel,Calculation,translationService,$resource) {

    $ionicPlatform.ready(function() {

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {
            $scope.translations = data;
        });

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
          <input id="quotation_name" type="text" class="validate" ng-model="data.name"><label for="quotation_name">${$scope.translations.ADD_QUOTATION_POPUP_FIRST_INPUT}</label></div>
          <div class="input-field col s12">
          <input id="quotation_kwh_price" type="number" min="0" class="validate" ng-model="data.price"><label for="quotation_kw_price">${$scope.translations.ADD_QUOTATION_POPUP_SECOND_INPUT}</label></div>`,
          title: $scope.translations.ADD_QUOTATION_POPUP_TITLE,
          // subTitle: 'Subtitle',
          scope: $scope,

          buttons: [
            { text: $scope.translations.QUOTATION_POPUP_CANCEL_BUTTON }, {
              text: `<b>${$scope.translations.QUOTATION_POPUP_ACCEPT_BUTTON}</b>`,
              cssClass:'special-color',
              type: 'button-positive',

              onTap: function(e) {

                if (!$scope.data.name ) {
                  Materialize.toast($scope.translations.QUOTATION_ERROR_EMPTY_FIRST_INPUT_INFO,4000);
                  e.preventDefault();
                } else if (!$scope.data.price){
                  Materialize.toast($scope.translations.QUOTATION_ERROR_EMPTY_SECOND_INPUT_INFO,4000);
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

        Materialize.toast($scope.translations.QUOTATION_CREATED_MESSAGE, 4000);
        $scope.calculations ={};
        $scope.getCalculation();
        console.log(_response);

        },function(_error){
          Materialize.toast($scope.translations.QUOTATION_FAIL_MESSAGE,4000);
          console.log(_error);
        })

      };


      $scope.getCalculation =  function (){

        Calculation.getAll(StorageUserModel.getCurrentUser()).then(function(_response){
          $scope.calculations = _response.data;
          $scope.$broadcast('scroll.refreshComplete');
          console.log(_response);
        },function(_error){
          Materialize.toast($scope.translations.QUOTATION_ERROR_DOWNLOAD_INFO,4000);
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
