'use strict';



angular.module('eventApp')
    .controller('musicianList_Ctr', function ($scope,executeResults ,$http, $route, $rootScope, $location ,$routeParams,$compile) {

        $("#body").removeClass('hidden');
        // url 나누기
        var url = String(window.location).split('?');
        var search = String(url[1]).split('=');
        search[1] = decodeURI(search[1]);
        $scope.search_word =search[1];



        var first_check = 0; // 첫 입장 구분

        var list_count = 1;  // 더보기 버튼의 횟수 지정
        var limit2 = 4;     // 최대 몇개까지 보는지 설정
        var limit1 = 0;      // 기본값


        // 세션을 통해서 더보기를 몇번 눌렀는지 가져온다.
        if(sessionStorage.getItem('member_list_count') == null || sessionStorage.getItem('member_list_count') == 'null' ){
            list_count = 1;
            $scope.list_count = 1;
        }else{
            list_count = parseInt(sessionStorage.getItem('member_list_count'));
            $scope.list_count = list_count;
        }



        $scope.musician_list = [];           // 저는요글을 담는 배열
        $scope.musician_list_copy = [];     // List 복제품 repeat에 실제로 쓰인다



        // 더보기 누를시 실제로 보이는건 $scope.musician_list_copy
        // 맨처음 xx개씩 보일 제한에 +xx개 만큼 뿌린다. 맨처음에만 여유분을 구한후
        // 다음 더보기시 맨처음 구한 여유분을 출력 하면서 새로운 여유분 xx개만큼 돌린다.
        // 예) 10개씩 뿌릴시
        // 처음에 20개를 출력후
        // 10개 출력   --- 나머지 10개     더보기 누를시
        // 나머지 10개 출력 -- 10개출력하면서 새로운 10개 출력
        // 이런식이기 때문에 맨 처음에만 +xx개 만큼더 출력하고 나머진 그대로 xx개씩만 추가한다
        // 새로구한 데이터는 $scope.musician_list_copy 와 $scope.musician_list_total에 push로 배열뒤에 붙이기




        // 저는요글 list 가져오기 musician_list
        //(list_count+limit2)+limit2) 는 첫 입장시 add_count에 따라서 limit를 가져오는 횟수를 계산 한다.
        executeResults.musician_list(limit1,(list_count*limit2)+limit2,search[1]).then(function(data) {
            $scope.musician_list = data;

            if($scope.musician_list[0].notdata !=='none'){    // List데이터가 있을 경우
// 첫 입장시 add_count에 따라서 뿌려준다  add_count는 더보기를 몇번 눌렀는지에 대한 횟수
                for(var i =0; i<list_count*limit2; i++){
                    if($scope.musician_list[i] == undefined){   //
                        $("#add_button").remove();

                    }else{

                        var name = "";
                        for(var j=0; j<$scope.musician_list[i].memberName.length; j++){
                            if(j==0){
                                name = $scope.musician_list[i].memberName[j]
                            }else{
                                name = name+"*"
                            }
                        };

                        $scope.musician_list[i].memberName = name;
                        $scope.musician_list_copy.push($scope.musician_list[i]);

                    }

                    if($scope.musician_list.length == limit2){
                        $("#add_button").remove();
                    }
                };

                $("#add_button").removeClass('hidden');
            }else{
                // 데이터가 없을때
            }
            $("#list_loading").addClass('hidden');
            $("#no_search").removeClass('hidden');  // 검색된 결과가 없음의 히든을 풀어버린다
            sessionStorage.setItem('member_list_count',1);


        });


        // 더보기 버튼을 눌렀을시
        $scope.list_add = function(){
            if(first_check == 0){
                // 첫 더보기는 가져온 데이터에 나머지를 뿌리기 때문에 var i = list_count* limit2를 하게 된다
                for(var i=list_count*limit2; i<$scope.musician_list.length; i++){


                    var name = "";
                    for(var j=0; j<$scope.musician_list[i].memberName.length; j++){
                        if(j==0){
                            name = $scope.musician_list[i].memberName[j]
                        }else{
                            name = name+"*"
                        }
                    };

                    $scope.musician_list[i].memberName = name;


                    $scope.musician_list_copy.push($scope.musician_list[i]);
                }

            }else{// 2번째 더보기 클릭시부터 DB에 뽑아온 데이터를 뿌리므로 위 조건과 다르게 된다.
                for(var i=0; i<$scope.musician_list.length; i++){

                    $scope.musician_list_copy.push($scope.musician_list[i]);
                }
            }

            first_check = first_check+1;

            list_count = list_count+1;
            $scope.list_count = list_count;
            limit1 = (list_count)*limit2;
            executeResults.musician_list(limit1,limit2,search[1]).then(function(data) {
                $scope.musician_list = data;
                if($scope.musician_list[0].notdata == 'none'){
                    $("#add_button").remove();
                }else{
                    for(var i =0; i<$scope.musician_list.length; i++){

                        var name = "";
                        for(var j=0; j<$scope.musician_list[i].memberName.length; j++){
                            if(j==0){
                                name = $scope.musician_list[i].memberName[j]
                            }else{
                                name = name+"*"
                            }
                        };

                        $scope.musician_list[i].memberName = name;
                    }
                }
            });


        };


        // 검색 할시 동작
        $scope.search_go = function ($event) {
            if((window.event ? $event.keyCode : $event.which) == 13){    // 만약 input창에 엔터가 들어올때 구분 조건문
                $scope.search_go2();                                     // 검색하는 함수 발동
            };
        };
        $scope.search_go2 = function () {
            $location.path('/m_musician_list').search({search: $scope.search_word});    // SPA의 깜빡임 없이 페이지 이동 하는 방법
        };


        // List 클릭시 상세 보기로 넘어 간다.
        $scope.m_musician_detail_go = function(val){
            $location.path('/m_musician_detail').search( {member : val , list : $scope.list_count} );    // SPA의 깜빡임 없이 페이지 이동 하는 방법
        };


    });
