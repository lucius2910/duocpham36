(function () {
    'use strict';

    angular
        .module('footballBeApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register($resource) {
        return $resource('wp-json/wc/v3/customers', {
            consumer_key: API_CONFIG.KEY,
            consumer_secret: API_CONFIG.SEC,
        }, {});
    }
})();
