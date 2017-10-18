package yhjp.bll.userBll;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import yhjp.bean.user.UserInfoBean;
import yhjp.bean.user.UserLocalAuthBean;
import yhjp.dao.userDao.UserInfoMapper;
import yhjp.dao.userDao.UserLocalAuthMapper;
@Component
public class UserBll {
	@Autowired
	private UserLocalAuthMapper userLocalAuthMapper;
	@Autowired
	private UserInfoMapper userInfoMapper;
	public List<UserLocalAuthBean> selectByUserName(String userName, Integer isActivate) {
		return userLocalAuthMapper.selectByUserName(userName,isActivate);
	}
	public UserInfoBean selectById(Integer userId) {
		return userInfoMapper.selectByPrimaryKey(userId);
	}
	public void insertUserLocalAuth(UserLocalAuthBean userLocalAuthBean) {
		userLocalAuthMapper.insertSelective(userLocalAuthBean);
	}
	public Integer insertUserInfo(UserInfoBean userInfoBean) {
		return userInfoMapper.insertSelective(userInfoBean);
	}
	public UserInfoBean findUserInfoByPhone(String phoneNo) {
		return userInfoMapper.findUserInfoByPhone(phoneNo);
	}
	public UserLocalAuthBean selectByPrimaryKey(Integer id) {
		return userLocalAuthMapper.selectByPrimaryKey(id);
	}

}
