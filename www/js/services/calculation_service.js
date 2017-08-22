'use strict';

(function() {
  this.app.factory('Calculation', ['$http', '$q', 'ENV','StorageUserModel',
  function($http, $q, ENV,StorageUserService){


    return {
      create: function(_calculation,_user_info) {
        var defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.CREATE_CALCULATION,
          method: 'POST',
          headers:{
            username:_user_info.username,
            token:_user_info.authentication_token
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

      getByIndex: function(_calculation_id,_user_info) {
        var defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.INDEX_CALCULATION+_calculation_id,
          method: 'GET',
          headers:{
              username:_user_info.username,
              token:_user_info.authentication_token
          }
        }).then(function(_response) {
          defer.resolve(_response);

        }, function(_error) {
          defer.reject(_error);
        });
        return defer.promise;
      },

      getAll: function(_user_info) {
        var defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.INDEX_CALCULATION,
          method: 'GET',
          headers:{
              username:_user_info.username,
              token:_user_info.authentication_token
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
