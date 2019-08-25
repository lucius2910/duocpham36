(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .controller('BaiVietController', BaiVietController);

    BaiVietController.$inject = ['$state', '$scope', '$stateParams', '$localStorage', 'BaiViet', 'AlertService'];

    function BaiVietController($state, $scope, $stateParams, $localStorage, BaiViet, AlertService) {

        var vm = this;

        vm.pageTitle = $stateParams.name;
        vm.lstPost = [];

        vm.postContent = '';

        init();

        function init(){

            vm.postContent = '<p><span style="font-size: 18pt;"><strong><span style="font-family: "times new roman", times, serif;">Chính sách khuyến mại mới nhất Tháng&nbsp;1/2019<br></span></strong></span></p><p><span style="font-size: 18pt;"><strong><span style="font-family: "times new roman", times, serif;">- Miễn phí cước vận chuyển tất cả các đơn hàng &gt; 5 triệu nếu có xe từ Hapulico (ko áp dụng các xe tuyến ở các bến xe)</span></strong></span></p><p><span style="font-size: 18pt;"><span style="font-family: "times new roman", times, serif;"><span style="font-family: "times new roman", times, serif;"><span style="font-size: 24px;"><strong>- Doanh số từ 30 triệu/ tháng =&gt; được chiết khấu 1% cho đơn hàng đầu tiên của tháng kế tiếp (phần đơn đã được tính Chiết khấu 1% sẽ không được tính vào ds tích lũy của tháng đó)</strong></span></span><br><br><br><span style="font-size: 18pt; font-family: "times new roman", times, serif;"><strong>* Lưu Ý :&nbsp;</strong></span></span></span><span style="font-family: "times new roman", times, serif;"><span style="font-size: 24px;"><strong>Chính sách này thay thế cho tất cả chính sách cũ và không áp dụng cùng lúc với các chính sách khác.<br><br></strong></span></span></p><p><span style="font-family: "times new roman", times, serif;"><span style="font-size: 24px;"><strong>QUY ĐỊNH VỀ VIỆC GIAO HÀNG</strong></span></span></p><p><span style="font-family: "times new roman", times, serif;"><span style="font-size: 24px;"><strong>Chúng tôi cam kết:<br>1/ CHUYỂN HÀNG TRONG NGÀY, NẾU:<br>&nbsp; &nbsp;-&nbsp;CHỐT ĐƠN ĐẶT HÀNG TRƯỚC 09h30H <br>2/ CHUYỂN HÀNG VÀO NGÀY HÔM SAU, NẾU:<br>&nbsp; &nbsp;- CHỐT ĐƠN SAU 9H30H</strong></span></span></p><p><span style="font-family: "times new roman", times, serif;"><span style="font-size: 24px;"><strong><br><br></strong></span></span></p>';
        }
    }
})();
