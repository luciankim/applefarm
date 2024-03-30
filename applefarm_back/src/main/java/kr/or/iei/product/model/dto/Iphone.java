package kr.or.iei.product.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="iPhone")
@Schema(description = "아이폰 객체")
public class Iphone {

	//Iphone_tbl
	private String ProductLine;
	private String ProductGen;
	private String ProductModel;
	private String ProductColor;
	private String ProductImage;
	private String ProductStorage;
	
	//Color_tbl
	private String ColorImage;
}
