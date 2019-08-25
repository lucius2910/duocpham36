(function() {
    'use strict';
    angular
        .module('footballBeApp')
        .factory('BaiViet', BaiViet);

    BaiViet.$inject = ['$resource'];

    function BaiViet ($resource) {
        var resourceUrl =  'api/v1/bai-viet/';

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
