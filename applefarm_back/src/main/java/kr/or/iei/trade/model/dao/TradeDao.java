package kr.or.iei.trade.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.trade.model.dto.Trade;

@Mapper
public interface TradeDao {

	int insertTrade(Trade trade);

}
