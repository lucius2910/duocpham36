(function() {
    'use strict';
    angular
        .module('footballBeApp')
        .factory('OrderDetail', OrderDetail);

    OrderDetail.$inject = ['$resource'];

    function OrderDetail ($resource) {
        var resourceUrl =  'wp-json/wc/v3/orders/:id';

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
