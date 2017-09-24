"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller("SettingsController", ["$scope", "$state","$ionicPlatform","$rootScope","Session","StorageUserModel","User","$ionicPopup",
	function($scope, $state,$ionicPlatform,$rootScope,Session,StorageUserModel,User,$ionicPopup) {

		$ionicPlatform.ready(function() {


			$scope.placeholder = {};
			$scope.user = {};

			$scope.init = function(){

			let user  = StorageUserModel.getCurrentUser();
			debugger;

				$scope.placeholder.name = "Nombre";
				$scope.placeholder.last_name = "Apellido";
				$scope.placeholder.phone = "Telefono";
				$scope.placeholder.address = "Direccion";

				if(user.name!= undefined){$scope.placeholder.name = user.name;}
				if(user.last_name!= undefined){$scope.placeholder.name = user.last_name;}
				if(user.phone!= undefined){$scope.placeholder.name = user.phone;}
				if(user.address!= undefined){$scope.placeholder.name = user.address;}

			}


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
						$scope.deleteData();

					},function(_error){
						$scope.deleteData();

					})
				}catch(_error){
					$scope.deleteData();
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
					StorageUserModel.setCurrentUser(_response.data)

					$scope.showpopUpProfileOK();
				},function(_error){
					$scope.showpopUpProfileFail();

				})



			}

			$scope.deleteData= function (){
				StorageUserModel.destroyCurrentUser();
				$state.go("login")
			}



			$scope.showpopUpProfileOK = function(){

				let button_exit_lesson = [{ text: 'Entendido',  type: 'button-special',onTap: function(e) {
					return true;
				}}]


				$ionicPopup.show({
					title: '<div class="congrats"></div><img src="img/special_icons/pulgar1.png" class="modal-img-config">',
					subTitle: '<br><span class="modal-body-config">Perfil completado.</span>',
					cssClass: 'successClass',
					buttons:button_exit_lesson,
				})
			}



			$scope.showpopUpProfileFail = function(){

				let button_exit_lesson = [{ text: 'Entendido',  type: 'button-special',onTap: function(e) {
					return true;
				}}]


				$ionicPopup.show({
					title: '<div class="congrats"></div><img src="img/special_icons/pulgar3_bad.png" class="modal-img-config">',
					subTitle: '<br><span class="modal-body-config">Problemas al completar tu perfil, intentalo más tarde</span>',
					cssClass: 'successClass',
					buttons:button_exit_lesson,
				})
			}



			$scope.showpopUpLogOut = function(){

				let button_exit_lesson = [{ text: 'Cancelar',  type: 'button-special',onTap: function(e) {
return true;
				}},{ text: 'Salir',  type: 'button-special',onTap: function(e) {

$scope.logOut();	}}]


				$ionicPopup.show({
					title: '<div class="congrats"></div><img src="img/special_icons/pulgar3_bad.png" class="modal-img-config">',
					subTitle: '<br><span class="modal-body-config">¿Estas seguro que desea cerrar session?</span>',
					cssClass: 'successClass',
					buttons:button_exit_lesson,
				})
			}


			//TO-DO : validate only 1 change









		});
	}]);
}).call(this);
