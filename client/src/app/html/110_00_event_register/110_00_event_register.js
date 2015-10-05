'use strict';

angular.module('eventApp')
    .controller('event_register', function ($scope,executeResults ,$http, $route, $rootScope, $location ,$routeParams) {

        /*executeResults.new_event_list().then(function(data) {
            $scope.item1 = data;
        });*/



        $(function(){
            $("#after_insert_go").ajaxForm({
                beforeSubmit : function(data,form,option){
                    return true;
                },
                success : function(data){
                    console.log(data);
                    data1 = data;
                    $("#asa").append("<video src='/video/"+data+"' controls style='height: 400px; width: 600px;'></video>");
                    setTimeout("csc();",1000);

                    $("#after_insert_go2").empty();
                    $("#after_insert_go2").append("동영상 업로드가 완료되었습니다!");
                    /*alert("22")*/

                },
                error : function(){

                }
            });
        });

        $scope.aa = function(){
          $("#after_insert_go2").append("동영상이 업로드 중입니다");
        };


    });


var csc = function(){
    $("#asa").append("<video src='/video/"+data1+"' controls style='height: 400px; width: 600px;'></video>");
}