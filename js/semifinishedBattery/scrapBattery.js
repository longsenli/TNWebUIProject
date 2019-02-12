function scrapBatteryIndustrialPlantSlctFun(flag) {
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
					scrapBatteryProductionProcessSlctFun();
				else
					scrapBatteryProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function scrapBatteryProductionProcessSlctFun() {
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
				scrapBatteryProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function scrapBatteryProductionLineSlctFun() {
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
			$("#lineID").find('option').remove();

			$("#productionLineSlct").find('option').remove();
			$('#productionLineSlct').append(("<option value=" + "-1" + ">" + "全部产线"  + "</option>").toString());

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
					$('#lineID').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   
				$('#productionLineSlct').selectpicker('mobile');

				$('#lineID').selectpicker('refresh');
				$('#lineID').selectpicker('render');   
				$('#lineID').selectpicker('mobile');
				
				$('#scrapType').selectpicker('refresh');
				$('#scrapType').selectpicker('render');   
				$('#scrapType').selectpicker('mobile');
				
				getScrapBatteryRecord();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function selectedScrapBatteryRow(param) {
	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "scrapBattery_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteScrapBatteryRecord(row[0]["batteryid"]);
	}
}

function deleteScrapBatteryRecord(batteryID) {

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/deletescrapbattery?batteryID=" + batteryID,
		type: "POST",

		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				getScrapBatteryRecord();
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
}

function addScrapBatteryRecord() {
	var formData = new FormData($("#scrapBatteryCollapseForm")[0]);
	formData.append("scrapStaff", $.cookie('username'));

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/addscrapbattery",
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
				getScrapBatteryRecord();
				document.getElementById("scrapBatteryCollapseForm").reset();
				//$("#scrapBatteryCollapseForm").collapse('hide') 
				alert("报废成功！");
			} else {
				alert("报废失败！" + dataRes.message);
			}
		}
	});
};

function getScrapBatteryRecord() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "底壳二维码",
		"field": "batteryid"
	});
	columnsArray.push({
		"title": "报废类型",
		"field": "scraptype"
	});
	columnsArray.push({
		"title": "报废原因",
		"field": "scrapreason"
	});
	columnsArray.push({
		"title": "报废员工",
		"field": "scrapstaff"
	});
	columnsArray.push({
		"title": "报废时间",
		"field": "scraptime"
	});
	columnsArray.push({
		"title": "报废产线",
		"field": "lineid",
		visible: false

	});

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/getscrapbatterybyline?lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString(),
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