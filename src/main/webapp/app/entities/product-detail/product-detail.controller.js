(function () {
    'use strict';

    angular
        .module('footballBeApp')
        .controller('ProductDetailController', ProductDetailController);

    ProductDetailController.$inject = ['$state', '$stateParams', '$localStorage', 'ProductDetail', 'ProductsService', 'CategoryService', '$sce', '$scope'];

    function ProductDetailController($state, $stateParams, $localStorage, ProductDetail, ProductsService, CategoryService, $sce, $scope) {

        var vm = this;

        vm.productInfo = {
            id: angular.copy($stateParams.id)
        }

        vm.lstProductLike = []

        vm.lstCart = $localStorage.lstCart;

        vm.addToCart = addToCart;
        vm.addNumProc = addNumProc;
        vm.minusNumProc = minusNumProc;
        vm.gotocatalog = gotocatalog;

        init();


        function init() {
            getAllCategory();
            loadProductDetail();
            loadProductLike();
        }


        function getAllCategory() {
            CategoryService.get(function (data) {
                vm.lstCategory = angular.copy(data);
            }, function (error) {
                console.log(error);
            })
        }

        function loadProductDetail() {

            ProductDetail.get({
                id: vm.productInfo.id,
                consumer_key: API_CONFIG.KEY,
                consumer_secret: API_CONFIG.SEC
            }, function (data) {
                if (data !== undefined && data !== null && data.id !== null) {
                    // vm.productInfo = data;
                    vm.productInfo.id = vm.productInfo.id;
                    vm.productInfo.imgUrl = data.images[0].src;
                    vm.productInfo.is = false;
                    vm.productInfo.title = data.name;
                    vm.productInfo.price = data.price;
                    vm.productInfo.priceOld = data.regular_price;
                    vm.productInfo.discount = (100 - (data.price * 100 / data.regular_price));
                    vm.productInfo.from = data.name;
                    vm.productInfo.content = $sce.trustAsHtml(data.description);
                    vm.productInfo.count = 1;
                }
                for (var j = 0; j < vm.lstCart.length; j++) {
                    if (vm.lstCart[j].id == vm.productInfo.id) {
                        vm.productInfo.count = vm.lstCart[j].count;
                    }
                }
            }, function (error) {
                console.log(error);
            });
        }

        function addNumProc(id) {
            angular.forEach(vm.lstProductLike, function (item, index) {
                if (item.id == id) {
                    item.count += 1;
                }
            });
        }

        function minusNumProc(id) {
            angular.forEach(vm.lstProductLike, function (item, index) {
                if (item.id == id && item.count > 1) {
                    item.count -= 1;
                }
            });
        }
        function gotocatalog(item){
            $state.go('products', {nameCatalog: item.name, idCatalog: item.id}, {reload: true});
        }

        function addToCart(item) {
            var countItem = item.count;
            var lengthCart = angular.copy(vm.lstCart.length);
            var checkItem = false;

            if (lengthCart == 0) {
                $localStorage.lstCart.push(item);
                checkItem = true;
            } else {
                for (var j = 0; j < lengthCart; j++) {
                    if (vm.lstCart[j].id == item.id) {
                        vm.lstCart[j].count = countItem;
                        checkItem = true;
                    }
                }
            }

            if (!checkItem) {
                $localStorage.lstCart.push(item);
            }

            for (var i = 0; i < vm.lstProductLike.length; i++) {
                for (var j = 0; j < vm.lstCart.length; j++) {
                    if (vm.lstCart[j].id == vm.lstProductLike[i].id) {
                        vm.lstProductLike[i].isChoose = true;
                    }
                }
            }
        }

        function loadProductLike() {

            ProductsService.get({
                consumer_key: API_CONFIG.KEY,
                consumer_secret: API_CONFIG.SEC,
            }, function (data) {
                angular.forEach(data.data, function (element, index) {
                    var product = {
                        id: element.id,
                        imgUrl: element.images[0].src,
                        is: false,
                        title: element.name,
                        price: element.price,
                        catalog: element.categories[0].name,
                        // link: "https://duocphamhathanh.vn/thuoc/sterogyl.html",
                        oldPrice: element.regular_price
                    }

                    vm.lstProductLike.push(product);
                })

                for (var i = 0; i < vm.lstProductLike.length; i++) {
                    vm.lstProductLike[i].count = 1;
                    for (var j = 0; j < vm.lstCart.length; j++) {
                        if (vm.lstCart[j].id == vm.lstProductLike[i].id) {
                            vm.lstProductLike[i].isChoose = true;
                            vm.lstProductLike[i].count = vm.lstCart[j].count;
                        }
                    }
                }
                
            }, function (error) {
                console.log(error);
            });

        }
    }
})();

