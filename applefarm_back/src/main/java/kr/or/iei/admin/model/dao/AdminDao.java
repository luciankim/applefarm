package kr.or.iei.admin.model.dao;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.admin.model.dto.AdminProduct;
import kr.or.iei.admin.model.dto.Refund;
import kr.or.iei.util.PageInfo;

@Mapper
public interface AdminDao {
	int totalCount(); 					//환불 건수 전체 조회
	List selectRefundList(PageInfo pi);
	int updateConfirmRefund(Refund refund);
	int updateConfirmTrade(Refund refund);
	int updateRejectRefund(Refund refund);
	int updateRejectTrade(Refund refund);
	int productTotalCount();
	List selectProductList(AdminProduct ap);


}
