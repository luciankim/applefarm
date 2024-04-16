package kr.or.iei.util;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kr.or.iei.admin.model.service.AdminService;
import kr.or.iei.trade.model.dto.Trade;
import kr.or.iei.trade.service.TradeService;

@Component
public class Scheduler {
	
	@Autowired
	private AdminService adminService;
	@Autowired
	private TradeService tradeService;

	@Scheduled(fixedRate = 60000) // miliseconds
	public void updateMembmerGrade() {
        adminService.blackTimeOut();
	}
	
	//배송완료 후 7일 이후자동 구매확정
	//@Scheduled(cron="10 * * * * *")	//테스트용으로 매분 10초마다 실행중
	@Scheduled(cron="0 0 0 * * *")	//매일 00시에 실행
	public void scheduledPurchase() {
		tradeService.scheduledPurchase();//예약작업추가예정
	}
	
	@Scheduled(cron="0 * * * * *")	//1분마다 실행
	public void scheduledDelivery() {
		tradeService.selectDelivery();
		
	}
	
	
}
