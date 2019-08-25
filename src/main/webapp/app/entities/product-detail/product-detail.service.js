(function() {
    'use strict';
    angular
        .module('footballBeApp')
        .factory('ProductDetail', ProductDetail);

    ProductDetail.$inject = ['$resource'];

    function ProductDetail ($resource) {
        var resourceUrl =  'wp-json/wc/v3/products/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            }
        });
    }
})();
