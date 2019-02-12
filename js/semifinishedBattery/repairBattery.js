function repairBatteryIndustrialPlantSlctFun(flag) {
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

			$("#industrialPlantSlct").find('option').remove();
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				$('#industrialPlantSlct').selectpicker('mobile');
				if(flag = "1")
					repairBatteryProductionProcessSlctFun();
				else
					repairBatteryProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function repairBatteryProductionProcessSlctFun() {
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
			$("#productionProcessSlct").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				$('#productionProcessSlct').selectpicker('mobile');
				repairBatteryProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function repairBatteryProductionLineSlctFun() {
	//	return true;
	//	if(!($.isEmptyObject(first)) && first.toString().length > 1) {
	//
	//		return;
	//	}
	//alert("生产线选择");
	
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getproductionline?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString()
		+ "&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString(),
		type: "Get",
		//data: formData,
		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		
		success: function(dataRes) {
			$("#lineid").find('option').remove();

			$("#productionLineSlct").find('option').remove();
			$('#productionLineSlct').append(("<option value=" + "-1" + ">" + "全部产线"  + "</option>").toString());

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
					$('#lineid').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   
				$('#productionLineSlct').selectpicker('mobile');

				$('#lineid').selectpicker('refresh');
				$('#lineid').selectpicker('render');   
				$('#lineid').selectpicker('mobile');
				
				getRepairBatteryRecord();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function selectedRepairBatteryRow(param) {
	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "repairBattery_add") {
		$("#batteryid").attr("readonly", false);
		repairBateryHTMLFlag = "add";
		$("#repairBatteryCollapseForm").collapse('show') ;
	}
	if(optionType == "repairBattery_edit") {
		
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		repairBateryHTMLFlag = "change";
		$("#batteryid").attr("readonly", true);
		for(var key in row[0]) {

			if(key == 0) {
				continue;
			}
			if(key == "repairtime" || key == "backtime") {
				$("#repairBatteryCollapseForm" + " #" + key).val(window.stringToDatetimeLocalType(row[0][key].toString(), "yyyy-MM-ddThh:mm"));
				continue;
			}
			if(key == "lineid" ) {

				var numbers = $("#repairBatteryCollapseForm" + " #" + key).find("option"); //获取select下拉框的所有值
				for(var j = 0; j < numbers.length; j++) {
					if($(numbers[j]).val().toString() == row[0][key]) {
						$(numbers[j]).attr("selected", "selected");
					}
				}
				$('#' + key).selectpicker('refresh');
				$('#' + key).selectpicker('render'); 
				continue;
			}
			$("#repairBatteryCollapseForm" + " #" + key).val(row[0][key]);
		}

		$("#repairBatteryCollapseForm").collapse('show') ;
	}
	if(optionType == "repairBattery_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteRepairBatteryRecord(row[0]["batteryid"]);
	}
}

function deleteRepairBatteryRecord(batteryID) {

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/deleterepairbattery?batteryID=" + batteryID,
		type: "POST",

		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				getRepairBatteryRecord();
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
}
var repairBateryHTMLFlag = "";
function addRepairBatteryRecord() {
	var formData = new FormData();
	var formDataClps = new FormData($("#repairBatteryCollapseForm")[0]);
	formData.append("jsonStr", window.getFormDataToJson(formDataClps));
	formData.append("type", repairBateryHTMLFlag);
	
	
	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/addrepairbattery",
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

			if(dataRes.status == 1) { 

				getRepairBatteryRecord();
				repairBateryHTMLFlag = "";
				document.getElementById("repairBatteryCollapseForm").reset();
				$("#batteryid").attr("readonly", false);
				$("#repairBatteryCollapseForm").collapse('hide') ;
				alert("报废成功！");
			} else {
				alert("报废失败！" + dataRes.message);
			}
		}
	});
};

function getRepairBatteryRecord() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "底壳二维码",
		"field": "batteryid"
	});
	columnsArray.push({
		"title": "报修原因",
		"field": "repairreason"
	});
	columnsArray.push({
		"title": "报修员工",
		"field": "reportstaff"
	});
	columnsArray.push({
		"title": "报修时间",
		"field": "repairtime"
	});
	columnsArray.push({
		"title": "维修员工",
		"field": "repairstaff"
	});
	columnsArray.push({
		"title": "返库时间",
		"field": "backtime"
	});
	columnsArray.push({
		"title": "报废产线",
		"field": "lineid",
		visible: false

	});

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/getrepairbatterybyline?lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString(),
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