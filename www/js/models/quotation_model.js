
'use strict';

(function() {
  this.app.service('StorageQuotation', ['$q', '$localStorage', function($q, $localStorage) {

    var quotation;

    return {

      getQuotations: function() {
        return quotation = $localStorage.quotation;
      },
      addQuotation: function(data) {

        $localStorage.quotation=data;
      },
      destroyCurrentUser: function() {
        delete $localStorage.quotation;
        return true;
      }
    };

  }]);
}).call(this);
