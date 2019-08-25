(function() {
    'use strict';
    angular
        .module('footballBeApp')
        .factory('CategoryService', CategoryService);

    CategoryService.$inject = ['$resource'];

    function CategoryService ($resource) {
        var resourceUrl =  'wp-json/wc/v3/products/categories';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                isArray: true,
                params:{
                    consumer_key: API_CONFIG.KEY,
                    consumer_secret: API_CONFIG.SEC
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
