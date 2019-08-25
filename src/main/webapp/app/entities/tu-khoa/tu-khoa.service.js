(function() {
    'use strict';
    angular
        .module('footballBeApp')
        .factory('TuKhoa', TuKhoa);

    TuKhoa.$inject = ['$resource'];

    function TuKhoa ($resource) {
        var resourceUrl =  'api/v1/tu-khoa/';

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
