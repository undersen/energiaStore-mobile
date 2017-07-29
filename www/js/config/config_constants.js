
'use strict';

(function() {
  this.app.constant("ENV", {


    //////////////////////////////////////////
    //****************+SERVERS**************//
    //////////////////////////////////////////

    LOCAL : "http://localhost:3000/",
    // LOCAL : "http://54.183.224.40/", //Servidor produccion

    //////////////////////////////////////////
    //**************+EndPoinst**************//
    //////////////////////////////////////////

    // SESSION_MODEL
    LOGIN_API : "api/session/create",

    // USER_MODEL
    REGISTER_USER_API : "api/user/create",
    UPDATE_USER_API : "api/user/update",






  })
}).call(this);
