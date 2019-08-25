(function() {
    'use strict';
    angular
        .module('footballBeApp')
        .factory('NonceService', NonceService);

    NonceService.$inject = ['$resource'];

    function NonceService ($resource) {
        var resourceUrl =  'api/get_nonce';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'POST',
                datas:{
                    controller: 'user',
                    method: 'register'
                },
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
        });
    }
})();
