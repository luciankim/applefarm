package kr.or.iei.trade.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.trade.model.dto.Bid;
import kr.or.iei.trade.model.dto.Trade;

@Mapper
public interface TradeDao {

	int insertTrade(Trade trade);


	Trade selectDetailTrade(Trade t);

	
	Trade selectDetailSales(Trade t);
	

	int bidTotalCount(int memberNo, int status, String startDate, String endDate);

	
	List<Bid> selectBid(HashMap<String, Object> data);

	
	int tradeExistCount(Trade trade);

	
	int selectBidPrice(Trade trade);


	int deleteBid(int bidNo);


	int deleteTradeBook(int productNo);

	int updateBid(Bid bid);
}
