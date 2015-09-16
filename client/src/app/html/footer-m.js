'use strict';

angular.module('eventApp')
    .controller('footer', function ($scope,executeResults ,$http, $route, $rootScope, $location ,$routeParams) {
$scope.aaa = [];

        var total_count = 0;


        $scope.add = function(){

          for(var i = total_count*30; i<((total_count+1)*30);i++){
              var randId = "";
              for( var head_i = 0 ; head_i < 7 ; head_i++) {
                  var rand = Math.floor(Math.random()*(9-0+1))+0;  //0~9까지 난수 발생
                  randId= String(randId)+String(rand);
              }

              $scope.aaa[i] = {aa : randId};
          };
            total_count++;
        };
    });