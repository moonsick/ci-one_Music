angular.module('eventApp')
  .factory('executeResults', function ($http, $q, $upload) {
    var executeResults = {};





// 공고글 list 가져오기 recruit_list
        executeResults.recruit_list = function () {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/recruit_list',
                    data: {}
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };


// 공고글 태그 list  recruit_tag
        executeResults.recruit_tag = function () {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/recruit_tag',
                    data: {}
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };



    return executeResults;
  });
