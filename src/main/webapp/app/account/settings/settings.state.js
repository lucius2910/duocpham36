(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('settings', {
            parent: 'account',
            url: '/settings',
            data: {
                // authorities: ['ROLE_USER'],
                pageTitle: 'global.menu.account.settings'
            },
            views: {
                'content@': {
                    templateUrl: 'app/account/settings/settings.html',
                    controller: 'SettingsController',
                    controllerAs: 'vm'
                }
            },
            params:{
                nameCatalog: null
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('settings');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
