(function() {
    'use strict';
    angular
        .module('footballBeApp')
        .factory('ThanhToan', ThanhToan);

    ThanhToan.$inject = ['$resource'];

    function ThanhToan ($resource) {
        var resourceUrl =  'wp-json/wc/v3/orders';

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
            },
            'save': {
                method: 'POST',
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
