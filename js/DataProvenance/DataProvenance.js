

function DataProvenancePlantSlctFun() {
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
			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				$('#industrialPlantSlct').selectpicker('hide');
				DataProvenanceProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function DataProvenanceProcessSlctFun() {
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
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
				}
				
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				$('#productionProcessSlct').selectpicker('hide');
				DataProvenanceLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};


function DataProvenanceLineSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getAllProductionLine",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		success: function(dataRes) {
			$("#productionLineSlct").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
				}
				
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   
				$('#productionLineSlct').selectpicker('hide'); 
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function dataProvenanceFunction(inputString) {
	if(inputString.toString().length > 15) {
		findDataProvenanceByQR(inputString);
	} else {
		dataProvenanceByDCDK(inputString);
	}
}
//电池底壳追溯
function dataProvenanceByDCDK(inputString) {
	if(inputString == '-1') {
		inputString = document.getElementById("stringData").value;
	}
	if(inputString.length < 2) {
		alert("请确认输入正确!")
		return;
	}
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "厂区",
		"field": "inputPlantID",
		formatter: function(value, row, index) {
			if(value)
				return $("#industrialPlantSlct option[value='" + value + "']").text();
			else
				return '-';
		}
	});
	
	columnsArray.push({
		"title": "工序",
		"field": "inputProcessID",
		formatter: function(value, row, index) {
			if(value)
				return $("#productionProcessSlct option[value='" + value + "']").text();
			else
				return '-';
		}
	});
	columnsArray.push({
		"title": "产线",
		"field": "inputLineID",
		formatter: function(value, row, index) {
			if(value)
				return $("#productionLineSlct option[value='" + value + "']").text();
			else
				return '-';
		}
	});
	columnsArray.push({
		"title": "物料工单",
		"field": "subOrderID"
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialNameInfo"
	});

	columnsArray.push({
		"title": "入库人员",
		"field": "inputer"
	});
	columnsArray.push({
		"title": "入库时间",
		"field": "inputTime"
	});
//	columnsArray.push({
//		"title": "固化一段",
//		"field": "GHTime1"
//	});
//	columnsArray.push({
//		"title": "固化二段",
//		"field": "GHTime2"
//	});
//	columnsArray.push({
//		"title": "固化三段",
//		"field": "GHTime3"
//	});
// 
	$.ajax({
		url: window.serviceIP + "/api/dataprovenance/getProvenanceByDCDK?DKQRCode=" + inputString,
		type: "GET",
		processData: false,
		contentType: false,
		//data: formData,
		//		headers: {
		//			Token: localStorage.getItem('token')
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

function findDataProvenanceByQR(recordID) {
	if(recordID == '-1') {
		recordID = document.getElementById("stringData").value;
	}

	if(recordID.length < 2) {
		alert("请确认输入正确!")
		return;
	}
		var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "厂区",
		"field": "inputPlantID",
		formatter: function(value, row, index) {
			if(value)
				return $("#industrialPlantSlct option[value='" + value + "']").text();
			else
				return '-';
		}
	});
	
	columnsArray.push({
		"title": "工序",
		"field": "inputProcessID",
		formatter: function(value, row, index) {
			if(value)
				return $("#productionProcessSlct option[value='" + value + "']").text();
			else
				return '-';
		}
	});
	columnsArray.push({
		"title": "产线",
		"field": "inputLineID",
		formatter: function(value, row, index) {
			if(value)
				return $("#productionLineSlct option[value='" + value + "']").text();
			else
				return '-';
		}
	});
	columnsArray.push({
		"title": "物料工单",
		"field": "subOrderID"
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialNameInfo"
	});

	columnsArray.push({
		"title": "入库人员",
		"field": "inputer"
	});
	columnsArray.push({
		"title": "入库时间",
		"field": "inputTime"
	});
//	columnsArray.push({
//		"title": "固化一段",
//		"field": "GHTime1"
//	});
//	columnsArray.push({
//		"title": "固化二段",
//		"field": "GHTime2"
//	});
//	columnsArray.push({
//		"title": "固化三段",
//		"field": "GHTime3"
//	});
// 
	$.ajax({
		url: window.serviceIP + "/api/dataprovenance/getprovenancebyorderid?orderID=" + recordID,
		type: "GET",
		processData: false,
		contentType: false,
		//data: formData,
		//		headers: {
		//			Token: localStorage.getItem('token')
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

//重写scanQR方法
function scanQR() {
	//执行H5扫描二维码方法
	openBarcode();
}

////////以下是H5+调用摄像头进行扫一扫
// alert(openBarcode())
var img = null;
var blist = [];

function scaned(t, r, f) {
	// alert('t='+t+'r='+r+'f='+f);
	//获取扫描二维码信息
	dataProvenanceFunction(r);
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