(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('bai-viet', {
            parent: 'entity',
            url: '/bai-viet/{nameCatalog}/:name',
            data: {
                pageTitle: 'footballBeApp.bai-viet.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/bai-viet/bai-viet.html',
                    controller: 'BaiVietController',
                    controllerAs: 'vm'
                }
            },
            params:{
                nameCatalog: null,
                name: null,
                id: null
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        });
    }

})();
