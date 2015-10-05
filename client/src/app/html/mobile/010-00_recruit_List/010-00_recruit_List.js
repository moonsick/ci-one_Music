'use strict';

angular.module('eventApp')
    .controller('recruitList_Ctr', function ($scope,executeResults ,$http, $route, $rootScope, $location ,$routeParams,$compile) {
        /*$("#body").addClass('hidden');*/



        // url 나누기
        var url = String(window.location).split('?');
        var search = String(url[1]).split('=');
        search[1] = decodeURI(search[1]);
        $scope.search_word =search[1];



        var first_check = 0; // 첫 입장 구분



        var list_count = 1;  // 더보기 버튼의 횟수 지정
        var limit2 = 10;     // 최대 몇개까지 보는지 설정
        var limit1 = 0;      // 기본값


        // 세션을 통해서 더보기를 몇번 눌렀는지 가져온다.
        if(sessionStorage.getItem('recruit_list_count') == null || sessionStorage.getItem('recruit_list_count') == 'null' ){
            list_count = 1;
            $scope.list_count = 1;
        }else{
            list_count = parseInt(sessionStorage.getItem('recruit_list_count'));
            $scope.list_count = list_count;
        }


        $scope.category2_name ="전체";

        $scope.order ={}; // 필터에 쓰일 스코프 지정
        $scope.order.categoryFirstPK="";  // 장기,단기 구분 필터 초기화
        $scope.order.categorySecPK="";    // 세션,보컬,총괄 구분 필터 초기화


        $scope.recruit_list = [];           // 공고글을 담는 배열
        $scope.recruit_list_copy = [];     // List 복제품 repeat에 실제로 쓰인다
        $scope.recruit_list_total = [];     // List 복제품2 정열을 위해 쓰인다.



        // 실제 보이는건 무조건 $scope.recruit_list_copy;
        // 정렬을 누를시 ng-repeat 에 | filter.order를 정의
        // 정기단기 는 $scope.order.categoryFirstPK 로 필터를 구분
        // 세션,보컬,총괄은 $scope.order.categorySecPK 로 필터를 구분
        // 각 버튼을 눌렀을때 스위치 형태로 필터를 즉시 적용되게 한다.
        // 단 이미 뽑아온 전체에서 필터일 뿐이다


        // 더보기 누를시 실제로 보이는건 $scope.recruit_list_copy
        // 맨처음 xx개씩 보일 제한에 +xx개 만큼 뿌린다. 맨처음에만 여유분을 구한후
        // 다음 더보기시 맨처음 구한 여유분을 출력 하면서 새로운 여유분 xx개만큼 돌린다.
        // 예) 10개씩 뿌릴시
        // 처음에 20개를 출력후
        // 10개 출력   --- 나머지 10개     더보기 누를시
        // 나머지 10개 출력 -- 10개출력하면서 새로운 10개 출력
        // 이런식이기 때문에 맨 처음에만 +xx개 만큼더 출력하고 나머진 그대로 xx개씩만 추가한다
        // 새로구한 데이터는 $scope.recruit_list_copy 와 $scope.recruit_list_total에 push로 배열뒤에 붙이기


        /*$scope.ccs =function(val){
if(val == '1'){
    $("#list_loading").removeClass('hidden');
}
        }*/


        // 장기 단기 버튼을 가져온다.
        executeResults.category1_list().then(function(data) {
            $scope.category1_list =data;
        });



        // 세션,총괄,보컬 등등의 버튼을 가져온다.
        executeResults.category2_list().then(function(data) {
            $scope.category2_list =data;
        });






        // 공고글 list 가져오기 recruit_list
        //(list_count+limit2)+limit2) 는 첫 입장시 add_count에 따라서 limit를 가져오는 횟수를 계산 한다.
        executeResults.recruit_list(limit1,(list_count*limit2)+limit2,search[1]).then(function(data) {
            $scope.recruit_list = data;

            if($scope.recruit_list[0].notdata !=='none'){    // List데이터가 있을 경우
// 첫 입장시 add_count에 따라서 뿌려준다  add_count는 더보기를 몇번 눌렀는지에 대한 횟수
                for(var i =0; i<list_count*limit2; i++){
                    if($scope.recruit_list[i] == undefined){   //
                        $("#add_button").remove();

                    }else{
                        if($scope.recruit_list[i].apply_count == null){  // 지원자가 없을때 null이므로 0으로 교체
                            $scope.recruit_list[i].apply_count = 0;
                        }

                        if($scope.recruit_list[i].result_time <1){    // 남은 시간 계산
                            $scope.recruit_list[i].result_time = 0;
                        }

                        $scope.recruit_list[i].recruitContents = $scope.recruit_list[i].recruitContents.replace(/\n/gi,"<br>"); // 모집내용 엔터 <br>교체

                        $scope.recruit_list[i].recruitPrice = $.number($scope.recruit_list[i].recruitPrice); // 가격 , 표시로 교체

                        $scope.recruit_list_copy.push($scope.recruit_list[i]);
                        $scope.recruit_list_total.push($scope.recruit_list[i]);
                        $("#add_button").removeClass('hidden');
                    }

                    if($scope.recruit_list.length == limit2){
                        $("#add_button").remove();
                    }
                };
            }else{
             // 데이터가 없을때
            }
            $("#list_loading").addClass('hidden');
            $("#no_search").removeClass('hidden');  // 검색된 결과가 없음의 히든을 풀어버린다
            sessionStorage.setItem('recruit_list_count',1);

        });



        // 더보기 버튼을 눌렀을시
        $scope.list_add = function(){
            if(first_check == 0){
                for(var i=list_count*limit2; i<$scope.recruit_list.length; i++){
                    if($scope.recruit_list[i].apply_count == null){  // 지원자가 없을때 null이므로 0으로 교체
                        $scope.recruit_list[i].apply_count = 0;}
                    if($scope.recruit_list[i].result_time <1){    // 남은 시간 계산
                        $scope.recruit_list[i].result_time = 0;}
                    $scope.recruit_list[i].recruitPrice = $.number($scope.recruit_list[i].recruitPrice); // 가격 , 표시로 교체
                    $scope.recruit_list_copy.push($scope.recruit_list[i]);
                    $scope.recruit_list_total.push($scope.recruit_list[i]);
                }

            }else{
                for(var i=0; i<$scope.recruit_list.length; i++){
                    $scope.recruit_list_copy.push($scope.recruit_list[i]);
                    $scope.recruit_list_total.push($scope.recruit_list[i]);
                }
            }

            first_check = first_check+1;

            list_count = list_count+1;
            $scope.list_count = list_count;
            limit1 = (list_count)*limit2;
            executeResults.recruit_list(limit1,limit2,search[1]).then(function(data) {
                $scope.recruit_list = data;
                if($scope.recruit_list[0].notdata == 'none'){
                    $("#add_button").remove();
                }else{
                    for(var i =0; i<$scope.recruit_list.length; i++){
                        if($scope.recruit_list[i].apply_count == null){  // 지원자가 없을때 null이므로 0으로 교체
                            $scope.recruit_list[i].apply_count = 0;}
                        if($scope.recruit_list[i].result_time <1){    // 남은 시간 계산
                            $scope.recruit_list[i].result_time = 0;}
                        $scope.recruit_list[i].recruitPrice = $.number($scope.recruit_list[i].recruitPrice); // 가격 , 표시로 교체
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
            $location.path('/m_recruit_list').search({search: $scope.search_word});    // SPA의 깜빡임 없이 페이지 이동 하는 방법
        };






// 정렬 버튼에 전체 클릭시   필터를 초기화
        $scope.category_total_click = function(){

            $location.path('/m_recruit_list').search({search: ""});    // SPA의 깜빡임 없이 페이지 이동 하는 방법
            $scope.search_word = "";

            $scope.category2_name="전체";
            $scope.order.categoryFirstPK = ""; // 정기,단기 필터 초기화
            $scope.order.categorySecPK = "";   // 2차 (세션,보컬,총괄) 필터 초기화
            $("#total_button").addClass('active');
            $("#category2_class").removeClass('active');


            for(var i =0; i<$scope.category1_list.length; i++){
                    $("#category1_"+$scope.category1_list[i].categoryFirstPK).removeClass('active');  // 버튼에 acitve 삭제
            }
            for(var i =0; i<$scope.category2_list.length; i++){
                $("#category2_"+$scope.category2_list[i].categorySecPK).removeClass('active');
            }

        };



// 정렬 버튼 클릭시 동작 , 정기,단기
        $scope.category1_click = function(val){

            $scope.category2_name="전체";
            $scope.order.categorySecPK = "";

            $("#total_button").removeClass('active');
            $("#category2_class").removeClass('active');
            for(var i =0; i<$scope.category2_list.length; i++){
                $("#category2_"+$scope.category2_list[i].categorySecPK).removeClass('active');
            }

            //  정기,단기 버튼이 안눌린상태일 경우 ( 전체 보여주기일 경우 )
            if($scope.order.categoryFirstPK == ""){
                $("#category1_"+val).addClass('active');  // 버튼에 acitve 추가
                $scope.order.categoryFirstPK = val;       // 필터값 추가
            }else{ // 정기나 단기 둘중 하나가 눌린경우

                if($scope.order.categoryFirstPK == val){  // 눌렀던 버튼을 또 누를 경우
                    $("#total_button").addClass('active');
                    $("#category1_"+val).removeClass('active');  // 버튼에 acitve 삭제
                    $scope.order.categoryFirstPK = "";       // 필터값 초기화
                }else{   // 이미 눌린 버튼 외에 다른걸 눌렀을때

                    for(var i =0; i<$scope.category1_list.length; i++){
                        if($scope.category1_list[i].categoryFirstPK !== val){
                            $("#category1_"+$scope.category1_list[i].categoryFirstPK).removeClass('active');  // 버튼에 acitve 삭제
                        }
                    }
                    $("#category1_"+val).addClass('active');  // 버튼에 acitve 추가
                    $scope.order.categoryFirstPK = val;       // 필터값 추가
                }
            }

        };



// 정렬 버튼 클릭시 동작
        $scope.category2_click = function(val){

            if(val == 'total'){
                $("#category2_total").addClass('active');
                $("#category2_class").removeClass('active');
                $scope.order.categorySecPK= "";
                $scope.category2_name = "전체";
                for(var i =0; i<$scope.category2_list.length; i++){
                        $("#category2_"+$scope.category2_list[i].categorySecPK).removeClass('active');
                }
                return;
            };

            for(var i =0; i<$scope.category2_list.length; i++){
                if(val == $scope.category2_list[i].categorySecPK){
                    $scope.category2_name = $scope.category2_list[i].categorySecName;
                    $("#category2_class").addClass('active');
                    $("#category2_"+$scope.category2_list[i].categorySecPK).addClass('active');
                    $scope.order.categorySecPK= $scope.category2_list[i].categorySecPK;
                }else{
                    $("#category2_"+$scope.category2_list[i].categorySecPK).removeClass('active');
                }
            }
            $("#category2_total").removeClass('active');

        }



        // ng-class 함수  모집중, 마감을 구분하여 box-end에 추가 유무를 결정한다.
        $scope.box_end = function(val){
            var className = "";
            if(val == 1){
                className = "box-end";
            }
            return className;
        };




    });
