(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .controller('RegisterController', RegisterController);


    RegisterController.$inject = ['$translate', '$state', '$timeout', 'Auth', 'LoginService', 'errorConstants', 'NonceService'];

    function RegisterController ($translate, $state, $timeout, Auth, LoginService, errorConstants, NonceService) {
        var vm = this;

        vm.doNotMatch = null;
        vm.error = null;
        vm.errorUserExists = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.registerAccount = {};
        vm.success = null;

        $timeout(function (){angular.element('#login').focus();});

        function register () {
            if (vm.registerAccount.password !== vm.confirmPassword) {
                vm.doNotMatch = 'ERROR';
            } else {
                // vm.registerAccount.langKey = $translate.use();
                vm.registerAccount.billing = {};
                vm.registerAccount.shipping = {};
                
                vm.registerAccount.billing.phone= vm.registerAccount.phone,
                vm.registerAccount.billing.first_name= vm.registerAccount.first_name,
                vm.registerAccount.billing.last_name= vm.registerAccount.last_name,
                vm.registerAccount.billing.email= vm.registerAccount.email,
                vm.registerAccount.billing.company= vm.registerAccount.company,
                vm.registerAccount.billing.address_1= vm.registerAccount.address,
                vm.registerAccount.billing.city= vm.registerAccount.city
                
                vm.registerAccount.shipping.phone= vm.registerAccount.phone,
                vm.registerAccount.shipping.first_name= vm.registerAccount.first_name,
                vm.registerAccount.shipping.last_name= vm.registerAccount.last_name,
                vm.registerAccount.shipping.email= vm.registerAccount.email,
                vm.registerAccount.shipping.company= vm.registerAccount.company,
                vm.registerAccount.shipping.address_1= vm.registerAccount.address,
                vm.registerAccount.shipping.city= vm.registerAccount.city

                vm.doNotMatch = null;
                vm.error = null;
                vm.errorUserExists = null;
                vm.errorEmailExists = null;

                // NonceService.get(function(data){
                //     console.log('data', data);
                // });

                console.log('vm.registerAccount', vm.registerAccount);

                Auth.createAccount(vm.registerAccount).then(function () {
                    vm.success = 'OK';
                    $state.go('home', {reload: true});
                }).catch(function (response) {
                    vm.success = null;
                    if (response.status === 400 && angular.fromJson(response.data).type === errorConstants.LOGIN_ALREADY_USED_TYPE) {
                        vm.errorUserExists = 'ERROR';
                    } else if (response.status === 400 && angular.fromJson(response.data).type === errorConstants.EMAIL_ALREADY_USED_TYPE) {
                        vm.errorEmailExists = 'ERROR';
                    } else {
                        vm.error = 'ERROR';
                    }
                });
            }
        }
    }
})();
