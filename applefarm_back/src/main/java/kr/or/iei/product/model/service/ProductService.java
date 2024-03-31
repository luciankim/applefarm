package kr.or.iei.product.model.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.product.model.dao.ProductDao;
import kr.or.iei.product.model.dto.Product;
import kr.or.iei.product.model.dto.ProductCategory;

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
	
	
}
