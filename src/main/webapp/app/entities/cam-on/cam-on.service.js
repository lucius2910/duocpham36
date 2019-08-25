(function() {
    'use strict';
    angular
        .module('footballBeApp')
        .factory('CamOn', CamOn);

    CamOn.$inject = ['$resource'];

    function CamOn ($resource) {
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
