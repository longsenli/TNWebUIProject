function chargingRackRecordIndustrialPlantSlctFun() {
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
				if($.cookie('plantID') != null && $.cookie('plantID') != 'undefined' && $.cookie('plantID').toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == $.cookie('plantID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#industrialPlantSlct').selectpicker('hide');
							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#industrialPlantSlct').selectpicker('refresh');
					$('#industrialPlantSlct').selectpicker('render'); 

				}
				chargingRackRecordProductionProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function chargingRackRecordProductionProcessSlctFun() {
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

				var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
				for(var j = 0; j < numbers.length; j++) {
					if($(numbers[j]).val().toString() == window.windowProcessEnum.CD) {
						$(numbers[j]).attr("selected", "selected");
						$('#productionProcessSlct').selectpicker('hide');

						$("#productionProcessLabel").css("display", "none");
					}
				}
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render'); 

				//				if($.cookie('processID') != null && $.cookie('processID') != 'undefined' && $.cookie('processID').toString().length > 0) {
				//					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
				//					for(var j = 0; j < numbers.length; j++) {
				//						if($(numbers[j]).val().toString() == $.cookie('processID')) {
				//							$(numbers[j]).attr("selected", "selected");
				//							$('#productionProcessSlct').selectpicker('hide');
				//
				//							$("#productionProcessLabel").css("display", "none");
				//						}
				//					}
				//					$('#productionProcessSlct').selectpicker('refresh');
				//					$('#productionProcessSlct').selectpicker('render'); 
				//
				//				}

				setTimeout(function() {
					chargingRackRecordProductionLineSlctFun();
				}, 100);
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function chargingRackRecordProductionLineSlctFun() {
	//获取流程IP
	var flag = document.PlantToLineSelectForm.productionProcessSlct.value.toString();
	//判断是否为浇铸流程
	if(flag == '1011') {

		//		$('#chargingRackRecordFinishBT').attr("onclick", "pushInDryingKilnjzchargingRackRecord()");
		$("#chargingRackRecordFinishBT").html('<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>扫码入窑');
		$('#chargingRackRecordFinishBT').attr("onclick", "scanQR('dryingKilnjzPushIn')");
		$('#chargingRackRecordOutDryingBTJZ').show();
		$('#chargingRackRecordCancelFinishBTJZEX').hide();
		$('#chargingRackRecordOvertimeFinishBT').hide();
		$('#chargingRackRecordCancelFinishBT').hide();
		//		alert($('#chargingRackRecordFinishBT').attr("onclick"));
	} else {
		$('#chargingRackRecordOvertimeFinishBT').show();
		$('#chargingRackRecordCancelFinishBT').show();
		$('#chargingRackRecordCancelFinishBTJZEX').hide();
		$('#chargingRackRecordOutDryingBTJZ').hide();
		$("#chargingRackRecordFinishBT").html('<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>完成');
		$('#chargingRackRecordFinishBT').attr("onclick", "FinishchargingRackRecord()");

		//		alert($('#chargingRackRecordFinishBT').attr("onclick"));
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
				if($.cookie('lineID') != null && $.cookie('lineID') != 'undefined' && $.cookie('lineID').toString().length > 0) {
					var numbers = $('#productionLineSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == $.cookie('lineID')) {
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

function chargingRackRecordWorkingLocationSlctFun() {
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
				if($.cookie('workingkLocation') != null && $.cookie('workingkLocation') != 'undefined' && $.cookie('workingkLocation').toString().length > 0) {
					var numbers = $('#workingkLocationSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == $.cookie('workingkLocation')) {
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

function getOnRackRecord() {

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
				// $('#workOrderSlct').selectpicker('mobile');
				setTimeout(function() {
					SelectWorkOrderFun();
				}, 100);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
	chargingRackRecordWorkingLocationSlctFun();
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
		"field": "inchargingRackRecordName"
	});
	columnsArray.push({
		"title": "物料子工单",
		"field": "chargingRackRecordid",
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
				var sum = 0;
				var models = eval("(" + dataRes.data + ")");
				for(i = 0; i < models.length; i++) {
					sum = sum + models[i].number;
				}
				document.getElementById('sumNumber').innerText = '已投料统计： ' + sum;
				$('#materialTable').bootstrapTable('destroy').bootstrapTable({
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
		LODOP.ADD_PRINT_BARCODE(20, 20, 100, 100, "QRCode", selectRow[i].id);

		LODOP.ADD_PRINT_TEXT(120, 5, 160, 50, selectRow[i].id.substr(0, orderLength - 11)); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		LODOP.ADD_PRINT_TEXT(135, 5, 170, 50, selectRow[i].id.substr(orderLength - 11, 11)); //增加纯文本项
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

function closeQRScan() {
	$("#myModal").modal('hide');
}

//添加单独浇铸入窑判断,如果不是浇铸工序则不会调用此方法
function pushInDryingKilnjzByQR(qrCode) {

	//使用getSelections即可获得，row是json格式的数据

	$("#chargingRackRecordFinishBT").attr("disabled", true);
	$("#chargingRackRecordOvertimeFinishBT").attr("disabled", true);
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	var formData = new FormData();
	if(row.length < 1) {
		alert("请选择行数据!");
		$("#chargingRackRecordFinishBT").attr("disabled", false);
		$("#chargingRackRecordOvertimeFinishBT").attr("disabled", false);
		return;
	}
	if(row.length > 1) {
		alert("一次只能完成一个批次!您当前选择" + row.length + "个批次!");
		$("#chargingRackRecordFinishBT").attr("disabled", false);
		$("#chargingRackRecordOvertimeFinishBT").attr("disabled", false);
		return;
	}
	if(row[0]["status"] > 3) {
		alert("该工单已完成!");
		$("#chargingRackRecordFinishBT").attr("disabled", false);
		$("#chargingRackRecordOvertimeFinishBT").attr("disabled", false);
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
	//浇铸干燥窑扫码后ID赋值
	formData.append('dryingkilnid', qrCode);
	//formData.append('dryingkilnid', 'fa3a57559107432599d0252b2bf67fcf');
	formData.append('worklocationid', $('#workingkLocationSlct').val());
	var checkText = $("#workingkLocationSlct").find("option:selected").text();
	formData.append('worklocationname', checkText);
	formData.append('inputerid', $.cookie('userid'));
	formData.append('inputername', $.cookie('username'));
	//	alert(row[0].productionnum)
	formData.append('materialquantity', $("#changeOrderProductionNum").val());

	var formData2 = new FormData();
	if(document.PlantToLineSelectForm.workingkLocationSlct.value.toString().length < 2) {
		formData2.append("name", $.cookie('username') + "###" + $.cookie('userID') + "###-1###" + row[0]["materialName"]);
	} else {
		formData2.append("name", $.cookie('username') + "###" + $.cookie('userID') + "###" +
			document.PlantToLineSelectForm.workingkLocationSlct.value.toString() + "###" + row[0]["materialName"]);
	}
	formData2.append("jsonStr", window.getFormDataToJson(formData))
	$.ajax({
		url: window.serviceIP + "/api/order/pushInDryingKilnjzchargingRackRecord",
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
				SelectchargingRackRecord();
				$("#changeOrderProductionNum").attr("readonly", true);
			} else {
				alert("保存失败！" + data.message);
			}

			$("#chargingRackRecordFinishBT").attr("disabled", false);
			$("#chargingRackRecordOvertimeFinishBT").attr("disabled", false);
		}
	});
};

function confirmPushOut(qrCode) {
	if(confirm('确定要批量出窑吗') == true) {
		pushOutDryingKilnjzchargingRackRecord(qrCode);
	} else {
		return false;
	}
}