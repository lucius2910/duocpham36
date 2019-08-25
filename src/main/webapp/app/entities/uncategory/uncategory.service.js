(function() {
    'use strict';
    angular
        .module('footballBeApp')
        .factory('Uncategory', Uncategory);

    Uncategory.$inject = ['$resource'];

    function Uncategory ($resource) {
        var resourceUrl =  'api/posts/:pathMethod/:id';

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
