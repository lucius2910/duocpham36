(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('products', {
            parent: 'entity',
            url: '/products/:idCatalog',
            data: {
                pageTitle: 'footballBeApp.products.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/products/products.html',
                    controller: 'ProductsController',
                    controllerAs: 'vm'
                }
            },
            params:{
                nameCatalog: null,
                idCatalog: null
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
