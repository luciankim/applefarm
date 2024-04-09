package kr.or.iei.product.model.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.admin.model.dto.AdminProduct;
import kr.or.iei.product.model.dao.ProductDao;
import kr.or.iei.product.model.dto.AirpodsQualityHistory;
import kr.or.iei.product.model.dto.IpadQualityHistory;
import kr.or.iei.product.model.dto.IphoneQualityHistory;
import kr.or.iei.product.model.dto.MacbookQualityHistory;
import kr.or.iei.product.model.dto.Product;
import kr.or.iei.product.model.dto.ProductAndMember;
import kr.or.iei.product.model.dto.ProductCategory;
import kr.or.iei.product.model.dto.ProductFile;
import kr.or.iei.product.model.dto.SellerReview;
import kr.or.iei.product.model.dto.WatchQualityHistory;
import kr.or.iei.util.PageInfo;

@Service
public class ProductService {

	@Autowired
	private ProductDao productDao;

	public List<ProductCategory> selectProductCategory(HashMap<String, String> categoryMap) {
		String table = categoryMap.get("table");
		String productLine = categoryMap.get("productLine");
		List list = productDao.selectProductCategory(table, productLine);
		return list;
	}
	
	public HashMap<String, Object> chart(Product product) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		List volume = productDao.volume(product);
		map.put("volume", volume);
		/*
		 	select * from product_tbl order by 1 desc;
			UPDATE PRODUCT_TBL SET PRODUCT_DATE = TO_DATE('2024/04/08 11:00:00', 'YYYY/MM/DD HH:MI:SS') WHERE PRODUCT_NO in (128, 129, 130);
			select * from member_tbl;
			select trade_reserve_date from trade_tbl;
			select trade_date from trade_tbl where trade_state != '환불';
			select trade_date from trade_tbl;
		 */
		return map;
	}

	public List selectQualityList(String tableName) {	
		return productDao.selectQualityList(tableName);
	}
	
	@Transactional
	public int insertProduct(Product product, ArrayList<ProductFile> fileList) {
		int result = productDao.insertProduct(product);
		for(ProductFile pf: fileList) {
			pf.setProductNo(product.getProductNo());
			result += productDao.insertProductFile(pf);
			
		}
		return result;
	}


	@Transactional
	public int insertIphone(Product product, ArrayList<ProductFile> fileList,IphoneQualityHistory iphoneQualityHistory) {
		
		int result1 = productDao.insertProduct(product);
		for(ProductFile pf: fileList) {
			pf.setProductNo(product.getProductNo());
			result1 += productDao.insertProductFile(pf);
		}
		
		iphoneQualityHistory.setProductNo(product.getProductNo());

		int result2 = productDao.insertIphoneQualityHistory(iphoneQualityHistory);
		
		
		return result1+result2;
	}

	@Transactional
	public int insertMacbook(Product product, ArrayList<ProductFile> fileList,
			MacbookQualityHistory macbookQualityHistory) {
		int result1 = productDao.insertProduct(product);
		for(ProductFile pf: fileList) {
			pf.setProductNo(product.getProductNo());
			result1 += productDao.insertProductFile(pf);
		}
		
		macbookQualityHistory.setProductNo(product.getProductNo());

		int result2 = productDao.insertMacbookQualityHistory(macbookQualityHistory);
		
		
		return result1+result2;
	}

	@Transactional
	public int insertIpad(Product product, ArrayList<ProductFile> fileList, IpadQualityHistory partObject) {
		int result1 = productDao.insertProduct(product);
		for(ProductFile pf: fileList) {
			pf.setProductNo(product.getProductNo());
			result1 += productDao.insertProductFile(pf);
		}
		
		partObject.setProductNo(product.getProductNo());

		int result2 = productDao.insertIpadQualityHistory(partObject);
		
		
		return result1+result2;
	}

	@Transactional
	public int insertWatch(Product product, ArrayList<ProductFile> fileList, WatchQualityHistory partObject) {
		
		int result1 = productDao.insertProduct(product);
		for(ProductFile pf: fileList) {
			pf.setProductNo(product.getProductNo());
			result1 += productDao.insertProductFile(pf);
		}
		
		partObject.setProductNo(product.getProductNo());

		int result2 = productDao.insertWatchQualityHistory(partObject);
		
		
		return result1+result2;
	}

	@Transactional
	public int insertAirpods(Product product, ArrayList<ProductFile> fileList, MacbookQualityHistory partObject) {
		int result1 = productDao.insertProduct(product);
		for(ProductFile pf: fileList) {
			pf.setProductNo(product.getProductNo());
			result1 += productDao.insertProductFile(pf);
		}
		
		partObject.setProductNo(product.getProductNo());

		int result2 = productDao.insertAirpodsQualityHistory(partObject);
		
		
		return result1+result2;
	}

//	public ProductAndMember selectOneView(int productNo,int memberNo) {
//		
//		return productDao.selectOneView(productNo,memberNo);
//	}
//
//	public List selectSellerReviews(int sellerNo) {
//		return productDao.selectSellerReviews(sellerNo);
//	}
//
//	public List selectSellerProducts(int sellerNo) {
//
//		return productDao.selectSellerProducts(sellerNo);
//	}
//
//	public IphoneQualityHistory selectIphoneQualityHistory(int productNo) {
//		
//		return productDao.selectIphoneQualityHistory(productNo);
//	}
//
//	public MacbookQualityHistory selectMacbookQualityHistory(int productNo) {
//		// TODO Auto-generated method stub
//		return productDao.selectMacbookQualityHistory(productNo);
//	}
//
//	public IpadQualityHistory selectIpadQualityHistory(int productNo) {
//		// TODO Auto-generated method stub
//		return productDao.selectIpadQualityHistory(productNo);
//	}
//
//	public WatchQualityHistory selectWatchQualityHistory(int productNo) {
//		// TODO Auto-generated method stub
//		return productDao.selectWatchQualityHistory(productNo);
//	}
//
//	public AirpodsQualityHistory selectAirpodsQualityHistory(int productNo) {
//		// TODO Auto-generated method stub
//		return productDao.selectAirpodsQualityHistory(productNo);
//	}
//
//	public List selectProductFiles(int productNo) {
//		
//		return productDao.selectProductFiles(productNo);
//	}
//
//	public List selectReliableProducts(String summary) {
//		return productDao.selectReliableProducts(summary);
//	}

	public HashMap<String, Object> selectOneProduct(int productNo, int memberNo) {
				//memberNo 접속자
				//sellerNo 판매자
				//productNo 상품
				//tableName 테이블 이름
		
				HashMap<String, Object> map = new HashMap<String, Object>();
				//상품 124번의 상품정보 & 회원정보
				ProductAndMember productAndMember= productDao.selectOneView(productNo,memberNo);
				map.put("productAndMember", productAndMember);
				
				int sellerNo = productAndMember.getMemberNo();
				String tableName = productAndMember.getTableName();
				String summary = productAndMember.getProductSummary();
				
				//판매자(member_no=45)에 대한 후기 리스트
				List sellerReviewList = productDao.selectSellerReviews(sellerNo);
				map.put("sellerReviewList",sellerReviewList);
				
				//판매자(member_no=45)의 상품 리스트
				List sellerProductList = productDao.selectSellerProducts(sellerNo);
				map.put("sellerProductList",sellerProductList);
				
				//상품 124번의 첨부파일 리스트(file_no, file_path가 필요)
				List productFileList = productDao.selectProductFiles(productNo);
				map.put("productFileList",productFileList);
				
				//상품 124번의 품질(테이블 별로 다르게)
				switch (tableName) {
				case "IPHONE_TBL" :
					map.put("qualityHistory", productDao.selectIphoneQualityHistory(productNo));
					break;
				case "MACBOOK_TBL" :
					map.put("qualityHistory", productDao.selectMacbookQualityHistory(productNo));
					break;
				case "IPAD_TBL" :
					map.put("qualityHistory", productDao.selectIpadQualityHistory(productNo));
					break;
				case "WATCH_TBL" :
					map.put("qualityHistory", productDao.selectWatchQualityHistory(productNo));
					break;
				case "AIRPODS_TBL" :
					map.put("qualityHistory", productDao.selectAirpodsQualityHistory(productNo));
					break;
				default :
					break;
				}
				/*
				if(tableName.equals("IPHONE_TBL")) {
					IphoneQualityHistory qualityHistory = productDao.selectIphoneQualityHistory(productNo);
					map.put("qualityHistory",qualityHistory);
				}else if(tableName.equals("MACBOOK_TBL")) {
					MacbookQualityHistory qualityHistory = productDao.selectMacbookQualityHistory(productNo);
					map.put("qualityHistory",qualityHistory);
				}else if(tableName.equals("IPAD_TBL")) {
					IpadQualityHistory qualityHistory = productDao.selectIpadQualityHistory(productNo);
					map.put("qualityHistory",qualityHistory);
				}else if(tableName.equals("WATCH_TBL")) {
					WatchQualityHistory qualityHistory = productDao.selectWatchQualityHistory(productNo);
					map.put("qualityHistory",qualityHistory);
				}else if(tableName.equals("AIRPODS_TBL")) {
					AirpodsQualityHistory qualityHistory = productDao.selectAirpodsQualityHistory(productNo);
					map.put("qualityHistory",qualityHistory);
				}
				*/
				
				//신뢰도 높은 상품 리스트
				List reliableProductList = productDao.selectReliableProducts(summary);
				map.put("reliableProductList",reliableProductList);
				return map;
	}




	




	


	
}
