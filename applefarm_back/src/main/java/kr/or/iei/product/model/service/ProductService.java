package kr.or.iei.product.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.admin.model.dto.AdminProduct;
import kr.or.iei.product.model.dao.ProductDao;
import kr.or.iei.product.model.dto.IpadQualityHistory;
import kr.or.iei.product.model.dto.IphoneQualityHistory;
import kr.or.iei.product.model.dto.MacbookQualityHistory;
import kr.or.iei.product.model.dto.Product;
import kr.or.iei.product.model.dto.ProductCategory;
import kr.or.iei.product.model.dto.ProductFile;
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




	




	


	
}
