angular.module('eventApp')
    .controller('header', function ($scope,executeResults ,$http, $route, $rootScope, $location ,$routeParams) {
        $(function() {
            $("#menu-btn").click(function() {
                $("#toggle_black").append("<div class='modal-backdrop fade in' style='height: 100%; z-index:900;' onclick='menu_out();'></div>")
                $("#menu-wrap").animate({
                    "left" : "0px"
                });
            });
            $(".close-btn").click(function() {
                $("#menu-wrap").animate({
                    "left" : "-310px"
                });
                $("#toggle_black").empty();
            });
        });
        var menu_click =function(){
            $("#toggle_black").append("<div class='modal-backdrop fade in' style='height: 100%; z-index:900;' onclick='menu_out();'></div>")
        };


    });


var menu_out =function(){
    $("#menu-wrap").animate({
        "left" : "-310px"
    });
    $("#toggle_black").empty();
}