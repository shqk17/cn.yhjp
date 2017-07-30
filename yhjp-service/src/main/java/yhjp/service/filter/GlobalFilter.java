package yhjp.service.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import yhjp.bean.user.User;


public class GlobalFilter implements Filter {
	// 所有的Authenticator都在这里:
   Authenticator[] authenticators = initAuthenticators();

	 // 每个页面都会执行的代码:
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
		User user = null;
		HttpServletRequest servletRequest = (HttpServletRequest) request;
		HttpServletResponse servletResponse = (HttpServletResponse) response;
		for (Authenticator auth : this.authenticators) {
			user = auth.authenticate(servletRequest, servletResponse);
			if (user != null) {
				break;
			}
		}
		try (UserContext context = new UserContext(user)) {
				try {
					chain.doFilter(request, response);
				} catch (IOException | ServletException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} 
	}
	private Authenticator[] initAuthenticators() {
		Authenticator[] authenticators ={new LocalCookieAuthenticator()};
		return authenticators;
	}


}
