(function () {
	//去重 
	Array.prototype.unique2 = function(){
	    var a = {},
	        b = {},
	        n = this.length;
	    for(var i = 0; i < n; i++){
	        if(typeof(b[this[i]]) != "undefined")
	            continue;
	        if(typeof(a[this[i]]) == "undefined"){
	            a[this[i]] = 1;
	        }else{
	            b[this[i]] = 1;
	            delete a[this[i]];
	        }
	    }
	    this.length = 0;
	    for(var i in a)
	        this[this.length] = i;
	    return this;
	}
	
	var code=location.href.split("=")[1];
	

	
	$.fn.extend({     
	    // 经理审核
		managerAudit:function(){
			var managerAudit = "managerAudit"; //经理审批
			var backUp="backUp";
	    	//提交
			$("#OutBtn").click(function () {
	            formSubmit(managerAudit,2);
	            $(".FV_submit").click();
	        });
	        //退回上一步
	        $("#BackOutBtn").click(function () {
	        	formSubmit(managerAudit,4);
	            $(".FV_submit").click();
	        });
	        //终止
	        $("#StopOutBtn").click(function () {
	        	formSubmit(backUp,3);
	            $(".FV_submit").click();
	        });
	        //提交函数
	        function formSubmit(url,action){
	        	$(".FV_submit").unbind("click").bind("click",function () {
	        		var flag;
	        		var reason = $("#reason").val();
	        		var selLength = $('input[name="subBox"]:checked').length;
	 
	                var checked = [];//选中的code
	                var arr2 = [];//全部code
	                var Unchecked=''; // 未选中code
	                $('input[name="subBox"]:checked').each(function () {
	                	checked.push($(this).parents("tr").attr("data-uniqueid"))
	 
	                });
	                 $('input[name="subBox"]').each(function () {
	                    arr2.push($(this).parents("tr").attr("data-uniqueid"))
	                });
	                //去重 
                	Unchecked = checked.concat(arr2).unique2();
                	checked = checked.join(",");
                	Unchecked = Unchecked.join(",");	 
	        		if(action==2){
	                    if (selLength == 0) {
	                        alert("请选择要审核的外包单内容");
	                        return;
	                    }
	                    
	        			flag = confirm("是否确认审核");
						if(!flag){
							return false;
						}
	                	$.formAjax({
	                		url: url,
	                		data:{
	                			code:location.href.split("=")[1],
	                			identification:2,
	                			chkIds:checked,
	                			nochkIds:Unchecked,
	                			content:"审核完成",
	                			reason:reason,
	                			r:Math.random()
	                		},
	                		action:action
	                	});
	        		}  else if(action==3){
	        			if($.trim(reason) == ""){
	        				alert("请输入终止原因");
	        				return;
	        			}else if($.trim(reason).length > 200){
	                    	alert("终止原因最大限制为200字符");
	        				return;
	                    }else{
	                    	//flag = bootbox.confirm("是否打回", function(result) {}) 
	                    	flag = confirm("是否终止");
	    					if(!flag){
	    						return false;
	    					}		
	            			$.formAjax({
	    	                	url: url,
	                    		data:{
	                    			code:location.href.split("=")[1],
	                    			identification:12,
	                    			content:$.trim($("#reason").val()),
	                    			r:Math.random()
	                    		},
	    	                    action:action
	    	                });
	                    }
						
	        			
	        		}else if(action==4){

						if($.trim(reason) == ""){
	        				alert("请输入不通过原因");
	        				return;
	        			}
	        			if($.trim(reason).length > 200){
	                    	alert("不通过原因最大限制为200字符");
	        				return;
	                    }
						
	        			flag = confirm("是否确认审核不通过");
						if(!flag){
							return false;
						}
						
	        			$.formAjax({
		                	url: url,
		                	data: {
		                		code:location.href.split("=")[1],
	                			identification:3,
	                			chkIds:checked,
	                			nochkIds:Unchecked,
	                			content:"审核不通过",
	                			reason:reason,
	                			r:Math.random()
		                    },
		                    action:action
		                });
	        		}
	        		
	        	});
	        }
	    },	
	    //副总裁 审批 产品部专用
	    managerAuditV2:function(){
			var managerAudit = "managerAudit"; //经理审批
			var backUp="backUp";
	    	//提交
			$("#OutBtn").click(function () {
	            formSubmit(managerAudit,2);
	            $(".FV_submit").click();
	        });
	        //退回上一步
	        $("#BackOutBtn").click(function () {
	        	formSubmit(managerAudit,4);
	            $(".FV_submit").click();
	        });
	        //终止
	        $("#StopOutBtn").click(function () {
	        	formSubmit(backUp,3);
	            $(".FV_submit").click();
	        });
	        //提交函数
	        function formSubmit(url,action){
	        	$(".FV_submit").unbind("click").bind("click",function () {
	        		var flag;
	        		var reason = $("#reason").val();
	        		var selLength = $('input[name="subBox"]:checked').length;
	 
	                var checked = [];//选中的code
	                var arr2 = [];//全部code
	                var Unchecked=''; // 未选中code
	                $('input[name="subBox"]:checked').each(function () {
	                	checked.push($(this).parents("tr").attr("data-uniqueid"))
	 
	                });
	                 $('input[name="subBox"]').each(function () {
	                    arr2.push($(this).parents("tr").attr("data-uniqueid"))
	                });
	                //去重 
                	Unchecked = checked.concat(arr2).unique2();
                	checked = checked.join(",");
                	Unchecked = Unchecked.join(",");	 
	        		if(action==2){
	                    if (selLength == 0) {
	                        alert("请选择要审核的外包单内容");
	                        return;
	                    }
	                    
	        			flag = confirm("是否确认审核");
						if(!flag){
							return false;
						}
	                	$.formAjax({
	                		url: url,
	                		data:{
	                			code:location.href.split("=")[1],
	                			identification:2,
	                			chkIds:checked,
	                			nochkIds:Unchecked,
	                			content:"审批完成",
	                			reason:reason,
	                			r:Math.random()
	                		},
	                		action:action
	                	});
	        		}  else if(action==3){
	        			if($.trim(reason) == ""){
	        				alert("请输入终止原因");
	        				return;
	        			}else if($.trim(reason).length > 200){
	                    	alert("终止原因最大限制为200字符");
	        				return;
	                    }else{
	                    	//flag = bootbox.confirm("是否打回", function(result) {}) 
	                    	flag = confirm("是否终止");
	    					if(!flag){
	    						return false;
	    					}		
	            			$.formAjax({
	    	                	url: url,
	                    		data:{
	                    			code:location.href.split("=")[1],
	                    			identification:12,
	                    			content:$.trim($("#reason").val()),
	                    			r:Math.random()
	                    		},
	    	                    action:action
	    	                });
	                    }
						
	        			
	        		}else if(action==4){

						if($.trim(reason) == ""){
	        				alert("请输入不通过原因");
	        				return;
	        			}
	        			if($.trim(reason).length > 200){
	                    	alert("不通过原因最大限制为200字符");
	        				return;
	                    }
						
	        			flag = confirm("是否确认审核不通过");
						if(!flag){
							return false;
						}
						
	        			$.formAjax({
		                	url: url,
		                	data: {
		                		code:location.href.split("=")[1],
	                			identification:3,
	                			chkIds:checked,
	                			nochkIds:Unchecked,
	                			content:"审核不通过",
	                			reason:reason,
	                			r:Math.random()
		                    },
		                    action:action
		                });
	        		}
	        		
	        	});
	        }
	    },	
	    //总裁审批
	    managerApproval:function(){
	    	var managerApproval = "managerApproval"; //总裁审批
	    	var backUp="backUp";
	    	//提交
	        $("#OutBtn").click(function () {
	            formSubmit(managerApproval,2);
	            $(".FV_submit").click();
	        });
	        //退回上一步
	        $("#BackOutBtn").click(function () {
	        	 formSubmit(managerApproval,4);
		         $(".FV_submit").click();
	        });
	        //终止
	        $("#StopOutBtn").click(function () {
	        	formSubmit(backUp,3);
	            $(".FV_submit").click();
	        });
	        //提交函数
	        function formSubmit(url,action){
	        	$(".FV_submit").unbind("click").bind("click",function () {
	        		var flag;
	        		var reason = $("#reason").val();
	        		var selLength = $('input[name="subBox"]:checked').length;
	 
	                var checked = [];//选中的code
	                var arr2 = [];//全部code
	                var Unchecked=''; // 未选中code
	                $('input[name="subBox"]:checked').each(function () {
	                	checked.push($(this).parents("tr").attr("data-uniqueid"))
	                });
	                $('input[name="subBox"]').each(function () {
	                    arr2.push($(this).parents("tr").attr("data-uniqueid"))
	                });
	                //去重 
	            	Unchecked = checked.concat(arr2).unique2();
	            	checked = checked.join(",");
	            	Unchecked = Unchecked.join(",");
	        		if(action==2){
	                    if (selLength == 0) {
	                        alert("请选择要审批的外包单内容");
	                        return;
	                    }
	        			flag = confirm("是否确认审批");
						if(!flag){
							return false;
						}
	                	$.formAjax({
	                		url: url,
	                		data:{
	                			code:location.href.split("=")[1],
	                			identification:10,
	                			chkIds:checked,
	                			nochkIds:Unchecked,
	                			content:"审批完成",
	                			reason:reason,
	                			r:Math.random()
	                		},
	                		action:action
	                	});
	        		}else if(action==3){
	        			if($.trim(reason) == ""){
	        				alert("请输入终止原因");
	        				return;
	        			}else if($.trim(reason).length > 200){
	                    	alert("终止原因最大限制为200字符");
	        				return;
	                    }else{
	                    	//flag = bootbox.confirm("是否打回", function(result) {}) 
	                    	flag = confirm("是否终止");
	    					if(!flag){
	    						return false;
	    					}		
	            			$.formAjax({
	    	                	url: url,
	                    		data:{
	                    			code:location.href.split("=")[1],
	                    			identification:12,
	                    			content:$.trim($("#reason").val()),
	                    			r:Math.random()
	                    		},
	    	                    action:action
	    	                });
	                    }
	        		} else if(action==4){
	      
	        			if($.trim(reason) == ""){
	        				alert("请输入不通过原因");
	        				return;
	        			}
	        			if($.trim(reason).length > 200){
	                    	alert("不通过原因最大限制为200字符");
	        				return;
	                    }
	        			
	        			flag = confirm("是否确认审批不通过");
						if(!flag){
							return false;
						}
	        			$.formAjax({
		                	url: url,
		                	data: {
		                		code:location.href.split("=")[1],
	                			identification:4,
	                			chkIds:checked,
	                			nochkIds:Unchecked,
	                			content:"审批不通过",
	                			reason:reason,
	                			r:Math.random()
		                    },
		                    action:action
		                });
	        		}else{
	        			$.formAjax({
		                	url: url,
		                	data: {
		                		BusinessCode:$("#BusinessCode").val(),
		                		r:Math.random()
		                       },
		                    action:action
		                });
	        		}
	        		
	        	});
	        }
	    },
	  //验收审批
	    checkApproval:function(){
	    	var checkApproval = "checkApproval"; //验收 审核完成--审批不通过
     		var backUp = "checkApprovalBackUp/"; //验收 审批不通过
     		
     		
	    	//提交
	        $("#OutBtn").click(function () {
	            formSubmit(checkApproval,2);
	            $(".FV_submit").click();
	        });
	        //打回
	        $("#BackOutBtn").click(function () {
	        	$(".js_backbtnapprove").removeAttr("disabled")
	            formSubmit(backUp,4);
	            $(".FV_submit").click();
	        });
	        
	        //提交函数
	        function formSubmit(url,action){
	        	$(".FV_submit").unbind("click").bind("click",function () {       
	                var flag;
	        		var reason = $("#reason").val();
	                var selLength = $('input[name="subBox"]:checked').length;
	                var code=location.href.split("=")[1];
	                
	                var checked = [];//选中的code
	                var arr2 = [];//全部code
	                var Unchecked=''; // 未选中code
	                $('input[name="subBox"]:checked').each(function () {
	                	checked.push($(this).parents("tr").attr("data-uniqueid"))
	 
	                });
	                 $('input[name="subBox"]').each(function () {
	                    arr2.push($(this).parents("tr").attr("data-uniqueid"))
	                });
	                //去重
	             	Unchecked = checked.concat(arr2).unique2();  // 未选中code
	             	checked = checked.join(",");
	             	Unchecked = Unchecked.join(",");
	             	
	             	if(action==2){
	             		
	                    if (selLength == 0) {
	                        alert("请选择要审批的外包单内容");
	                        return;
	                    }
	        			flag = confirm("是否确认审批");
						if(!flag){
							return false;
						}
	                	$.formAjax({
	                		url: url,
	                		data:{
	                			code:location.href.split("=")[1],
	                			identification:8,
	                			chkIds:checked,
	                			nochkIds:Unchecked,
	                			content:"审批完成",
	                			reason:reason,
	                			r:Math.random()
	                		},
	                		action:action
	                	});
	        		}else if(action==4){
	        			$(".js_backbtnapprove").removeAttr("disabled")
	        			/*if (selLength == 0) {
	                        alert("请选择要验收审批内容");
	                        return;
	                    }*/
	        			if($.trim(reason) == ""){
	        				alert("请输入不通过原因");
	        				return;
	        			}
	        			if($.trim(reason).length > 200){
	                    	alert("不通过原因最大限制为200字符");
	        				return;
	                    }
	        			
                    	flag = confirm("是否确认打回");
    					if(!flag){
    						return false;
    					}
            			$.formAjax({
    	                	url: url,
    	                	data: {
    	                		code:location.href.split("=")[1],
                    			identification:7,
                    			chkIds:checked,
                    			nochkIds:Unchecked,
                    			content:$.trim($("#reason").val()),
                    			reason:reason,
                    			r:Math.random()
    	                    },
    	                    action:action
    	                });
	                 
	        			
	        		}
	                
	        		
	        	});
	        }
	    },
	    //验收审批
	    checkApprovalV2:function(){
	    	var checkApproval = "checkApproval"; //验收 审核完成--审批不通过
     		var backUp = "checkApprovalBackUp/"; //验收 审批不通过
     		
     		
	    	//提交
	        $("#OutBtn").click(function () {
	            formSubmit(checkApproval,2);
	            $(".FV_submit").click();
	        });
	        //打回
	        $("#BackOutBtn").click(function () {
	        	$(".js_backbtnapprove").removeAttr("disabled")
	            formSubmit(backUp,4);
	            $(".FV_submit").click();
	        });
	        
	        //提交函数
	        function formSubmit(url,action){
	        	$(".FV_submit").unbind("click").bind("click",function () {       
	                var flag;
	        		var reason = $("#reason").val();
	                var selLength = $('input[name="subBox"]:checked').length;
	                var code=location.href.split("=")[1];
	                
	                var checked = [];//选中的code
	                var arr2 = [];//全部code
	                var Unchecked=''; // 未选中code
	                $('input[name="subBox"]:checked').each(function () {
	                	checked.push($(this).parents("tr").attr("data-uniqueid"))
	 
	                });
	                 $('input[name="subBox"]').each(function () {
	                    arr2.push($(this).parents("tr").attr("data-uniqueid"))
	                });
	                //去重
	             	Unchecked = checked.concat(arr2).unique2();  // 未选中code
	             	checked = checked.join(",");
	             	Unchecked = Unchecked.join(",");
	             	
	             	if(action==2){
	             		
	                    if (selLength == 0) {
	                        alert("请选择要审批的外包单内容");
	                        return;
	                    }
	        			flag = confirm("是否确认审批");
						if(!flag){
							return false;
						}
	                	$.formAjax({
	                		url: url,
	                		data:{
	                			code:location.href.split("=")[1],
	                			identification:6,
	                			chkIds:checked,
	                			nochkIds:Unchecked,
	                			content:"审批完成",
	                			reason:reason,
	                			r:Math.random()
	                		},
	                		action:action
	                	});
	        		}else if(action==4){
	        			$(".js_backbtnapprove").removeAttr("disabled")
	        			/*if (selLength == 0) {
	                        alert("请选择要验收审批内容");
	                        return;
	                    }*/
	        			if($.trim(reason) == ""){
	        				alert("请输入不通过原因");
	        				return;
	        			}
	        			if($.trim(reason).length > 200){
	                    	alert("不通过原因最大限制为200字符");
	        				return;
	                    }
	        			
                    	flag = confirm("是否确认打回");
    					if(!flag){
    						return false;
    					}
            			$.formAjax({
    	                	url: url,
    	                	data: {
    	                		code:location.href.split("=")[1],
                    			identification:7,
                    			chkIds:checked,
                    			nochkIds:Unchecked,
                    			content:$.trim($("#reason").val()),
                    			reason:reason,
                    			r:Math.random()
    	                    },
    	                    action:action
    	                });
	                 
	        			
	        		}
	                
	        		
	        	});
	        }
	    },
	    //验收审批
	    auditMount:function(){
	    	var auditMount = "auditMount"; //金额审核详细
	    	//提交
	        $("#OutBtn").click(function () {
	            formSubmit(auditMount,2);
	            $(".FV_submit").click();
	        });
	        
	        //提交函数
	        function formSubmit(url,action){
	        	$(".FV_submit").unbind("click").bind("click",function () {       
	                var flag;
	                var selLength = $('input[name="subBox"]:checked').length;
	                
	                var checked = [];//选中的code
	                var arr2 = [];//全部code
	                var Unchecked=''; // 未选中code
	                $('input[name="subBox"]:checked').each(function () {
	                	checked.push($(this).parents("tr").attr("data-uniqueid"))
	 
	                });
	                 $('input[name="subBox"]').each(function () {
	                    arr2.push($(this).parents("tr").attr("data-uniqueid"))
	                });
	                //去重
	             	Unchecked = checked.concat(arr2).unique2();  // 未选中code
	             	checked = checked.join(",");
	             	Unchecked = Unchecked.join(",");
	             	
	             	if(action==2){
	                    if (selLength == 0) {
	                        alert("请选择金额审核内容");
	                        return;
	                    }
	        			flag = confirm("是否确认金额验收审核");
						if(!flag){
							return false;
						}
	                	$.formAjax({
	                		url: url,
	                		data:{
	                			code:location.href.split("=")[1],
	                			identification:9,
	                			chkIds:checked,
	                			nochkIds:Unchecked,
	                			content:"审批完成",
	                			//reason:reason,
	                			r:Math.random()
	                		},
	                		action:action
	                	});
	        		}
	                
	        		
	        	});
	        }
	    },
	    
	    
	    
	    
	});
	$.extend({
		formAjax:function(option){
			var defaults = {
					url:"",
					type:"POST",
					dataType:"JSON",
					data:{},
					action:"",
					//successFn:function(){},
					//errorFn:function(){}
			};
			$.extend(defaults,option);
			$.extend(defaults.data,{r:Math.random()});
			$.ajax({
	            url: defaults.url,
	            type: defaults.type,
	            dataType: defaults.dataType,
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
		        		}else if(defaults.action==2){
		        			btn = "InBtn";
		        		}else if(defaults.action==4){
		        			var btn = "BackToLocationInBtn";	
		        		}
		        		
		                if(defaults.action == 2){
		                	var parentWObj = window.parent.document.getElementById(btn);
		                    var da = {
		                        IsSuccess: d.isSuccess,
		                        Message: d.message,
		                        Data: d.data,
		                        Code: d.data
		                    };
		                    //alert(d.message);
		                    parentWObj.onclick(da);
		                } else if(defaults.action==3){
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
		                }else if(defaults.action==4){		    
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
	});
}());
