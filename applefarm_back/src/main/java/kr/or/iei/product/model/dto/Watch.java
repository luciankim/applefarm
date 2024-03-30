package kr.or.iei.product.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="watch")
@Schema(description = "애플워치 객체")
public class Watch {

	//Watch_tbl
	private String ProductLine;
	private String WatchGen;
	private String WatchCase;
	private String WatchModel;
	private String WatchColor;
	private String WatchImage;
	private String WatchConnectivity;
	
	//Color_tbl
	private String ColorImage;
}
