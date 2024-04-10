package kr.or.iei.trade.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "bid")
@Schema(description = "매수호가(입찰) 객체")
public class Bid {

	private int bidNo;
	private int productNo;
	private int memberNo;
	private int bidPrice;
	private String bidDate; //Date타입 말고 String으로 했습니다!!!
}
