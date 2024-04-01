package kr.or.iei.member.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.member.model.dto.Address;

@Mapper
public interface MemberDao {

	int insertAddress(Address address);

	int updateAddressDefault(int memberNo);

	int selectAddressCount(int memberNo);

	List selectAddress(int memberNo);

	Address selectAddressBasic(int memberNo);

	int addressNoBasicTotalCount(int memberNo);

	List selectAddressList(HashMap<String, Object> data);

	int deleteAddress(int addressNo);

	int updateAddressDefault1(int addressNo);

	
}
