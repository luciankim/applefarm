package kr.or.iei.trade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.or.iei.ResponseDTO;
import kr.or.iei.trade.model.dto.Trade;
import kr.or.iei.trade.service.TradeService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/trade")
@Tag(name="TRADE", description = "TRADE API")
public class TradeController {
	@Autowired
	private TradeService tradeService;
	
	@Operation(summary = "결제완료",description = "상품 결제 후 거래내역 생성")
	@ApiResponses({
		@ApiResponse(responseCode = "200",description = "응답 데이터 중  message 확인"),
		@ApiResponse(responseCode = "500",description = "서버 에러 발생")
	})
	@PostMapping
	public ResponseEntity<ResponseDTO> insertTrade(@RequestBody Trade trade,@RequestAttribute int memberNo){
		trade.setTradeBuyer(memberNo);
		System.out.println(trade);
		int result = tradeService.insertTrade(trade);
		if(result>0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
	@Operation(summary = "판매 유무",description = "거래되었는지 조회")
	@ApiResponses({
		@ApiResponse(responseCode = "200",description = "응답 데이터 중  message 확인"),
		@ApiResponse(responseCode = "500",description = "서버 에러 발생")
	})
	@GetMapping(value = "/exist/{productNo}")
	public ResponseEntity<ResponseDTO> selectExistTrade(@PathVariable int productNo){
		int result = tradeService.selectExistTrade(productNo);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", result);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	@Operation(summary = "구매 거래 내역 상세",description = "구매 거래 관련 정보 상세 보기")
	@ApiResponses({
		@ApiResponse(responseCode = "200",description = "응답 데이터 확인"),
		@ApiResponse(responseCode = "500",description = "서버 에러 발생")
	})
	@GetMapping(value = "/detailOrder/{productNo}")
	public ResponseEntity<ResponseDTO> selectDetailOrder(@PathVariable int productNo, @RequestAttribute int memberNo){
		Trade t = new Trade();
		t.setProductNo(productNo);
		t.setTradeBuyer(memberNo);
		Trade trade = tradeService.selectDetailTrade(t);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", trade);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	@Operation(summary = "판매 거래 내역 상세",description = "판매 거래 관련 정보 상세 보기")
	@ApiResponses({
		@ApiResponse(responseCode = "200",description = "응답 데이터 확인"),
		@ApiResponse(responseCode = "500",description = "서버 에러 발생")
	})
	@GetMapping(value = "/detailSales/{productNo}")
	public ResponseEntity<ResponseDTO> selectDetailSales(@PathVariable int productNo, @RequestAttribute int memberNo){
		Trade t = new Trade();
		t.setProductNo(productNo);
		t.setTradeSeller(memberNo);
		Trade trade = tradeService.selectDetailSales(t);
		System.out.println(trade);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", trade);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
}
