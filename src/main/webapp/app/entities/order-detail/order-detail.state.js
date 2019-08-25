(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('order-detail', {
            parent: 'entity',
            url: '/order-detail/:id',
            data: {
                pageTitle: 'footballBeApp.orderDetail.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/order-detail/order-detail.html',
                    controller: 'OrderDetailController',
                    controllerAs: 'vm'
                }
            },
            params:{
                id: null,
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
