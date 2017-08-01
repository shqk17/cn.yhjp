package yhjp.service.user;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import yhjp.bean.common.ResultBean;
import yhjp.bean.user.UserInfoBean;
import yhjp.bean.user.UserLocalAuthBean;
import yhjp.bll.common.MD5;
import yhjp.bll.common.MYDES;
import yhjp.bll.userBll.UserBll;

public class UserLoginService {
	@Autowired
	private UserService user;
	@Autowired
	private MD5 md5;
	@Autowired
	private UserBll userBll;
	public ResultBean<String> login(String userName, String passWord,HttpServletResponse response) throws Exception {
		ResultBean<String> result = new ResultBean<String>(false, "未知错误", null);
		//先查是否有当前用户存在；
		UserLocalAuthBean userLocalAuthBean = user.findUserInLocal(userName,1);
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
		result.setSucess(true);
		result.setMessage("登录成功");
		return result;
	}
	public ResultBean<String> signup(UserInfoBean userInfoBean, String passWord) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		ResultBean<String> result = new ResultBean<String>(false, "未知错误", null);
		//先查询是否已注册或未激活
		UserLocalAuthBean userLocalAuthBean = user.findUserInLocal(userInfoBean.getUserName(),-1);
		if(userLocalAuthBean!=null){
			result.setMessage("此用户名已被占用");
		    return result;
		}
		userLocalAuthBean = new UserLocalAuthBean();
		userInfoBean.setCreateTime(new Date());
		userLocalAuthBean.setCreateTime(new Date());
		userLocalAuthBean.setPassWord(md5.EncoderByMd5(passWord));
		userLocalAuthBean.setUserId(userInfoBean.getId());
		userLocalAuthBean.setUserName(userInfoBean.getUserName());
		userLocalAuthBean.setIsActivate(0);
		//保存用户密码实体，用户详情实体
		userBll.insertUserLocalAuth(userLocalAuthBean);
		userBll.insertUserInfo(userInfoBean);
		result.setSucess(true);
		result.setMessage("注册成功，请耐心等待管理员同意");
		return result;
	}

}
