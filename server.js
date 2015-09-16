'use strict';

var connect = require('./lib/controllers/dbconnect_v1.01.js');
var c = connect.connection();
var express = require('express');
/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

process.on('uncaughtException', function (err) {
  console.log(err);
});

var config = require('./lib/config/config');
// Setup Express
var app = express();
require('./lib/config/express')(app);
require('./lib/routes')(app);
var request = require('request');
// Start server



app.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});
/*
 var send;
 send = setInterval(checkFunc,100);
 function updateFunc() {
 c.query("update d_threshold_status set is_send='y',send_time=now() where isnull(is_send) and !isnull(is_changeDone)", null)
 .on('result', function (res) {
 res.on('row', function () {
 });
 })
 .on('end', function () {

 })
 };
 */


/*임계치 관리 시스템에서 데이터 베이스 테이블 확인하는 루틴의 함수*//*
 function checkFunc() {

 var sending = [];
 var send_Data = [];
 var item = {};
 c.query('SELECT * FROM d_threshold_status where isnull(is_send) AND is_changeDone="y"', null).on('result', function (res) {
 res.on('row', function (row) {
 sending.push(row);
 });
 }).on('end', function () {
 //      console.log(sending.length);
 for (var i = 0; i < sending.length; i++) {
 item={};
 item.action_name = sending[i].action_name;
 item.p_tel = sending[i].p_tel;
 item.p_email = sending[i].p_email;
 item.cmt_text = sending[i].cmt_text;
 item.cmt_title = ' ';
 var and_Num = item.cmt_text.search("/and/");
 if (and_Num != -1) {
 item.cmt_title = sending[i].cmt_text;
 item.cmt_title = item.cmt_text.substring(0, and_Num);
 item.cmt_text = item.cmt_text.substring(and_Num + 5, item.cmt_text.length);
 }
 send_Data.push(item);
 }
 *//*서버측 업데이트 펑션*//*
 updateFunc();

 for (var h = 0; h <send_Data.length; h++) {
 var obj ={};
 obj= send_Data[h];
 console.log(obj);
 var options = {
 //uri: 'http://192.168.13.57:8080/nms/resources/requestDebug.jsp',
 uri: 'http://192.168.1.13:9000/post',
 method: 'POST',
 json: obj
 };
 if (send_Data[0] != null) {
 request(options, function (error, response, body) {

 if (!error && response.statusCode == 200) {

 }
 });
 } else {
 return;
 }
 }
 });
 };*/



// Expose app
var exports = module.exports = app;



