package kr.or.iei.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kr.or.iei.admin.model.service.AdminService;

@Component
public class Scheduler {
	
	@Autowired
	private AdminService adminService;
	
	@Scheduled(fixedRate = 300000) //10초, miliseconds
	public void updateMembmerGrade() {
		System.out.println("-------------scheduling------------");
        adminService.blackTimeOut();
	}
}
