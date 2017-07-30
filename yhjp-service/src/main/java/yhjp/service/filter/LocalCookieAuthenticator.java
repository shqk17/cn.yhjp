package yhjp.service.filter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import yhjp.bean.user.User;
import yhjp.bll.common.MYDES;

public class LocalCookieAuthenticator implements Authenticator {
	@Override
	public User authenticate(HttpServletRequest request, HttpServletResponse response) {
		 String cookie = getCookieFromRequest(request, "YHJP_LOGIN");
	        if (cookie == null) {
	            return null;
	        }
	        return getUserByCookie(cookie);
	}

	@SuppressWarnings("null")
	private User getUserByCookie(String cookie) {
		User user=null;
		//解密cookie
		try {
			cookie=MYDES.decrypt(cookie);
		} catch (Exception e) {
			return user;
		}
		String[] userInfo =cookie.split(":");
		if(userInfo.length!=3){
			return user;
		}
		user.setUserId(userInfo[0]);
		user.setUserName(userInfo[1]);
		user.setAncestralHall(userInfo[2]);
		return user;
	}

	private String getCookieFromRequest(HttpServletRequest request, String cookieName) {
		Cookie cs[]=request.getCookies();  
        for(int i=0;cs!=null&&i<cs.length;i++){  
            Cookie c=cs[i];  
            if(cookieName.equals(c.getName())){  
                String value=c.getValue();  
                return value;   
            }  
        }  
        return null;
	}

}
