package kr.or.iei.admin.model.service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.admin.model.dao.AdminDao;
import kr.or.iei.admin.model.dto.AdminProduct;
import kr.or.iei.admin.model.dto.Refund;
import kr.or.iei.util.PageInfo;
import kr.or.iei.util.PagiNation;

@Service
public class AdminService {
	@Autowired
	private AdminDao adminDao;

	@Autowired
	private PagiNation pagination;
	
	public Map selectRefundList(int reqPage) {
		int numPerPage = 10; 					//한 페이지당 게시물 수
		int pageNaviSize = 5; 					//페이지 네비게이션 길이
		int totalCount = adminDao.totalCount(); //전체 게시물 수(전체 페이지 수 계산을 위함)
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount); 	//페이징 처리에 필요한 값을 계산해서 객체로 리턴받음
		List list = adminDao.selectRefundList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("totalPostCount", totalCount);
		map.put("refundList", list);
		map.put("pi", pi);
		return map;
	}


	@Transactional
	public int confirmRefund(Refund refund) {
		int result = adminDao.updateConfirmRefund(refund);
		result += adminDao.updateConfirmTrade(refund);
		return result;
	}

	@Transactional
	public int rejectRefund(Refund refund) {
		int result = adminDao.updateRejectRefund(refund);
		result += adminDao.updateRejectTrade(refund);
		return 0;
	}
	
	
	
	
	public Map selectProductList(String selectedValue, String filterStartDate, String filterEndDate, int reqPage) {
		int numPerPage = 10; //한페이지당 게시물 수
		int pageNaviSize = 5; //페이지 네비게이션 길이
		int totalCount = adminDao.productTotalCount(); //전체 게시물 수(전체 페이지 수 계산을 위함)
		//페이징 처리에 필요한 값을 계산해서 객체로 리턴받음
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		
		AdminProduct ap = new AdminProduct();
		ap.setFilterStartDate(filterStartDate);
		ap.setFilterEndDate(filterEndDate);
		ap.setSelectedValue(selectedValue);
		List list = adminDao.selectProductList(ap);
		HashMap<String, Object> map = new HashMap<String, Object>();
		//날짜를 YYYY-MM-DD로 변경	
		map.put("adminProductList", list);
		map.put("pi", pi);
		map.put("totalCount", totalCount);
		return map;
	}


    @Transactional
    public int changeIntoHide(HashMap<String, Object> checkedObject) {
        List<Object> values = new ArrayList(checkedObject.values());
        return adminDao.updateHide(values);
    }


    @Transactional
	public int changeIntoUnHide(HashMap<String, Object> checkedObject) {
        List<Object> values = new ArrayList(checkedObject.values());
		return adminDao.updateUnHide(values);
	}
}


