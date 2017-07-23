$(function() {
	//人员姓名调用
	$("#OaSearchStaffEdit2").OaSearch();
	//人员姓名限制输入一人
	$(".js_oaSearch").click(function(){
		$(".js_oaSearch").removeAttr("readonly");
		$(".js_oaSearch").keydown(function(){
			if($("#OaSearchStaffEdit2 span").text() != ""){
				$(".js_oaSearch").attr("readonly","readonly");
			}
		});
	})
	
});

var TableInit = function() {
	var oTableInit = new Object();
	//点击查询
	$(".js_queryBtn").click(function(){
		var code = "";
		//判断发起人是否为空  取code
		if($("#OaSearchStaffEdit2 span").text() != ""){
			code = $("#OaSearchStaffEdit2 span").html().split("(")[1].split(")")[0];
		}else{
			code = "0"
		}
		
		var params = 'userId='+code+'&identifications='+$.trim($(".js_state").val());
		if($.trim($(".js_outsourcingName").val())!=null&&$.trim($(".js_outsourcingName").val())!=''){
			params+='&nameLike='+$.trim($(".js_outsourcingName").val());
		}
		if($.trim($("#startTime").val())!=null&&$.trim($("#startTime").val())!=''){
			params+='&startTime='+$.trim($("#startTime").val());
		}
		if($.trim($("#endTime").val())!=null&&$.trim($("#endTime").val())!=''){
			params+='&endTime='+$.trim($("#endTime").val());
		}

		$('#tb_departments').bootstrapTable('refresh',{url:rc+'/outSource/getAllList?'+params});

	
	});

	// 初始化Table
	oTableInit.Init = function() {
		$('#tb_departments').bootstrapTable({
			url : rc+'/outSource/getAllList', // 请求后台的URL（*）
			method : 'get', // 请求方式（*）
			toolbar : '#toolbar', // 工具按钮用哪个容器
			striped : true, // 是否显示行间隔色
			dataType : "json",
			cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, // 是否显示分页（*）
			sortable : true, // 是否启用排序
			sortOrder : "asc", // 排序方式
			queryParams : oTableInit.queryParams, // 传递参数（*）
			sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
			pageNumber : 1, // 初始化加载第一页，默认第一页
			pageSize : 20, // 每页的记录行数（*）
			pageList : [ 10, 20, 50 ], // 可供选择的每页的行数（*）
			search : false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			strictSearch : true,
			silent:true,
			showColumns : true, // 是否显示所有的列
			showRefresh : true, // 是否显示刷新按钮
			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : true, // 是否启用点击选中行
			height : 750, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "code", // 每一行的唯一标识，一般为主键列
			showToggle : true, // 是否显示详细视图和列表视图的切换按钮
			cardView : false, // 是否显示详细视图
			detailView : false, // 是否显示父子表
			paginationPreText : "上一页",
			paginationNextText : "下一页",
			responseHandler : responseHandler,
			columns : [
				{
					field : 'code',
					title : '编号',
					formatter : function(value, row, index) {
						return index + 1;
					}
				},
				{
					field : 'name',
					title : '外包名称'
				},
				{
					field : 'userName',
					title : '发起人'
				},
				{
					field : 'createTime',
					title : '发起时间',
					formatter :function jsonDateFormat(jsonDate) {
						// json日期格式转换为正常格式
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
							var milliseconds = date
									.getMilliseconds();
							return date.getFullYear() + "-"
									+ month + "-" + day
									+ " " + hours + ":"
									+ minutes;
						} catch (ex) {
							return "时间格式转换错误";
						}
					}
				},
				{
					field : 'identification',
					title : '发起状态',
					formatter : function(identification) {
						if (identification == 1) {
							return identification = '待审核';
						}
						if (identification == 2) {
							return identification = '待审批';
						}
						if (identification == 3) {
							return identification = '审核未通过';
						}
						if (identification == 4) {
							return identification = '审批未通过';
						}
						if (identification == 5) {
							return identification = '待验收打分';
						}
						if (identification == 6) {
							return identification = '待验收审批';
						}
						if (identification == 7) {
							return identification = '验收审批不通过';
						}
						if (identification == 8) {
							return identification = '待审核金额';
						}
						if (identification == 9) {
							return identification = '完成';
						}
						if (identification == 10) {
							return identification = '待填写完成时间';
						}
						if (identification == 11) {
							return identification = '待重新填写完成时间';
						}
						if (identification == 12) {
							return identification = '废除';
						}
					}
				},
				{
					field : 'operate',
					title : '查看',
					align : 'center',
					formatter : function(value, row, index) {						 
						var d = '<a href="javascript:;" mce_href="#" onclick="check(\''+ row.code+ '\')">查看</a> ';;
						return d;					
					}
				}, ]
			});
		
	};

	// 得到查询的参数
oTableInit.queryParams = function(params) {
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset, // 页码
			identifications : 0,
			userId:0,
			
		};
		return temp;
	};
	return oTableInit;
};

function responseHandler(res) {
	if (!res.success) {
		bootbox.alert(res.message)
		return res;
	} else {
		return res;
	}
}
// 查看
function check(code) {
	window.location.href = "step12?code=" + code;
}