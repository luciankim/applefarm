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
	private int ProductNo;
	private int MemberNo;
	private char ProductQuality;
	private String ProductTitle;
	private String ProductExplain;
	private int ProductPrice;
	private Date ProductDate;
	private char ProductHide;
	private String ProductLine;
	private String ProductGen;
	private String ProductModel;
	private String ProductColor;
	private String ProductModel2;
	private String ProductStorage;
	private String ProductMemory;
	private String ProductChip;
	private String ProductCpu;
	private String ProductGpu;
	private String ProductCase;
	private String ProductConnectivity;
	private String ProductCharge;
	private String ProductThumbnail;
	private String ProductSummary;
	
	//Color_tbl
	private String ColorImage;
}
