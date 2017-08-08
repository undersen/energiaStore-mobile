'use strict';

(function() {
  this.app.factory('User', ['$http', '$q', 'ENV','StorageUserModel',
  function($http, $q, ENV,StorageUserService){


    return {
      registerUser: function(_user) {
        var defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.SIGN_UP,
          method: 'POST',
          data:{
            user:{
              username:_user.email,
              password:_user.password,
              password_confirmation:_user.password_confirmation
            }
          }
        }).then(function(_response) {
          defer.resolve(_response);

        }, function(_error) {
          defer.reject(_error);
        });
        return defer.promise;
      },

      updateUser: function(_user) {
        var defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.SIGN_UP+"/"+_user.id,
          method: 'POST',
          headers:{
            username:StorageUserModel.getCurrentUser().username,
            token:StorageUserModel.getCurrentUser().authentication_token
          },
          data:{
            user:{
              email:_user.email,
              phone:_user.phone,
              address:_user.address,
              name:_user.name,
              last_name:_user.last_name,
              city:_user.city,
              country:_user.country
            }
          }
        }).then(function(_response) {
          defer.resolve(_response);

        }, function(_error) {
          defer.reject(_error);
        });
        return defer.promise;
      },


    }
  }]);
}).call(this);
