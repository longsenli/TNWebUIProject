function batteryInventoryDetailQueryIndustrialPlantSlctFun() {
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
				//console.log(models);
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id.toString() + ">" +
						models[i].name.toString() + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				// $('#industrialPlantSlct').selectpicker('mobile');
				//				if(localStorage.getItem('plantID') != null && localStorage.getItem('plantID') != 'undefined' && localStorage.getItem('plantID').toString().length > 0) {
				//					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
				//					for(var j = 0; j < numbers.length; j++) {
				//						if($(numbers[j]).val().toString() == localStorage.getItem('plantID')) {
				//							$(numbers[j]).attr("selected", "selected");
				//							$('#industrialPlantSlct').selectpicker('hide');
				//							$("#industrialPlantLabel").css("display", "none");
				//						}
				//					}
				//					$('#industrialPlantSlct').selectpicker('refresh');
				//					$('#industrialPlantSlct').selectpicker('render'); 
				//
				//				}

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function selectInventoryRecord() {

	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialname"
	});
	columnsArray.push({
		"title": "库存数量",
		"field": "currenttotalnum"
	});

	columnsArray.push({
		"title": "整理台电池",
		"field": "ontidyingnum"
	});

	columnsArray.push({
		"title": "待返充电池",
		"field": "backchargenum"
	});
	columnsArray.push({
		"title": "打堆数量",
		"field": "piletotalnum"
	});
	columnsArray.push({
		"title": "当日下架",
		"field": "pulloffnum"
	});
	columnsArray.push({
		"title": "新增打堆数量",
		"field": "pipenewnum"
	});
	columnsArray.push({
		"title": "包装数量",
		"field": "packagenewnum"
	});
	columnsArray.push({
		"title": "送维数量",
		"field": "repairnewnum"
	});
	columnsArray.push({
		"title": "返充数量",
		"field": "putonnum"
	});
	columnsArray.push({
		"title": "备注",
		"field": "remark"
	});

	columnsArray.push({
		"title": "盘点时间",
		"field": "checktime"
	});

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());

	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");

	$.ajax({
		url: window.serviceIP + "/api/chargepack/getbatteryinventoryrecord",
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

				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
					toolbarAlign: 'left',
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
					search: true,
					searchAlign: 'right',
					pagination: true,
					columns: columnsArray
				});

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
};

function batteryInventoryDetailQueryRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}

var accept_webName = null;
//重写scanQR方法
function scanQR(webName) {
	//执行H5扫描二维码方法
	openBarcode();
	accept_webName = webName;
}

////////以下是H5+调用摄像头进行扫一扫
// alert(openBarcode())
var img = null;
var blist = [];

function scaned(t, r, f) {
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

	if(webName == 'chargingRackID')
		workLocationChangeByQR(qrCode);
}

function workLocationChangeByQR(qrCode) {
	var selected = false;

	$('#workingkLocationSlct').selectpicker('val', qrCode);
	$('#workingkLocationSlct').selectpicker('refresh');
	$('#workingkLocationSlct').selectpicker('render'); 
	getOnRackRecord('onRack');
}

function changeRecord()
{
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}
	
	for(var key in row[0]) {
			
			if(key == 0) {
				continue;
			}
			
			$("#inventoryRecordForm" + " #" + key).val(row[0][key]);
		}

		$('#inventoryRecordModal').modal('show');
}
function closeModal()
{
	$('#inventoryRecordModal').modal('hide');
}
function saveInventoryRecord()
{
	var formMap = window.formToObject($("#inventoryRecordForm"));
	$.ajax({
		url: window.serviceIP + "/api/chargepack/changeBatteryInventoryRecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				selectInventoryRecord();
				alert('保存成功!');
				closeModal();
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});

}
