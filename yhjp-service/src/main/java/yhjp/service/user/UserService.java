package yhjp.service.user;

import org.springframework.beans.factory.annotation.Autowired;

import yhjp.bean.user.UserInfoBean;
import yhjp.bean.user.UserLocalAuthBean;
import yhjp.bll.userBll.UserBll;

public class UserService {
	@Autowired
	private UserBll userBll;
	public UserLocalAuthBean findUserInLocal(String userName) {
		return userBll.selectByUserName(userName);
	}

	public UserInfoBean findUserInfo(Integer userId) {
		return userBll.selectById(userId);
	}

}