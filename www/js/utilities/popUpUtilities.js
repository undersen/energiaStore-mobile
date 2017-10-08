'use strict';

(function() {
  this.app.service('popUpService', ['$q', '$ionicPopup','$rootScope','ENV',  function($q, $ionicPopup,$rootScope,ENV) {



    return{

       showPopUpWelcome: function(_translation){

           let deferred = $q.defer();
               let button_exit_lesson = [{ text: _translation.MODAL_WELCOME_BUTTON,  type: 'button-special',onTap: function(e) {
                   return true;
               }}];

               $ionicPopup.show({
                   title: '<div class="congrats"></div><img src="img/special_icons/bandera1.png" class="modal-img-config">',
                   subTitle: '<br><span class="modal-body-config">${_translation.MODAL_WELCOME_BUTTON}</span>',
                   cssClass: 'successClass',
                   buttons:button_exit_lesson,
               },).then(function(_res){
                   deferred.resolve(res);

               });
           return deferred.promise;
       },



      showPopUpCreateFactor : function(){
          let deferred = $q.defer();
              let button_exit_lesson = [{ text: 'Entendido',  type: 'button-special',onTap: function(e) {
                  $state.go("dashboard");
              }}];

              $ionicPopup.show({
                  title: '<div class="congrats"></div><img src="img/special_icons/check1.png" class="modal-img-config">',
                  subTitle: '<br><span class="modal-body-config">Cotizacion realizada de manera exitosa, EnergiaStore se pondra en contacto con usted para enviar su cotización.</span>',
                  cssClass: 'successClass',
                  buttons:button_exit_lesson,
              })

      },


        showPopUpFailCreateFactor : function(a){
            let deferred = $q.defer();
            let button_exit_lesson = [{ text: 'Entendido',  type: 'button-special',onTap: function(e) {
                $state.go("dashboard");
            }}];

            $ionicPopup.show({
                title: '<div class="congrats"></div><img src="img/special_icons/pulgar3_bad.png" class="modal-img-config">',
                subTitle: '<br><span class="modal-body-config">Ups no hemos podido realizar tu cotizacion, porfavor intentalo mas tarde.</span>',
                cssClass: 'successClass',
                buttons:button_exit_lesson,
            },).then(function(_response){
                deferred.resolve(res);

            })
            return deferred.promise;


        },







      showPopupWrench: function(){
        let deferred = $q.defer();
        let button_server_problems = [{ text: 'Entendido',  type: 'button-special',onTap: function(e) {
          return true;
        }}];

        $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/icons/wrench.png" class="modal-img-config">',
          subTitle: '<span class="modal-body-config">Ups !.</span><br><br><span class="modal-body-config" style="font-size:1px;">Estamos trabajando para volver a operar con normalidad.</span>',
          cssClass: 'successClass',
          buttons:button_server_problems,
        },).then(function(res){
          deferred.resolve(res);
        })
        return deferred.promise;
      },

      showPopupExit:function(){
        let button_exit_lesson = [{ text: 'Quedarme',  type: 'button-special',onTap: function(e) {return true;}},{ text: 'Salir del curso',type: 'button-special',onTap: function(e) {/* $scope.modal.hide();$scope.goToMenu();*/return false;}}];
        let deferred = $q.defer();

        $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/icons/warning.png" class="modal-img-config">',
          subTitle: '<br><span class="modal-body-config">Si sales se perdera el avance de este curso.</span>',
          cssClass: 'successClass',
          buttons:button_exit_lesson,
        },).then(function(res){
          deferred.resolve(res);
        });
        return deferred.promise;
      },

      showPopupFail:function(_correct,_total){
        let deferred = $q.defer();
        let button_fail_test = [{ text: 'Tomar desafío nuevamente',  type: 'button-special',onTap: function(e) {return true;}},
        { text: 'Volver al menú',type: 'button-special',onTap: function(e) {return false;}}]

        $ionicPopup.show({
          title: '<img src="img/icons/medals/bad.png" class="modal-img-config">',
          subTitle: '<span class="modal-body-config">Vuelve a intentarlo </br> Obtuviste '+_correct+' / '+_total+' respuestas correctas</span>',
          cssClass: 'failClass',
          buttons:button_fail_test,
        },).then(function(res){
          deferred.resolve(res);
        })
        return deferred.promise;
      },

      showPopupSuccess:function(_correct,_total,_score){
        let deferred = $q.defer();
        let button_success = [{ text: 'Continuar',  type: 'button-special',onTap: function(e) {return true;}}]

        let myPopup = $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/icons/medals/pulgar1.png" class="modal-img-config">',
          subTitle: '<span class="modal-body-config">Felicitaciones aprobaste este desafío con '+_correct+ '/'+_total+'.</span><br><br><span class="modal-body-config">Acumulaste '+ _score +' puntos.</span>',
          cssClass: 'successClass',
          buttons:button_success,
        },).then(function(res){
          deferred.resolve(res);
        })
        return deferred.promise;
      },

      showPopupFlashSuccess:function(_score){
        let deferred = $q.defer();
        let button_success = [{ text: 'Regresar',  type: 'button-special',onTap: function(e) {return true;}}]

        let myPopup = $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/icons/medals/rsz_flash.png" class="modal-img-config">',
          subTitle: '<span class="modal-body-config">Felicitaciones.</span><br><br><span class="modal-body-config">Ganaste '+ _score +' puntos.</span>',
          cssClass: 'successClass',
          buttons:button_success,
        },).then(function(res){
          deferred.resolve(res);
        })
        return deferred.promise;
      },

      showPopupFlash:function(_business_name,_score){
        let deferred = $q.defer();
        let button_success = [
          { text: 'Continuar',  type: 'button-special margin-popup-button',onTap: function(e) {
            // state
            return true;
            $state.go("login",{},{ reload: true })
          }
        },
        { text: 'Ignorar',  type: 'button-special',onTap: function(e) {
          return false;
        }
      }
    ]

    let myPopup = $ionicPopup.show({
      title: '<div class="congrats"></div><img src="img/icons/medals/rsz_flash.png" class="modal-img-config">',
      subTitle: '<span class="modal-body-config">Hola, '+_business_name+' te ha enviado una pregunta relámpago.</span><br><br><span class="modal-body-config">responde inmediatamente y gana '+ _score +' puntos.</span>',
      cssClass: 'successClass',
      buttons:button_success,
    },).then(function(res){
      deferred.resolve(res);
    })
    return deferred.promise;
  },


  showPopupEvaluation:function(_business_name,_score){
    let deferred = $q.defer();
    let button_success = [
      {
        text: 'Continuar',  type: 'button-special margin-popup-button',onTap: function(e) {
        return true;
        $state.go("login",{},{ reload: true })
      }
    }
]

let myPopup = $ionicPopup.show({
  title: '<div class="congrats"></div><img src="img/icons/medals/rsz_flash.png" class="modal-img-config">',
  subTitle: '<span class="modal-body-config">Re-evluación.</span><br><br><span class="modal-body-config">Hola! Queremos saber cuanto de lo que has aprendido todavia te acuerdas </br> Responde a estas preguntas y sigue acumulado puntos.</span>',
  cssClass: 'successClass',
  buttons:button_success,
},).then(function(res){
  deferred.resolve(res);
})
return deferred.promise;
},

  showPopupCloseApp:function(){

    var deferred = $q.defer();
    let button_close_app = [
      {
        text: '<b>Quedarme</b>',
        type: 'button-positive',
        onTap: function(e) {


          return 'asdf';

        }
      },
      {
        text: '<b>Salir</b>',
        type: 'button-positive',
        onTap: function(e) {
          // navigator.app.exitApp();


          return 'cerrar_app';
        }
      }]

      $ionicPopup.show({
        title: '<div class="congrats"></div><img src="img/icons/exclamation.png" class="modal-img-config">',
        subTitle: '<span class="modal-body-config">Salir de Closelly</span><br><div class="subt-close-sesion" ><span class="modal-body-config" style="font-size:1px;">¿Estas seguro que deseas salir?</span></div>',
        cssClass: 'successClass',
        buttons:button_close_app
      },).then(function(res){
        deferred.resolve(res);
      })


      return deferred.promise;
    },

    showPopupGeneric:function(_titulo,_subtitulo,_button,_cssClass,_template){

      let deferred = $q.defer();

      let button_default = [{ text: "Entendido",  type: 'button-special',onTap: function(e) {return true}}]
      let button_update_profile = [{ text: "Entendido",  type: 'button-special',onTap: function(e) {return true}}]
      let button_ready_lesson = [{ text: 'Si, si quiero',type: 'button-course-background',onTap: function(e) {return true}},{ text: 'No, gracias',type: 'button-course-color',onTap: function(e) {return false}}]
      let button_pending_lesson =   [{ text: 'Entendido',type: 'button-course-color' }];
      let button_video_lesson = [{ text: 'Comenzar Test', type: 'button-course-background',onTap: function(e) {return true}},{text: 'Ver video nuevamente',type: 'button-course-color',onTap: function(e) {return false;}}]
      let button_continuar = [{ text: 'Continuar', type: 'button-special btn-kpi'}]
      let button_profile_ready = [{ text: 'Continuar',onTap: function(e) {return true}}]

      if(_button == undefined || _button == ''){_button = button_default;}
      if(_template == undefined){_template='';}

      switch (_button) {
        case 'button_default':
        _button =button_default;
        break;
        case 'update_profile':
        _button =button_update_profile;
        break;
        case 'ready_lesson':
        _button =button_ready_lesson;
        break;
        case 'pending_lesson':
        _button =button_pending_lesson;
        break;
        case 'video_lesson':
        _button =button_video_lesson;
        break;
        case 'button_continuar':
        _button =button_continuar;
        break;
        case 'button_profile_ready':
        _button =button_profile_ready;
        break;
        default:

      }


      let generic_popup = $ionicPopup.show({
        template: _template,
        title: _titulo,
        subTitle: _subtitulo,
        buttons: _button,
        cssClass: _cssClass,
      },).then(function(_response){
        deferred.resolve(_response);
      })

      return deferred.promise;
    },

    showPopupCloselly:function(){

      let about_us_popup = $ionicPopup.show({
        title: '<div class="congrats"></div><img src="img/closelly-logo.png" class="modal-aboutus">',
        subTitle: '<span class="span-copyright">2017 Todos los derechos reservados a Simpler SpA. <i class="fa fa-copyright" aria-hidden="true"></i></span>',
        buttons:[]
      })
    },

    showPopupUpdateProfile:function(){
      let button_update_profile = [{ text: 'Entendido',  type: 'button-special',onTap: function(e) {return true;}}]
      let deferred = $q.defer();

      $ionicPopup.show({
        title: '<div class="congrats"></div><img src="img/icons/medals/check1.png" class="modal-img-config">',
        subTitle: '<span class="modal-body-config">Perfecto.</span><br><br><span class="modal-body-config" style="font-size:1px;">Perfil actualizado satisfactoriamente.</span>',
        cssClass: 'successClass',
        buttons:button_update_profile,
      },).then(function(res){
        deferred.resolve(res);
      })
      return deferred.promise;
    },

    showPopupPhoto:function(){

      var deferred = $q.defer();

      let button_photo = [{ text: "Camara",onTap: function(e) {return 'camera'}},{ text: "Galería",onTap: function(e) {return 'gallery'}}]

      let popup_photo = $ionicPopup.show({
        title: 'Seleccione una foto de perfil',
        subTitle: '',
        template: '',
        buttons: button_photo
      },).then(function(res){
        deferred.resolve(res);
      })
      return deferred.promise;
    },

    showPopupLogOut:function(){

      var deferred = $q.defer();

      let myPopup = $ionicPopup.show({
        title: '<div class="congrats"></div><img src="img/icons/exclamation.png" class="modal-img-config">',
        subTitle: '<span class="modal-body-config">Cerrar Sesión</span><br><div class="subt-close-sesion" ><span class="modal-body-config" style="font-size:1px;">¿Estas seguro que deseas cerrar sesión?</span></div>',
        cssClass: 'successClass',
        buttons: [
          {
            text: '<b>Quedarme</b>',
            type: 'button-positive',
            onTap: function(_e) {}
          },
          {
            text: '<b>Cerrar sesión</b>',
            type: 'button-positive',
            onTap: function(_e) {
              // $scope.logOut();
              return 'logOut';
            }
          }
        ]
      },).then(function(_res){
        deferred.resolve(_res);
      },);
      return deferred.promise;
    },

    showPopupTutorial:function(){

      let button_popup_tutorial = [{ text: 'Seguir aqui', type: 'button-course-background',
      onTap: function(e) {
        return false;
      }},{ text: 'Salir', type: 'button-course-color',
      onTap: function(e) {
        return true;
      }}]

      let tutorial_popup = $ionicPopup.show({
        title: "Salir",
        subTitle: "¿Estás Seguro que deseas salir del tutorial?",
        template: '',
        buttons: button_popup_tutorial
      },).then(function(res){
        deferred.resolve(res);
      })
      return deferred.promise;
    },

    showPopupLeaveProfileRegister:function(){
      let deferred = $q.defer();
      let _buttons_leave_profile =[{ text: 'Seguir aqui',onTap: function(e) {}},{ text: 'Salir',
      onTap: function(e) {
        StorageUserService.destroyCurrentUser();
        $state.go("login",{},{ reload: true })
      }}]


      let generic_popup = $ionicPopup.show({
        template: '',
        title: "Salir",
        subTitle: "¿Estas seguro que deseas salir?",
        buttons: _buttons_leave_profile
      },).then(function(res){
        deferred.resolve(res);
      })
      return deferred.promise;

    },

    showPopupWarningPerformance:function(){
      let deferred = $q.defer();
      let buttonWarning = [{ text: 'Entendido',  type: 'button-special', onTap: function(e) {
        return 'entendido';
      }}]

      let pop_up_warning_kpi = $ionicPopup.show({
        title: '<div class="congrats"></div><img src="img/icons/warning.png" class="modal-img-config">',
        subTitle: '<br><span class="modal-body-config">No es posible mostrar el desempeño del usuario.</span>',
        cssClass: 'successClass',
        buttons:buttonWarning,
      },).then(function(res){
        deferred.resolve(res);
      })
      return deferred.promise;
    },

    showPopupWarningLesson:function(){
      let deferred = $q.defer();
      let button_warning = [{ text: 'Entendido',  type: 'button-special', onTap: function(e) {return true;}}]

      let pop_up_warning_lesson = $ionicPopup.show({
        title: '<div class="congrats"></div><img src="img/icons/warning.png" class="modal-img-config">',
        subTitle: '<br><span class="modal-body-config">No es posible mostrar los cursos del usuario.</span>',
        cssClass: 'successClass',
        buttons:buttonWarning,
      },).then(function(res){
        deferred.resolve(res);
      })
      return deferred.promise;
    },

    showPopUpDescriptionPerformance:function(_kpi,_description){
      let button_ok = [{ text: "Entendido", type: 'button-special btn-kpi'}]

      let pop_up_warning_kpi = $ionicPopup.show({
        title: _kpi,
        subTitle: _description,
        cssClass: 'successClass',
        buttons:button_ok,
      })
    },

    showPopupCongratulations:function(){
      let deferred = $q.defer();
      let button_ok = [{ text: "Continuar",onTap: function(e) {return true;}}]

      let pop_up_warning_kpi = $ionicPopup.show({
        title: "Felicitaciones",
        subTitle: "Has Finalizado tu registro",
        template: ENV.COMPLETE_PROFILE,
        // cssClass: 'successClass',
        buttons:button_ok,
      },).then(function(_response){
        deferred.resolve(_response);
      })
      return deferred.promise;

    },
    showPopupBusinessNotAllowed:function(){
      let deferred = $q.defer();
      let button_warning = [{ text: 'Entendido',  type: 'button-special', onTap: function(e) {return true;}}]

      let pop_up_warning_lesson = $ionicPopup.show({
        title: '<div class="congrats"></div><img src="img/icons/barrier.png" class="modal-img-config">',
        subTitle: '<span class="modal-body-config">Servicio bloqueado.</span><br><span class="modal-body-business">Tome contacto con el proveedor del servicio de la empresa.</span>',
        cssClass: 'successClass',
        buttons:button_warning,
      },).then(function(res){
        deferred.resolve(res);
      })
      return deferred.promise;
    },

    showPopupTokenProblem:function(){
      let deferred = $q.defer();
      let button_warning = [{ text: 'Entendido',  type: 'button-special', onTap: function(e) {return true;}}]

      let pop_up_warning_lesson = $ionicPopup.show({
        title: '<div class="congrats"></div><img src="img/icons/barrier.png" class="modal-img-config">',
        subTitle: '<br><span class="modal-body-config">Se solicita que vuelva a iniciar sesión.</span>',
        cssClass: 'successClass',
        buttons:button_warning,
      },).then(function(res){
        deferred.resolve(res);
      })
      return deferred.promise;
    }

  }

}]);

}).call(this);
