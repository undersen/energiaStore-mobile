'use strict';

(function() {
  this.app.factory('User', ['$http', '$q', 'ENV','StorageUserService','StorageBusinessURLService','$rootScope',
  function($http, $q, ENV,StorageUserService,StorageBusinessURLService,$rootScope){


    return {
      registerUser: function(_user) {
        var defer = $q.defer();
        $http({
          url: StorageBusinessURLService.getBusinessUrl() + ENV.REGISTER_USER_ENDPOINT,
          method: 'POST',
          headers:{
            userId:StorageUserService.getCurrentUser().user_id,
          },
          data:{
            user:{
              email:_user.email,
              nickname:_user.nickname,
              password:_user.password,
              image_url:_user.image
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
