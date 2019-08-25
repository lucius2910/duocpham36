(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('product-detail', {
            parent: 'entity',
            url: '/product-detail/:id',
            data: {
                pageTitle: 'footballBeApp.productDetail.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/product-detail/product-detail.html',
                    controller: 'ProductDetailController',
                    controllerAs: 'vm'
                }
            },
            params:{
                id: null,
                name: null,
                nameCatalog: null
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
