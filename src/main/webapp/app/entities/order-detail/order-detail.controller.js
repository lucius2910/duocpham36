(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .controller('OrderDetailController', OrderDetailController);

    OrderDetailController.$inject = ['$localStorage', '$stateParams', 'OrderDetail', 'Principal'];

    function OrderDetailController($localStorage, $stateParams, OrderDetail, Principal) {

        var vm = this;

        vm.settingsAccount = {};
        vm.lstProduct = [];

        vm.totalAmount = 0;
        vm.customer = $localStorage.userid;
        vm.idOrder = $stateParams.id;


        vm.lstProduct = []

        init();


        function init(){
            vm.totalAmount = 0;
    
            Principal.identity().then(function(account) {
                vm.settingsAccount.id = account.id;
                vm.settingsAccount.fullname = account.first_name + ' ' + account.last_name;
                vm.settingsAccount.email = account.email;
                vm.settingsAccount.company = account.billing.company;
                vm.settingsAccount.phone = account.billing.phone;
                vm.settingsAccount.address = account.billing.address_1;
            });

            loadOrderDetail();
        }


        function loadOrderDetail() {
            OrderDetail.get({
                consumer_key: API_CONFIG.KEY,
                consumer_secret: API_CONFIG.SEC,
                customer: vm.customer,
                id: vm.idOrder
            },function(data){
                angular.forEach(data.line_items, function(element, index){
                    var productItem = {
                        id: element.id,
                        product_id: element.product_id,
                        name: element.name,
                        quantity: element.quantity,
                        price: element.price,
                        total: element.total,
                    }

                    vm.lstProduct.push(productItem);
                })

                angular.forEach(vm.lstProduct, function(item, index){
                    vm.totalAmount += item.price * item.quantity;
                });
            }, function(error){
                console.log(error)
            });
        }
    }
})();
