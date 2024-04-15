package kr.or.iei.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kr.or.iei.admin.model.service.AdminService;

@Component
public class Scheduler {
	
	@Autowired
	private AdminService adminService;
	
	@Scheduled(fixedRate = 60000) // miliseconds
	public void updateMembmerGrade() {
        adminService.blackTimeOut();
	}
	
	
}
