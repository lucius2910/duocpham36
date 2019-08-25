(function () {
    'use strict';

    angular.module('footballBeApp')
        .directive('whenScrolled', whenScrolled);


    function whenScrolled() {
        var directive = {
            restrict: 'A',
            scope: false,
            link: linkFunc
        };

        return directive;

        function linkFunc() {
            return function (scope, elm, attr) {
                var raw = elm[0];

                console.log(raw);
    
                elm.bind('scroll', function () {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                        scope.$apply(attr.whenScrolled);
                    }
                });
            };
        };
    }
})();
