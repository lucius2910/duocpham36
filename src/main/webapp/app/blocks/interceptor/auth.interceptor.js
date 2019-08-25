(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', '$location', '$localStorage', '$sessionStorage'];

    function authInterceptor ($rootScope, $q, $location, $localStorage, $sessionStorage) {
        var service = {
            request: request
        };

        return service;

        function request (config) {
            /*jshint camelcase: false */
            config.headers = config.headers || {};

            //set Root URI API
            if (config.url.indexOf('wp-json') != -1 || config.url.indexOf('api') != -1) {
                config.url = API_CONFIG.API_URL + '/' + config.url;
            }

            var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            config.headers['X-Language'] = 'en';
            config.headers['Access-Control-Allow-Origin'] = '*';
            config.headers['Access-Control-Allow-Headers'] = 'X-WP-Total, X-WP-TotalPages';
            config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
            return config;
        }
    }
})();
