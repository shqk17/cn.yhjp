$(function(){
	$("#signup_bt").click(function(){
	　var userName = $("#userName").val();
	if (userName == null || userName.trim() ==""
		|| userName.trim().lengh < 1
		|| userName.trim().lengh > 10) {
	alert("姓名必须填写哦")
	return false;
}
var qq = $("#qq").val();
var passWord = $("#passWord").val();
var passWord2 = $("#passWord2").val();
check(passWord, passWord2)
var ancestralHall = $("#ancestralHall").val();
if (ancestralHall == null || ancestralHall.trim() == "") {
	alert("所属祠堂必须填写哦")
	return false;
}
var fatherName = $("#fatherName").val();
if (fatherName == null || fatherName.trim() == "") {
	alert("请填写您父亲的姓名")
	return false;
}
var generation = $("#generation").val();
if (generation == null || generation.trim() == "") {
	alert("请填写您所属世代")
	return false;
}
var address = $("#address").val();
if (address == null || address.trim() == "") {
	alert("请填写您的居住地")
	return false;
}
if (address.length > 500 || address.length < 6) {
	alert("地址应该在6-500字之间")
	return false;
}
var tel = $("#tel").val();
if (tel == null || tel.trim() == "") {
	alert("请填写您的手机号码")
	return false;
}
if (tel.length != 11) {
	alert("请填写11位手机号码")
	return false;
}
var pattern = /^13\d{9}$|^15[01256789]\d{8}$|^18\d{9}$|^14[57]\d{8}$|^177\d{8}$|^170\d$/;
	var phoneRegExp = new RegExp(pattern);
if (!(phoneRegExp.test(tel))) {
	alert("手机号码有误，请重填");
	return false;
}
var selfIntroduction = $("#selfIntroduction").val();

$.ajax({
 type: "POST",
 url: "/user/signup",
 data: {
	 userName:userName,
	 passWord:passWord,
	 ancestralHall:ancestralHall,
	 fatherName:fatherName,
	 generation:generation,
	 qq:qq,
	 address:address,
	 phoneNo:tel,
	 selfIntroduction:selfIntroduction,
 },
 dataType: "json",
 success: function(data){
             if(data.success){
            	 alert("注册成功，请耐心等待管理员激活账户")
             }else{
            	 alert(data.message)
             }
          }

})
	　　});
});

// 检查密码是否一致
function check(passWord, passWord2) {
	if (passWord == null || passWord.trim() == "") {
		alert("必须输出密码哦！")
		return 
	}
	if (passWord.length < 6 || passWord.length > 15) {
		alert("密码长度在6~15位之间哦")
		return 
	}
	if (passWord != passWord2) {
			alert("两次密码输出不一致！")
			return 
	}
}