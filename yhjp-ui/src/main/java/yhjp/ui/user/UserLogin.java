package yhjp.ui.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import yhjp.bean.common.ResultBean;
import yhjp.service.user.UserLoginService;

@Controller
@RequestMapping("/user")
public class UserLogin {
	@Autowired
	private UserLoginService userLoginService;
	
	@RequestMapping("/login")
	@ResponseBody
	public ResultBean<String> login(HttpServletRequest request, @RequestParam("userName") String userName,
			@RequestParam("passWord ") String passWord,HttpServletResponse response) {
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
			return userLoginService.login(userName,passWord,response);
		} catch (Exception e) {
			e.printStackTrace();
			result.setMessage("系统异常，请稍后再试");
			return  result;
		}
	}
}
