function tidyBatteryRecordIndustrialPlantSlctFun() {
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
				tidyBatteryRecordProductionProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function tidyBatteryRecordProductionProcessSlctFun() {
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
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				// $('#productionProcessSlct').selectpicker('mobile');

				var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
				for(var j = 0; j < numbers.length; j++) {
					if($(numbers[j]).val().toString() == window.windowProcessEnum.ZL) {
						$(numbers[j]).attr("selected", "selected");
						$('#productionProcessSlct').selectpicker('hide');

						$("#productionProcessLabel").css("display", "none");
					}
				}
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render'); 

				$('#materialtype').selectpicker('hide');

				//				if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
				//					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
				//					for(var j = 0; j < numbers.length; j++) {
				//						if($(numbers[j]).val().toString() == localStorage.getItem('processID')) {
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
					tidyBatteryRecordProductionLineSlctFun();
				}, 100);
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function tidyBatteryRecordProductionLineSlctFun() {

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
			$("#lineid").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
					$('#lineid').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   
				// $('#productionLineSlct').selectpicker('mobile');
				if(localStorage.getItem('lineID') != null && localStorage.getItem('lineID') != 'undefined' && localStorage.getItem('lineID').toString().length > 0) {
					var numbers = $('#productionLineSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('lineID')) {
							$(numbers[j]).attr("selected", "selected");
//							$('#productionLineSlct').selectpicker('hide');
//
//							$("#productionLineLabel").css("display", "none");
						}
					}
					$('#productionLineSlct').selectpicker('refresh');
					$('#productionLineSlct').selectpicker('render'); 

				}
				//
				//				setTimeout(function() {
				//
				//					tidyBatteryRecordWorkingLocationSlctFun();
				//				}, 100);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function tidyBatteryRecordWorkingLocationSlctFun() {
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
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			$("#workingkLocationSlct").find('option').remove();
			$("#worklocation").find('option').remove();

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
					$('#worklocation').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#workingkLocationSlct').selectpicker('refresh');
				$('#workingkLocationSlct').selectpicker('render');   
				// $('#workingkLocationSlct').selectpicker('mobile');
				if(localStorage.getItem('workingkLocation') != null && localStorage.getItem('workingkLocation') != 'undefined' && localStorage.getItem('workingkLocation').toString().length > 0) {
					var numbers = $('#workingkLocationSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('workingkLocation')) {
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

function getTidyRecord(selectType) {

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
		"title": "物料名称",
		"field": "materialname"
	});
	columnsArray.push({
		"title": "物料类型",
		"field": "materialtype",
		formatter: function(value, row, index) {
			return $("#materialtype option[value='" + row.materialtype + "']").text();
		}
	});
	columnsArray.push({
		"title": "materialid",
		"field": "materialid",
		visible: false
	});

	columnsArray.push({
		"title": "剩余数量",
		"field": "currentnum"
	});
	columnsArray.push({
		"title": "下架数量",
		"field": "pulloffnum"
	});
	columnsArray.push({
		"title": "下架日期",
		"field": "daytime",
		formatter: function(value, row, index) {
			if(value) {
				return value.toString().split(" ")[0];
			}
		}
	});

	columnsArray.push({
		"title": "维修送返",
		"field": "repairbacknum"
	});

	columnsArray.push({
		"title": "包装数量",
		"field": "packnum"
	});
	columnsArray.push({
		"title": "返充数量",
		"field": "backtochargenum"
	});
	columnsArray.push({
		"title": "打堆数量",
		"field": "pilenum"
	});
	columnsArray.push({
		"title": "报修数量",
		"field": "repairnumber"
	});
	columnsArray.push({
		"title": "报修详情",
		"field": "repaircombine"
	});

	//	columnsArray.push({
	//		"title": "备注",
	//		"field": "remark"
	//	});

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");
	formData.append("selectType", selectType);

	$.ajax({
		url: window.serviceIP + "/api/chargepack/gettidybatteryrecord",
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

function tidyBatteryRecordRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}

function getPileRecord(selectType) {
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
		"title": "物料名称",
		"field": "materialname"
	});
	columnsArray.push({
		"title": "物料类型",
		"field": "materialtype",
		formatter: function(value, row, index) {
			return $("#materialtype option[value='" + row.materialtype + "']").text();
		}
	});
	columnsArray.push({
		"title": "materialid",
		"field": "materialid",
		visible: false
	});

	columnsArray.push({
		"title": "数量",
		"field": "productionnumber"
	});

	columnsArray.push({
		"title": "下架日期",
		"field": "batterydate",
		formatter: function(value, row, index) {
			if(value) {
				return value.toString().split(" ")[0];
			}
		}
	});

	columnsArray.push({
		"title": "打堆时间",
		"field": "piletime"
	});
	columnsArray.push({
		"title": "存放位置",
		"field": "location"
	});
	columnsArray.push({
		"title": "状态",
		"field": "status",
		formatter: function(value, row, index) {
			if(value == '1') {
				return '在库中';
			}
			if(value == '2') {
				return '已使用';
			}
			return '状态不明';
		}
	});
	columnsArray.push({
		"title": "备注",
		"field": "remark"
	});

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");
	formData.append("selectType", selectType);

	$.ajax({
		url: window.serviceIP + "/api/chargepack/getpiletidybatteryrecord",
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
}

function printPileQR() {
	//createQRCode();
	//	var img = document.getElementById("QRImage"); /// get image element
	//	var canvas = document.getElementsByTagName("canvas")[0]; /// get canvas element
	//	img.src = canvas.toDataURL("image/png"); /// update image

	var selectRow = $("#table").bootstrapTable('getSelections');
	if(!selectRow[0].piletime) {
		return;
	}
	//var arrayObj = new Array();
	for(var i = 0; i < selectRow.length; i++) {
		//console.log("dayin");

		var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
		LODOP.PRINT_INIT("打印任务名"); //首先一个初始化语句
		//LODOP.ADD_PRINT_BARCODE(0,0,200,100,"Code39","*123ABC4567890*");
		LODOP.ADD_PRINT_BARCODE(20, 20, 100, 100, "QRCode", selectRow[i].id);

		LODOP.ADD_PRINT_TEXT(120, 5, 150, 50, selectRow[i].id); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		LODOP.ADD_PRINT_TEXT(10, 160, 130, 20, "日期: ");
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);
		LODOP.ADD_PRINT_TEXT(30, 160, 130, 40, selectRow[i].batterydate); //增加纯文本项

		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		LODOP.ADD_PRINT_TEXT(55, 160, 130, 100, selectRow[i].remark); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		LODOP.ADD_PRINT_TEXT(80, 160, 130, 100, selectRow[i].materialname + " * " + selectRow[i].productionnumber); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		//LODOP.ADD_PRINT_HTM(5, 5, 200, 200, document.getElementById("QRImage")) //增加超文本项
		//LODOP.PREVIEW();
		LODOP.PRINT(); //最后一个打印(或预览、维护、设计)语句
	}
}

function addTidyBatteryRepairRecord() {
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}

	if(row[0].currentNum < 1) {
		alert("该批次电池已消耗完!");
		return;
	}
	if(!row[0].currentnum) {
		return;
	}
	//console.log(row[0]);
	$("#tidyBatteryRecordRepairForm" + " #id").val(row[0].id);
	$("#tidyBatteryRecordRepairForm" + " #currentnum").val(row[0].currentnum);
	$("#tidyBatteryRecordRepairForm" + " #repairnumber").val(row[0].repairnumber);
	$("#tidyBatteryRecordRepairForm" + " #repaircombine").val(row[0].repaircombine);
	$("#tidyBatteryRecordRepairForm" + " #remark").val(row[0].remark);
	//	if(row[0].repaircombine) {
	//		if(row[0].repaircombine.length > 50) {
	//			$("#tidyBatteryRecordRepairForm" + " #repaircombine").height((row[0].remark.length % 50) * 20);
	//		}
	//	}

	$("#tidyBatteryRecordRepairForm" + " #repairid").val(localStorage.userID);
	$("#tidyBatteryRecordRepairForm" + " #repairname").val(localStorage.username);
	var today = new Date();
	$("#tidyBatteryRecordRepairForm" + " #repairtime").val(today.format("yyyy-MM-dd hh:mm"));

	$("#myRepairModal").modal('show');
}

function changeTidyBatteryRecord() {

	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}

	if(row[0].currentNum < 1) {
		alert("该批次电池已消耗完!");
		return;
	}
	if(!row[0].currentnum) {
		return;
	}
	//console.log(row[0]);
	$("#tidyBatteryRecordChangeForm" + " #id").val(row[0].id + " ### " + row[0].repairbacknum + " ### " + row[0].packnum + " ### " + row[0].backtochargenum);
	$("#tidyBatteryRecordChangeForm" + " #currentnum").val(row[0].currentnum);
	$("#tidyBatteryRecordChangeForm" + " #repairbacknum").val(0);
	$("#tidyBatteryRecordChangeForm" + " #packnum").val(0);
	$("#tidyBatteryRecordChangeForm" + " #backtochargenum").val(0);

	$("#tidyBatteryRecordChangeForm" + " #remark").val(row[0].remark);
	//	if(row[0].remark) {
	//		if(row[0].remark.length > 50) {
	//			$("#tidyBatteryRecordChangeForm" + " #remark").height((row[0].remark.length % 50) * 20);
	//		}
	//	}

	$("#tidyBatteryRecordChangeForm" + " #operatorid").val(localStorage.userID);
	$("#tidyBatteryRecordChangeForm" + " #operatorname").val(localStorage.username);
	var today = new Date();
	$("#tidyBatteryRecordChangeForm" + " #operatortime").val(today.format("yyyy-MM-dd hh:mm"));

	$("#myChangeModal").modal('show');
}

function pileBatterySetCount() {
	var PileNum = parseInt($("#tidyBatteryPileForm" + " #PileNum").val());
	var perPileMaterialNum = parseInt($("#tidyBatteryPileForm" + " #perPileMaterialNum").val());
	$("#tidyBatteryPileForm" + " #totalMaterialNum").val(PileNum * perPileMaterialNum);
}

function addPileRecord() {
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}

	if(row[0].currentNum < 1) {
		alert("该批次电池已消耗完!");
		return;
	}
	if(!row[0].currentnum) {
		return;
	}
	//console.log(row[0]);
	$("#tidyBatteryPileForm" + " #id").val(row[0].id);
	$("#tidyBatteryPileForm" + " #currentnum").val(row[0].currentnum);

	//$("#tidyBatteryPileForm" + " #remark").val(row[0].remark);
	//	if(row[0].remark) {
	//		if(row[0].remark.length > 50) {
	//			$("#tidyBatteryRecordChangeForm" + " #remark").height((row[0].remark.length % 50) * 20);
	//		}
	//	}

	$("#tidyBatteryPileForm" + " #operatorid").val(localStorage.userID);
	$("#tidyBatteryPileForm" + " #operatorname").val(localStorage.username);
	var today = new Date();
	$("#tidyBatteryPileForm" + " #operatortime").val(today.format("yyyy-MM-dd hh:mm"));

	$("#myPileModal").modal('show');
}

function closeTidyBatteryRecordModel(modelID) {
	$("#" + modelID).modal('hide');
}

function saveTidyBatteryRecordModel(modelID, formID) {
	disableChangeButton(modelID + "SaveButton", true);
	var formMap = window.formToObject($("#" + formID));
	if(formID == "tidyBatteryRecordChangeForm") {

		var realnumber = parseInt(formMap["currentnum"]);
		var repairbacknum = parseInt(formMap["repairbacknum"]);
		var packnum = parseInt(formMap["packnum"]);
		var backtochargenum = parseInt(formMap["backtochargenum"]);

		if(realnumber - packnum - backtochargenum < 0) {
			alert("包装和返充电池数量大于当前剩余数量!");
			disableChangeButton(modelID + "SaveButton", false);
			return;
		}
		formMap["currentnum"] = realnumber + repairbacknum - packnum - backtochargenum;
		formMap["repairbacknum"] = repairbacknum + parseInt(formMap["id"].split("###")[1].trim());
		formMap["packnum"] = packnum + parseInt(formMap["id"].split("###")[2].trim());
		formMap["backtochargenum"] = backtochargenum + parseInt(formMap["id"].split("###")[3].trim());
		formMap["id"] = formMap["id"].split("###")[0].trim();
	}

	if(formID == 'tidyBatteryRecordRepairForm') {
		formMap["repaircombine"] = formMap["repairtime"] + " " + formMap["repairname"] + " " + formMap["newrepairnumber"] +
			" " + formMap["reason"] + "\r\n ----- " + formMap["repaircombine"];

		var realLast = parseInt(formMap["currentnum"])
		var realRepairLast = parseInt(formMap["repairnumber"])
		var realRepairNow = parseInt(formMap["newrepairnumber"])
		formMap["currentnum"] = realLast - realRepairNow;
		formMap["repairnumber"] = realRepairLast + realRepairNow;
		if(realLast < realRepairNow) {
			alert("报修数量必须小于等于在架数量!");
			disableChangeButton(modelID + "SaveButton", false);
			return;
		}

		delete formMap["newrepairnumber"];

	}
	$.ajax({
		url: window.serviceIP + "/api/chargepack/changetidybatteryrecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				getTidyRecord('onWorkbench');
				alert('保存成功!');
				$("#" + modelID).modal('hide');

			} else {
				alert("保存失败！" + data.message);
			}
			disableChangeButton(modelID + "SaveButton", false);
		}
	});
}

function pileTidyBatteryRecord() {

	disableChangeButton("myPileModalSaveButton", true);
	var formMap = window.formToObject($("#tidyBatteryPileForm"));

	var realLast = parseInt(formMap["currentnum"])
	var totalMaterialNum = parseInt(formMap["totalMaterialNum"])
	formMap["currentnum"] = realLast - totalMaterialNum;

	if(realLast < totalMaterialNum) {
		alert("打堆数量必须小于等于剩余数量!");
		disableChangeButton("myPileModalSaveButton", false);
		return;
	}
	var PileNum = formMap["PileNum"];
	var perPileMaterialNum = formMap["perPileMaterialNum"];

	var formData = new FormData();
	formData.append("pileNum", PileNum);
	formData.append("perPileMaterialNum", perPileMaterialNum);
	formData.append("storeLocation", formMap["storeLocation"]);

	delete formMap["totalMaterialNum"];
	delete formMap["perPileMaterialNum"];
	delete formMap["PileNum"];
	delete formMap["storeLocation"];

	formData.append("jsonTidyRecord", JSON.stringify(formMap).toString());

	$.ajax({
		url: window.serviceIP + "/api/chargepack/addpiletidybatteryrecord",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				getTidyRecord('onWorkbench');
				alert('保存成功!');
				$("#myPileModal").modal('hide');

			} else {
				alert("保存失败！" + data.message);
			}
			disableChangeButton("myPileModalSaveButton", false);
		}
	});
}

function disableChangeButton(buttonID, status) {
	$("#" + buttonID).attr('disabled', status);
}

var accept_webName = null;
//重写scanQR方法
function scanQR(webName) {
	//执行H5扫描二维码方法
	openBarcode();
	accept_webName = webName;
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

function recognitionQR(webName, qrCode) {
	if(webName == 'package')
		showPackageInput(qrCode);
}

function showPackageInput(pileID) {
	$.ajax({
		url: window.serviceIP + "/api/chargepack/getpilerecordbypileid?id=" + pileID,
		type: "GET",
		contentType: "application/json",
		dataType: "json",

		//data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				var models = eval("(" + data.data + ")");
				if(models[0].status == '2') {
					alert("该二维码已经包装,请确认!");
					return;
				}
				$("#tidyBatteryPilePackageForm" + " #id").val(pileID);
				$("#tidyBatteryPilePackageForm" + " #totalNum").val(models[0].productionnumber);
				$("#tidyBatteryPilePackageForm" + " #packageNum").val(models[0].productionnumber);
				$("#myPackageModalSaveButton").attr('disabled', false);
				$("#myPackageModal").modal('show');

			} else {
				alert("获取二维码信息错误！" + data.message + " 二维码: " + pileID);
			}
			//disableChangeButton(modelID + "SaveButton", false);
		}
	});
}

function savePackageInput() {
	$("#myPackageModalSaveButton").attr('disabled', true);
	var formData = new FormData($("#tidyBatteryPilePackageForm")[0]);
	if(parseInt(formData['totalNum']) - parseInt(formData['packageNum']) < 0) {
		$("#myPackageModalSaveButton").attr('disabled', false);
		alert("包装数量应小于等于总数量!");
		return;
	}

	$.ajax({
		url: window.serviceIP + "/api/chargepack/expendpilebatterybypackage",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				$("#myPackageModalSaveButton").attr('disabled', false);
				$("#myPackageModal").modal('hide');
				alert("扫码成功!");
			} else {
				alert("获取二维码信息错误！" + data.message + " 二维码: " + pileID);
			}
			//disableChangeButton(modelID + "SaveButton", false);
		}
	});
}