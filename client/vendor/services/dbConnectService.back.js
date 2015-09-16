angular.module('gntelCqmsApp')
  .factory('executeResults', function ($http, $q, $upload) {
    var executeResults = {};

    //이용기관 등록 관련
    executeResults.getUseComp = function () {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getUseComp'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );

      return deferred.promise;
    };

    executeResults.insertUseComp = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/insertUseComp',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };

    executeResults.updateUseComp = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/updateUseComp',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };

    executeResults.deleteUseComp = function (org_code) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/deleteUseComp',
        data: {org_code: org_code}
      }).success(function (data) {
          deferred.resolve(data);

        }
      );
      return deferred.promise;
    };


    //소스 등록 관련
    executeResults.getSource = function () {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getSource'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );

      return deferred.promise;
    };

    executeResults.insertSource = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/insertSource',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };

    executeResults.deleteSource = function (source_code) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/deleteSource',
        data: {source_code: source_code}
      }).success(function (data) {
          deferred.resolve(data);

        }
      );
      return deferred.promise;
    };


    //타겟 등록 관련
    executeResults.getTarget = function () {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getTarget'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );

      return deferred.promise;
    };

    executeResults.insertTarget = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/insertTarget',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };

    executeResults.updateTarget = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/updateTarget',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };

    executeResults.deleteTarget = function (target_code) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/deleteTarget',
        data: {target_code: target_code}
      }).success(function (data) {
          deferred.resolve(data);

        }
      );
      return deferred.promise;
    };

    //담당 등록 관련
    executeResults.getCompMem = function () {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/getCompMem'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };
    executeResults.getDept = function () {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/getDept'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };
    executeResults.insertOrgReg = function (data) {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/insertOrgReg',
          data:data
        }
      ).success(function () {
          deferred.resolve();
        }
      );
      return deferred.promise;
    };
    executeResults.deleteOrgReg = function (data) {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/deleteOrgReg',
          data:{org_code:data}
        }
      ).success(function () {
          deferred.resolve();
        }
      );
      return deferred.promise;
    };

    executeResults.insertPosReg = function (data) {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/insertPosReg',
          data:{pos_name:data}
        }
      ).success(function () {
          deferred.resolve();
        }
      );
      return deferred.promise;
    };
    executeResults.deletePosReg = function (data) {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/deletePosReg',
          data:{pos_code:data}
        }
      ).success(function () {
          deferred.resolve();
        }
      );
      return deferred.promise;
    };
    executeResults.getPosList = function () {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/getPosList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };
    executeResults.insertDept = function (dep_name) {
      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/insertDept',
        data: {dep_name: dep_name}
      }).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };
    executeResults.insertRole = function (role_name) {
      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/insertRole',
        data: {role_name: role_name}
      }).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };

    executeResults.getDepOne = function (dep_name) {
      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/getDepOne',
        data: {dep_name: dep_name}
      }).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };
    executeResults.getRoleOne = function (role_name) {
      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/getRoleOne',
        data: {role_name: role_name}
      }).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };

    executeResults.insertCompMem = function (inputData) {
      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/insertCompMem',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };
    executeResults.updateCompMem = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/updateCompMem',
        data: inputData

      }).success(function (data) {
          deferred.resolve(data);
        }
      );

      return deferred.promise;
    };


    executeResults.deleteCompMem = function (mem_code) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/deleteCompMem',
        data: {mem_code: mem_code}
      }).success(function (data) {
          deferred.resolve(data);

        }
      );
      return deferred.promise;
    };

    //임계치 기준정보관리 - 임계치 수신자 등록 - 명단
    executeResults.getReceiverNameList = function () {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/getReceiverNameList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };
//시스템 등록 관련
    executeResults.getSysList = function () {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getSysList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );

      return deferred.promise;
    };

//시스템 등록 관련 - 선택한 기관별 타겟 보여주기
    executeResults.getOrgTarget = function (inputData) {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getOrgTarget',
          data: inputData
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };



    //임계치 수신자 등록
    executeResults.selectReceiver = function (inputData) {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/selectReceiver',
          data: inputData
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };
    //임계치 수신자 등록

    executeResults.updateReceiver = function () {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/insertReceiver'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };

    // 이용기관 사용 시스템 삭제
    executeResults.deleteSysReg = function (data) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/deleteSysReg',
        data: data
      }).success(function (data) {
          deferred.resolve(data);

        }
      );
      return deferred.promise;
    };
    //시스템 등록 관련 - 신규 등록
    executeResults.insertSysReg = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/insertSysReg',
        data: {system_name:inputData}
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };

    executeResults.insertOrgReg = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/insertOrgReg',
        data: {org_name:inputData}
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };
    executeResults.updateSysReg = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/updateSysReg',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };


    //액션코멘트 등록 관련
    executeResults.actList = function () {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/actList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };
    executeResults.actedList = function () {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/actedList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };
    executeResults.actData = function () {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/actData'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };
    executeResults.updateAct = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/updateAct',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };
    executeResults.insertAct = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/insertAct',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };
    //액션리스트 등록
    executeResults.insertAction = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/insertAction',
        data: {action_name: inputData}
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };

    executeResults.updateAct = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/updateAct',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };

    executeResults.deleteAct = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/deleteAct',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data);

        }
      );
      return deferred.promise;
    };

    executeResults.insertF = function (filess) {
      var deferred = $q.defer();
      var fname = '';
      var $file = filess[0];
      $upload.upload({
        url: '/uploadFile',
        file: $file,
        progress: function (e) {
        }
      }).then(function (data) {
        fname = data.data;
        deferred.resolve(fname);
      }, function (data) {
        alert(data.data);
      });

      ;
      return deferred.promise;
    };

    //채영범 사원원 TEST 프로그래밍
//        executeResults.insertStanRegItem = function (inputData) {
//            var deferred = $q.defer();
//
//            $http({
//                method: 'post',
//                url: '/insertStanRegItem',
//                data: inputData
//            }).success(function (data) {
//                    deferred.resolve(data);
//                }
//            );
//
//            return deferred.promise;
//        };
    executeResults.insertStanReg = function (inputData) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/insertStanReg',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data);
        }
      );

      return deferred.promise;
    };


    //임계치 기준정보관리 - 임계치 관리항목등록 - 등록
    executeResults.insertStanThresReg = function (inputData) {
      var deferred = $q.defer();
//            console.log(inputData);
//            alert(inputData);
      $http({
        method: 'post',
        url: '/insertStanThresReg',
        data: {thrs_item_name: inputData}
      }).success(function (data) {
          deferred.resolve(data);
        }
      );

      return deferred.promise;
    };
    //임계치 기준정보관리 - 임계치 관리항목등록 - 등록
    executeResults.insertStanQualReg = function (inputData) {
      var deferred = $q.defer();
//            console.log(inputData);
//            alert(inputData);
      $http({
        method: 'post',
        url: '/insertStanQualReg',
        data: {qual_item_name: inputData}
      }).success(function (data) {
          deferred.resolve(data);
        }
      );

      return deferred.promise;
    };
    executeResults.getOccurDetailList = function (inputData) {
      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/getOccurDetailList',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data.sending);
        }
      );
      return deferred.promise;
    };

    //임계치 품질 액션 등록
    executeResults.getActionNameList = function () {
      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/getActionNameList'
      }).success(function (data) {
          deferred.resolve(data.sending);

        }
      );
      return deferred.promise;
    };


    //임계치 기준정보 관리 -임계치 품질 상세 기준 항목 -저장 -insertDetail
    executeResults.insertDetail = function (thrs_item_code, qlt_code, detail_name, detail_value) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/insertDetail',
        data: {thrs_item_code: thrs_item_code, qlt_code: qlt_code, detail_name: detail_name, detail_value: detail_value}
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };

    executeResults.updateActReg = function (thrs_item_code, qlt_code, action_code) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/updateActReg',
        data: {thrs_item_code: thrs_item_code, qlt_code: qlt_code, action_code: action_code}
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };


    executeResults.getQltClassList = function () {
      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/getQltClassList'
      }).success(function (data) {
          deferred.resolve(data.sending);


        }
      );
      return deferred.promise;
    };

    executeResults.getOccurList = function () {
      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/getOccurList'
      }).success(function (data) {
          deferred.resolve(data.sending);
          /*   for (var i = 0; i < data.sending.length; i++) {
           console.log("getOccurList 데이터3" + i + " : " + data.sending[i].system_code + data.sending[i].qlt_code + data.sending[i].action_seq);
           }*/

        }
      );
      return deferred.promise;
    };


    executeResults.getOccurQltCnt = function () {
      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/getOccurQltCnt'
      }).success(function (data) {
          deferred.resolve(data.sending);

        }
      );
      return deferred.promise;
    };


    // 임계치 처리현황 - 임계치 처리현황 리스트
    executeResults.getProcessList = function () {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getProcessList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );

      return deferred.promise;
    };

    // 임계치 처리현황 - 발생항목 코멘트 처리내역 리스트 get
    executeResults.getActionList = function (inputData) {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getActionList',
          data: inputData
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );

      return deferred.promise;
    };
    // 임계치 처리현황 - 임계치 처리현황 리스트
    executeResults.getProcessList = function () {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getProcessList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );

      return deferred.promise;
    };
    //임계치 관리 항목 삭제
    executeResults.deleteStanThresReg = function (index) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/deleteStanThresReg',
        data: {thrs_item_code: index}
      }).success(function (data) {
          deferred.resolve(data.sending);

        }
      );
      return deferred.promise;
    };
    //임계치 class 삭제
    executeResults.deleteStanQualReg = function (index) {
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: '/deleteStanQualReg',
        data: {qlt_code: index}
      }).success(function (data) {
          deferred.resolve(data.sending);

        }
      );
      return deferred.promise;
    };


    // 임계치 처리현황 - 임계치 처리현황 리스트
    executeResults.getProcessList = function () {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getProcessList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );

      return deferred.promise;
    };
    //임계치 수신 체크 목록
    executeResults.getAddresseeList = function () {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getAddresseeList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
        }
      );

      return deferred.promise;
    };
    // 임계치 처리현황 - 임계치 처리현황 리스트


    executeResults.getStandardReg_ACT = function () {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/getStandardReg_ACT'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
//                    console.log(data)
        }
      );

      return deferred.promise;
    };


    executeResults.getStandardReg = function () {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/getStandardReg'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
//                    console.log(data)

        }
      );

      return deferred.promise;
    };
    //임계치 기준정보 관리-임계치 품질 등록-임계치 관리항목 리스트
    executeResults.getThresHoldList = function () {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/getThresHoldList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
//                    console.log(data)
        }
      );

      return deferred.promise;
    };
    //임계치 기준정보 관리-임계치 품질 등록-임계치 품질등급 리스트
    executeResults.getQualList = function () {
      var deferred = $q.defer();
      $http({
          method: 'post',
          url: '/getQualList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
//                    console.log(data)
        }
      );
      return deferred.promise;
    };

    //품질등급기준등록 삭제
    executeResults.deleteStanReg = function (inputData) {

      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/deleteStanReg',
        data: inputData

      }).success(function (data) {
          deferred.resolve(data);
        }
      );

      return deferred.promise;
    };
    executeResults.updateStanReg = function (inputData) {

      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/updateStanReg',
        data: inputData

      }).success(function (data) {
          deferred.resolve(data);
        }
      );

      return deferred.promise;
    }

    executeResults.deleteActionReg = function (inputData) {
      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/deleteActionReg',
        data: inputData
      }).success(function (data) {
          deferred.resolve(data);
        }
      );

      return deferred.promise;
    };


    executeResults.getActionReg = function () {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getActionReg'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
//                    console.log("getActionReg")
        }
      );
      return deferred.promise;
    };
    executeResults.getActionRegList = function () {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getActionRegList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending)
//                    console.log("getActionRegList")
        }
      );
      return deferred.promise;
    };
    executeResults.getDetailReg = function () {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getDetailReg'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
//                    console.log("getDetailReg")
        }
      );
      return deferred.promise;
    };


    //수신자 등록
    executeResults.getUserList = function () {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getUserList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
//                    console.log("getDetailReg")
        }
      );
      return deferred.promise;
    };

    //log 삭제
    executeResults.deleteLog = function (inputdata1, inputdata2) {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/deleteLog',
          data: {start_date: inputdata1, end_date: inputdata2}
        }
      ).success(function (data) {
          deferred.resolve(data.sending);

        }
      );
      return deferred.promise;
    };

    //측정치 누적 현황 리스트
    executeResults.getLogList = function () {
      var deferred = $q.defer();

      $http({
          method: 'post',
          url: '/getLogList'
        }
      ).success(function (data) {
          deferred.resolve(data.sending);
//                    console.log("getDetailReg")
        }
      );
      return deferred.promise;
    };


    // 테스트용 쿼리 - 값 입력
    executeResults.insertTestPram = function (company_name, system_name, targetA_name, targetB_name, item_name, item_value) {
      var deferred = $q.defer();
      console.log("DB 서비스 확인" + company_name +
      system_name +
      targetA_name +
      targetB_name +
      item_name +
      item_value);
      $http({
        method: 'post',
        url: '/insertTestPram',
        data: {
          company_name: company_name,
          system_name: system_name,
          targetA_name: targetA_name,
          targetB_name: targetB_name,
          item_name: item_name,
          item_value: item_value
        }
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };


    // 테스트용 쿼리 - 내부 로직 실행
    executeResults.logicTestPram = function (checkQlt, qltdatas) {
      var deferred = $q.defer();
      $http({
        method: 'post',
        url: '/logicTestPram',
        data: {checkQlt: checkQlt, qltdata: qltdatas}
        /*,
         data: {company_name:company_name,system_name:system_name,source_name:source_name,target_name:target_name,item_name:item_name,item_value:item_value}*/
      }).success(function (data) {
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    };


    return executeResults;
  });
