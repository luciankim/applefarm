package kr.or.iei.product.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "productCategory")
@Schema(description = "제품카테고리 객체")
public class ProductCategory {

	//Product_tbl
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
