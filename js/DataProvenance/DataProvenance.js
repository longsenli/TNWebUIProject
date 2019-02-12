
var canvasDataProvenance = null,
	contextDataProvenance = null,
	videoDataProvenance = null;  
var mediaStreamTrackDataProvenance = null;   

function startScanQRDataProvenance() {
	if(contextDataProvenance) {         
		contextDataProvenance.drawImage(video, 0, 0, 320, 320);               
		if(canvasDataProvenance != null) {            //以下开始编 数据  
			var imgData = canvasDataProvenance.toDataURL("image/jpeg");            //将图像转换为base64数据
			qrcode.decode(imgData);             
			qrcode.callback = function(imgMsg) {
				if(imgMsg != null && imgMsg.trim().length > 1 && imgMsg.toString().indexOf("error decoding") == -1) {
					findDataProvenanceByQR(imgMsg);
				} else {
					setTimeout(startScanQR(), 500);
				}
			}       
		}          
	}  
}

function DataProvenanceScanQR() {
	$('#myModal').modal('show');
	if(contextDataProvenance == null) { 
		//window.addEventListener("DOMContentLoaded", function() {       
		try {    

			canvasDataProvenance = document.getElementById("canvasDataProvenanceScanQR");           
			contextDataProvenance = canvas.getContext("2d");           
			videoDataProvenance = document.getElementById("videoDataProvenanceScanQR");           
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
						mediaStreamTrackDataProvenance = stream;  
						videoDataProvenance.srcObject = stream;
						videoDataProvenance.onloadedmetadata = function(e) {
							videoDataProvenance.play();
						};
					}, MediaErr);   
				} catch(err) {
					alert(err);
				}        
			}    
			else if(navigator.getUserMedia) { // Standard   
				navigator.getUserMedia(videoObj, function(stream) {   
					//mediaStreamTrackDataProvenance = stream;       
					videoDataProvenance.src = stream;
					videoDataProvenance.play();
				}, MediaErr);
			}           
			else if(navigator.webkitGetUserMedia) {              
				navigator.webkitGetUserMedia(videoObj, function(stream) {  
					mediaStreamTrackDataProvenance = stream;                  
					videoDataProvenance.src = window.webkitURL.createObjectURL(stream);                   
					videoDataProvenance.play();      
				}, MediaErr);           
			}       
			else if(navigator.mozGetUserMedia) {              
				navigator.mozGetUserMedia(videoObj, function(stream) { 
					mediaStreamTrackDataProvenance = stream;                   
					videoDataProvenance.src = window.URL.createObjectURL(stream);                   
					videoDataProvenance.play();               
				}, MediaErr);           
			}           
			else if(navigator.msGetUserMedia) {           
				navigator.msGetUserMedia(videoObj, function(stream) { 
					mediaStreamTrackDataProvenance = stream;                   
					$(document).scrollTop($(window).height());                   
					videoDataProvenance.src = window.URL.createObjectURL(stream);                   
					videoDataProvenance.play();               
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
	setTimeout(startScanQRDataProvenance(), 1000) ; 
}

function closeQRScanDataProvenance() {
	$("#myModal").modal('hide');
}

function findDataProvenanceByQR(recordID) {
	if(recordID == '-1')
	{
		recordID = document.getElementById("stringData").value;
	}
	else
	{
		$("#myModal").modal('hide');
	}
	//console.log("gainMaterialByQR" + recordID);

	if(recordID.length < 2 ) {
		alert("请确认批次号正确!")
		return;
	}
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
		url: window.serviceIP + "/api/dataprovenance/getprovenancebyorderid?orderID=" + recordID,
		type: "GET",
		processData: false,
		contentType: false,
		//data: formData,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");

				$('#table').bootstrapTable('destroy').bootstrapTable({
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
				alert("数据查找失败！" + dataRes.message);
			}
		}
	});
}