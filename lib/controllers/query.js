

// 공고글 list 가져오기 recruit_list
exports.recruit_list = "select Date(recruit_M.endDate)-Date(now()) as result_time " +
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





// 공고글 태그 list  recruit_tag
exports.recruit_tag = "select * from recruitTags_D where isnull(isDel);";