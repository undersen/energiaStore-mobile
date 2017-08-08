"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("QuotationController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","$ionicPopup","StorageQuotation",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,$ionicPopup,StorageQuotation) {

    $ionicPlatform.ready(function() {

      $scope.has_quotation=false;

      $scope.back = function(){
        $state.go("dashboard");
      }


$scope.addQuotationPopUp = function (){


     $scope.data = {}

     // Custom popup
     var myPopup = $ionicPopup.show({
        template: '  <div class="input-field col s12"><input id="quotation_name" type="text" class="validate" ng-model="data.model"><label for="quotation_name">Nombre cotizacion</label></div>',
        title: 'Crear cotizacion',
        // subTitle: 'Subtitle',
        scope: $scope,

        buttons: [
           { text: 'Cancelar' }, {
              text: '<b>Crear</b>',
              cssClass:'special-color',
              type: 'button-positive',

              onTap: function(e) {

                 if (!$scope.data.model) {
                Materialize.toast("Ingrese nombre cotizacion",4000)
                    //don't allow the user to close unless he enters model...
                    e.preventDefault();
                 } else {
                    $scope.registerQuotation($scope.data.model);
                    // return $scope.data.model;
                 }
              }
           }
        ]
     });

     myPopup.then(function(res) {
        console.log('Tapped!', res);
     });
}

$scope.registerQuotation= function (name){

  StorageQuotation.addQuotation(name);

}











    });
  }]);
}).call(this);
