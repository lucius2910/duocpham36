(function () {
    'use strict';

    angular
        .module('footballBeApp')
        .factory('Account', Account);

    Account.$inject = ['$resource'];

    function Account($resource) {
        var service = $resource('/wp-json/wc/v3/customers/:user_id', {}, {
            'get': {
                method: 'GET',
                interceptor: {
                    response: function (response) {
                        // expose response
                        return response;
                    }
                }
            },
            'save': {
                method: 'POST',
                interceptor: {
                    response: function (response) {
                        // expose response
                        return response;
                    }
                }
            }
        });

        return service;
    }
})();
