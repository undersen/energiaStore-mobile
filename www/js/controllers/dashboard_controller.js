"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("DashboardController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate) {

    $ionicPlatform.ready(function() {

      $scope.goToQuotation = function(){

        $state.go("quotation");

      }


      $scope.logOut = function (){



        $state.go("login")
      }



    });
  }]);
}).call(this);
