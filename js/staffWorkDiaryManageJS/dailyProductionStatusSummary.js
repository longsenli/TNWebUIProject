function dailyProductionStatusSummaryIndustrialPlantSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getindustrialplant",
		type: "GET",
		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		success: function(dataRes) {

			$("#industrialPlantSlct").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				//console.log(models);
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id.toString() + ">" +
						models[i].name.toString() + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				// $('#industrialPlantSlct').selectpicker('mobile');
				if(localStorage.getItem('plantID') != null && localStorage.getItem('plantID') != 'undefined' && localStorage.getItem('plantID').toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('plantID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#industrialPlantSlct').selectpicker('hide');
						}
					}
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render'); 
				if(localStorage.roleID < windowRoleID.BZ) {
					$('#industrialPlantSlct').selectpicker('hide');
				}
				dailyProductionStatusSummaryProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function dailyProductionStatusSummaryProcessSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getproductionprocess",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		success: function(dataRes) {
			$("#productionProcessSlct").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   

				if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('processID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionProcessSlct').selectpicker('hide');
						}
					}

				}

				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render'); 
				if(localStorage.roleID < windowRoleID.BZ) {
					$('#industrialPlantSlct').selectpicker('hide');
				}

				dailyProductionStatusSummaryLineSlctFun();

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function dailyProductionStatusSummaryLineSlctFun() {
	//	return true;
	//	if(!($.isEmptyObject(first)) && first.toString().length > 1) {
	//
	//		return;
	//	}
	//alert("生产线选择");

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());

	$.ajax({
		url: window.serviceIP + "/api/basicdata/getproductionline",
		type: "POST",
		data: formData,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		async: false,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			$("#productionLineSlct").find('option').remove();
			$('#productionLineSlct').append(("<option value=" + "-1" + ">" + "全部产线"  + "</option>").toString());

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render'); 
				if(localStorage.roleID < windowRoleID.BZ) {
					$('#productionLineSlct').selectpicker('hide'); 
				} 
				//	$('#productionLineSlct').selectpicker('hide');   
				dailyProductionStatusSummaryWorkContentSlctFun();
				setTimeout(dailyProductionStatusSummaryWorkingLocationSlctFun(), 200);;
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function dailyProductionStatusSummaryWorkContentSlctFun() {
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());

	$.ajax({
		url: window.serviceIP + "/api/basicdata/getWorkContentDetail",
		type: "POST",
		data: formData,
		//contentType: "application/json",
		//dataType: "json",
		headers: {
			Token: localStorage.getItem('token')
		},

		//processData: true,
		async: false,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			$("#workContentSlct").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#workContentSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#workContentSlct').selectpicker('refresh');
				$('#workContentSlct').selectpicker('render'); 
				$('#workContentSlct').selectpicker('hide'); 
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function dailyProductionStatusSummaryWorkingLocationSlctFun() {
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	formData.append("lineID", "-1");
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getworklocation",
		type: "POST",
		data: formData,
		//contentType: "application/json",
		//dataType: "json",
		headers: {
			Token: localStorage.getItem('token')
		},

		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			$("#workingkLocationSlct").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#workingkLocationSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#workingkLocationSlct').selectpicker('refresh');
				$('#workingkLocationSlct').selectpicker('render');   
				$('#workingkLocationSlct').selectpicker('hide');   
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function scanQRRecordRowClick(row) {
	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}
var timeNum = 1;

function getTMPProductionWageRecord() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true,
		formatter: function(value, row, index) {
			return {
				checked: true //设置选中
			};
		}
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
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
	if($("#productionProcessSlct").val() == windowProcessEnum.JZ|| $("#productionProcessSlct").val() == windowProcessEnum.JS
	|| $("#productionProcessSlct").val() == windowProcessEnum.ZHQD) {
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
		"title": "时长",
		"field": "classType2"
	});

	columnsArray.push({
		"title": "个人产量",
		"field": "shelfProduction",
		editable: {
			type: 'text',
			title: '个人产量',
			validate: function(value, row, index) {
				if(!Number(value)) {
					return "请输入合法数字";
				}
			}
		}
	});
	columnsArray.push({
		"title": "工价",
		"field": "univalence",
		editable: {
			type: 'text',
			title: '工价',
			validate: function(value, row, index) {
				if(!Number(value)) {
					return "请输入合法数字";
				}
			}
		}
	});
	columnsArray.push({
		"title": "个人工资",
		"field": "wage",
		editable: {
			type: 'text',
			title: '个人工资',
			validate: function(value, row, index) {
				if(!Number(value)) {
					return "请输入合法数字";
				}
			}
		}
	});

	var formData = new FormData();
	formData.append("plantID", $("#industrialPlantSlct").val());
	formData.append("processID", $("#productionProcessSlct").val());
	formData.append("lineID", $("#productionLineSlct").val());
	formData.append("classType", $("#classTypeSlct").val());
	formData.append("dayString", document.getElementById("startTime").value.toString());

	$.ajax({
		url: window.serviceIP + "/api/staffWorkDiary/getTMPProductionWageInfo",
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
					//singleSelect: true,
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
					columns: columnsArray,
					onClickRow: function(row) {
						setTimeout("updateRowCell('" + row["id"] + "')", 1000);
					}
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

function updateRowCell(id) {
	var row = $('#table').bootstrapTable("getRowByUniqueId", id);
	if(Math.abs(row["wage"] - row["shelfProduction"] * row["univalence"]) > 0.5) {
		row["wage"] = (row["shelfProduction"] * row["univalence"]).toFixed(2);
		$('#table').bootstrapTable('updateByUniqueId', {
			id: id,
			row: row
		});
	}
}

function confirmProductionWageRecord() {
	var tableData = $('#table').bootstrapTable('getSelections');
	if(!tableData || tableData.length < 1) {
		alert("请先选定工人信息再操作!")
		return;
	}
	if(!tableData[0].id) {
		alert("记录已确认!");
		return;
	}
	for(var i in tableData) {
		if(!tableData[i].staffName || tableData[i].staffName.length < 2) {
			alert("有产量没有工人认领,请确认后重试!");
			return;
		}
	}
	var formData = new FormData();
	formData.append("verifierID", localStorage.userID);
	formData.append("verifierName", localStorage.username);
	formData.append("recordJsonString", JSON.stringify(tableData));

	$.ajax({
		url: window.serviceIP + "/api/staffWorkDiary/confirmProductionWageInfo?",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: function(data) {
			if(data.status == 1) {
				getFinalProductionWageRecord();
				alert(data.message);
			} else {
				alert("确认失败！" + data.message);
			}
		}
	});
}

function closeModal(modalName) {
	$("#" + modalName).modal('hide');
}

function deleteRecord(qrCode) {
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}
	if(!row[0].id) {
		alert("已确认记录不能删除!");
		return;
	}
	$('#table').bootstrapTable('removeByUniqueId', row[0].id);
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
	if($("#productionProcessSlct").val() == windowProcessEnum.JZ|| $("#productionProcessSlct").val()  == windowProcessEnum.JS
	|| $("#productionProcessSlct").val() == windowProcessEnum.ZHQD) {
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