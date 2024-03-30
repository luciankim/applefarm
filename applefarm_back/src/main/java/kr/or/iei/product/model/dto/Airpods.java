package kr.or.iei.product.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="airpods")
@Schema(description = "에어팟 객체")
public class Airpods {
	
	//Airpods_tbl
	private String ProductLine;
	private String AirpodsGen;
	private String AirpodsColor;
	private String AirpodsImage;
	private String AirpodsCharge;
	
	//Color_tbl
	private String ColorImage;
}
