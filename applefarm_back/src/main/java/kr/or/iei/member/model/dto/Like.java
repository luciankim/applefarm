package kr.or.iei.member.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "like")
public class Like {
	private int likeNo;
	private int memberNo;
	private int productNo;
	private String productSummary;
	private String ProductQuality;
	private String productThumbnail;
	private String memberNickName;
	private int productPrice;

}
