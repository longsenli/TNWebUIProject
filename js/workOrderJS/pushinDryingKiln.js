function pushinDryingKilnPlantSlctFun(flag) {
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

				if(flag = "1") {

					pushinDryingKilnEquipmentSlctFun();
				} else
					pushinDryingKilnEquipmentSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function pushinDryingKilnEquipmentSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/equipment/getequipmentinfo?typeID=10011&plantID=" +
			document.PlantToLineSelectForm.industrialPlantSlct.value.toString(),
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

			$("#dryingKilnEquipmentSlct").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#dryingKilnEquipmentSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#dryingKilnEquipmentSlct').selectpicker('refresh');
				$('#dryingKilnEquipmentSlct').selectpicker('render');   
				// $('#batterytype').selectpicker('mobile');
				//$('#batterytype').selectpicker('hide');
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
};

//浇铸目前在窑中数据
function getDryingKilnInfo(typeID) {
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
	//	columnsArray.push({
	//		"title": "工位",
	//		"field": "workLocationName"		
	//	});
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
	var urlStr = window.serviceIP + "/api/dashboard/getDryingKilnInfo?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&equipmentID=" + document.PlantToLineSelectForm.dryingKilnEquipmentSlct.value.toString() +
		"&queryTypeID=" + typeID +
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

function selectEquipment(qrCode) {
	$('#dryingKilnEquipmentSlct').selectpicker('val', qrCode);
	$('#dryingKilnEquipmentSlct').selectpicker('refresh');
	$('#dryingKilnEquipmentSlct').selectpicker('render'); 
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
	if(webName == '1' || webName == '2')
		selectEquipment(qrCode);
	if(webName == '5')
		addOrderIDToBatchTable(qrCode);
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
		pageSize: 100,
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
	if($("#table").bootstrapTable('getData').length >= 30) {
		alert("一次性最多扫码30个!");
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

function pushinDryingKilnByBatch() {
	if($("#table").bootstrapTable('getVisibleColumns').length != 3) {
		alert("请先添加工单号再发料!")
		return;
	}

	if(!window.changeConfirmDlg("确认将板栅放入" + $("#dryingKilnEquipmentSlct").find("option:selected").text() + "?"))
		return;

	var tableData = $("#table").bootstrapTable('getData');
	var orderIDList = "";
	for(var i = 0; i < tableData.length; i++) {
		orderIDList += tableData[i].orderID + "###";
	}
	orderIDList = orderIDList.substring(0, orderIDList.length - 3);

	var formData = new FormData();
	formData.append("orderIDList", orderIDList);
	formData.append("name", localStorage.username);
	formData.append("equipmentID", document.PlantToLineSelectForm.dryingKilnEquipmentSlct.value.toString());
	$.ajax({
		url: window.serviceIP + "/api/order/pushindryingkilnjzbybatch",
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

//添加单独浇铸出窑判断,如果不是浇铸工序则不会调用此方法
function pushOutDryingKilnjzsuborder() {

	if(!window.changeConfirmDlg("确认将" + $("#dryingKilnEquipmentSlct").find("option:selected").text() + "中板栅全部出窑?"))
		return;
	//使用getSelections即可获得，row是json格式的数据
	$("#subOrderCancelFinishBT").attr("disabled", true);
	$("#subOrderOvertimeFinishBT").attr("disabled", true);
	var formMap = {};
	//浇铸干燥窑扫码后ID赋值
	//alert(qrCode)
	formMap['dryingkilnid'] = document.PlantToLineSelectForm.dryingKilnEquipmentSlct.value.toString();
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