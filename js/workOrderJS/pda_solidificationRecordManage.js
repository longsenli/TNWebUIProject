function solidificationRecordManagePlantSlctFun(flag) {
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
				solidificationRoomInfoSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function solidificationRoomInfoSlctFun() {
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", "1004");
	//$('#solidifyStepID').selectpicker('hide');

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

			$("#solidificationRoomInfoSlct").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");

				for (var  i  in  models)  {  
					$('#solidificationRoomInfoSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#solidificationRoomInfoSlct').selectpicker('refresh');
				$('#solidificationRoomInfoSlct').selectpicker('render');   
				// $('#solidifyRoomSlct').selectpicker('mobile');

				if(localStorage.getItem('lineID') != null && localStorage.getItem('lineID') != 'undefined' && localStorage.getItem('lineID').toString().length > 0) {
					var numbers = $('#solidificationRoomInfoSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('lineID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#solidificationRoomInfoSlct').selectpicker('hide');

							$("#solidificationRoomInfoSlctLabel").css("display", "none");
						}
					}
					$('#solidificationRoomInfoSlct').selectpicker('refresh');
					$('#solidificationRoomInfoSlct').selectpicker('render'); 

				}

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function changeSolidificationRoomStatus() {

	if(document.PlantToLineSelectForm.solidificationRoomInfoSlct.value.toString() == '-1') {
		alert("请选择确切的固化室,不能选择全部!")
		return;
	}

	if(document.PlantToLineSelectForm.solidifyStepID.value.toString() == '-1') {
		alert("请选择当前固化阶段!")
		return;
	}
	var formData = new FormData();
	formData.append("roomID", document.PlantToLineSelectForm.solidificationRoomInfoSlct.value.toString());
	formData.append("orderIDList", document.PlantToLineSelectForm.solidificationRoomInfoSlct.value.toString());
	formData.append("operatorName", localStorage.username);
	formData.append("status", document.PlantToLineSelectForm.solidifyStepID.value.toString());

	$.ajax({
		url: window.serviceIP + "/api/solidifyrecord/changesolidifystatus",
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
			if(dataRes.status == 1) { 
				$("#showMessage").html("转段成功！");
			}
		}
	});
}

function solidificationRecordManageDetail() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialname"
	});
	columnsArray.push({
		"title": "工单号",
		"field": "orderid"
	});
	columnsArray.push({
		"title": "数量",
		"field": "productionnum"
	});
	columnsArray.push({
		"title": "干燥窑",
		"field": "solidifyroomname"
	});
	columnsArray.push({
		"title": "入窑人",
		"field": "recorder1"
	});
	columnsArray.push({
		"title": "入窑时间",
		"field": "starttime1"
	});

	columnsArray.push({
		"title": "一次转段人",
		"field": "recorder2"
	});

	columnsArray.push({
		"title": "转段时间",
		"field": "endtime1"
	});

	columnsArray.push({
		"title": "二次转段人",
		"field": "recorder3"
	});

	columnsArray.push({
		"title": "转段时间",
		"field": "endtime2"
	});

	columnsArray.push({
		"title": "出窑人",
		"field": "outoperator"
	});

	columnsArray.push({
		"title": "出窑时间",
		"field": "endtime3"
	});

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("roomID", document.PlantToLineSelectForm.solidificationRoomInfoSlct.value.toString());
	formData.append("solidifyStepID", document.PlantToLineSelectForm.solidifyStepID.value.toString());
	formData.append("startTime", document.getElementById("startTime").value);
	formData.append("endTime", document.getElementById("endTime").value);

	$.ajax({
		url: window.serviceIP + "/api/solidifyrecord/getsolidifyrecordbyparam",
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

function inSolidifyRoomDetail() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialname"
	});
	columnsArray.push({
		"title": "工单号",
		"field": "orderid"
	});
	columnsArray.push({
		"title": "数量",
		"field": "productionnum"
	});
	columnsArray.push({
		"title": "干燥窑",
		"field": "solidifyroomname"
	});
	columnsArray.push({
		"title": "入窑人",
		"field": "recorder1"
	});
	columnsArray.push({
		"title": "入窑时间",
		"field": "starttime1",
		formatter: function(value, row, index) {
			if(value) {
				if(value > '2019')
					return value.toString().split(" ")[0];
				else
					return '-';
			}
		}
	});

	columnsArray.push({
		"title": "一次转段人",
		"field": "recorder2"
	});

	columnsArray.push({
		"title": "转段时间",
		"field": "endtime1",
		formatter: function(value, row, index) {
			if(value) {
				if(value > '2019')
					return value.toString().split(" ")[0];
				else
					return '-';
			}
		}
	});

	columnsArray.push({
		"title": "二次转段人",
		"field": "recorder3"
	});

	columnsArray.push({
		"title": "转段时间",
		"field": "endtime2",
		formatter: function(value, row, index) {
			if(value) {
				if(value > '2019')
					return value.toString().split(" ")[0];
				else
					return '-';
			}
		}
	});

	columnsArray.push({
		"title": "出窑人",
		"field": "outoperator"
	});

	columnsArray.push({
		"title": "出窑时间",
		"field": "endtime3",
		formatter: function(value, row, index) {
			if(value) {
				if(value > '2019')
					return value.toString().split(" ")[0];
				else
					return '-';
			}
		}
	});

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("roomID", document.PlantToLineSelectForm.solidificationRoomInfoSlct.value.toString());
	formData.append("status", document.PlantToLineSelectForm.solidifyStepID.value.toString());

	$.ajax({
		url: window.serviceIP + "/api/solidifyrecord/getInSolidifyRoomByParamNew",
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
	if(webName == '1')
		selectByQuery(qrCode.split("###")[0], qrCode.split("###")[1]);
	if(webName == '5')
		addOrderIDToBatchTable(qrCode, "SJ");
}

function selectByQuery(roomID, StepID) {

	$('#solidificationRoomInfoSlct').selectpicker('val', roomID);
	$('#solidificationRoomInfoSlct').selectpicker('refresh');
	$('#solidificationRoomInfoSlct').selectpicker('render'); 

	$('#solidifyStepID').selectpicker('val', StepID);
	$('#solidifyStepID').selectpicker('refresh');
	$('#solidifyStepID').selectpicker('render'); 

	inSolidifyRoomDetail();
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
		pageSize: 20,
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
		alert("一次性最多扫码20个!");
		return;
	}
	var _data = {
		"orderID": orderID,
		"status": "",
		"returnMessage": ""
	}
	$('#table').bootstrapTable('prepend', _data);
	//$("#table").bootstrapTable('append', _data); //_data----->新增的数据
	if(type == "SJ") {
		setTimeout(function() {
			scanQR('5');
		}, 2000);
	} else {
		addSolidificationRecordManageByBatch();
	}

}

function addSolidificationRecordManageByBatch() {

	$("#showMessage").html('');
	if($("#table").bootstrapTable('getVisibleColumns').length != 4) {
		alert("请先扫码添加工单!")
		return;
	}

	if(document.PlantToLineSelectForm.solidificationRoomInfoSlct.value.toString() == '-1') {
		//alert("请选择确切的固化室,不能选择全部!")
		return;
	}

	var tableData = $("#table").bootstrapTable('getAllSelections');
	if(tableData.length < 1) {
		//alert("请至少输入一个工单号");
		return;
	}
	var orderIDList = "";
	for(var i = 0; i < tableData.length; i++) {
		if(tableData[i].status) {
			continue;
		}
		orderIDList += tableData[i].orderID + "###";
	}
	orderIDList = orderIDList.substring(0, orderIDList.length - 3);

	if($("#solidificationRoomInfoSlct").find("option:selected").text().indexOf("正") > 0 && orderIDList.indexOf("TBF") > 0) {
		//alert("固化室为正,工单含有负极板或边负极板,请确认后更换固化室!")
		$("#showMessage").html("固化室为正,工单含有负极板或边负极板,请确认后更换固化室!" );
		return;
	}
	if($("#solidificationRoomInfoSlct").find("option:selected").text().indexOf("负") > 0 && orderIDList.indexOf("TBZ") > 0) {
		//alert("固化室为负,工单含有正极板,请确认后更换固化室!") 
		$("#showMessage").html("固化室为负,工单含有正极板,请确认后更换固化室!" );
		return;
	}

	var formData = new FormData();
	formData.append("orderIDList", orderIDList);
	formData.append("roomID", document.PlantToLineSelectForm.solidificationRoomInfoSlct.value.toString());
	formData.append("operatorName", localStorage.username + "###" + localStorage.userID);
	formData.append("roomName", $("#solidificationRoomInfoSlct").find("option:selected").text());

	$.ajax({
		url: window.serviceIP + "/api/solidifyrecord/putinsolidifyroom",
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
				$("#orderIDByBatch").val("");
				//document.getElementById('orderIDByBatch').focus();
			} else {
				$("#showMessage").html("初始化数据失败！" + dataRes.message);
				//alert("初始化数据失败！" + dataRes.message);
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
			//alert("请求出错," + msg);
		}
	});
}

function onTextareaKeyDown() {
	return;
	if(event.keyCode == 13) { //如果按的是enter键 13是enter 
		event.preventDefault(); //禁止默认事件（默认是换行） 
		var orderID = $('#orderIDByBatch').val().trim();
		var roomID = false;
		var numbers = $('#solidificationRoomInfoSlct').find("option"); //获取select下拉框的所有值
		for(var j = 0; j < numbers.length; j++) {
			if($(numbers[j]).val().toString() == orderID) {
				$(numbers[j]).attr("selected", "selected");
				roomID = true;
			}
		}
		$('#solidificationRoomInfoSlct').selectpicker('refresh');
		$('#solidificationRoomInfoSlct').selectpicker('render'); 

		if(roomID) {
			$("#orderIDByBatch").val("");
			document.getElementById('orderIDByBatch').focus();
			return;
		}

		if(orderID.length < 2) {
			//alert("请确认订单!")
			return;
		}

		if($("#table").bootstrapTable('getVisibleColumns').length != 4) {
			innitOrderIDTable();
		}

		if(!orderID) {
			orderID = $("#orderIDByBatch").val();
		}
		var rows = $('#table').bootstrapTable('getRowByUniqueId', orderID); //行的数据

		if(rows) {
			$("#orderIDByBatch").val("");
			document.getElementById('orderIDByBatch').focus();
			//alert("该工单已添加!" + orderID);
			return;
		}
		if(orderID.length < 5) {
			$("#orderIDByBatch").val("");
			document.getElementById('orderIDByBatch').focus();
			//alert("工单错误,请确认!" + orderID);
			return;
		}
		if($("#table").bootstrapTable('getData').length >= 30) {
			$("#orderIDByBatch").val("");
			document.getElementById('orderIDByBatch').focus();
			//alert("一次性最多扫码20个!");
			return;
		}
		var _data = {
			"orderID": orderID,
			"status": "",
			"returnMessage": ""
		}
		$('#table').bootstrapTable('prepend', _data);
		//$("#table").bootstrapTable('append', _data); //_data----->新增的数据

		addSolidificationRecordManageByBatch();
		$("#orderIDByBatch").val("");
		document.getElementById('orderIDByBatch').focus();
		//console.log($("#orderIDByBatch").val() + "=====huanh123");

	}
}
var testNumber = 0;

function hideInputKey() {
	//console.log("2343") 
	//document.getElementById("orderIDByBatch").readOnly=true;
	//document.getElementById("orderIDByBatch").readOnly=false;
	//console.log("2343") 
	//document.activeElement.blur();//屏蔽默认键盘弹出； 
	//console.log(document.getElementById("orderIDByBatch").type) 
	//document.getElementById("orderIDByBatch").type="button";
	//document.getElementById("orderIDByBatch").type="text";
	//document.getElementById('orderIDByBatch').focus();
}

function selectInput(nowNumber) {
	//	//console.log(nowNumber)
	//	document.getElementById('orderIDByBatch').focus();
	//	 //document.activeElement.blur();
	//	if(testNumber == nowNumber) {
	//		setTimeout(function() { 
	//			selectInput(++testNumber);
	//		}, 5000);
	//	}
}

function changeAllSolidificationRoomStatusAuto() {

	if(document.PlantToLineSelectForm.solidificationRoomInfoSlct.value.toString() == '-1') {
		alert("请选择确切的固化室,不能选择全部!")
		return;
	}
	//
	//	if(document.PlantToLineSelectForm.solidifyStepID.value.toString() == '-1') {
	//		alert("请选择当前固化阶段!")
	//		return;
	//	}

	if(!window.changeConfirmDlg("确认将全部转段" + $("#solidificationRoomInfoSlct").find("option:selected").text() + "?"))
		return;
	var formData = new FormData();
	formData.append("roomID", document.PlantToLineSelectForm.solidificationRoomInfoSlct.value.toString());
	formData.append("operatorName", localStorage.username);

	$.ajax({
		url: window.serviceIP + "/api/solidifyrecord/changeAllSolidifyStatusAuto",
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
			if(dataRes.status == 1) { 
				inSolidifyRoomDetail();
				alert("转段成功!");
			}
		}
	});
}