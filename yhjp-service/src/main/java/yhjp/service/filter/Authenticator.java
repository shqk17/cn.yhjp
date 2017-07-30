package yhjp.service.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import yhjp.bean.user.User;

public interface Authenticator {
	 // 认证成功返回User，认证失败抛出异常，无认证信息返回null:
    User authenticate(HttpServletRequest request, HttpServletResponse response);
}
