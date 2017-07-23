//工作流--xyl
(function () {
	var outSourceName,addApplication;
	var code=location.href.split("=")[1];
	var fillTime = "fillTime/"+code; //完成任务详细
	var editorInfo = "editorInfo/"+code;  //编辑页面接口
$.fn.extend({     
    // 发起外包申请
	addApplication:function(option){
    	//提交       
        $("#OutBtn").click(function () {
        	outSourceName=$("#outSourceName").val();
        	addApplication = rc+"/outSource/addApplication/1/"+outSourceName
            formSubmit(addApplication,2);
            $(".FV_submit").click();
        });   				
        //提交函数
        function formSubmit(url,action){
        	$(".FV_submit").unbind("click").bind("click",function () {
				var $table = $("#tb_departments");
				outSourceName=$("#outSourceName").val();
				if(outSourceName==null||outSourceName.trim()==''){
					bootbox.alert("外包单名称不能为空");
					return false;
				}
				if(outSourceName.length>100){
					bootbox.alert("外包单名称不能超过100字");
					return false;
				}
        		bootbox.confirm("确认保存该外包单吗？", function(result) {
        			if(result){
        				var data =$table.bootstrapTable('getData');
        	            if(data==null||data.length<1){
        	            	bootbox.alert("请先添加外包数据,再保存");
        	            	return ;
        				}
        	            var data1=deleteNode(data);
    					$.formAjax({
                        	url: url,
                        	contentType:"application/json;charset=utf-8",
                        	data:JSON.stringify(data1),
                        	action:action
                        });
        			 
        			}
        		});
        		/*xyl*/
        		  		
        		
        	});
        }
    },
    //经理审核
    audit:function(){
    	//提交
        $("#OutBtn").click(function () {
        	for(var i =0 ;i < $("#tb_departments tbody tr").length; i++){
        		if($(".startTime").eq(i).val() == ""){
        			alert("第"+(i+1)+"行开始时间为空");
        			return false 
        		}
        		if($(".endTime").eq(i).val() == ""){
        			alert("第"+(i+1)+"行结束时间为空");
        			return false 
        		}
        	}
            formSubmit(fillTime,2);
            $(".FV_submit").click();
            
        });
        
        //提交函数
        function formSubmit(url,action){
        	$(".FV_submit").unbind("click").bind("click",function () {       		
        		var flag;
        		var reason = $("#reason").val();    		
        		var $table = $("#tb_departments");
				var data =$table.bootstrapTable('getData');
        		var data1=deleteNode(data);
                data1=addNode(data1);			
	            if(data==null||data.length<1){
	            	bootbox.alert("请先添加外包数据,再保存");
	            	return ;
				}
        		var data1=deleteNode(data);
        		 	
    			flag = confirm("是否确认提交");
				if(!flag){
					return false;
				}
            	$.formAjax({
            		url: url,
            		contentType:"application/json;charset=utf-8",
            		data:JSON.stringify(data1),
            		action:action
            	});
        		
        	});
        }
    },
    
    //编辑页面
    editorInfo:function(){
    	//提交
        $("#OutBtn").click(function () {
        	var deleteCode=$("#deleteCode").text();
        	if(deleteCode==null||deleteCode==""){
        		deleteCode=0;
        	}
        	editorInfo=editorInfo+'/'+deleteCode;
            formSubmit(editorInfo,2);
            $(".FV_submit").click();
            
        });
        
        //提交函数
        function formSubmit(url,action){
        	$(".FV_submit").unbind("click").bind("click",function () {       		
        		var flag;
        		var reason = $("#reason").val();    		
        		var $table = $("#tb_departments");
				var data =$table.bootstrapTable('getData');
        		var data1=deleteNode(data);
    			flag = confirm("是否修改外包单");
				if(!flag){
					return false;
				}
            	$.formAjax({
            		url: url,
            		contentType:"application/json;charset=utf-8",
            		data:JSON.stringify(data1),
            		action:action
            	});
        		
        	});
        }
    },
});
$.extend({
	formAjax:function(option){
		var defaults = {
				url:"",
				type:"post",
				dataType:"JSON",
				data:{},
				contentType:'application/json;charset=utf-8',
				action:2,
				/*successFn:function(){},
				errorFn:function(){}*/
		};
		$.extend(defaults,option);
		$.extend(defaults.data,{r:Math.random()});
		$.ajax({
            url: defaults.url,
            type: defaults.type,
            dataType: defaults.dataType,
            contentType:defaults.contentType,
            data: defaults.data,
            
            beforeSend: function () {
                $(".FV_submit").html("提交中...");
                $(".FV_submit").addClass("disabled");
                $("#spin").removeClass("hide");
            },
            complete: function () {
                $(".FV_submit").html("提交");
                $(".FV_submit").removeClass("disabled");
                $("#spin").addClass("hide");
            },
            success: function (d) {
	        	if(defaults.successFn){
	        		defaults.successFn(d);
	        	}else{
	        		var btn = "InBtn";
	        		if(defaults.action==3){
	        			btn="StopInBtn";
	        		}
	        		
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
	                } else if(action==3){
	                    var parentWObj = window.parent.document.getElementById(btn);
	                    var da = {
	                        IsSuccess: d.isSuccess,
	                        Message: d.message,
	                        Data: d.data,
	                        Code: d.data
	                    };
	                    //alert(d.message);
	                    parentWObj.onclick(da);
	                    $(".FV_submit").html("提交");
	                    $(".FV_submit").removeClass("disabled");
	                    $("#spin").addClass("hide");
	                }
	            }
        	},
        	error:function (){
                alert('网络异常，请稍后重试');
            }
        });
	}
});
}());
