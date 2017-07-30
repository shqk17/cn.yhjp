package yhjp.bll.userBll;

import org.springframework.beans.factory.annotation.Autowired;

import yhjp.bean.user.UserInfoBean;
import yhjp.bean.user.UserLocalAuthBean;
import yhjp.dao.userDao.UserInfoMapper;
import yhjp.dao.userDao.UserLocalAuthMapper;

public class UserBll {
	@Autowired
	private UserLocalAuthMapper userLocalAuthMapper;
	@Autowired
	private UserInfoMapper userInfoMapper;
	public UserLocalAuthBean selectByUserName(String userName) {
		return userLocalAuthMapper.selectByUserName(userName);
	}
	public UserInfoBean selectById(Integer userId) {
		return userInfoMapper.selectByPrimaryKey(userId);
	}

}
