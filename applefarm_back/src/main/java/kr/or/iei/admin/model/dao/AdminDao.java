package kr.or.iei.admin.model.dao;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.admin.model.dto.AdminProduct;
import kr.or.iei.admin.model.dto.Refund;
import kr.or.iei.admin.model.dto.Report;
import kr.or.iei.util.PageInfo;

@Mapper
public interface AdminDao {
	int totalCount(int selectedValue); 					//환불 건수 전체 조회
	List selectRefundList(Refund rf);
	int updateConfirmRefund(Refund refund);
	int updateConfirmTrade(Refund refund);
	int updateRejectRefund(Refund refund);
	int updateRejectTrade(Refund refund);
	int productTotalCount(AdminProduct ap);
	List selectProductList(AdminProduct ap);
	int updateHide(List<Object> values);
	int updateUnHide(List<Object> values);
	List selectReportList(Report rp);
	int changeReportStatus(Report report);
	int hidePost(Report report);
	int blackMember(Report report);
	int reportTotalCount(int selectedValue);


}
