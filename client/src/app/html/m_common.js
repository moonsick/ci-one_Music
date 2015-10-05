angular.module('eventApp')
    .controller('common_Ctr', function ($scope,executeResults ,$http, $route, $rootScope, $location ,$routeParams) {
        /*sessionStorage.setItem('member_pk',null);*/


        $(".modal-backdrop.fade.in").remove();


        $rootScope.login_on = false;     // 로그인/로그아웃 체크 변수, 기본은 로그아웃
        $rootScope.coin_pay_space = false;   // 코인 결제하기 지정 false일때는 안보인다.
        // 로그 아웃일때
        if(sessionStorage.getItem('member_pk') == null || sessionStorage.getItem('member_pk') == 'null' ){
            $rootScope.login_on = false;    // 로그인되는 <div>를 출력
        }else{ // 로그인일때
            $rootScope.login_on = true;  // 로그아웃되는 <div>를 출력
            $rootScope.member_pk =sessionStorage.getItem('member_pk');

            // 헤더에 페이지마다 로그인 된 정보를 가져온다  닉네임 , 코인 등등 head_login_info
            executeResults.head_login_info($rootScope.member_pk).then(function(data) {
                $rootScope.login_success =data;
                $rootScope.login_check_next();
            });

        }


        $rootScope.log_out = function(){
            $rootScope.login_on = false;    // 로그인되는 <div>를 출력
            sessionStorage.setItem('member_pk',null);

        };


        // 아이템 관련 기본 쎄팅을 전부 가져 온다.   item_base_list
        executeResults.item_base_list().then(function (data) {
            $rootScope.item_base_list = data;

            // 메니저 요청
            for (var i = 0; i < $rootScope.item_base_list.length; i++) {
                $rootScope.item_base_list[i].itemPrice = parseInt($rootScope.item_base_list[i].itemPrice);
                if ($rootScope.item_base_list[i].itemPK == '0005') {
                    $rootScope.manager_pay_coin = parseInt($rootScope.item_base_list[i].itemPrice);
                }

                // 모집 공고 max 뚫기
                if($rootScope.item_base_list[i].itemPK == '0002'){
                    $rootScope.search_item = $rootScope.item_base_list[i];
                }

                // 모집 공고 키워드 max 뚫기
                if($rootScope.item_base_list[i].itemPK == '0001'){
                    $rootScope.search_tag_item = $rootScope.item_base_list[i];
                }


            }
            });





        $rootScope.login_id_text = ""; // 아이디를 저장시키는 변수
        $rootScope.login_pw_text = ""; // 비밀번호를 저장시키는 변수




        $rootScope.login_go = function ($event) {
            if((window.event ? $event.keyCode : $event.which) == 13){    // 만약 input창에 엔터가 들어올때 구분 조건문
                $rootScope.login_go2();                                     // 검색하는 함수 발동
            };
        };

        $rootScope.login_go2 = function () {

            if($("#id_text").val() == ""){
                alert("아이디를 입력해 주세요");
                $("#id_text").focus();
                return;
            };

            if($("#pw_text").val() == ""){
                alert("비밀번호를 입력해 주세요");
                $("#pw_text").focus();
                return;
            };


            /// 아이디와 비밀번호 검색  login_check
            executeResults.login_check($("#id_text").val(),$("#pw_text").val()).then(function(data) {
                $rootScope.login_success = data;


                if($rootScope.login_success[0].notdata =='none'){
                    alert("아이디 또는 비밀번호가 틀렸습니다");
                }else{
                    sessionStorage.setItem('member_pk',$rootScope.login_success[0].memberPK);
                    executeResults.head_login_info($rootScope.login_success[0].memberPK).then(function(data) {
                        $rootScope.login_success =data;
                        $rootScope.login_check_next();
                    });
                    $("#id_text").val("");   // 아이디 input 초기화
                    $("#pw_text").val("");   // 비밀번호 input 초기화
                };
            });
        };




        $rootScope.login_check_next = function(){    // 로그인이 성공하면 헤더에 정보를 뿌린다.
            $rootScope.login_on = true;
            $rootScope.member_pk = $rootScope.login_success[0].memberPK;
            $rootScope.member_nickname = $rootScope.login_success[0].memberNickname;
            if($rootScope.login_success[0].memberFreeCoin == null){
                $rootScope.login_success[0].memberFreeCoin = 0;
            }
            if($rootScope.login_success[0].memberPayCoin == null){
                $rootScope.login_success[0].memberPayCoin = 0;
            }

            $rootScope.member_freecoin = parseInt($rootScope.login_success[0].memberFreeCoin);
            $rootScope.member_paycoin = parseInt($rootScope.login_success[0].memberPayCoin);
        };



        // 아코디언을 실행시 url에 #이 붙는 현상 막기
        $rootScope.acodian_click = function(e){
            e.preventDefault();
        };





//////////////////////////////////코인 충전//////////////////////////////////////////////////////////////////////////

        // 코인 충전 on / off 하기
        $rootScope.coin_pay = function(val){
            $rootScope.coin_pay_space = val;
            if(val == true){
                var st = srvTime();
                var now = new Date(st);
                var nowTime = "";
                nowTime =  String(now.getFullYear()) + String(now.getMonth()+1) + String(now.getDate()) + String(now.getHours()) +  String(now.getMinutes()) +  String(now.getSeconds());
                var randId ="";
                for( var head_i = 0 ; head_i < 3 ; head_i++) {
                    //Math.random()은 0.0000...~ 0.9999..까지 중의 실수를 반환한다. (1을 생성하지 않는다)
                    //Math.floor()함수로 소수점 이하는 버린다.
                    //Math.floor(Math.random()*(최대값-최소값+1))+최소값
                    var rand = Math.floor(Math.random()*(9-0+1))+0;  //0~9까지 난수 발생
                    randId= String(randId)+String(rand);
                }

                $rootScope.pay_id = $rootScope.login_success[0].memberPK+"_"+nowTime+"_"+randId;

                IMP.init('imp33630671'); //'iamport' 대신 부여받은 "가맹점 식별코드"를 사용.
            }
        }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    });

