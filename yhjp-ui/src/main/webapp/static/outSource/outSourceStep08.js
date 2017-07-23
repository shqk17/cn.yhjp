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
			showColumns: true, //是否显示所有的列
			showRefresh: false, //是否显示刷新按钮
			minimumCountColumns: 2, //最少允许的列数
			clickToSelect: true, //是否启用点击选中行
			uniqueId: "code", //每一行的唯一标识，一般为主键列
			showToggle: false, //是否显示详细视图和列表视图的切换按钮
			cardView: false, //是否显示详细视图
			detailView: false, //是否显示父子表
			responseHandler: responseHandler,
			columns: [{
				field: 'code',
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
			},{
				field: 'useDay',
				title: '制作时间（天）'
			}, {
				field: 'completionTime',
				title: '实际完成时间',
				formatter:function(value, row,index){
					var completionTiem= time(row.startTime,row.endTime);
					return completionTiem;
				}
			}, {
				field: 'delay',
				title: '延期情况',
				formatter:function(value, row,index){
					var delayCondition = '<select class="js_delayCondition'+(index+1)+'" style="width:80%;">'+
											'<option>5</option>'+
											'<option>4</option>'+   
											'<option>3</option>'+
											'<option>2</option>'+
											'<option>1</option>'+
										 '</select>';
					return delayCondition
				}
			},{
				field: 'quality',
				title: '完成质量',
				formatter:function(value, row,index){
					var finishQuality = '<select class="js_finishQuality'+(index+1)+'" style="width:80%;">'+
											'<option>5</option>'+
											'<option>4</option>'+
											'<option>3</option>'+
											'<option>2</option>'+
											'<option>1</option>'+
										'</select>';
					return finishQuality
				}
			},{
				field: 'remark',
				title: '备注',
				formatter:function(value, row,index){
					var remarks='<input type="text"  class="js_remarks'+(index+1)+'" maxlength="50" placeholder = "最多只能输入100个字符" />';
					return remarks
				}
			}]
		});
			
	}
	//时间
	var startMonth,startData,startOTime,endMonth,endData,endOTime,otime ;
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
			+res.object[i].remark+"</span> &nbsp;&nbsp <span class='log_sourceName'>"+res.remark+"</span> </br>");
			}else{
				$("#accessText").append("<br><span class='log_name'>"+res.object[i].userName+"</span><span>"+jsonDateFormat(res.object[i].createTime)+"</span> <span> "
				+res.object[i].remark+"</span></br>")
			}
		}
		return res;
	}
}

//
function addNode(nodes){
	$.each(nodes,function(idx,val){
		var delay='.js_delayCondition'+(idx+1);
		var finish='.js_finishQuality'+(idx+1);
		var remarks='.js_remarks'+(idx+1);
		var delayNum = $(delay).val();
		var qualitys = $(finish).val();
		var remarks = $(remarks).val();
		val.delay=delayNum;
		val.quality=qualitys;
		val.remark=remarks;
	})
	 return nodes;
}
(function () {
	var code=location.href.split("=")[1];
	var Marking = "Marking/"+code; //验收打分
	var backUp = "backUp/"; //打回
$.fn.extend({     
    // 验收打分
	marking:function(){
    	//提交
        $("#OutBtn").click(function () {
            formSubmit(Marking,2);
            $(".FV_submit").click();
        });
        //退回上一步
        $("#BackOutBtn").click(function () {
        	formSubmit(backUp,4);
            $(".FV_submit").click();
        });
        //提交函数
        function formSubmit(url,action){
        	$(".FV_submit").unbind("click").bind("click",function () {
        		var flag;
        		var reason = $.trim($("#reason").val());  
        		
        		var $table = $("#tb_departments");
        		var data =$table.bootstrapTable('getData');
        		var data1=deleteNode(data);
                data1=addNode(data1);
        		if(action==2){          			
        			//flag = bootbox.confirm("是否验收打分", function(result) {})       			
        			flag=confirm("是否验收打分");
					if(!flag){
						return false;
					}
                	$.formAjax({
                		url: url,
                		contentType:"application/json;charset=utf-8",
                		data:JSON.stringify(data1),
                		action:action
                	});
        		} else if(action==4){ 
        			if($.trim(reason) == ""){
        				alert("请输入打回原因");
        				return;
        			}else if($.trim(reason).length > 200){
                    	alert("打回原因最大限制为200字符");
        				return;
                    }else{
                    	//flag = bootbox.confirm("是否打回", function(result) {}) 
                    	flag = confirm("是否打回");
    					if(!flag){
    						return false;
    					}
    										
            			$.formAjax({
    	                	url: url,
                    		data:{
                    			code:location.href.split("=")[1],
                    			identification:11,
                    			content:$.trim($("#reason").val()),
                    			r:Math.random()
                    		},
    	                    action:action
    	                });
                    }
					
        			
        		}
        		
        	});
        }
    },
});
var defaults
$.extend({
	formAjax:function(option){
		
		defaults = {
				url:"",
				type:"POST",
				dataType:"JSON",
				data:{},
				contentType:'application/json;charset=utf-8',
				action:""
				//successFn:function(){},
				//errorFn:function(){}
	     }
		
		
		$.extend(defaults,option);
		$.extend(defaults.data,{r:Math.random()});
		if(defaults.action == 4){
			$.ajax({
	            url: defaults.url,
	            type: defaults.type,
	            dataType: defaults.dataType,
	            contentType:"application/x-www-form-urlencoded",  //defaults.contentType,
	            data: defaults.data,	            
	            success: function (d) {
		        	
		        		var btn = "BackToLocationInBtn";
		    
		                if (d.isSuccess == true) {
		                    var parentWObj = window.parent.document.getElementById(btn);
		                    var da = {
		                        IsSuccess: d.isSuccess,
		                        Message: d.message,
		                        Data: d.data,
		                        Code: d.data
		                    };
		                    //alert(d.message);
		                    parentWObj.onclick(da);
		                }
		            
	        	},
	        	error:function (){
	                alert('网络异常，请稍后重试');
	            }
	        });
		}else{
			$.ajax({
	            url: defaults.url,
	            type: defaults.type,
	            dataType: defaults.dataType,
	            contentType:defaults.contentType,
	            data: defaults.data,
	            
	            success: function (d) {
		        	if(defaults.successFn){
		        		defaults.successFn(d);
		        	}else{
		        		var btn = "InBtn";	        		
		                if (d.isSuccess == true) {
		                    var parentWObj = window.parent.document.getElementById(btn);
		                    var da = {
		                        IsSuccess: d.isSuccess,
		                        Message: d.message,
		                        Data: d.data,
		                        Code: d.data
		                    };
		                    //alert(d.message);
		                    parentWObj.onclick(da);
		                } 
		            }
	        	},
	        	error:function (){
	                alert('网络异常，请稍后重试');
	            }
	        });
			
		}
		
	}
});
}());