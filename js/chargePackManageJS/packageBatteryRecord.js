function packageBatteryRecordIndustrialPlantSlctFun() {
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
							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#industrialPlantSlct').selectpicker('refresh');
					$('#industrialPlantSlct').selectpicker('render'); 

				}
				packageBatteryRecordProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function packageBatteryRecordProductionLineSlctFun() {

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", window.windowProcessEnum.BZ);
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
			$('#productionLineSlct').append(("<option value=" + "-1" +
				">" + "全部" + "</option>").toString());
			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());

				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   
				//getMaterialName();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getMaterialName() {

	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterialbytype?typeID=" + window.MaterialTypeEnum.BZDC,
		type: "GET",
		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		success: function(dataRes) {

			$("#materialName").find('option').remove();
			$('#materialName').append(("<option value=" + "-1" +
				">" + "全部" + "</option>").toString());

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");

				for (var  i  in  models)  {  
					$('#materialName').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());

				}
				$('#materialName').selectpicker('refresh');
				$('#materialName').selectpicker('render');   

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getPackageRecord() {

	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});

	columnsArray.push({
		"title": "产线",
		"field": "lineName"
	});
	columnsArray.push({
		"title": "物料类型",
		"field": "materialName"
	});
	columnsArray.push({
		"title": "包装名称",
		"field": "packageName"
	});

	columnsArray.push({
		"title": "计划产量",
		"field": "planNumber"
	});
	columnsArray.push({
		"title": "实际产量",
		"field": "totalNumber"
	});
	columnsArray.push({
		"title": "日期",
		"field": "dayTime",
		formatter: function(value, row, index) {
			if(value) {
				//var time = new Date(parseInt(value)).toLocaleString().replace(/:\d{1,2}$/,' ');
				return(new Date(parseInt(value))).format("yyyy-MM-dd");
			}
		}
	});

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");

	$.ajax({
		url: window.serviceIP + "/api/chargepack/getPackageRecordDetail",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//async: false,
		//processData: true,
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
					pageSize: 15,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					search: true,
					searchAlign: 'right',
					pagination: true,
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
};

function packageBatteryRecordRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}