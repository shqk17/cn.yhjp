package yhjp.service.filter;

import yhjp.bean.user.User;

public class UserContext implements AutoCloseable {
	public static final ThreadLocal<User> current = new ThreadLocal<User>();

	public UserContext(User user) {
		current.set(user);
	}

	public static User getCurrentUser() {
		return current.get();
	}

	@Override
	public void close() throws Exception {
		current.remove();
	}
}
