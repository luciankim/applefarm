package kr.or.iei.common.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.common.model.dao.CommonDao;

@Service
public class CommonService {
	
	@Autowired
	private CommonDao commonDao;

}
