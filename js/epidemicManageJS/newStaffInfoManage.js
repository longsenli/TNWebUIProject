function saveNewStaffBasicInfo() {

	if($("#staffName").val() == '') {
		alert($("#staffName").attr('placeholder'));
		$("#staffName").focus();
		return false;
	}


	if($("#age").val() == '') {
		alert($("#age").attr('placeholder'));
		$("#age").focus();
		return false;
	}
	
	if($("#telephone").val() == '') {
		alert($("#telephone").attr('placeholder'));
		$("#telephone").focus();
		return false;
	}

	if($("#familyLocation").val() == '') {
		alert($("#familyLocation").attr('placeholder'));
		$("#familyLocation").focus();
		return false;
	}

  var regExpP = /^1[3456789]\d{9}$/; //手机号
 
    if (!regExpP.test($("#telephone").val())) { 
        alert("手机号码有误！" +$("#telephone").attr('placeholder'));
		$("#telephone").focus();
		return false;
    }
 


	$("#saveBT").attr('disabled', true);
	var recordMapObjet = window.formToObject($("#staffBehaviorRecordForm"));
	
	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/addNewStaffBasicInfo",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(recordMapObjet).toString(),
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(dataRes) {

			if(dataRes.status == 1) { 
				alert("登记成功!祝您生活愉快,请带好口罩,保持距离!");
			} else {
				$("#saveBT").attr('disabled', false);
				alert(dataRes.message);
			}
		}
	});
	$("#saveBT").attr('disabled', false);
};

function getNewStaffBasicInfo() {
	if($("#staffName").val() == '') {
		alert($("#staffName").attr('placeholder'));
		$("#staffName").focus();
		return false;
	}
	var columnsArray = [];
	columnsArray.push({
		"title": "员工姓名",
		"field": "name"
	});
	
	columnsArray.push({
		"title": "性别",
		"field": "sex"
	});

	columnsArray.push({
		"title": "年龄",
		"field": "age"
	});
	columnsArray.push({
		"title": "手    机    号    码",
		"field": "telephoneNumber"
	});
	columnsArray.push({
		"title": "家庭住址",
		"field": "familyLocation"
	});
	columnsArray.push({
		"title": "学历",
		"field": "educationLevel"
	});

	
	columnsArray.push({
		"title": "应聘岗位",
		"field": "employmentObjective"
	});


	columnsArray.push({
		"title": "其他说明",
		"field": "remark"
	});

	var formData = new FormData();
	formData.append("name", $("#staffName").val());

	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/getShelfBasicInfoRecord",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(dataRes) {
			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");

				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
					toolbarAlign: 'left',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 40,
					pageNumber: 1,
					uniqueId: "id",
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					search: true,
					searchAlign: 'right',
					pagination: true,
					//>>>>>>>>>>>>>>导出excel表格设置
					showExport: true, //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
					exportDataType: "all", //basic', 'all', 'selected'.
					exportTypes: ['doc', 'excel'], //导出类型'json','xml','png','csv','txt','sql','doc','excel','xlsx','pdf'
					//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
					exportOptions: { //导出参数
						//ignoreColumn: [0, 0], //忽略某一列的索引  
						fileName: '数据导出', //文件名称设置  
						worksheetName: 'Sheet1', //表格工作区名称  
						tableName: '数据导出表',
						excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
						//onMsoNumberFormat: DoOnMsoNumberFormat  
					},
					//导出excel表格设置<<<<<<<<<<<<<<<<
					columns: columnsArray
				});
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		},
		error: function(jqXHR, exception) {
			var msg = '';
			if(jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if(jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if(jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if(exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if(exception === 'timeout') {
				msg = 'Time out error.';
			} else if(exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert("请求出错," + msg);
		}
	});
}