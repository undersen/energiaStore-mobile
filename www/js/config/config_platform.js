'use strict';
/*
=========================================
PLATFORM CONFIGURATION
=========================================
*/

(function() {
  this.app.run(function($ionicPlatform,$rootScope,$cordovaAppVersion) {

    $ionicPlatform.ready(function() {

      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(false);
      }


      if (window.StatusBar) {
                StatusBar.overlaysWebView(false);
            }

    });
  })
}).call(this);
