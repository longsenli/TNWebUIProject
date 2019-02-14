function repairBatteryIndustrialPlantSlctFun(flag) {
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
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				$('#industrialPlantSlct').selectpicker('mobile');
				if(flag = "1")
					repairBatteryProductionProcessSlctFun(flag);
				else
					repairBatteryProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function repairBatteryProductionProcessSlctFun(flag) {
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
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				$('#productionProcessSlct').selectpicker('mobile');
				if(flag = "1")
					repairBatteryBatteryTypeSlctFun(flag);
				else
					repairBatteryProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function repairBatteryBatteryTypeSlctFun(flag) {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterialbyprocess?processID=1008",
		type: "GET",

		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
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
				$('#batterytype').selectpicker('mobile');
				if(flag = "1")
					repairBatteryProductionLineSlctFun(flag);
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
};

function repairBatteryProductionLineSlctFun() {
	//	return true;
	//	if(!($.isEmptyObject(first)) && first.toString().length > 1) {
	//
	//		return;
	//	}
	//alert("生产线选择");

	$.ajax({
		url: window.serviceIP + "/api/basicdata/getproductionline?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
			"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString(),
		type: "Get",
		//data: formData,
		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,

		success: function(dataRes) {
			$("#lineid").find('option').remove();

			$("#productionLineSlct").find('option').remove();
			$('#productionLineSlct').append(("<option value=" + "-1" + ">" + "全部产线"  + "</option>").toString());

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
					$('#lineid').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   
				$('#productionLineSlct').selectpicker('mobile');

				if(repairBateryHTMLFlag != 'change') {
					$('#lineid').selectpicker('refresh');
					$('#lineid').selectpicker('render');   
					$('#lineid').selectpicker('mobile');
				}

				getRepairBatteryRecord();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function selectedRepairBatteryRow(param) {
	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "repairBattery_add") {
		$("#batteryid").attr("readonly", false);
		repairBateryHTMLFlag = "add";
		$("#repairBatteryCollapseForm" + " #plantid").val(document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
		$("#repairBatteryCollapseForm").collapse('show');
	}
	if(optionType == "repairBattery_edit") {

		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		repairBateryHTMLFlag = "change";
		$("#batteryid").attr("readonly", true);
		for(var key in row[0]) {

			if(key == 0) {
				continue;
			}

			if(key == "repairtime" || key == "backtime") {
				$("#repairBatteryCollapseForm" + " #" + key).val(window.stringToDatetimeLocalType(row[0][key].toString(), "yyyy-MM-ddThh:mm"));
				continue;
			}
			if(key == "lineid") {

				var numbers = $("#repairBatteryCollapseForm" + " #" + key).find("option"); //获取select下拉框的所有值
				for(var j = 0; j < numbers.length; j++) {
					if($(numbers[j]).val().toString() == row[0][key]) {
						$(numbers[j]).attr("selected", "selected");
					}
				}
				$('#' + key).selectpicker('refresh');
				$('#' + key).selectpicker('render'); 
				continue;
			}
			if(key == "batterytype") {

				var numbers = $("#repairBatteryCollapseForm" + " #" + key).find("option"); //获取select下拉框的所有值
				for(var j = 0; j < numbers.length; j++) {
					if($(numbers[j]).val().toString() == row[0][key]) {
						$(numbers[j]).attr("selected", "selected");
					}
				}
				$('#' + key).selectpicker('refresh');
				$('#' + key).selectpicker('render'); 
				continue;
			}
			$("#repairBatteryCollapseForm" + " #" + key).val(row[0][key]);
		}

		$("#repairBatteryCollapseForm").collapse('show');
	}
	if(optionType == "repairBattery_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteRepairBatteryRecord(row[0]["batteryid"]);
	}
}

function deleteRepairBatteryRecord(batteryID) {

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/deleterepairbattery?batteryID=" + batteryID,
		type: "POST",

		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				getRepairBatteryRecord();
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
}
var repairBateryHTMLFlag = "";

function addRepairBatteryRecord() {
	var formData = new FormData();
	var formDataClps = new FormData($("#repairBatteryCollapseForm")[0]);
	if("add" == repairBateryHTMLFlag) {
		formDataClps.append("plantid", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	}
	formData.append("jsonStr", window.getFormDataToJson(formDataClps));
	formData.append("type", repairBateryHTMLFlag);

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/addrepairbattery",
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

				getRepairBatteryRecord();
				repairBateryHTMLFlag = "";
				document.getElementById("repairBatteryCollapseForm").reset();
				$("#batteryid").attr("readonly", false);
				$("#repairBatteryCollapseForm").collapse('hide');
				alert("报废成功！");
			} else {
				alert("报废失败！" + dataRes.message);
			}
		}
	});
};

function getRepairBatteryRecord() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "底壳二维码",
		"field": "batteryid"
	});
	columnsArray.push({
		"title": "电池型号",
		"field": "电池型号",
		formatter: function(value, row, index) {
			return $("#batterytype option[value='" + row.batterytype + "']").text();
		}
	});
	columnsArray.push({
		"title": "报修原因",
		"field": "repairreason"
	});
	columnsArray.push({
		"title": "报修员工",
		"field": "reportstaff"
	});
	columnsArray.push({
		"title": "报修时间",
		"field": "repairtime"
	});
	columnsArray.push({
		"title": "维修员工",
		"field": "repairstaff"
	});
	columnsArray.push({
		"title": "返库时间",
		"field": "backtime"
	});

	columnsArray.push({
		"title": "batterytype",
		"field": "batterytype",
		visible: false
	});
	columnsArray.push({
		"title": "报废产线",
		"field": "lineid",
		visible: false

	});

	columnsArray.push({
		"title": "报废产线",
		"field": "plantid",
		visible: false

	});

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/getrepairbatterybyline?lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString() +
			"&plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString(),
		type: "GET",
		contentType: "application/json",

		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		success: function(dataRes) {

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");

				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar',
					singleSelect: false,
					clickToSelect: true,
					sortName: "recordTime",
					sortOrder: "desc",
					pageSize: 15,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//search: true,
					search: true,
					//strictSearch: true,
					pagination: true,
					columns: columnsArray
				});
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function closeQRScanRepairBattery() {
	$("#myModal").modal('hide');
}
var canvasRepairBattery = null,
	contextRepairBattery = null,
	videoRepairBattery = null;  
var mediaStreamTrackRepairBattery = null;   
function findRepairBatteryByQR(repairBatteryID) {
	$("#repairBatteryCollapseForm" + " #batteryid").val(repairBatteryID);
	$("#myModal").modal('hide');
}

function startScanQRRepairBattery() {
	if(contextRepairBattery) {         
		contextRepairBattery.drawImage(videoRepairBattery, 0, 0, 320, 320);               
		if(canvasRepairBattery != null) {            //以下开始编 数据  
			var imgData = canvasRepairBattery.toDataURL("image/jpeg");            //将图像转换为base64数据
			qrcode.decode(imgData);             
			qrcode.callback = function(imgMsg) {
				if(imgMsg != null && imgMsg.trim().length > 1 && imgMsg.toString().indexOf("error decoding") == -1) {
					findRepairBatteryByQR(imgMsg);
				} else {
					setTimeout(startScanQRRepairBattery(), 500);
				}
			}       
		}          
	}  
}

function RepairBatteryScanQR() {
	$('#myModal').modal('show');
	if(contextRepairBattery == null) { 
		//window.addEventListener("DOMContentLoaded", function() {       
		try {    

			canvasRepairBattery = document.getElementById("canvasRepairBatteryScanQR");           
			contextRepairBattery = canvasRepairBattery.getContext("2d");           
			videoRepairBattery = document.getElementById("videoRepairBatteryScanQR");           
			var videoObj = {
				audio: false,
				"video": true
			};              
			//			var videoObj = {
			//				"video": true
			//			};    
			var  flag = true;             
			var   MediaErr = function(error) {                   
				flag = false;                   
				if(error.PERMISSION_DENIED) {                       
					alert('用户拒绝了浏览器请求媒体的权限', '提示');                   
				} else if(error.NOT_SUPPORTED_ERROR) {                       
					alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');                   
				} else if(error.MANDATORY_UNSATISFIED_ERROR) {                       
					alert('指定的媒体类型未接收到媒体流', '提示');                   
				} else {                       
					alert('系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试!' + error.name + ": " + error.message, '提示');                   
				}               
			};            //获取媒体的兼容代码，目前只支持（Firefox,Chrome,Opera）
			      

			  
			if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia()) {                //qq浏览器不支持
				 
				try {  
					navigator.mediaDevices.getUserMedia(videoObj).then(function(stream) { 
						//mediaStreamTrack = stream;                  
						//video.src = window.URL.createObjectURL(stream);;                   
						//video.play();
						//mediaStreamTrackRepairBattery = stream;  
						videoRepairBattery.srcObject = stream;
						videoRepairBattery.onloadedmetadata = function(e) {
							videoRepairBattery.play();
						};
					}, MediaErr);   
				} catch(err) {
					alert(err);
				}        
			}    
			else if(navigator.getUserMedia) { // Standard   
				navigator.getUserMedia(videoObj, function(stream) {   
					//mediaStreamTrackRepairBattery = stream;       
					videoRepairBattery.src = stream;
					videoRepairBattery.play();
				}, MediaErr);
			}           
			else if(navigator.webkitGetUserMedia) {              
				navigator.webkitGetUserMedia(videoObj, function(stream) {  
					mediaStreamTrackRepairBattery = stream;                  
					videoRepairBattery.src = window.webkitURL.createObjectURL(stream);                   
					videoRepairBattery.play();      
				}, MediaErr);           
			}       
			else if(navigator.mozGetUserMedia) {              
				navigator.mozGetUserMedia(videoObj, function(stream) { 
					mediaStreamTrackRepairBattery = stream;                   
					videoRepairBattery.src = window.URL.createObjectURL(stream);                   
					videoRepairBattery.play();               
				}, MediaErr);           
			}           
			else if(navigator.msGetUserMedia) {           
				navigator.msGetUserMedia(videoObj, function(stream) { 
					mediaStreamTrackRepairBattery = stream;                   
					$(document).scrollTop($(window).height());                   
					videoRepairBattery.src = window.URL.createObjectURL(stream);                   
					videoRepairBattery.play();               
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
	//console.log("start");
	setTimeout(startScanQRRepairBattery(), 1000) ; 
}