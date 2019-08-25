(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('cam-on', {
            parent: 'entity',
            url: '/cam-on/:name',
            data: {
                pageTitle: 'footballBeApp.camOn.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/cam-on/cam-on.html',
                    controller: 'CamOnController',
                    controllerAs: 'vm'
                }
            },
            params:{
                name: null,
                nameCatalog: null,
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
