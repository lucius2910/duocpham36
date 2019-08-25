(function () {
    'use strict';

    angular
        .module('footballBeApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$sce', '$state', '$rootScope', '$localStorage', 'ProductsService', 'Principal', 'CategoryService', 'LoginService'];

    function HomeController($scope, $sce, $state, $rootScope, $localStorage, ProductsService, Principal, CategoryService, LoginService) {
        var vm = this;

        vm.page = 3;
        vm.account = null;
        vm.isAuthenticated = null;
        vm.searchTextData = '';
        vm.lstCart = $localStorage.lstCart;

        $scope.myInterval = 1000;
        $scope.noWrapSlides = false;
        vm.isLoading = false;
        $scope.active = 0;

        vm.login = LoginService.open;
        vm.register = register;
        vm.addNumProc = addNumProc;
        vm.minusNumProc = minusNumProc;
        vm.addToCart = addToCart;
        vm.search = search;
        vm.loadMore = loadMore;
        vm.thanhToan = thanhToan;


        vm.slides = [
            {
                imgUrl: "slides/Thuoc-02.jpg",
            },
            {
                imgUrl: "slides/Thuoc-03.jpg",
            }
        ]

        vm.lstProcRaw = [];

        $scope.$on('authenticationSuccess', function () {
            //getAccount();
        });

        init();
        //getAccount();

        function init() {
            loadProducts(1, 24);
        }

        function loadProducts(page, size) {

            ProductsService.get({
                consumer_key: API_CONFIG.KEY,
                consumer_secret: API_CONFIG.SEC,
                page: page,
                per_page: size
            },
                function (response) {
                    angular.forEach(response.data, function (element, index) {
                        var product = {
                            id: element.id,
                            imgUrl: element.images[0].src,
                            is: element.featured,
                            title: element.name,
                            price: element.price,
                            catalog: element.categories[0].name,
                            oldPrice: element.regular_price
                        }

                        vm.lstProcRaw.push(product);
                    })

                    initProc(vm.lstProcRaw);

                }, function (error) {
                    console.log(error);
                });
        }

        function initProc(lstProcRaw) {
            vm.lstProc = angular.copy(lstProcRaw);

            for (var i = 0; i < vm.lstProc.length; i++) {
                vm.lstProc[i].count = 1;
                for (var j = 0; j < vm.lstCart.length; j++) {
                    if (vm.lstCart[j].id == vm.lstProc[i].id) {
                        vm.lstProc[i].isChoose = true;
                        vm.lstProc[i].count = vm.lstCart[j].count;
                    }
                }
            }
        }

        function addNumProc(id) {
            angular.forEach(vm.lstProc, function (item, index) {
                if (item.id == id) {
                    item.count += 1;
                }
            });
        }

        function minusNumProc(id) {
            angular.forEach(vm.lstProc, function (item, index) {
                if (item.id == id && item.count > 1) {
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

            for (var i = 0; i < vm.lstProc.length; i++) {
                for (var j = 0; j < vm.lstCart.length; j++) {
                    if (vm.lstCart[j].id == vm.lstProc[i].id) {
                        vm.lstProc[i].isChoose = true;
                    }
                }
            }
        }

        function search(text) {
            vm.lstProcRaw = [];
            vm.lstProc = [];

            ProductsService.get({
                    consumer_key: API_CONFIG.KEY,
                    consumer_secret: API_CONFIG.SEC,
                    page: 1,
                    per_page: 24,
                    search: text
                },
                function (response) {
                    angular.forEach(response.data, function (element, index) {
                        var product = {
                            id: element.id,
                            imgUrl: element.images[0].src,
                            is: element.featured,
                            title: element.name,
                            price: element.price,
                            catalog: element.categories[0].name,
                            oldPrice: element.regular_price
                        }

                        vm.lstProcRaw.push(product);
                    })

                    initProc(vm.lstProcRaw);

                }, function (error) {
                    console.log(error);
                });

        }

        function loadMore() {

            var lstMore = [];

            ProductsService.get({
                consumer_key: API_CONFIG.KEY,
                consumer_secret: API_CONFIG.SEC,
                page: vm.page,
                per_page: 12
            }, function (response) {
                angular.forEach(response.data, function (element, index) {
                    var product = {
                        id: element.id,
                        imgUrl: element.images[0].src,
                        is: element.featured,
                        title: element.name,
                        price: element.price,
                        catalog: element.categories[0].name,
                        oldPrice: element.regular_price
                    }

                    lstMore.push(product);
                    vm.page = vm.page + 1;
                });

                angular.forEach(lstMore, function (element, index) {
                    if (element.title.toLocaleUpperCase().indexOf(vm.searchTextData.toLocaleUpperCase()) != -1) {
                        vm.lstProc.push(element);
                    }
                });

                for (var i = 0; i < vm.lstProc.length; i++) {
                    vm.lstProc[i].count = 1;
                    for (var j = 0; j < vm.lstCart.length; j++) {
                        if (vm.lstCart[j].id == vm.lstProc[i].id) {
                            vm.lstProc[i].isChoose = true;
                            vm.lstProc[i].count = vm.lstCart[j].count;
                        }
                    }
                }

                vm.isLoading = false;

            }, function (error) {
                console.log(error);
            });
        }

        function thanhToan() {
            $state.go('thanh-toan', { nameCatalog: 'Thanh toán' })
        }

        // function getAccount() {
        //     Principal.identity().then(function (account) {
        //         vm.account = account;
        //         vm.isAuthenticated = Principal.isAuthenticated;
        //     });
        // }

        function register() {
            $state.go('register');
        }

        $scope.$watch('vm.searchTextData', function (newVal, oldVal) {
            if (newVal.length >= 3 || (oldVal != '' && newVal == '')) {
                search(newVal);
            }
        })

        var wd = angular.element(window);

        wd.scroll(function () {
            if ($(window).scrollTop() + $(window).height() >= $(document).height() - $('.footer-bottom').height() - 100 && $state.current.name == 'home' && vm.lstProc.length <= 60) {
                if (!vm.isLoading) {
                    $scope.$apply(function () { vm.isLoading = true; });
                    setTimeout(function () {
                        $scope.$apply(loadMore());
                    }, 2000);
                }
            }
        });

    }
})();
