package kr.or.iei.board.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.ResponseDTO;
import kr.or.iei.board.model.dto.Board;
import kr.or.iei.board.model.dto.BoardFile;
import kr.or.iei.board.model.service.BoardService;
import kr.or.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/board")
public class BoardController {
	@Autowired
	private BoardService boardService;
		
	@Autowired
	private FileUtils fileUtils;
	
	@Value("${file.root}")
	private String root;
	
	@GetMapping(value="/list/{reqPage}")
	public ResponseEntity<ResponseDTO> boardList(@PathVariable int reqPage){
		Map map = boardService.selectBoardList(reqPage);
		System.out.println("controoler" + map);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}
	
	
	@PostMapping(value="/editor")
	public ResponseEntity<ResponseDTO> editorUpload(@ModelAttribute MultipartFile image){
		String savepath = root + "/boardEditor/"; //에디터 이미지는 db에 저장안함
		String filename = image.getOriginalFilename();
		String filepath = fileUtils.upload(savepath, image);
		String returnPath = "/board/editor/"+filepath;
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", returnPath);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}
	
	@PostMapping
	public ResponseEntity<ResponseDTO> insertBoard(@ModelAttribute Board board, @ModelAttribute MultipartFile thumbnail, @ModelAttribute MultipartFile[] boardFile){
		//매개변수에 추가예정: @RequestAttribute int memberNo
		int memberNo = 1;
		board.setMemberNo(memberNo);
		String savepath = root + "/board/";
		if(thumbnail != null) {
			String filepath = fileUtils.upload(savepath, thumbnail);
			board.setBoardThumbnail(filepath);
		}
		ArrayList<BoardFile> fileList = new ArrayList<BoardFile>();
		if(boardFile != null) {
			for(MultipartFile file : boardFile) {
				String filename = file.getOriginalFilename();
				String filepath = fileUtils.upload(savepath, file);
				BoardFile bf = new BoardFile();
				bf.setFilename(filename);
				bf.setFilepath(filepath);
				fileList.add(bf);
			}
		}
		System.out.println("컨트롤러: " + board + "파일 : " + fileList);
		int result = boardService.insertBoard(board,fileList);
		if(result == 1 + fileList.size()) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
}

