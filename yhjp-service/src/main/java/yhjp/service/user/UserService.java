package yhjp.service.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import yhjp.bean.user.UserInfoBean;
import yhjp.bean.user.UserLocalAuthBean;
import yhjp.bll.userBll.UserBll;
@Service
public class UserService {
	@Autowired
	private UserBll userBll;
	public List<UserLocalAuthBean> findUserInLocal(String userName, Integer isActivate) {
		return userBll.selectByUserName(userName,isActivate);
	}

	public UserInfoBean findUserInfo(Integer userId) {
		return userBll.selectById(userId);
	}

	public UserInfoBean findUserInfoByPhone(String phoneNo) {
		return userBll.findUserInfoByPhone(phoneNo);
	}

	public UserLocalAuthBean selectByPrimaryKey(Integer id) {
		return userBll.selectByPrimaryKey(id);
	}

}
