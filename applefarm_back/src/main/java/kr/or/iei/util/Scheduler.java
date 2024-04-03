package kr.or.iei.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kr.or.iei.member.model.service.MemberService;

@Component
public class Scheduler {
	
	@Autowired
	private MemberService memberService;
	
	@Scheduled(fixedRate = 180000) //180초, miliseconds
	public void updateMembmerGrade() {
		int reqPage = 1;
		System.out.println("스케쥴링 진행중");
		
        memberService.selectMemberList(reqPage);
        
	}
	
}
