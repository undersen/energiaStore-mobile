
'use strict';

(function() {
  this.app.service('StorageUserModel', ['$q', '$localStorage', function($q, $localStorage) {

    var courses;

    return {

      getCurrentUser: function() {
        return courses = $localStorage.courses;
      },
      setCurrentUser: function(data) {

        $localStorage.courses = data;
      },
      destroyCurrentUser: function() {
        delete $localStorage.courses;
        return true;
      }
    };

  }]);
}).call(this);
