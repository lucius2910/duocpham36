(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('uncategory', {
            parent: 'entity',
            url: '/uncategory/:name',
            data: {
                pageTitle: 'footballBeApp.uncategory.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/uncategory/uncategory.html',
                    controller: 'UncategoryController',
                    controllerAs: 'vm'
                }
            },
            params:{
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
