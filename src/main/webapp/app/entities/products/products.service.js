(function() {
    'use strict';
    angular
        .module('footballBeApp')
        .factory('ProductsService', ProductsService);

    ProductsService.$inject = ['$resource'];

    function ProductsService ($resource) {
        var resourceUrl =  'wp-json/wc/v3/products';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                // isArray: true,
                transformResponse: function (data, headers) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    var response = {}
                    response.header = headers();
                    response.data = data;

                    return response;
                }

                // interceptor: {
                //     response: function (response) {
                //         // expose response
                //         return response;
                //     }
                // }
            }
        });
    }
})();
