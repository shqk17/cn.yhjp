$(function() {
	add();
	$(document.body).on('click','.editable-submit',function(){
		setTimeout(function(){priceSum()},1000);
	});
});


var TableInit = function() {
	var oTableInit = new Object();
	//初始化Table
	oTableInit.Init = function() {
		$('#tb_departments').bootstrapTable({	
			url: rc+ '/outSource/getDetailInfo', //请求后台的URL（*）
			toolbar: '#toolbar', //工具按钮用哪个容器
			striped: true, //是否显示行间隔色
			cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination: false, //是否显示分页（*）
			sortable: false, //是否启用排序
			sortOrder: "asc", //排序方式
			queryParams: oTableInit.queryParams, //传递参数（*）
			sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
			search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			strictSearch: true,
			showColumns: true, //是否显示所有的列
			showRefresh: false, //是否显示刷新按钮
			minimumCountColumns: 2, //最少允许的列数
			clickToSelect: true, //是否启用点击选中行
			height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId: "id", //每一行的唯一标识，一般为主键列
			idField: "id",
			showToggle: false, //是否显示详细视图和列表视图的切换按钮
			cardView: false, //是否显示详细视图
			detailView: false, //是否显示父子表
			responseHandler:responseHandler,		
			columns: [
			{
				field: "idx",
				title: '编号',
				align: 'center',
				valign: 'middle',
				formatter : function(value, row, index) {return index + 1;}
			},
			{
				field: "id",
				title: '编号x',
				align: 'center',
	            valign: 'middle',
	            class:'id_diaplay',
			},
			{
				field: 'gameName',
				title: '游戏',
				align: 'center',
	            valign: 'middle',
				editable:{
					type: 'text',
					title: '游戏名',
					validate: function (v) {
                        if (!v||v.trim()=='') return '游戏名不能为空';
                        if(v.length>50)return '不能超过50个字符';
                        $("#tb_departments").bootstrapTable("resetView");
                    }
				}
			}, 
			{
				field: 'content',
				title: '制作内容',
				align: 'center',
	            valign: 'middle',
				editable:{
					type: 'text',
					title: '制作内容',
					validate: function (v) {
                        if (!v||v.trim()=='') return '制作内容不能为空';
                        if(v.length>100)return '不能超过100个字符';
                        $("#tb_departments").bootstrapTable("resetView");
                    }
				}
			},
			{
				field: 'type',
				title: '类别',
				align: 'center',
	            valign: 'middle',
				editable:{
					type: 'text',
					title: '类别',
					validate: function (v) {
                        if(v.length>100)return '不能超过100个字符';
                        $("#tb_departments").bootstrapTable("resetView");
                    }
				}
			},
			{
				field: 'price',
				title: '价格',
				align: 'center',
	            valign: 'middle',
				editable:{
					type: 'text',
					title: '价格',
					validate: function (v) {
                        if(v.length>11)return '不能超过11个字符';
                        var regu = /(^\d{1,9})([.]{1}\d{1,2})?$/
            			var re = new RegExp(regu);
            			if(!re.test(v))return '您填写的金额不符合规范';
            			v=parseFloat(v+'');
                        $("#tb_departments").bootstrapTable("resetView");
                    }
				}
			},
			{
				field: 'company',
				title: '外包公司',
				align: 'center',
	            valign: 'middle',
				editable:{
					type: 'text',
					title: '外包公司',
					validate: function (v) {
                        if (!v||v.trim()=='') return '外包公司不能为空';
                        if(v.length>100)return '不能超过100个字符';
                        $("#tb_departments").bootstrapTable("resetView");
                         
                    }
				}
			}, 
			{
				field: 'useDay',
				title: '制作时间（天）',
				align: 'center',
	            valign: 'middle',
				editable:{
					type: 'text',
					title: '制作时间',
					validate: function (v) {
                        var isNums="^[0-9]*$";
            			var isNum = new RegExp(isNums);
            			if(!isNum.test(v)) return '只能填整数嘞';
            			if(v.length>9)return '不能超过9个字符';
                        $("#tb_departments").bootstrapTable("resetView");
                    }
				}
		},
		{
			field: 'operat',
			title: '操作',
			align: 'center',
            valign: 'middle',
            events: operateEvents,
            formatter:function(value, row,index){
				a='<a data-id="editAc" href="javascript:void(0)" class="btn btn-xs btn-info js_category_edit_one remove"  title="Remove" "><i class="glyphicon glyphicon-remove"></i></a>';
				return a;
				
			}
		}]
	});
}
	
	
	//得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit: params.limit, //页面大小
			offset: params.offset, //页码
			code:location.href.split("=")[1],
			//departmentname: $("#txt_search_departmentname").val(),
			// statu: $("#txt_search_statu").val()
			
		};
		return temp;
	};
	return oTableInit;
};

//添加内容---弹出框 点击保存   #btn_submit
function addone($this){
	var $table = $("#tb_departments");
		//如果是true希望保存，就开始验证填写的数据
		
			var name=$("#txt_name").val();
			if(name==null||name.trim()==''||name.length>50){
				bootbox.alert("游戏名称必填，且不能超过50字")
				return false;
			}
			var content=$("#txt_content").val();
			if(content==null||content.trim()==''||content.length>100){
				bootbox.alert("制作内容必填，且不能超过100字")
				return false;
			}
			var type=$("#txt_type").val();
			if((type!=null||type.trim()!='')&&type.length>100){
				bootbox.alert("类别不能超过100字")
				return false;
			}
			var prices=$("#txt_price").val();
			var regu = /(^\d{0,9})([.]{1}\d{1,2})?$/
			var re = new RegExp(regu);
			if(prices==null||prices.trim()==''||prices.length>9||!re.test(prices)){
				bootbox.alert("行价格必填，可为小数，您的金额格式可能不对")
				return false;
			}
			var price=parseFloat(prices+'').toFixed(2);
			
			var company=$("#txt_company").val();
			if(company==null||company.trim()==''||company.length>100){
				bootbox.alert("外包公司必填，且不能超过100字")
				return false;
			}
			var useDays=$("#txt_useDay").val();
			var isNums="^[0-9]*$";
			var isNum = new RegExp(isNums);
			var useDay=null;
			if(useDays!=null&&useDays.trim()!=''){
				if(useDays.length>9||!isNum.test(useDays)){
				bootbox.alert("制作时间只能为整数，且不能超过9位")
				return false;
			    }
				 useDay=parseFloat(useDays+'');
			}
				//数据验证完毕开始拍入页面
		        var index = $table.bootstrapTable('getData').length+1;
		        rows=[]
		        rows.push({
		        	id: index,
		        	code:0,
	            	gameName: name,
	            	content:content,
	            	type:type,
	            	price:price,
	            	company:company,
	            	useDay:useDay,
	            	operat:'<a data-id="editAc" href="javascript:void(0)" class="btn btn-xs btn-info js_category_edit_one remove"  title="Remove" "><i class="glyphicon glyphicon-remove"></i></a>'
	            
		        })
		        $table.bootstrapTable('append', rows);
		        reset()
		 $('#myModal').modal('hide')
		 $("[data-toggle='tooltip']").tooltip();
		 priceSum();
		
}
//添加内容弹层里的表单
function reset(){
	document.getElementById("add_from").reset(); 
}

window.operateEvents = {'click .remove': function (e, value, row, index) { 
        	var roWD=parseInt($(this).parents("tr").find("td").eq(1).html());
        	/*$("#tb_departments").bootstrapTable('remove', {
                field: 'id',
                values: [row.roWD]
            });*/
        	$("#tb_departments").bootstrapTable('removeByUniqueId',roWD);
        	if($("#deleteCode").text()!=null&&$("#deleteCode").text()!=''){
        		$("#deleteCode").append(','+row.code)
        	}else{
        	$("#deleteCode").append(row.code)
        	}
        	setTimeout(function(){priceSum()},800);
        }
    };

function back(){
	bootbox.confirm("确认取消改外包单吗？", function(result) {
		if(result){
			//确认取消，返回上一页
			$("#xlf").val("");
			window.location.href="/outSource/index";
		}
	})
}


function removeTr(start,code){
	setTimeout(function(){for(var i=start;i<=code;i++){
		$("#tb_departments").bootstrapTable('removeByUniqueId', i);	
	}},50)
}

function getDateTable(){
	var K;
	var att = {};
	var code,gameName,content,type,price,company,useDay,operat
	var Array = [];
	var $table=$("#tb_departments")
	var len=$table.bootstrapTable('getData').length;
	code = $table.bootstrapTable('getData')[len-1].id;
	var start=$table.bootstrapTable('getData')[len-1].id+1;
	var id=0;
	$('#dateTable tbody tr').each(function(){//遍历每一个tr
		var st = [];//空数组，用于存放每一个tr里td的值
		var chil = $(this).children('td');
		var tdcount = chil.length;
		var txt;
		var operat = '<a data-id="editAc" href="javascript:void(0)" class="btn btn-xs btn-info js_category_edit_one remove"  title="Remove" ">'+
						'<i class="glyphicon glyphicon-remove"></i>'+
					 '</a>';
		for (k=0;k<tdcount;k++) {//循环得到td的四项内容值
			txt =chil.eq(k).text();
			st.push(txt);
		}
		id=id+1;
		gameName = st[0];
		content = st[1];
		type = st[2];
		price = st[3];
		company = st[4];
		useDay = st[5];
		if(gameName=='游戏'){
			return true;
		}
		
		var isNums="^[0-9]*$";
		var isNum = new RegExp(isNums);

		var regu = /(^\d{1,9})([.]{1}\d{1,2})?$/
		var re = new RegExp(regu);
		if(gameName == "" &&  content == "" && type == "" && price == "" && company == "" && useDay == ""){
			return true
		}
		
		if(gameName == null||gameName.trim() == ''||gameName.length>50){
			removeTr(start,code);
			console.log(code+"--id=="+id)
			bootbox.alert("第"+id+"行游戏名称必填，且不能超过50字");
			$("#xlf").val("");
			return false;
		}else if(content==null||content.trim()==''||content.length>100){
			removeTr(start,code);
			console.log(code+"--id=="+id)
			bootbox.alert("第"+id+"行制作内容必填，且不能超过100字");
			$("#xlf").val("");
			return false;
		}else if(type != null && type.trim() != '' && type.length>100){
			removeTr(start,code);
			console.log(code+"--id=="+id)
			bootbox.alert("第"+id+"行类别不能超过100字");
			$("#xlf").val("");
			return false;
		}else if(price == null||price.trim() == ''||price.length>9||!re.test(price)){
			removeTr(start,code);
			console.log(code+"--id=="+id)
			bootbox.alert("第"+id+"行价格必填，可为小数，您的金额格式可能不对 ");
			$("#xlf").val("");
			return false;
		}else if(company==null||company.trim()==''||company.length>100){
			removeTr(start,code);
			console.log(code+"--id=="+id)
			bootbox.alert("第"+id+"行外包公司必填，且不能超过100字");
			$("#xlf").val("");
			return false;
		}else if(useDay!=null&&useDay.trim()!=''){
			if(useDay.length>9||!isNum.test(useDay)){
				removeTr(start,code);
				console.log(code+"--id=="+id)
				bootbox.alert("第"+id+"行制作时间只能为整数，且不能超过9字");
				$("#xlf").val("");
				return false;
			}
		}
		price=parseFloat(price+'').toFixed(2);
		useDay=parseFloat(useDay+'');
		code=code+1;
		att = {
			'id':code,
			'code':0,
			'gameName':gameName,
			'content':content,
			'type':type,
			'price':price,
			'company':company,
			'useDay':useDay,
			'operat':operat

		};//把每一个tr的数据写成一个json数据
		Array.push(att);//把json数据写入数组
	})
	setTimeout(function(){priceSum()},1000);
	$table.bootstrapTable('append', Array);
	$table.bootstrapTable('scrollTo', 'bottom');
}
function responseHandler(res) {
	if (!res.success) {
		bootbox.alert(res.message)
		return res;
	}
	else{
		//返回值
		$("#outSourceName").text('外包名称 : '+ res.message);
		  
		//$("#outSourceName").append(res.remark)
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