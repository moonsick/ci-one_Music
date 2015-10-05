
angular.module('eventApp')
    .controller('musicianDetail_Ctr', function ($scope,executeResults ,$http, $route, $rootScope, $location ,$routeParams,$compile) {


        var url = String(window.location).split('?');
        var url = String(url[1]).split('&');
        var list_count = String(url[1]).split('=');
        var member_pk = String(url[0]).split('=');
        sessionStorage.setItem('member_list_count',list_count[1]);

        $scope.portfolio_number = 0;


        // 저는요의 detail 정보를 가져온다.이름, 닉네임 , 사진 등등 musician_info
        executeResults.musician_info(member_pk[1]).then(function(data) {
            $scope.musician_info = data;


            $scope.musician_info[0].memberCareer = $scope.musician_info[0].memberCareer.replace(/\n/gi,"<br>");       // 관리자 코멘드 엔터 <br> 교체

            
            
            var id = angular.element(document.getElementById('video_thumb_nail'));
            var thumbnail = angular.element(document.getElementById('thumbnail_space'));


            // 포트폴리오 썸네일 출력
            if($scope.musician_info[0].server_portfolio !== null){


                for(var i=0; i<$scope.musician_info[0].server_portfolio.length; i++){

                    thumbnail.append($compile("<div class='item' id='thumbnail"+i+"'>" +
                    "<h2>"+$scope.musician_info[0].server_portfolio[i].portfolioTitle+"</h2>" +
                    "<p class='m-wrap' align='center' id='video_space"+i+"'>" +
                    "</p>" +
                    "<div class='movie-info'>" +
                    "<p class='text-right m-i-date'>업로드 일자 : <span><!--2015.08.03-->"+$scope.musician_info[0].server_portfolio[i].changeDate+"</span></p>" +
                    "<p class='m-i-text'><!--유명한 에이핑크의 리멤버 영상입니다. 이쁘게 봐주세요-->"
                    +$scope.musician_info[0].server_portfolio[i].portfolioContents+"</p>" +
                    "</div>" +
                    "<div class='m-button-g' id='copy_button"+i+"'>" +
                    /*"<button class='btn btn-copy' ng-click=\"url_copy("+i+");\">URL 복사</button>" +*/
                    "<div class='fb-like' data-href='#' data-layout='button' data-action='like' data-show-faces='true' data-share='true'></div>" +
                    "</div>" +
                    "</div>")($scope));




                    // 유투브가 있을시 썸네일 뿌리기
                    if($scope.musician_info[0].server_portfolio[i].youtubeURL !== null){
                        id.append($compile("" +
                        "<li class='col-xs-4 no-padding pofol-v'>" +
                        "<a href='#' data-toggle='modal' data-target='#myModal' ng-click='thumbnail_click("+i+")'>" +
                        "<img src='http://img.youtube.com/vi/"+$scope.musician_info[0].server_portfolio[i].youtubeID+"/0.jpg' class='img-responsive'>" +
                        "</a></li>")($scope));

                        // 유투브 비디오 영상 뿌리기
                        /*$("#video_space"+i).append("<iframe class='movie-size' src='"+$scope.musician_info[0].server_portfolio[i].youtubeURL+"' frameborder='0' allowfullscreen id='youtube_"+i+"'></iframe>");*/
                        $("#video_space"+i).append("<div id='youtube_"+i+"'></div>");
                    }else{           // 비디오일때 썸네일 뿌리기 모바일은 고정 이미지로 대체 한다
                        id.append($compile("" +
                        "<li class='col-xs-4 no-padding pofol-v'>" +
                        "<a href='#' data-toggle='modal' data-target='#myModal' ng-click='thumbnail_click("+i+")'>" +
                        "<img src='/src/assets/img/video_thmbnail.JPG' class='img-responsive'>" +
                        "</a></li>")($scope));

                        $("#video_space"+i).append("<video controls class='movie-size' id='video"+i+"'>" +
                        "<source src='/video/"+$scope.musician_info[0].server_portfolio[i].uploadLocation+"'>" +
                        "</video>");
                    }
                }
                youtube_api($scope.musician_info[0].server_portfolio);
            }

        });



        // 뮤지션 활동에 관한 정보 musician_fixapply
        executeResults.musician_fixapply(member_pk[1]).then(function(data) {
            $scope.musician_fixapply = data;

            $scope.avg_point = 0;

            if($scope.musician_fixapply[0].notdata !== 'none'){
                for(var i =0; i<$scope.musician_fixapply.length; i++){

                    // 거래 가격 , 찍기
                    $scope.musician_fixapply[i].fixPrice = $.number($scope.musician_fixapply[i].fixPrice);

                    // 날짜를 년 월 일로 재구성
                    var date = $scope.musician_fixapply[i].fixPriceDate.slice(0,4)+"년 "+$scope.musician_fixapply[i].fixPriceDate.slice(5,7)+"월 "+$scope.musician_fixapply[i].fixPriceDate.slice(8,10)+"일";
                    $scope.musician_fixapply[i].fixPriceDate = date;

                    // 평균값 구하기 포인터를 모두 더한다
                    $scope.avg_point = $scope.avg_point+ parseInt($scope.musician_fixapply[i].afterPointPoint);
                }
                // 모두 더한 포인터를 더한 횟수만큼 나눈다
                $scope.avg_point = ($scope.avg_point/$scope.musician_fixapply.length).toFixed(2);
            }

        });


        // 썸네일 클릭시 active 부여 ( 썸네일 클릭한 동영상을 보여주게 한다 )
        $scope.thumbnail_click = function(val){

            $scope.url_copy_button(val);      // url 버튼 생성

            $scope.portfolio_number = val;
            for(var i=0; i<$scope.musician_info[0].server_portfolio.length; i++){
                if(val == i){
                    $("#thumbnail"+i).addClass('active');
                }else{
                    $("#thumbnail"+i).removeClass('active');
                };

                if(val == 0){
                    if($scope.musician_info[0].server_portfolio.length == 1){
                        $("#prev_button").addClass('hidden');
                        $("#next_button").addClass('hidden');
                    }else{
                        $("#prev_button").addClass('hidden');
                        $("#next_button").removeClass('hidden');
                    }
                };
                if(val !== 0 && val !== $scope.musician_info[0].server_portfolio.length-1){
                    $("#prev_button").removeClass('hidden');
                    $("#next_button").removeClass('hidden');
                };
                if(val == $scope.musician_info[0].server_portfolio.length-1){
                    if($scope.musician_info[0].server_portfolio.length == 1){
                        $("#prev_button").addClass('hidden');
                        $("#next_button").addClass('hidden');
                    }else{
                        $("#prev_button").removeClass('hidden');
                        $("#next_button").addClass('hidden');
                    }
                };
            }



        };







        //
        $scope.url_copy_button = function(val){
            var video_url = "";
            if($scope.musician_info[0].server_portfolio[val].youtubeURL !== null){
                video_url = $scope.musician_info[0].server_portfolio[val].youtubeURL;
            }else{
                video_url = 'http://192.168.11.5:1004/video/'+$scope.musician_info[0].server_portfolio[val].uploadLocation
            }

            $("#button-copy").remove();



            var agent = navigator.userAgent.toLowerCase();

            if (agent.indexOf("chrome") != -1) {
                $("#copy_button"+val).prepend("<button class='btn btn-copy' id='button-copy' data-clipboard-text='"+video_url+"'>URL 복사</button>");

                ZeroClipboard.config({
                    swfPath: '//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.2.0/ZeroClipboard.swf',
                    forceHandCursor: true
                });
                var clipboard = new ZeroClipboard($('#button-copy'));
                clipboard.on('aftercopy', function(event) { alert('클립보드로 복사가 되었습니다'); });


            }else{
                var thumbnail = angular.element(document.getElementById('copy_button'+val));
                thumbnail.append($compile("<button class='btn btn-copy' id='button-copy' ng-click=\"url_copy('"+video_url+"');\">URL 복사</button>")($scope));
                /*$("#copy_button"+val).prepend("<button class='btn btn-copy' id='button-copy'>URL 복사</button>");*/
            }
        }










        // 동영상을 모두 멈추게 한다.
        $scope.video_stop = function(mod){



            for(var i=0; i<$scope.musician_info[0].server_portfolio.length; i++){
                if($scope.musician_info[0].server_portfolio[i].youtubeURL !== null){
                    if($scope.portfolio_number == i){
                        stopVideo($scope.portfolio_number);
                    }
                }else{
                    document.getElementById("video"+i).pause();
                }
            };



            if(mod == 'add'){
                $scope.portfolio_number++;
            };
            if(mod == 'sum'){
                $scope.portfolio_number--;
            };

            $scope.url_copy_button($scope.portfolio_number);      // url 버튼 생성
            
            if($scope.portfolio_number == 0){
                if($scope.musician_info[0].server_portfolio.length == 1){
                    $("#prev_button").addClass('hidden');
                    $("#next_button").addClass('hidden');
                }else{
                    $("#prev_button").addClass('hidden');
                    $("#next_button").removeClass('hidden');
                }
            };
            if($scope.portfolio_number !== 0 && $scope.portfolio_number !== $scope.musician_info[0].server_portfolio.length-1){
                $("#prev_button").removeClass('hidden');
                $("#next_button").removeClass('hidden');
            };
            if($scope.portfolio_number == $scope.musician_info[0].server_portfolio.length-1){
                if($scope.musician_info[0].server_portfolio.length == 1){
                    $("#prev_button").addClass('hidden');
                    $("#next_button").addClass('hidden');
                }else{
                    $("#prev_button").removeClass('hidden');
                    $("#next_button").addClass('hidden');
                }
            };









        };


        // 모달이 hide 됬을때 발동
        $('#myModal').on('hide.bs.modal', function (e) {
            $scope.video_stop();
        });


/*alert(window.location.href);*/
        /*window.location =window.location.href;*/



        // url 복사 기능
        $scope.url_copy = function(val) {


            /*for(var i=0; i<$scope.musician_info[0].server_portfolio.length; i++) {

                $("#copyContentBtn").trigger('click');

                // 유투브가 있을시
                if ($scope.musician_info[0].server_portfolio[i].youtubeURL !== null) {

                }else{    // 서버에 직접 올린 video일시

                }
            }*/


            window.clipboardData.setData("Text", val);
            alert("클립보드로 복사가 되었습니다");

            /*var IE = (document.all) ? true : false;
            alert(IE);
            if (IE) {
                if (confirm("이 글의 트랙백 주소를 클립보드에 복사하시겠습니까?"))
                    window.clipboardData.setData("Text", 'sssssssss');
            } else {
                temp = prompt("이 글의 트랙백 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요", 'ccccccccccc');
            }*/

        };






    });

var youtube_api = function(val){
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    video_info = val;
};


var player = [];
var video_info;
function onYouTubeIframeAPIReady() {
    for(var i = 0; i<video_info.length; i++){
        if(video_info[i].youtubeURL !==null){
            player[i] = new YT.Player('youtube_'+i, {
                videoId: video_info[i].youtubeID
            });

            $("#youtube_"+i).addClass('movie-size');
        }
    }
}


function stopVideo(val) {
    player[val].pauseVideo();
}
