(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .factory('errorHandlerInterceptor', errorHandlerInterceptor);

    errorHandlerInterceptor.$inject = ['$q', '$rootScope'];

    function errorHandlerInterceptor ($q, $rootScope) {
        var service = {
            responseError: responseError
        };

        return service;

        function responseError (response) {
            if (!(response.status === 401 && (response.data === '' || (response.data.path && response.data.path.indexOf('/api/oauth/v2/token') === 0 )))) {
                $rootScope.$emit('footballBeApp.httpError', response);
            }
            return $q.reject(response);
        }
    }
})();
