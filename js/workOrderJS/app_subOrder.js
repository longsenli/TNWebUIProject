//获取全局token等信息，放入变量localStorage., app_login.html中login登陆方法初始赋值，用户首次登陆成功后设置放入localStorage
//var localStorage. = JSON.parse(localStorage.getItem('localStorage.'));

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
				// $('#industrialPlantSlct').selectpicker('mobile');
				if(localStorage.plantID != null && localStorage.plantID != 'undefined' && localStorage.plantID.toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.plantID) {
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
				// $('#productionProcessSlct').selectpicker('mobile');

				if(localStorage.processID != null && localStorage.processID != 'undefined' && localStorage.processID.toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.processID) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionProcessSlct').selectpicker('hide');

							$("#productionProcessLabel").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 

				}
				subOrderProductionLineSlctFun();
				//				setTimeout(function() {
				//					subOrderProductionLineSlctFun();
				//				}, 100);
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function subOrderProductionLineSlctFun() {
	//获取流程IP
	var flag = document.PlantToLineSelectForm.productionProcessSlct.value.toString();
	//判断是否为浇铸流程
	if(flag == window.windowProcessEnum.JZ) {

		//		$('#subOrderFinishBT').attr("onclick", "pushInDryingKilnjzsuborder()");
		$("#subOrderFinishBT").html('<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>扫码入窑');
		$('#subOrderFinishBT').attr("onclick", "scanQR('dryingKilnjzPushIn')");
		$('#subOrderOutDryingBTJZ').show();
		//$('#subOrderCancelFinishBTJZEX').show();
		//$('#subOrderOvertimeFinishBT').hide();

		$('#subOrderFinishOnlyBTJZ').show();

		if(document.PlantToLineSelectForm.industrialPlantSlct.value.toString() != "1003") {
			$("#subOrderFinishBT").hide();
			$("#subOrderOutDryingBTJZ").hide();
		}

	} else {
		$('#subOrderFinishOnlyBTJZ').hide();
		$('#subOrderOvertimeFinishBT').show();
		$('#subOrderCancelFinishBTJZEX').hide();
		$('#subOrderOutDryingBTJZ').hide();
		$("#subOrderFinishBT").html('<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>完成');
		$('#subOrderFinishBT').attr("onclick", "FinishSubOrder()");
		$("#subOrderFinishBT").show();
		$('#subOrderCancelFinishBT').show();

		//	if(localStorage.roleID == window.windowRoleID.CZG) {
		//		$('#subOrderCancelFinishBT').hide();
		//		$('#subOrderOvertimeFinishBT').hide();
		//	}

		//alert($('#subOrderFinishBT').attr("onclick"));
	}
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
				// $('#productionLineSlct').selectpicker('mobile');
				if(localStorage.lineID != null && localStorage.lineID != 'undefined' && localStorage.lineID.toString().length > 0) {
					var numbers = $('#productionLineSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.lineID) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionLineSlct').selectpicker('hide');

							$("#productionLineLabel").css("display", "none");
						}
					}
					$('#productionLineSlct').selectpicker('refresh');
					$('#productionLineSlct').selectpicker('render'); 

				}
				lineWorkOrderSlct();
				//				setTimeout(function() {
				//					lineWorkOrderSlct();
				//				}, 100);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function subOrderWorkingLocationSlctFun() {
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getworklocation",
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

			$("#workingkLocationSlct").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				if(models.length < 1) {
					$("#workingkLocationSlctLabel").hide(); //.css("display", "none")
					$('#workingkLocationSlct').selectpicker('hide');

				} else {
					$("#workingkLocationSlctLabel").show(); //.attr("display", "block")
					$('#workingkLocationSlct').selectpicker('show');
				}
				for (var  i  in  models)  {  
					$('#workingkLocationSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#workingkLocationSlct').selectpicker('refresh');
				$('#workingkLocationSlct').selectpicker('render');   
				// $('#workingkLocationSlct').selectpicker('mobile');
				if(localStorage.workingkLocation != null && localStorage.workingkLocation != 'undefined' && localStorage.workingkLocation.toString().length > 0) {
					var numbers = $('#workingkLocationSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.workingkLocation) {
							$(numbers[j]).attr("selected", "selected");
							//$('#workingkLocationSlct').selectpicker('hide');
							//$("#workingkLocationSlctLabel").css("display", "true");
						}
					}
					$('#workingkLocationSlct').selectpicker('refresh');
					$('#workingkLocationSlct').selectpicker('render'); 
				}
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function lineWorkOrderSlct() {

	var dataStr = "2";
	var dateNow = new Date();
	if(dateNow.getHours() < 7) {
		dateNow.setDate(dateNow.getDate() - 1);
		dataStr = "YB" + dateNow.format("yyyyMMdd");
	}
	if(dateNow.getHours() > 6 && dateNow.getHours() < 19) {
		dataStr = "BB" + dateNow.format("yyyyMMdd");
	}
	if(dateNow.getHours() > 18) {
		dataStr = "YB" + dateNow.format("yyyyMMdd");
	}

	if(document.PlantToLineSelectForm.productionProcessSlct.value == windowProcessEnum.JS) {
		dataStr = dateNow.format("yyyyMMdd");
	}
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
					if(models[i].orderid.toString().indexOf(dataStr) > 0) {
						$('#workOrderSlct').append(("<option value=" + models[i].id + ">" +
							models[i].orderid  + "</option>").toString());
					}

				}
				$('#workOrderSlct').selectpicker('refresh');
				$('#workOrderSlct').selectpicker('render');   
				// $('#workOrderSlct').selectpicker('mobile');
				//				setTimeout(function() {
				//					SelectWorkOrderFun();
				//				}, 100);
				SelectWorkOrderFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
	subOrderWorkingLocationSlctFun();
};

function subOrderChangeOrderNum() {
	$("#changeOrderProductionNum").attr("readonly", false);
	$("#changeOrderProductionNum").focus();
	$("#changeOrderProductionNum").focus();
	$("#changeOrderProductionNum").val();
}

function finishSubOrderByQR(qrCode, orderType) {
	$("#myModal").modal('hide');
	var columnsArray = [];
	columnsArray.push({
		checkbox: true,
		formatter: function(value, row, index) {

			if(index == 0) {
				$("#changeOrderProductionNum").val(row.productionnum);
				return {
					checked: true //设置选中
				};
			}
		}
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
		url: window.serviceIP + "/api/order/getsuborderbyidtomap?id=" + encodeURIComponent(qrCode) + "&type=" + orderType +
			"&plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
			"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString(),
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
					alert("未找到选定二维码,请确认条码信息:" + qrCode);
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

				$("#changeOrderProductionNum").val('');
				var dataStr = "----";
				var dateNow = new Date();
				if(dateNow.getHours() < 7) {
					dateNow.setDate(dateNow.getDate() - 1);
					dataStr = "YB" + dateNow.format("yyyyMMdd");
				}
				if(dateNow.getHours() > 6 && dateNow.getHours() < 19) {
					dataStr = "BB" + dateNow.format("yyyyMMdd");
				}
				if(dateNow.getHours() > 18) {
					dataStr = "YB" + dateNow.format("yyyyMMdd");
				}
				if(models[0].ordersplitid.substr(models[0].ordersplitid.length - 13, 10) == dataStr) {
					$("#subOrderFinishBT").attr('disabled', false);
					$("#subOrderFinishOnlyBTJZ").attr('disabled', false);
				} else {
					$("#subOrderFinishBT").attr('disabled', true);
					$("#subOrderFinishOnlyBTJZ").attr('disabled', true);
				}
				$('#materialTable').bootstrapTable('destroy');
				$('#usableMaterialTable').bootstrapTable('destroy');

				if($('#autoFinishOrderCheck').is(':checked')) {
					FinishSubOrder();
				}
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function FinishSubOrder() {

	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	//使用getSelections即可获得，row是json格式的数据
	$("#subOrderFinishOnlyBTJZ").attr('disabled', true);
	$("#subOrderFinishBT").attr("disabled", true);
	$("#subOrderOvertimeFinishBT").attr("disabled", true);

	var formMap = {};

	if(row.length < 1) {
		alert("请选择行数据!");

		$("#subOrderFinishBT").attr("disabled", false);
		$("#subOrderOvertimeFinishBT").attr("disabled", false);
		$("#subOrderFinishOnlyBTJZ").attr('disabled', false);
		return;
	}
	if(row.length > 1) {
		alert("一次只能完成一个批次!您当前选择" + row.length + "个批次!");
		$("#subOrderFinishBT").attr("disabled", false);
		$("#subOrderOvertimeFinishBT").attr("disabled", false);
		$("#subOrderFinishOnlyBTJZ").attr('disabled', false);
		return;
	}
	if(!row[0]["status"] || !row[0]["ordersplitid"]) {
		alert("请先扫码获取工单信息!");
		$("#subOrderFinishBT").attr("disabled", false);
		$("#subOrderOvertimeFinishBT").attr("disabled", false);
		$("#subOrderFinishOnlyBTJZ").attr('disabled', false);
		return;
	}
	if(row[0]["status"] > 3) {
		alert("完成失败,该工单已经被他人完成!");
		$("#subOrderFinishBT").attr("disabled", false);
		$("#subOrderOvertimeFinishBT").attr("disabled", false);
		$("#subOrderFinishOnlyBTJZ").attr('disabled', false);
		return;
	}
	for(var key in row[0]) {
		if(key == 0) {
			continue;
		}
		if(key == "productionnum") {

			if($("#changeOrderProductionNum").val().length < 1) {
				formMap[key] = row[0][key]; // formData.append(key, row[0][key]);
			} else {
				formMap[key] = $("#changeOrderProductionNum").val();
				//formData.append(key, $("#changeOrderProductionNum").val());
			}
			continue;
		}

		if(key == "status") {

			formMap[key] = "3";
			continue;
		}

		formMap[key] = row[0][key];
		//$("#workOrderManageForm" + " #" + key).attr("value", row[0][key]);
	}

	var formMap2 = {};
	if(document.PlantToLineSelectForm.workingkLocationSlct.value.toString().length < 2) {
		formMap2["name"] = localStorage.username + "###" + localStorage.userID + "###-1###" + row[0]["materialName"];
	} else {
		formMap2["name"] = localStorage.username + "###" + localStorage.userID + "###" +
			document.PlantToLineSelectForm.workingkLocationSlct.value.toString() + "###" + row[0]["materialName"];
	}
	//formMap2["name"] = localStorage.username;
	formMap2["jsonStr"] = JSON.stringify(formMap).toString();

	$.ajax({
		url: window.serviceIP + "/api/order/finishordersplit",
		type: "POST",
		//contentType: "application/json",
		dataType: "json",
		//processData: false,
		//contentType: false,
		data: formMap2,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		success: function(data) {
			if(data.status == 1) {
				// alert('保存成功! ' + data.message);
				$('<div>').appendTo('body').addClass('alert alert-success').html('保存成功! ' + data.message).show().delay(3000).fadeOut();
				if(window.windowRoleID.CZG == localStorage.roleID) {
					getSelfProductionRecord();
				} else {
					SelectSubOrder();
				}

				$("#changeOrderProductionNum").attr("readonly", true);
			} else {
				alert("保存失败！" + data.message);
			}

			$("#subOrderFinishBT").attr("disabled", false);
			$("#subOrderOvertimeFinishBT").attr("disabled", false);
			$("#subOrderFinishOnlyBTJZ").attr('disabled', false);
		}
	});
};

function getSelfProductionRecord() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});

	columnsArray.push({
		width: 300,
		"title": "姓名",
		"field": "inputer"
	});
	columnsArray.push({
		width: 300,
		"title": "物料型号",
		"field": "materialNameInfo"
	});
	columnsArray.push({
		width: 300,
		"title": "工单号",
		"field": "subOrderID"
	});

	columnsArray.push({
		width: 300,
		"title": "产量",
		"field": "number"
	});
	columnsArray.push({
		width: 300,
		"title": "完成时间",
		"field": "inputTime"
	});

	var timeNow = new Date();
	var startTime = "";
	var endTime = "";
	if(timeNow.getHours() < 7) {
		endTime = timeNow.format("yyyy-MM-dd " + "07:00:00");
		timeNow.setDate(timeNow.getDate() - 1);
		startTime = timeNow.format("yyyy-MM-dd " + "07:00:00");
	} else {
		startTime = timeNow.format("yyyy-MM-dd " + "07:00:00");
		timeNow.setDate(timeNow.getDate() + 1);
		endTime = timeNow.format("yyyy-MM-dd " + "07:00:00");
	}

	var urlStr = window.serviceIP + "/api/material/getShelfProductionRecord?staffID=" + localStorage.userID +
		"&startTime=" + startTime + "&endTime=" + endTime;
	//console.log(urlStr);
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
					search: true,
					pagination: true,
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

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
	if(dateNow.getHours() > 18) {
		dataStr = "YB" + dateNow.format("yyyyMMdd");
	}

	if($("#PlantToLineSelectForm #productionProcessSlct").val() == windowProcessEnum.JS) {
		$("#subOrderFinishBT").attr('disabled', false);
		$("#subOrderScanQRBT").attr('disabled', false);
		$("#getUsableMaterialBT").attr('disabled', false);
		$("#gainMaterialRecordBT").attr('disabled', false);
		$("#gainPartMaterialRecordBT").attr('disabled', false);
		$("#subOrderFinishOnlyBTJZ").attr('disabled', false);
		$("#subOrderFinishOnlyBTJZ").attr('disabled', false);
	} else {
		if($("#PlantToLineSelectForm #workOrderSlct").find("option:selected").text().toString().indexOf(dataStr) < 0) {
			$("#subOrderFinishBT").attr('disabled', true);
			$("#subOrderScanQRBT").attr('disabled', true);
			$("#getUsableMaterialBT").attr('disabled', true);
			$("#gainMaterialRecordBT").attr('disabled', true);
			$("#gainPartMaterialRecordBT").attr('disabled', true);
			$("#subOrderFinishOnlyBTJZ").attr('disabled', true);

		} else {
			$("#subOrderFinishBT").attr('disabled', false);
			$("#subOrderScanQRBT").attr('disabled', false);
			$("#getUsableMaterialBT").attr('disabled', false);
			$("#gainMaterialRecordBT").attr('disabled', false);
			$("#gainPartMaterialRecordBT").attr('disabled', false);
			$("#subOrderFinishOnlyBTJZ").attr('disabled', false);
			$("#subOrderFinishOnlyBTJZ").attr('disabled', false);
		}
	}

	var columnsArray = [];
	columnsArray.push({
		radio: true
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
	columnsArray.push({
		width: 300,
		"title": "状态",
		"field": "processID",
		visible: false
	});
	columnsArray.push({
		"title": "plantID",
		"field": "plantID",
		visible: false
	});
	columnsArray.push({
		"title": "lineID",
		"field": "lineID",
		visible: false
	});
	$.ajax({
		url: window.serviceIP + "/api/order/getordersplittomap?orderID=" + document.PlantToLineSelectForm.workOrderSlct.value.toString(),
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
				$('#materialNameOfOrder').val(models[0].materialName);

				if(document.PlantToLineSelectForm.productionProcessSlct.value.toString() == window.windowProcessEnum.JZ && window.windowRoleID.CZG == localStorage.roleID) {
					$('#table').bootstrapTable('destroy');
					if(document.PlantToLineSelectForm.industrialPlantSlct.value.toString() != "1003") {
						$("#subOrderFinishBT").hide();
						$("#subOrderOutDryingBTJZ").hide();
					}
				} else {
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
						//pagination: true,
						columns: columnsArray,
						onClickRow: function(row) {

							$("#changeOrderProductionNum").val(row["productionnum"]);
							$("#changeOrderProductionNum").attr("readonly", true);
						}
					});
				}
				//				setTimeout(function() {
				//					getUsableMaterialFun();
				//				}, 100);

				if(window.windowRoleID.CZG == localStorage.roleID && window.windowProcessEnum.JS != localStorage.processID) {
					getSelfProductionRecord();
				}

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
		"title": "数量",
		"field": "number"
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
		"title": "物料工单",
		"field": "orderid",
		visible: false
	});
	columnsArray.push({
		"title": "物料工单",
		"field": "inOrderName",
		visible: false
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
				var sum = 0;
				var models = eval("(" + dataRes.data + ")");
				for(i = 0; i < models.length; i++) {
					sum = sum + models[i].number;
				}
				document.getElementById('sumNumber').innerText = '已投料统计： ' + sum;
				$("#materialidLabel").show();
				$('#materialTable').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
					searchAlign: 'left',
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
					searchAlign: 'left',
					//pagination: true,
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
				$("#usableMaterialLabel").show();
				$('#usableMaterialTable').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#usableMaterialTableToolbar',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 15,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					search: true,
					searchAlign: 'left',
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

	if(!selectRow[0]["number"]) {
		alert("请先扫描物料二维码");
		$("#gainMaterialRecordBT").attr("disabled", false);
		return;
	}

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
	//formData.append("outputter", localStorage.username) //localStorage.username;

	if(document.PlantToLineSelectForm.workingkLocationSlct.value.toString().length < 2) {
		formData.append("outputter", localStorage.username + "###" + localStorage.userID + "###-1");
	} else {
		formData.append("outputter", localStorage.username + "###" + localStorage.userID + "###" +
			document.PlantToLineSelectForm.workingkLocationSlct.value.toString());
	}
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
				//getUsableMaterialFun();
				SelectMaterialRecord();
				$('#usableMaterialTable').bootstrapTable('destroy');
				// alert("投料成功！");
				$('<div>').appendTo('body').addClass('alert alert-success').html('投料成功').show().delay(1500).fadeOut();
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
		finishSubOrderByQR(qrCode, "1");
	else if('grantMaterial' == webName)
		grantMaterialByQR(qrCode);
	else if('dryingKilnjzPushIn' == webName)
		pushInDryingKilnjzsuborder(qrCode);
	else if('dryingKilnjzPushOut' == webName)
		confirmPushOut(qrCode);
	//		pushOutDryingKilnjzsuborder(qrCode);
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
	formData.append("outputter", localStorage.username) //localStorage.username;
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
				//getUsableMaterialFun();
				SelectMaterialRecord();
				// alert("领取成功！");
				$('<div>').appendTo('body').addClass('alert alert-success').html('领取成功').show().delay(1500).fadeOut();
			} else {
				alert("领取失败！" + dataRes.message);
			}
		}
	});
}

function getMaterialRecordBySuborderID(recordID) {
	$("#myModal").modal('hide');
	//console.log("gainMaterialByQR" + recordID);
	if("selectByText" == recordID) {
		recordID = $("#selectByText").val();
	}
	if(recordID.length < 2 || document.PlantToLineSelectForm.workOrderSlct.value.toString().length < 2) {
		alert("请确认已选择物料和订单!")
		return;
	}

	var formData = new FormData();
	formData.append("expendOrderID", document.PlantToLineSelectForm.workOrderSlct.value.toString());

	formData.append("qrCode", recordID);

	var columnsArray = [];
	columnsArray.push({
		checkbox: true,
		formatter: function(value, row, index) {

			if(index == 0) {

				return {
					checked: true //设置选中
				};
			}
		}
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
		"title": "数量",
		"field": "number"
	});
	columnsArray.push({
		"title": "物料工单",
		"field": "orderid",
		visible: false
	});
	columnsArray.push({
		"title": "物料工单",
		"field": "inOrderName",
		visible: false
	});
	columnsArray.push({
		"title": "物料子工单",
		"field": "inSubOrderName"
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
		"title": "物料子工单",
		"field": "suborderid",
		visible: false
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
					toolbar: '#usableMaterialTableToolbar',
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
					searchAlign: 'left',
					pagination: true,
					columns: columnsArray
				});
				if($('#autoGainMaterialCheck').is(':checked')) {
					gainMaterialRecord();
				}

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function gainPartMaterialRecord() {
	var formData = new FormData();
	var selectRow = $("#usableMaterialTable").bootstrapTable('getSelections');
	if(selectRow.length != 1) {
		alert("请选择一行有效投料数据,当前选择行数为" + selectRow.length);
		return;
	}
	if(!selectRow[0]["number"]) {
		alert("请先扫描物料二维码");
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
	formData.append("outputter", localStorage.username) //localStorage.username;
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
				//getUsableMaterialFun();
				SelectMaterialRecord();
				$('#usableMaterialTable').bootstrapTable('destroy')
				$('#changeGainProductionModal').modal('hide');
				// alert("投料成功！");
				$('<div>').appendTo('body').addClass('alert alert-success').html('投料成功').show().delay(1500).fadeOut();
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

function cancelFinishSuborder() {

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

function selectBySubOrderName() {
	if($("#subOrderName").val().trim().length < 2) {
		alert("请确认输入条码名称!");
		return;
	}
	finishSubOrderByQR($("#subOrderName").val().trim(), "2");
}

////////以下是H5+调用摄像头进行扫一扫
// alert(openBarcode())
var img = null;
var blist = [];

function scaned(t, r, f) {
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

function selected(id) {
	var h = blist[id];
	update(h.type, h.result, h.file);
	if(h.result.indexOf('http://') == 0 || h.result.indexOf('https://') == 0) {
		plus.nativeUI.confirm(h.result, function(i) {
			if(i.index == 0) {
				plus.runtime.openURL(h.result);
			}
		}, '', ['打开', '取消']);
	} else {
		plus.nativeUI.alert(h.result);
	}
}

function update(t, r, f) {
	outSet('扫描成功：');
	outLine(t);
	outLine(r);
	outLine('\n图片地址：' + f);
	if(!f || f == 'null') {
		img.src = '../../vendor/H5+/img/barcode.png';
	} else {
		plus.io.resolveLocalFileSystemURL(f, function(entry) {
			img.src = entry.toLocalURL();
		});
		//img.src = 'http://localhost:13131/'+f;
	}
}

function onempty() {
	if(window.plus) {
		plus.nativeUI.alert('无扫描记录');
	} else {
		alert('无扫描记录');
	}
}

function cleanHistroy() {
	if(blist.length > 0) {
		var hl = document.getElementById('history');
		hl.innerHTML = '<li id="nohistory" class="ditem" onclick="onempty();">无历史记录	</li>';
	}
	plus.io.resolveLocalFileSystemURL('_doc/barcode/', function(entry) {
		entry.removeRecursively(function() {
			// Success
		}, function(e) {
			//alert( "failed"+e.message );
		});
	});
}
// 打开二维码扫描界面 
function openBarcode() {
	createWithoutTitle('barcode_scan.html', {
		titleNView: {
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
function openBarcodeCustom() {
	createWithoutTitle('barcode_custom.html', {
		titleNView: {
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

function cancelInputSuborder() {

	var row = $.map($('#materialTable').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	if(row.length < 1) {

		row = $.map($('#usableMaterialTable').bootstrapTable('getSelections'), function(row) {
			return row;
		});
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
	}
	if(row.length > 1) {
		alert("一次只能选择一个批次!您当前选择" + row.length + "个批次!");
		return;
	}
	//	if(row[0]["status"] < 4) {
	//		alert("该工单不是已完成状态!");
	//		return;
	//	}

	$.ajax({
		url: window.serviceIP + "/api/order/cancelinputsuborder?subOrdderID=" + row[0]['id'],
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
				SelectMaterialRecord()
				//getUsableMaterialFun()

			} else {
				alert("取消失败！" + data.message);
			}
		}
	});
}
//添加单独浇铸入窑判断,如果不是浇铸工序则不会调用此方法
function pushInDryingKilnjzsuborder(qrCode) {
	//使用getSelections即可获得，row是json格式的数据
	$("#subOrderFinishBT").attr("disabled", true);
	$("#subOrderOvertimeFinishBT").attr("disabled", true);
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var formMap = {};

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

			formMap[key] = $("#changeOrderProductionNum").val();
			continue;
		}

		if(key == "status") {

			formMap[key] = "3";
			continue;
		}

		formMap[key] = row[0][key];
		//$("#workOrderManageForm" + " #" + key).attr("value", row[0][key]);
	}
	//浇铸干燥窑扫码后ID赋值
	//alert(qrCode)
	//		formMap.append('dryingkilnid', qrCode);
	formMap['dryingkilnid'] = qrCode;
	//	formMap['dryingkilnid']='fa3a57559107432599d0252b2bf67fcf';
	formMap['worklocationid'] = $('#workingkLocationSlct').val();
	var checkText = $("#workingkLocationSlct").find("option:selected").text();
	formMap['worklocationname'] = checkText;
	formMap['materialquantity'] = $("#changeOrderProductionNum").val();
	formMap['inputerid'] = localStorage.userID;
	formMap['inputername'] = localStorage.username;
	//console.log(formMap);
	//alert(row[0].productionnum);
	var formMap2 = {};
	if(document.PlantToLineSelectForm.workingkLocationSlct.value.toString().length < 2) {
		formMap2["name"] = localStorage.username + "###" + localStorage.userID + "###-1###" + row[0]["materialName"];
	} else {
		formMap2["name"] = localStorage.username + "###" + localStorage.userID + "###" +
			document.PlantToLineSelectForm.workingkLocationSlct.value.toString() + "###" + row[0]["materialName"];
	}
	//formMap2["name"] = localStorage.username;
	formMap2["jsonStr"] = JSON.stringify(formMap).toString();

	$.ajax({
		url: window.serviceIP + "/api/order/pushInDryingKilnjzsuborder",
		type: "POST",
		//contentType: "application/json",
		dataType: "json",
		//processData: false,
		//contentType: false,
		data: formMap2,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		success: function(data) {
			if(data.status == 1) {
				alert(data.message);
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

function confirmPushOut(qrCode) {
	if(confirm('确定要批量出窑吗') == true) {
		pushOutDryingKilnjzsuborder(qrCode);
	} else {
		return false;
	}
}

//添加单独浇铸出窑判断,如果不是浇铸工序则不会调用此方法
function pushOutDryingKilnjzsuborder(qrCode) {
	//使用getSelections即可获得，row是json格式的数据
	$("#subOrderCancelFinishBT").attr("disabled", true);
	$("#subOrderOvertimeFinishBT").attr("disabled", true);
	var formMap = {};
	//浇铸干燥窑扫码后ID赋值
	//alert(qrCode)
	formMap['dryingkilnid'] = qrCode;
	formMap['outputerid'] = localStorage.userID;
	formMap['outputername'] = localStorage.username;
	var formMap2 = {};
	formMap2["name"] = localStorage.username;
	formMap2["jsonStr"] = JSON.stringify(formMap).toString();
	$.ajax({
		url: window.serviceIP + "/api/order/pushOutDryingKilnjzsuborder",
		type: "POST",
		//contentType: "application/json",
		dataType: "json",
		//processData: false,
		//contentType: false,
		data: formMap2,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		success: function(data) {
			if(data.status == 1) {
				alert(data.message);
				SelectSubOrder()
				$("#changeOrderProductionNum").attr("readonly", true);
			} else {
				alert("保存失败！" + data.message);
			}

			$("#subOrderCancelFinishBT").attr("disabled", false);
			$("#subOrderOvertimeFinishBT").attr("disabled", false);
		},
		error: function(error) {
			$("#subOrderCancelFinishBT").attr("disabled", false);
			$("#subOrderOvertimeFinishBT").attr("disabled", false);
		}
	});
};