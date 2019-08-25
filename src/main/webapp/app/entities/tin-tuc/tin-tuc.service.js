(function() {
    'use strict';
    angular
        .module('footballBeApp')
        .factory('TinTuc', TinTuc);

    TinTuc.$inject = ['$resource'];

    function TinTuc ($resource) {
        var resourceUrl =  'api/v1/tin-tuc/';

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
