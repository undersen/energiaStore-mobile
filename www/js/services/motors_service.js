'use strict';

(function() {
  this.app.factory('Motors', ['$http', '$q', 'ENV','StorageUserModel',
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

      getByCalculation: function(_calculation_id,_user_info) {
        var defer = $q.defer();
        $http({
          url: ENV.LOCAL + "api/calculations/"+_calculation_id+"/motors",
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




    }
  }]);
}).call(this);
