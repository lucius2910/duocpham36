(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('tu-khoa', {
            parent: 'entity',
            url: '/tu-khoa/:nameCatalog',
            data: {
                pageTitle: 'footballBeApp.tu-khoa.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tu-khoa/tu-khoa.html',
                    controller: 'TuKhoaController',
                    controllerAs: 'vm'
                }
            },
            params:{
                nameCatalog: null,
                name: null
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
