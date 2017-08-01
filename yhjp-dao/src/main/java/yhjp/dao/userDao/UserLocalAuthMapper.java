package yhjp.dao.userDao;

import org.apache.ibatis.annotations.Param;

import yhjp.bean.user.UserLocalAuthBean;

public interface UserLocalAuthMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UserLocalAuthBean record);

    int insertSelective(UserLocalAuthBean record);

    UserLocalAuthBean selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserLocalAuthBean record);

    int updateByPrimaryKey(UserLocalAuthBean record);

	UserLocalAuthBean selectByUserName(@Param("userName") String userName,@Param("isActivate") Integer isActivate);
}