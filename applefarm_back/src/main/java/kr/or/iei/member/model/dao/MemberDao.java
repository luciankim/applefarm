package kr.or.iei.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.member.model.dto.Member;

@Mapper
public interface MemberDao {

	int selectOneEmail(String memberEmail);

	int selectOneId(String memberId);

	int selectOneNickName(String memberNickName);

	int join(Member member);



	
}
