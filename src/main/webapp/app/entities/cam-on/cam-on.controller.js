(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .controller('CamOnController', CamOnController);

    CamOnController.$inject = ['$state', '$rootScope', '$scope', '$stateParams', '$localStorage', 'CamOn', 'ParseLinks', 'AlertService', '$sce'];

    function CamOnController($state, $rootScope, $scope, $stateParams, $localStorage, CamOn, ParseLinks, AlertService, $sce) {

        var vm = this;

        vm.totalAmount = 0;
        vm.idOrder = $stateParams.id;

        console.log('$stateParams', $stateParams);


        init();

        function init(){

        }
    }
})();
