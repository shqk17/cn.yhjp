package yhjp.bean.common;


public class ResultBean <T>{
	private Boolean sucess;
	private String message;
	private T data;
	public Boolean getSucess() {
		return sucess;
	}
	public void setSucess(Boolean sucess) {
		this.sucess = sucess;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	@Override
	public String toString() {
		return "ResultBean [sucess=" + sucess + ", message=" + message + ", data=" + data + "]";
	}
	public ResultBean(Boolean sucess, String message, T data) {
		super();
		this.sucess = sucess;
		this.message = message;
		this.data = data;
	}
	
}
