package kr.or.iei.product.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.product.model.dto.Product;
import kr.or.iei.product.model.dto.ProductFile;

@Mapper
public interface ProductDao {

	List selectProductCategory(String table, String productLine);

	List selectQualityList(String tableName);

	int insertProduct(Product product);

	int insertProductFile(ProductFile pf);
	
	
	
}