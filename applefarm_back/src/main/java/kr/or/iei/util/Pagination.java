package kr.or.iei.util;

import org.springframework.stereotype.Component;

@Component
public class Pagination {
	public PageInfo getPageInfo
	(int reqPage, int numPerPage, int pageNaviSize, int totalCount) {
		int end = reqPage*numPerPage; //페이지 내 끝번호
		int start = end-numPerPage+1; //페이지 내 시작번호
		int totalPage = (int)Math.ceil(totalCount/(double)numPerPage); //전체 페이지 수
		int pageNo = ((reqPage-1)/pageNaviSize)*pageNaviSize + 1; //가장 왼쪽 페이지 번호
		PageInfo pi = new PageInfo(start, end, pageNo, pageNaviSize, totalPage);
		return pi;
	}
}
