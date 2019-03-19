//获取全局token等信息，放入变量$Global_UserLogin_Info, app_login.html中login登陆方法初始赋值，用户首次登陆成功后设置放入localStorage
var $Global_UserLogin_Info = JSON.parse(localStorage.getItem('$Global_UserLogin_Info'));

function subOrderIndustrialPlantSlctFun() {
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
				//console.log(models);
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id.toString() + ">" +
						models[i].name.toString() + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				$('#industrialPlantSlct').selectpicker('mobile');
				if($Global_UserLogin_Info.plantID != null && $Global_UserLogin_Info.plantID != 'undefined' && $Global_UserLogin_Info.plantID.toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == $Global_UserLogin_Info.plantID) {
							$(numbers[j]).attr("selected", "selected");
							$('#industrialPlantSlct').selectpicker('hide');
							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#industrialPlantSlct').selectpicker('refresh');
					$('#industrialPlantSlct').selectpicker('render'); 

				}
				subOrderProductionProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function solidifyRoomSlctFun() {
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", "1004");
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

			$("#solidifyRoomSlct").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#solidifyRoomSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#solidifyRoomSlct').selectpicker('refresh');
				$('#solidifyRoomSlct').selectpicker('render');   
				$('#solidifyRoomSlct').selectpicker('mobile');
				getSolidifyRoomOrder();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function solidifyPlantSlctFun() {
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
				//	console.log(models);
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id.toString() + ">" +
						models[i].name.toString() + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				$('#industrialPlantSlct').selectpicker('mobile');
				solidifyRoomSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function subOrderProductionProcessSlctFun() {
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
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				$('#productionProcessSlct').selectpicker('mobile');

				if($Global_UserLogin_Info.processID != null && $Global_UserLogin_Info.processID != 'undefined' && $Global_UserLogin_Info.processID.toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == $Global_UserLogin_Info.processID) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionProcessSlct').selectpicker('hide');

							$("#productionProcessLabel").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 

				}

				setTimeout(function() {
					subOrderProductionLineSlctFun();
				}, 100);
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function subOrderProductionLineSlctFun() {
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

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   
				$('#productionLineSlct').selectpicker('mobile');
				if($Global_UserLogin_Info.lineID != null && $Global_UserLogin_Info.lineID != 'undefined' && $Global_UserLogin_Info.lineID.toString().length > 0) {
					var numbers = $('#productionLineSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == $Global_UserLogin_Info.lineID) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionLineSlct').selectpicker('hide');

							$("#productionLineLabel").css("display", "none");
						}
					}
					$('#productionLineSlct').selectpicker('refresh');
					$('#productionLineSlct').selectpicker('render'); 

				}

				setTimeout(function() {
					lineWorkOrderSlct();
				}, 100);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function lineWorkOrderSlct() {

	$.ajax({
		url: window.serviceIP + "/api/order/getworkorderbylineid?lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString(),
		type: "GET",
		contentType: "application/json",
		dataType: "json",
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//async: false,
		processData: true,
		success: function(dataRes) {

			$("#workOrderSlct").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#workOrderSlct').append(("<option value=" + models[i].id + ">" +
						models[i].orderid  + "</option>").toString())
				}
				$('#workOrderSlct').selectpicker('refresh');
				$('#workOrderSlct').selectpicker('render');   
				$('#workOrderSlct').selectpicker('mobile');
				setTimeout(function() {
					SelectWorkOrderFun();
				}, 100);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function subOrderChangeOrderNum() {
	$("#changeOrderProductionNum").attr("readonly", false);
}

function finishSubOrderByQR(qrCode,orderType) {
	$("#myModal").modal('hide');

	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		width: 300,
		"title": "工单号",
		"field": "ordersplitid"
	});
	columnsArray.push({
		"title": "产品",
		width: 300,
		"field": "materialName"
	});
	columnsArray.push({
		"title": "产品",
		width: 300,
		"field": "materialid",
		visible: false
	});
	columnsArray.push({
		width: 300,
		"title": "产量",
		"field": "productionnum"
	});
	columnsArray.push({
		width: 300,
		"title": "状态",
		"field": "statusName"
	});
	columnsArray.push({
		width: 300,
		"title": "状态",
		"field": "status",
		visible: false
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "orderid",
		"field": "orderid",
		visible: false
	});

	$.ajax({

		url: window.serviceIP + "/api/order/getsuborderbyid?id=" + encodeURIComponent(qrCode) + "&type=" + orderType,
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
				if(models.length < 1) {
					alert("未找到选定批次,请确认条码信息:" + qrCode);
					return;
				}
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar',
					singleSelect: false,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 30,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//search: true,
					pagination: true,
					columns: columnsArray,
					onClickRow: function(row) {

						$("#changeOrderProductionNum").val(row["productionnum"]);
						$("#changeOrderProductionNum").attr("readonly", true);
					}
				});
				var dataStr = "----";
				var dateNow = new Date();
				if(dateNow.getHours() < 7) {
					dateNow.setDate(today.getDate() - 1);
					dataStr = "YB" + dateNow.format("yyyyMMdd");
				}
				if(dateNow.getHours() > 6 && dateNow.getHours() < 19) {
					dataStr = "BB" + dateNow.format("yyyyMMdd");
				}
				if(dateNow.getHours() > 19) {
					dataStr = "YB" + dateNow.format("yyyyMMdd");
				}
				if(models[0].ordersplitid.substr(models[0].ordersplitid.length - 13, 10) == dataStr) {
					$("#subOrderFinishBT").attr('disabled', false);
				} else {
					$("#subOrderFinishBT").attr('disabled', true);
				}
				$('#materialTable').bootstrapTable('destroy');
				$('#usableMaterialTable').bootstrapTable('destroy');
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function FinishSubOrder() {
	//使用getSelections即可获得，row是json格式的数据


	$("#subOrderFinishBT").attr("disabled", true);
$("#subOrderOvertimeFinishBT").attr("disabled", true);
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	var formData = new FormData();
	if(row.length < 1) {
		alert("请选择行数据!");
		$("#subOrderFinishBT").attr("disabled", false);
		$("#subOrderOvertimeFinishBT").attr("disabled", false);
		return;
	}
	if(row.length > 1) {
		alert("一次只能完成一个批次!您当前选择" + row.length + "个批次!");
		$("#subOrderFinishBT").attr("disabled", false);
		$("#subOrderOvertimeFinishBT").attr("disabled", false);
		return;
	}
	if(row[0]["status"] > 3) {
		alert("该工单已完成!");
		$("#subOrderFinishBT").attr("disabled", false);
		$("#subOrderOvertimeFinishBT").attr("disabled", false);
		return;
	}
	for(var key in row[0]) {
		if(key == 0) {
			continue;
		}
		if(key == "productionnum") {
			formData.append(key, $("#changeOrderProductionNum").val());
			continue;
		}

		if(key == "status") {
			formData.append(key, "3");
			continue;
		}
		formData.append(key, row[0][key]);

		//$("#workOrderManageForm" + " #" + key).attr("value", row[0][key]);
	}
	var formData2 = new FormData();
	formData2.append("name", $Global_UserLogin_Info.username);
	formData2.append("jsonStr", window.getFormDataToJson(formData))
	$.ajax({
		url: window.serviceIP + "/api/order/finishordersplit",
		type: "POST",
		//contentType: "application/json",
		//dataType: "json",
		processData: false,
		contentType: false,
		data: formData2,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		success: function(data) {
			if(data.status == 1) {
				alert('保存成功! ' + data.message);
				SelectSubOrder()
				$("#changeOrderProductionNum").attr("readonly", true);
			} else {
				alert("保存失败！" + data.message);
			}

			$("#subOrderFinishBT").attr("disabled", false);
			$("#subOrderOvertimeFinishBT").attr("disabled", false);
		}
	});
};

function SelectWorkOrderFun() {
	SelectSubOrder();
	setTimeout(function() {
		SelectMaterialRecord();
	}, 100);
	$('#materialTable').bootstrapTable('destroy');
	$('#usableMaterialTable').bootstrapTable('destroy')
	//	setTimeout(getUsableMaterialFun(),200);
	//	SelectMaterialRecord();
	//	getUsableMaterialFun();
};

function SelectSubOrder() {
	var dataStr = "----";
	var dateNow = new Date();
	if(dateNow.getHours() < 7) {
		dateNow.setDate(dateNow.getDate() - 1);
		dataStr = "YB" + dateNow.format("yyyyMMdd");
	}
	if(dateNow.getHours() > 6 && dateNow.getHours() < 19) {
		dataStr = "BB" + dateNow.format("yyyyMMdd");
	}
	if(dateNow.getHours() > 19) {
		dataStr = "YB" + dateNow.format("yyyyMMdd");
	}

	if($("#PlantToLineSelectForm #workOrderSlct").find("option:selected").text().toString().indexOf(dataStr) < 0) {
		$("#subOrderFinishBT").attr('disabled', true);
		$("#subOrderScanQRBT").attr('disabled', true);
		$("#getUsableMaterialBT").attr('disabled', true);
		$("#gainMaterialRecordBT").attr('disabled', true);
		$("#gainPartMaterialRecordBT").attr('disabled', true);
	} else {
		$("#subOrderFinishBT").attr('disabled', false);
		$("#subOrderScanQRBT").attr('disabled', false);
		$("#getUsableMaterialBT").attr('disabled', false);
		$("#gainMaterialRecordBT").attr('disabled', false);
		$("#gainPartMaterialRecordBT").attr('disabled', false);
	}
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		width: 300,
		"title": "工单号",
		"field": "ordersplitid"
	});
	columnsArray.push({
		"title": "产品",
		width: 300,
		"field": "materialName"
	});
	columnsArray.push({
		"title": "产品",
		width: 300,
		"field": "materialid",
		visible: false
	});
	columnsArray.push({
		width: 300,
		"title": "产量",
		"field": "productionnum"
	});
	columnsArray.push({
		width: 300,
		"title": "状态",
		"field": "statusName"
	});
	columnsArray.push({
		width: 300,
		"title": "状态",
		"field": "status",
		visible: false
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "orderid",
		"field": "orderid",
		visible: false
	});
	$.ajax({
		url: window.serviceIP + "/api/order/getordersplitaftermap?orderID=" + document.PlantToLineSelectForm.workOrderSlct.value.toString(),
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
					striped: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 30,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//search: true,
					pagination: true,
					columns: columnsArray,
					onClickRow: function(row) {

						$("#changeOrderProductionNum").val(row["productionnum"]);
						$("#changeOrderProductionNum").attr("readonly", true);
					}
				});

				setTimeout(function() {
					getUsableMaterialFun();
				}, 100);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function SelectMaterialRecord() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "物料号",
		"field": "materialid",
		visible: false
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialName"
	});
	columnsArray.push({
		"title": "物料工单",
		"field": "orderid",
		visible: false
	});
	columnsArray.push({
		"title": "物料工单",
		"field": "inOrderName"
	});
	columnsArray.push({
		"title": "物料子工单",
		"field": "inSubOrderName"
	});
	columnsArray.push({
		"title": "物料子工单",
		"field": "suborderid",
		visible: false
	});
	columnsArray.push({
		"title": "数量",
		"field": "number"
	});
	columnsArray.push({
		"title": "入库人员",
		"field": "inputer"
	});
	columnsArray.push({
		"title": "入库时间",
		"field": "inputtime"
	});
	columnsArray.push({
		"title": "领用人",
		"field": "outputer"
	});
	columnsArray.push({
		"title": "领用时间",
		"field": "outputtime"
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "expendOrderid",
		"field": "expendOrderid",
		visible: false
	});
	$.ajax({
		url: window.serviceIP + "/api/material/getmaterialrecord?expendOrderID=" + document.PlantToLineSelectForm.workOrderSlct.value.toString(),
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

				$('#materialTable').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
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
};

function usableMaterialRowClick(row) {

	$('.changeTableRowColorUsableMaterial').removeClass('changeTableRowColorUsableMaterial');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColorUsableMaterial');
	}
}

function getUsableMaterialFun() {
	// alert('getUsableMaterialFun');
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("materialID", $("#table").bootstrapTable('getData')[0].materialid);
	formData.append("expendOrderID", document.PlantToLineSelectForm.workOrderSlct.value.toString());
	//$('#table').dataTable().row.data();

	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "物料号",
		"field": "materialid",
		visible: false
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialName"
	});
	columnsArray.push({
		"title": "物料工单",
		"field": "orderid",
		visible: false
	});
	columnsArray.push({
		"title": "物料工单",
		"field": "inOrderName"
	});
	columnsArray.push({
		"title": "物料子工单",
		"field": "inSubOrderName"
	});
	columnsArray.push({
		"title": "物料子工单",
		"field": "suborderid",
		visible: false
	});
	columnsArray.push({
		"title": "数量",
		"field": "number"
	});
	columnsArray.push({
		"title": "入库人员",
		"field": "inputer"
	});
	columnsArray.push({
		"title": "入库时间",
		"field": "inputtime"
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	$.ajax({
		url: window.serviceIP + "/api/material/getusablematerial",
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
				var models = eval("(" + dataRes.data + ")");

				$('#usableMaterialTable').bootstrapTable('destroy').bootstrapTable({
					data: models,
					//toolbar: '#materialidToolbar',
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
};

function gainMaterialRecord() {
	$("#gainMaterialRecordBT").attr("disabled", true);
	var formData = new FormData();
	var selectRow = $("#usableMaterialTable").bootstrapTable('getSelections');
	var arrayObj = new Array();
	for(var i = 0; i < selectRow.length; i++) {
		arrayObj.push(selectRow[i].id);
	}
	if(selectRow.length < 1 || document.PlantToLineSelectForm.workOrderSlct.value.toString().length < 2) {
		alert("请确认已选择物料和订单!");
		$("#gainMaterialRecordBT").attr("disabled", false);
		return;
	}
	formData.append("materialRecordIDListStr", JSON.stringify(arrayObj));
	formData.append("materialOrderID", selectRow[0].orderid);
	formData.append("expendOrderID", document.PlantToLineSelectForm.workOrderSlct.value.toString());
	formData.append("outputter", $Global_UserLogin_Info.username) //$Global_UserLogin_Info.username;

	$.ajax({
		url: window.serviceIP + "/api/material/gainmaterialrecord",
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
				getUsableMaterialFun();
				SelectMaterialRecord();
				alert("投料成功！");
			} else {
				alert("投料失败！" + dataRes.message);
			}
			$("#gainMaterialRecordBT").attr("disabled", false);
		}
	});
};

function createQRCode() {
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length < 1) {
		alert("请选择行数据!");
		return;
	}
	$("#codeHtml").html('<div id="QRCode" ></div>');
	jQuery('#QRCode').qrcode({
		//render: "canva",
		render: "canvas",
		width: 100, //宽度
		height: 100, //高度
		text: row[0]["id"]
	});
}

function printQRCode() {
	//createQRCode();
	//	var img = document.getElementById("QRImage"); /// get image element
	//	var canvas = document.getElementsByTagName("canvas")[0]; /// get canvas element
	//	img.src = canvas.toDataURL("image/png"); /// update image

	var selectRow = $("#table").bootstrapTable('getSelections');
	//var arrayObj = new Array();
	for(var i = 0; i < selectRow.length; i++) {
		//console.log("dayin");
		var orderLength = selectRow[i].ordersplitid.length;
		var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
		LODOP.PRINT_INIT("打印任务名"); //首先一个初始化语句
		//LODOP.ADD_PRINT_BARCODE(0,0,200,100,"Code39","*123ABC4567890*");
		LODOP.ADD_PRINT_BARCODE(15, 15, 140, 140, "QRCode", selectRow[i].id);

		LODOP.ADD_PRINT_TEXT(140, 5, 160, 50, selectRow[i].ordersplitid); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		LODOP.ADD_PRINT_TEXT(10, 160, 130, 20, "日期: ");
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);
		LODOP.ADD_PRINT_TEXT(30, 160, 130, 40, selectRow[i].ordersplitid.substr(orderLength - 11, 4) + "年" +
			selectRow[i].ordersplitid.substr(orderLength - 7, 2) + "月" + selectRow[i].ordersplitid.substr(orderLength - 5, 2) + "日"); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		LODOP.ADD_PRINT_TEXT(70, 160, 130, 100, selectRow[i].materialName + " * " + selectRow[i].productionnum); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		//LODOP.ADD_PRINT_HTM(5, 5, 200, 200, document.getElementById("QRImage")) //增加超文本项
		//LODOP.PREVIEW();
		LODOP.PRINT(); //最后一个打印(或预览、维护、设计)语句
	}

	//document.getElementById("QRImage").style.display="block";
	//	//document.getElementById("QRImage").ExecWB(6,2);
	//	$("#QRImage").jqprint({
	//		debug: false,
	//		importCSS: true,
	//		printContainer: true,
	//		operaSupport: false
	//	});
	//	document.getElementById("QRImage").style.display="none";
}

var canvas = null,
	context = null,
	video = null;  
var mediaStreamTrack = null;   
function printHtml(content) {       
	$(window.document.body).append(content + "<br/>");   
}    //开始拍照


//重写startScanQR(webName)方法
function startScanQR(webName) {
// 	if(context) {         
// 		context.drawImage(video, 0, 0, 320, 320);               
// 		if(canvas != null) {            //以下开始编 数据  
// 			var imgData = canvas.toDataURL("image/jpeg");            //将图像转换为base64数据
// 			qrcode.decode(imgData);             
// 			qrcode.callback = function(imgMsg) {
// 				if(imgMsg != null && imgMsg.trim().length > 1 && imgMsg.toString().indexOf("error decoding") == -1) {
// 					recognitionQR(webName, imgMsg);
// 				} else {
// 					setTimeout(startScanQR(webName), 500);
// 				}
// 			}       
// 		}          
// 	}  
	
}

function recognitionQR(webName, qrCode) {
	if(webName == 'subOrder')
		getMaterialRecordBySuborderID(qrCode);
	else if('solidifyProcess' == webName)
		gotoNextSolidifyRoomByQR(qrCode);
	else if('finishSubOrder' == webName)
		finishSubOrderByQR(qrCode,"1");
	else if('grantMaterial' == webName)
		grantMaterialByQR(qrCode);
}

function startsScanQRPat() { 
	var getQR = false; 

	var finalQR = null;
	for(var i = 1; i < 1000; i++) { 

		if(context) {         
			context.drawImage(video, 0, 0, 320, 320);               
			if(canvas != null) {            //以下开始编 数据  
				var imgData = canvas.toDataURL("image/jpeg");            //将图像转换为base64数据
				qrcode.decode(imgData);             
				qrcode.callback = function(imgMsg) {
					if(!getQR && imgMsg != null && imgMsg.trim().length > 1 && imgMsg.toString().indexOf("error decoding") == -1) {
						getQR = true;
						getMaterialRecordBySuborderID(imgMsg);
					}
				}       
			}          
		}       
		if(getQR) {
			break;
		}
	}  
	//console.log("over ---- over");   
}    //抓屏获取图像流，并上传到服务器
   
function CatchCode() { 
	var resQR = null;
	if(canvas != null) {            //以下开始编 数据
		var imgData = canvas.toDataURL("image/jpeg");            //将图像转换为base64数据
		qrcode.decode(imgData);             
		qrcode.callback = function(imgMsg) {                  
			resQR = imgMsg;
		}       
	} 
	return resQR;   
}

function startQRScan() {
	alert("kaishi");
	alert(video.src);
	$("#workOrderManageForm #videoSubOrderScanQR").play();

}

// function scanQR(webName) {
// 	$('#myModal').modal('show');
// 	if(context == null) { 
// 		//window.addEventListener("DOMContentLoaded", function() {       
// 		try {    
// 
// 			canvas = document.getElementById("canvasSubOrderScanQR");           
// 			context = canvas.getContext("2d");           
// 			video = document.getElementById("videoSubOrderScanQR");           
// 			var videoObj = {
// 				audio: false,
// 				"video": true
// 
// 			};              
// 			//			var videoObj = {
// 			//				"video": true
// 			//			};    
// 			var  flag = true;             
// 			var   MediaErr = function(error) {                   
// 				flag = false;                   
// 				if(error.PERMISSION_DENIED) {                       
// 					alert('用户拒绝了浏览器请求媒体的权限', '提示');                   
// 				} else if(error.NOT_SUPPORTED_ERROR) {                       
// 					alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');                   
// 				} else if(error.MANDATORY_UNSATISFIED_ERROR) {                       
// 					alert('指定的媒体类型未接收到媒体流', '提示');                   
// 				} else {                       
// 					alert('系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试!' + error.name + ": " + error.message, '提示');                   
// 				}               
// 			};            //获取媒体的兼容代码，目前只支持（Firefox,Chrome,Opera）
// 			      
// 			//			var promisifiedOldGUM = function(constraints) {
// 			//
// 			//				// 第一个拿到getUserMedia，如果存在
// 			//				var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
// 			//
// 			//				// 有些浏览器只是不实现它-返回一个不被拒绝的承诺与一个错误保持一致的接口
// 			//				if(!getUserMedia) {
// 			//					return Promise.reject(new Error('getUserMedia is not implemented in this browser-getUserMedia是不是在这个浏览器实现'));
// 			//				}
// 			//
// 			//				// 否则，调用包在一个旧navigator.getusermedia承诺
// 			//				return new Promise(function(resolve, reject) {
// 			//					getUserMedia.call(navigator, constraints, resolve, reject);
// 			//				});
// 			//
// 			//			}
// 			//			if(navigator.mediaDevices === undefined) {
// 			//				navigator.mediaDevices = {};
// 			//			}
// 			//			if(navigator.mediaDevices.getUserMedia === undefined) {
// 			//				alert("getDlg");
// 			//				navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
// 			//			}   
// 
// 			//		  navigator.getUserMedia  = navigator.mediaDevices.getUserMedia ||navigator.getUserMedia ||
// 			//      navigator.webkitGetUserMedia ||
// 			//      navigator.mozGetUserMedia ||
// 			//      navigator.msGetUserMedia;//获取媒体对象（这里指摄像头）
// 			//  navigator.getUserMedia({video:true}, gotStream, noStream);//参数1获取用户打开权限；参数二成功打开后调用，并传一个视频流对象，参数三打开失败后调用，传错误信息
// 			//
// 			//  function gotStream(stream) {
// 			//  	alert("mediaDevicesgetUserMedia");    
// 			//      video.src = URL.createObjectURL(stream);
// 			//      alert("mediaDevicesgetUserMedia");    
// 			//      video.onerror = function () {
// 			//      	alert("Errot");  
// 			//          stream.stop();
// 			//      };
// 			//      alert("mediaDevicesgetUserMedia");    
// 			//      stream.onended = noStream;
// 			//      video.onloadedmetadata = function () {
// 			//      };
// 			//  }
// 			//  function noStream(err) {
// 			//      alert(err);
// 			//  }
// 			  
// 			if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia()) {                //qq浏览器不支持
// 				//				if(navigator.userAgent.indexOf('MQQBrowser') > -1) {                   
// 				//					alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');                   
// 				//					return false;               
// 				//				}     
// 				try {  
// 					navigator.mediaDevices.getUserMedia(videoObj).then(function(stream) { 
// 						//mediaStreamTrack = stream;                  
// 						//video.src = window.URL.createObjectURL(stream);;                   
// 						//video.play();
// 
// 						//mediaStreamTrack = stream; 
// 
// 						video.srcObject = stream;
// 						video.onloadedmetadata = function(e) {
// 							video.play();
// 						};
// 					}, MediaErr);   
// 				} catch(err) {
// 					alert(err);
// 				}        
// 			}    
// 			else if(navigator.getUserMedia) { // Standard   
// 				navigator.getUserMedia(videoObj, function(stream) {   
// 					mediaStreamTrack = stream;       
// 					video.src = stream;
// 					video.play();
// 				}, MediaErr);
// 			}           
// 			else if(navigator.webkitGetUserMedia) {              
// 				navigator.webkitGetUserMedia(videoObj, function(stream) {  
// 					mediaStreamTrack = stream;                  
// 					video.src = window.webkitURL.createObjectURL(stream);                   
// 					video.play();      
// 				}, MediaErr);           
// 			}       
// 			else if(navigator.mozGetUserMedia) {              
// 				navigator.mozGetUserMedia(videoObj, function(stream) { 
// 					mediaStreamTrack = stream;                   
// 					video.src = window.URL.createObjectURL(stream);                   
// 					video.play();               
// 				}, MediaErr);           
// 			}           
// 			else if(navigator.msGetUserMedia) {           
// 				navigator.msGetUserMedia(videoObj, function(stream) { 
// 					mediaStreamTrack = stream;                   
// 					$(document).scrollTop($(window).height());                   
// 					video.src = window.URL.createObjectURL(stream);                   
// 					video.play();               
// 				}, MediaErr);           
// 			} else {               
// 				alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器');               
// 				return false;           
// 			}           
// 			if(flag) {                // alert('为了获得更准确的测试结果，请尽量将二维码置于框中，然后进行拍摄、扫描。 请确保浏览器有权限使用摄像功能');
// 				          }            //这个是拍照按钮的事件，
// 			           
// 
// 			//				$("#snap").click(function() {
// 			//					startPat();
// 			//				}).show();       
// 		} catch(e) {           
// 			//printHtml("浏览器不支持HTML5 CANVAS");       
// 		}   
// 		//}, false);    //打印内容到页面
// 	} 
// 	//console.log("start");
// 	setTimeout(startScanQR(webName), 1000) ; 
// }

var accept_webName = null;
//重写scanQR方法
function scanQR(webName) {
	//执行H5扫描二维码方法
	openBarcode();
	//扫描二维码后执行龙森的方法
	startScanQR(webName);
	accept_webName = webName;
}



function closeQRScan() {
	$("#myModal").modal('hide');
}

function gainMaterialByQR(recordID) {
	$("#myModal").modal('hide');
	//console.log("gainMaterialByQR" + recordID);

	if(recordID.length < 2 || document.PlantToLineSelectForm.workOrderSlct.value.toString().length < 2) {
		alert("请确认已选择物料和订单!")
		return;
	}
	var formData = new FormData();
	formData.append("expendOrderID", document.PlantToLineSelectForm.workOrderSlct.value.toString());
	formData.append("outputter", $Global_UserLogin_Info.username) //$Global_UserLogin_Info.username;
	formData.append("qrCode", recordID);

	$.ajax({
		url: window.serviceIP + "/api/material/gainmaterialbyqr",
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
				getUsableMaterialFun();
				SelectMaterialRecord();
				alert("领取成功！");
			} else {
				alert("领取失败！" + dataRes.message);
			}
		}
	});
}

function getMaterialRecordBySuborderID(recordID) {
	$("#myModal").modal('hide');
	//console.log("gainMaterialByQR" + recordID);

	if(recordID.length < 2 || document.PlantToLineSelectForm.workOrderSlct.value.toString().length < 2) {
		alert("请确认已选择物料和订单!")
		return;
	}
	var formData = new FormData();
	formData.append("expendOrderID", document.PlantToLineSelectForm.workOrderSlct.value.toString());

	formData.append("qrCode", recordID);

	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "物料号",
		"field": "materialid",
		visible: false
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialName"
	});
	columnsArray.push({
		"title": "物料工单",
		"field": "orderid",
		visible: false
	});
	columnsArray.push({
		"title": "物料工单",
		"field": "inOrderName"
	});
	columnsArray.push({
		"title": "物料子工单",
		"field": "inSubOrderName"
	});
	columnsArray.push({
		"title": "物料子工单",
		"field": "suborderid",
		visible: false
	});
	columnsArray.push({
		"title": "数量",
		"field": "number"
	});
	columnsArray.push({
		"title": "入库人员",
		"field": "inputer"
	});
	columnsArray.push({
		"title": "入库时间",
		"field": "inputtime"
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	$.ajax({
		url: window.serviceIP + "/api/material/getmaterialrecordbysuborderid",
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
				var models = eval("(" + dataRes.data + ")");

				if(models.length < 1) {
					alert("未获取到物料信息,请核对!" + recordID);
					return;
				}
				$('#usableMaterialTable').bootstrapTable('destroy').bootstrapTable({
					data: models,
					//toolbar: '#materialidToolbar',
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

function getSolidifyRoomOrder() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		width: 300,
		"title": "工单号",
		"field": "ordersplitname"
	});
	columnsArray.push({
		"title": "一段操作人",
		width: 300,
		"field": "recorder1"
	});
	columnsArray.push({
		"title": "一段开始时间",
		width: 300,
		"field": "starttime1"
	});
	columnsArray.push({
		width: 300,
		"title": "一段结束时间",
		"field": "endtime1"
	});
	columnsArray.push({
		"title": "二段操作人",
		width: 300,
		"field": "recorder2"
	});
	columnsArray.push({
		"title": "二段开始时间",
		width: 300,
		"field": "starttime2"
	});
	columnsArray.push({
		width: 300,
		"title": "二段结束时间",
		"field": "endtime2"
	});
	columnsArray.push({
		"title": "三段操作人",
		width: 300,
		"field": "recorder3"
	});
	columnsArray.push({
		"title": "三段开始时间",
		width: 300,
		"field": "starttime3"
	});
	columnsArray.push({
		width: 300,
		"title": "三段结束时间",
		"field": "endtime3"
	});

	columnsArray.push({
		width: 300,
		"title": "状态",
		"field": "status",
		visible: false
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "orderid",
		"field": "orderid",
		visible: false
	});
	$.ajax({
		url: window.serviceIP + "/api/solidifyrecord/selectbyroom?roomID=" + document.PlantToLineSelectForm.solidifyRoomSlct.value.toString() +
			"&plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString(),
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
				$('#solidifyRecordTable').bootstrapTable('destroy').bootstrapTable({
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

function gotoNextSolidifyRoom() {
	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#solidifyRecordTable').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	if(row.length < 1) {
		alert("请选择行数据!");
		return;
	}
	//console.log(row);
	var stageNum = 1;
	if(row[0]["endtime3"] != null && row[0]["endtime3"].toString().length > 8) {
		alert("该工单已固化结束!");
		return;
	}
	if(row[0]["starttime3"] != null && row[0]["starttime3"].toString().length > 8) {
		stageNum = 4;
	} else if(row[0]["starttime2"] != null && row[0]["starttime2"].toString().length > 8) {
		stageNum = 3;
	} else if(row[0]["starttime1"] != null && row[0]["starttime1"].toString().length > 8) {
		stageNum = 2;
	}
	$.ajax({
		url: window.serviceIP + "/api/solidifyrecord/addsolidifyrecord?id=" + row[0]["id"] +
			"&status=" + stageNum + "&recorder=" + $Global_UserLogin_Info.username + "&roomID=" + document.PlantToLineSelectForm.solidifyRoomSlct.value.toString(),
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				getSolidifyRoomOrder();

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function gotoNextSolidifyRoomByQR() {

}

function gainPartMaterialRecord() {
	var formData = new FormData();
	var selectRow = $("#usableMaterialTable").bootstrapTable('getSelections');
	if(selectRow.length != 1) {
		alert("请选择一行有效投料数据,当前选择行数为" + selectRow.length);
		return;
	}
	if(selectRow.length < 1 || document.PlantToLineSelectForm.workOrderSlct.value.toString().length < 2) {
		alert("请确认已选择物料和订单!")
		return;
	}
	var result1 = parseFloat($("#changeGainProductionNum").val());
	var result2 = parseFloat(selectRow[0]["number"]);
	if(result1 <= 0) {
		alert("领料数量必须大于0!");
		return;
	}
	if(result1 > result2) {
		alert("领料数量必须小于库存数量!");
		return;
	}
	formData.append("materialRecordID", selectRow[0].id);
	formData.append("number", result1);
	formData.append("expendOrderID", document.PlantToLineSelectForm.workOrderSlct.value.toString());
	formData.append("outputter", $Global_UserLogin_Info.username) //$Global_UserLogin_Info.username;
	formData.append("materialOrderID", selectRow[0].orderid);
	$.ajax({
		url: window.serviceIP + "/api/material/gainpartmaterialrecord",
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
				getUsableMaterialFun();
				SelectMaterialRecord();
				$('#changeGainProductionModal').modal('hide');
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function showChangeGainModal() {
	var selectRow = $("#usableMaterialTable").bootstrapTable('getSelections');
	if(document.PlantToLineSelectForm.workOrderSlct.value.toString().length < 2) {
		alert("请确认当前订单信息!");
		return;
	}
	if(selectRow.length != 1) {
		alert("请选择一行有效投料数据,当前选择行数为" + selectRow.length);
		return;
	}
	document.getElementById("changeGainProductionLabel").innerHTML = selectRow[0]["materialName"] + " :" + selectRow[0]["number"];
	//	document.getElementById("changeGainProductionNum").val(selectRow[0]["number"]);
	$("#changeGainProductionNum").val(selectRow[0]["number"]);
	$('#changeGainProductionModal').modal('show');
}

function closeChangeGainProductionModal() {
	$('#changeGainProductionModal').modal('hide');
}

function subOrderRowClick(row) {
	$('.changeTableRowColor').removeClass('changeTableRowColor');
	// alert($(row).find("td:eq(0)")[0].checked);
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
	//	if($(row).find("td:eq")[0])
	//	$(row).addClass('changeTableRowColor');
	//	$($(row).find("td")[1]).addClass('changeTableRowColor');
	//	$(row).find("td").addClass('changeTableRowColor');
}

function cancelFinishSuborder(){
	
	
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	if(row.length < 1) {
		alert("请选择行数据!");
		return;
	}
	if(row.length > 1) {
		alert("一次只能选择一个批次!您当前选择" + row.length + "个批次!");
		return;
	}
	if(row[0]["status"] < 4) {
		alert("该工单不是已完成状态!");
		return;
	}

	
		$.ajax({
		url: window.serviceIP + "/api/order/cancelfinishsuborder?subOrdderID=" + row[0]['id'],
		type: "POST",
		//contentType: "application/json",
		//dataType: "json",
		processData: false,
		contentType: false,
		//data: formData2,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		success: function(data) {
			if(data.status == 1) {
				alert('取消成功! ' + data.message);
				SelectSubOrder()
				
			} else {
				alert("取消失败！" + data.message);
			}
		}
	});
}

function selectBySubOrderName()
{
	if($("#subOrderName").val().trim().length <2)
	{
		alert("请确认输入条码名称!");
		return;
	}
	finishSubOrderByQR($("#subOrderName").val().trim(),"2");
}



////////以下是H5+调用摄像头进行扫一扫
// alert(openBarcode())
var img = null;
				var blist = [];
				function scaned(t, r, f){
					// alert('t='+t+'r='+r+'f='+f);
					//获取扫描二维码信息
					recognitionQR(accept_webName, r);
// 					var d = new Date();
// 					var h=d.getHours(),m=d.getMinutes(),s=d.getSeconds(),ms=d.getMilliseconds();
// 					if(h < 10){ h='0'+h; }
// 					if(m < 10){ m='0'+m; }
// 					if(s < 10){ s='0'+s; }
// 					if(ms < 10){ ms='00'+ms; }
// 					else if(ms < 100){ ms='0'+ms; }
// 					var ts = '['+h+':'+m+':'+s+'.'+ms+']';
// 					var li=null,hl = document.getElementById('history');
// 					if(blist.length > 0){
// 						li = document.createElement('li');
// 						li.className = 'ditem';
// 						hl.insertBefore(li, hl.childNodes[0]);
// 					} else{
// 						li = document.getElementById('nohistory');
// 					}
// 					li.id = blist.length;
// 					var html = '['+h+':'+m+':'+s+'.'+ms+']'+'　　'+t+'码<div class="hdata">';
// 					html += r;
// 					html += '</div>';
// 					li.innerHTML = html;
// 					li.setAttribute('onclick', 'selected(id)');
// 					blist[blist.length] = {type:t,result:r,file:f};
// 					update(t, r, f);
					
				}
				function selected(id){
					var h = blist[id];
					update( h.type, h.result, h.file );
					if(h.result.indexOf('http://')==0  || h.result.indexOf('https://')==0){
						plus.nativeUI.confirm(h.result, function(i){
							if(i.index == 0){
								plus.runtime.openURL(h.result);
							}
						}, '', ['打开', '取消']);
					} else{
						plus.nativeUI.alert(h.result);
					}
				}
				function update(t, r, f){
					outSet('扫描成功：');
					outLine(t);
					outLine(r);
					outLine('\n图片地址：'+f);
					if(!f || f=='null'){
						img.src = '../../vendor/H5+/img/barcode.png';	
					} else{
						plus.io.resolveLocalFileSystemURL(f, function(entry){
							img.src=entry.toLocalURL();
						});
						//img.src = 'http://localhost:13131/'+f;
					}
				}
				function onempty(){
					if(window.plus){
						plus.nativeUI.alert('无扫描记录');
					} else {
						alert('无扫描记录');
					}
				}
				function cleanHistroy(){
					if(blist.length > 0){
						var hl = document.getElementById('history');
						hl.innerHTML = '<li id="nohistory" class="ditem" onclick="onempty();">无历史记录	</li>';
					}
					plus.io.resolveLocalFileSystemURL('_doc/barcode/', function(entry){
						entry.removeRecursively(function(){
							// Success
						}, function(e){
							//alert( "failed"+e.message );
						});
					});
				}
				// 打开二维码扫描界面 
				function openBarcode(){
					createWithoutTitle('barcode_scan.html', {
						titleNView:{
							type: 'float',
							backgroundColor: 'rgba(215,75,40,0.3)',
							titleText: '扫一扫',
							titleColor: '#FFFFFF',
							autoBackButton: true,
							buttons: [{
								fontSrc: '_www/helloh5.ttf',
								text: '相册',
								fontSize: '15px',
								onclick: 'javascript:scanPicture()'
							}]
						}
					});
				}
				// 打开自定义扫描界面 
				function openBarcodeCustom(){
					createWithoutTitle('barcode_custom.html', {
						titleNView:{
							type: 'float',
							backgroundColor: 'rgba(215,75,40,0.3)',
							titleText: '扫一扫',
							titleColor: '#FFFFFF',
							autoBackButton: true,
							buttons: [{
								// fontSrc: '_www/helloh5.ttf',
								text: '相册',
								fontSize: '15px',
								onclick: 'javascript:switchFlash()'
							}]
						}
					});
				}