package kr.or.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.or.iei.EmailSender;
import kr.or.iei.ResponseDTO;
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

	
	
	
}
	
	
	
	
	
