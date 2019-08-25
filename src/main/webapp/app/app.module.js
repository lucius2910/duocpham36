// var API_CONFIG = {
//     API_URL: 'http://localhost:9001/football-api',
//     IMG_URL: 'http://45.32.49.49:8080/'
// };

(function() {
    'use strict';

    angular
        .module('footballBeApp', [
            'ngStorage',,
            'ngSanitize',
            'tmh.dynamicLocale',
            'pascalprecht.translate',
            'ngResource',
            'ngCookies',
            'ngAria',
            'ngCacheBuster',
            'ngFileUpload',
            'ui.bootstrap',
            'ui.bootstrap.datetimepicker',
            'ui.router',
            'infinite-scroll',
            'angular-loading-bar',
            'ui.checkbox',
            'angularjs-dropdown-multiselect',
            'angular-toArrayFilter'
        ])
        .run(run);

    run.$inject = ['stateHandler', 'translationHandler', '$rootScope'];

    function run(stateHandler, translationHandler, $rootScope) {
        stateHandler.initialize();
        translationHandler.initialize();

        $rootScope.API_CONFIG = API_CONFIG;

        $rootScope.sortData = function(orderBy) {
            $rootScope.orderBy = orderBy;
        }

        $(window).resize(function() {
            var hw = $(window).height();
            var hm = $('.main-wrapper').height();
            if (hm < hw) {
                $('.footer-wrapper').addClass('footer-fixed');
            } else {
                $('.footer-wrapper').removeClass('footer-fixed');
            }
        });

        setInterval(function() {
            $(window).resize();

            // $('.chosen').chosen();
        }, 100);
    }
})();
