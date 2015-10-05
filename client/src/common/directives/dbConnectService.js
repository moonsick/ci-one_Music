angular.module('eventApp')
  .factory('executeResults', function ($http, $q, $upload) {
    var executeResults = {};





// 공고글 list 가져오기 recruit_list
        executeResults.recruit_list = function (limit1,limit2,search) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/recruit_list',
                    data: {limit1 : limit1, limit2 : limit2, search : search}
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };



// 장기 단기 버튼을 가져온다.
        executeResults.category1_list= function () {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/category1_list',
                    data: {}
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };

// 세션,총괄,보컬 등등 버튼을 가져온다.
        executeResults.category2_list= function () {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/category2_list',
                    data: {}
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };

        /// 아이디와 비밀번호 검색  login_check
        executeResults.login_check= function (id,pw) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/login_check',
                    data: { id: id, pw : pw }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };





// 헤더에 페이지마다 로그인 된 정보를 가져온다  닉네임 , 코인 등등 head_login_info
        executeResults.head_login_info= function (member_pk) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/head_login_info',
                    data: { member_pk: member_pk }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };




        // 저는요글 list 가져오기 musician_list


// 저는요글 list 가져오기 musician_list
        executeResults.musician_list = function (limit1,limit2,search) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/musician_list',
                    data: {limit1 : limit1, limit2 : limit2, search : search}
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };





// 찾아요 기본 정보를 뽑아 온다. 금액,마감일 등등  recruit_info
        executeResults.recruit_info = function (recruit_pk) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/recruit_info',
                    data: { recruit_pk : recruit_pk }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };

// 찾아요 리플레이를 뽑는다 . 리플 + 리플에 리플까지 뽑아 온다 recruit_reply
        executeResults.recruit_reply = function (recruit_pk) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/recruit_reply',
                    data: { recruit_pk : recruit_pk }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };

// 찾아요 리플에 리플 등록  recruit_re_reply_insert
        executeResults.recruit_re_reply_insert = function (recruit_pk,reply_pk,member_pk,text) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/recruit_re_reply_insert',
                    data: { recruit_pk:recruit_pk, reply_pk : reply_pk, member_pk:member_pk,text : text }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

// 찾아요 리플 등록  recruit_reply_insert
        executeResults.recruit_reply_insert = function (recruit_pk,member_pk,text) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/recruit_reply_insert',
                    data: { recruit_pk:recruit_pk, member_pk:member_pk,text : text }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };


// 최근 지원한 list를 뿌려 준다. apply_select_list
        executeResults.apply_select_list = function (member_pk) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/apply_select_list',
                    data: { member_pk:member_pk }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };


// 지원서 등록 하기  apply_insert
        executeResults.apply_insert = function (member_pk,recruit_pk,title,content,price) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/apply_insert',
                    data: { member_pk:member_pk,recruit_pk:recruit_pk,title:title,content:content,price:price }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };



// 전체 지역을 뽑아 온다. location_list
        executeResults.location_list = function () {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/location_list',
                    data: {  }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

// 아이템 관련 기본 쎄팅을 전부 가져 온다.   item_base_list
        executeResults.item_base_list = function () {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/item_base_list',
                    data: {  }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };



// 찾아요 등록하기 recruit_insert
        executeResults.recruit_insert = function ( title, cate1, cate2, price, end_time, location, content, tag_list, tag_count, free_coin, pay_coin, member_pk ,pm_stats ) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/recruit_insert',
                    data: { title : title, cate1 : cate1, cate2 : cate2 , price : price , end_time : end_time ,
                             location : location , content : content , tag_list : tag_list , tag_count : tag_count ,
                             free_coin : free_coin , pay_coin : pay_coin , member_pk : member_pk ,pm_stats : pm_stats }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };


//지원을 이미 했는지 apply_check 대해 한번 체크를 한다 apply_check
        executeResults.apply_check = function ( member_pk, recruit_pk ) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/apply_check',
                    data: { member_pk : member_pk, recruit_pk:  recruit_pk }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };




// 아이템을 살때 쓴다. item_pay_update
        executeResults.item_pay_update = function ( item_pk, item_price, item_add, member_pk, free_coin, pay_coin ) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/item_pay_update',
                    data: { item_pk : item_pk, item_price:  item_price, item_add : item_add,
                             member_pk:  member_pk, free_coin : free_coin, pay_coin : pay_coin }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };



// 저는요의 detail 정보를 가져온다.이름, 닉네임 , 사진 등등 musician_info
        executeResults.musician_info = function ( member_pk ) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/musician_info',
                    data: { member_pk:  member_pk }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };





        // 뮤지션 활동에 관한 정보 musician_fixapply
        executeResults.musician_fixapply = function ( member_pk ) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/musician_fixapply',
                    data: { member_pk:  member_pk }
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };















        return executeResults;
  });
