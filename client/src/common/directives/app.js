'use strict';

var app = angular.module('eventApp', [
    'ngRoute',
    'angularFileUpload',
    'ui.bootstrap',
    'ngCookies'
]);
app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/src/app/html/110_00_event_register/110_00_event_register.html'
            })
            .when('/m', {
                templateUrl: '/src/app/html/mobile/010-00_recruit_List/010-00_recruit_List.html'
            })
            /*.when('/kang', {
                redirectTo: '/'
            })*/


            /*.otherwise({
                redirectTo: '/'
            });*/

        $locationProvider.html5Mode(true);
    });

app.directive('ngConfirmClick', [
    function(){
        return {
            priority: -1,
            restrict: 'A',
            link: function(scope, element, attrs){
                element.bind('click', function(e){
                    var message = attrs.ngConfirmClick;
                    if(message && !confirm(message)){
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                });
            }
        }
    }
]);

