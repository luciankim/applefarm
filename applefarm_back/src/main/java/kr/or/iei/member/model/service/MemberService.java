package kr.or.iei.member.model.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.member.model.dao.MemberDao;
import kr.or.iei.member.model.dto.Member;



@Service
public class MemberService {

	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder; 

		
		public int selectOneEmail(String memberEmail) {
			
			int duplicationEmail = memberDao.selectOneEmail(memberEmail);
			
			
			return duplicationEmail;
		}


		public int selectOneId(String memberId) {
			
			
			int duplicationId = memberDao.selectOneId(memberId);
			
			return duplicationId;
		}


		public int selectOneNickName(String memberNickName) {
			int duplicationNickName = memberDao.selectOneNickName(memberNickName);
			return duplicationNickName;
		}


		@Transactional
		public int join(Member member) {
			
			int result = memberDao.join(member);
					
			
			
			return result;
		}


		public Member login(Member member) {
			
			Member m = memberDao.selectId(member.getMemberId());
			
			if(m != null && bCryptPasswordEncoder.matches(member.getMemberPw(), m.getMemberPw())) {
				
				
				return m;
			}else {
				return null;
			}
			
			
			
		}
		
}
