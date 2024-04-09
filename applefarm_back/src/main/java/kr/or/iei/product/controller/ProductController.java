package kr.or.iei.product.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.or.iei.ResponseDTO;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.product.model.dto.AirpodsQualityHistory;
import kr.or.iei.product.model.dto.IpadQualityHistory;
import kr.or.iei.product.model.dto.IphoneQualityHistory;
import kr.or.iei.product.model.dto.MacbookQualityHistory;
import kr.or.iei.product.model.dto.Product;
import kr.or.iei.product.model.dto.ProductCategory;
import kr.or.iei.product.model.dto.ProductFile;
import kr.or.iei.product.model.dto.SellerReview;
import kr.or.iei.product.model.dto.WatchQualityHistory;
import kr.or.iei.product.model.service.ProductService;
import kr.or.iei.util.FileUtils;
import kr.or.iei.util.JwtUtil;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/product")
@Tag(name="PRODUCT", description = "PRODUCT API")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	@Autowired
	private FileUtils fileUtils;
	@Autowired
	private JwtUtil jwtUtil;
	
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
	
	@Operation(summary="시세 차트", description = "선택한 제품 카테고리의 기간 단위별 거래량 및 거래금액을 보여줌")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생")
	})
	@PostMapping(value="/chart")
	public ResponseEntity<ResponseDTO> chart(@RequestBody Product product){
		HashMap<String, Object> map = productService.chart(product);
		return null;
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
	
	@PostMapping(value = "/iphone")
	public ResponseEntity<ResponseDTO> insertIphone(@ModelAttribute Product product,@ModelAttribute IphoneQualityHistory partObject,@ModelAttribute MultipartFile thumbnail,@ModelAttribute MultipartFile[] productFile,@RequestAttribute int memberNo){
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
		
		int result = productService.insertIphone(product,fileList,partObject); 
		
		if(result == 2+fileList.size()) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", product.getProductNo());
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
			
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	
	
	@PostMapping(value = "/macbook")
	public ResponseEntity<ResponseDTO> insertMacbook(@ModelAttribute Product product,@ModelAttribute MacbookQualityHistory partObject,@ModelAttribute MultipartFile thumbnail,@ModelAttribute MultipartFile[] productFile,@RequestAttribute int memberNo){

		System.out.println(product);
		System.out.println(partObject);
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
		
		int result = productService.insertMacbook(product,fileList,partObject); 
		
		if(result == 2+fileList.size()) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
			
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@PostMapping(value = "/ipad")
	public ResponseEntity<ResponseDTO> insertIpad(@ModelAttribute Product product,@ModelAttribute IpadQualityHistory partObject,@ModelAttribute MultipartFile thumbnail,@ModelAttribute MultipartFile[] productFile,@RequestAttribute int memberNo){

		System.out.println(product);
		System.out.println(partObject);
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
		
		int result = productService.insertIpad(product,fileList,partObject); 
		
		if(result == 2+fileList.size()) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
			
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@PostMapping(value = "/watch")
	public ResponseEntity<ResponseDTO> insertWatch(@ModelAttribute Product product,@ModelAttribute WatchQualityHistory partObject,@ModelAttribute MultipartFile thumbnail,@ModelAttribute MultipartFile[] productFile,@RequestAttribute int memberNo){

		System.out.println(product);
		System.out.println(partObject);
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
		
		int result = productService.insertWatch(product,fileList,partObject); 
		
		if(result == 2+fileList.size()) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
			
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@PostMapping(value = "/airpods")
	public ResponseEntity<ResponseDTO> insertAirpods(@ModelAttribute Product product,@ModelAttribute MacbookQualityHistory partObject,@ModelAttribute MultipartFile thumbnail,@ModelAttribute MultipartFile[] productFile,@RequestAttribute int memberNo){

		System.out.println(product);
		System.out.println(partObject);
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
		
		int result = productService.insertAirpods(product,fileList,partObject); 
		
		if(result == 2+fileList.size()) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
			
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@Operation(summary="좋아요 눌렀는지 체크", description = "로그인 한 이용자가 해당 상품에 좋아요를 눌렀는지를 0 또는 1로 알려줌")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생")
	})
	@GetMapping(value="/likeBoolean/{productNo}")
	public ResponseEntity<ResponseDTO> likeBoolean(@PathVariable int productNo, @RequestAttribute int memberNo){
		int likeBoolean = productService.likeBoolean(productNo, memberNo);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", likeBoolean);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}
	
	@Operation(summary="판매상품 상세페이지")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생")
	})
	@GetMapping(value = "/detail/{productNo}")
	public ResponseEntity<ResponseDTO> selectOneView(@PathVariable int productNo){
		HashMap<String, Object> map = productService.selectOneProduct(productNo);
		/* map.key
		 * product
		 * sellerReviewList
		 * sellerProductList
		 * productFileList
		 * qualityHistory
		 * reliableProductList
		 */
		if(map.size()==6) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@Operation(summary="좋아요 추가", description = "상품상세페이지에서 이용자가 그 상품에 대해 좋아요를 추가하지 않은 상태에서 좋아요버튼 클릭시 동작")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생")
	})
	@PostMapping(value = "/like")
	public ResponseEntity<ResponseDTO> insertLike(@RequestBody Map<String, Integer> map,@RequestAttribute int memberNo){
		int productNo = map.get("productNo");
		int result = productService.insertLike(productNo, memberNo);
		if(result > 0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@Operation(summary="좋아요 삭제", description = "상품상세페이지에서 이용자가 그 상품에 대해 이미 좋아요를 추가한 상태에서 좋아요버튼 클릭시 동작")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생")
	})
	@DeleteMapping(value = "/like/{productNo}")
	public ResponseEntity<ResponseDTO> deleteLike(@PathVariable int productNo,@RequestAttribute int memberNo){;
		int result = productService.deleteLike(productNo, memberNo);
		if(result > 0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@Operation(summary="상품 판매글 삭제", description = "판매글 작성자가 해당 글 삭제시 게시물을 숨김처리")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러 발생")
	})
	@PatchMapping(value = "/hide")
	public ResponseEntity<ResponseDTO> hideProduct(@RequestBody Map<String, Integer> map){
		int productNo = map.get("productNo");
		int result = productService.hideProduct(productNo);
		if(result > 0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
}
