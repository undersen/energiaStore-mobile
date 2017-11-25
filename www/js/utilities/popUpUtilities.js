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
          title: `<div class="congrats"></div><img src="img/special_icons/bandera1.png" class="modal-img-config">`,
          subTitle: `<br><span class="modal-body-config">${_translation.MODAL_WELCOME_TEXT}</span>`,
          cssClass: 'successClass',
          buttons:button_exit_lesson,
        },).then(function(_res){
          deferred.resolve(_res);
        });
        return deferred.promise;
      },



      showPopUpCreateFactor : function(_translation){
        let deferred = $q.defer();
        let button_exit_lesson = [{ text: _translation.MODAL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function(e) {
          return true;
        }}];

        $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/special_icons/check1.png" class="modal-img-config">',
          subTitle: `<br><span class="modal-body-config">${_translation.MODAL_CREATE_FACTOR_TEXT}</span>`,
          cssClass: 'successClass',
          buttons:button_exit_lesson,
        },).then(function(_res){
          deferred.resolve(_res);
        });
        return deferred.promise;
      },


      showPopUpFailCreateFactor : function(_translation){
        let deferred = $q.defer();
        let button_exit_lesson = [{ text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function(e) {
          return true;
        }}];

        $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/special_icons/pulgar3_bad.png" class="modal-img-config">',
          subTitle: `<br><span class="modal-body-config">${_translation.MODAL_FAIL_CREATE_FACTOR_TEXT}</span>`,
          cssClass: 'successClass',
          buttons:button_exit_lesson,
        },).then(function(_res){
          deferred.resolve(_res);

        });
        return deferred.promise;
      },


      showPopUpHelpMotor : function(_title,_body,_translation){
        let deferred = $q.defer();
        let button_exit_lesson = [{ text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function(e) {
          $state.go("dashboard");
        }}];

        $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/special_icons/pulgar3_bad.png" class="modal-img-config">',
          subTitle: `<br><span class="modal-title-config">${_title}</span><br><span class="modal-body-subtitle">${_body}</span>`,
          cssClass: 'successClass',
          buttons:button_exit_lesson,
        },).then(function(_res){
          deferred.resolve(_res);

        });
        return deferred.promise;
      },

      showPopUpWelcomeLanguage : function(_translation){
        let deferred = $q.defer();
        let button_exit_lesson = [{ text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function(e) {
          return true;
        }}];

        $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/special_icons/pulgar3_bad.png" class="modal-img-config">',
          subTitle: `<br><span class="modal-title-config">${_translation.MODAL_WELCOME_LANGUAGUE_TITLE}</span><br><span class="modal-body-subtitle">${_translation.MODAL_WELCOME_LANGUAGUE_BODY}</span>`,
          cssClass: 'successClass',
          buttons:button_exit_lesson,
        },).then(function(_res){
          deferred.resolve(_res);

        });
        return deferred.promise;
      },


      showpopUpLogOut : function(_translation){
        let deferred = $q.defer();
        let button_exit_lesson = [{ text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function(e) {
          return true;
        }}];

        $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/special_icons/pulgar3_bad.png" class="modal-img-config">',
          subTitle: `<br><span class="modal-title-config">${_translation.MODAL_LOGOUT_TITLE}</span><br><span class="modal-body-subtitle">${_translation.MODAL_LOGOUT_TEXT}</span>`,
          cssClass: 'successClass',
          buttons:button_exit_lesson,
        },).then(function(_res){
          deferred.resolve(_res);

        });
        return deferred.promise;
      },



      showpopUpProfileFail : function(_translation){
        let deferred = $q.defer();
        let button_exit_lesson = [{ text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function(e) {
          return true;
        }}];

        $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/special_icons/pulgar3_bad.png" class="modal-img-config">',
          subTitle: `<br><span class="modal-body-config">${_translation.MODAL_PROFILE_FAIL_BODY}</span>`,
          cssClass: 'successClass',
          buttons:button_exit_lesson,
        },).then(function(_res){
          deferred.resolve(_res);

        });
        return deferred.promise;
      },


      showpopUpProfileCreate : function(_translation){
        let deferred = $q.defer();
        let button_exit_lesson = [{ text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function(e) {
          return true;
        }}];

        $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/special_icons/pulgar1.png" class="modal-img-config">',
          subTitle: `<br><span class="modal-body-config">${_translation.PROFILE_COMPLETED}</span>`,
          cssClass: 'successClass',
          buttons:button_exit_lesson,
        },).then(function(_res){
          deferred.resolve(_res);

        });
        return deferred.promise;
      },



      showpopUpGoToQuotation : function(_translation,_motors){
        let deferred = $q.defer();
        let buttons = [{ text: "Completar cotizacion",  type: 'button-special',onTap: function(e) {
          return 1;
        }},
        { text: "Cancelar",  type: 'button-special',onTap: function(e) {
          return 2;
        }}];

        $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/special_icons/pulgar1.png" class="modal-img-config">',
          subTitle: `<br><span class="modal-body-config">Finalizar cotizacion.</span>`,
          cssClass: 'successClass',
          buttons:buttons,
        },).then(function(_res){
          deferred.resolve(_res);

        });
        return deferred.promise;
      },


      showPopupLeaveRegister : function(_translation){
        let deferred = $q.defer();
        let buttons = [
          { text: `${_translation.REGISTER_POPUP_LEAVE_BUTTON}`,  type: 'button-special',onTap: function(e) {
            return 2;
          }},{ text: `${_translation.REGISTER_POPUP_CONTINUE_BUTTON}`,  type: 'button-special',onTap: function(e) {
            return 1;
          }}];

          $ionicPopup.show({
            title: '<div class="congrats"></div><img src="img/special_icons/pulgar1_bad.png" class="modal-img-config">',
            subTitle: `<br><span class="modal-body-config">${_translation.REGISTER_POPUP_LEAVE_TEXT}</span>`,
            cssClass: 'successClass',
            buttons:buttons,
          },).then(function(_res){
            deferred.resolve(_res);

          });
          return deferred.promise;
        },


        showPopupTokenProblem : function(_translation){

          let deferred = $q.defer();
          let buttons = [
            { text: `${_translation.TOKEN_PROBLEM_BUTTON}`,  type: 'button-special',onTap: function(e) {
              return true;
            }}];

            $ionicPopup.show({
              title: '<div class="congrats"></div><img src="img/special_icons/pulgar1_bad.png" class="modal-img-config">',
              subTitle: `<br><span class="modal-body-config">${_translation.TOKEN_PROBLEM_TEXT}</span>`,
              cssClass: 'successClass',
              buttons:buttons,
            },).then(function(_res){
              deferred.resolve(_res);

            });
            return deferred.promise;
          },

          showPopUpExplorer: function(_translation){

            let deferred = $q.defer();
            let buttons = [
              { text: `${_translation.TOKEN_PROBLEM_BUTTON}`,  type: 'button-special',onTap: function(e) {
                return true;
              }}];

              $ionicPopup.show({
                title: '<div class="congrats"></div><img src="img/special_icons/pulgar1.png" class="modal-img-config">',
                subTitle: `<br><span class="modal-body-config">${_translation.EXPLORER_TITLE}</span></br>
                <span class="modal-body-subtitle">${_translation.EXPLORER_TEXT}</span>`,
                cssClass: 'successClass',
                buttons:buttons,
              },).then(function(_res){
                deferred.resolve(_res);

              });
              return deferred.promise;
            },

            showPopUpRegister: function(_translation){

              let deferred = $q.defer();
              let buttons = [
                { text: `${_translation.REGISTER_EXPLORER_BUTTON_NO}`,  type: 'button-special',onTap: function(e) {
                  return true;
                }},{ text: `${_translation.REGISTER_EXPLORER_BUTTON_YES}`,  type: 'button-special',onTap: function(e) {
                  return false;
                }}];

                $ionicPopup.show({
                  title: '<div class="congrats"></div><img src="img/special_icons/pulgar1.png" class="modal-img-config">',
                  subTitle: `<br><span class="modal-body-config">${_translation.REGISTER_EXPLORER_TITLE}</span></br>
                  <span class="modal-body-subtitle">${_translation.REGISTER_EXPLORER_TEXT}</span>`,
                  cssClass: 'successClass',
                  buttons:buttons,
                },).then(function(_res){
                  deferred.resolve(_res);

                });
                return deferred.promise;
              },


              showPopUpExitExplorer: function(_translation){

                let deferred = $q.defer();
                let buttons = [
                  { text: `${_translation.LOGOUT_EXPLORER_BUTTON_STAY}`,  type: 'button-special',onTap: function(e) {
                    return true;
                  }},{ text: `${_translation.LOGOUT_EXPLORER_BUTTON_LEAVE}`,  type: 'button-special',onTap: function(e) {
                    return false;
                  }}];

                  $ionicPopup.show({
                    title: '<div class="congrats"></div><img src="img/special_icons/pulgar1.png" class="modal-img-config">',
                    subTitle: `<br><span class="modal-body-config">${_translation.LOG_OUT_EXPLORER_TITLE}</span></br>
                    <span class="modal-body-subtitle">${_translation.LOG_OUT_EXPLORER_TEXT}</span>`,
                    cssClass: 'successClass',
                    buttons:buttons,
                  },).then(function(_res){
                    deferred.resolve(_res);

                  });
                  return deferred.promise;
                },

              };

            }]);

          }).call(this);
