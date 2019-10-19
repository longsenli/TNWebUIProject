function queryDailyProductionPlantSlctFun(flag) {
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
						if($(numbers[j]).val().toString().split("###")[0] == localStorage.getItem('plantID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#industrialPlantSlct').selectpicker('hide');

							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#industrialPlantSlct').selectpicker('refresh');
					$('#industrialPlantSlct').selectpicker('render'); 

				}

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
	if(flag = "1") {
		queryDailyProductionProcessSlctFun();
	}
};

function productionStatisBatteryTypeSlctFun(flag) {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterialbyprocess?processID=1008",
		type: "GET",

		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
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

function queryDailyProductionProcessSlctFun() {
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
						if($(numbers[j]).val().toString().split("###")[0] == localStorage.getItem('processID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionProcessSlct').selectpicker('hide');

							$("#productionProcessLabel").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 

				}
				queryDailyProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function queryDailyProductionLineSlctFun() {
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

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');  
				$('#productionLineSlct').selectpicker('hide');   
				// $('#productionLineSlct').selectpicker('mobile');
				queryDailyProductionWorkingLocationSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function queryDailyProductionWorkingLocationSlctFun() {
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

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#workingkLocationSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#workingkLocationSlct').selectpicker('refresh');
				$('#workingkLocationSlct').selectpicker('render');   
				$('#workingkLocationSlct').selectpicker('hide');   
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getDailyProduction() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	if(' byLine byMaterial byWorkingLocation byStaff byClassType byStaffAndMaterial'.indexOf(document.PlantToLineSelectForm.queryType.value) > -1) {

		if(document.PlantToLineSelectForm.queryType.value.toString() == 'byStaff' ||
			document.PlantToLineSelectForm.queryType.value.toString() == 'byStaffAndMaterial') {
			columnsArray.push({
				width: 300,
				"title": "员工",
				"field": "inputer"
			});
		}
		if(document.PlantToLineSelectForm.queryType.value.toString() == 'byLine') {
			columnsArray.push({
				width: 300,
				"title": "产线",
				"field": "inputLineID",
				formatter: function(value, row, index) {
					return $("#productionLineSlct option[value='" + row.inputLineID + "']").text();
				}
			});
		}
		if(document.PlantToLineSelectForm.queryType.value.toString() == 'byMaterial' ||
			document.PlantToLineSelectForm.queryType.value.toString() == 'byStaffAndMaterial') {
			columnsArray.push({
				width: 300,
				"title": "物料",
				"field": "materialNameInfo"
			});
		}
		if(document.PlantToLineSelectForm.queryType.value.toString() == 'byWorkingLocation') {
			columnsArray.push({
				width: 300,
				"title": "工位",
				"field": "inputWorkLocationID",
				formatter: function(value, row, index) {
					return $("#workingkLocationSlct option[value='" + row.inputWorkLocationID + "']").text();
				}
			});
		}

		columnsArray.push({
			width: 300,
			"title": "班次",
			"field": "orderHour"
		});

		columnsArray.push({
			width: 300,
			"title": "日期",
			"field": "orderDay"
		});
		columnsArray.push({
			width: 300,
			"title": "总产量",
			"field": "sumProduction"
		});
	}
	if(document.PlantToLineSelectForm.queryType.value.toString() == 'byWage') {
		columnsArray.push({
			width: 300,
			"title": "日期",
			"field": "closingDate"
		});
		columnsArray.push({
			width: 300,
			"title": "员工",
			"field": "staffName"
		});
		columnsArray.push({
			width: 300,
			"title": "工资",
			"field": "wage"
		});
		columnsArray.push({
			width: 300,
			"title": "物料型号",
			"field": "materialName"
		});
		columnsArray.push({
			width: 300,
			"title": "产量",
			"field": "productionNumber"
		});
		columnsArray.push({
			width: 300,
			"title": "单价",
			"field": "unitPrice"
		});

	}
	if(document.PlantToLineSelectForm.queryType.value.toString() == 'byOrderDetail') {
		columnsArray.push({
			width: 300,
			"title": "日期",
			"field": "orderDay"
		});
		columnsArray.push({
			width: 300,
			"title": "班次",
			"field": "orderHour"
		});
		columnsArray.push({
			width: 300,
			"title": "工单号",
			"field": "subOrderID"
		});
		columnsArray.push({
			width: 300,
			"title": "物料型号",
			"field": "materialNameInfo"
		});
		columnsArray.push({
			width: 300,
			"title": "产量",
			"field": "number"
		});
		columnsArray.push({
			width: 300,
			"title": "完成人员",
			"field": "inputer"
		});
		columnsArray.push({
			width: 300,
			"title": "完成时间",
			"field": "inputTime",
			formatter: function(value, row, index) {
				//console.log(value);
				if(value) {
					return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
				}

			}
		});
	}

	if(document.PlantToLineSelectForm.queryType.value.toString() == 'byLineMaterial') {
		columnsArray.push({
			width: 300,
			"title": "产线",
			"field": "inputLineID",
			formatter: function(value, row, index) {
				return $("#productionLineSlct option[value='" + row.inputLineID + "']").text();
			}
		});

		columnsArray.push({
			width: 300,
			"title": "物料型号",
			"field": "materialNameInfo"
		});

		columnsArray.push({
			width: 300,
			"title": "班次",
			"field": "orderHour"
		});

		columnsArray.push({
			width: 300,
			"title": "日期",
			"field": "orderDay"
		});
		columnsArray.push({
			width: 300,
			"title": "总产量",
			"field": "sumProduction"
		});
	}

	if(document.PlantToLineSelectForm.queryType.value.toString() == 'byLineExpend') {
		columnsArray.push({
			width: 300,
			"title": "产线",
			"field": "outputLineID",
			formatter: function(value, row, index) {
				return $("#productionLineSlct option[value='" + row.outputLineID + "']").text();
			}
		});

		columnsArray.push({
			width: 300,
			"title": "物料型号",
			"field": "materialNameInfo"
		});

		columnsArray.push({
			width: 300,
			"title": "班次",
			"field": "banci"
		});

		columnsArray.push({
			width: 300,
			"title": "日期",
			"field": "dayTime"
		});
		columnsArray.push({
			width: 300,
			"title": "投料数量",
			"field": "number"
		});
	}

	if(document.PlantToLineSelectForm.queryType.value.toString() == 'byStaffExpend') {
		columnsArray.push({
			width: 300,
			"title": "人员",
			"field": "outputer"
		});

		columnsArray.push({
			width: 300,
			"title": "物料型号",
			"field": "materialNameInfo"
		});

		columnsArray.push({
			width: 300,
			"title": "班次",
			"field": "banci"
		});

		columnsArray.push({
			width: 300,
			"title": "日期",
			"field": "dayTime"
		});
		columnsArray.push({
			width: 300,
			"title": "投料数量",
			"field": "number"
		});
	}

	//console.log(document.PlantToLineSelectForm.queryType.value.toString().indexOf('And') );

	var urlStr = window.serviceIP + "/api/dashboard/getdailyproduction?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&queryTypeID=" + document.PlantToLineSelectForm.queryType.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 02:00:00" + "&endTime=" + document.getElementById("endTime").value + " 23:00:00";

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
	var time = new Date(document.getElementById("endTime").value);
	time.setDate(time.getDate() + 1);

	var urlStr = window.serviceIP + "/api/material/getShelfProductionRecord?staffID=" + localStorage.userID +
		"&startTime=" + document.getElementById("startTime").value + " 07:00:00" + "&endTime=" + time.format("yyyy-MM-dd") + " 07:00:00";

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

function getOrderInfoDetail(workOrder) {

	//console.log("gainMaterialByQR" + recordID);
	var recordID = $('#subOrderName').val().trim();
	
	if(workOrder)
	{
		recordID = workOrder;
	}
	if(recordID.length < 2) {
		alert("请输入工单号!")
		return;
	}

	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "工单号",
		"field": "subOrderID"
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialNameInfo"
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
		"field": "inputTime",
		formatter: function(value, row, index) {
			console.log(value);
			if(value) {
				return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			}

		}
	});
	columnsArray.push({
		"title": "发料人员",
		"field": "grantOperator"
	});
	columnsArray.push({
		"title": "发料时间",
		"field": "grantTime",
		formatter: function(value, row, index) {
			if(value) {
				return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			}
		}
	});

	columnsArray.push({
		"title": "投料人员",
		"field": "outputer"
	});
	columnsArray.push({
		"title": "投料时间",
		"field": "outputTime",
		formatter: function(value, row, index) {
			if(value) {
				return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			}
		}
	});
	columnsArray.push({
		"title": "投入工单",
		"field": "expendOrderID"
	});

	$.ajax({
		url: window.serviceIP + "/api/material/getmaterialrecorddetailbysuborderid?subOrderID=" + recordID,
		type: "GET",
		processData: true,
		contentType: "application/json",
		dataType: "json",
		//data: formData,
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");

				if(models.length < 1) {
					alert("未获取到物料信息,请核对!" + recordID);
					return;
				}
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#usableMaterialTableToolbar',
					toolbarAlign: "left",
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
					search: false,
					searchAlign: 'left',
					pagination: true,
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

//浇铸目前在窑中数据
function nowInDryingKilnjz() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "硬化窑名称",
		"field": "dryingKilnName"
	});
	columnsArray.push({
		"title": "工单批次号",
		"field": "suborderID"
	});
	columnsArray.push({
		"title": "厂区",
		"field": "plantname"
	});
	columnsArray.push({
		"title": "产线",
		"field": "linename"
	});
	columnsArray.push({
		"title": "工位",
		"field": "workLocationName"
	});
	columnsArray.push({
		"title": "入窑人",
		"field": "inputerName"
	});
	columnsArray.push({
		"title": "入窑时间",
		"field": "inputTime"
	});
	columnsArray.push({
		"title": "物料类型",
		"field": "materialName"
	});
	columnsArray.push({
		"title": "物料数量",
		"field": "materialQuantity"
	});
	var urlStr = window.serviceIP + "/api/dashboard/nowInDryingKilnjz?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&queryTypeID=" + document.PlantToLineSelectForm.queryType.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 02:00:00" + "&endTime=" + document.getElementById("endTime").value + " 23:00:00";

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
					showToggle: true,
					showRefresh: true,
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
};

var accept_webName = null;
//重写scanQR方法
function scanQR(grantType) {
	//执行H5扫描二维码方法
	openBarcode();
	accept_webName = grantType;
}

////////以下是H5+调用摄像头进行扫一扫
// alert(openBarcode())
var img = null;
var blist = [];

function scaned(t, r, f) {
	// alert('t='+t+'r='+r+'f='+f);
	//获取扫描二维码信息
	recognitionQR(accept_webName, r);
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
	$("#subOrderName").val(qrCode);
	getOrderInfoDetail();
}