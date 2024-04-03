package kr.or.iei.member.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;

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
import kr.or.iei.member.model.dto.Address;

import kr.or.iei.EmailSender;
import kr.or.iei.member.model.dto.Member;

import kr.or.iei.member.model.service.MemberService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")
@Tag(name="MEMBER", description = "MEMBER API")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private EmailSender emailSender;
	
	
	@Operation(summary = "이메일 중복체크", description = "매개변수로 전달한 이메일 사용 여부 조회")
	@ApiResponses({ // 응답에 대한 작성 설명할 떄
		@ApiResponse(responseCode = "200", description = "응답 message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생") })
	@PostMapping("/email/{memberEmail}")
	public ResponseEntity<ResponseDTO> verifEmail(@PathVariable String memberEmail){
		
		
		
		int duplicationEmail = memberService.selectOneEmail(memberEmail);
		
		
		
		
		if (duplicationEmail == 0) {

				ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "not duplication", null);
				return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
				
				

			} else {

				ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "duplication", null);
				return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());

			}
			
	
		
	}
	
	@Operation(summary = "이메일로 인증코드 발송", description = "매개변수로 전달한 이메일로 인증코드 발송")
	@ApiResponses({ // 응답에 대한 작성 설명할 떄
		@ApiResponse(responseCode = "200", description = "응답 message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생") })
	@PostMapping("/sendCode/{memberEmail}")
	public ResponseEntity<ResponseDTO> sendEmail(@PathVariable String memberEmail){
		
		String authCode = emailSender.sendCode(memberEmail);
		
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", authCode);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		
		
		
	}
	
	@Operation(summary = "아이디 중복체크", description = "매개변수로 전달한 아이디 사용 여부 조회")
	@ApiResponses({ // 응답에 대한 작성 설명할 떄
		@ApiResponse(responseCode = "200", description = "응답 message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생") })
	@PostMapping("/id/{memberId}")
	public ResponseEntity<ResponseDTO> selectOneId(@PathVariable String memberId){
		
		int duplicationId = memberService.selectOneId(memberId);
		
		if (duplicationId == 0) {

			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "not duplication", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
			
			

		} else {

			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "duplication", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());

		}
		
	}
	
	
	@Operation(summary = "닉네임 중복체크", description = "매개변수로 전달한 닉네임 사용 여부 조회")
	@ApiResponses({ // 응답에 대한 작성 설명할 떄
		@ApiResponse(responseCode = "200", description = "응답 message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생") })
	@PostMapping("/nickName/{memberNickName}")
	public ResponseEntity<ResponseDTO> selectOneNickName(@PathVariable String memberNickName){
		
		int duplicationNickName = memberService.selectOneNickName(memberNickName);
		
		if (duplicationNickName == 0) {

			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "not duplication", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
			
			

		} else {

			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "duplication", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());

		}
		
	}
	
	
	
	@Operation(summary = "회원가입", description = "회원 데이터를 입력 받아서 회원가입")
	@ApiResponses({ // 응답에 대한 작성 설명할 떄
	        @ApiResponse(responseCode = "200", description = "응답 message 값 확인"),
	        @ApiResponse(responseCode = "500", description = "서버 에러 발생") })
	@PostMapping("/join")
	public ResponseEntity<ResponseDTO> join(@RequestBody Member member){
	    
		System.out.println(member);
		
	    String bankName = member.getBankName();
	    String accountNumber = member.getMemberAccountnumber();
	    String depositorName = member.getDepositorName();
	    
	    String combinedAccountInfo = bankName + " " + accountNumber + " " + depositorName;
	    
	    
	    
	    member.setMemberAccountnumber(combinedAccountInfo);
	    
	    int result = memberService.join(member);
	    
	    
	    
	    if (result > 0) {

	        ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
	        return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());

	    } else {

	        ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
	        return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	    }
	} 
	
	@Operation(summary = "로그인", description = "회원 데이터를 입력 받아서 로그인")
	@ApiResponses({ // 응답에 대한 작성 설명할 떄
	        @ApiResponse(responseCode = "200", description = "응답 message 값 확인"),
	        @ApiResponse(responseCode = "500", description = "서버 에러 발생") })
	@PostMapping(value="/login")
	public ResponseEntity<ResponseDTO> login(@RequestBody Member member){
		
		String accessToken = memberService.login(member);
		
		
		if(accessToken != null) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", accessToken); //성공하면 토큰도 전달
	        return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
	        return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
		
		
	}

	
	@Operation(summary = "주소록 추가", description = "주소록에 새 주소 추가")
	@ApiResponses({
		@ApiResponse(responseCode = "200",description = "응답 데이터 중  message 값 확인"),
		@ApiResponse(responseCode = "500",description = "서버 에러 발생")
	})
	@PostMapping(value = "/address")
	public ResponseEntity<ResponseDTO> insertAddress(@RequestBody Address address){
		System.out.println(address);
		int result = memberService.insertAddress(address);
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
		Map map = memberService.selectAddress(memberNo,reqPage);
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
		int result = memberService.deleteAddress(addressNo);
		if(result>0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(500, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
	
	@Operation(summary = "기본배송지 변경", description = "주소록 목록에서 기본배송지 변경")
	@ApiResponses({
		@ApiResponse(responseCode = "200",description = "응답 데이터 중 message 값 확인"),
		@ApiResponse(responseCode = "500",description = "서버 에러 발생")
	})
	@PatchMapping(value="/basicAddress")
	public ResponseEntity<ResponseDTO> updateAddressDefault(@RequestBody Address address){
		int result = memberService.updateAddressDefault(address);
		if(result==1) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(500, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
	
	@Operation(summary = "주소록 수정", description = "주소록 목록 중 해당 주소 수정")
	@ApiResponses({
		@ApiResponse(responseCode = "200",description = "응답 데이터 중 message 값 확인"),
		@ApiResponse(responseCode = "500",description = "서버 에러 발생")
	})
	@PatchMapping(value="/address")
	public ResponseEntity<ResponseDTO> updateAddress(@RequestBody Address address){
		int result = memberService.updateAddress(address);
		if(result==1) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(500, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
	

	@Operation(summary = "좋아요 조회",description = "좋아요 전체 목록 조회")
	@ApiResponses({
		@ApiResponse(responseCode = "200",description = "응답 데이터 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생")
	})
	@GetMapping(value = "/likeList/{memberNo}")
	public ResponseEntity<ResponseDTO> selectLikeList(@PathVariable int memberNo){
		List list = memberService.selectLike(memberNo);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", list);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}

	
	@GetMapping
	public ResponseEntity<ResponseDTO> getMember(@RequestAttribute int memberNo){
		
		Member member = memberService.selectNo(memberNo);
		
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", member);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus()); 
		
		
		
	} 
	
	
	
	@GetMapping(value="/info")
	public ResponseEntity<ResponseDTO> memberInfo(@RequestAttribute int memberNo){
		
		Member member = memberService.getMemberInfo(memberNo);
		
		System.out.println(memberNo);
		
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", member);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		
		
		
	}
	
}
	
	
	








	
	
