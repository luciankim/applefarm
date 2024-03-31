package kr.or.iei.product.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductDao {

	List selectProductCategory(String table, String productLine);
	
	
	
}