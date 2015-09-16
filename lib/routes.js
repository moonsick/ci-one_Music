'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    execute = require('./controllers/execute')
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var xlsx = require('node-xlsx');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/**
 * Application routes
 */
module.exports = function (app) {

    app.use(bodyParser());
    app.use(multipart());
    app.use(methodOverride());







// 공고글 list 가져오기 recruit_list
app.route('/recruit_list').post(execute.recruit_list);
// 공고글 태그 list  recruit_tag
app.route('/recruit_tag').post(execute.recruit_tag);

    app.post('/after_insert_go',multipartMiddleware,execute.after_insert_go);















//강의 질문 등록
    app.route('/insert_qna')
        .post(execute.insert_qna);

//강의 질문 list
    app.route('/list_qna')
        .post(execute.list_qna);

//강의 질문 detail
    app.route('/detail_qna')
        .post(execute.detail_qna);

//강의 자료 list
    app.route('/lectureList')
        .post(execute.lectureList);

//강의 자료 detail
    app.route('/detail_lecture')
        .post(execute.detail_lecture);

//주변 정보 list
    app.route('/turisme')
        .post(execute.turisme);

//인사말 그림 출력
    app.route('/information')
        .post(execute.information);

// top 움직이는 공지사항notice_D
    app.route('/notice_D')
        .post(execute.notice_D);








    app.route('/json1').get(index.json1);
    //app.route('/json2').get(index.json2);


    app.route('/test')
        .post(execute.updatefortest);

    //이용기관 관련
    app.route('/getUseComp')
        .post(execute.getUseComp);
    //이용기관 관련 - 선택한 기관별 타겟 명 추출
    app.route('/getOrgTarget')
        .post(execute.getOrgTarget);

    app.route('/insertOrgReg')
        .post(execute.insertOrgReg);

    app.route('/insertUseComp')
        .post(execute.insertUseComp);

    app.route('/updateUseComp')
        .post(execute.updateUseComp);

    //수신자 업데이트

    app.route('/deleteUseComp')
        .post(execute.deleteUseComp);

    //소스등록 관련
    app.route('/getSource')
        .post(execute.getSource);

    app.route('/insertSource')
        .post(execute.insertSource);

    app.route('/deleteSource')
        .post(execute.deleteSource);

    //타겟등록 관련
    app.route('/getTarget')
        .post(execute.getTarget);

    app.route('/insertTarget')
        .post(execute.insertTarget);

    app.route('/updateTarget')
        .post(execute.updateTarget);

    app.route('/deleteTarget')
        .post(execute.deleteTarget);

    //담당등록 관련
    app.route('/getCompMem')
        .post(execute.getCompMem);
    app.route('/getDept')
        .post(execute.getDept);
    app.route('/getPosList')
        .post(execute.getPosList);
    app.route('/insertDept')
        .post(execute.insertDept);
    app.route('/insertRole')
        .post(execute.insertRole);
    app.route('/getDepOne')
        .post(execute.getDeptOne);
    app.route('/getRoleOne')
        .post(execute.getRoleOne);
    app.route('/insertCompMem')
        .post(execute.insertCompMem);
    app.route('/updateCompMem')
        .post(execute.updateCompMem);
    app.route('/deleteCompMem')
        .post(execute.deleteCompMem);

    //측정치 누적 현황 리스트
    app.route('/getLogList')
        .post(execute.getLogList);
    app.route('/deleteLog')
        .post(execute.deleteLog);
    //임계치 기준정보관리 - 임계치 수신자등록 - 명단
    app.route('/getReceiverNameList')
        .post(execute.getReceiverNameList);
    //시스템등록 관련
    app.route('/getSysList')
        .post(execute.getSysList);

    app.route('/insertSysReg')
        .post(execute.insertSysReg);
    app.route('/updateSysReg')
        .post(execute.updateSysReg);
    app.route('/deleteSysReg')
        .post(execute.deleteSysReg);

    //수신자 등록
    app.route('/getUserList')
        .post(execute.getUserList);
    //액션코멘트 등록 관련
    app.route('/actList')
        .post(execute.actList);
    app.route('/actedList')
        .post(execute.actedList);
    app.route('/actData')
        .post(execute.actData);
    app.route('/insertAct')
        .post(execute.insertAct);
    app.route('/updateAct')
        .post(execute.updateAct);
    app.route('/deleteAct')
        .post(execute.deleteAct);


    app.post('/uploadFile', execute.insertF);
    //임계치 처리 현황 - 임계치 처리 현황리스트 get
    app.route('/getProcessList')
        .post(execute.getProcessList);
    //임계치 처리 현황 - 발생항목 코멘트 처리 내역 get
    app.route('/getActionList')
        .post(execute.getActionList);

    //임계치 관리항목 등록
    app.route('/insertStanThresReg')
        .post(execute.insertStanThresReg);
    //임계치 관리항목 상제
    app.route('/deleteStanThresReg')
        .post(execute.deleteStanThresReg);

    //임계치 class 삭제
    app.route('/deleteStanQualReg')
        .post(execute.deleteStanQualReg);

    //품질등급기준등록 삭제
    app.route('/selectReceiver')
        .post(execute.selectReceiver);

    //품질등급기준등록 삭제
    app.route('/deleteStanReg')
        .post(execute.deleteStanReg);

    //품질등급기준
    app.route('/updateStanReg')
        .post(execute.updateStanReg);


    //임계치 Addressee 리스트트
    app.route('/getAddresseeList')
        .post(execute.getAddresseeList);
    //임계치 품질등급 등록
    app.route('/insertStanQualReg')
        .post(execute.insertStanQualReg);

    //임계치 기준정보 관리 - 임계치 품질 액션 등록 - 액션 리스트 get
    app.route('/getActionNameList')
        .post(execute.getActionNameList);

    //임계치 기준정보 관리 -임계치 품질 상세 기준 항목 -저장 -insertDetail
    app.route('/insertDetail')
        .post(execute.insertDetail);
    //액션정보 등록
    app.route('/insertAction')
        .post(execute.insertAction);
    //임계치 품질 등록
    app.route('/insertStanReg')
        .post(execute.insertStanReg);

    //임계치 품질 액션등록
    app.route('/updateActReg')
        .post(execute.updateActReg);
    //임계치 품질 액션삭제
    app.route('/deleteActionReg')
        .post(execute.deleteActionReg);
    //임계치 발생 현황
    app.route('/getOccurList')
        .post(execute.getOccurList);
    app.route('/getOccurDetailList')
        .post(execute.getOccurDetailList);
    //임계치 차트 수치
    app.route('/getOccurQltCnt')
        .post(execute.getOccurQltCnt);


    //임계치 기준정보 관리-임계치 품질 등록-임계치 관리항목 리스트
    app.route('/getThresHoldList')
        .post(execute.getThresHoldList);
    //임계치 기준정보 관리-임계치 품질 등록-임계치 품질등급 리스트
    app.route('/getQualList')
        .post(execute.getQualList);

    app.route('/getStandardReg_ACT')
        .post(execute.getStandardReg_ACT);

    //임계치 기준정보 관리-임계치 품질 등록
    app.route('/getStandardReg')
        .post(execute.getStandardReg);
    //임계치 기준정보 관리 임계치 품질 액션 등록
    app.route('/getActionReg')
        .post(execute.getActionReg);
    //임계치 기준정보 관리 임계치 품질 액션 등록,수정,삭제 현황
    app.route('/getActionRegList')
        .post(execute.getActionRegList);
    //임계치 기준정보 관리 임계치 상세 기준 항목
    app.route('/getDetailReg')
        .post(execute.getDetailReg);

    app.route('/insertPosReg')
        .post(execute.insertPosReg);
    app.route('/deletePosReg')
        .post(execute.deletePosReg);


    //이용기관담당 관련
    app.route('/getCompMem')
        .post(execute.getCompMem);

    app.route('/*')
        .get(index.index);

    // Server API Routes
    app.route('/api/awesomeThings')
        .get(api.awesomeThings);

    app.route('/partials/*')
        .get(index.partials);


    //테스트용 값 입력
    app.route('/insertTestPram')
        .post(execute.insertTestPram);

    //테스트용 내부 로직 실행
    app.route('/logicTestPram')
        .post(execute.logicTestPram);



    //장바구니 카트 리스트
    app.route('/getCartList')
        .post(execute.getCartList);













    // All undefined api routes should return a 404
    app.route('/api/*')
        .get(function (req, res) {
            res.send(404);
        });

};
