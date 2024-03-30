package kr.or.iei.member.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "address")
@Schema(description = "주소 객체")
public class Address {
	private int addressNo;
	private int member_no;
	private String zipcode;
	private String address;
	private String addressDetail;
	private String addressName;
	private String addressPhone;
	private String addressRequest;
	private int addressDefault;
}
