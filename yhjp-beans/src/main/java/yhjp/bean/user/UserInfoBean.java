package yhjp.bean.user;

import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UserInfoBean {
    private Integer id;
    @NotNull(message = "名字不能为空")
    private String userName;
    @NotNull(message = "父亲名字不能为空")
    private String fatherName;
    @NotNull(message = "世代不能为空")
    private String generation;
    
    private String qq;
    @Size(min = 6,max = 30,message = "地址应该在6-500字符之间")
    private String address;
    @Pattern(regexp = "^1[34578]\\d{9}$",message = "请输入正确的电话号码")
    private String phoneNo;

    private String selfIntroduction;
    @NotNull(message = "所属祠堂必填哦")
    private String ancestralHall;

    private Date createTime;
    
    private Integer authority;//账号权限
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName == null ? null : fatherName.trim();
    }

    public String getGeneration() {
        return generation;
    }

    public void setGeneration(String generation) {
        this.generation = generation == null ? null : generation.trim();
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq == null ? null : qq.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo == null ? null : phoneNo.trim();
    }

    public String getSelfIntroduction() {
        return selfIntroduction;
    }

    public void setSelfIntroduction(String selfIntroduction) {
        this.selfIntroduction = selfIntroduction == null ? null : selfIntroduction.trim();
    }

    public String getAncestralHall() {
        return ancestralHall;
    }

    public void setAncestralHall(String ancestralHall) {
        this.ancestralHall = ancestralHall == null ? null : ancestralHall.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

	public Integer getAuthority() {
		return authority;
	}

	public void setAuthority(Integer authority) {
		this.authority = authority;
	}
    
}