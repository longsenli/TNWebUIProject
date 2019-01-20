function workShiftPlantSlctFun(htmlName) {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getindustrialplant",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {

			$("#workShiftPlantSlct").find('option').remove();
			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#workShiftPlantSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())

				}
				$('#workShiftPlantSlct').selectpicker('refresh');
				$('#workShiftPlantSlct').selectpicker('render');   
				$('#workShiftPlantSlct').selectpicker('mobile');
				if("shiftTeamManage" == htmlName) {
					workShiftProcessSlctFun(htmlName);

				} else if("workShiftManage" == htmlName) {

					workShiftTeamSlctFun(htmlName);
				} else if("workShiftRecordManage" == htmlName) {
					$('#dayNightType').selectpicker('refresh');
					$('#dayNightType').selectpicker('render');   
					$('#dayNightType').selectpicker('mobile');
					workShiftProcessSlctFun('workShiftRecordManage');
				}

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function workShiftProcessSlctFun(htmlName) {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getproductionprocess",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			$("#processSlctType").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#processSlctType').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#processSlctType').selectpicker('refresh');
				$('#processSlctType').selectpicker('render');   
				$('#processSlctType').selectpicker('mobile');
				if("shiftTeamManage" == htmlName) {
					$('#processSlctType').selectpicker('hide');
					initShiftTeamTable();
				} else if("workShiftRecordManage" == htmlName)
					workShiftLineSlctFun(htmlName);
				else if("workShiftManage" == htmlName) {
					workShiftLineSlctFun(htmlName);
					$('#processSlctType').selectpicker('hide');
				}
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function workShiftLineSlctFun(htmlName) {
	var formData = new FormData();
	formData.append("plantID", document.workShiftSelectForm.workShiftPlantSlct.value.toString());
	if("workShiftManage" == htmlName)
		formData.append("processID", document.workShiftSelectForm.workShiftTeamSlct.value.toString().split("###")[1]);
	else if("workShiftRecordManage" == htmlName) {
		formData.append("processID", document.workShiftSelectForm.processSlctType.value.toString());
	}
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getproductionline",
		type: "POST",
		data: formData,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			$("#lineSlctType").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#lineSlctType').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#lineSlctType').selectpicker('refresh');
				$('#lineSlctType').selectpicker('render');   
				$('#lineSlctType').selectpicker('mobile');
				$('#lineSlctType').selectpicker('hide');
				if("workShiftRecordManage" == htmlName) {
					initWorkShiftRecordTable(htmlName);
				} else if("workShiftManage" == htmlName) {
					initWorkShiftTable();
				}
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function workShiftTeamSlctFun(htmlName) {
	$.ajax({
		url: window.serviceIP + "/api/workshift/getshiftteam?plantID=" + document.workShiftSelectForm.workShiftPlantSlct.value.toString(),
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			$("#workShiftTeamSlct").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#workShiftTeamSlct').append(("<option value=" + models[i].id + "###" + models[i].processid + ">" + models[i].abshiftname.toString()  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#workShiftTeamSlct').selectpicker('refresh');
				$('#workShiftTeamSlct').selectpicker('render');   
				$('#workShiftTeamSlct').selectpicker('mobile');

				workShiftProcessSlctFun(htmlName);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function initShiftTeamTable() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "名称",
		"field": "abshiftname"
	});

	columnsArray.push({
		"title": "责任人",
		"field": "staffname"
	});
	columnsArray.push({
		"title": "流程",
		"field": "processid",
		visible: false
	});
	columnsArray.push({
		"title": "流程名称",
		"field": "流程名称",
		formatter: function(value, row, index) {
			return $("#processSlctType option[value='" + row.processid + "']").text();
		}
	});
	columnsArray.push({
		"title": "plantid",
		"field": "plantid",
		visible: false
	});
	columnsArray.push({
		"title": "AB班",
		"field": "abshift"
	});
	columnsArray.push({
		"title": "staffid",
		"field": "staffid",
		visible: false
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "status",
		"field": "status",
		visible: false
	});
	$.ajax({
		url: window.serviceIP + "/api/workshift/getshiftteam?plantID=" + document.workShiftSelectForm.workShiftPlantSlct.value.toString(),
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar1',
					singleSelect: true,
					clickToSelect: true,
					sortName: "recordTime",
					sortOrder: "desc",
					pageSize: 15,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//search: true,
					pagination: true,
					columns: columnsArray
				});
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

}

function changeShiftTeam() {
	var formData = new FormData($("#workShiftForm")[0]);

	$.ajax({
		url: window.serviceIP + "/api/workshift/changeshiftteam",
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		data: window.getFormDataToJson(formData),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				initShiftTeamTable();
				alert('保存成功!');
				$("#myModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
}

function selectedShiftTeamRow(param) {
	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	$("#processid").find('option').remove();

	$("#processSlctType option").each(function() {
		if($(this).val() == "-1") {
			return;
		}
		$('#processid').append(("<option value=" + $(this).val() + ">" + $(this).text()  + "</option>").toString());
	})
	$('#processid').selectpicker('refresh');
	$('#processid').selectpicker('render'); 
	$('#processid').selectpicker('mobile');

	var optionType = param.getAttribute("id");
	if(optionType == "addRow") {
		$("#workShiftForm" + " #plantid").val(document.workShiftSelectForm.workShiftPlantSlct.value.toString());

		$('#myModal').modal('show');
	} else if(optionType == "editRow") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		for(var key in row[0]) {
			if(key == 0) {
				continue;
			}
			if(key == "abshift" || key == "processid" || key == "materialid") {

				var numbers = $("#workShiftForm" + " #" + key).find("option"); //获取select下拉框的所有值
				for(var j = 1; j < numbers.length; j++) {

					if($(numbers[j]).val().toString() == row[key]) {
						$(numbers[j]).attr("selected", "selected");
					}
				}
				$('#' + key).selectpicker('refresh');
				$('#' + key).selectpicker('render'); 
				continue;
				// $("#workOrderManageForm" + " #" + key).selectpicker('val',"");
			}
			$("#workShiftForm" + " #" + key).val(row[0][key])
		}
		$('#myModal').modal('show');
	} else if(optionType == "deleteRow") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteShiftTeam(row[0]["id"]);
	}
}

function deleteShiftTeam(rowID) {
	//	alert(equipID);
	//	var jsonStr = {};
	//	jsonStr.push({
	//		"equipID": equipID
	//	});
	//JSON.stringify(jsonStr);,
	var formData = new FormData();
	formData.append("id", rowID);
	$.ajax({
		url: window.serviceIP + "/api/workshift/deleteshiftteam",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				initShiftTeamTable();
				$("#myModal").modal('hide');
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};

function initWorkShiftTable() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "名称",
		"field": "shiftteamid",
		visible: false
	});

	columnsArray.push({
		"title": "员工",
		"field": "staffname"
	});
	columnsArray.push({
		"title": "流程",
		"field": "processid",
		visible: false
	});
	columnsArray.push({
		"title": "流程名称",
		"field": "流程名称",
		formatter: function(value, row, index) {
			return $("#processSlctType option[value='" + row.processid + "']").text();
		}
	});
	columnsArray.push({
		"title": "plantid",
		"field": "plantid",
		visible: false
	});
	columnsArray.push({
		"title": "产线",
		"field": "lineid",
		visible: false
	});
	columnsArray.push({
		"title": "产线名称",
		"field": "产线名称",
		formatter: function(value, row, index) {
			return $("#lineSlctType option[value='" + row.lineid + "']").text();
		}
	});
	columnsArray.push({
		"title": "staffid",
		"field": "staffid",
		visible: false
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "status",
		"field": "status",
		visible: false
	});
	$.ajax({
		url: window.serviceIP + "/api/workshift/getworkshiftdetail?plantID=" + document.workShiftSelectForm.workShiftPlantSlct.value.toString() +
			"&shiftTeamID=" + document.workShiftSelectForm.workShiftTeamSlct.value.toString().split("###")[0],
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar1',
					singleSelect: true,
					clickToSelect: true,
					sortName: "recordTime",
					sortOrder: "desc",
					pageSize: 15,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//search: true,
					pagination: true,
					columns: columnsArray
				});
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

}

function changeWorkShift() {
	var formData = new FormData($("#workShiftForm")[0]);

	$.ajax({
		url: window.serviceIP + "/api/workshift/changeworkshift",
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		data: window.getFormDataToJson(formData),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				initWorkShiftTable();
				alert('保存成功!');
				$("#myModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
}

function selectedWorkShiftRow(param) {
	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	$("#lineid").find('option').remove();

	$("#lineSlctType option").each(function() {
		if($(this).val() == "-1") {
			return;
		}
		$('#lineid').append(("<option value=" + $(this).val() + ">" + $(this).text()  + "</option>").toString());
	})
	$('#lineid').selectpicker('refresh');
	$('#lineid').selectpicker('render'); 
	$('#lineid').selectpicker('mobile');

	var optionType = param.getAttribute("id");
	if(optionType == "addRow") {
		$("#workShiftForm" + " #plantid").val(document.workShiftSelectForm.workShiftPlantSlct.value.toString());
		$("#workShiftForm" + " #processid").val(document.workShiftSelectForm.workShiftTeamSlct.value.toString().split("###")[1]);
		$("#workShiftForm" + " #shiftteamid").val(document.workShiftSelectForm.workShiftTeamSlct.value.toString().split("###")[0]);

		$('#myModal').modal('show');
	} else if(optionType == "editRow") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		for(var key in row[0]) {
			if(key == 0) {
				continue;
			}
			if(key == "lineid") {

				var numbers = $("#workShiftForm" + " #" + key).find("option"); //获取select下拉框的所有值
				for(var j = 1; j < numbers.length; j++) {

					if($(numbers[j]).val().toString() == row[key]) {
						$(numbers[j]).attr("selected", "selected");
					}
				}
				$('#' + key).selectpicker('refresh');
				$('#' + key).selectpicker('render'); 
				continue;
				// $("#workOrderManageForm" + " #" + key).selectpicker('val',"");
			}
			$("#workShiftForm" + " #" + key).val(row[0][key])
		}
		$('#myModal').modal('show');
	} else if(optionType == "deleteRow") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteWorkShift(row[0]["id"]);
	}
}

function deleteWorkShift(rowID) {
	//	alert(equipID);
	//	var jsonStr = {};
	//	jsonStr.push({
	//		"equipID": equipID
	//	});
	//JSON.stringify(jsonStr);,
	var formData = new FormData();
	formData.append("id", rowID);
	$.ajax({
		url: window.serviceIP + "/api/workshift/deleteworkshift",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				initWorkShiftTable();
				$("#myModal").modal('hide');
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};

function initWorkShiftRecordTable() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "班次",
		"field": "workshift"
	});

	columnsArray.push({
		"title": "员工名称",
		"field": "staffname"
	});

	columnsArray.push({
		"title": "AB班",
		"field": "abshift"
	});
	columnsArray.push({
		"title": "白夜班",
		"field": "daynight"
	});
	columnsArray.push({
		"title": "plantid",
		"field": "plantid",
		visible: false
	});
	columnsArray.push({
		"title": "流程",
		"field": "processid",
		visible: false
	});
	columnsArray.push({
		"title": "流程名称",
		"field": "流程名称",
		formatter: function(value, row, index) {
			return $("#processSlctType option[value='" + row.processid + "']").text();
		}
	});
	columnsArray.push({
		"title": "产线",
		"field": "lineid",
		visible: false
	});
	columnsArray.push({
		"title": "产线名称",
		"field": "产线名称",
		formatter: function(value, row, index) {
			return $("#lineSlctType option[value='" + row.lineid + "']").text();
		}
	});
	columnsArray.push({
		"title": "上班时间",
		"field": "starttime"
	});
	columnsArray.push({
		"title": "下班时间",
		"field": "endtime"
	});
	columnsArray.push({
		"title": "工作时长比例",
		"field": "timemeasure"
	});
	columnsArray.push({
		"title": "staffid",
		"field": "staffid",
		visible: false
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "status",
		"field": "status",
		visible: false
	});
	$.ajax({
		url: window.serviceIP + "/api/workshift/getworkshiftrecord?plantID=" + document.workShiftSelectForm.workShiftPlantSlct.value.toString() +
			"&processID=" + document.workShiftSelectForm.processSlctType.value.toString() + "&workShift=" + window.stringToDatetimeLocalType(document.getElementById("workTime").value, "yyyy-MM-dd") +
			"&dayNight=" + document.workShiftSelectForm.dayNightType.value.toString(),
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar1',
					singleSelect: true,
					clickToSelect: true,
					sortName: "recordTime",
					sortOrder: "desc",
					pageSize: 15,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//search: true,
					pagination: true,
					columns: columnsArray
				});
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

}

function changeWorkShiftRecord() {
	var formData = new FormData($("#workShiftForm")[0]);

	$.ajax({
		url: window.serviceIP + "/api/workshift/changeworkshiftrecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		data: window.getFormDataToJson(formData),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				initWorkShiftRecordTable();
				alert('保存成功!');
				$("#myModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
}

function selectedWorkShiftRecordRow(param) {
	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	$("#lineid").find('option').remove();
	$("#lineSlctType option").each(function() {
		if($(this).val() == "-1") {
			return;
		}
		$('#lineid').append(("<option value=" + $(this).val() + ">" + $(this).text()  + "</option>").toString());
	})
	$('#lineid').selectpicker('refresh');
	$('#lineid').selectpicker('render'); 
	$('#lineid').selectpicker('mobile');

	$("#daynight").find('option').remove();
	$('#daynight').append(("<option value=" + "白班" + ">" + "白班"  + "</option>").toString());
	$('#daynight').append(("<option value=" + "夜班" + ">" + "夜班"  + "</option>").toString());
	$('#daynight').selectpicker('refresh');
	$('#daynight').selectpicker('render'); 
	$('#daynight').selectpicker('mobile');

	$("#abshift").find('option').remove();
	$('#abshift').append(("<option value=" + "A" + ">" + "A班"  + "</option>").toString());
	$('#abshift').append(("<option value=" + "B" + ">" + "B班"  + "</option>").toString());
	$('#abshift').selectpicker('refresh');
	$('#abshift').selectpicker('render'); 
	$('#abshift').selectpicker('mobile');

	var optionType = param.getAttribute("id");
	if(optionType == "addRow") {
		$("#workShiftForm" + " #plantid").val(document.workShiftSelectForm.workShiftPlantSlct.value.toString());
		$("#workShiftForm" + " #processid").val(document.workShiftSelectForm.processSlctType.value.toString());
		var today = new Date();
		today.setDate(today.getDate() + 1);
		document.getElementById("workshift").value = today.format("yyyy-MM-dd");

		$('#myModal').modal('show');
	} else if(optionType == "editRow") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		for(var key in row[0]) {
			if(key == 0) {
				continue;
			}
			if(key == "workshift") {
				$("#workShiftForm" + " #" + key).val(window.stringToDatetimeLocalType(row[key], "yyyy-MM-dd"));
				continue;
			}
			if(key == "starttime" || key == "endtime") {
				$("#workShiftForm" + " #" + key).val(window.stringToDatetimeLocalType(row[key], "yyyy-MM-ddTHH:mm:ss"));
				continue;
			}

			if(key == "lineid" || key == "abshift" || key == "daynight") {

				var numbers = $("#workShiftForm" + " #" + key).find("option"); //获取select下拉框的所有值
				for(var j = 1; j < numbers.length; j++) {

					if($(numbers[j]).val().toString() == row[key]) {
						$(numbers[j]).attr("selected", "selected");
					}
				}
				$('#' + key).selectpicker('refresh');
				$('#' + key).selectpicker('render'); 
				continue;
				// $("#workOrderManageForm" + " #" + key).selectpicker('val',"");
			}
			$("#workShiftForm" + " #" + key).val(row[0][key])
		}
		$('#myModal').modal('show');
	} else if(optionType == "deleteRow") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteWorkShiftRecord(row[0]["id"]);
	}
}

function deleteWorkShiftRecord(rowID) {
	//	alert(equipID);
	//	var jsonStr = {};
	//	jsonStr.push({
	//		"equipID": equipID
	//	});
	//JSON.stringify(jsonStr);,
	var formData = new FormData();
	formData.append("id", rowID);
	$.ajax({
		url: window.serviceIP + "/api/workshift/deleteworkshiftrecord",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				initWorkShiftRecordTable();
				$("#myModal").modal('hide');
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};