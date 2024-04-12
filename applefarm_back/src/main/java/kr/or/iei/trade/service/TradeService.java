package kr.or.iei.trade.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.trade.model.dao.TradeDao;
import kr.or.iei.trade.model.dto.Bid;
import kr.or.iei.trade.model.dto.Trade;
import kr.or.iei.util.PageInfo;
import kr.or.iei.util.PagiNation;

@Service
public class TradeService {
	@Autowired
	private TradeDao tradeDao;
	@Autowired
	private PagiNation pagination;
	@Transactional
	public int insertTrade(Trade trade) {
		return tradeDao.insertTrade(trade);
	}
	public int selectExistTrade(Trade trade) {
		return tradeDao.tradeExistCount(trade);
	}
	public Trade selectDetailTrade(Trade t) {
		return tradeDao.selectDetailTrade(t);
	}
	public Trade selectDetailSales(Trade t) {
		return tradeDao.selectDetailSales(t);
	}
	public Map selectBid(int memberNo, int status, int reqPage, String startDate, String endDate) {
		int numPerPage = 10; // 페이지당 행 수 -> 성공 후 수정
		int pageNaviSize = 5;
		int totalCount = tradeDao.bidTotalCount(memberNo,status,startDate,endDate);
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put("memberNo", memberNo);
		data.put("start", pi.getStart());
		data.put("end", pi.getEnd());
		data.put("status",status);
		data.put("startDate",startDate);
		data.put("endDate",endDate);
		List<Bid> bidList = tradeDao.selectBid(data);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("bidList", bidList);
		map.put("pi", pi);
		return map;
	}

	public int deleteBid(int bidNo, int productNo, int tradeBook) {
		int result=0;
		result+=tradeDao.deleteBid(bidNo);
		if(tradeBook==1) {
			//예약 취소시 거래테이블 내에서도 삭제
			result+=tradeDao.deleteTradeBook(productNo);
			result-=1;
		}
		return result;
	}
}
