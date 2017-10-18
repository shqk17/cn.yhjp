package yhjp.bean.common;


public class ResultBean <T>{
	private Boolean success;
	private String message;
	private T data;
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
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
		return "ResultBean [success=" + success + ", message=" + message + ", data=" + data + "]";
	}
	public ResultBean(Boolean success, String message, T data) {
		super();
		this.success = success;
		this.message = message;
		this.data = data;
	}
	
}
