(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$state', '$scope', '$stateParams', '$localStorage', 'ProductsService', 'CategoryService'];

    function ProductsController($state, $scope, $stateParams, $localStorage, ProductsService, CategoryService) {

        var vm = this;

        vm.lstCategory = [];
        vm.nameCatalog = '';
        vm.id = $stateParams.idCatalog;

        vm.lstProc = []
        
        vm.lstCart = $localStorage.lstCart;
        vm.addToCart = addToCart;
        vm.addNumProc = addNumProc;
        vm.minusNumProc = minusNumProc;
        vm.loadProducts = loadProducts;
        vm.gotocatalog = gotocatalog;

        vm.paging = {};
        vm.paging.page = 1;
        vm.paging.maxSize = 4;

        init();

        function init() {
            loadProducts();
            getAllCategory();
        }

        function getAllCategory(){
            CategoryService.get(function(data){
                vm.lstCategory = angular.copy(data);

                angular.forEach(vm.lstCategory, function(element, index){
                    if(element.id == vm.id){
                        vm.nameCatalog = element.name;
                    }
                });
            }, function(error){
                console.log(error);
            })
        }

        function gotocatalog(item){
            $state.go('products', {nameCatalog: item.name, idCatalog: item.id}, {reload: true});
        }


        function loadProducts() {

            $(window).scrollTop(0);

            ProductsService.get(
                {
                    consumer_key: API_CONFIG.KEY,
                    consumer_secret: API_CONFIG.SEC,
                    category: vm.id,
                    page: vm.paging.page,
                    per_page: 12
                },function(response){
                    vm.lstProc = [];
                    var dataheader = response.header;

                    vm.paging.totalItem = dataheader['x-wp-total'];

                    angular.forEach(response.data, function(element, index){
                        var product = {
                            id: element.id,
                            imgUrl: element.images[0].src,
                            is: false,
                            title: element.name,
                            price: element.price,
                            catalog: element.categories[0].name,
                            oldPrice: element.regular_price
                        }

                    vm.lstProc.push(product);

                    for (var i = 0; i < vm.lstProc.length; i++) {
                        vm.lstProc[i].count = 1;
                        for (var j = 0; j < vm.lstCart.length; j++) {
                            if (vm.lstCart[j].id == vm.lstProc[i].id) {
                                vm.lstProc[i].isChoose = true;
                                vm.lstProc[i].count = vm.lstCart[j].count;
                            }
                        }
                    }
                })
            }, function(error){
                console.log(error);
            });
        }

        function addNumProc(id){
            angular.forEach(vm.lstProc, function(item, index){
                if(item.id == id){
                    item.count += 1;
                }
            });
        }

        function minusNumProc(id){
            angular.forEach(vm.lstProc, function(item, index){
                if(item.id == id && item.count > 1){
                    item.count -= 1;
                }
            });
        }

        function addToCart(item) {
            var countItem = item.count;
            var lengthCart = angular.copy(vm.lstCart.length);
            var checkItem = false;

            if (lengthCart == 0) {
                $localStorage.lstCart.push(item);
                checkItem = true;
            }else {
                for (var j = 0; j < lengthCart; j++) {
                    if (vm.lstCart[j].id == item.id) {
                        vm.lstCart[j].count = countItem;
                        checkItem = true;
                    }
                }
            }

            if(!checkItem){
                $localStorage.lstCart.push(item);
            }

            for (var i = 0; i < vm.lstProc.length; i++) {
                for (var j = 0; j < vm.lstCart.length; j++) {
                    if (vm.lstCart[j].id == vm.lstProc[i].id) {
                        vm.lstProc[i].isChoose = true;
                    }
                }
            }
        }
    }
})();
