'use strict';

angular.module('eventApp')
    .controller('recruitInsert_Ctr', function ($scope,executeResults ,$http, $route, $rootScope, $location ,$routeParams,$compile) {



        // 장기 단기 버튼을 가져온다.
        executeResults.category1_list().then(function(data) {
            $scope.category1_list =data;
        });

        // 세션,총괄,보컬 등등의 버튼을 가져온다.
        executeResults.category2_list().then(function(data) {
            $scope.category2_list =data;
        });


        // 전체 지역을 뽑아 온다. location_list
        executeResults.location_list().then(function(data) {
            $scope.location_list =data;
        });



        // 카테고리 select 박스 초기 설정
        $scope.category1_select = "none";
        $scope.category2_select = "none";
        $scope.location_select = "none";
        $scope.manager_checkbox =false;





        // 입력 태그의 숫자  태그의 pk가 되기도 한다.
        $scope.tag_count = 1;
        $scope.tag_insert = function ($event) {

            if($rootScope.login_on == false){
                $("#tag_text").val("");
                alert("로그인후 이용해 주세요");
                return;
            }

            if($scope.tag_count > $rootScope.login_success[0].apply_tag_count){
                $("#tag_text").val("");
                alert("현재 최대 태그 등록수는 "+$rootScope.login_success[0].apply_tag_count+'개 입니다\n추가적인 태그등록을 원하시면 모집 태그등록 증가 아이템을 구매해 주시길 바랍니다');
                return;
            }

            if((window.event ? $event.keyCode : $event.which) == 32 || (window.event ? $event.keyCode : $event.which) == 13 ){    // 만약 input창에 스페이스바가 들어올때 구분 조건문

                $("#tag_text").val(  $("#tag_text").val().replace( /(^\s*)|(\s*$)/g, "" )  );   // 양 끝의 스페이스바 제거
                if($("#tag_text").val().length !== 0){
                    var tag = { tag_name : $("#tag_text").val(), tag_stats : 'insert' };
                    $scope.tag_list.push(tag);
                    $("#tag_text").val("");
                    $scope.tag_count++;
                }

            };
        };

        $scope.tag_list = []; // 태그 list를 담는다.



        // 찾아요 등록 insert

        var recruit_insert_realay = 0;
        $scope.recruit_insert = function(){

            $("#recruit_title").val(  $("#recruit_title").val().replace( /(^\s*)|(\s*$)/g, "" )  );
            $("#recruit_content").val(  $("#recruit_content").val().replace( /(^\s*)|(\s*$)/g, "" )  );

            if($("#recruit_title").val().length == 0){
                alert("모집 제목을 입력해 주세요");
                $("#recruit_title").focus();
                return;
            };
            if($("#recruit_title").val().length > 45){
                alert("모집 제목의 글자수는 45자 이하입니다");
                $("#recruit_title").focus();
                return;
            };


            if($scope.category1_select == "none"){
                alert("1차 구분을 선택해 주세요");
                $("#category1_select").focus();
                return;
            }
            if($scope.category2_select == "none"){
                alert("2차 구분을 선택해 주세요");
                $("#category2_select").focus();
                return;
            }

            if($("#recruit_price").val() == "" ){
                alert("예상금액을 입력해 주세요");
                $("#recruit_price").focus();
                return;
            }

            if($("#end_time").val() == ""){
                alert("모집마감을 설정해야 합니다");
                $("#calendar_button").trigger('click');
                return;
            }


            var date_cut = String($("#end_time").val()).split('-');
            var st = srvTime();
            var now = new Date(st);
            var todayAtMidn = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var specificDate = new Date(  String(parseInt(date_cut[1]))+"/"+String(parseInt(date_cut[2]))+"/"+String(parseInt(date_cut[0])) );


            if (todayAtMidn.getTime() == specificDate.getTime() || todayAtMidn.getTime() > specificDate.getTime() )
            {
                alert("모집마감 날짜는 현재 날짜보다 같거나 작을수 없습니다");
                return;
            };



            if($scope.location_select == "none"){
                alert("진행지역을 선택해 주세요");
                $("#location_select").focus();
                return;
            };




            if($("#recruit_content").val().length == 0){
                alert("모집 내용을 입력해 주세요");
                $("#recruit_content").focus();
                return;
            };
            if($("#recruit_content").val().length > 45){
                alert("모집 내용의 글자수는 1900자 이하입니다");
                $("#recruit_content").focus();
                return;
            };





            executeResults.head_login_info($rootScope.member_pk).then(function(data) {
                $rootScope.login_success =data;
                $rootScope.login_check_next();



                if($rootScope.login_success[0].apply_search_count == $rootScope.login_success[0].max_search_apply){
                    alert("최대 모집글 횟수를 넘길수 없습니다\n해당 지원글에 지원을 하기 위해서는 아이템 사용 및 다른 지원서에 취소를 하셔야 합니다");
                    return;
                }
                if(parseInt($rootScope.login_success[0].apply_search_count) > parseInt($rootScope.login_success[0].max_search_apply)){
                    alert("최대 모집글 횟수보다 많은 지원을 하셨습니다\n문제에 대한 해결은 관리자를 통해서 해결해 주세요");
                    return;
                };


                if( recruit_insert_realay == 0){
                    if(confirm("확인을 누르시면 모집글 등록이 완료됩니다\n등록 하시겠습니까?")){

                        if($scope.manager_checkbox == true){
                            var total_coin = $rootScope.member_freecoin + $rootScope.member_paycoin;


                            if(confirm("확인을 누르시면 모집요쳥 확장 아이템이 결제됩니다\n\n" +
                                "현재 보유코인    : "+ String(total_coin) +"\n" +
                                "결제후 보유코인 : "+String( total_coin-$rootScope.manager_pay_coin )) ){

                                executeResults.head_login_info($rootScope.member_pk).then(function(data) {
                                    $rootScope.login_success = data;
                                    $rootScope.login_check_next();
                                    if(total_coin < $rootScope.manager_pay_coin){
                                        alert("매니저 요청은 "+String($rootScope.manager_pay_coin)+"개의 코인이 필요합니다\n" +
                                        "현재 보유코인 : "+ String(total_coin) +"\n" +
                                        "필요한 코인량 : "+String($rootScope.manager_pay_coin - total_coin)+"\n코인인이 필요한 경우 충전후 이용해 주시길 바랍니다");
                                        return;
                                    }
                                });

                            }else{
                                return;
                            }
                        };









                        recruit_insert_realay = 1;

                        $("#recruit_price").val(parseInt($("#recruit_price").val()));
                        var free_coin = 0;
                        var pay_coin = 0;
                        var pm_stats = 0;

                        if($scope.manager_checkbox == true){
                            pm_stats = 1;
                            if($rootScope.member_freecoin - $rootScope.manager_pay_coin < 0 ){
                                free_coin = $rootScope.member_freecoin;
                                pay_coin = $rootScope.manager_pay_coin - $rootScope.member_freecoin;
                            }else{
                                free_coin = $rootScope.manager_pay_coin;
                                pay_coin = 0;
                            }
                        }


                        executeResults.recruit_insert(
                            $("#recruit_title").val(), $scope.category1_select, $scope.category2_select,
                            $("#recruit_price").val(), $("#end_time").val(),$scope.location_select, $("#recruit_content").val(),
                            $scope.tag_list, $scope.tag_list.length , free_coin, pay_coin, $rootScope.member_pk , pm_stats
                        ).then(function(data) {
                                executeResults.head_login_info($rootScope.member_pk).then(function(data) {
                                    $rootScope.login_success = data;
                                    $rootScope.login_check_next();
                                    alert("모집글 등록이 완료되었습니다\n관리자 심사를 기다려주세요");
                                    $("#recruit_title").val("");
                                    $scope.category1_select = 'npne';
                                    $scope.category2_select = 'none';
                                    $("#recruit_price").val("");
                                    $("#end_time").val("");
                                    $scope.location_select = 'none';
                                    $("#recruit_content").val("");
                                    $scope.tag_list = new Array(0);
                                    $scope.manager_checkbox = false;


                                    recruit_insert_realay = 0;
                                });
                            });

                    };
                }




            });


        };


        $scope.pm_check = function() {

            if($scope.manager_checkbox == false){
                executeResults.head_login_info($rootScope.member_pk).then(function(data) {
                    $rootScope.login_success = data;
                    $rootScope.login_check_next();

                    if ($scope.manager_checkbox == true) {
                        var total_coin = $rootScope.member_freecoin + $rootScope.member_paycoin;
                        if (total_coin < $rootScope.manager_pay_coin) {
                            alert("매니저 요청은 " + String($rootScope.manager_pay_coin) + "개의 코인이 필요합니다\n" +
                            "현재 보유코인 : " + String(total_coin) + "\n" +
                            "필요한 코인량 : " + String($rootScope.manager_pay_coin - total_coin) + "\n코인인이 필요한 경우 충전후 이용해 주시길 바랍니다");
                            return;
                        }
                    }

                });
            }
        };




        // 태그를 눌렀을때 input박스가 포커싱 된다
        $scope.tag_pace_click = function(){
            $("#tag_text").focus();
        };

        $scope.tag_delete = function(index){
            event.stopPropagation();
            if(confirm("확인을 누르면 삭제가 완료됩니다\n해당 테그를 삭제 하시겠습니까?")){
                $scope.tag_list[index].tag_stats = 'delete';
                $scope.tag_count--;
            };
        };












//////////////////////// 지원서 확장 아이템 ///////////////////////////////////////////////////////////

        $scope.search_max_add = function(){

            var total_coin = $rootScope.member_freecoin + $rootScope.member_paycoin;
            if(total_coin < $rootScope.search_item.itemPrice ){
                alert("모집요청 확장은 "+String($rootScope.search_item.itemPrice)+"개의 코인이 필요합니다\n\n" +
                "현재 보유코인 : "+ String(total_coin) +"\n" +
                "필요한 코인량 : "+String($rootScope.search_item.itemPrice - total_coin)+"\n코인인이 필요한 경우 충전후 이용해 주시길 바랍니다");
                return;
            }else{

                // 결제 진행

                if(confirm("확인을 누르시면 모집요쳥 확장 아이템이 결제됩니다\n\n" +
                    "현재 보유코인    : "+ String(total_coin) +"\n" +
                    "결제후 보유코인 : "+String( total_coin-$rootScope.search_item.itemPrice )) ){

                    // 최종 결제전 코인 한번더 체크
                    executeResults.head_login_info($rootScope.member_pk).then(function(data) {
                        $rootScope.login_success = data;
                        $rootScope.login_check_next();

                        var total_coin = $rootScope.member_freecoin + $rootScope.member_paycoin;
                        if(total_coin < $rootScope.search_item.itemPrice ){
                            alert("모집요청 확장은 "+String($rootScope.search_item.itemPrice)+"개의 코인이 필요합니다\n\n" +
                            "현재 보유코인 : "+ String(total_coin) +"\n" +
                            "필요한 코인량 : "+String($rootScope.search_item.itemPrice - total_coin)+"\n코인인이 필요한 경우 충전후 이용해 주시길 바랍니다");
                            return;
                        }else{


                            // 마지막 결제 신호 보내기전 free 코인과 pay 코인에 감소치를 계산 한다.
                            var free_coin = 0;
                            var pay_coin = 0;

                            if($rootScope.member_freecoin - $rootScope.search_item.itemPrice < 0 ){
                                free_coin = $rootScope.member_freecoin;
                                pay_coin = $rootScope.search_item.itemPrice - $rootScope.member_freecoin;
                            }else{
                                free_coin = $rootScope.search_item.itemPrice;
                                pay_coin = 0;
                            }
                            executeResults.item_pay_update(
                                $rootScope.search_item.itemPK,
                                $rootScope.search_item.itemPrice,
                                $rootScope.search_item.addValue,
                                $rootScope.member_pk,free_coin,pay_coin ).then(function(data) {

                                    // 결제가 끝나면 회원 정보를 다시 업데이트 한다.
                                    executeResults.head_login_info($rootScope.member_pk).then(function(data) {
                                        $rootScope.login_success = data;
                                        $rootScope.login_check_next();
                                    });

                            });
                        }

                    });


                };


            }


        };


//////////////////////////////////////////////////////////////////////////////////////////////////////////





//////////////////////////////////////// 키워드 MAX 아이템 사기 //////////////////////////////////////////////


        $scope.tag_max_pay = function(){
            var total_coin = $rootScope.member_freecoin + $rootScope.member_paycoin;
            if(total_coin < $rootScope.search_tag_item.itemPrice ){
                alert("키워드 확장은 "+String($rootScope.search_tag_item.itemPrice)+"개의 코인이 필요합니다\n\n" +
                "현재 보유코인 : "+ String(total_coin) +"\n" +
                "필요한 코인량 : "+String($rootScope.search_tag_item.itemPrice - total_coin)+"\n코인인이 필요한 경우 충전후 이용해 주시길 바랍니다");
                return;
            }else{

                // 결제 진행

                if(confirm("확인을 누르시면 모집요쳥 확장 아이템이 결제됩니다\n\n" +
                    "현재 보유코인    : "+ String(total_coin) +"\n" +
                    "결제후 보유코인 : "+String( total_coin-$rootScope.search_tag_item.itemPrice )) ){

                    // 최종 결제전 코인 한번더 체크
                    executeResults.head_login_info($rootScope.member_pk).then(function(data) {
                        $rootScope.login_success = data;
                        $rootScope.login_check_next();

                        var total_coin = $rootScope.member_freecoin + $rootScope.member_paycoin;
                        if(total_coin < $rootScope.search_tag_item.itemPrice ){
                            alert("키워드 확장은 "+String($rootScope.search_tag_item.itemPrice)+"개의 코인이 필요합니다\n\n" +
                            "현재 보유코인 : "+ String(total_coin) +"\n" +
                            "필요한 코인량 : "+String($rootScope.search_tag_item.itemPrice - total_coin)+"\n코인인이 필요한 경우 충전후 이용해 주시길 바랍니다");
                            return;
                        }else{


                            // 마지막 결제 신호 보내기전 free 코인과 pay 코인에 감소치를 계산 한다.
                            var free_coin = 0;
                            var pay_coin = 0;

                            if($rootScope.member_freecoin - $rootScope.search_tag_item.itemPrice < 0 ){
                                free_coin = $rootScope.member_freecoin;
                                pay_coin = $rootScope.search_tag_item.itemPrice - $rootScope.member_freecoin;
                            }else{
                                free_coin = $rootScope.search_tag_item.itemPrice;
                                pay_coin = 0;
                            }
                            executeResults.item_pay_update(
                                $rootScope.search_tag_item.itemPK,
                                $rootScope.search_tag_item.itemPrice,
                                $rootScope.search_tag_item.addValue,
                                $rootScope.member_pk,free_coin,pay_coin ).then(function(data) {

                                    // 결제가 끝나면 회원 정보를 다시 업데이트 한다.
                                    executeResults.head_login_info($rootScope.member_pk).then(function(data) {
                                        $rootScope.login_success = data;
                                        $rootScope.login_check_next();
                                    });

                                });
                        }

                    });


                };


            }

        };





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////







    });





var modal_close = function(){
    $("#modal_close").trigger('click');
};



var xmlHttp;
function srvTime(){

    try {
        //Firefox, opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    }
    catch (err1) {
        //Internet Explorer
        try {
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTP');
            }
            catch (err3) {
                //AJAX not supported, use CPU time.
                alert("AJAX not supported");
            }
        }
    }
    xmlHttp.open('HEAD',window.location.href.toString(),false);
    xmlHttp.setRequestHeader("Content-Type", "text/html");
    xmlHttp.send('');
    return xmlHttp.getResponseHeader("date");

}
