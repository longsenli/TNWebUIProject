function productionStatisticsPlantSlctFun(flag) {
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
				// $('#industrialPlantSlct').selectpicker('mobile');

				if($.cookie('plantID') != null && $.cookie('plantID') != 'undefined' && $.cookie('plantID').toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString().split("###")[0] == $.cookie('plantID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#industrialPlantSlct').selectpicker('hide');

							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#industrialPlantSlct').selectpicker('refresh');
					$('#industrialPlantSlct').selectpicker('render'); 

				}

				if(flag = "1") {
					productionStatisBatteryTypeSlctFun();
					productionStatisticsProcessSlctFun();
				} else
					productionStatisticsLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function productionStatisBatteryTypeSlctFun(flag) {
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

			$("#batterytype").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#batterytype').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#batterytype').selectpicker('refresh');
				$('#batterytype').selectpicker('render');   
				// $('#batterytype').selectpicker('mobile');
				$('#batterytype').selectpicker('hide');
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
};

function productionStatisticsProcessSlctFun() {
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
				// $('#productionProcessSlct').selectpicker('mobile');

				if($.cookie('processID') != null && $.cookie('processID') != 'undefined' && $.cookie('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString().split("###")[0] == $.cookie('processID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionProcessSlct').selectpicker('hide');

							$("#productionProcessLabel").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 

				}

				productionStatisticsLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function productionStatisticsLineSlctFun() {
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
		//			Token: $.cookie('token')
		//		},
		//processData: true,
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
				$('#productionLineSlct').selectpicker('hide');
				// $('#productionLineSlct').selectpicker('mobile');

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function productionOutputStatistics() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		width: 300,
		"title": "日期",
		"field": "orderDay"
	});
	columnsArray.push({
		width: 300,
		"title": "班次",
		"field": "classType"
	});
	columnsArray.push({
		width: 300,
		"title": "产线",
		"field": "lineName"
	});
	columnsArray.push({
		width: 300,
		"title": "物料名称",
		"field": "materialName"
	});
	columnsArray.push({
		width: 300,
		"title": "总产量",
		"field": "outputTotal"
	});

	var urlStr = window.serviceIP + "/api/material/orderoutputstatistics?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 02:00:00" + "&endTime=" + document.getElementById("endTime").value + " 23:00:00";

	$.ajax({
		url: urlStr,
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
					toolbar: '#toolbar',
					singleSelect: false,
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
};

function remnantProductStatistics() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		width: 300,
		"title": "物料名称",
		"field": "name"
	});
	columnsArray.push({
		width: 300,
		"title": "剩余数量",
		"field": "remnantTotalNum"
	});

	var endTime = new Date(document.getElementById("endTime").value);
	endTime.setDate(endTime.getDate() + 1)
	var urlStr = window.serviceIP + "/api/material/orderremnantproductstatistics?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 07:00:00" + "&endTime=" + endTime.format("yyyy-MM-dd") + " 06:59:59";

	$.ajax({
		url: urlStr,
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
					toolbar: '#toolbar',
					singleSelect: false,
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

function batteryStatisInventory() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "盘点时间",
		"field": "updatetime"
	});
	columnsArray.push({
		"title": "电池型号",
		"field": "电池型号",
		formatter: function(value, row, index) {
			return $("#batterytype option[value='" + row.batterytype + "']").text();
		}
	});
	columnsArray.push({
		"title": "batterytype",
		"field": "batterytype",
		visible: false
	});
	columnsArray.push({
		"title": "最新库存",
		"field": "currentstorage"
	});
	columnsArray.push({
		"title": "上次结余",
		"field": "laststorage"
	});
	columnsArray.push({
		"title": "生产入库",
		"field": "dailyproduction"
	});
	columnsArray.push({
		"title": "发货出库",
		"field": "dailyshipmentsnum"
	});
	columnsArray.push({
		"title": "报废数量",
		"field": "scrapnum"
	});
	columnsArray.push({
		"title": "报修数量",
		"field": "repairnum"
	});
	columnsArray.push({
		"title": "维修入库",
		"field": "repairbacknum"
	});

	columnsArray.push({
		"title": "借出数量",
		"field": "loannum"
	});
	columnsArray.push({
		"title": "借入数量",
		"field": "borrownum"
	});
	var endTime = new Date(document.getElementById("endTime").value);
	endTime.setDate(endTime.getDate() + 1)
	var urlStr = window.serviceIP + "/api/material/batterystatisinventory?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 12:00:00" + "&endTime=" + endTime.format("yyyy-MM-dd") + " 06:59:59";

	$.ajax({
		url: urlStr,
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
					toolbar: '#toolbar',
					singleSelect: false,
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

function grantAndExpendStatistics() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		width: 300,
		"title": "产线名称",
		"field": "lineID",
		formatter: function(value, row, index) {
			if(row.lineID == '总计')
				return row.lineID;
			return $("#productionLineSlct option[value='" + row.lineID + "']").text();
		}
	});
	columnsArray.push({
		width: 300,
		"title": "物料名称",
		"field": "name"
	});
	columnsArray.push({
		width: 300,
		"title": "领取数量",
		"field": "grantNum"
	});
	columnsArray.push({
		width: 300,
		"title": "投料数量",
		"field": "expendNum"
	});

	var urlStr = window.serviceIP + "/api/material/grantdndexpendstatistics?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 00:00:00" + "&endTime=" + document.getElementById("endTime").value + " 23:59:59";

	$.ajax({
		url: urlStr,
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
					toolbar: '#toolbar',
					singleSelect: false,
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

function getMaterialInventoryStatistics() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "name"
	});
	columnsArray.push({
		"title": "当前数量",
		"field": "currentNum"
	});
	columnsArray.push({
		"title": "上次结余",
		"field": "lastStorage"
	});
	columnsArray.push({
		"title": "生产入库",
		"field": "productionNum"
	});
	columnsArray.push({
		"title": "退返",
		"field": "inNum"
	});
	columnsArray.push({
		"title": "发料数量",
		"field": "expendNum"
	});
	columnsArray.push({
		"title": "其他出库",
		"field": "outNum"
	});
	columnsArray.push({
		"title": "盘点时间",
		"field": "updateTime"
	});

	var endTime = new Date(document.getElementById("endTime").value);
	endTime.setDate(endTime.getDate() + 1)

	var urlStr = window.serviceIP + "/api/material/getmaterialinventorystatistics?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 12:00:00" + "&endTime=" + endTime.format("yyyy-MM-dd") + " 12:00:00";

	$.ajax({
		url: urlStr,
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
					toolbar: '#toolbar',
					singleSelect: false,
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

function getSecondaryMaterialInventoryStatistics() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "name"
	});
	columnsArray.push({
		"title": "当前数量",
		"field": "currentNum"
	});
	columnsArray.push({
		"title": "上次结余",
		"field": "lastStorage"
	});
	columnsArray.push({
		"title": "领料入库",
		"field": "gainNum"
	});
	columnsArray.push({
		"title": "其他入库",
		"field": "inNum"
	});
	columnsArray.push({
		"title": "投料数量",
		"field": "expendNum"
	});
	columnsArray.push({
		"title": "送不良数量",
		"field": "outNum"
	});
	columnsArray.push({
		"title": "线边仓数量",
		"field": "onlineNum"
	});
//	columnsArray.push({
//		"title": "当日报修数量",
//		"field": "todayRepair"
//	});
	columnsArray.push({
		"title": "盘点时间",
		"field": "updateTime"
	});
	var endTime = new Date(document.getElementById("endTime").value);
	endTime.setDate(endTime.getDate() + 1)
	var urlStr = window.serviceIP + "/api/material/getsecondarymaterialinventorystatistics?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 12:00:00" + "&endTime=" + endTime.format("yyyy-MM-dd") + " 12:00:00";

	$.ajax({
		url: urlStr,
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
					toolbar: '#toolbar',
					singleSelect: false,
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

function closeQRScanProductionStatistics() {
	$("#myModal").modal('hide');
}
var canvasProductionStatistics = null,
	contextProductionStatistics = null,
	videoProductionStatistics = null;  
var mediaStreamTrackProductionStatistics = null;   
function findProductionStatisticsByQR(recordID) {

	$("#myModal").modal('hide');

	if(recordID.length < 2) {
		alert("请确认已选择物料!")
		return;
	}
	var warningInfo = "";
	$.ajax({
		url: window.serviceIP + "/api/order/getsuborderbyid?id=" + recordID + "&type=1",
		type: "GET",
		processData: false,
		contentType: false,
		//data: formData,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		async: false,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				warningInfo = dataRes.message + ",";
			}
		}
	});

	//	if(document.PlantToLineSelectForm.productionProcessSlct.value.toString() != windowProcessEnum.ZH) {
	//		alert("当前只有铸焊工段有发料功能!");
	//		return;
	//	}

	if($('#ProductionStatisticsScanQRForm #ProductionStatisticsScanQRType').html() == '1') {
		warningInfo += "当日发料确认?";
	} else if($('#ProductionStatisticsScanQRForm #ProductionStatisticsScanQRType').html() == '2') {
		warningInfo += "预发料确认?";
	}
	if(!window.changeConfirmDlg(warningInfo)) {
		return;
	}

	var formData = new FormData();
	formData.append("operator", $.cookie('username')) //$.cookie('username');
	formData.append("orderSplitID", recordID);
	// 1 是扫码发料 按照ID号  2是扫码预发料按照ID号, 3是扫码发料 按照工单名称 4 是扫码预发料 按照工单名称
	if($('#ProductionStatisticsScanQRForm #ProductionStatisticsScanQRType').html() == '1') {
		formData.append("orderType", '1');
	} else if($('#ProductionStatisticsScanQRForm #ProductionStatisticsScanQRType').html() == '2') {
		formData.append("orderType", '2');
	} else {
		alert("发料类型获取失败,请刷新页面重试!");
		return;
	}
	$.ajax({
		url: window.serviceIP + "/api/material/addgrantmaterialrecord",
		type: "POST",
		processData: false,
		contentType: false,
		data: formData,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				grantMaterialDetail();
				alert("发料成功！");
			} else {
				alert("发料失败！" + dataRes.message);
			}
		}
	});
}

function grantMaterialByInputID() {

	$("#myModal").modal('hide');

	if($('#grantMaterialOrderInputID').val().trim().length < 2) {
		alert("请确认已输入ID!")
		return;
	}
	//	if(document.PlantToLineSelectForm.productionProcessSlct.value.toString() != windowProcessEnum.ZH  ) {
	//		alert("当前只有浇铸、铸焊工段有发料功能!");
	//		return;
	//	}
	var warningInfo = "";
	$.ajax({
		url: window.serviceIP + "/api/order/getsuborderbyid?id=" + $('#grantMaterialOrderInputID').val().trim() + "&type=1",
		type: "GET",
		processData: false,
		contentType: false,
		//data: formData,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		async: false,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				warningInfo = dataRes.message + ",";
			}
		}
	});

	if($('#ProductionStatisticsScanQRForm #ProductionStatisticsScanQRType').html() == '1') {
		warningInfo += "当日发料确认?";
	} else if($('#ProductionStatisticsScanQRForm #ProductionStatisticsScanQRType').html() == '2') {
		warningInfo += "预发料确认?";
	}
	if(!window.changeConfirmDlg(warningInfo)) {
		return;
	}
	var formData = new FormData(); // 1 是扫码发料 按照ID号  2是扫码预发料按照ID号, 3是扫码发料 按照工单名称 4 是扫码预发料 按照工单名称
	formData.append("operator", $.cookie('username')) //$.cookie('username');
	formData.append("orderSplitID", $('#grantMaterialOrderInputID').val().trim());
	if($('#ProductionStatisticsScanQRForm #ProductionStatisticsScanQRType').html() == '1') {
		formData.append("orderType", '3');
	} else if($('#ProductionStatisticsScanQRForm #ProductionStatisticsScanQRType').html() == '2') {
		formData.append("orderType", '4');
	} else {
		alert("发料类型获取失败,请刷新页面重试!");
		return;
	}
	$.ajax({
		url: window.serviceIP + "/api/material/addgrantmaterialrecord",
		type: "POST",
		processData: false,
		contentType: false,
		data: formData,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				grantMaterialDetail();
				alert("发料成功！");
			} else {
				alert("发料失败！" + dataRes.message);
			}
		}
	});
}

function startScanQRProductionStatistics() {
	if(contextProductionStatistics) {         
		contextProductionStatistics.drawImage(videoProductionStatistics, 0, 0, 320, 320);               
		if(canvasProductionStatistics != null) {            //以下开始编 数据  
			var imgData = canvasProductionStatistics.toDataURL("image/jpeg");            //将图像转换为base64数据
			qrcode.decode(imgData);             
			qrcode.callback = function(imgMsg) {
				if(imgMsg != null && imgMsg.trim().length > 1 && imgMsg.toString().indexOf("error decoding") == -1) {
					findProductionStatisticsByQR(imgMsg);
				} else {
					setTimeout(startScanQRProductionStatistics(), 500);
				}
			}       
		}          
	}  
}

function ProductionStatisticsScanQR(paramQR) {
	$('#myModal').modal('show');

	$('#ProductionStatisticsScanQRForm #ProductionStatisticsScanQRType').html(paramQR);
	//alert(paramQR + "   " + $('#ProductionStatisticsScanQRForm #ProductionStatisticsScanQRType').html());
	if(contextProductionStatistics == null) { 
		//window.addEventListener("DOMContentLoaded", function() {       
		try {    

			canvasProductionStatistics = document.getElementById("canvasProductionStatisticsScanQR");           
			contextProductionStatistics = canvasProductionStatistics.getContext("2d");           
			videoProductionStatistics = document.getElementById("videoProductionStatisticsScanQR");           
			var videoObj = {
				audio: false,
				"video": true
			};              
			//			var videoObj = {
			//				"video": true
			//			};    
			var  flag = true;             
			var   MediaErr = function(error) {                   
				flag = false;                   
				if(error.PERMISSION_DENIED) {                       
					alert('用户拒绝了浏览器请求媒体的权限', '提示');                   
				} else if(error.NOT_SUPPORTED_ERROR) {                       
					alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');                   
				} else if(error.MANDATORY_UNSATISFIED_ERROR) {                       
					alert('指定的媒体类型未接收到媒体流', '提示');                   
				} else {                       
					alert('系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试!' + error.name + ": " + error.message, '提示');                   
				}               
			};            //获取媒体的兼容代码，目前只支持（Firefox,Chrome,Opera）
			      

			  
			if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia()) {                //qq浏览器不支持
				 
				try {  
					navigator.mediaDevices.getUserMedia(videoObj).then(function(stream) { 
						//mediaStreamTrack = stream;                  
						//video.src = window.URL.createObjectURL(stream);;                   
						//video.play();
						//mediaStreamTrackProductionStatistics = stream;  
						videoProductionStatistics.srcObject = stream;
						videoProductionStatistics.onloadedmetadata = function(e) {
							videoProductionStatistics.play();
						};
					}, MediaErr);   
				} catch(err) {
					alert(err);
				}        
			}    
			else if(navigator.getUserMedia) { // Standard   
				navigator.getUserMedia(videoObj, function(stream) {   
					//mediaStreamTrackProductionStatistics = stream;       
					videoProductionStatistics.src = stream;
					videoProductionStatistics.play();
				}, MediaErr);
			}           
			else if(navigator.webkitGetUserMedia) {              
				navigator.webkitGetUserMedia(videoObj, function(stream) {  
					mediaStreamTrackProductionStatistics = stream;                  
					videoProductionStatistics.src = window.webkitURL.createObjectURL(stream);                   
					videoProductionStatistics.play();      
				}, MediaErr);           
			}       
			else if(navigator.mozGetUserMedia) {              
				navigator.mozGetUserMedia(videoObj, function(stream) { 
					mediaStreamTrackProductionStatistics = stream;                   
					videoProductionStatistics.src = window.URL.createObjectURL(stream);                   
					videoProductionStatistics.play();               
				}, MediaErr);           
			}           
			else if(navigator.msGetUserMedia) {           
				navigator.msGetUserMedia(videoObj, function(stream) { 
					mediaStreamTrackProductionStatistics = stream;                   
					$(document).scrollTop($(window).height());                   
					videoProductionStatistics.src = window.URL.createObjectURL(stream);                   
					videoProductionStatistics.play();               
				}, MediaErr);           
			} else {               
				alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器');               
				return false;           
			}           
			if(flag) {                // alert('为了获得更准确的测试结果，请尽量将二维码置于框中，然后进行拍摄、扫描。 请确保浏览器有权限使用摄像功能');
				          }            //这个是拍照按钮的事件，
			           

			//				$("#snap").click(function() {
			//					startPat();
			//				}).show();       
		} catch(e) {           
			//printHtml("浏览器不支持HTML5 CANVAS");       
		}   
		//}, false);    //打印内容到页面
	} 
	//console.log("start");
	setTimeout(startScanQRProductionStatistics(), 1000) ; 
}

function grantMaterialDetail() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "name"
	});
	columnsArray.push({
		"title": "工单号",
		"field": "orderName"
	});
	columnsArray.push({
		"title": "数量",
		"field": "number"
	});
	columnsArray.push({
		"title": "发料人",
		"field": "operator"
	});
	columnsArray.push({
		"title": "发料时间",
		"field": "grantTime"
	});

	var urlStr = window.serviceIP + "/api/material/getgrantmaterialrecord?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 00:00:00" + "&endTime=" + document.getElementById("endTime").value + " 23:59:59";

	$.ajax({
		url: urlStr,
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
					toolbar: '#toolbar',
					singleSelect: false,
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