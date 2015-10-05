
/////////////////////////////////// 헤더에 정의되는 쿼리 ////////////////////////////////////////////////


// 헤더에 페이지마다 로그인 된 정보를 가져온다  닉네임 , 코인 등등 head_login_info
exports.head_login_info = "call sp_head_member_info(?);";
// 아이템 관련 기본 쎄팅을 전부 가져 온다.   item_base_list
exports.item_base_list = "select * from item_C where isnull(isDel);";
// 등록전 recruit_pk 값을 가져온다.
exports.recruit_pk_result = "select lpad(count(recruitPK),16,'0') as recruitPK from recruit_M";
// 실제 찾아요 등록 recruit_insert
exports.recruit_insert = "insert into recruit_M(recruitPK,memberPK,recruitTitle,categoryFirstPK, " +
"categorySecPK,recruitPrice,endDate,locationPK,recruitContents,isPM) " +
"select ?,?,?,?,?,?,?,?,?,?;";
// 찾아요 등록후 태그 입력 하고 recruit_tag_insert
exports.recruit_tag_insert1 = "insert into recruitTags_D(recruitPK,recruitTagPK,tagName,isDel) " +
"select ?,'00','DUMMY','1';";
exports.recruit_tag_insert2 = "insert into recruitTags_D(recruitPK,recruitTagPK,tagName,isDel) " +
"select ?,(select lpad(max(recruitTagPK)+1,2,'0') from recruitTags_D where recruitPK =?),?,null;";

// 회원의 쓴 코인만큼 - 가 된다 member_coin_sum
exports.member_coin_sum = "update member_M set memberFreeCoin = memberFreeCoin - ? , memberPayCoin = memberPayCoin - ? " +
"where member_M.memberPK = ?;";

// 아이템 쓴 내역을 저장한다 member_item_history_update
exports.member_item_history_update = "insert into memberItem_D(memberPK,itemPK,memberItemPK,price,payDate) " +
"select ?,?,(select lpad(max(memberItemPK)+1,2,'0') from memberItem_D where memberPK=? and memberItem_D.itemPK=?),?,now();";


// 아이템을 살때 쓴다. item_history_update
exports.item_history_update= "insert into memberItem_D(memberPK,itemPK,memberItemPK,itemValue,price,payDate) " +
"select ?,?,(select lpad(max(memberItemPK)+1,2,'0') from memberItem_D where memberPK=? and memberItem_D.itemPK=?),?,?,now();";



/////////////////////////////////////////////////////////////////////////////////////////////////////////











// 공고글 list 가져오기 recruit_list
exports.recruit_list2 = "select Date(recruit_M.endDate)-Date(now()) as result_time " +
",recruit_M.*,categoryFirst_C.categoryFirstName, " +
"categorySecond_C.categorySecName,location_C.locationName,sub_q.apply_count " +
"from recruit_M " +
"left join ( " +
"select " +
"apply_D.recruitPK,apply_D.memberPK,count(*) as apply_count " +
"from apply_D group by apply_D.recruitPK " +
") sub_q on recruit_M.recruitPK = sub_q.recruitPK " +
"inner join categoryFirst_C on " +
"categoryFirst_C.categoryFirstPK = recruit_M.categoryFirstPK " +
"inner join categorySecond_C on " +
"categorySecond_C.categorySecPK = recruit_M.categorySecPK " +
"inner join location_C on " +
"location_C.locationPK = recruit_M.locationPK " +
"where isnull(recruit_M.isDel) " +
"order by recruit_M.recruitPK desc;";  // 지원자 수를 체크하는 서브쿼리를 만들어서 List + 지원자수를 뽑아온다.

// 공고글 list 가져오기
exports.recruit_list = "call sp_recruitListPublic2(?,?,?)";


// 공고글 태그 list  recruit_tag
exports.recruit_tag = "select * from recruitTags_D where isnull(isDel) order by recruitPK desc,recruitTagPK;";

// 장기 단기 버튼을 가져온다.
exports.category1_list = "select * from categoryFirst_C where isnull(isDel);";
// 세션,총괄,보컬 등등 버튼을 가져온다.
exports.category2_list = "select * from categorySecond_C where isnull(isDel);";



/// 아이디와 비밀번호 검색  login_check
exports.login_check = "select * from member_M " +
"where member_M.memberAccount=? " +
"and member_M.memberPassword = HEX(AES_ENCRYPT(?, 'musitor_v0.01')) " +
"and isnull(isDel);";





////////////////////////////////// 모집글 detail //////////////////////////////////////////////////////////////

// 찾아요 기본 정보를 뽑아 온다. 금액,마감일 등등  recruit_info
exports.recruit_info = "select recruit_M.*,categoryFirst_C.categoryFirstName, " +
"categorySecond_C.categorySecName,location_C.locationName,sub_q.apply_count " +
"from recruit_M " +
"left join ( " +
"select " +
"apply_D.recruitPK,apply_D.memberPK,count(*) as apply_count " +
"from apply_D where apply_D.recruitPK = ? " +
") sub_q on recruit_M.recruitPK = sub_q.recruitPK " +
"inner join categoryFirst_C on " +
"categoryFirst_C.categoryFirstPK = recruit_M.categoryFirstPK " +
"inner join categorySecond_C on " +
"categorySecond_C.categorySecPK = recruit_M.categorySecPK " +
"inner join location_C on " +
"location_C.locationPK = recruit_M.locationPK " +
"where recruit_M.recruitPK=? ;";

exports.recruit_info_tag = "select * from recruitTags_D where recruitPK=? and isnull(isDel);";


// 찾아요 리플레이를 뽑는다 . 리플 + 리플에 리플까지 뽑아 온다 recruit_reply
exports.recruit_reply = "select member_M.memberPicture,member_M.memberNickname,recruitQNA_D.* " +
"from recruitQNA_D " +
"inner join member_M on " +
"member_M.memberPK = recruitQNA_D.memberPK " +
"where recruitQNA_D.recruitPK = ? " +
"and isnull(recruitQNA_D.isDel);";
exports.recruit_re_reply = "select member_M.memberPicture,member_M.memberNickname,recruitQNA_D2.* " +
"from recruitQNA_D2 " +
"inner join member_M on " +
"member_M.memberPK = recruitQNA_D2.memberPK " +
"where recruitQNA_D2.recruitPK = ? " +
"and isnull(recruitQNA_D2.isDel);";


// 찾아요 리플에 리플 등록  recruit_re_reply_insert
exports.recruit_re_reply_insert = "insert into recruitQNA_D2(recruitPK,qnaPK,qnarePK,qnaContents,insertDate,memberPK) " +
"select ?,?,(select lpad(count(qnarePK) , 4 ,'0') from recruitQNA_D2 where recruitPK =? and qnarePK=?),?,now(),?;";

// 찾아요 리플 등록  recruit_reply_insert
exports.recruit_reply_insert = "insert into recruitQNA_D(recruitPK,qnaPK,qnaContents,insertDate,memberPK) " +
"select ?,(select lpad(count(qnaPK) , 4 ,'0') from recruitQNA_D where recruitPK =?),?,now(),?;";


// 최근 지원한 list를 뿌려 준다. apply_select_list
exports.apply_select_list = "select * from apply_D " +
"where apply_D.memberPK=? " +
"and isnull(apply_D.isDel) " +
"group by apply_D.applyTitle,apply_D.applyContents " +
"order by apply_D.applyDate desc limit 7";


// 지원서 등록 하기  apply_insert
exports.apply_insert = "insert into apply_D(recruitPK,applyPK,applyTitle,applyContents,applyPrice,applyDate,memberPK) " +
"select ?,(select lpad(count(applyPK),16,'0') from apply_D where recruitPK = ?),?,?,?,now(),?;";

//지원을 이미 했는지 apply_check 대해 한번 체크를 한다 apply_check
exports.apply_check = "select * from apply_D where memberPK =? and recruitPK=? and isnull(isDel);";



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////// 모집글 insert /////////////////////////////////////////////////////////////

// 전체 지역을 뽑아 온다. location_list
exports.location_list = "select * from location_C where isnull(isDel);";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

















////////////////////////////////////////저는요 List ////////////////////////////////////////////

// 저는요글 list 가져오기
exports.musician_list = "call sp_memberList(?,?,?)";
// 저는요글 태그 list  musician_tag
exports.musician_tag = "select * from memberTags_D where isnull(isDel) order by memberPK desc,tagPK;";

//////////////////////////////////////////////////////////////////////////////////////////////////////






////////////////////////////////////////저는요 Detail ////////////////////////////////////////////

// 저는요 Detail 에서 회원 이름 닉네임 경력 소개 등 정보
exports.musician_info = "select member_M.memberName,member_M.memberNickname,member_M.memberPicture,member_M.memberInfo,member_M.memberCareer, " +
"AES_DECRYPT(UNHEX(member_M.memberEmail), 'musitor_v0.01') as memberEmail, " +
"AES_DECRYPT(UNHEX(member_M.memberPhone), 'musitor_v0.01') as memberPhone, " +
"(select count(*) from apply_D where apply_D.isDone = '1' and " +
"apply_D.memberPK = ?) as apply_count " +
"from member_M " +
"where member_M.memberPK =? ";

// 저는요 Detail 에서 회원 태그 list
exports.musician_info_tag = "select * from memberTags_D " +
"where memberTags_D.memberPK =? " +
"and isnull(memberTags_D.isDel);";

// 저는요 Detail 에서 회원 포트폴리오 list
exports.musician_info_portfolio = "select * from memberPortfolio_D " +
"where memberPortfolio_D.memberPK =? " +
"and isnull(memberPortfolio_D.isDel);";




// 뮤지터 활동 list
exports.musician_fixapply = "select fixApply_D.*,recruit_M.*,categoryFirst_C.categoryFirstName,categorySecond_C.categorySecName,location_C.locationName,member_M.memberNickname " +
"from fixApply_D " +
"inner join recruit_M on " +
"recruit_M.recruitPK = fixApply_D.recruitPK " +
"inner join member_M on " +
"recruit_M.memberPK = member_M.memberPK " +
"inner join categoryFirst_C on " +
"recruit_M.categoryFirstPK = categoryFirst_C.categoryFirstPK " +
"inner join categorySecond_C on " +
"categorySecond_C.categorySecPK = recruit_M.categorySecPK " +
"inner join location_C on " +
"location_C.locationPK = recruit_M.locationPK " +
"where fixApply_D.memberPK=? and " +
"isnull(fixApply_D.isDone);";

exports.musician_fixapply_point = "select fixApplyPoint.*,afterPoint_C.afterPointName,fixApply_D.memberPK " +
"from fixApplyPoint " +
"inner join afterPoint_C on " +
"afterPoint_C.afterPointPK = fixApplyPoint.afterPointPK " +
"inner join fixApply_D on " +
"fixApply_D.recruitPK = fixApplyPoint.recruitPK and " +
"fixApply_D.applyPK = fixApplyPoint.applyPK " +
"where fixApply_D.memberPK = ? and isnull(fixApplyPoint.isDel);";



//////////////////////////////////////////////////////////////////////////////////////////////////////