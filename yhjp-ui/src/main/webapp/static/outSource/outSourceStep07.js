$(function() {	
	//开始日期同步
	$("#tb_departments").on("click",".js_startBtn",function(){
		var startVal = $("#startTime1").val();
		for(var i =1 ;i < $(".startTime").length; i++){
			$(".startTime").val(startVal);
    	}		
	});
	//结束日期同步
	$("#tb_departments").on("click",".js_endBtn",function(){
		var endVal = $("#endTime1").val();
		for(var i =1 ;i < $(".startTime").length; i++){
			$(".endTime").val(endVal);
    	}		
	});
});

var TableInit = function() {
	var oTableInit = new Object();
	//初始化Table
	oTableInit.Init = function() {
		$('#tb_departments').bootstrapTable({
			url: 'auditList', //请求后台的URL（*）
			method: 'get', //请求方式（*）
			toolbar: '#toolbar', //工具按钮用哪个容器
			striped: true, //是否显示行间隔色
			dataType: "json",
			cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination: false, //是否显示分页（*）
			sortable: false, //是否启用排序
			sortOrder: "asc", //排序方式
			queryParams: oTableInit.queryParams, //传递参数（*）
			sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
			pageNumber: 1, //初始化加载第一页，默认第一页
			pageSize: 10, //每页的记录行数（*）
			pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
			search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			strictSearch: true,
			showColumns: false, //是否显示所有的列
			showRefresh: false, //是否显示刷新按钮
			minimumCountColumns: 2, //最少允许的列数
			clickToSelect: true, //是否启用点击选中行
			uniqueId: "code", //每一行的唯一标识，一般为主键列
			showToggle: false, //是否显示详细视图和列表视图的切换按钮
			cardView: false, //是否显示详细视图
			detailView: false, //是否显示父子表
			responseHandler: responseHandler,
			columns: [
			    {
			    	field: 'id',
					title: '编号',
					formatter : function(value, row, index) {
						return index + 1;
					}
				}, {
					field: 'gameName',
					title: '游戏'
				}, {
					field: 'content',
					title: '制作内容'
				}, {
					field: 'type',
					title: '类别'
				}, {
					field: 'price',
					title: '价格'
				},{
					field: 'company',
					title: '外包公司',
				}, {
					field: 'useDay',
					title: '制作时间（天）'
				}, {
					field: 'startTime',
					title: '实际开始日期',
					class:'col-sm-2 start',
					formatter:function(value, row,index){
						if(index<1){
							a = '<input name="PlanWorkStartTime" id="startTime'+(index+1)+'" type="text" class="form-control FV_form FV_none startTime" onclick="WdatePicker({ dateFmt:\'yyyy-MM-dd\',maxDate:\'#F{$dp.$D(\\\'endTime'+(index+1)+'\\\')}\'})" readonly=""><a href ="javascript:;" class="js_startBtn">全同步</a>'
						}else{						
							a = '<input name="PlanWorkStartTime" id="startTime'+(index+1)+'" type="text" class="form-control FV_form FV_none startTime" onclick="WdatePicker({ dateFmt:\'yyyy-MM-dd\',maxDate:\'#F{$dp.$D(\\\'endTime'+(index+1)+'\\\')}\'})" readonly="">'								
						}
						return a;
					}
				},{
					field: 'endTime',
					title: '实际结束日期',
					class:'col-sm-2 end',
					formatter:function(value, row,index){

						if(index<1){
							a = '<input name="PlanWorkEndTime" id="endTime'+(index+1)+'" type="text" class="form-control FV_form FV_none endTime" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd\',minDate:\'#F{$dp.$D(\\\'startTime'+(index+1)+'\\\')}\'})" readonly=""><a href ="javascript:;" class="js_endBtn">全同步</a>'
						}else{							
							a = '<input name="PlanWorkEndTime" id="endTime'+(index+1)+'" type="text" class="form-control FV_form FV_none endTime" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd\',minDate:\'#F{$dp.$D(\\\'startTime'+(index+1)+'\\\')}\'})" readonly="">'					
						}
						return a;
					}
				},{
					field: 'code',
					class:'codeHidden',
					title: ''
				}]
			});
			
	}

	//得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit: params.limit, //页面大小
			offset: params.offset, //页码
			code:location.href.split("=")[1],
			identifications:13,
		};
		return temp;
	};
	return oTableInit;
};

function responseHandler(res) {
	if (!res.success) {
		bootbox.alert(res.message)
		return res;
	}
	else{
		$("#outSourceName").append(res.remark)
		for(var i=0;i<res.object.length;i++){
			if(i==0){
			$("#accessText").append("<br><span class='log_name'>"+res.object[i].userName+"</span><span>"+jsonDateFormat(res.object[i].createTime)+"</span> <span>"
			+res.object[i].remark+"</span> &nbsp;&nbsp <span class='log_sourceName'>"+res.remark+"</span> </br>")
			}else{
				$("#accessText").append("<br><span class='log_name'>"+res.object[i].userName+"</span><span>"+jsonDateFormat(res.object[i].createTime)+"</span> <span> "
				+res.object[i].remark+"</span></br>")
			}
		}
		return res;
	}
}

function addNode(nodes){
	$.each(nodes,function(idx,val){
		var startTime = '#startTime'+(idx+1);
		var endTime = '#endTime'+(idx+1);
		var startTime = $(startTime).val();
		var endTime = $(endTime).val();
		val.startTime = startTime;
		val.endTime = endTime;
	})
	 return nodes;
}
