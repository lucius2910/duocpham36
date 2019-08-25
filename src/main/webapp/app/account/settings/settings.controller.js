(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$state', '$localStorage', 'Principal', 'Auth', 'JhiLanguageService', '$translate', 'OrderDetail', 'LoginService'];

    function SettingsController ($state, $localStorage, Principal, Auth, JhiLanguageService, $translate, OrderDetail, LoginService) {
        var vm = this;

        vm.error = null;
        vm.save = save;
        vm.settingsAccount = {};
        vm.success = null;
        vm.customer = $localStorage.userid;
        vm.save = save;

        vm.lstOrder = []

        init()

        function init(){
            if(!vm.customer){
                LoginService.open();
            }else{
                getOder();
                getAccount();
            }
        }

        function getAccount(){
            Principal.identity().then(function(account) {
                vm.settingsAccount.first_name = account.first_name;
                vm.settingsAccount.last_name = account.last_name;
                vm.settingsAccount.fullname = account.first_name + ' ' + account.last_name;
                vm.settingsAccount.email = account.email;
                vm.settingsAccount.company = account.billing.company;
                vm.settingsAccount.phone = account.billing.phone;
                vm.settingsAccount.address = account.billing.address_1;
                vm.settingsAccount.account = account;
            });
        }

        function save () {
            var accountUpdate = {
                user_id: vm.customer,
                first_name: vm.settingsAccount.first_name,
                last_name: vm.settingsAccount.last_name,
                email: vm.settingsAccount.email,
                billing: {
                    company: vm.settingsAccount.company,
                    phone: vm.settingsAccount.phone,
                    address_1: vm.settingsAccount.address,
                    first_name: vm.settingsAccount.first_name,
                    last_name: vm.settingsAccount.last_name,
                },
                password: vm.settingsAccount.password_new
            }
            Auth.updateAccount(accountUpdate).then(function() {
                vm.error = null;
                vm.success = 'OK';

                Principal.identity(true).then(function(account) {
                    vm.settingsAccount.first_name = account.first_name;
                    vm.settingsAccount.last_name = account.last_name;
                    vm.settingsAccount.fullname = account.first_name + ' ' + account.last_name;
                    vm.settingsAccount.email = account.email;
                    vm.settingsAccount.company = account.billing.company;
                    vm.settingsAccount.phone = account.billing.phone;
                    vm.settingsAccount.address = account.billing.address_1;
                    vm.settingsAccount.account = account;
                });

                $state.go('settings', {reload: true});
            }).catch(function() {
                vm.success = null;
                vm.error = 'ERROR';
            });
        }

        function getOder(){
            OrderDetail.query({
                consumer_key: API_CONFIG.KEY,
                consumer_secret: API_CONFIG.SEC,
                customer: vm.customer
            },function(data){
                angular.forEach(data, function(element, index){
                    var orderItem = {
                        id: element.id,
                        date: element.date_created,
                        status: element.status,
                        total: element.total
                    }

                    vm.lstOrder.push(orderItem);
                })
            }, function(error){
                console.log(error)
            });
        }
    }
})();
