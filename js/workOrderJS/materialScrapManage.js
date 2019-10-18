function scrapIndustrialPlantSlctFun(flag) {
	//console.log("test")
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
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
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

							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#industrialPlantSlct').selectpicker('refresh');
					$('#industrialPlantSlct').selectpicker('render'); 

				}

				if(flag == "1")
					scrapProductionProcessSlctFun();
				else
					scrapProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function scrapProductionProcessSlctFun() {
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
				// $('#productionProcessSlct').selectpicker('mobile');

				if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('processID')) {
							$(numbers[j]).attr("selected", "selected");
							//$('#productionProcessSlct').selectpicker('hide');

							//$("#productionProcessLabel").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 

				}
				scrapProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function scrapProductionLineSlctFun() {
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
		processData: false,
		contentType: false,
		success: function(dataRes) {

			$("#productionLineSlct").find('option').remove();
			$('#productionLineSlct').append(("<option value=" + "-1" + ">" + "全部产线"  + "</option>").toString());

			$("#lineID").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
					$('#lineID').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   

				$('#lineID').selectpicker('refresh');
				$('#lineID').selectpicker('render');   

				if(localStorage.getItem('lineID') != null && localStorage.getItem('lineID') != 'undefined' && localStorage.getItem('lineID').toString().length > 0) {
					var numbers = $('#productionLineSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('lineID')) {
							$(numbers[j]).attr("selected", "selected");
							//	$('#productionLineSlct').selectpicker('hide');

							//	$("#productionLineLabel").css("display", "none");
						}
					}
					$('#productionLineSlct').selectpicker('refresh');
					$('#productionLineSlct').selectpicker('render'); 

				}

				// $('#productionLineSlct').selectpicker('mobile');
				scrapSelectScrapInfo();
			} else {
				alert("初始化产线数据失败！" + dataRes.message);
			}
		}
	});
};

function scrapSelectScrapInfo() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "日期",
		"field": "productDay",
		formatter: function(value, row, index) {
			//console.log(value);
			if(value) {
				return value.split(' ')[0];
			}
		}
	});
	columnsArray.push({
		width: 300,
		"title": "产线",
		"field": "lineID",
		formatter: function(value, row, index) {
			return $("#productionLineSlct option[value='" + row.lineID + "']").text();
		}

	});
	columnsArray.push({
		"title": "班次",
		"field": "classType"
	});
	columnsArray.push({
		"title": "物料",
		"field": "materialName"
	});
	columnsArray.push({
		"title": "报废数量",
		"field": "value"
	});
	columnsArray.push({
		"title": "报废人",
		"field": "updateStaff"
	});
	columnsArray.push({
		"title": "登记日期",
		"field": "updateTime"
	});
	columnsArray.push({
		"title": "备注",
		"field": "remark"
	});
	var urlStr = window.serviceIP + "/api/scrapinfo/getMaterialScrapRecord?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + "&endTime=" + document.getElementById("endTime").value;

	$.ajax({
		url: urlStr,
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
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

function createScrapModel() {

	$('#lineID').selectpicker('refresh');
	$('#lineID').selectpicker('render'); 

	$('#classType').selectpicker('refresh');
	$('#classType').selectpicker('render'); 

	var today = new Date();
	if(today.getHours() < 7) {
		today.setDate(today.getDate() - 1);
		document.getElementById("productDate").value = today.format("yyyy-MM-dd");
		$('#classType').selectpicker('val', '夜班');
		$('#classType').selectpicker('refresh');
		$('#classType').selectpicker('render');
	} else if(today.getHours() > 18) {
		document.getElementById("productDate").value = today.format("yyyy-MM-dd");
		$('#classType').selectpicker('val', '夜班');
		$('#classType').selectpicker('refresh');
		$('#classType').selectpicker('render');
	} else {
		document.getElementById("productDate").value = today.format("yyyy-MM-dd");
		$('#classType').selectpicker('val', '白班');
		$('#classType').selectpicker('refresh');
		$('#classType').selectpicker('render');
	}

	//	var numbers = $('#lineid').find("option"); //获取select下拉框的所有值
	//	for(var j = 0; j < numbers.length; j++) {
	//		if($(numbers[j]).val().toString() == document.PlantToLineSelectForm.productionLineSlct.value.toString()) {
	//			$(numbers[j]).attr("selected", "selected");
	//			break;
	//		}
	//	}
	if('-1' != document.PlantToLineSelectForm.productionLineSlct.value.toString()) {
		$('#lineID').selectpicker('val', document.PlantToLineSelectForm.productionLineSlct.value.toString());
		$('#lineID').selectpicker('refresh');
		$('#lineID').selectpicker('render'); 
	}

	$('#scrapModal').modal('show');
	changeMaterialInfo();
}

function changeMaterialInfo() {

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	formData.append("lineID", document.getElementById("lineID").value);
	formData.append("productDate", document.getElementById("productDate").value);
	formData.append("classType", document.getElementById("classType").value);

	$.ajax({
		url: window.serviceIP + "/api/scrapinfo/getUsedMaterialInfo",
		type: "POST",
		data: formData,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			var htmlInner = "";

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				var labelStyle = "";
				var textStyle = "";
				//labelStyle = " style=\"font-size:36px\" ";
				//textStyle = " style=\"font-size:36px;height: 80px;\" ";

				for (var  i  in  models)  {  
					htmlInner += "<label " + labelStyle + " >" + models[i].name + "</label>" + "<input type=\"text\" class=\"form-control\" " + textStyle +
						" onkeyup=\"value=value.replace(/[^0-9|^.]/g,'')\" id=\"" + models[i].id + "###" + models[i].name + "\" name=\"" + models[i].id +
						"###" + models[i].name + "\"    placeholder=\"请输入报废数量\">";
				}
			} else {
				alert("获取物料信息失败！" + dataRes.message);
			}
			//console.log(htmlInner);
			document.getElementById("scrapContent").innerHTML = htmlInner;
		}
	});
}

function saveScrap() {
	var formDataMap = window.formToObject($("#scrapModalForm"));
	formDataMap["plantID"] = document.PlantToLineSelectForm.industrialPlantSlct.value.toString();
	formDataMap["processID"] = document.PlantToLineSelectForm.productionProcessSlct.value.toString();
	formDataMap["updateStaff"] = localStorage.username;

	//console.log(window.getFormDataToJson(formData));
	$.ajax({
		url: window.serviceIP + "/api/scrapinfo/saveMaterialScrapRecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		data: JSON.stringify(formDataMap).toString(),
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				scrapSelectScrapInfo();
				alert('保存成功!');
				$("#scrapModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
}

function deleteSrapRecord() {

	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	if(row.length < 1) {
		alert("请选择行数据!");
		return;
	}
	if(row.length > 1) {
		alert("一次只能选择一条记录!您当前选择" + row.length + "条记录!");
		return;
	}

	var formData = new FormData();
	formData.append("id", row[0].id);
	$.ajax({
		url: window.serviceIP + "/api/scrapinfo/deleteMaterialScrapRecord",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				scrapSelectScrapInfo();
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};