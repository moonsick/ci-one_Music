'use strict';
var data1;
angular.module('eventApp')
    .controller('recruitList_Ctr', function ($scope,executeResults ,$http, $route, $rootScope, $location ,$routeParams) {

        $scope.recruit_list = [];   // 공고글을 담는 배열


        // 공고글 list 가져오기 recruit_list
        executeResults.recruit_list().then(function(data) {
            $scope.recruit_list = data;

            if($scope.recruit_list[0].notdata !=='none'){    // List데이터가 있을 경우

                for(var i =0; i<$scope.recruit_list.length; i++){
                    if($scope.recruit_list[i].apply_count == null){  // 지원자가 없을때 null이므로 0으로 교체
                        $scope.recruit_list[i].apply_count = 0;
                    }

                    if($scope.recruit_list[i].result_time <1){
                        $scope.recruit_list[i].result_time = 0;
                    }

                    $scope.recruit_list[i].recruitPrice = $.number($scope.recruit_list[i].recruitPrice); // 가격 , 표시로 교체

                };

            }

        });


        // 공고글 태그 list  recruit_tag
        executeResults.recruit_tag().then(function(data) {
            $scope.recruit_tag = data;

            if($scope.recruit_tag[0].notdata !=='none') {    // List데이터가 있을 경우

                for (var i = 0; i < $scope.recruit_tag.length; i++) {
                    $("#tag"+$scope.recruit_tag[i].recruitPK).append("<li>"+$scope.recruit_tag[i].tagName+"</li>");
                }

            }

        });



    });
