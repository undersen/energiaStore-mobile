'use strict';

(function() {
  this.app.factory('Calculation', ['$http', '$q', 'ENV','StorageUserModel',
  function($http, $q, ENV,StorageUserService){


    return {
      create: function(_calculation) {
        var defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.SIGN_UP,
          method: 'POST',
          headers:{
              username:StorageUserModel.getCurrentUser().username,
              token:StorageUserModel.getCurrentUser().authentication_token
          },
          data:{
            calculation:{
              energy_cost:_calculation
            }
          }
        }).then(function(_response) {
          defer.resolve(_response);

        }, function(_error) {
          defer.reject(_error);
        });
        return defer.promise;
      },

      show: function(_calculation) {
        var defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.SIGN_UP+_calculation.id,
          method: 'GET',
          headers:{
              username:StorageUserModel.getCurrentUser().username,
              token:StorageUserModel.getCurrentUser().authentication_token
          }
        }).then(function(_response) {
          defer.resolve(_response);

        }, function(_error) {
          defer.reject(_error);
        });
        return defer.promise;
      },

      delete: function(_user) {
        var defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.SIGN_UP+"/"+_user.id,
          method: 'DELETE',
          headers:{
              username:StorageUserModel.getCurrentUser().username,
              token:StorageUserModel.getCurrentUser().authentication_token
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
