package yhjp.service.user;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import yhjp.bean.common.ResultBean;
import yhjp.bean.user.UserInfoBean;
import yhjp.bean.user.UserLocalAuthBean;
import yhjp.bll.common.MD5;
import yhjp.bll.common.MYDES;
import yhjp.bll.userBll.UserBll;
@Service
public class UserLoginService {
	@Autowired
	private UserService user;
	@Autowired
	private MD5 md5;
	@Autowired
	private UserBll userBll;
	@Transactional(rollbackFor = Exception.class)
	public ResultBean<String> login(String userName, String passWord,HttpServletResponse response) throws Exception {
		ResultBean<String> result = new ResultBean<String>(false, "未知错误", null);
		String regex = "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$"; 
		String pwString=null;
		pwString=md5.EncoderByMd5(passWord);
		//先查是否有当前用户存在；
		if(!userName.matches(regex)){
			//说明是姓名
			List<UserLocalAuthBean> userLocalAuthBean = user.findUserInLocal(userName,1);
			if(userLocalAuthBean.size()<1){
				result.setMessage("用户名或密码不对");
				return result;
			}else{
				for(UserLocalAuthBean userBean : userLocalAuthBean){
					//如果密码匹配
					if(pwString.equals(userBean.getPassWord())){
						UserInfoBean userInfoBean= user.findUserInfo(userBean.getUserId());
						//如果密码匹配，写cookie
						//先对用户信息加密
						String cookieValue=userBean.getUserId()+":"+userName+":"+userInfoBean.getAncestralHall();
						Cookie cookie =new Cookie("YHJP_LOGIN", MYDES.encrypt(cookieValue));
						cookie.setPath("/");
						cookie.setMaxAge(60*20);
						response.addCookie(cookie);
						result.setSuccess(true);
						result.setMessage("登录成功");
						return result;
					}
				}
				result.setMessage("用户名或密码不对");
				return result;
			}
		}else{
			//说明是手机号
			UserInfoBean userInfoBean= user.findUserInfoByPhone(userName);
			if(userInfoBean==null){
				result.setMessage("用户名或密码不对");
				return result;
			}
			UserLocalAuthBean userLocalAuthBean=user.selectByPrimaryKey(userInfoBean.getId());
			if(userLocalAuthBean.getIsActivate()!=1){
				result.setMessage("您的账号尚未被管理员激活，请耐心等待");
				return result;
			}
			if(!pwString.equals(userLocalAuthBean.getPassWord())){
				result.setMessage("用户名或密码不对");
				return result;
			}
			//如果密码匹配，写cookie
			//先对用户信息加密
			String cookieValue=userLocalAuthBean.getUserId()+":"+userName+":"+userInfoBean.getAncestralHall();
			Cookie cookie =new Cookie("YHJP_LOGIN", MYDES.encrypt(cookieValue));
			cookie.setPath("/");
			cookie.setMaxAge(60*20);
			response.addCookie(cookie);
			result.setSuccess(true);
			result.setMessage("登录成功");
			return result;
		}
	}
	@Transactional(rollbackFor = Exception.class)
	public ResultBean<String> signup(UserInfoBean userInfoBean, String passWord) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		ResultBean<String> result = new ResultBean<String>(false, "未知错误", null);
		//手机号是唯一的，先验证手机号是否正确或者重复；
		UserInfoBean resultBean= user.findUserInfoByPhone(userInfoBean.getPhoneNo());
		if(resultBean!=null){
			result.setMessage("该手机号已被使用");
			return result;
		}
		userInfoBean.setCreateTime(new Date());
		userBll.insertUserInfo(userInfoBean);
		UserLocalAuthBean userLocalAuthBean = new UserLocalAuthBean();
		userLocalAuthBean.setCreateTime(new Date());
		userLocalAuthBean.setPassWord(md5.EncoderByMd5(passWord));
		userLocalAuthBean.setUserId(userInfoBean.getId());
		userLocalAuthBean.setUserName(userInfoBean.getUserName());
		userLocalAuthBean.setIsActivate(0);
		//保存用户密码实体，用户详情实体
		userBll.insertUserLocalAuth(userLocalAuthBean);
		
		result.setSuccess(true);
		result.setMessage("注册成功，请耐心等待管理员同意");
		return result;
	}

}
