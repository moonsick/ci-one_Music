angular.module('eventApp')
    .controller('header', function ($scope,executeResults ,$http, $route, $rootScope, $location ,$routeParams) {

        // 메뉴 에니메이션

        $rootScope.menu_click = function(){
            $("#toggle_black").append("<div class='modal-backdrop fade in' style='height: 100%; z-index:900;' onclick='menu_out();'></div>")
            $("#body").addClass('mobile_scroll_hidden');
            $("#menu-wrap").animate({
                "left" : "0px"
            });
        };

        $rootScope.menu_close = function(){
            $("#menu-wrap").animate({
                "left" : "-310px"
            });
            $("#toggle_black").empty();
        };



        $scope.my_menu_go = function(){
            if($rootScope.login_on == false){
                alert("로그인 후 입장이 가능합니다");
                return;
            }else{
                $location.path('/m_my_menu').search();    // SPA의 깜빡임 없이 페이지 이동 하는 방법
            }
        };






        /////////// 결제 ///////////////////////
        $scope.coin_item1 = {
            item_name : 'coin_1',
            item_cost : 1000,
            item_cost2 : '1,000',
            item_add : 1
        };
        $scope.coin_item2 = {
            item_name : 'coin_5',
            item_cost : 4500,
            item_cost2 : '4,500',
            item_add : 5
        };
        $scope.coin_item3 = {
            item_name : 'coin_10',
            item_cost : 9000,
            item_cost2 : '9,000',
            item_add : 10
        };
        $scope.coin_item4 = {
            item_name : 'coin_20',
            item_cost : 18000,
            item_cost2 : '18,000',
            item_add : 20
        };
        $scope.coin_pay_amount = $scope.coin_item1;   // 결제 coin 형식 결정
        $scope.pay_mod = 'card';       // 결제 모드 결정





        $scope.pay_go= function() {

            IMP.request_pay({
                pay_method: $scope.pay_mod, // 'card' : 신용카드 | 'trans' : 실시간계좌이체 | 'vbank' : 가상계좌 | 'phone' : 휴대폰소액결제
                merchant_uid: $rootScope.pay_id,     // ci_one에서 만든 결제 주문번호  id_pk +
                name: $scope.coin_pay_amount.item_name,
                amount: $scope.coin_pay_amount.item_cost,
                buyer_email: $rootScope.login_success[0].memberEmail,
                buyer_name: $rootScope.login_success[0].memberName,
                buyer_tel: $rootScope.login_success[0].memberPhone,
                buyer_addr: "",      // 사는사람 주소
                buyer_postcode: ""   // 우편주소
                /*vbank_due : '20150806'*/
            }, function (rsp) {
                if (rsp.success) {


                } else {
                    var msg = "";
                    msg += '에러내용 : ' + rsp.error_msg;
                    alert("결제가 취소되었습니다 다시 시도해 주세요\n에러내용 : ' +" + rsp.error_msg);
                }
            });
        };








    });



var menu_out =function(){
    $("#body").removeClass('mobile_scroll_hidden');
    $("#menu-wrap").animate({
        "left" : "-310px"
    });
    $("#toggle_black").empty();
};

