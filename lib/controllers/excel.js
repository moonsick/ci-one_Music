var connect = require('../controllers/dbconnect_v1.01.js');
var query = require('../controllers/query.js');
var c = connect.connection();
var nodeExcel = require('excel-export');
var execute = require('./execute');

exports.Excel = function (req, res) {
    var sending = [];
    var path = req.path;
    console.log(path);
    var url = req.url;
    console.log(path);


    var cols;
    var code = req.params.code;
    var title = code + ".xlsx";
    var is_cmt=false;
    if (code == 'log') {
        index = query.getLogList;
        cols = cols_log;
    } else if (code == 'happen') {
        index = query.getOccurList;
        cols = cols_happen;
    } else if (code == "process") {
        index = query.getProcessList;
        cols = cols_process;
    } else if (code == "Standard") {
        index = query.getStandardReg;
        cols = cols_standard;
    } else if (code == "action") {
        index = query.getActionRegList;
        cols = cols_action;
    } else if (code == "user") {
        index = query.getCompMem;
        cols = cols_user;
    }else if (code == "receiver") {
        index = query.excel_receiver;
        cols = cols_receiver;
    }else if (code=="commnetl"){
        index= query.excel_commentl;
        cols = cols_commentl;
        is_cmt=true;

    }

    console.log(index);
    /*var aa=query.*/
    c.query(index, true).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);

        });
    }).on('end', function () {
        if(is_cmt){

            for(var i=0;i<sending.length;i++){
                console.log(sending[i][3]);
            }
        }
        var conf = {};
        conf.stylesXmlFile = "styles.xlsx";
        conf.cols = cols;
        conf.rows = sending;
        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + title);
        res.end(result, 'binary');
    });
};
var cols_commentl = [
    { caption: '측정항목', type: 'string', width: 28.7109375},
    { caption: '품질등급', type: 'string'},
    { caption: '액션명', type: 'string'},
    { caption: '코멘트내용', type: 'string'}
];
var cols_receiver = [
    { caption: '관리항목', type: 'string', width: 28.7109375},
    { caption: '품질등급', type: 'string'},
    { caption: '액션명', type: 'string'},
    { caption: '기관명', type: 'string'},
    { caption: '사용자', type: 'string'}

];
var cols_log = [
    { caption: '발생일', type: 'string', width: 28.7109375},
    { caption: '이용기관', type: 'string'},
    { caption: '시스템명', type: 'string'},
    { caption: '타겟A', type: 'string'},
    { caption: '타겟B', type: 'string'},
    { caption: '측정항목', type: 'string'},
    { caption: '값', type: 'string'}

];
var cols_happen = [
    { caption: '발생일', type: 'string', width: 28.7109375},
    { caption: '이용기관', type: 'string'},
    { caption: '시스템명', type: 'string'},
    { caption: '타겟A', type: 'string'},
    { caption: '타겟B', type: 'string'},
    { caption: '측정항목', type: 'string'},
    { caption: '값', type: 'string'}
];

var cols_process = [
    { caption: '발생일시', type: 'string', width: 28.7109375},
    { caption: '이용기관', type: 'string'},
    { caption: '시스템명', type: 'string'},
    { caption: '기준항목', type: 'string'},
    { caption: '품질등급', type: 'string'},
    { caption: '액션', type: 'string'},
    { caption: '타겟A', type: 'string'},
    { caption: '타겟B', type: 'string'},
    { caption: '발생ID', type: 'string'}
];
var cols_standard = [
    { caption: '품질등록코드', type: 'string', width: 28.7109375},
    { caption: '측정항목', type: 'string'},
    { caption: '품질등급', type: 'string'},
    { caption: '관리항목코드', type: 'string'},
    { caption: '품질등급코드', type: 'string'},
    { caption: '기준항목', type: 'string'},
    { caption: '기준값1', type: 'string'},
    { caption: '기준값2', type: 'string'},
    { caption: '기준값3', type: 'string'}
];
var cols_action = [
    { caption: '품질코드', type: 'string', width: 28.7109375},
    { caption: '액션코드', type: 'string'},
    { caption: '관리항목코드', type: 'string'},
    { caption: '항목', type: 'string'},
    { caption: '등급', type: 'string'},
    { caption: '액션', type: 'string'}
];
var cols_user = [
    { caption: '기관명', type: 'string', width: 28.7109375},
    { caption: '기관코드', type: 'string'},
    { caption: '사용자 ID', type: 'string'},
    { caption: '이름', type: 'string'},
    { caption: '부서', type: 'string'},
    { caption: '직책코드', type: 'string'},
    { caption: '핸드폰', type: 'string'},
    { caption: '이메일', type: 'string'}
];
