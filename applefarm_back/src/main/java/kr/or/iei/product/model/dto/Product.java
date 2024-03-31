package kr.or.iei.product.model.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="product")
@Schema(description = "판매상품 객체")
public class Product {

	//Product_tbl
	private int productNo;
	private int memberNo;
	private char productQuality;
	private String productTitle;
	private String productExplain;
	private int productPrice;
	private Date productDate;
	private char productHide;
	private String productLine;
	private String productGen;
	private String productModel;
	private String productModel2;
	private String productColor;
	private String productStorage;
	private String productMemory;
	private String productChip;
	private String productCpu;
	private String productGpu;
	private String productSize;
	private String productConnectivity;
	private String productCharge;
	private String productThumbnail;
	private String productSummary;
}
