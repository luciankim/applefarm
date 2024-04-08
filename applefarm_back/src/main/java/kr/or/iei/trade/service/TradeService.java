package kr.or.iei.trade.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.trade.model.dao.TradeDao;
import kr.or.iei.trade.model.dto.Trade;

@Service
public class TradeService {
	@Autowired
	private TradeDao tradeDao;
	@Transactional
	public int insertTrade(Trade trade) {
		return tradeDao.insertTrade(trade);
	}
	public int selectExistTrade(int productNo) {
		return tradeDao.selectExistTrade(productNo);
	}
	public Trade selectDetailTrade(Trade t) {
		return tradeDao.selectDetailTrade(t);
	}
	public Trade selectDetailSales(Trade t) {
		return tradeDao.selectDetailSales(t);
	}
	
}
