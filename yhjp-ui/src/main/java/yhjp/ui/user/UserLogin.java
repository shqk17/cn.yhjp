package yhjp.ui.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import yhjp.bean.common.ResultBean;
import yhjp.bean.user.UserInfoBean;
import yhjp.service.user.UserLoginService;

@Controller
@RequestMapping("/user")
public class UserLogin {
	private static final Logger logger = LoggerFactory
            .getLogger(UserLogin.class);
	@Autowired
	private UserLoginService userLoginService;
	@RequestMapping("/signup/page")
	public String signupPage(){
		return "user/signPage";
	}
	@RequestMapping("/login")
	@ResponseBody
	public ResultBean<String> login(HttpServletRequest request, @RequestParam("userName") String userName,
			@RequestParam("passWord ") String passWord, HttpServletResponse response) {
		ResultBean<String> result = new ResultBean<String>(false, "未知错误", null);
		if (StringUtils.isNotEmpty(userName)) {
			result.setMessage("用户名不能为空");
			return result;
		}
		if (StringUtils.isNotEmpty(passWord)) {
			result.setMessage("密码不能为空");
			return result;
		}
		try {
			return userLoginService.login(userName, passWord, response);
		} catch (Exception e) {
			e.printStackTrace();
			result.setMessage("系统异常，请稍后再试");
			return result;
		}
	}

	@RequestMapping("/signup")
	@ResponseBody
	public ResultBean<String> signup(HttpServletRequest request, @Validated UserInfoBean userInfoBean,
			@RequestParam("passWord") String passWord, BindingResult BR) {
		ResultBean<String> result = new ResultBean<String>(false, "未知错误", null);
		if (!StringUtils.isNotEmpty(passWord)) {
			result.setMessage("密码不能为空");
			return result;
		}
		if (BR.hasErrors()) {
			result.setMessage(BR.getFieldError().toString());
		}
		try {
			return userLoginService.signup(userInfoBean,passWord);
		} catch (Exception e) {
			e.printStackTrace();
			result.setMessage("注册失败，请稍后再试");
			return result;
		} 
	}
}
