(function() {
    'use strict';

    angular
        .module('footballBeApp')
        .directive('sortByCol', sortByCol);

    function sortByCol() {
        var directive = {
            restrict: 'A',
            scope: {
                sortByCurrent: '=sortByCurrent'
            },
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            element.addClass('header-sort');

            element.bind('click', function () {
                if (scope.sortByCurrent == attrs.sortByCol) {
                    scope.sortByCurrent = '-'+ attrs.sortByCol;
                } else {
                    scope.sortByCurrent = attrs.sortByCol;
                }

                scope.$apply();
            });
        }
    }
})();
