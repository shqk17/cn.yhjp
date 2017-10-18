package yhjp.dao.userDao;

import yhjp.bean.user.UserInfoBean;

public interface UserInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UserInfoBean record);

    int insertSelective(UserInfoBean record);

    UserInfoBean selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserInfoBean record);

    int updateByPrimaryKey(UserInfoBean record);

	UserInfoBean findUserInfoByPhone(String phoneNo);
}