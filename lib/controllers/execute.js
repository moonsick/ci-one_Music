/**
 * Created by SimJeongmee on 2014-08-07.
 */

'use strict';

var connect = require('../controllers/dbconnect_v1.01.js');
var query = require('../controllers/query.js');
var fs = require('fs'),
    path = require('path'),
    mime = require('mime');
var c = connect.connection();

//연결로그 출력
c.on('connect', function () {
    console.log('Client connected');
}).on('error', function (err) {
    console.log('Client error: ' + err);
}).on('close', function (hadError) {
    console.log('Client closed');
});


/*exports.login = function (req, res) {
    var sending = [];
    var id = req.body.id;
    var pass = req.body.pass;

    c.query(query.login, [id,pass])
        .on('result', function (res) {
            res.on('row', function (row) {
                console.log(row);
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            console.log(aaa);
            sending.push(aaa)
                res.send(200, obj);
        });
};*/


// 공고글 list 가져오기 recruit_list
exports.recruit_list = function (req, res) {
    var sending = [];
    var sending2 = [];
    var limit1 = req.body.limit1;
    var limit2 = req.body.limit2;
    var search = req.body.search;

    c.query(query.recruit_list, [limit1,limit2,search])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {

            if (sending[0] == null) {
                var obj = {sending: sending};
                var aaa={notdata:'none'};
                sending.push(aaa);
                res.send(200, obj);
            }else{
                c.query(query.recruit_tag, [null])
                    .on('result', function (res) {
                        res.on('row', function (row) {
                            sending2.push(row);
                        });
                    })
                    .on('end', function () {

                        for(var i =0; i<sending.length; i++){
                            sending[i].server_tag = [];
                            for(var j = 0; j<sending2.length; j++){
                                if(sending[i].recruitPK == sending2[j].recruitPK){
                                    sending[i].server_tag.push(sending2[j]);
                                }
                            }
                        }
                        var obj = {sending: sending};
                        res.send(200, obj);
                    });
            }
        });
};


// 공고글 태그 list  recruit_tag
exports.recruit_tag = function (req, res) {
    var sending = [];

    c.query(query.recruit_tag, [null])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null) {
                res.send(200, obj);
            }
            else{
                var aaa={notdata:'none'};
                sending.push(aaa)
                res.send(200, obj);
            }
        });
};



// 장기 단기 버튼을 가져온다.
exports.category1_list = function (req, res) {
    var sending = [];

    c.query(query.category1_list, [null])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null) {
                res.send(200, obj);
            }
            else{
                var aaa={notdata:'none'};
                sending.push(aaa)
                res.send(200, obj);
            }
        });
};


// 세션,총괄,보컬 등등 버튼을 가져온다.
exports.category2_list = function (req, res) {
    var sending = [];

    c.query(query.category2_list, [null])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null) {
                res.send(200, obj);
            }
            else{
                var aaa={notdata:'none'};
                sending.push(aaa)
                res.send(200, obj);
            }
        });
};


//////////////////////////////////// 모집글 detail ////////////////////////////////////////////


// 찾아요 기본 정보를 뽑아 온다. 금액,마감일 등등  recruit_info
exports.recruit_info = function (req, res) {
    var sending = [];
    var sending2 = [];
    var recruit_pk = req.body.recruit_pk;


    c.query(query.recruit_info, [recruit_pk,recruit_pk]).on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        }).on('end', function () {
            if (sending[0] == null) {
                var obj = {sending: sending};
                var aaa={notdata:'none'};
                sending.push(aaa)
                res.send(200, obj);
            }else{

                c.query(query.recruit_info_tag, [recruit_pk]).on('result', function (res) {
                    res.on('row', function (row) {
                        sending2.push(row);
                    });
                }).on('end', function () {
                        if (sending2[0] == null) {  // 태그가 없을 경우
                            var obj = {sending: sending};
                            res.send(200, obj);
                        }else{       // 태그가 있을 경우
                            sending[0].server_tag = [];
                            for(var i=0; i<sending2.length;i++){
                                sending[0].server_tag[i] = sending2[i];
                            }

                            var obj = {sending: sending};
                            res.send(200, obj);
                        }
                    });


            }
        });
};



// 찾아요 리플레이를 뽑는다 . 리플 + 리플에 리플까지 뽑아 온다 recruit_reply
exports.recruit_reply = function (req, res) {
    var sending = [];
    var sending2 = [];
    var recruit_pk = req.body.recruit_pk;


    c.query(query.recruit_reply, [recruit_pk,recruit_pk]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        if (sending[0] == null) {
            var obj = {sending: sending};
            var aaa={notdata:'none'};
            sending.push(aaa)
            res.send(200, obj);
        }else{

            c.query(query.recruit_re_reply, [recruit_pk]).on('result', function (res) {
                res.on('row', function (row) {
                    sending2.push(row);
                });
            }).on('end', function () {
                if (sending2[0] == null) {  // 태그가 없을 경우
                    var obj = {sending: sending};
                    res.send(200, obj);
                }else{       // 태그가 있을 경우

                    for(var i=0; i<sending.length;i++){
                        sending[i].re_reply = [];
                        for(var j=0; j<sending2.length;j++){
                            if(sending[i].qnaPK == sending2[j].qnaPK){
                                sending[i].re_reply.push(sending2[j]);
                            }
                        }
                    }


                    var obj = {sending: sending};
                    res.send(200, obj);
                }
            });


        }
    });
};


// 찾아요 리플에 리플 등록  recruit_re_reply_insert
exports.recruit_re_reply_insert = function (req, res) {
    var sending = [];
    var recruit_pk = req.body.recruit_pk;
    var reply_pk = req.body.reply_pk;
    var member_pk = req.body.member_pk;
    var text = req.body.text;



    c.query(query.recruit_re_reply_insert, [recruit_pk,reply_pk,recruit_pk,reply_pk,text,member_pk]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
            var obj = {sending: sending};
            res.send(200, obj);

    });
};

// 찾아요 리플 등록  recruit_reply_insert
exports.recruit_reply_insert = function (req, res) {
    var sending = [];
    var recruit_pk = req.body.recruit_pk;
    var member_pk = req.body.member_pk;
    var text = req.body.text;



    c.query(query.recruit_reply_insert, [recruit_pk,recruit_pk,text,member_pk]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        var obj = {sending: sending};
        res.send(200, obj);

    });
};

// 최근 지원한 list를 뿌려 준다. apply_select_list
exports.apply_select_list = function (req, res) {
    var sending = [];
    var member_pk = req.body.member_pk;


    c.query(query.apply_select_list, [member_pk]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        var obj = {sending: sending};
        if (sending[0] != null) {
            res.send(200, obj);
        }else{
            var aaa={notdata:'none'};
            sending.push(aaa)
            res.send(200, obj);
        }
    });
};



// 지원서 등록 하기  apply_insert
exports.apply_insert = function (req, res) {
    var sending = [];
    var member_pk = req.body.member_pk;
    var recruit_pk = req.body.recruit_pk;
    var title = req.body.title;
    var content = req.body.content;
    var price = req.body.price;


    c.query(query.apply_insert, [recruit_pk,recruit_pk,title,content,price,member_pk]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        var obj = {sending: sending};
        if (sending[0] != null) {
            res.send(200, obj);
        }else{
            var aaa={notdata:'none'};
            sending.push(aaa)
            res.send(200, obj);
        }
    });
};




//지원을 이미 했는지 apply_check 대해 한번 체크를 한다 apply_check
exports.apply_check = function (req, res) {
    var sending = [];
    var member_pk = req.body.member_pk;
    var recruit_pk = req.body.recruit_pk;


    c.query(query.apply_check, [member_pk,recruit_pk]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        var obj = {sending: sending};
        if (sending[0] != null) {
            res.send(200, obj);
        }else{
            var aaa={notdata:'none'};
            sending.push(aaa)
            res.send(200, obj);
        }
    });
};













////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////// 모집글 insert ///////////////////////////////////////////////////

// 전체 지역을 뽑아 온다. location_list
exports.location_list = function (req, res) {
    var sending = [];

    c.query(query.location_list, [null]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        var obj = {sending: sending};
        if (sending[0] != null) {
            res.send(200, obj);
        }else{
            var aaa={notdata:'none'};
            sending.push(aaa)
            res.send(200, obj);
        }
    });
};


// 찾아요 등록하기 recruit_insert
exports.recruit_insert = function (req, res) {
    var sending = [];
    var title = req.body.title;
    var cate1 = req.body.cate1;
    var cate2 = req.body.cate2;
    var price = req.body.price;
    var end_time = req.body.end_time;
    var location = req.body.location;
    var content = req.body.content;
    var tag_list = req.body.tag_list;
    var tag_count = req.body.tag_count;
    var free_coin = req.body.free_coin;
    var pay_coin = req.body.pay_coin;
    var member_pk = req.body.member_pk;
    var pm_stats = req.body.pm_stats;
    if(pm_stats == 0){
        pm_stats = null;
    }else{


        c.query(query.member_coin_sum, [ free_coin,pay_coin,member_pk ]).on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        }).on('end', function () {
        });

        c.query(query.member_item_history_update, [ member_pk,'0005',member_pk,'0005', parseInt(free_coin)+parseInt(pay_coin) ]).on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        }).on('end', function () {
        });


    }



    c.query(query.recruit_pk_result, [null]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {


        c.query(query.recruit_insert, [ sending[0].recruitPK, member_pk, title, cate1, cate2, price, end_time, location, content, pm_stats ]).on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        }).on('end', function () {


            c.query(query.recruit_tag_insert1, [ sending[0].recruitPK ]).on('result', function (res) {
                res.on('row', function (row) {
                    sending.push(row);
                });
            }).on('end', function () {


                if(tag_count !== 0){

                    for(var i=0; i<tag_count; i++){
                        if(tag_list[i].tag_stats == 'insert'){
                            c.query(query.recruit_tag_insert2, [ sending[0].recruitPK,sending[0].recruitPK,tag_list[i].tag_name ]).on('result', function (res) {
                                res.on('row', function (row) {
                                    sending.push(row);
                                });
                            }).on('end', function () {
                            });
                        }
                    }

                    res.send(200);
                }


            });
        });


    });
};








/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/// 아이디와 비밀번호 검색  login_check
exports.login_check = function (req, res) {
    var sending = [];
    var id = req.body.id;
    var pw = req.body.pw;

    c.query(query.login_check, [id,pw])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};
            if (sending[0] != null) {
                res.send(200, obj);
            }
            else{
                var aaa={notdata:'none'};
                sending.push(aaa)
                res.send(200, obj);
            }
        });
};


// 헤더에 페이지마다 로그인 된 정보를 가져온다  닉네임 , 코인 등등 head_login_info
exports.head_login_info = function (req, res) {
    var sending = [];
    var member_pk = req.body.member_pk;


    c.query(query.head_login_info, [member_pk])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};
            if (sending[0] != null) {
                res.send(200, obj);
            }
            else{
                var aaa={notdata:'none'};
                sending.push(aaa)
                res.send(200, obj);
            }
        });
};


// 아이템 관련 기본 쎄팅을 전부 가져 온다.   item_base_list
exports.item_base_list = function (req, res) {
    var sending = [];

    c.query(query.item_base_list, [null])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        }).on('end', function () {
            var obj = {sending: sending};
            if (sending[0] != null) {
                res.send(200, obj);
            }else{
                res.send(500, obj);
            }
        });
};



// 아이템을 살때 쓴다. item_pay_update
exports.item_pay_update = function (req, res) {
    var sending = [];
    var item_pk = req.body.item_pk;
    var item_price = req.body.item_price;
    var item_add = req.body.item_add;
    var member_pk = req.body.member_pk;
    var free_coin = req.body.free_coin;
    var pay_coin = req.body.pay_coin;

    c.query(query.member_coin_sum, [ free_coin,pay_coin,member_pk ]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
    });

    c.query(query.item_history_update, [ member_pk,item_pk,member_pk,item_pk, item_add, item_price ]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
    });

    res.send(200);


};







//////////////////////////////////////////////////////////////////////////////////////////////////////////










/////////////////////////// 저는요 List //////////////////////////

// 저는요글 list 가져오기 musician_list
exports.musician_list = function (req, res) {
    var sending = [];
    var sending2 = [];
    var limit1 = req.body.limit1;
    var limit2 = req.body.limit2;
    var search = req.body.search;

    c.query(query.musician_list, [limit1,limit2,search])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            if (sending[0] == null) {
                var obj = {sending: sending};
                var aaa={notdata:'none'};
                sending.push(aaa);
                res.send(200, obj);
            }else{
                c.query(query.musician_tag, [null])
                    .on('result', function (res) {
                        res.on('row', function (row) {
                            sending2.push(row);
                        });
                    })
                    .on('end', function () {

                        for(var i =0; i<sending.length; i++){
                            sending[i].server_tag = [];
                            for(var j = 0; j<sending2.length; j++){
                                if(sending[i].memberPK == sending2[j].memberPK){
                                    sending[i].server_tag.push(sending2[j]);
                                }
                            }
                        }
                        var obj = {sending: sending};
                        res.send(200, obj);

                    });
            }




        });



};


// 저는요글 태그 list  musician_tag
exports.musician_tag = function (req, res) {
    var sending = [];

    c.query(query.musician_tag, [null])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null) {
                res.send(200, obj);
            }
            else{
                var aaa={notdata:'none'};
                sending.push(aaa)
                res.send(200, obj);
            }
        });
};

///////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////저는요 Detail///////////////////////////////////////////////////////


// 저는요의 detail 정보를 가져온다.이름, 닉네임 , 사진 등등 musician_info
exports.musician_info = function (req, res) {
    var sending = [];
    var sending2 = [];
    var sending3 = [];
    var member_pk = req.body.member_pk;

    c.query(query.musician_info, [ member_pk,member_pk ])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        }).on('end', function () {


            sending[0].server_tag = [];
            sending[0].server_portfolio = [];

            c.query(query.musician_info_tag, [ member_pk ])
                .on('result', function (res) {
                    res.on('row', function (row) {
                        sending2.push(row);
                    });
                }).on('end', function () {

                    if (sending2[0] != null) {
                        sending[0].server_tag = sending2;
                    }else{
                        sending[0].server_tag = null;
                    }


                    c.query(query.musician_info_portfolio, [ member_pk ])
                        .on('result', function (res) {
                            res.on('row', function (row) {
                                sending3.push(row);
                            });
                        }).on('end', function () {
                            if (sending2[0] != null) {
                                sending[0].server_portfolio = sending3;
                            }else{
                                sending[0].server_portfolio = null;
                            }

                            var obj = {sending: sending};
                            res.send(200, obj);

                        })


                })



        });
};



// 뮤지션 활동에 관한 정보 musician_fixapply
exports.musician_fixapply = function (req, res) {
    var sending = [];
    var sending2 = [];
    var member_pk = req.body.member_pk;


    c.query(query.musician_fixapply, [member_pk])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        }).on('end', function () {

            if (sending[0] != null) {


                c.query(query.musician_fixapply_point, [member_pk])
                    .on('result', function (res) {
                        res.on('row', function (row) {
                            sending2.push(row);
                        });
                    }).on('end', function () {

                        for(var i=0; i<sending.length; i++){
                            sending[i].apply_point = [];
                            for(var j=0; j<sending2.length; j++){
                                if(sending[i].recruitPK == sending2[j].recruitPK && sending[i].applyPK == sending2[j].applyPK){
                                    sending[i].apply_point.push(sending2[j])
                                }
                            }
                        }



                        var obj = {sending: sending};
                        res.send(200, obj);
                    });


            }else{
                var obj = {sending: sending};
                var aaa={notdata:'none'};
                sending.push(aaa)
                res.send(200, obj);
            }
        });



};














///////////////////////////////////////////////////////////////////////////////////////////////////



exports.after_insert_go = function (req,res){
    console.log("----------------------------------------------------------------------------");
    console.log(req.body);
    console.log("----------------------------------------------------------------------------");
    console.log(req.files);
    var date = Date.now();
    var file_name = date+"_"+ req.files.qqqq.originalFilename;
    var outputPath = __dirname+'/../../client/video/' + file_name;
    var ws = fs.createWriteStream(outputPath);
    fs.createReadStream(req.files.qqqq.path).pipe(ws);
    console.log(file_name);
    res.send(200,file_name);

};





// 강의 자료 list  lectureMaterialList
exports.lectureMaterialList = function (req, res) {
    var sending = [];
    var id = req.body.event_id;

    c.query(query.lectureMaterialList,[id])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};












// 안내글 list noticeList
exports.noticeList = function (req, res) {
    var sending = [];
    var id = req.body.event_id;

    c.query(query.noticeList,[id])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};




//신규 안내글 등록 하기 noticeInsertGo
exports.noticeInsertGo = function (req, res) {
    var sending = [];
    var id = req.body.event_id;
    var notice_comment = req.body.notice_comment;
    c.query(query.noticeInsertGo,[id,id,notice_comment])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};



// 안내글 수정 하기 noticeModGo
exports.noticeModGo = function (req, res) {
    var sending = [];
    var id = req.body.event_id;
    var notice_comment = req.body.notice_comment;
    var notice_ID = req.body.notice_ID;
    c.query(query.noticeModGo,[notice_comment,id,notice_ID])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};


// 안내글 등록 삭제 버튼 noticeDeletgo
exports.noticeDeletgo = function (req, res) {
    var sending = [];
    var id = req.body.event_id;
    var notice_id = req.body.notice_id;

    c.query(query.noticeDeletgo,[id,notice_id])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};




//주변 안내 등록 list tourisme_info_D
exports.tourisme_info_D = function (req, res) {
    var sending = [];
    var id = req.body.event_id;


    c.query(query.tourisme_info_D,[id])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};








//행사 클릭시 강연자 list teacherList
exports.teacherList = function (req, res) {
    var sending = [];
    var id = req.body.event_id;

    c.query(query.teacherList,[id])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};




//행사 클릭시 참가자 list entryList
exports.entryList = function (req, res) {
    var sending = [];
    var id = req.body.event_id;

    c.query(query.entryList,[id])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};




// 강연자 신규 추가 등록 teacherInsert
exports.teacherInsert = function (req, res) {
    var sending = [];
    var id = req.body.event_id;
    var teacherName = req.body.teacherName;
    var teacherParty = req.body.teacherParty;
    var teacherCall = req.body.teacherCall;

    console.log(id)
    console.log(teacherName)
    console.log(teacherParty)
    console.log(teacherCall)

    c.query(query.teacherInsert,[id,id,teacherName,teacherParty,teacherCall])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};




// 강연자 수정 등록 teacherMod
exports.teacherMod = function (req, res) {
    var sending = [];
    var id = req.body.event_id;
    var teacherName = req.body.teacherName;
    var teacherParty = req.body.teacherParty;
    var teacherCall = req.body.teacherCall;
    var teacherUserClassId = req.body.teacherUserClassId;
    var teacherUserId = req.body.teacherUserId;

    c.query(query.teacherMod,[teacherName,teacherParty,teacherCall,id,teacherUserClassId,teacherUserId])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};




// 강연자 삭제 등록 teacherDelete
exports.teacherDelete = function (req, res) {
    var sending = [];
    var id = req.body.event_id;
    var teacherUserClassId = req.body.teacherUserClassId;
    var teacherUserId = req.body.teacherUserId;

    c.query(query.teacherDelete,[id,teacherUserClassId,teacherUserId])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};





// 참가자 신규 추가 등록 entryInsert
exports.entryInsert = function (req, res) {
    var sending = [];
    var id = req.body.event_id;
    var teacherName = req.body.teacherName;
    var teacherParty = req.body.teacherParty;
    var teacherCall = req.body.teacherCall;

    c.query(query.entryInsert,[id,id,teacherName,teacherParty,teacherCall])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};





// 참가자 수정 등록 entryMod
exports.entryMod = function (req, res) {
    var sending = [];
    var id = req.body.event_id;
    var teacherName = req.body.teacherName;
    var teacherParty = req.body.teacherParty;
    var teacherCall = req.body.teacherCall;
    var teacherUserClassId = req.body.teacherUserClassId;
    var teacherUserId = req.body.teacherUserId;

    c.query(query.entryMod,[teacherName,teacherParty,teacherCall,id,teacherUserClassId,teacherUserId])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};




// 참가자 삭제 등록 entryDelete
exports.entryDelete = function (req, res) {
    var sending = [];
    var id = req.body.event_id;
    var teacherUserClassId = req.body.teacherUserClassId;
    var teacherUserId = req.body.teacherUserId;

    c.query(query.entryDelete,[id,teacherUserClassId,teacherUserId])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};




// 진행+지난 행사 클릭시  함수 cardList
exports.cardList = function (req, res) {
    var sending = [];
    var id = req.body.event_id;

    c.query(query.cardList,[id])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};







//카드 저장 누를시 cardMod
exports.cardMod = function (req, res) {
    var sending = [];
    var id = req.body.event_id;
    var user_class_id = req.body.user_class_id;
    var user_id = req.body.user_id;
    var user_name = req.body.user_name;
    var user_party= req.body.user_party;
    var nfc_id= req.body.nfc_id;

    c.query(query.cardMod,[nfc_id,user_name,user_party,id,user_class_id,user_id])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};





// 인사말, 초대글, 일정표  정보 가져 오기 tourisme_info_D
exports.event_info_D = function (req, res) {
    var sending = [];
    var id = req.body.event_id;

    c.query(query.event_info_D,[id])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};





// 강의 질문 삭제 QNA_delete
exports.QNA_delete = function (req, res) {
    var sending = [];
    var event_ID = req.body.event_ID;
    var user_class_ID = req.body.user_class_ID;
    var user_ID = req.body.user_ID;
    var schedule_ID = req.body.schedule_ID;
    var QNA_ID = req.body.QNA_ID;

    c.query(query.QNA_delete,[event_ID,user_class_ID,user_ID,schedule_ID,QNA_ID])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            sending.push(aaa)
            res.send(200, obj);
        });
};

















































































































































































































































































































































































































// 원하는 강의 질문 하기
exports.insert_qna = function (req, res) {
    var sending = [];
    var event_ID = req.body.event_ID;
    var user_class_ID = req.body.user_class_ID;
    var user_ID = req.body.user_ID;
    var schedule_ID = req.body.schedule_ID;
    var write_qna = req.body.write_qna;
    var user_name = req.body.user_name;
    var NFC_LID = req.body.NFC_LID;

    c.query(query.insert_qna, [event_ID,user_class_ID,user_ID,schedule_ID,event_ID,user_class_ID,user_ID,schedule_ID,write_qna,NFC_LID,user_name])
        .on('result', function (res) {
            res.on('row', function (row) {

            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                var aaa={name:'error'}
            console.log(aaa);
            sending.push(aaa)
            res.send(200, obj);
        });
};



// 강의 질문 list
exports.list_qna = function (req, res) {
    var sending = [];
    var event_ID = req.body.event_ID;
    var user_class_ID = req.body.user_class_ID;
    var user_ID = req.body.user_ID;


    c.query(query.list_qna, [event_ID,user_class_ID,user_ID])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};






// 강의 질문 detail
exports.detail_qna = function (req, res) {
    var sending = [];
    var event_ID = req.body.event_ID;
    var user_class_ID = req.body.user_class_ID;
    var user_ID = req.body.user_ID;
    var schedule_ID = req.body.schedule_ID;
    var QNA_ID = req.body.QNA_ID;

    c.query(query.detail_qna, [event_ID,user_class_ID,user_ID,schedule_ID,QNA_ID])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};


//강의 자료 list
exports.lectureList = function (req, res) {
    var sending = [];
    var event_ID = req.body.event_ID

    c.query(query.lectureList, [event_ID])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};



//강의 자료 detail
exports.detail_lecture = function (req, res) {
    var sending = [];
    var lecture_ID = req.body.lecture_ID;
    c.query(query.detail_lecture, [lecture_ID])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};


//주변 정보 list
exports.turisme = function (req, res) {
    var sending = [];
    var event_ID = req.body.event_ID;
    c.query(query.turisme, [event_ID])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};


//인사말 그림 출력
exports.information = function (req, res) {
    var sending = [];
    var event_ID = req.body.event_ID;

    c.query(query.information, [event_ID])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};


// top 움직이는 공지사항
exports.notice_D = function (req, res) {
    var sending = [];
    var event_ID = req.body.event_ID;
    c.query(query.notice_D, [event_ID])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};
















// 이용기관 획득
exports.getUseComp = function (req, res) {
    var sending = [];
    console.log("stastssssss");
    c.query(query.getUseComp, null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 이용기관 등록
exports.updatefortest = function (req, res) {
    var org_code = req.body.org_code;
    var field_code = req.body.field_code;
    var system_code = req.body.system_code;
    var source = req.body.source;
    var thrs_item_code = req.body.thrs_item_code;
    var source_name = req.body.source_name;
    var target = req.body.target;
    var target_name = req.body.target_name;
    var value = req.body.value;
    var dulation_sec = req.body.dulation_sec;

    c.query(query.updatefortest, [org_code, field_code, system_code, source, thrs_item_code, source_name, target, target_name, value, dulation_sec], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);

        });
};

// 이용기관 등록
exports.insertUseComp = function (req, res) {
    var org_name = req.body.org_name;
    var city_name = req.body.city_name;
    var addr_code = req.body.addr_code;
    var org_tel = req.body.org_tel;
    var org_fax = req.body.org_fax;
    var notice = req.body.notice;

    c.query(query.insertUseComp, [org_name, city_name, addr_code, org_tel, org_fax, notice], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};
exports.insertAction = function (req, res) {
    var action_name = req.body.action_name;


    c.query(query.insertAction, [action_name], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};


// 이용기관 업데이트
exports.updateUseComp = function (req, res) {
    var org_name = req.body.org_name;
    var city_name = req.body.city_name;
    var addr_code = req.body.addr_code;
    var org_tel = req.body.org_tel;
    var org_fax = req.body.org_fax;
    var notice = req.body.notice;
    var org_code = req.body.org_code;

    c.query(query.updateUseComp, [org_name, city_name, addr_code, org_tel, org_fax, notice, org_code])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 이용기관 삭제
exports.deleteUseComp = function (req, res) {
    var org_code = req.body.org_code;

    c.query(query.deleteUseComp, [org_code])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};
//임계치 품질 액션 삭제
exports.deleteActionReg = function (req, res) {
    var thrs_item_code = req.body.thrs_item_code;
    var qlt_code = req.body.qlt_code;
    var action_code = req.body.action_code;

    c.query(query.deleteActionReg, [thrs_item_code, qlt_code, action_code])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};
// 소스 획득
exports.getSource = function (req, res) {
    var sending = [];
    c.query(query.getSource, null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 소스 등록
exports.insertSource = function (req, res) {
    var org_code = req.body.org_code;
    var source_code = req.body.source_code;
    c.query(query.insertSource, [org_code, source_code], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 소스 삭제
exports.deleteSource = function (req, res) {
    var source_code = req.body.source_code;

    c.query(query.deleteSource, [source_code], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};


// 타겟 획득
exports.getTarget = function (req, res) {
    var sending = [];
    c.query(query.getTarget, null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 타겟 등록
exports.insertTarget = function (req, res) {
    var org_code = req.body.org_code;
    var target_code = req.body.target_code;
    var target_name = req.body.target_name;
    var target_notice = req.body.target_notice;

    c.query(query.insertTarget, [org_code, target_code, target_name, target_notice], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 타겟 업데이트
exports.updateTarget = function (req, res) {
    var org_code = req.body.org_code;
    var target_name = req.body.target_name;
    var target_notice = req.body.target_notice;
    var target_code = req.body.target_code;

    c.query(query.updateTarget, [org_code, target_name, target_notice, target_code])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 타겟 삭제
exports.deleteTarget = function (req, res) {
    var target_code = req.body.target_code;
    c.query(query.deleteTarget, [target_code], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
            res.render("/");
        });
};

// 담당 획득
exports.getCompMem = function (req, res) {
    var sending = [];
    c.query(query.getCompMem, null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 부서 획득
exports.getDept = function (req, res) {
    var sending = [];
    c.query(query.getDeptList, null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        }).on('end', function () {
            var obj = {sending: sending};
            if (sending[0] != null) res.send(200, obj);
            else res.send(500, obj);
        });
};

// 직위 획득
exports.getPosList = function (req, res) {
    var sending = [];
    c.query(query.getPosList, null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        }).on('end', function () {
            var obj = {sending: sending};
            if (sending[0] != null) res.send(200, obj);
            else res.send(500, obj);
        });
};
exports.insertPosReg = function (req, res) {
    var pos_name = req.body.pos_name;


    c.query(query.insertPosReg, [pos_name], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};
exports.deletePosReg = function (req, res) {
    var pos_code = req.body.pos_code;

    c.query(query.deletePosReg, [pos_code], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};


// 부서 등록
exports.insertDept = function (req, res) {
    var dep_name = req.body.dep_name;
    c.query(query.insertDept, [dep_name], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            var sending = [];
            c.query(query.getDeptOne, [dep_name]).on('result', function (res) {
                res.on('row', function (row) {
                    sending.push(row);
                });
            }).on('end', function () {
                var obj = {sending: sending};
                if (sending[0] != null) res.send(200, obj);
                else res.send(500, obj);
            });
        });
};
// 직위 등록
exports.insertRole = function (req, res) {
    var role_name = req.body.role_name;
    c.query(query.insertRole, [role_name], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            var sending = [];
            c.query(query.getRoleOne, [role_name]).on('result', function (res) {
                res.on('row', function (row) {
                    sending.push(row);
                });
            }).on('end', function () {
                var obj = {sending: sending};
                if (sending[0] != null) res.send(200, obj);
                else res.send(500, obj);
            });
        });
};
//부서 한개 가져오기
exports.getDeptOne = function (req, res) {
    var dep_name = req.body.dep_name;

    var sending = [];
    c.query(query.getDeptOne, [dep_name]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        var obj = {sending: sending};
        if (sending[0] != null) res.send(200, obj);
        else res.send(500, obj);
    });
};
//직위 한개 가져오기
exports.getRoleOne = function (req, res) {
    var role_name = req.body.role_name;
    var sending = [];
    c.query(query.getRoleOne, [role_name]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        var obj = {sending: sending};
        if (sending[0] != null) res.send(200, obj);
        else res.send(500, obj);
    });
}

// 담당 등록
exports.insertCompMem = function (req, res) {
    var org_code = req.body.org_code;
    var member_name = req.body.member_name;
    var member_id = req.body.member_id;
    var dept = req.body.dept;
    var pos_code = req.body.pos_code;
    var tel = req.body.tel;
    var email = req.body.email;
    var notice = req.body.notice;
    var passwd = req.body.passwd;

    c.query(query.insertCompMem, [ member_name, dept, pos_code, tel, email, passwd, notice, member_id])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 담당 업데이트
exports.updateCompMem = function (req, res) {
    var org_code = req.body.org_code;
    var member_name = req.body.member_name;
    var member_id = req.body.member_id;
    var dept = req.body.dept;
    var pos_code = req.body.pos_code;
    var tel = req.body.tel;
    var email = req.body.email;
    var notice = req.body.notice;
    var passwd = req.body.passwd;


    c.query(query.updateCompMem, [org_code, member_name, dept, pos_code, tel, email, passwd, notice, member_id])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};
// 담당 삭제
exports.deleteCompMem = function (req, res) {
    var mem_code = req.body.mem_code;
    var mem_code2 = req.body.mem_code;

    c.query(query.deleteCompMem, [mem_code, mem_code2], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};
// 시스템 획득
exports.getSysList = function (req, res) {
    var sending = [];
    c.query(query.getSysList, null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 시스템 등록
exports.insertOrgReg = function (req, res) {
    var org_name = req.body.org_name;

    c.query(query.insertOrgReg, [org_name], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};
// 시스템 등록
exports.insertSysReg = function (req, res) {
    var system_name = req.body.system_name;
    console.log(system_name);
    c.query(query.insertSysReg, [system_name], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};
// 시스템 업데이트
exports.updateSysReg = function (req, res) {
    var system_name = req.body.system_name;
    var system_code = req.body.system_code;

    c.query(query.updateSysReg, [system_name, system_code])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 시스템 삭제
exports.deleteSysReg = function (req, res) {
    var system_code = req.body.system_code;

    c.query(query.deleteSysReg, [system_code])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};
// 이용기관별 타겟
exports.getOrgTarget = function (req, res) {
    var org_code = req.body.org_code;
    var field_code = req.body.field_code;
    var system_name = req.body.sys_name;

    c.query(query.getOrgTarget, [org_code, field_code, system_name], null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};


// 액션코멘트관리 등록현황 획득
exports.actList = function (req, res) {
    var sending = [];
    c.query(query.actList, null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};
//액션코멘트관리 액션코멘트 등록현황 획득
exports.actedList = function (req, res) {
    var sending = [];
    c.query(query.actedList, null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};
//액션코멘트관리 데이타 획득
exports.actData = function (req, res) {
    var sending = [];
    c.query(query.actData, null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};
function check_cmt(data) {
    c.query(query.check_cmt, data)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            //res.send(200);
        });

};

function insert_cmt(data) {
    c.query(query.insertAct, data)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {

        });

};

//액션코멘트 등록
exports.insertAct = function (req, res) {
    var sending = [];
    var thrs_item_code = req.body.thrs_item_code;
    var qlt_code = req.body.qlt_code;
    var action_code = req.body.action_code;

    var cmt_type = req.body.action_name;
//    var cmt_file = req.body.cmt_file;
    var cmt_file = null;
    var cmt_text = req.body.cmt_text;

    var dataSet = {thrs_item_code: thrs_item_code, qlt_code: qlt_code, action_code: action_code, cmt_type: cmt_type, cmt_file: cmt_file, cmt_text: cmt_text};
    c.query(query.insertAct, dataSet)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

//액션코멘트 업뎃
exports.updateAct = function (req, res) {

    var thrs_item_code = req.body.thrs_item_code;
    var qlt_code = req.body.qlt_code;
    var action_code = req.body.action_code;

    var cmt_type = req.body.action_name;
//    var cmt_file = req.body.cmt_file;
    var cmt_file = null;
    var cmt_text = req.body.cmt_text;

    var dataSet = {thrs_item_code: thrs_item_code, qlt_code: qlt_code, action_code: action_code, cmt_type: cmt_type, cmt_file: cmt_file, cmt_text: cmt_text};
    c.query(query.updateAct, dataSet)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

exports.insertF = function (req, res) {
    var file = req.files.file;
    console.log(file);
    var dir = '.\\app\\docu\\';
    var name = new Date().getTime() + file.name;

    fs.readFile(file.path, function (error, data) {
        fs.writeFile(dir + name, data, function (error) {
            if (error) {
                throw error
            }
            res.send(name);
        });
    });
};

//액션코멘트 삭제
exports.deleteAct = function (req, res) {
    var thrs_item_code = req.body.thrs_item_code;
    var qlt_code = req.body.qlt_code;
    var action_code = req.body.action_code;
    var cmt_seq = req.body.cmt_seq;

    c.query(query.deleteAct, [thrs_item_code, qlt_code, action_code, cmt_seq])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};


///수신자 등록 함수
function insertReceiver(data) {
    c.query(query.insertReceiver, data)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            // res.send(200);
        });

};
function updateReceiver(data) {
    c.query(query.updateReceiver, data)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            //res.send(200);
        });

};

exports.selectReceiver = function (req, res) {
    var sending = [];
    var thrs_item_code = req.body.thrs_item_code;
    var qlt_code = req.body.qlt_code;
    var action_code = req.body.action_code;
    var member_id = req.body.member_id;
    var org_code = req.body.org_code;
    var check = req.body.check;


    var dataSet = {thrs_item_code: thrs_item_code, qlt_code: qlt_code, action_code: action_code, member_id: member_id, org_code: org_code, is_delete: ""};
    c.query(query.selectReceiver, dataSet)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};
            if (sending[0] != null) {
                if (check) {

                    dataSet.is_delete = null;
                    updateReceiver(dataSet);

                } else {


                    dataSet.is_delete = "y";
                    updateReceiver(dataSet);
                }
                res.send(200, obj);
            }
            else {
                if (check) {

                    insertReceiver(dataSet);

                }
                res.send(200, obj);
            }
        });
};

//채영범 사원 TEST 코딩

exports.getOccurDetailList = function (req, res) {
    var sending = [];

    var targetA = req.body.targetA;
    var targetB = req.body.targetB;
    var check_time = req.body.check_time;


    c.query(query.getOccurDetailList, [targetA, targetB, check_time])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

exports.getOccurList = function (req, res) {
    var sending = [];
    c.query(query.getOccurList)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};


exports.getOccurQltCnt = function (req, res) {
    var sending = [];

    c.query(query.getOccurQltCnt)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};
exports.updateStanReg = function (req, res) {
    var thrs_item_code = req.body.thrs_item_code;
    var qlt_code = req.body.qlt_code;
    var item = req.body.item;
    var value = req.body.value;
    var value1 = req.body.value1;
    var value2 = req.body.value2;
    var seq = req.body.seq;
    var priority = req.body.priority;
    c.query(query.updateStanReg, [priority, value, value1, value2, item, thrs_item_code, qlt_code, seq])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        })

};


//임계치 기준정보관리 - 임계치 관리항목 등록
exports.insertStanThresReg = function (req, res) {
    var new_thrs_item_name = req.body.thrs_item_name;


    c.query(query.insertStanThresReg, [new_thrs_item_name])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

//임계치 기준정보관리 - 임계치 품질등급 등록
exports.insertStanQualReg = function (req, res) {
    var new_qual_item_name = req.body.qual_item_name;

    c.query(query.insertStanQualReg, [new_qual_item_name])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });

};

//임계치 기준정보 관리 - 임계치 품질 액션 등록 - 액션 리스트 get
exports.getActionNameList = function (req, res) {
    var sending = [];
    c.query(query.getActionNameList)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

exports.insertStanRegItem = function (req, res) {
    /*   var qlt_code = req.body.qlt_code;
     var thrs_item_name = req.body.item_name;*/

    c.query(query.insertStanRegItem, [thrs_item_name], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};
exports.insertStanReg = function (req, res) {
    var qlt_code = req.body.qlt_code;
    var thrs_item_code = req.body.thrs_item_code;
    var item = req.body.item;
    var value = req.body.value;
    var value1 = req.body.value1;
    var value2 = req.body.value2;
    var priority = req.body.priority;
    var q;
    if (item == '문자열') {
        q = query.insertStanReg2;
    } else {
        q = query.insertStanReg1;
    }

    var dataSet = {thrs_item_code: thrs_item_code, qlt_code: qlt_code, item: item, value: value, value1: value1, value2: value2, priority: priority};
    c.query(q, dataSet)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });

};

//임계치 기준정보 관리 -임계치 품질 상세 기준 항목 -저장 -insertDetail
exports.insertDetail = function (req, res) {
    var thrs_item_code = req.body.thrs_item_code;
    var qlt_code = req.body.qlt_code;
    var detail_name = req.body.detail_name;
    var detail_value = req.body.detail_value;


    var dataSet = {thrs_item_code: thrs_item_code, qlt_code: qlt_code, detail_name: detail_name, detail_value: detail_value};
    c.query(query.insertDetail, dataSet)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

//임계치 품질 액션등록
exports.updateActReg = function (req, res) {
    var ithrs_item_code = req.body.thrs_item_code;
    var iqlt_code = req.body.qlt_code;
    var iaction_code = req.body.action_code;


    var dataSet = {ithrs_item_code: ithrs_item_code, iqlt_code: iqlt_code, iaction_code: iaction_code}
    c.query(query.updateActReg, dataSet)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};
//수신자 등록
//유저 리스트
exports.getUserList = function (req, res) {
    var sending = [];
    c.query(query.getUserList)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};


exports.getQltClassList = function (req, res) {
    var sending = [];
    c.query(query.getQltClassList)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

//임계치 관리 항목 삭제
exports.deleteStanThresReg = function (req, res) {
    var thrs_item_code = req.body.thrs_item_code;
    console.log(thrs_item_code);
    c.query(query.deleteStanThresReg, {thrs_item_code: thrs_item_code})
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });

};

//품질 등급 기준 삭제
exports.deleteStanReg = function (req, res) {
    var item = req.body.item;
    var qlt_code = req.body.qlt_code;
    var thrs_item_code = req.body.thrs_item_code;


    c.query(query.deleteStanReg, [thrs_item_code, qlt_code, item])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });

};

//임계치 class 삭제
exports.deleteStanQualReg = function (req, res) {
    var qlt_code = req.body.qlt_code;

    c.query(query.deleteStanQualReg, {qlt_code: qlt_code})
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });

};
exports.getAddresseeList = function (req, res) {
    var sending = [];
    c.query(query.getAddresseeList)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(200, obj);
        });
};


// 임계치 처리 현황 - 발생현황 리스트 get
exports.getProcessList = function (req, res) {
    var sending = [];
    c.query(query.getProcessList)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);

            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};
//임계치 처리 현황 - 발생항목 코멘트 처리 내역 get
exports.getActionList = function (req, res) {
    var sending = [];
    var targetA = req.body.targetA;
    var targetB = req.body.targetB;
    var check_time = req.body.check_time;
    var action_code = req.body.action_code;


    c.query(query.getActionList, [targetA, targetB, check_time, action_code])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};
exports.getStandardReg_ACT = function (req, res) {
    var sending = [];
    c.query(query.getStandardReg_ACT)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 임계치 기준 정보관리 - 임계치 품질등록 리스트
exports.getStandardReg = function (req, res) {
    var sending = [];
    c.query(query.getStandardReg)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 임계치 기준 정보관리 - 임계치 품질등록 - 관리항목 리스트
exports.getThresHoldList = function (req, res) {
    var sending = [];
    c.query(query.getThresHoldList)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 임계치 기준 정보관리 - 임계치 품질등록 - 품질등급 리스트
exports.getQualList = function (req, res) {
    var sending = [];
    c.query(query.getQualList)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};


exports.getActionReg = function (req, res) {
    var sending = [];
    c.query(query.getActionReg)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};


exports.getActionRegList = function (req, res) {
    var sending = [];
    c.query(query.getActionRegList)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};


//임계치 기준정보관리 - 임계치 수신자 등록 - 명단
exports.getReceiverNameList = function (req, res) {
    var sending = [];
    c.query(query.getReceiverNameList)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

exports.getDetailReg = function (req, res) {
    var sending = [];

    c.query(query.getDetailReg)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

//테스트용 코드 -값 입력
exports.insertTestPram = function (req, res) {

    var company_name;
    var system_name;
    var targetA_name;
    var targetB_name;
    var item_name;
    var item_value;


    if (req.body.company_name == null) {
        company_name = req.body.company_name;

    } else {
        company_name = req.body.company_name.substr(0, 20);
    }


    if (req.body.system_name == null) {
        system_name = req.body.system_name;

    } else {
        system_name = req.body.system_name.substr(0, 20);
    }


    if (req.body.targetA_name == null) {
        targetA_name = req.body.targetA_name;

    } else {
        targetA_name = req.body.targetA_name.substr(0, 20);
    }


    if (req.body.targetB_name == null) {
        targetB_name = req.body.targetB_name;

    } else {
        targetB_name = req.body.targetB_name.substr(0, 20);
    }


    if (req.body.item_name == null) {
        item_name = req.body.item_name;

    } else {
        item_name = req.body.item_name.substr(0, 20);
    }

    if (req.body.item_value == null) {
        item_value = req.body.item_value;

    } else {
        item_value = req.body.item_value.substr(0, 200);
    }


    /*  company_name = req.body.company_name.substr(0,20);
     system_name = req.body.system_name.substr(0,20);
     targetA_name = req.body.targetA_name.substr(0,30);
     targetB_name = req.body.targetB_name.substr(0,30);
     item_name = req.body.item_name.substr(0,10);
     item_value = req.body.item_value.substr(0,200);*/


    c.query(query.insertTestPram, [company_name,
        system_name,
        targetA_name,
        targetB_name,
        item_name,
        item_value
    ])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

//테스트용 코드 -내부로직 실행
exports.logicTestPram = function (req, res) {
    /*c.query(query.insertTestPram, [company_name,
     system_name,
     source_name,
     target_name,
     item_name,
     item_value
     ])
     */

    var i = 0;
    var checkQlt = req.body.checkQlt;

    var qltdataMax = req.body.qltdata.length;

    var qltcode = 0;


    //var dataSet={checkQlt:checkQlt};
    for (i = 0; i < qltdataMax; i++) {
        var dataSet = {checkQlt: checkQlt, qltcode: req.body.qltdata[i].qlt_code};
        c.query(query.logicTestPram, dataSet)
            .on('result', function (res) {
                res.on('row', function () {
                });
            })
            .on('end', function () {
                res.send(200);
            });
    }
    ;
};

//측정치 누적 현황 리스트
exports.getLogList = function (req, res) {
    var sending = [];

    c.query(query.getLogList)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};
exports.deleteLog = function (req, res) {
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    console.log(start_date);
    console.log(end_date);

    c.query(query.deleteLog, [start_date, end_date])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};


//장바구니 카트 리스트 get
exports.getCartList = function (req, res) {
    var sending = [];
    c.query(query.getCartList)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};
