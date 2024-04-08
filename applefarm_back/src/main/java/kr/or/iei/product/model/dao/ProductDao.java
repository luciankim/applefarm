package kr.or.iei.product.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.product.model.dto.AirpodsQualityHistory;
import kr.or.iei.product.model.dto.IpadQualityHistory;
import kr.or.iei.product.model.dto.IphoneQualityHistory;
import kr.or.iei.product.model.dto.MacbookQualityHistory;
import kr.or.iei.product.model.dto.Product;
import kr.or.iei.product.model.dto.ProductAndMember;
import kr.or.iei.product.model.dto.ProductFile;
import kr.or.iei.product.model.dto.SellerReview;
import kr.or.iei.product.model.dto.WatchQualityHistory;


@Mapper
public interface ProductDao {

	List selectProductCategory(String table, String productLine);

	List selectQualityList(String tableName);


	Product selectOneProduct(int productNo);

	int insertProduct(Product product);

	int insertProductFile(ProductFile pf);


	int insertIphoneQualityHistory(IphoneQualityHistory iphoneQualityHistory);

	int insertMacbookQualityHistory(MacbookQualityHistory macbookQualityHistory);

	int insertIpadQualityHistory(IpadQualityHistory partObject);

	int insertWatchQualityHistory(WatchQualityHistory partObject);

	int insertAirpodsQualityHistory(MacbookQualityHistory partObject);

	//ProductDetail.js
	ProductAndMember selectOneView(int productNo,int memberNo);

	List selectSellerReviews(int productNo);

	List selectSellerProducts(int sellerNo);

	List selectProductFiles(int productNo);

	IphoneQualityHistory selectIphoneQualityHistory(int productNo);

	MacbookQualityHistory selectMacbookQualityHistory(int productNo);

	IpadQualityHistory selectIpadQualityHistory(int productNo);

	WatchQualityHistory selectWatchQualityHistory(int productNo);

	AirpodsQualityHistory selectAirpodsQualityHistory(int productNo);

	List selectReliableProducts(String summary);

}