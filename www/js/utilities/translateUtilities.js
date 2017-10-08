"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/

app.service('translationService',
    function($resource) {

        return{
            getTranslation:function(language = 'es') {

                return 'js/translations/translation_'+language+'.json';

                // return $resource(languageFilePath).get(function (data) {
                //   return data;
                // })
            },
            translate:function(languageFilePath){
                $resource(languageFilePath).get(function (data) {
                    //  $scope.translations = data;
                    return data;

                })
            }
        }


    });
