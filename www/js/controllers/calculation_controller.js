"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("CalculationController", ["$scope","$state","$ionicPlatform","$ionicSlideBoxDelegate","$ionicPopup","StorageUserModel","Calculation","translationService","$resource","IonicClosePopupService",
    function($scope,$state,$ionicPlatform,$ionicSlideBoxDelegate,$ionicPopup,StorageUserModel,Calculation,translationService,$resource,IonicClosePopupService) {
      $ionicPlatform.ready(function() {

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function(data) {
          $scope.translations = data;
        });

        $scope.has_quotation = false;
        $scope.calculations = {};

        $scope.back = function() {
          $state.go("dashboard");
        };

        $scope.init = function() {
          $scope.getCalculation();
        };

        $scope.doRefreshQuotation = function() {
          $scope.getCalculation();
        };

        $scope.addQuotationPopUp = function() {
          $scope.data = {};

          // Custom popup
          let popup = $ionicPopup.show({
            title: '<div class="congrats"></div><img src="img/special_icons/rsz_settings.png" class="modal-img-config">',
            template: ` <div class="modal-body-config"><h5>Creacion de Cotizacion</h5><div class="input-field col s12">
          <input id="quotation_name" type="text" class="validate" ng-model="data.name"><label for="quotation_name">${$scope
            .translations.ADD_QUOTATION_POPUP_FIRST_INPUT}</label></div>
          <div class="input-field col s12">
          <input id="quotation_kwh_price" type="number" min="0" class="validate" ng-model="data.price"><label for="quotation_kw_price">${$scope
            .translations.ADD_QUOTATION_POPUP_SECOND_INPUT}</label></div></div>`,
            // subTitle: 'Subtitle',
            scope: $scope,


            buttons: [
              {
                text: `<b>${$scope.translations
                  .QUOTATION_POPUP_ACCEPT_BUTTON}</b>`,
                cssClass: "special-color",
                type: "button-positive",

                onTap: function(e) {
                  if (!$scope.data.name) {
                    Utils.validateToast($scope.translations.QUOTATION_ERROR_EMPTY_FIRST_INPUT_INFO,);
                    e.preventDefault();
                  } else if (!$scope.data.price) {
                    Utils.validateToast($scope.translations.QUOTATION_ERROR_EMPTY_SECOND_INPUT_INFO);
                    e.preventDefault();
                  } else {
                    $scope.craeteCalculation($scope.data);
                    // return $scope.data.model;
                  }
                }
              }
            ]
          });


              IonicClosePopupService.register(popup);
        };

        $scope.craeteCalculation = function(data) {
          Calculation.create(data, StorageUserModel.getCurrentUser()).then(
            function(_response) {
              Utils.validateToast($scope.translations.QUOTATION_CREATED_MESSAGE);
              $scope.calculations = {};
              $scope.getCalculation();
              console.log(_response);
            },
            function(_error) {
              Utils.validateToast($scope.translations.QUOTATION_FAIL_MESSAGE);
              console.log(_error);
            }
          );
        };

        $scope.getCalculation = function() {
          Calculation.getAll(StorageUserModel.getCurrentUser()).then(
            function(_response) {
              $scope.calculations = _response.data;
              $scope.$broadcast("scroll.refreshComplete");
              console.log(_response);
            },
            function(_error) {
              Utils.validateToast($scope.translations.QUOTATION_ERROR_DOWNLOAD_INFO);
              $scope.$broadcast("scroll.refreshComplete");
              console.error(_error);
            }
          );
        };

        $scope.goToCalculation = function(_index) {
          $state.go("motors", { id_quotation: _index }, { reload: true });
        };


         $scope.shouldShowDelete = false;
         $scope.shouldShowReorder = false;
         $scope.listCanSwipe = true;


      });
    }
  ]);
}.call(this));
