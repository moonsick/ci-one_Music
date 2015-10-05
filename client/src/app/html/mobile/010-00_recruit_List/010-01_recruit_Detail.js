'use strict';

angular.module('eventApp')
    .controller('recruitDetail_Ctr', function ($scope,executeResults ,$http, $route, $rootScope, $location ,$routeParams,$compile) {



        //지원을 이미 했는지 안했는지에 대해 한번 체크를 한다 apply_check
        executeResults.apply_check($rootScope.member_pk,recruit_pk).then(function(data) {
            $scope.apply_check = data;
        });



        var url = String(window.location).split('?');
        var url = String(url[1]).split('&');
        var list_count = String(url[1]).split('=');
        var recruit_pk = url[0];
        sessionStorage.setItem('recruit_list_count',list_count[1]);

        // 찾아요 기본 정보를 뽑아 온다. 금액,마감일 등등  recruit_info
        executeResults.recruit_info(recruit_pk).then(function(data) {
            $scope.recruit_info = data;

            if($scope.recruit_info[0].apply_count == null){  // 지원자가 없을때 null이므로 0으로 교체
                $scope.recruit_info[0].apply_count = 0;
            }
            $scope.recruit_info[0].recruitPrice = $.number($scope.recruit_info[0].recruitPrice); // 가격 , 표시로 교체
            $scope.recruit_info[0].recruitContents = $scope.recruit_info[0].recruitContents.replace(/\n/gi,"<br>"); // 모집내용 엔터 <br>교체




            if($scope.recruit_info[0].adminComment == null){
                $scope.recruit_info[0].adminComment = "";
            }else{
                $scope.recruit_info[0].adminComment = $scope.recruit_info[0].adminComment.replace(/\n/gi,"<br>");       // 관리자 코멘드 엔터 <br> 교체
            }


            var date ="";
            for(var i=0; i<$scope.recruit_info[0].endDate.length; i++){
                if(i==4){
                    date = date+'년 ';
                }if(i==7){
                    date = date+'월 ';
                }if( i!==4 && i!==7){
                    date = date+ $scope.recruit_info[0].endDate[i];
                }
            };
            $scope.recruit_info[0].endDate = date+'일';


            $("#recuit_detail_space").removeClass('hidden');    // 전체 영역 보이기
            $("#list_loading").addClass('hidden');   // 로딩 이미지 감추기
        });


        // 찾아요 리플레이를 뽑는다 . 리플 + 리플에 리플까지 뽑아 온다 recruit_reply
        $scope.reply_reset = function(){
            executeResults.recruit_reply(recruit_pk).then(function(data) {
                $scope.recruit_reply = data;

                if($scope.recruit_reply[0].notdata =='none'){
                    $scope.recruit_reply = new Array(0);
                }

            });
        }
        $scope.reply_reset();



// 찾아요 리플에 리플 등록  recruit_re_reply_insert
        $scope.re_reply_insert = function(reply_pk){
            $("#re_reply"+reply_pk).val($("#re_reply"+reply_pk).val().replace( /(^\s*)|(\s*$)/g, "" ));

            if($rootScope.login_on == false){
                alert("로그인이 필요합니다");
                return;
            }

            if($("#re_reply"+reply_pk).val() == ""){
                alert("등록할 내용이 없습니다");
                $("#re_reply"+reply_pk).focus();
                return;
            };

            if($("#re_reply"+reply_pk).val().length > 450){
                alert("문의글의 글자수는 450자 이하입니다");
                $("#re_reply"+reply_pk).focus();
                return;
            }


            if(confirm("확인을 누르면 문의글의 리플이 등록됩니다\n등록 하시겠습니까?")){
                var re_reply = $("#re_reply"+reply_pk).val();
                $("#re_reply"+reply_pk).val("");
                executeResults.recruit_re_reply_insert(recruit_pk,reply_pk,$rootScope.member_pk,re_reply).then(function(data) {
                    $scope.reply_reset();
                });
            }
        }


// 찾아요 리플 등록
        $scope.reply_insert = function(){
            $("#reply").val($("#reply").val().replace( /(^\s*)|(\s*$)/g, "" ));

            if($rootScope.login_on == false){
                alert("로그인이 필요합니다");
                return;
            }

            if($("#reply").val() == ""){
                alert("등록할 내용이 없습니다");
                $("#reply").focus();
                return;
            };


            if($("#reply").val().length > 450){
                alert("문의글의 글자수는 450자 이하입니다");
                $("#reply").focus();
                return;
            }



            // 찾아요 리플 등록  recruit_reply_insert
            if(confirm("확인을 누르면 문의글이 등록됩니다\n등록 하시겠습니까?")){
                var reply = $("#reply").val();
                $("#reply").val("");
                executeResults.recruit_reply_insert(recruit_pk,$rootScope.member_pk,reply).then(function(data) {
                    $scope.reply_reset();
                });
            }
        };







// 입장시 로그인 유무에 따라서 지원 가능 갯수의 선택지가 바뀌게 된다.
        $scope.apply_click = function(stats){

            if($scope.apply_check[0].notdata !=='none'){
                alert("이미 지원하셨습니다");
                return;
            };

            if(stats =='end'){
                alert("마감된 게시물 입니다");
                return;
            };

            if(stats == 'true'){

                if($rootScope.login_success[0].apply_count == $rootScope.login_success[0].max_apply){
                    alert("최대 지원횟수를 넘길수 없습니다\n해당 지원글에 지원을 하기 위해서는 아이템 사용 및 다른 지원서에 취소를 하셔야 합니다");
                    return;
                }



                // 최근 지원한 list를 뿌려 준다. apply_select_list
                executeResults.apply_select_list($rootScope.member_pk).then(function(data) {
                    $scope.apply_select_list = data;

                    $("#apply_modal").trigger('click');
                });

            }else{
                alert("로그인 후 이용해 주세요");
                return;
            }
        };


        // select 박스에 ng-model 부여, ng-chane를 쓰기 위해서 이다.
        $scope.apply_select = 'none';
        $scope.apply_select_click = function(){
            if($scope.apply_select !== 'none'){
                for(var i=0; i<$scope.apply_select_list.length; i++){
                    if($scope.apply_select_list[i].applyPK == $scope.apply_select){
                        $scope.apply_title = $scope.apply_select_list[i].applyTitle;
                        $scope.apply_content = $scope.apply_select_list[i].applyContents;
                    }
                }
            };
        };


        $scope.apply_insert = function(){
            $("#apply_title").val($("#apply_title").val().replace( /(^\s*)|(\s*$)/g, "" ));
            $("#apply_content").val($("#apply_content").val().replace( /(^\s*)|(\s*$)/g, "" ));

            if($("#apply_title").val() == ""){
                alert("등록할 제목을 입력해 주세요");
                $("#apply_title").val().focus();
                return;
            };

            if($("#apply_title").val().length > 40){
                alert("지원서 제목의 글자수는 40자 이하입니다");
                $("#apply_title").val().focus();
                return;
            };

            if($("#apply_content").val() == ""){
                alert("등록할 내용을 입력해 주세요");
                $("#apply_content").val().focus();
                return;
            };

            if($("#apply_content").val().length > 1800){
                alert("지원서 내용의 글자수는 1800자 이하입니다");
                $("#apply_content").val().focus();
                return;
            };



            // 지원서 등록 하기  apply_insert
            if(confirm("확인을 누르면 해당 모집글에 지원이 완료됩니다\n지원 하시겠습니까?")){

                var title = $("#apply_title").val();
                var content = $("#apply_content").val();
                var apply_price = $("#apply_price").val();
                $("#apply_title").val("");
                $("#apply_content").val("");
                $("#apply_price").val("");


                executeResults.head_login_info($rootScope.member_pk).then(function(data) {
                    $rootScope.login_success =data;

                    if($rootScope.login_success[0].apply_count == $rootScope.login_success[0].max_apply){
                        alert("최대 지원횟수를 넘길수 없습니다\n해당 지원글에 지원을 하기 위해서는 아이템 사용 및 다른 지원서에 취소를 하셔야 합니다");
                        return;
                    }
                    if(parseInt($rootScope.login_success[0].apply_count) > parseInt($rootScope.login_success[0].max_apply)){
                        alert("최대 지원 횟수보다 많은 지원을 하셨습니다\n문제에 대한 해결은 관리자를 통해서 해결해 주세요");
                        return;
                    };




                    // 모든 조건이 맞으면 실제로 지원서를 등록 한다.
                    executeResults.apply_insert($rootScope.member_pk,recruit_pk,title,content,apply_price ).then(function(data) {


                        // 지원 했는지체크
                        executeResults.apply_check($rootScope.member_pk,recruit_pk).then(function(data) {
                            $scope.apply_check = data;
                        });


                        executeResults.head_login_info($rootScope.member_pk).then(function(data) {
                            $rootScope.login_success =data;
                            $("#modal_close").trigger('click');
                            alert("지원이 완료되었습니다");
                        });
                    });
                });


            }

        };





        $scope.recruit_list_go = function(){
            $location.path('/m_recruit_list').search({search: ""});    // SPA의 깜빡임 없이 페이지 이동 하는 방법
        };



        });
