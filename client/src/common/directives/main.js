'use strict';

angular.module('eventApp')
    .controller('MainCtrl', function ($scope,executeResults ,$http, $route, $rootScope, $location ,$routeParams) {
        $http.get('/api/awesomeThings').success(function (awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });

        $scope.sideClass= function(index){
            $scope.index=index;
            console.log("INDEX"+index);
        }



        $rootScope.machine = 'pc';
        if (navigator.userAgent.match(/iPad/) == null && navigator.userAgent.match(/iPhone|Mobile|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson| opera mobi|Windows Phone|IEMobile|POLARIS/) != null)
        {
            if (navigator.userAgent.toLowerCase().indexOf('ipad') > -1 ||
                (navigator.userAgent.toLowerCase().indexOf('android') > -1 && navigator.userAgent.toLowerCase().indexOf('mobile') == -1)) {

                var head_url = [];
                head_url = String(window.location).split('/');
                var head_url2 = head_url[3];
                if(head_url2[0] == "m"){
                    $rootScope.machine = 'mobile';
                }


            }else{
                // 모바일 일때
                $rootScope.machine = 'mobile';
                var head_url = [];
                    head_url = String(window.location).split('/');
                var head_url2 = head_url[3];
                if(head_url2[0] !== "m"){
                    if(head_url[3] == ""){
                        window.location = "/m?search=";
                    }else{
                        window.location ="/m_"+head_url[3];
                    }
                }
            }

        }

    });