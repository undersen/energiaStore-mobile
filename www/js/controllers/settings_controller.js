"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller("SettingsController", ["$scope", "$state","$ionicPlatform","$rootScope","Session","StorageUserModel","User",
	function($scope, $state,$ionicPlatform,$rootScope,Session,StorageUserModel,User) {

		$ionicPlatform.ready(function() {


			$scope.placeholder = {};
			$scope.user = {};

			$scope.placeholder.name = "nombre";
			$scope.placeholder.last_name = "apellido";
			$scope.placeholder.phone = "telefono";
			$scope.placeholder.address = "direccion";


			$scope.$on("$ionicView.beforeEnter", function(event) {
				let user = Object.assign({}, StorageUserModel.getCurrentUser());

				if (user.name != undefined)
				$scope.placeholder.name = user.name;

				if (user.last_name != undefined)
				$scope.placeholder.last_name = user.last_name;

				if (user.phone != undefined)
				$scope.placeholder.phone = user.phone;

				if (user.address != undefined)
				$scope.placeholder.address = user.address;

			})


			$scope.changeLanguage = function(){

			}

			$scope.backButton = function(){
				$state.go("dashboard");
			}

			$ionicPlatform.registerBackButtonAction(function () {
				$scope.backButton();
			}, 100);

			$scope.logOut = function (_response){
				try{
					Session.logout().then(function(){
						StorageUserModel.destroyCurrentUser();
						$state.go("login")
					},function(_error){

					})
				}catch(_error){
					StorageUserModel.destroyCurrentUser();
					$state.go("login")
				}
			}

			$scope.updateInfo = function(){

				if($scope.user.name == undefined || $scope.user.name  == ''){
					Materialize.toast("Complete nombre",4000)
					return;
				}

				if($scope.user.last_name == undefined || $scope.user.last_name  == ''){
					Materialize.toast("Complete apellido",4000)
					return;
				}
				if($scope.user.phone == undefined || $scope.user.phone  == ''){
					Materialize.toast("Complete telefono",4000)
					return;
				}
				if($scope.user.address == undefined || $scope.user.address  == ''){
					Materialize.toast("Complete dirección",4000)
					return;
				}



				User.updateUser(StorageUserModel.getCurrentUser(),$scope.user).then(function(_response){

					debugger;
				},function(_error){


					debugger;
				})



			}




		});
	}]);
}).call(this);
