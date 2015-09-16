'use strict';

var path = require('path');
var connect = require('../controllers/dbconnect_v1.01.js');
var query = require('../controllers/query.js');
var c = connect.connection();

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function (req, res) {
    var stripped = req.url.split('.')[0];
    var requestedView = path.join('./', stripped);
    res.render(requestedView, function (err, html) {
        if (err) {
            console.log("Error rendering partial '" + requestedView + "'\n", err);
            res.status(404);
            res.send(404);
        } else {
            res.send(html);
        }
    });
};

/**
 * Send our single page app
 */
exports.index = function (req, res) {
    res.render('index');
};

/*function checkFunc() {
 var sending = [];
 //    console.log('this is get list')
 c.query('SELECT * FROM d_thr_action_send where isnull(is_send)', null).on('result', function (res) {
 res.on('row', function (row) {
 sending.push(row);
 });
 }).on('end', function () {

 var obj = {sending: sending};
 if(obj.sending[0]!=null){
 console.log(obj.sending[0]);
 updateFunc();

 }else{
 console.log('null');
 }
 });

 };*/
exports.json1 = function (req, res) {
    var sending = [];
    c.query('SELECT * FROM d_threshold_status where isnull(is_delete)', null).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        var obj = {sending: sending};
        if (obj.sending[0] != null) {
        } else {

        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(sending));
    });
};
/*
exports.json2 = function (req, res) {
    var sending = [];
//    console.log('this is get list')
    c.query('SELECT * FROM d_threshold_status where isnull(is_delete)', null).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {

        var obj = {sending: sending};
        if (obj.sending[0] != null) {
        } else {

        }
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.write(JSON.stringify(sending));
        res.end();
    });
};

*/

