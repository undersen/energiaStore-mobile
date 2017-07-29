"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("QuotationController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate) {

    $ionicPlatform.ready(function() {

      $scope.has_quotation=false;

      $scope.back = function(){
        $state.go("dashboard");
      }







    });
  }]);
}).call(this);
