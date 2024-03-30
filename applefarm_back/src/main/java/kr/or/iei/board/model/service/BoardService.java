package kr.or.iei.board.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.board.model.dao.BoardDao;
import kr.or.iei.board.model.dto.Board;
import kr.or.iei.board.model.dto.BoardFile;
import kr.or.iei.util.PageInfo;
import kr.or.iei.util.PagiNation;


@Service
public class BoardService {
	@Autowired
	private BoardDao boardDao;

	@Autowired
	private PagiNation pagination;
	
	public Map selectBoardList(int reqPage) {
		int numPerPage = 10; //한페이지당 게시물 수
		int pageNaviSize = 5; //페이지 네비게이션 길이
		int totalCount = boardDao.totalCount(); //전체 게시물 수(전체 페이지 수 계산을 위함)
		//페이징 처리에 필요한 값을 계산해서 객체로 리턴받음
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		System.out.println("service: " + pi);
		List list = boardDao.selectBoardList(pi);
		int totalPostCount = boardDao.selectCount();
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("totalPostCount", totalCount);
		map.put("boardList", list);
		map.put("pi", pi);
		return map;
	}

	@Transactional
	public int insertBoard(Board board, ArrayList<BoardFile> fileList) {
		int  result = boardDao.insertBoard(board);
		for(BoardFile bf : fileList) {
			bf.setBoardNo(board.getBoardNo());
			result += boardDao.insertBoardFile(bf);
		}
			
		return result;
	}

	public Board selectOneBoard(int boardNo) {
		Board board = boardDao.selectOneBoard(boardNo);
		List list = boardDao.selectOneBoardFileList(boardNo);
		board.setFileList(list);
		return board;
	}
}
