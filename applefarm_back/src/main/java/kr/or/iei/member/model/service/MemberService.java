package kr.or.iei.member.model.service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.member.model.dao.MemberDao;
import kr.or.iei.member.model.dto.Address;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.util.PageInfo;
import kr.or.iei.util.PagiNation;

@Service
public class MemberService {
		@Autowired
		private MemberDao memberDao;
		@Autowired
		private PagiNation pagination;
		
		@Transactional
		public int insertAddress(Address address) {
			int result = 0;
			int memberNo = address.getMemberNo();
			int count = memberDao.selectAddressCount(memberNo);
			if(count == 0) {
				address.setAddressDefault(1);
			}else {
				if(address.getAddressDefault()==1) {
					result += memberDao.updateAddressDefault(memberNo);
					result -= count;
				}
			}
			result += memberDao.insertAddress(address);
			return result;
		}

		public Map selectAddress(int memberNo,int reqPage) {
			//전체 배송지 리스트(기본배송지+나머지 배송지들)
			ArrayList<Address> list = new ArrayList<Address>();
			//기본배송지
			Address basicAddress = memberDao.selectAddressBasic(memberNo);
			list.add(basicAddress);
			//기본배송지 제외한 배송지 리스트
			int numPerPage = 3;	//페이지당 행 수 -> 성공 후 수정
			int pageNaviSize = 5;
			int totalCount = memberDao.addressNoBasicTotalCount(memberNo);
			PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			HashMap<String, Object> data = new HashMap<String, Object>();
			data.put("memberNo", memberNo);
			data.put("start", pi.getStart());
			data.put("end", pi.getEnd());
			List<Address> addressList = memberDao.selectAddressList(data);
			if(!addressList.isEmpty()) {
				for (Address a : addressList) {
					list.add(a);
				}
			}
			HashMap<String, Object> map  = new HashMap<String, Object>();
			map.put("addressList",list);
			map.put("pi", pi);
			return map;
		}
		
		@Transactional
		public int deleteAddress(int addressNo) {
			return memberDao.deleteAddress(addressNo);
		}
		
		@Transactional
		public int updateAddressDefault(Address address) {
			int result = memberDao.updateAddressDefault(address.getMemberNo());
			result -= memberDao.selectAddressCount(address.getMemberNo());
			result+= memberDao.updateAddressDefault1(address.getAddressNo());
			return result;
		}
		
		public int selectOneEmail(String memberEmail) {
			
			int duplicationEmail = memberDao.selectOneEmail(memberEmail);
			
			
			return duplicationEmail;
		}


		public int selectOneId(String memberId) {
			
			
			int duplicationId = memberDao.selectOneId(memberId);
			
			return duplicationId;
		}


		public int selectOneNickName(String memberNickName) {
			int duplicationNickName = memberDao.selectOneNickName(memberNickName);
			return duplicationNickName;
		}


		@Transactional
		public int join(Member member) {
			
			int result = memberDao.join(member);
					
			
			return result;
		}
		
}
