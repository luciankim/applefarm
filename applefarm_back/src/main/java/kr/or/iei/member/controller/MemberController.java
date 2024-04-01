package kr.or.iei.member.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.or.iei.ResponseDTO;
import kr.or.iei.member.model.dto.Address;
import kr.or.iei.member.model.service.MemberService;
import net.bytebuddy.build.Plugin.Engine.Summary;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")
@Tag(name="MEMBER", description = "MEMBER API")
public class MemberController {
	@Autowired
	private MemberService memberSerivce;
	
	@Operation(summary = "주소록 추가", description = "주소록에 새 주소 추가")
	@ApiResponses({
		@ApiResponse(responseCode = "200",description = "응답 데이터 중  message 값 확인"),
		@ApiResponse(responseCode = "500",description = "서버 에러 발생")
	})
	@PostMapping(value = "/address")
	public ResponseEntity<ResponseDTO> insertAddress(@RequestBody Address address){
		System.out.println(address);
		int result = memberSerivce.insertAddress(address);
		//System.out.println(result);
		if(result==1) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(500, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
			
	}
	
	@Operation(summary = "주소록 보기", description = "주소록 리스트 출력")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "응답 data 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생"),
	})
	@GetMapping(value = "/addressList/{memberNo}/{reqPage}")
	public ResponseEntity<ResponseDTO> selectAddress(@PathVariable int memberNo,@PathVariable int reqPage){
		Map map = memberSerivce.selectAddress(memberNo,reqPage);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	
	@Operation(summary = "주소 삭제", description = "주소록에 저장된 주소 삭제")
	@ApiResponses({
		@ApiResponse(responseCode = "200",description = "응답 데이터 중 message 값 확인"),
		@ApiResponse(responseCode = "500",description = "서버 에러 발생")
	})
	@DeleteMapping(value = "/address/{addressNo}") 
	public ResponseEntity<ResponseDTO> deleteAddress(@PathVariable int addressNo){
		int result = memberSerivce.deleteAddress(addressNo);
		if(result>0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(500, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
	
	@PatchMapping(value="/basicAddress")
	public ResponseEntity<ResponseDTO> updateAddressDefault(@RequestBody Address address){
		int result = memberSerivce.updateAddressDefault(address);
		if(result==1) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(500, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
}
