package kr.or.iei.product.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("productAndMember")
public class ProductAndMember {
	private int productNo;
	private int memberNo;
	private String productQuality;
	private String productTitle;
	private String productExplain;
	private String productDate;
	private String productHide;
	private String productLine;
	private String productGen;
	private String productModel;
	private String productModel2;
	private String productColor;
	private String productStorage;
	private String productMemory;
	private String productChip;
	private String productCpu;
	private String productSize;
	private String productConnectivity;
	private String productCharge;
	private String productThumbnail;
	private String productSummary;
	private String tableName;
	private int likeCount;
	private int likeBoolean;
}
