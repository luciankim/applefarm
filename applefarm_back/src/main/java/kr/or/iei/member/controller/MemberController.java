package kr.or.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import kr.or.iei.member.model.service.MemberService;

@RestController
@RequestMapping(value="/member")
@Tag(name="MEMMER", description = "MEMBER API")
public class MemberController {

	@Autowired
	private MemberService memberSerivce;
	
	
	
	//@PostMapping("/email/{memberEmail}")
	
	
}
