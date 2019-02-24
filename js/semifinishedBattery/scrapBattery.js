function scrapBatteryIndustrialPlantSlctFun(flag) {
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
					scrapBatteryProductionProcessSlctFun(flag);
				else
					scrapBatteryProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function scrapBatteryProductionProcessSlctFun(flag) {
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
				
				var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == '1008') {
							$(numbers[j]).attr("selected", "selected");
							$('#productionProcessSlct').selectpicker('hide');
							$("#productionProcessSlct").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 
					
				if(flag = "1")
					scrapBatteryBatteryTypeSlctFun(flag);
				else
					scrapBatteryProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function scrapBatteryBatteryTypeSlctFun(flag) {
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

			$("#batteryType").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#batteryType').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#batteryType').selectpicker('refresh');
				$('#batteryType').selectpicker('render');   
				$('#batteryType').selectpicker('mobile');
				if(flag = "1")
					scrapBatteryProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
};

function scrapBatteryProductionLineSlctFun() {
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
			$("#lineID").find('option').remove();

			$("#productionLineSlct").find('option').remove();
			$('#productionLineSlct').append(("<option value=" + "-1" + ">" + "全部产线"  + "</option>").toString());

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
					$('#lineID').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   
				$('#productionLineSlct').selectpicker('mobile');

				$('#lineID').selectpicker('refresh');
				$('#lineID').selectpicker('render');   
				$('#lineID').selectpicker('mobile');

				$('#scrapType').selectpicker('refresh');
				$('#scrapType').selectpicker('render');   
				$('#scrapType').selectpicker('mobile');

				getScrapBatteryRecord();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function selectedScrapBatteryRow(param) {
	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "scrapBattery_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteScrapBatteryRecord(row[0]["batteryid"]);
	}
}

function deleteScrapBatteryRecord(batteryID) {

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/deletescrapbattery?batteryID=" + batteryID,
		type: "POST",

		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				getScrapBatteryRecord();
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
}

function addScrapBatteryRecord(scrapFunction) {
	var scrapNum = 1;
	if(scrapFunction == '1')
		scrapNum = -1;
	if(scrapFunction == '2')
		scrapNum = $("#scrapNum").val().toString().trim();	
	if(scrapFunction == '1' && $("#batteryID").val().toString().length <2)
	{
		alert("请正确输入底壳二维码!");
		return;
	}
	if(scrapFunction == '2' && $("#scrapNum").val().toString().trim().length <1)
	{
		alert("请正确输入报废数量!");
		return;
	}
	var formData = new FormData($("#scrapBatteryCollapseForm")[0]);
	formData.append("scrapStaff", $.cookie('username'));
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString())
	
	var formDataParam = new FormData();
	formDataParam.append("jsonStr",window.getFormDataToJson(formData));
	formDataParam.append("scrapNum",scrapNum);
	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/addscrapbattery",
		type: "POST",
//		contentType: "application/json",
//		dataType: "json",
		data: formDataParam,
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
				getScrapBatteryRecord();
				//document.getElementById("scrapBatteryCollapseForm").reset();
				$("#scrapBatteryCollapseForm").collapse('hide');
				alert("报废成功！");
			} else {
				alert("报废失败！" + dataRes.message);
			}
		}
	});
};

function getScrapBatteryRecord() {
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
			return $("#batteryType option[value='" + row.batterytype + "']").text();
		}
	});
	columnsArray.push({
		"title": "报废类型",
		"field": "scraptype"
	});
	columnsArray.push({
		"title": "报废原因",
		"field": "scrapreason"
	});
	columnsArray.push({
		"title": "报废员工",
		"field": "scrapstaff"
	});
	columnsArray.push({
		"title": "报废时间",
		"field": "scraptime"
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
		"title": "报废厂区",
		"field": "plantid",
		visible: false

	});
	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/getscrapbatterybyline?lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString() +
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

function closeQRScanScrapBattery() {
	$("#myModal").modal('hide');
}
var canvasScrapBattery = null,
	contextScrapBattery = null,
	videoScrapBattery = null;  
var mediaStreamTrackScrapBattery = null;   
function findScrapBatteryByQR(scrapBatteryID) {
	$("#scrapBatteryCollapseForm" + " #batteryID").val(scrapBatteryID);
	$("#myModal").modal('hide');
}

function startScanQRScrapBattery() {
	if(contextScrapBattery) {         
		contextScrapBattery.drawImage(videoScrapBattery, 0, 0, 320, 320);               
		if(canvasScrapBattery != null) {            //以下开始编 数据  
			var imgData = canvasScrapBattery.toDataURL("image/jpeg");            //将图像转换为base64数据
			qrcode.decode(imgData);             
			qrcode.callback = function(imgMsg) {
				if(imgMsg != null && imgMsg.trim().length > 1 && imgMsg.toString().indexOf("error decoding") == -1) {
					findScrapBatteryByQR(imgMsg);
				} else {
					setTimeout(startScanQRScrapBattery(), 500);
				}
			}       
		}          
	}  
}

function ScrapBatteryScanQR() {
	$('#myModal').modal('show');
	if(contextScrapBattery == null) { 
		//window.addEventListener("DOMContentLoaded", function() {       
		try {    

			canvasScrapBattery = document.getElementById("canvasScrapBatteryScanQR");           
			contextScrapBattery = canvasScrapBattery.getContext("2d");           
			videoScrapBattery = document.getElementById("videoScrapBatteryScanQR");           
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
						//mediaStreamTrackScrapBattery = stream;  
						videoScrapBattery.srcObject = stream;
						videoScrapBattery.onloadedmetadata = function(e) {
							videoScrapBattery.play();
						};
					}, MediaErr);   
				} catch(err) {
					alert(err);
				}        
			}    
			else if(navigator.getUserMedia) { // Standard   
				navigator.getUserMedia(videoObj, function(stream) {   
					//mediaStreamTrackScrapBattery = stream;       
					videoScrapBattery.src = stream;
					videoScrapBattery.play();
				}, MediaErr);
			}           
			else if(navigator.webkitGetUserMedia) {              
				navigator.webkitGetUserMedia(videoObj, function(stream) {  
					mediaStreamTrackScrapBattery = stream;                  
					videoScrapBattery.src = window.webkitURL.createObjectURL(stream);                   
					videoScrapBattery.play();      
				}, MediaErr);           
			}       
			else if(navigator.mozGetUserMedia) {              
				navigator.mozGetUserMedia(videoObj, function(stream) { 
					mediaStreamTrackScrapBattery = stream;                   
					videoScrapBattery.src = window.URL.createObjectURL(stream);                   
					videoScrapBattery.play();               
				}, MediaErr);           
			}           
			else if(navigator.msGetUserMedia) {           
				navigator.msGetUserMedia(videoObj, function(stream) { 
					mediaStreamTrackScrapBattery = stream;                   
					$(document).scrollTop($(window).height());                   
					videoScrapBattery.src = window.URL.createObjectURL(stream);                   
					videoScrapBattery.play();               
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
	setTimeout(startScanQRScrapBattery(), 1000) ; 
}