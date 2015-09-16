'use strict';

/**
 * Created by wealab04 on 2014-05-23.
 */
var mariasql = require('mariasql');

exports.connection = function () {
  //db연결정보 지정
  /*var host = '192.168.3.2';*/
  //var host = '192.168.3.2';
  var host = '183.102.159.138';
  var user = 'anstlrdlekd';
  var password = 'zxc881123';
//  var db = 'threshold_check_system_finalf2-4.5';
  var db = 'musitor_v0.01';
//    var db = 'threshold_check_system_finalf4-1';


//connection setting
  var c = new mariasql();
  c.connect({
    host: host,
    user: user,
    password: password,
    db: db,
    multiStatements: true
  });


  return c;
};


