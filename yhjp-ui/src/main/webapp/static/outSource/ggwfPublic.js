$(function() {
	// 1.初始化Table
	var oTable = new TableInit();
	oTable.Init();

	// 2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();
	
	$("body").on("load",function(){
		priceSum();
	});	
	setTimeout(function(){$("body").load()},2000); 
	
});

var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};

	oInit.Init = function() {
		// 初始化页面上面的按钮事件
	};

	return oInit;
};
//添加
//var ones = 1;
function add() {
  $("body").on("click","#btn_add",function () {   	
    $("#myModalLabel").text("添加修改外包内容");
    $('#myModal').modal();
  }); 
}

//全选或者全不选
function isChecked(){	
	$("#tb_departments").on("click","#audit",function(){
		var flag = $("#audit[type=checkbox]").is(":checked"); 
		for(var i=0;i<$(".audit_tr").length;i++){
			if($(".audit_tr[type=checkbox]").eq(i).prop("checked")!=flag){
				$(".audit_tr[type=checkbox]").eq(i).prop("checked",flag);				
			}
		}		
	}); 

	$("#tb_departments").on("click",".audit_tr",function(){
		var isC=0;
		for(var i=0;i<$(".audit_tr").length;i++){
			var audit = '#audit_'+i+'[type=checkbox]';
			if(!$(audit).prop("checked")){
				isC++;
			}
		}
		if(isC>0){
			$("#audit[type=checkbox]").prop("checked",false);
		}else{
			$("#audit[type=checkbox]").prop("checked",true);
		}
	});
}

//拼接开始结束时间
function time(startTime,endTime){
	var otime="";
	if(startTime==null||endTime==null){
		return otime;
	}
	startMonth = (new Date(startTime)).getMonth()+1,
    startData = (new Date(startTime)).getDate(),
    startOTime = startMonth + '-' + startData
    //结束时间
    endMonth = (new Date(endTime)).getMonth()+1,
    endData = (new Date(endTime)).getDate(),
    endOTime = endMonth + '-' + endData
    //时间
    otime = startOTime +' —— '+ endOTime
	return otime;
}

//json日期格式转换为正常格式
function jsonDateFormat(jsonDate) {
	var jsonDateStr = jsonDate.toString();// 此处用到toString（）是为了让传入的值为字符串类型，目的是为了避免传入的数据类型不支持.replace（）方法
	try {
		var k = parseInt(jsonDateStr.replace("/Date(", "").replace(")/", ""), 10);
		if (k < 0)
			return null;
		var date = new Date(parseInt(jsonDateStr.replace("/Date(","").replace(")/",""),10));
		var month = date.getMonth() + 1 < 10 ? "0"
				+ (date.getMonth() + 1)
				: date.getMonth() + 1;
		var day = date.getDate() < 10 ? "0"
				+ date.getDate()
				: date.getDate();
		var hours = date.getHours() < 10 ? "0"
				+ date.getHours()
				: date.getHours();
		var minutes = date.getMinutes() < 10 ? "0"
				+ date.getMinutes()
				: date.getMinutes();
		var seconds = date.getSeconds() < 10 ? "0"
				+ date.getSeconds()
				: date.getSeconds();
		var milliseconds = date
				.getMilliseconds();
		return date.getFullYear() + "-"
				+ month + "-" + day
				+ " " + hours + ":"
				+ minutes + ":"
				+ seconds;
	} catch (ex) {
		return "时间格式转换错误";
	}
}

//格式化json，去除不需要的字段
function deleteNode(nodes){
    $.each(nodes,function(idx,val){
         delete val.operat;            
    });
    return nodes;
}

//延时格式化表格
function timeOutStyle(){
	setTimeout(function(){
		$("#tb_departments").bootstrapTable("resetView")
	},500)
}


//计算价格列总数;
function priceSum(){
	var length=$("#tb_departments").bootstrapTable('getData').length;
	var sum=0;
	
	if(length==0){
		return
	}
	for(var i=0;i<length;i++){
		var prices=$("#tb_departments").bootstrapTable('getData')[i].price;
		sum=accAdd(sum,prices);
	}
	sum = sum.toFixed(2);
	$("#pricesum").text(sum);
	timeOutStyle();
    
}
//小数加法
function accAdd(arg1,arg2){ 
	var r1,r2,m; 
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
	m=Math.pow(10,Math.max(r1,r2)); 
	return (arg1*m+arg2*m)/m; 
} 