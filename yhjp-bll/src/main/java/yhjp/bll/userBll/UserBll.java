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
	public UserLocalAuthBean selectByUserName(String userName, Integer isActivate) {
		return userLocalAuthMapper.selectByUserName(userName,isActivate);
	}
	public UserInfoBean selectById(Integer userId) {
		return userInfoMapper.selectByPrimaryKey(userId);
	}
	public void insertUserLocalAuth(UserLocalAuthBean userLocalAuthBean) {
		userLocalAuthMapper.insertSelective(userLocalAuthBean);
	}
	public void insertUserInfo(UserInfoBean userInfoBean) {
		userInfoMapper.insertSelective(userInfoBean);
	}

}
