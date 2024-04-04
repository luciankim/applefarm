package kr.or.iei.product.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.or.iei.ResponseDTO;
import kr.or.iei.product.model.dto.Product;
import kr.or.iei.product.model.dto.ProductCategory;
import kr.or.iei.product.model.dto.ProductFile;
import kr.or.iei.product.model.service.ProductService;
import kr.or.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/product")
@Tag(name="PRODUCT", description = "PRODUCT API")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@Autowired
	private FileUtils fileUtils;
	
	
	@Value("${file.root}")
	private String root;
	
	@Operation(summary="제품군 조회", description = "제품군을 받아서 해당 제품군의 정보들을 제품별 메인으로 줌으로써 이용자가 특정 상품을 선택할 수 있도록 함")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생")
	})
	@PostMapping(value="/category")
	public ResponseEntity<ResponseDTO> productCategory(@RequestBody HashMap<String, String> categoryMap){
		//categoryMap = {"table" : "~~_tbl", "productLine" : "~~"}
		List list = productService.selectProductCategory(categoryMap);
		if(list.size()==0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", list);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@GetMapping(value = "/quality/{tableName}")
	public ResponseEntity<ResponseDTO> selectQualityList(@PathVariable String tableName){
		List list = productService.selectQualityList(tableName);
		
		if(list.size()==0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", list);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@PostMapping
	public ResponseEntity<ResponseDTO> insertProduct(@ModelAttribute Product product,@ModelAttribute MultipartFile thumbnail,@ModelAttribute MultipartFile[] productFile,@RequestAttribute int memberNo){
		//회원번호
		product.setMemberNo(memberNo);
		
		String savepath = root + "/product/";
		
		//썸네일
		if(thumbnail != null) {
			String filepath = fileUtils.upload(savepath, thumbnail);
			product.setProductThumbnail(filepath);
		}
		
		ArrayList<ProductFile> fileList = new ArrayList<ProductFile>();
		if(productFile != null) {
			for(MultipartFile file : productFile) {
				String filename = file.getOriginalFilename();
				String filepath = fileUtils.upload(savepath, file);
				ProductFile pf = new ProductFile();
				pf.setFilename(filename);
				pf.setFilepath(filepath);
				fileList.add(pf);
			}	
		}
		
		int result = productService.insertProduct(product,fileList); 
		
		if(result == 1+fileList.size()) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
			
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}

}
