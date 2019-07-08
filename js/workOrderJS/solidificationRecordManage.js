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

			$("#solidificationRoomInfoSlct").find('option').remove();
			$('#solidificationRoomInfoSlct').append(("<option value=" + "-1" +
				">" + "全部" + "</option>").toString());
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
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				warningInfo = dataRes.message + ",";
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
		//			Token: $.cookie('token')
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

	$.ajax({
		url: window.serviceIP + "/api/solidifyrecord/getinsolidifyroombyparam",
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
		if($("#table").bootstrapTable('getVisibleColumns').length != 3) {
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
		addOrderIDToBatchTable(qrCode);
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

function addOrderIDToBatchTable(orderID) {

	if($("#table").bootstrapTable('getVisibleColumns').length != 3) {
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
	setTimeout(function() {
		scanQR('5');
	}, 2000);
}

function addSolidificationRecordManageByBatch() {
	if($("#table").bootstrapTable('getVisibleColumns').length != 3) {
		alert("请先添加工单号再发料!")
		return;
	}

	if(document.PlantToLineSelectForm.solidificationRoomInfoSlct.value.toString() == '-1') {
		alert("请选择确切的固化室,不能选择全部!")
		return;
	}

	var tableData = $("#table").bootstrapTable('getData');
	if(tableData.length < 1)
	{
		alert("请至少输入一个工单号");
		return;
	}
	var orderIDList = "";
	for(var i = 0; i < tableData.length; i++) {
		orderIDList += tableData[i].orderID + "###";
	}
	orderIDList = orderIDList.substring(0, orderIDList.length - 3);

	var formData = new FormData();
	formData.append("orderIDList", orderIDList);
	formData.append("roomID", document.PlantToLineSelectForm.solidificationRoomInfoSlct.value.toString());
	formData.append("operatorName", localStorage.username);
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