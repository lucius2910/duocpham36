(function () {
    'use strict';

    angular
        .module('footballBeApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', 'Auth', 'Principal', 'ProfileService', 'LoginService', 'CategoryService'];

    function NavbarController($scope, $rootScope, $localStorage, $state, $stateParams, Auth, Principal, ProfileService, LoginService, CategoryService) {
        var vm = this;

        vm.isAuthenticated = null;
        vm.password = null;
        vm.username = null;
        vm.account = null;

        vm.authenticationError = false;
        vm.rememberMe = true;

        vm.totalAmount = 0;
        vm.iShowBreakcum = true;
        vm.productName = '';
        vm.alertContent = '';
        vm.currentState = '';
        vm.lstCategory = [];

        vm.alertContent = 'Đã thêm đơn hàng vào giỏ';

        vm.$state = $state;
        vm.lstAlert = [];
        vm.credentials = {};
        // vm.account = $rootScope.account ? $rootScope.account : {};

        vm.logout = logout;
        vm.register = register;
        vm.removeCart = removeCart;
        vm.login = LoginService.open;
        vm.thanhToan = thanhToan;
        vm.removeAlert = removeAlert;
        vm.backSearch = backSearch;
        vm.backCart = backCart;
        vm.openMenuMbl = openMenuMbl;
        vm.gotocatalog = gotocatalog;

        // $localStorage.lstCart = [
        //     {
        //         id: 1,
        //         imgUrl: "/content/images/products/ery.png",
        //         is: false,
        //         title: "Sterogyl Lọ 20ml Italia 1",
        //         price: "93000",
        //         link: "https://duocphamhathanh.vn/thuoc/sterogyl.html",
        //         oldPrice: "103000",
        //         count: 2
        //     }
        // ]

        if (!$localStorage.lstCart) {
            $localStorage.lstCart = [];
        };

        init();

        function init() {
            getAccount();
            getAllCategory();
            angular.forEach(vm.lstCart, function (item, index) {
                vm.totalAmount += (parseFloat(item.price) * parseInt(item.count));
            });

        }

        function gotocatalog(item){
            $state.go('products', {nameCatalog: item.name, idCatalog: item.id}, {reload: true});
        }

        function getAllCategory(){
            CategoryService.get(function(data){
                vm.lstCategory = angular.copy(data);
                angular.forEach(vm.lstCategory, function(element, index){
                    if(element.id == $state.params.idCatalog){
                        vm.products = element.name
                    }
                });
            }, function(error){
                console.log(error);
            })
        }

        function backSearch(){
            if($state.current.name != 'home'){
                $state.go('home');
            }
        }

        function backCart(){
            if($state.current.name != 'thanh-toan'){
                $state.go('thanh-toan');
            }
        }

        function removeAlert(id) {

            angular.forEach(vm.lstAlert, function (item, index) {
                if (item.id == id) {
                    var popup = angular.element(".item-alert-" + id);
                    popup.removeClass('popup-alert-show');
                    vm.lstAlert.splice(index, 1);
                }
            });
        }

        function addAlert(alertContent) {
            var id = generateNumber();
            vm.lstAlert.push({ id: id, content: alertContent });

            setTimeout(function(){
                removeAlert(id);
            }, 3500);
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

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated();
            });
        }

        function logout() {

            Auth.logout();
            vm.isAuthenticated = false;
            $state.go('home', null, { reload: true });
        }

        function register() {
            $state.go('register');
        }

        function thanhToan() {
            $state.go('thanh-toan', { nameCatalog: 'Thanh toán' })
        }


        $scope.$watch(function () {

            vm.totalAmount = 0;
            vm.lstCart = $localStorage.lstCart;
            vm.currentState = $state.current.name;


            if (vm.currentState == 'home' || vm.currentState == 'register' || vm.currentState == 'cam-on' || vm.currentState == 'accessdenied') {
                vm.iShowBreakcum = false;
            } else {
                vm.iShowBreakcum = true;
            }
            vm.productName = $state.params.name;

            if (vm.products == null) {
                switch (vm.currentState) {
                    case 'thanh-toan':
                        vm.products = 'Thanh toán';
                        break;
                    case 'settings':
                        vm.products = 'Tài khoản';
                        break;
                    case 'order-detail':
                        vm.products = 'Chi tiết đơn hàng';
                        break;
                    case 'uncategory':
                        vm.products = 'Uncategory';
                        break;
                    case 'tin-tuc':
                        vm.products = 'Tin Tức';
                        break;
                    default:
                        break;
                }
            }

            angular.forEach($localStorage.lstCart, function (item, index) {
                vm.totalAmount += (parseFloat(item.price) * parseInt(item.count));
            });
        });

        $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams){ 
            // console.log('change');
            closeMenuMbl();
            $(window).scrollTop(0);
        });

        // $rootScope.$watch('account', function(){
        //     if($rootScope.account != null){
        //         vm.account = $localStorage.account
        //     }
        // })

        $scope.$watch('vm.totalAmount', function (newVal, oldVal) {
            if (oldVal > newVal) {
                vm.alertContent = 'Xóa sản phẩm thành công';
                addAlert('Xóa sản phẩm thành công');
            } else if (oldVal < newVal) {
                vm.alertContent = 'Thêm sản phẩm thành công';
                addAlert('Thêm sản phẩm thành công');
            }
        })

        function generateNumber() {
            return Math.floor(Math.random() * (999999999) + 1);
        }

        function openMenuMbl(){
            var main = angular.element('.main-app');
            var top_header = angular.element('.top-header');
            var menu = angular.element('.mobile-menu');

            if(main.hasClass('mobile-menu-open')){
                main.removeClass('mobile-menu-open')
            }else{
                main.addClass('mobile-menu-open')
            }

            if(top_header.hasClass('mobile-menu-open')){
                top_header.removeClass('mobile-menu-open')
            }else{
                top_header.addClass('mobile-menu-open')
            }

            if(menu.hasClass('mobile-menu-active')){
                menu.removeClass('mobile-menu-active')
            }else{
                menu.addClass('mobile-menu-active')
            }
        }

        function closeMenuMbl(){
            var main = angular.element('.main-app');
            var top_header = angular.element('.top-header');
            var menu = angular.element('.mobile-menu');
            
            main.removeClass('mobile-menu-open');
            top_header.removeClass('mobile-menu-open');
            menu.removeClass('mobile-menu-active')
        }


        /* ---------------------------------------------
         Scripts scroll
         --------------------------------------------- */
        $(window).scroll(function () {

            /* Show hide scrolltop button */
            if ($(window).scrollTop() == 0) {
                $('.scroll_top').stop(false, true).fadeOut(600);
            } else {
                $('.scroll_top').stop(false, true).fadeIn(600);
            }
            /* Main menu on top */
            var h = $(window).scrollTop();
            var max_h = $('.top-header').height() + $('.main-header').height();
            var width = $(window).width();
            if (width > 767) {
                if (h > max_h) {
                    // fix top menu
                    $('#nav-top-menu').addClass('nav-ontop');
                    //$('#nav-top-menu').find('.vertical-menu-content').hide();
                    //$('#nav-top-menu').find('.title').removeClass('active');
                    // add cart box on top menu
                    $('#cart-block .cart-block').appendTo('#shopping-cart-box-ontop .shopping-cart-box-ontop-content');
                    $('#shopping-cart-box-ontop').fadeIn();
                    $('#user-info-top').appendTo('#user-info-opntop');
                    $('#header .header-search-box form').appendTo('#form-search-opntop');
                } else {
                    $('#nav-top-menu').removeClass('nav-ontop');
                    if ($('body').hasClass('home')) {
                        $('#nav-top-menu').find('.vertical-menu-content').removeAttr('style');
                        if (width > 1024)
                            $('#nav-top-menu').find('.vertical-menu-content').show();
                        else {
                            $('#nav-top-menu').find('.vertical-menu-content').hide();
                        }
                        $('#nav-top-menu').find('.vertical-menu-content').removeAttr('style');
                    }
                    ///
                    $('#shopping-cart-box-ontop .cart-block').appendTo('#cart-block');
                    $('#shopping-cart-box-ontop').fadeOut();
                    $('#user-info-opntop #user-info-top').appendTo('.top-header .container');
                    $('#form-search-opntop form').appendTo('#header .header-search-box');
                }
            }
        });
    }
})();
