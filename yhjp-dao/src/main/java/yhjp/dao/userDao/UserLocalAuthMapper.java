package yhjp.dao.userDao;

import yhjp.bean.user.UserLocalAuth;

public interface UserLocalAuthMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UserLocalAuth record);

    int insertSelective(UserLocalAuth record);

    UserLocalAuth selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserLocalAuth record);

    int updateByPrimaryKey(UserLocalAuth record);
}