(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('thanh-toan', {
            parent: 'entity',
            url: '/thanh-toan/:name',
            data: {
                pageTitle: 'footballBeApp.thanhToan.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/thanh-toan/thanh-toan.html',
                    controller: 'ThanhToanController',
                    controllerAs: 'vm'
                }
            },
            params:{
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
