function grantMaterialPlantSlctFun(flag) {
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
			$("#acceptIndustrialPlantSlct").find('option').remove();
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
					$('#acceptIndustrialPlantSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');  

				$('#acceptIndustrialPlantSlct').selectpicker('refresh');
				$('#acceptIndustrialPlantSlct').selectpicker('render');   
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
					$("#acceptIndustrialPlantSlct ").val($("#industrialPlantSlct ").val());
					$('#acceptIndustrialPlantSlct').selectpicker('refresh');
					$('#acceptIndustrialPlantSlct').selectpicker('render'); 
				}

				if(flag = "1") {
					//	productionStatisBatteryTypeSlctFun();
					grantMaterialProcessSlctFun();
				} else
					grantMaterialLineSlctFun();
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

function grantMaterialProcessSlctFun() {
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
							//$('#productionProcessSlct').selectpicker('hide');

							//$("#productionProcessLabel").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 

				}

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function closeQRScangrantMaterial() {
	$("#myModal").modal('hide');
}

function findGrantMaterialByQR(recordID, grantType) {

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
		//			Token: localStorage.getItem('token')
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

	if(grantType == '1') {
		warningInfo += "当日发料确认?";
	} else if(grantType == '2') {
		warningInfo += "预发料确认?";
	}
	if(!window.changeConfirmDlg(warningInfo)) {
		return;
	}

	var formData = new FormData();
	formData.append("operator", localStorage.username);
	formData.append("orderSplitID", recordID);
	// 1 是扫码发料 按照ID号  2是扫码预发料按照ID号, 3是扫码发料 按照工单名称 4 是扫码预发料 按照工单名称
	if(grantType == '1') {
		formData.append("orderType", '1');
	} else if(grantType == '2') {
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
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				grantMaterialDetail();
				// alert("发料成功！");
				$('<div>').appendTo('body').addClass('alert alert-success').html('发料成功').show().delay(1500).fadeOut();
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
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		async: false,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				warningInfo = dataRes.message + ",";
			}
		}
	});

	if($('#grantMaterialScanQRForm #grantMaterialScanQRType').html() == '1') {
		warningInfo += "当日发料确认?";
	} else if($('#grantMaterialScanQRForm #grantMaterialScanQRType').html() == '2') {
		warningInfo += "预发料确认?";
	}
	if(!window.changeConfirmDlg(warningInfo)) {
		return;
	}
	var formData = new FormData(); // 1 是扫码发料 按照ID号  2是扫码预发料按照ID号, 3是扫码发料 按照工单名称 4 是扫码预发料 按照工单名称
	formData.append("operator", localStorage.getItem('username')) //localStorage.getItem('username');
	formData.append("orderSplitID", $('#grantMaterialOrderInputID').val().trim());
	if($('#grantMaterialScanQRForm #grantMaterialScanQRType').html() == '1') {
		formData.append("orderType", '3');
	} else if($('#grantMaterialScanQRForm #grantMaterialScanQRType').html() == '2') {
		formData.append("orderType", '4');
	} else {
		alert("发料类型获取失败,请刷新页面重试!");
		return;
	}
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	$.ajax({
		url: window.serviceIP + "/api/material/addgrantmaterialrecord",
		type: "POST",
		processData: false,
		contentType: false,
		data: formData,
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				grantMaterialDetail();
				$('<div>').appendTo('body').addClass('alert alert-success').html('发料成功').show().delay(1500).fadeOut();

			} else {
				alert("发料失败！" + dataRes.message);
			}
		}
	});

}
var selected = false;

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
		"&startTime=" + document.getElementById("startTime").value + "&endTime=" + document.getElementById("endTime").value;
	selected = false;
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
					strictSearch: true,
					search: true,
					pagination: true,
					onClickRow: function(row, element) {
						if(row.orderName == '总计') {
							//console.log(element);
							//console.log(1);
							if(selected) {
								selected = false;
								$("#table").bootstrapTable('resetSearch', '');
							} else {
								selected = true;
								$("#table").bootstrapTable('resetSearch', row.name);

							}
						}
					},
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

}

var accept_webName = null;
//重写scanQR方法
function scanQR(grantType) {
	//执行H5扫描二维码方法
	openBarcode();
	accept_webName = grantType;
	if(grantType == '5') {
		if($("#table").bootstrapTable('getVisibleColumns').length != 4) {
			innitOrderIDTable();
		}
	}
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
	if(webName == '1' || webName == '2')
		findGrantMaterialByQR(qrCode, webName);
	if(webName == '5')
		addOrderIDToBatchTable(qrCode, "SJ");
}

function innitOrderIDTable(models) {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true,
		formatter: function(value, row, index) {
			return {
				checked: true //设置选中
			};
		}
	});
	columnsArray.push({
		"title": "工单号",
		"field": "orderID"
	});
	columnsArray.push({
		"title": "状态",
		"field": "status"
	});
	columnsArray.push({
		"title": "返回消息",
		"field": "returnMessage"
	});
	if(!models) {
		models = "";
	}
	$('#table').bootstrapTable('destroy').bootstrapTable({
		data: models,
		toolbar: '#toolbar',
		singleSelect: false,
		clickToSelect: true,
		sortName: "orderID12",
		uniqueId: "orderID",
		sortOrder: "asc",
		pageSize: 50,
		pageNumber: 1,
		pageList: "[20, 50, 100, All]",
		//showToggle: true,
		//showRefresh: true,
		//showColumns: true,
		//search: true,
		pagination: true,
		columns: columnsArray
	});
}

function addOrderIDToBatchTable(orderID, type) {

	if($("#table").bootstrapTable('getVisibleColumns').length != 4) {
		innitOrderIDTable();
	}

	var tableData = $("#table").bootstrapTable('getAllSelections');
	if(tableData.length > 0) {
		if(tableData[0].status) {
			if(tableData[0].status.length > 0) {
				innitOrderIDTable();
			}
		}
	}

	if(!orderID) {
		orderID = $("#orderIDByBatch").val();
	}
	var rows = $('#table').bootstrapTable('getRowByUniqueId', orderID); //行的数据

	if(rows) {
		alert("该工单已添加!" + orderID);
		return;
	}
	if(orderID.length < 5) {
		alert("工单错误,请确认!" + orderID);
		return;
	}
	if($("#table").bootstrapTable('getData').length >= 20) {
		alert("一次性最多发料20个!");
		return;
	}
	var _data = {
		"orderID": orderID,
		"status": "",
		"returnMessage": ""
	}
	$('#table').bootstrapTable('prepend', _data);
	//$("#table").bootstrapTable('append', _data); //_data----->新增的数据
	if("SJ" == type) {
		setTimeout(function() {
			scanQR('5');
		}, 2000);
	}
	if($('#autoGrantMaterialCheck').is(':checked')) {
		grantMaterialByBatch(1);
	}

}

function grantMaterialByBatch(grantType) {
	if($("#table").bootstrapTable('getVisibleColumns').length != 4) {
		alert("请先添加工单号再发料!")
		return;
	}
	var tableData = $("#table").bootstrapTable('getAllSelections');
	if(!tableData || tableData.length < 1) {
		alert("请先添加工单号再操作!")
		return;
	}
	if(tableData.length > 30) {
		alert("一次最多选择30个,请确认!,当前选择个数为:" + tableData.length)
		return;
	}
	//var tableData = $("#table").bootstrapTable('getData');
	var orderIDList = "";
	for(var i = 0; i < tableData.length; i++) {
		orderIDList += tableData[i].orderID + "###";
	}
	orderIDList = orderIDList.substring(0, orderIDList.length - 3);

	var formData = new FormData();
	formData.append("orderIDList", orderIDList);
	formData.append("grantType", grantType);
	formData.append("operator", localStorage.username);
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	formData.append("acceptPlantID", $("#acceptIndustrialPlantSlct").val());

	$("#grantMaterialByBatch1").attr("disabled", true);
	$("#grantMaterialByBatch2").attr("disabled", true);
	$("#grantMaterialByBatch3").attr("disabled", true);

	$.ajax({
		url: window.serviceIP + "/api/material/addgrantmaterialrecordbybatch",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(dataRes) {
			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				innitOrderIDTable(models);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
			$("#grantMaterialByBatch1").attr("disabled", false);
			$("#grantMaterialByBatch2").attr("disabled", false);
			$("#grantMaterialByBatch3").attr("disabled", false);
		},
		error: function(jqXHR, exception) {
			$("#grantMaterialByBatch1").attr("disabled", false);
			$("#grantMaterialByBatch2").attr("disabled", false);
			$("#grantMaterialByBatch3").attr("disabled", false);
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

function onTextareaKeyDown() {
	return;
	if(event.keyCode == 13) { //如果按的是enter键 13是enter 
		event.preventDefault(); //禁止默认事件（默认是换行） 
		var orderID = $("#orderIDByBatch").val();
		if($("#table").bootstrapTable('getVisibleColumns').length != 4) {
			innitOrderIDTable();
		}

		if(!orderID) {
			orderID = $("#orderIDByBatch").val();
		}
		var rows = $('#table').bootstrapTable('getRowByUniqueId', orderID); //行的数据

		if(rows) {
			console.log("该工单已添加!" + orderID);
			event.preventDefault(); //禁止默认事件（默认是换行） 
			$("#orderIDByBatch").val("");
			document.getElementById('orderIDByBatch').focus();
			return;
		}
		if(orderID.length < 5) {
			console.log("工单错误,请确认!" + orderID);
			event.preventDefault(); //禁止默认事件（默认是换行） 
			$("#orderIDByBatch").val("");
			document.getElementById('orderIDByBatch').focus();
			return;
		}
		if($("#table").bootstrapTable('getData').length >= 20) {
			console.log("一次性最多发料20个!");
			event.preventDefault(); //禁止默认事件（默认是换行） 
			$("#orderIDByBatch").val("");
			document.getElementById('orderIDByBatch').focus();
			return;
		}
		var _data = {
			"orderID": orderID,
			"status": "",
			"returnMessage": ""
		}
		$('#table').bootstrapTable('prepend', _data);

		//alert("123");
		//console.log($("#orderIDByBatch").val() + "=====huanh");
		//event.keyCode = 17;
		//addOrderIDToBatchTable($("#orderIDByBatch").val(),"PDA");

		$("#orderIDByBatch").val("");
		document.getElementById('orderIDByBatch').focus();
		//console.log($("#orderIDByBatch").val() + "=====huanh123");

	}
}

function notGrantMaterialDetail() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true,
		formatter: function(value, row, index) {
			return {
				checked: true //设置选中
			};
		}
	});
	columnsArray.push({
		"title": "工单号",
		"field": "orderID"
	});
	columnsArray.push({
		"title": "状态",
		"field": "status"
	});
	columnsArray.push({
		"title": "返回消息",
		"field": "returnMessage"
	});

	var urlStr = window.serviceIP + "/api/material/notGrantMaterialDetail?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
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
					singleSelect: false,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 50,
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