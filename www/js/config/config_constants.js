
'use strict';

(function() {
  this.app.constant("ENV", {


    //////////////////////////////////////////
    //****************+SERVERS**************//
    //////////////////////////////////////////

    LOCAL : "//localhost:3000/",
    // LOCAL : "http://54.183.224.40/", //Servidor produccion

    //////////////////////////////////////////
    //**************+EndPoinst**************//
    //////////////////////////////////////////

    // SESSION_MODEL
    SIGN_UP : "api/signup",
    SIGN_IN : "api/login",
    LOG_OUT : "api/logout",

    // USER_MODEL
    UPDATE_USER_API : "api/users/",


    //CALCULATIONS_MODEL
    CREATE_CALCULATION: "api/calculations",
    SHOW_CALCULATION: "api/calculations/",
    INDEX_CALCULATION: "api/calculations/",
    DESTROY_CALCULATION: "api/calculations",






  })
}).call(this);
