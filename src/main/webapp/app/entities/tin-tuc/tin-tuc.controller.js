(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .controller('TinTucController', TinTucController);

    TinTucController.$inject = ['$state', '$scope', '$stateParams', '$localStorage', 'TinTuc', 'AlertService'];

    function TinTucController($state, $scope, $stateParams, $localStorage, TinTuc, AlertService) {

        var vm = this;

        vm.pageTitle = $stateParams.nameCatalog;
        vm.lstPost = [];


        vm.lstPost = [
            {
                id: 1,
                title: 'Lợi ích sức khỏe của trà bạc hà',
                user: 'Admin',
                catalog: 'Sức khỏe',
                date: '29 Tháng 7, 2018',
                des: 'Lợi ích sức khỏe của trà bạc hà',
                img_url: '/content/images/products/ery.png'
            },
            {
                id: 2,
                title: 'Lợi ích sức khỏe của trà bạc hà 2',
                user: 'Admin',
                catalog: 'Thực phẩm chức năng',
                date: '29 Tháng 7, 2018',
                des: 'Lợi ích sức khỏe của trà bạc hà',
                img_url: '/content/images/products/ery.png'
            }
        ];

        init();

        function init(){
        }
    }
})();
