angular.module('consoleApp').directive('toggleNavCollapsedMin', ['$rootScope', function($rootScope) {
    var directive = {
        restrict: 'A',
        link: link
    };

    return directive;

    function link(scope, ele, attrs) {
        var app;

        app = $('#app');

        ele.on('click', function(e) {
            if (app.hasClass('nav-collapsed-min')) {
                app.removeClass('nav-collapsed-min');
            } else {
                app.addClass('nav-collapsed-min');
                $rootScope.$broadcast('nav:reset');
            }
            return e.preventDefault();
        });
    }
}]);
