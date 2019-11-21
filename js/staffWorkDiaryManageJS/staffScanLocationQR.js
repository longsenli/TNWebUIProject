function staffScanLocationQRIndustrialPlantSlctFun() {
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
				if(localStorage.getItem('plantID') != null && localStorage.getItem('plantID') != 'undefined' && localStorage.getItem('plantID').toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('plantID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#industrialPlantSlct').selectpicker('hide');
						}
					}
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render'); 
				if(localStorage.roleID < windowRoleID.BZ) {
					$('#industrialPlantSlct').selectpicker('hide');
				}
				staffScanLocationQRProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function staffScanLocationQRProcessSlctFun() {
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
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   

				if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('processID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionProcessSlct').selectpicker('hide');
						}
					}

				}

				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render'); 
				if(localStorage.roleID < windowRoleID.BZ) {
					$('#industrialPlantSlct').selectpicker('hide');
				}

				staffScanLocationQRLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function staffScanLocationQRLineSlctFun() {
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
		url: window.serviceIP + "/api/basicdata/getproductionline",
		type: "POST",
		data: formData,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		async: false,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			$("#productionLineSlct").find('option').remove();
			$('#productionLineSlct').append(("<option value=" + "-1" + ">" + "全部产线"  + "</option>").toString());

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render'); 
				if(localStorage.roleID < windowRoleID.BZ) {
					$('#productionLineSlct').selectpicker('hide'); 
				} 

				staffScanLocationQRWorkContentSlctFun();
				setTimeout(staffScanLocationQRWorkingLocationSlctFun(), 200);;
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function staffScanLocationQRWorkContentSlctFun() {
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());

	$.ajax({
		url: window.serviceIP + "/api/basicdata/getWorkContentDetail",
		type: "POST",
		data: formData,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		async: false,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			$("#workContentSlct").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#workContentSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#workContentSlct').selectpicker('refresh');
				$('#workContentSlct').selectpicker('render'); 

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function confirmStaffAttendanceInfo() {
	var tableData = $("#table").bootstrapTable('getAllSelections');
	if(!tableData || tableData.length < 1) {
		alert("请先选定工人信息再操作!")
		return;
	}

	var recordIDList = "";
	for(var i = 0; i < tableData.length; i++) {
		if(tableData[i].verifierID && tableData[i].verifierID.length < 3) {
			continue;
		}
		recordIDList += tableData[i].id + "___";
	}
	recordIDList = recordIDList.substring(0, recordIDList.length - 3);

	var formData = new FormData();
	formData.append("staffID", localStorage.userID);
	formData.append("staffName", localStorage.username);
	formData.append("recordID", recordIDList);

	$.ajax({
		url: window.serviceIP + "/api/staffWorkDiary/confirmStaffAttendanceInfo?",
		type: "POST",
		processData: false,
		contentType: false,
		data: formData,
		success: function(data) {
			if(data.status == 1) {
				getStaffAttendanceInfo();
				alert('确认成功!');
			} else {
				alert("确认失败！" + data.message);
			}

		}
	});
}

function staffScanLocationQRWorkingLocationSlctFun() {
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	formData.append("lineID", "-1");
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
				for (var  i  in  models)  {  
					$('#workingkLocationSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#workingkLocationSlct').selectpicker('refresh');
				$('#workingkLocationSlct').selectpicker('render');   
				$('#workingkLocationSlct').selectpicker('hide');   
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function scanQRRecordRowClick(row) {
	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}

function getSelfScanLocationQRRecord() {
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
		"title": "厂区",
		"field": "plantID",
		visible: false
	});
	columnsArray.push({
		"title": "流程",
		"field": "processID",
		visible: false
	});
	columnsArray.push({
		"title": "产线",
		"field": "lineID",
		formatter: function(value, row, index) {
			return $("#productionLineSlct option[value='" + value + "']").text();
		}
	});
	if(localStorage.getItem('processID') == windowProcessEnum.JZ || localStorage.getItem('processID') == windowProcessEnum.ZHQD) {
		columnsArray.push({
			"title": "工位",
			"field": "worklocationID",
			formatter: function(value, row, index) {
				return $("#workingkLocationSlct option[value='" + value + "']").text();
			}
		});
	}

	columnsArray.push({
		"title": "姓名",
		"field": "staffName"
	});
	columnsArray.push({
		"title": "日期",
		"field": "dayTime"
	});
	columnsArray.push({
		"title": "白夜班",
		"field": "classType1"
	});
	columnsArray.push({
		"title": "时长",
		"field": "classType2"
	});
	columnsArray.push({
		"title": "上机时间",
		"field": "comeTime"
	});
	columnsArray.push({
		"title": "下机时间",
		"field": "goTime"
	});
	columnsArray.push({
		"title": "确认人",
		"field": "verifierName"
	});
	columnsArray.push({
		"title": "确认时间",
		"field": "verifyTime"
	});

	var formData = new FormData();
	formData.append("plantID", "-1");
	formData.append("processID", "-1");
	formData.append("lineID", "-1");
	formData.append("classType", "-1");
	formData.append("staffID", localStorage.userID);
	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("endTime").value.toString() + " 23:59");

	$.ajax({
		url: window.serviceIP + "/api/staffWorkDiary/getStaffAttendanceInfo",
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
}

function getStaffAttendanceInfo() {
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
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "厂区",
		"field": "plantID",
		visible: false
	});
	columnsArray.push({
		"title": "流程",
		"field": "processID",
		visible: false
	});
	columnsArray.push({
		"title": "产      线",
		"field": "lineID",
		formatter: function(value, row, index) {
			return $("#productionLineSlct option[value='" + value + "']").text();
		}
	});
	if($("#productionProcessSlct").val() == windowProcessEnum.JZ || $("#productionProcessSlct").val() == windowProcessEnum.ZHQD) {
		columnsArray.push({
			"title": "工位",
			"field": "worklocationID",
			formatter: function(value, row, index) {
				return $("#workingkLocationSlct option[value='" + value + "']").text();
			}
		});
	}

	columnsArray.push({
		"title": "岗位",
		"field": "workContent",
		formatter: function(value, row, index) {
			return $("#workContentSlct option[value='" + value + "']").text();
		}
	});
	columnsArray.push({
		"title": "姓    名  ",
		"field": "staffName"
	});
	columnsArray.push({
		"title": "日       期  ",
		"field": "dayTime"
	});
	columnsArray.push({
		"title": "白夜班",
		"field": "classType1"
	});
	columnsArray.push({
		"title": "时 长",
		"field": "classType2"
	});
	columnsArray.push({
		"title": " 上机时间 ",
		"field": "comeTime"
	});
	columnsArray.push({
		"title": "下机时间",
		"field": "goTime"
	});
	columnsArray.push({
		"title": "确认人",
		"field": "verifierName"
	});
	columnsArray.push({
		"title": "确认时间",
		"field": "verifyTime"
	});
	columnsArray.push({
		"title": "确认人ID",
		"field": "verifierID",
		visible: false,
		formatter: function(value, row, index) {
			if(value && value.length > 3) {
				return value + "++";
			} else {
				return "-=";
			}
		}
	});

	var formData = new FormData();
	formData.append("plantID", $("#industrialPlantSlct").val());
	formData.append("processID", $("#productionProcessSlct").val());
	formData.append("lineID", $("#productionLineSlct").val());
	formData.append("classType", $("#classTypeSlct").val());
	formData.append("staffID", "-1");
	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("endTime").value.toString() + " 23:59");

	$.ajax({
		url: window.serviceIP + "/api/staffWorkDiary/getStaffAttendanceInfo",
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
					//singleSelect: true,
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
}

function closeModal(modalName) {
	$("#" + modalName).modal('hide');
}

function beforeProductionScanLocationQR() {

	var formData = new FormData();
	formData.append("qrCode", $("#locationID").val());
	formData.append("staffID", localStorage.userID);
	formData.append("staffName", localStorage.username);
	formData.append("classType1", $("#classType1").val());
	formData.append("classType2", $("#classType2").val());
	formData.append("dayTime", document.getElementById("dayTime").value.toString());
	formData.append("workContent", $("#workContentSlct").val());
	$.ajax({
		url: window.serviceIP + "/api/staffWorkDiary/insertStaffComeAttendanceInfo",
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
				$("#beforeProductionModal").modal('hide');
				getSelfScanLocationQRRecord();
				var locationInfo = dataRes.data.split("___");
				localStorage.setItem('plantID', locationInfo[0].trim());
				localStorage.setItem('processID', locationInfo[1].trim());
				localStorage.setItem('lineID', locationInfo[2].trim());
				localStorage.setItem('workingkLocation', locationInfo[3].trim());

				$('<div>').appendTo('body').addClass('alert alert-success').html('上机成功,祝您工作愉快!').show().delay(3000).fadeOut();

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

function afterProductionScanLocationQR(qrCode) {
	var formData = new FormData();
	formData.append("qrCode", qrCode);
	formData.append("staffID", localStorage.userID);

	$.ajax({
		url: window.serviceIP + "/api/staffWorkDiary/insertStaffGoAttendanceInfo",
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
				getSelfScanLocationQRRecord();
				$('<div>').appendTo('body').addClass('alert alert-success').html('下机成功!今日辛苦了!').show().delay(3000).fadeOut();

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

function deleteRecord(qrCode) {
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}
	if(row[0].verifierName && localStorage.roleID < window.windowRoleID.CJZG) {
		alert("该记录已确认不能删除!若需删除请联系主管删除!");
		return;
	}
	if(row[0].verifierName && localStorage.roleID >= window.windowRoleID.CJZG) {
		if(!window.changeConfirmDlg("确定删除考勤记录?" + row[0].staffName));
		return;
	}
	$.ajax({
		url: window.serviceIP + "/api/staffWorkDiary/deleteStaffAttendanceInfo?id=" + row[0].id,
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		success: function(data) {
			if(data.status == 1) {
				getSelfScanLocationQRRecord();
				alert('删除成功!');
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
}

var accept_webName = null;
//重写scanQR方法
function scanLocationQR(typeScan) {
	//执行H5扫描二维码方法
	openBarcode();
	accept_webName = typeScan;
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

	{
		if(localStorage.workContent && localStorage.workContent.length > 3) {
			var numbers = $('#workContentSlct').find("option"); //获取select下拉框的所有值
			for(var j = 0; j < numbers.length; j++) {
				if($(numbers[j]).val().toString() == localStorage.workContent) {
					$(numbers[j]).attr("selected", "selected");
					$('#workContentSlct').selectpicker('refresh');
					$('#workContentSlct').selectpicker('render'); 
					break;
				}
			}
		}
		$("#locationID").val(qrCode);
		$('#classType2').selectpicker('val', "全班");
		$('#classType2').selectpicker('refresh');
		$('#classType2').selectpicker('render'); 

		var today = new Date();

		if(today.getHours() > 5 && today.getHours() < 17) {
			$('#classType1').selectpicker('val', "白班");
		} else {
			$('#classType1').selectpicker('val', "夜班");
		}

		$('#classType1').selectpicker('refresh');
		$('#classType1').selectpicker('render'); 

		document.getElementById("dayTime").value = today.format("yyyy-MM-dd");
		$("#beforeProductionModal").modal('show');
	} else if(webName == '2')
		afterProductionScanLocationQR(qrCode);
}