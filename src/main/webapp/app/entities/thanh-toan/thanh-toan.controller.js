(function () {
    'use strict';

    angular
        .module('footballBeApp')
        .controller('ThanhToanController', ThanhToanController);

    ThanhToanController.$inject = ['$state', '$rootScope', '$scope', '$stateParams', '$localStorage', 'ThanhToan'];

    function ThanhToanController($state, $rootScope, $scope, $stateParams, $localStorage, ThanhToan) {

        var vm = this;

        vm.totalAmount = 0;

        vm.lstCart = $localStorage.lstCart;
        vm.account = $rootScope.account ? $rootScope.account : {};

        console.log('vm.lstCart', vm.lstCart);

        vm.removeCart = removeCart;
        vm.changeValueQty = changeValueQty;
        vm.checkOut = checkOut;


        init();

        function init() {
            vm.account.shipping_full_name = vm.account.first_name + ' ' + vm.account.last_name;

            angular.forEach(vm.lstCart, function (item, index) {
                item.count = parseInt(item.count);
                vm.totalAmount += item.price * item.count;
            });
        }

        function removeCart(id) {
            vm.totalAmount = 0;
            angular.forEach(vm.lstCart, function (item, index) {
                if (item.id == id) {
                    vm.lstCart.splice(index, 1);
                }
            });

            angular.forEach(vm.lstCart, function (item, index) {
                vm.totalAmount += (parseFloat(item.price) * parseInt(item.count));
            });

        }

        function changeValueQty() {
            vm.totalAmount = 0;
            angular.forEach(vm.lstCart, function (item, index) {
                vm.totalAmount += (parseFloat(item.price) * parseInt(item.count));
            });
        }

        function checkOut() {
            var lineItem = [];
            angular.forEach(vm.lstCart, function(element, index){
                var item = {
                    product_id: element.id,
                    quantity: element.count
                }

                lineItem.push(item);
            });

            var dataOrder = {
                payment_method: "bacs",
                payment_method_title: "Direct Bank Transfer",
                set_paid: true,
                customer_id: $localStorage.userid,
                billing: {
                    first_name: vm.account.first_name,
                    last_name: vm.account.last_name,
                    address_1: vm.account.billing.address_1,
                    email: vm.account.email,
                    phone: vm.account.billing.phone
                },
                line_items: lineItem
            }

            ThanhToan.save({
                    consumer_key: API_CONFIG.KEY,
                    consumer_secret: API_CONFIG.SEC
                },dataOrder
                , function (success) {
                    $localStorage.lstCart = [];
                    $state.go('cam-on', {id: success.id});
                }, function (error) {
                    console.log(error)
                });
        }
    }
})();
