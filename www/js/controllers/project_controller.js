"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("ProjectController", ["$scope","$state","$ionicPlatform","$ionicPopup","StorageUserModel","Calculation","translationService","$resource","IonicClosePopupService","Utils","$ionicLoading","httpUtilities","popUpService","StorageProject","Quotation",
    function($scope,$state,$ionicPlatform,$ionicPopup,StorageUserModel,Calculation,translationService,$resource,IonicClosePopupService,Utils,$ionicLoading,httpUtilities,popUpService,StorageProject,Quotation) {
      $ionicPlatform.ready(function() {

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function(data) {
          $scope.translations = data;
          $scope.init();
        });

        $scope.has_quotation = false;
        $scope.calculations = {};
        var user = StorageUserModel.getCurrentUser();
        $scope.user = StorageUserModel.getCurrentUser();

        $scope.back = function() {
          $state.go("dashboard");
        };

        $scope.init = function() {
          $ionicLoading.show({
          template: `${$scope.translations.LOADING}...`
        }).then(function () {

          if(user.type_user === 'explorer'){
            $scope.getExplorerCalulation();
          }else{
              $scope.getCalculation();
          }


        });
        };

        $scope.getExplorerCalulation = function(){

          if(StorageProject.getProjects()=== undefined){

          }else{
            $scope.calculations[0] = StorageProject.getProjects();
          }

          $ionicLoading.hide();
          $scope.$broadcast("scroll.refreshComplete");

        }


        $scope.doRefreshQuotation = function() {
          if(user.type_user === 'explorer'){
            $scope.getExplorerCalulation();
          }else{
              $scope.getCalculation();
          }
          // $scope.getCalculation();
        };

        $scope.addQuotationPopUp = function() {
          $scope.data = {};

          // Custom popup
          let popup = $ionicPopup.show({
            title: '<div class="congrats"></div><img src="img/special_icons/rsz_settings.png" class="modal-img-config">',
            template: ` <div class="modal-body-config"><h5>${$scope.translations.CREATE_QUOTATION_POPUP_TEXT}</h5><div class="input-field col s12">
          <input id="quotation_name" type="text" class="validate" ng-model="data.name"><label for="quotation_name">${$scope
            .translations.ADD_QUOTATION_POPUP_FIRST_INPUT}</label></div>
          <div class="input-field col s12">
          <input id="quotation_kwh_price" type="number" min="0"  pattern="[0-9]*" class="validate" ng-model="data.price"><label for="quotation_kw_price">${$scope
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
                    if(user.type_user === 'explorer'){
                      if(StorageProject.getProjects() === undefined){

                        var project={
                          name:$scope.data.name,
                          energy_cost:$scope.data.price
                        }


                      StorageProject.addProjects(project);
                      $scope.getExplorerCalulation();

                    }else{
                      console.log('PopUp solo 1 proyecto en modo explorer');
                      //PopUp solo 1 proyecto en modo explorer
                    }
                    }else{
                      $scope.craeteCalculation($scope.data);
                    }

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
              $ionicLoading.hide()
            },
            function(_error) {
              $ionicLoading.hide()
              httpUtilities.validateHTTPResponse(_error,popUpService,$scope.translations);

              // Utils.validateToast($scope.translations.QUOTATION_ERROR_DOWNLOAD_INFO);
              $scope.$broadcast("scroll.refreshComplete");
              console.error(_error);

            }
          );
        };

        $scope.goToCalculation = function(_index) {
          var queries = {
            id_quotation: _index,
            project_name: "Hola"
          }

          $state.go("motors", queries, { reload: true });
        };


        $scope.goToProjects= function(){
          $state.go('project');
        }
        $scope.goToProfile= function(){
          $state.go('settings');
        }
        $scope.goToQuotes= function(){

          $state.go('quotation');
        }



        $scope.showPDF = function(values){
          if(StorageUserModel.getCurrentUser().type_user === 'explorer'){

          }else{
            debugger;
            $scope.getAvaliablePDF(values);
          }
        }


        $scope.getAvaliablePDF = function(value){
          Quotation.getAvaliablesPDFById(StorageUserModel.getCurrentUser(),value.id).then(function(_response){
            debugger;
          },function(_error){

          })
        }

         $scope.shouldShowDelete = false;
         $scope.shouldShowReorder = false;
         $scope.listCanSwipe = true;



         $ionicPlatform.registerBackButtonAction(function () {
             $state.go("dashboard");
         }, 100);


      });
    }
  ]);
}.call(this));
