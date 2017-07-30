package yhjp.service.user;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import yhjp.bean.common.ResultBean;
import yhjp.bean.user.UserInfoBean;
import yhjp.bean.user.UserLocalAuthBean;
import yhjp.bll.common.MD5;
import yhjp.bll.common.MYDES;

public class UserLoginService {
	@Autowired
	private UserService user;
	@Autowired
	private MD5 md5;
	public ResultBean<String> login(String userName, String passWord,HttpServletResponse response) throws Exception {
		ResultBean<String> result = new ResultBean<String>(false, "未知错误", null);
		//先查是否有当前用户存在；
		UserLocalAuthBean userLocalAuthBean = user.findUserInLocal(userName);
		if(userLocalAuthBean ==null){
			result.setMessage("用户名或密码不对");
			return result;
		}
		String pwString=null;
		pwString=md5.EncoderByMd5(passWord);
		//如果密码不匹配
		if(!pwString.equals(userLocalAuthBean)){
			result.setMessage("用户名或密码不对");
			return result;
		}
		UserInfoBean userInfoBean= user.findUserInfo(userLocalAuthBean.getUserId());
		//如果密码匹配，写cookie
		//先对用户信息加密
		String cookieValue=userLocalAuthBean.getUserId()+":"+userName+":"+userInfoBean.getAncestralHall();
		Cookie cookie =new Cookie("YHJP_LOGIN", MYDES.encrypt(cookieValue));
		cookie.setPath("/");
		cookie.setMaxAge(60*20);
		response.addCookie(cookie);
		return result;
	}

}
