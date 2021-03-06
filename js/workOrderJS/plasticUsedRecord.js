function plasticUsedRecordPlantSlctFun(flag) {
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

				plasticUsedRecordLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function plasticUsedRecordLineSlctFun() {
	//获取流程IP

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", window.windowProcessEnum.ZHQD);
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

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id +
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
							$('#productionLineSlct').selectpicker('hide');

							$("#productionLineLabel").css("display", "none");
						}
					}
					$('#productionLineSlct').selectpicker('refresh');
					$('#productionLineSlct').selectpicker('render'); 
				}
				plasticUsedRecordWorkingLocationSlctFun();

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function plasticUsedRecordWorkingLocationSlctFun() {
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", window.windowProcessEnum.ZHQD);
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
				plasticUsedRecordWorkOrderInfoSlct();
				initInputMaterialInfo();
				
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
};

function initInputMaterialInfo() {
	materialID = localStorage.materialIDPlasticUsedPage;
	materialName = localStorage.materialNamePlasticUsedPage;
	materialNumber = localStorage.materialNumberPlasticUsedPage;
}

function plasticUsedRecordMaterialInfoSlct() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterialbyprocess?processID=" +
			window.windowProcessEnum.ZHQD +
			"&plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString(),
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

			$("#materialSlct").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");

				for (var  i  in  models)  {  

					$('#materialSlct').append(("<option style='margin-top: 5px;font-size: 18px;' value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#materialSlct').selectpicker('refresh');
				$('#materialSlct').selectpicker('render');   
				$('#materialSlct').selectpicker('hide');   
				// $('#materialid').selectpicker('mobile');
				plasticUsedRecordWorkOrderInfoSlct();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
}

function plasticUsedRecordWorkOrderInfoSlct() {
	var dataStr = "------";
	var dataStr2 = "-----";
	var dateNow = new Date();
	if(dateNow.getHours() < 7) {
		dataStr2 = dateNow.format("yyyyMMdd");
		dateNow.setDate(dateNow.getDate() - 1);
		if(dateNow.getHours() == 6) {
			dataStr = dateNow.format("yyyyMMdd");
		} else {
			dataStr = "YB" + dateNow.format("yyyyMMdd");
		}

	}
	if(dateNow.getHours() > 6 && dateNow.getHours() < 19) {
		if(dateNow.getHours() == 18) {
			dataStr = dateNow.format("yyyyMMdd");
		} else {
			dataStr = "BB" + dateNow.format("yyyyMMdd");
		}

	}
	if(dateNow.getHours() > 18) {
		dataStr = "YB" + dateNow.format("yyyyMMdd");
	}
	$.ajax({
		url: window.serviceIP + "/api/order/getworkorderbylineid?lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString(),
		type: "GET",
		contentType: "application/json",
		dataType: "json",
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//async: false,
		processData: true,
		success: function(dataRes) {

			$("#workOrderSlct").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  

					if(models[i].orderid.toString().indexOf(dataStr) > 0 || models[i].orderid.toString().indexOf(dataStr2) > 0) {
						if(dataStr.indexOf("B") > -1) {
							$('#workOrderSlct').append(("<option style='margin-top: 5px;font-size: 16px;' value=" + models[i].id + "___" + models[i].materialid + ">" +
								models[i].closestaff  + "</option>").toString());
						} else {
							if(models[i].orderid.toString().indexOf("BB" + dataStr) > 0 || models[i].orderid.toString().indexOf("BB" + dataStr2) > 0) {
								$('#workOrderSlct').append(("<option style='margin-top: 5px;font-size: 16px;' value=" + models[i].id + "___" + models[i].materialid + ">" +
									models[i].closestaff + "___白"  + "</option>").toString());

							} else {

								$('#workOrderSlct').append(("<option style='margin-top: 5px;font-size: 16px;' value=" + models[i].id + "___" + models[i].materialid + ">" +
									models[i].closestaff + "___夜"  + "</option>").toString());
							}
						}
					}
				}
				$('#workOrderSlct').selectpicker('refresh');
				$('#workOrderSlct').selectpicker('render');   
				initWorkOrderSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function initWorkOrderSlctFun() {
	if(localStorage.selectedOrderPlasticUsedPage && localStorage.selectedOrderPlasticUsedPage.length > 10) {

		var numbers = $('#workOrderSlct').find("option"); //获取select下拉框的所有值
		for(var j = 0; j < numbers.length; j++) {
			if($(numbers[j]).val().toString() == localStorage.selectedOrderPlasticUsedPage) {
				$(numbers[j]).attr("selected", "selected");
				$('#workOrderSlct').selectpicker('refresh');
				$('#workOrderSlct').selectpicker('render'); 
				break;
			}
		}
	}
	localStorage.selectedOrderPlasticUsedPage = $('#workOrderSlct').val();
	getInputTotalNumber();
}

function changeWorkOrderSlctFun() {
	localStorage.selectedOrderPlasticUsedPage = $('#workOrderSlct').val();
}

function closeQRScanplasticUsedRecord() {
	$("#myModal").modal('hide');
}

function plasticUsedRecordDetail() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	//	columnsArray.push({
	//		"title": "底壳",
	//		"field": "id"
	//	});
	//	columnsArray.push({
	//		"title": "人员",
	//		"field": "staffid"
	//	});
	//	columnsArray.push({
	//		"title": "时间",
	//		"field": "usedtime"
	//	});
	//	columnsArray.push({
	//		"title": "产线",
	//		"field": "lineid",
	//		formatter: function(value, row, index) {
	//			return $("#productionLineSlct option[value='" + row.lineid + "']").text();
	//		}
	//	});
	//	columnsArray.push({
	//		"title": "包板物料",
	//		"field": "jqid"
	//	});
	//	columnsArray.push({
	//		"title": "责任人",
	//		"field": "jqstaff"
	//	});
	//
	//	columnsArray.push({
	//		"title": "时间",
	//		"field": "jqtime"
	//	});

	columnsArray.push({
		"title": "产线",
		"field": "lineID",
		formatter: function(value, row, index) {
			return $("#productionLineSlct option[value='" + value + "']").text();
		}
	});
	columnsArray.push({
		"title": "工位",
		"field": "workLocation",
		formatter: function(value, row, index) {
			return $("#workingkLocationSlct option[value='" + value + "']").text();
		}
	});

	columnsArray.push({
		"title": "物料型号",
		"field": "materialName"
	});

	columnsArray.push({
		"title": "数量",
		"field": "productionNumb"
	});
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	formData.append("locationID", document.PlantToLineSelectForm.workingkLocationSlct.value.toString());
	formData.append("startTime", document.getElementById("startTime").value);
	formData.append("endTime", document.getElementById("endTime").value);
	$.ajax({
		url: window.serviceIP + "/api/plastic/getPlasticUsedRecord",
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
					//strictSearch: true,
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
		findplasticUsedRecordByQR(qrCode, webName);
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
		"title": "ID号",
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
	if(orderID.indexOf("BB") > 0 && orderID.length > 15) {
		selectMaterial(orderID);
		return;
	}
	var rows = $('#table').bootstrapTable('getRowByUniqueId', orderID); //行的数据

	if(rows) {
		alert("该ID已添加!" + orderID);
		return;
	}
	if(orderID.length < 5) {
		alert("ID错误,请确认!" + orderID);
		return;
	}
	if($("#table").bootstrapTable('getData').length >= 20) {
		alert("一次性最多使用20个!");
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

}

function plasticUsedRecordByBatch(grantType) {
	if(!document.PlantToLineSelectForm.workOrderSlct.value) {
		alert("请确认工单!");
		return;
	}

	var dataStr = "-----";
	var dateNow = new Date();
	if(dateNow.getHours() < 7) {
		if(dateNow.getHours() == 6 && dateNow.getMinutes() > 20) {
			dataStr = "BB" + dateNow.format("yyyyMMdd");
		} else {
			dateNow.setDate(dateNow.getDate() - 1);
			dataStr = "YB" + dateNow.format("yyyyMMdd");
		}

	}
	if(dateNow.getHours() > 6 && dateNow.getHours() < 19) {
		if(dateNow.getHours() == 18 && dateNow.getMinutes() > 20) {
			dataStr = "YB" + dateNow.format("yyyyMMdd");
		} else {
			dataStr = "BB" + dateNow.format("yyyyMMdd");
		}

	}
	if(dateNow.getHours() > 18) {
		dataStr = "YB" + dateNow.format("yyyyMMdd");
	}

	if(document.PlantToLineSelectForm.workOrderSlct.value.toString().indexOf(dataStr) < 0) {
		alert("该工单无效,请切换工单!")
		return;
	}

	if(!materialName || materialName.length < 2) {
		alert("请先扫码投料!")
		return;
	}
	if($("#table").bootstrapTable('getVisibleColumns').length != 4) {
		alert("请先添加ID号再投入!")
		return;
	}
	var tableData = $("#table").bootstrapTable('getAllSelections');
	if(!tableData || tableData.length < 1) {
		alert("请先添加ID号再操作!")
		return;
	}
	if(tableData.length > 40) {
		alert("一次最多选择40个,请确认!,当前选择个数为:" + tableData.length)
		return;
	}

	if(tableData.length > materialNumber) {
		alert("剩余物料不能够完成所投底壳!")
		return;
	}
	//var tableData = $("#table").bootstrapTable('getData');
	var orderIDList = "";
	for(var i = 0; i < tableData.length; i++) {
		orderIDList += tableData[i].orderID + "###";
	}
	orderIDList = orderIDList.substring(0, orderIDList.length - 3);

	var formData = new FormData();
	formData.append("listID", orderIDList);
	formData.append("userID", localStorage.userID);
	formData.append("userName", localStorage.username);
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	formData.append("locationID", document.PlantToLineSelectForm.workingkLocationSlct.value.toString());
	formData.append("orderID", materialID);
	formData.append("orderIDZH", document.PlantToLineSelectForm.workOrderSlct.value.toString().split("___")[0]);
	formData.append("materialIDZH", document.PlantToLineSelectForm.workOrderSlct.value.toString().split("___")[1]);
	formData.append("materialNameZH", $("#workOrderSlct").find("option:selected").text().split("___")[0]);
	$.ajax({
		url: window.serviceIP + "/api/plastic/addPlasticUsedRecord",
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
				materialNumber = parseInt(dataRes.message.split("___")[0]);
				localStorage.materialNumberPlasticUsedPage = materialNumber;
				document.getElementById("inputMaterial").innerHTML = " " + materialName + ":" + materialNumber + ", 工位产量:" + dataRes.message.split("___")[1];
				//document.getElementById("inputPasticNumber").innerHTML ="工位产量:" + dataRes.message.split("___")[1];

			} else {
				alert("投料失败！" + dataRes.message);
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

function getInputTotalNumber() {
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	formData.append("locationID", document.PlantToLineSelectForm.workingkLocationSlct.value.toString());
	formData.append("workOrder", document.PlantToLineSelectForm.workOrderSlct.value.toString().split("___")[0]);

	$.ajax({
		url: window.serviceIP + "/api/plastic/getInputTotalNumberByClass",
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
				var showText = "";
				var totalNumber = 0;
				for(var i in models) {
					totalNumber += models[i].productionNumb;
				}
				if(materialID && materialID.toString().length > 5) {
					showText = " " + materialName + ":" + materialNumber + ",";
				}
				showText += " 工位产量:" + totalNumber;
				document.getElementById("inputMaterial").innerHTML = showText;
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

}

function TextInput(orderID) {
	if($("#table").bootstrapTable('getVisibleColumns').length != 4) {
		innitOrderIDTable();
	}

	if(!orderID) {
		orderID = $("#orderIDByBatch").val();
	}

	if(orderID.indexOf("BB") > 0 && orderID.length > 15) {
		selectMaterial(orderID);
		$("#orderIDByBatch").val("");
		return;
	}
	if(orderID.length < 5) {
		$('<div>').appendTo('body').addClass('alert alert-success').html('错误的底壳二维码!').show().delay(1500).fadeOut();
		$("#orderIDByBatch").val("");
		return;
	}
	var rows = $('#table').bootstrapTable('getRowByUniqueId', orderID); //行的数据

	if(rows) {
		$('<div>').appendTo('body').addClass('alert alert-success').html('该底壳已添加!').show().delay(1500).fadeOut();
		$("#orderIDByBatch").val("");
		return;
	}
	var tableDataTMP = $("#table").bootstrapTable('getData');
	if(tableDataTMP.length > 0) {
		if(tableDataTMP[0].status) {
			if(tableDataTMP[0].status.length > 0) {
				innitOrderIDTable();

			}
		}
	}
	var tableData = $("#table").bootstrapTable('getAllSelections');
	if(tableData.length + 1 > materialNumber) {
		alert("剩余物料为:" + materialNumber + ",请投料后继续使用!");
		return;
	}

	document.getElementById("inputPasticNumber").innerHTML = "当前扫码:" + (tableData.length + 1);

	if($("#table").bootstrapTable('getData').length >= 40) {
		$('<div>').appendTo('body').addClass('alert alert-success').html('一次性最多40个').show().delay(1500).fadeOut();
		$("#orderIDByBatch").val("");
		return;
	}

	var _data = {
		"orderID": orderID,
		"status": "",
		"returnMessage": ""
	}
	$('#table').bootstrapTable('prepend', _data);

	//	if($('#autoFinishOrderCheck').is(':checked'))
	//	{
	//		plasticUsedRecordByBatch();
	//	} 
}

var materialName;
var materialNumber = 0;
var materialID;

function selectMaterial(orderID) {

	if(!orderID) {
		if($("#table").bootstrapTable('getVisibleColumns').length != 4) {
			alert("请先添加ID号再投入!")
			return;
		}
		var tableData = $("#table").bootstrapTable('getAllSelections');
		if(!tableData || tableData.length < 1) {
			alert("请先添加ID号再操作!")
			return;
		}
		if(tableData.length != 1) {
			alert("请输入一个工单号!")
			return;
		}
		orderID = tableData[0].orderID;
	}

	$.ajax({
		url: window.serviceIP + "/api/material/getmaterialrecorddetailbysuborderid?subOrderID=" + orderID,
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
				//console.log(models);
				if(models.length > 0) {
					materialNumber = parseInt(models[0].inputWorkLocationID);
					materialName = models[0].materialNameInfo;
					materialID = models[0].subOrderID;

					localStorage.materialIDPlasticUsedPage = materialID;
					localStorage.materialNamePlasticUsedPage = materialName;
					localStorage.materialNumberPlasticUsedPage = materialNumber;
					var productionInfo = "";
					if(document.getElementById("inputMaterial").innerHTML.indexOf("工位产量")) {
						productionInfo = document.getElementById("inputMaterial").innerHTML.split("工位产量")[1];
					}
					document.getElementById("inputMaterial").innerHTML = " " + materialName + ":" + materialNumber + ", 工位产量" + productionInfo;
					//$('#table').bootstrapTable('destroy');
				}

			} else {
				alert("查询工单失败！" + dataRes.message);
			}
		}
	});

}

function plasticDataProvenance() {
	var orderID = $("#orderIDByBatch").val();
	if(!orderID || orderID.length < 3) {
		alert("请输入底壳二维码!");
		return;
	}
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "底壳",
		"field": "id"
	});
	columnsArray.push({
		"title": "人员",
		"field": "staffid"
	});
	columnsArray.push({
		"title": "时间",
		"field": "usedtime"
	});
	columnsArray.push({
		"title": "产线",
		"field": "lineid",
		formatter: function(value, row, index) {
			return $("#productionLineSlct option[value='" + row.lineid + "']").text();
		}
	});
	columnsArray.push({
		"title": "包板物料",
		"field": "jqid"
	});
	columnsArray.push({
		"title": "责任人",
		"field": "jqstaff"
	});

	columnsArray.push({
		"title": "时间",
		"field": "jqtime"
	});

	var formData = new FormData();
	formData.append("id", orderID);

	$.ajax({
		url: window.serviceIP + "/api/plastic/plasticDataProvenance",
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
					strictSearch: true,
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

function scrapBatteryBottom() {
	var tableData = $("#table").bootstrapTable('getAllSelections');
	if(!tableData || tableData.length < 1 || !tableData.length) {
		alert("请先添加ID号再操作!")
		return;
	}
	if(!tableData[0].orderID)
	{
		alert("请先添加ID号再操作!")
		return;
	}
	if(tableData.length > 40) {
		alert("一次最多选择40个,请确认!,当前选择个数为:" + tableData.length)
		return;
	}

	//var tableData = $("#table").bootstrapTable('getData');
	var orderIDList = "";
	for(var i = 0; i < tableData.length; i++) {
		orderIDList += tableData[i].orderID + "###";
	}
	orderIDList = orderIDList.substring(0, orderIDList.length - 3);

if(!changeConfirmDlg("是否确认报废底壳" + tableData.length + "个"))
{
	return;
}
	var formData = new FormData();
	formData.append("listID", orderIDList);
	formData.append("userID", localStorage.userID);
	formData.append("userName", localStorage.username);
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	formData.append("locationID", document.PlantToLineSelectForm.workingkLocationSlct.value.toString());
	formData.append("workOrder", document.PlantToLineSelectForm.workOrderSlct.value.toString().split("___")[0]);
	$.ajax({
		url: window.serviceIP + "/api/plastic/scrapBatteryBottom",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		}, 

		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				innitOrderIDTable(models);

				if(materialID) {
					selectMaterial(materialID);
				}

				getInputTotalNumber();
			} else {
				alert("查询工单失败！" + dataRes.message);
			}
		}
	});

}