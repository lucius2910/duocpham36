(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('tin-tuc', {
            parent: 'entity',
            url: '/tin-tuc/:nameCatalog',
            data: {
                pageTitle: 'footballBeApp.tin-tuc.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tin-tuc/tin-tuc.html',
                    controller: 'TinTucController',
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
