package kr.or.iei.common.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.or.iei.ResponseDTO;
import kr.or.iei.common.model.service.CommonService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/common")
@Tag(name="COMMON", description = "COMMON API")
public class CommonController {
	
	@Autowired
	private CommonService commonService;
	
	@Operation(summary="모든 제품군 조회", description = "모든 제품군을 조회해서 네비게이션바에 표시할 데이터를 보냄")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생")
	})
	@GetMapping(value="/navi")
	public ResponseEntity<ResponseDTO> navi(){
		return null;
	}

}
