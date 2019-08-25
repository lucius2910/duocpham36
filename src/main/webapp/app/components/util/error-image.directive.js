(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .directive('errorImage', avatarDefault);

    function avatarDefault() {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            // console.log('attrs.src, attrs.avatarDefault : ', attrs.src, attrs.avatarDefault);

            if (angular.isUndefined(attrs.src)) {
                angular.element(this).attr("src", "content/images/no_thumbnail.png");
            }

            element.bind('error', function () {
                angular.element(this).attr("src", "content/images/no_thumbnail.png");
            });
        }
    }
})();
