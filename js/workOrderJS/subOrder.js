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
				console.log(models);
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id.toString() + ">" +
						models[i].name.toString() + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				$('#industrialPlantSlct').selectpicker('mobile');
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
				$('#productionProcessSlct').selectpicker('mobile');
				subOrderProductionLineSlctFun();
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
				lineWorkOrderSlct();
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
				SelectWorkOrderFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function FinishSubOrder() {
	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	var formData = new FormData();
	if(row.length < 1) {
		alert("请选择行数据!");
		return;
	}
	if(row[0]["status"] > 3) {
		alert("该工单已完成!");
		return;
	}
	for(var key in row[0]) {
		if(key == 0) {
			continue;
		}
		if(key == "status") {
			formData.append(key, "3");
		} else {
			formData.append(key, row[0][key]);
		}
		//$("#workOrderManageForm" + " #" + key).attr("value", row[0][key]);
	}
	var formData2 = new FormData();
	formData2.append("name", $.cookie('username'));
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
				alert('保存成功!');
				SelectSubOrder()

			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
};

function SelectWorkOrderFun() {
	SelectSubOrder();
	SelectMaterialRecord();
};

function SelectSubOrder() {
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

function getUsableMaterialFun() {
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString())
	formData.append("materialID", $("#table").bootstrapTable('getData')[0].materialid)
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
	var formData = new FormData();
	var selectRow = $("#usableMaterialTable").bootstrapTable('getSelections');
	var arrayObj = new Array();
	for(var i = 0; i < selectRow.length; i++) {
		arrayObj.push(selectRow[i].id);
	}

	formData.append("materialIDListStr", JSON.stringify(arrayObj));

	formData.append("expendOrderID", document.PlantToLineSelectForm.workOrderSlct.value.toString());
	formData.append("outputter", $.cookie('username')) //$.cookie('username');

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
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
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
	for(var i = 0; i < selectRow.length; i++)
	{
		console.log("dayin");

		var LODOP = getLodop(document.getElementById('LODOP_OB'), document
		.getElementById('LODOP_EM'));
	LODOP.PRINT_INIT("打印任务名"); //首先一个初始化语句
	//LODOP.ADD_PRINT_BARCODE(0,0,200,100,"Code39","*123ABC4567890*");
	LODOP.ADD_PRINT_BARCODE(0, 0, 200, 200, "QRCode", selectRow[i].id);
	LODOP.ADD_PRINT_TEXT(205,10,200,100,selectRow[i].ordersplitid);//增加纯文本项
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

function startScanQR() {
	if(context) {         
		context.drawImage(video, 0, 0, 320, 320);               
		if(canvas != null) {            //以下开始编 数据  
			var imgData = canvas.toDataURL("image/jpeg");            //将图像转换为base64数据
			qrcode.decode(imgData);             
			qrcode.callback = function(imgMsg) {
				if(imgMsg != null && imgMsg.trim().length > 1 && imgMsg.toString().indexOf("error decoding") == -1) {
					gainMaterialByQR(imgMsg);
				} else {
					setTimeout(startScanQR(), 500);
				}
			}       
		}          
	}  
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
						gainMaterialByQR(imgMsg);
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

function scanQR() {
	$('#myModal').modal('show');
	if(context == null) { 
		//window.addEventListener("DOMContentLoaded", function() {       
		try {           
			canvas = document.getElementById("canvas");           
			context = canvas.getContext("2d");           
			video = document.getElementById("video");           
			var videoObj = {
					"video": true,
					audio: false
				},
				               flag = true,
				               MediaErr = function(error) {                   
					flag = false;                   
					if(error.PERMISSION_DENIED) {                       
						alert('用户拒绝了浏览器请求媒体的权限', '提示');                   
					} else if(error.NOT_SUPPORTED_ERROR) {                       
						alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');                   
					} else if(error.MANDATORY_UNSATISFIED_ERROR) {                       
						alert('指定的媒体类型未接收到媒体流', '提示');                   
					} else {                       
						alert('系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试', '提示');                   
					}               
				};            //获取媒体的兼容代码，目前只支持（Firefox,Chrome,Opera）
			           
			if(navigator.getUserMedia) {                //qq浏览器不支持
				               
				if(navigator.userAgent.indexOf('MQQBrowser') > -1) {                   
					alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');                   
					return false;               
				}               
				navigator.getUserMedia(videoObj, function(stream) { 
					mediaStreamTrack = stream;                   
					video.src = stream;                   
					video.play();

				}, MediaErr);           
			}           
			else if(navigator.webkitGetUserMedia) {               
				navigator.webkitGetUserMedia(videoObj, function(stream) {  
					mediaStreamTrack = stream;                  
					video.src = window.webkitURL.createObjectURL(stream);                   
					video.play();        
				}, MediaErr);           
			}           
			else if(navigator.mozGetUserMedia) {               
				navigator.mozGetUserMedia(videoObj, function(stream) { 
					mediaStreamTrack = stream;                   
					video.src = window.URL.createObjectURL(stream);                   
					video.play();               
				}, MediaErr);           
			}           
			else if(navigator.msGetUserMedia) {               
				navigator.msGetUserMedia(videoObj, function(stream) { 
					mediaStreamTrack = stream;                   
					$(document).scrollTop($(window).height());                   
					video.src = window.URL.createObjectURL(stream);                   
					video.play();               
				}, MediaErr);           
			} else {               
				alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器');               
				return false;           
			}           
			if(flag) {                // alert('为了获得更准确的测试结果，请尽量将二维码置于框中，然后进行拍摄、扫描。 请确保浏览器有权限使用摄像功能');
				          }            //这个是拍照按钮的事件，
			           

			//				$("#snap").click(function() {
			//					startPat();
			//				}).show();       
		} catch(e) {           
			//printHtml("浏览器不支持HTML5 CANVAS");       
		}   
		//}, false);    //打印内容到页面
	} 
	console.log("start");
	setTimeout(startScanQR(), 10000) ; 
}

function closeQRScan() {
	$("#myModal").modal('hide');
}

function gainMaterialByQR(recordID) {
	$("#myModal").modal('hide');
	//console.log("gainMaterialByQR" + recordID);
	var formData = new FormData();
	formData.append("expendOrderID", document.PlantToLineSelectForm.workOrderSlct.value.toString());
	formData.append("outputter", "lls") //$.cookie('username');
	formData.append("qrCode", "6eb7f3e6705a47fdbe0548a74e63b36f") //$.cookie('username');

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
			} else {
				alert("领取失败！" + dataRes.message);
			}
		}
	});
}