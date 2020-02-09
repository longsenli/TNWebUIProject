function staffBehaviorRecordSaveRecord() {

	var selectedDay = new Date(document.getElementById("daytime").value);
	var nowDay = new Date();
	if(selectedDay.format("yyyy-MM-dd") > nowDay.format("yyyy-MM-dd")) {
		alert("登记日期大于当前日期无效！" + document.getElementById("daytime").value)
		return;
	}
	if($("#staffName").val() == '') {
		alert($("#staffName").attr('placeholder'));
		$("#staffName").focus();
		return false;
	}
	if($("#identityID").val() == '') {
		alert($("#identityID").attr('placeholder'));
		$("#identityID").focus();
		return false;
	}
	if($("#telephone").val() == '') {
		alert($("#telephone").attr('placeholder'));
		$("#telephone").focus();
		return false;
	}
	if($("#process").val() == '') {
		alert($("#process").attr('placeholder'));
		$("#process").focus();
		return false;
	}
	if($("#stayLocation").val() == '') {
		alert($("#stayLocation").attr('placeholder'));
		$("#stayLocation").focus();
		return false;
	}
	if($("#contactSeverity").val() == '') {
		alert($("#contactSeverity").attr('placeholder'));
		$("#contactSeverity").focus();
		return false;
	}
	if($("#abnormalShelf").val() == '') {
		alert($("#abnormalShelf").attr('placeholder'));
		$("#abnormalShelf").focus();
		return false;
	}
	if($("#abnormalPartner").val() == '') {
		alert($("#abnormalPartner").attr('placeholder'));
		$("#abnormalPartner").focus();
		return false;
	}
	if($("#quarantine").val() == '') {
		alert($("#quarantine").attr('placeholder'));
		$("#quarantine").focus();
		return false;
	}
	$("#saveBT").attr('disabled', true);
	var recordMapObjet = window.formToObject($("#staffBehaviorRecordForm"));

	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/addShelfBehaviorRecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(recordMapObjet).toString(),
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(dataRes) {

			$("#industrialPlantSlct").find('option').remove();

			if(dataRes.status == 1) { 
				var today = new Date(document.getElementById("daytime").value);
				today.setDate(today.getDate() + 1);
				document.getElementById("daytime").value = today.format("yyyy-MM-dd");
				//document.getElementById("daytime").value = today.format("yyyy-MM-dd");
				//document.getElementById("daytime").value = "2020-01-22";
				$("#saveBT").attr('disabled', false);
				alert("保存成功,日期自动跳转至下一日！" + document.getElementById("daytime").value);
			} else {
				$("#saveBT").attr('disabled', false);
				alert(dataRes.message);
			}
		}
	});
	$("#saveBT").attr('disabled', false);
};

function getShelfFilloutRecord() {
	if($("#identityID").val() == '') {
		alert($("#identityID").attr('placeholder'));
		$("#identityID").focus();
		return false;
	}
	var columnsArray = [];
	columnsArray.push({
		"title": "员工姓名",
		"field": "name"
	});
	columnsArray.push({
		"title": "手    机    号    码",
		"field": "telephone"
	});
	columnsArray.push({
		"title": "登 记 日 期",
		"field": "daytime"
	});

	columnsArray.push({
		"title": "当日所在省市",
		"field": "stayLocation"
	});
	columnsArray.push({
		"title": "是否接触湖北、杭州、温州、台州人员",
		"field": "contactSeverity"
	});

	columnsArray.push({
		"title": "自身身体有无发烧、干咳等异常",
		"field": "abnormalShelf"
	});
	columnsArray.push({
		"title": "身边人员身体有无异常",
		"field": "abnormalPartner"
	});

	columnsArray.push({
		"title": "是否居家或医院隔离",
		"field": "quarantine"
	});
	columnsArray.push({
		"title": "其他说明",
		"field": "remark"
	});

	var formData = new FormData();
	formData.append("identityID", $("#identityID").val());

	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/getShelfFilloutEpidemicRecord",
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

function getFinalProductionWageRecord() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});

	columnsArray.push({
		"title": "厂区",
		"field": "plantID",
		visible: false
	});
	columnsArray.push({
		"title": "流程",
		"field": "processID",
		visible: false
	});
	columnsArray.push({
		"title": "产线",
		"field": "lineID",
		formatter: function(value, row, index) {
			return $("#productionLineSlct option[value='" + value + "']").text();
		}
	});
	if($("#productionProcessSlct").val() == windowProcessEnum.JZ || $("#productionProcessSlct").val() == windowProcessEnum.JS ||
		$("#productionProcessSlct").val() == windowProcessEnum.ZHQD) {
		columnsArray.push({
			"title": "工位",
			"field": "worklocationID",
			formatter: function(value, row, index) {
				return $("#workingkLocationSlct option[value='" + value + "']").text();
			}
		});
	}

	columnsArray.push({
		"title": "岗位",
		"field": "extd1",
		formatter: function(value, row, index) {
			return $("#workContentSlct option[value='" + value + "']").text();
		}
	});

	columnsArray.push({
		"title": "物料型号",
		"field": "materialName"
	});

	columnsArray.push({
		"title": "物料型号",
		"field": "materialID",
		visible: false
	});
	columnsArray.push({
		"title": "总产量",
		"field": "totalProduction"
	});

	columnsArray.push({
		"title": "姓名",
		"field": "staffName"
	});
	columnsArray.push({
		"title": "姓名",
		"field": "staffID",
		visible: false
	});
	columnsArray.push({
		"title": "日期",
		"field": "dayTime"
	});
	columnsArray.push({
		"title": "白夜班",
		"field": "classType1"
	});
	columnsArray.push({
		"title": "班组",
		"field": "extd2"
	});
	columnsArray.push({
		"title": "时长",
		"field": "classType2"
	});
	columnsArray.push({
		"title": "日期",
		"field": "dayTime"
	});

	columnsArray.push({
		"title": "个人产量",
		"field": "shelfProduction"
	});
	columnsArray.push({
		"title": "工价",
		"field": "univalence"
	});
	columnsArray.push({
		"title": "个人工资",
		"field": "wage"
	});

	columnsArray.push({
		"title": "确认人",
		"field": "verifierName"
	});
	columnsArray.push({
		"title": "确认时间",
		"field": "verifyTime"
	});

	var formData = new FormData();
	formData.append("plantID", $("#industrialPlantSlct").val());
	formData.append("processID", $("#productionProcessSlct").val());
	formData.append("classType", $("#classTypeSlct").val());
	formData.append("dayString", document.getElementById("startTime").value.toString());

	$.ajax({
		url: window.serviceIP + "/api/staffWorkDiary/getFinalProductionWageInfo",
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
					exportDataType: "basic", //basic', 'all', 'selected'.
					exportTypes: ['doc', 'excel'], //导出类型'json','xml','png','csv','txt','sql','doc','excel','xlsx','pdf'
					//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
					exportOptions: { //导出参数
						ignoreColumn: [0, 0], //忽略某一列的索引  
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

function deleteFinalProductionWageRecord() {
	if(localStorage.roleID < window.windowRoleID.CJZG) {
		alert("只有车间主管以上人员有权删除确认后的产量信息!");
		return;
	}
	var warningInfo = "确认要删除" + $("#productionProcessSlct").find("option:selected").text().toString() +
		"工序," + document.getElementById("startTime").value.toString() + "日期," + $("#classTypeSlct").val() + "的产量确认信息?"
	if(!window.changeConfirmDlg(warningInfo)) {
		return;
	}
	var formData = new FormData();
	formData.append("plantID", $("#industrialPlantSlct").val());
	formData.append("processID", $("#productionProcessSlct").val());
	formData.append("classType", $("#classTypeSlct").val());
	formData.append("dayString", document.getElementById("startTime").value.toString());

	$.ajax({
		url: window.serviceIP + "/api/staffWorkDiary/deleteConfirmProductionWageRecord",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//contentType: "application/json",
		//dataType: "json",
		headers: {
			Token: localStorage.getItem('token')
		},

		success: function(dataRes) {
			if(dataRes.status == 1) { 
				getFinalProductionWageRecord();
				alert('删除成功!');

			} else {
				alert("删除失败！" + dataRes.message);
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