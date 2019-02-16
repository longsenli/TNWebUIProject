function batteryBorrowRerutnIndustrialPlantSlctFun(flag) {
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

			$("#industrialPlantOutSlct").find('option').remove();
			$("#industrialPlantInSlct").find('option').remove();
			$("#outPlantID").find('option').remove();
			$("#inPlantID").find('option').remove();

			$('#industrialPlantOutSlct').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString())
			$('#industrialPlantInSlct').append(("<option value=" + "-1" + ">" + "全部" + "</option>").toString())

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#industrialPlantOutSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
					$('#industrialPlantInSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
					$('#outPlantID').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
					$('#inPlantID').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#industrialPlantOutSlct').selectpicker('refresh');
				$('#industrialPlantOutSlct').selectpicker('render');   
				$('#industrialPlantOutSlct').selectpicker('mobile');

				$('#industrialPlantInSlct').selectpicker('refresh');
				$('#industrialPlantInSlct').selectpicker('render');   
				$('#industrialPlantInSlct').selectpicker('mobile');

				$('#outPlantID').selectpicker('refresh');
				$('#outPlantID').selectpicker('render');   
				$('#outPlantID').selectpicker('mobile');

				$('#inPlantID').selectpicker('refresh');
				$('#inPlantID').selectpicker('render');   
				$('#inPlantID').selectpicker('mobile');

				batteryBorrowRerutnBatteryTypeSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function batteryBorrowRerutnBatteryTypeSlctFun(flag) {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterialbyprocess?processID=1008",
		type: "GET",

		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		async: false,
		success: function(dataRes) {

			$("#batteryType").find('option').remove();
			$("#batteryTypeSlct").find('option').remove();
			$('#batteryTypeSlct').append(("<option value=" + "-1" + ">" + "全部" + "</option>").toString())

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#batteryType').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
					$('#batteryTypeSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#batteryType').selectpicker('refresh');
				$('#batteryType').selectpicker('render');   
				$('#batteryType').selectpicker('mobile');

				$('#batteryTypeSlct').selectpicker('refresh');
				$('#batteryTypeSlct').selectpicker('render');   
				$('#batteryTypeSlct').selectpicker('mobile');

				getBatteryBorrowRerutnRecord();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
};

function selectedBatteryBorrowRerutnRow(param) {
	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "batteryBorrowRerutn_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteBatteryBorrowRerutnRecord(row[0]["id"]);
	}
}

function deleteBatteryBorrowRerutnRecord(id) {

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/deleteborrowreturnrecord?id=" + id,
		type: "POST",

		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				getBatteryBorrowRerutnRecord();
				alert('删除成功!');
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
}

function addBatteryBorrowRerutnRecord() {
	if(document.batteryBorrowRerutnCollapseForm.outPlantID.value.toString() == document.batteryBorrowRerutnCollapseForm.inPlantID.value.toString()) {
		alert("出入库一样,请修改!")
		return;
	}
	if($("#changeNum").val().toString().length < 1) {
		alert("请正确输入电池流动数量!");
		return;
	}
	var formData = new FormData($("#batteryBorrowRerutnCollapseForm")[0]);

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/addborrowreturnrecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: window.getFormDataToJson(formData),
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			if(dataRes.status == 1) { 
				getBatteryBorrowRerutnRecord();
				//document.getElementById("scrapBatteryCollapseForm").reset();
				$("#batteryBorrowRerutnCollapseForm").collapse('hide');
				alert("添加流动信息成功！");
			} else {
				alert("添加流动信息失败！" + dataRes.message);
			}
		}
	});
};

function getBatteryBorrowRerutnRecord() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "出库厂区",
		"field": "outplantid",
		visible: false
	});
	columnsArray.push({
		"title": "出库厂区",
		"field": "出库厂区",
		formatter: function(value, row, index) {
			return $("#industrialPlantOutSlct option[value='" + row.outplantid + "']").text();
		}
	});
	columnsArray.push({
		"title": "入库厂区",
		"field": "inplantid",
		visible: false
	});
	columnsArray.push({
		"title": "入库厂区",
		"field": "入库厂区",
		formatter: function(value, row, index) {
			return $("#industrialPlantOutSlct option[value='" + row.inplantid + "']").text();
		}
	});

	columnsArray.push({
		"title": "电池型号",
		"field": "batterytype",
		visible: false
	});
	columnsArray.push({
		"title": "电池型号",
		"field": "电池型号",
		formatter: function(value, row, index) {
			return $("#batteryType option[value='" + row.batterytype + "']").text();
		}
	});

	columnsArray.push({
		"title": "流动数量",
		"field": "changenum"
	});
	columnsArray.push({
		"title": "流动原因",
		"field": "dealreason"
	});
	columnsArray.push({
		"title": "流动时间",
		"field": "updatetime"
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/getborrowreturnrecord?outPlantID=" + document.PlantToLineSelectForm.industrialPlantOutSlct.value.toString() +
			"&inPlantID=" + document.PlantToLineSelectForm.industrialPlantInSlct.value.toString() +
			"&startTime=" + document.getElementById("startTime").value +
			"&endTime=" + document.getElementById("endTime").value +
			"&batteryType=" + document.PlantToLineSelectForm.batteryTypeSlct.value.toString(),
		type: "GET",
		contentType: "application/json",

		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		success: function(dataRes) {

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");

				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar',
					singleSelect: false,
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
					search: true,
					//strictSearch: true,
					pagination: true,
					columns: columnsArray
				});
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};