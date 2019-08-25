(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .controller('FooterController', FooterController);

    FooterController.$inject = ['$scope', 'LoginService'];

    function FooterController ($scope, LoginService) {
        var vm = this;

        vm.login = LoginService.open;
    }
})();
