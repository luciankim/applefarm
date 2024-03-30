package kr.or.iei.product.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="Macbook")
@Schema(description = "맥북 객체")
public class Macbook {

	//Macbook_tbl
	private String ProductLine;
	private String MacbookGen;
	private String MacbookModel;
	private String MacbookModel2;
	private String MacbookColor;
	private String MacbookImage;
	private String MacbookStorage;
	private String MacbookMemory;
	private String MacbookChip;
	private String MacbookCpu;
	private String MacbookGpu;
	
	//Color_tbl
	private String ColorImage;
}
