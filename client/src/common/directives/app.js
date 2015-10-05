'use strict';

var app = angular.module('eventApp', [
    'ngRoute',
    'angularFileUpload',
    'ngAnimate',
    'ui.bootstrap',
    'ngCookies',
    'ngSanitize'
]);
app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/src/app/html/110_00_event_register/110_00_event_register.html'
            })
            .when('/m', {
                templateUrl: '/src/app/html/mobile/000-00_main/000-00_main.html'
            })

            //////////////////////////// 찾아요 ///////////////////////////////////////////////////////////
            .when('/m_recruit_list', {
                templateUrl: '/src/app/html/mobile/010-00_recruit_List/010-00_recruit_List.html'
            })
            .when('/m_recruit_detail', {
                templateUrl: '/src/app/html/mobile/010-00_recruit_List/010-01_recruit_Detail.html'
            })
            .when('/m_recruit_insert', {
                templateUrl: '/src/app/html/mobile/010-00_recruit_List/010-02_recruit_Insert.html'
            })


            ///////////////////////////////////////////////////////////////////////////////////////////////



            //////////////////////////// 저는요 ///////////////////////////////////////////////////////////
            .when('/m_musician_list', {
                templateUrl: '/src/app/html/mobile/020-00_musician_List/020-00_musician_List.html'
            })
            .when('/m_musician_detail', {
                templateUrl: '/src/app/html/mobile/020-00_musician_List/020-01_musician_Detail.html'
            })

            ///////////////////////////////////////////////////////////////////////////////////////////////




            //////////////////////////// 마이 메뉴 ///////////////////////////////////////////////////////////
            .when('/m_my_menu', {
                templateUrl: '/src/app/html/mobile/060-00_my_Menu/060-00_my_Menu.html'
            })


            ///////////////////////////////////////////////////////////////////////////////////////////////
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

