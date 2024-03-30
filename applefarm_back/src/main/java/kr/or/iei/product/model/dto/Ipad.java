package kr.or.iei.product.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="ipad")
@Schema(description = "아이패드 객체")
public class Ipad {

	//Ipad_tbl
	private String ProductLine;
	private String IpadGen;
	private String IpadColor;
	private String IpadImage;
	private String IpadStorage;
	private String IpadConnectivity;
	
	//Color_tbl
	private String ColorImage;
}
