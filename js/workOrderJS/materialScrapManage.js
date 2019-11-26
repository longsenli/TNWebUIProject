function scrapIndustrialPlantSlctFun(flag) {
	//console.log("test")
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

				if(flag == "1")
					scrapProductionProcessSlctFun();
				else
					scrapProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function scrapProductionProcessSlctFun() {
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
			$("#scrapProcess").find('option').remove();
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
					$('#scrapProcess').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}

				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				$('#scrapProcess').selectpicker('refresh');
				$('#scrapProcess').selectpicker('render');   

				if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('processID')) {
							$(numbers[j]).attr("selected", "selected");

						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render');  
					$('#scrapProcess').selectpicker('refresh');
					$('#scrapProcess').selectpicker('render');  

				}
				scrapProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function scrapProductionLineSlctFun() {
	//	return true;
	//	if(!($.isEmptyObject(first)) && first.toString().length > 1) {
	//
	//		return;
	//	}
	//alert("生产线选择");

	$('#scrapProcess').val($('#productionProcessSlct').val());
	$('#scrapProcess').selectpicker('refresh');
	$('#scrapProcess').selectpicker('render');  

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
		processData: false,
		contentType: false,
		success: function(dataRes) {

			$("#productionLineSlct").find('option').remove();
			$('#productionLineSlct').append(("<option value=" + "-1" + ">" + "全部产线"  + "</option>").toString());

			$("#lineID").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
					$('#lineID').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   

				$('#lineID').selectpicker('refresh');
				$('#lineID').selectpicker('render');   

				if(localStorage.getItem('lineID') != null && localStorage.getItem('lineID') != 'undefined' && localStorage.getItem('lineID').toString().length > 0) {
					var numbers = $('#productionLineSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('lineID')) {
							$(numbers[j]).attr("selected", "selected");
							//	$('#productionLineSlct').selectpicker('hide');

							//	$("#productionLineLabel").css("display", "none");
						}
					}
					$('#productionLineSlct').selectpicker('refresh');
					$('#productionLineSlct').selectpicker('render'); 

				}

				// $('#productionLineSlct').selectpicker('mobile');
				scrapSelectScrapInfo();
			} else {
				alert("初始化产线数据失败！" + dataRes.message);
			}
		}
	});
};

function scrapSelectScrapInfo() {
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
		"title": "日期",
		"field": "productDay",
		formatter: function(value, row, index) {
			//console.log(value);
			if(value) {
				return value.split(' ')[0];
			}
		}
	});
	columnsArray.push({
		width: 300,
		"title": "产线",
		"field": "lineID",
		formatter: function(value, row, index) {
			return $("#productionLineSlct option[value='" + row.lineID + "']").text();
		}
	});
	columnsArray.push({
		"title": "班次",
		"field": "classType"
	});
	columnsArray.push({
		"title": "物料",
		"field": "materialName"
	});
	columnsArray.push({
		"title": "报废数量",
		"field": "value"
	});
	columnsArray.push({
		"title": "确认人",
		"field": "updateStaff"
	});
	columnsArray.push({
		"title": "登记日期",
		"field": "updateTime"
	});
	columnsArray.push({
		"title": "备注",
		"field": "remark"
	});
	var urlStr = window.serviceIP + "/api/scrapinfo/getMaterialScrapRecord?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString() +
		"&scrapSelectType=" + document.PlantToLineSelectForm.scrapSelectType.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + "&endTime=" + document.getElementById("endTime").value;

	$.ajax({
		url: urlStr,
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
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar',
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
}

function createScrapModel(type) {

	$('#lineID').selectpicker('refresh');
	$('#lineID').selectpicker('render'); 

	$('#classType').selectpicker('refresh');
	$('#classType').selectpicker('render'); 

	$('#operateType').val(type);
	$("#myModalLabel").html(type + "登记");
	var today = new Date();
	if(today.getHours() < 7) {
		today.setDate(today.getDate() - 1);
		document.getElementById("productDate").value = today.format("yyyy-MM-dd");
		$('#classType').selectpicker('val', '夜班');
		$('#classType').selectpicker('refresh');
		$('#classType').selectpicker('render');
	} else if(today.getHours() > 18) {
		document.getElementById("productDate").value = today.format("yyyy-MM-dd");
		$('#classType').selectpicker('val', '夜班');
		$('#classType').selectpicker('refresh');
		$('#classType').selectpicker('render');
	} else {
		document.getElementById("productDate").value = today.format("yyyy-MM-dd");
		$('#classType').selectpicker('val', '白班');
		$('#classType').selectpicker('refresh');
		$('#classType').selectpicker('render');
	}

	//	var numbers = $('#lineid').find("option"); //获取select下拉框的所有值
	//	for(var j = 0; j < numbers.length; j++) {
	//		if($(numbers[j]).val().toString() == document.PlantToLineSelectForm.productionLineSlct.value.toString()) {
	//			$(numbers[j]).attr("selected", "selected");
	//			break;
	//		}
	//	}
	if('-1' != document.PlantToLineSelectForm.productionLineSlct.value.toString()) {
		$('#lineID').selectpicker('val', document.PlantToLineSelectForm.productionLineSlct.value.toString());
		$('#lineID').selectpicker('refresh');
		$('#lineID').selectpicker('render'); 
	}

	$('#scrapModal').modal('show');
	changeMaterialInfo();
}

function changeMaterialInfo() {

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	formData.append("lineID", document.getElementById("lineID").value);
	formData.append("productDate", document.getElementById("productDate").value);
	formData.append("classType", document.getElementById("classType").value);

	$.ajax({
		url: window.serviceIP + "/api/scrapinfo/getUsedMaterialInfo",
		type: "POST",
		data: formData,
		//contentType: "application/json",
		//dataType: "json",
		headers: {
			Token: localStorage.getItem('token')
		},
		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			var htmlInner = "";

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				var labelStyle = "";
				var textStyle = "";
				//labelStyle = " style=\"font-size:36px\" ";
				//textStyle = " style=\"font-size:36px;height: 80px;\" ";

				for (var  i  in  models)  {  
					htmlInner += "<label " + labelStyle + " >" + models[i].name + "</label>" + "<input type=\"text\" class=\"form-control\" " + textStyle +
						" onkeyup=\"value=value.replace(/[^0-9|^.]/g,'')\" id=\"" + models[i].id + "###" + models[i].name + "\" name=\"" + models[i].id +
						"###" + models[i].name + "\"    placeholder=\"请输入报废数量\">";
				}
			} else {
				alert("获取物料信息失败！" + dataRes.message);
			}
			//console.log(htmlInner);
			document.getElementById("scrapContent").innerHTML = htmlInner;
		}
	});
}

function saveScrap() {
	var formDataMap = window.formToObject($("#scrapModalForm"));
	formDataMap["plantID"] = document.PlantToLineSelectForm.industrialPlantSlct.value.toString();
	formDataMap["processID"] = document.PlantToLineSelectForm.productionProcessSlct.value.toString();
	formDataMap["updateStaff"] = localStorage.username;

	//console.log(window.getFormDataToJson(formData));
	$.ajax({
		url: window.serviceIP + "/api/scrapinfo/saveMaterialScrapRecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		data: JSON.stringify(formDataMap).toString(),
		headers: {
			Token: localStorage.getItem('token')
		},
		success: function(data) {
			if(data.status == 1) {
				scrapSelectScrapInfo();
				alert('保存成功!');
				$("#scrapModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
}

function deleteSrapRecord() {

	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	if(row.length < 1) {
		alert("请选择行数据!");
		return;
	}
	if(row.length > 1) {
		alert("一次只能选择一条记录!您当前选择" + row.length + "条记录!");
		return;
	}

	var formData = new FormData();
	formData.append("id", row[0].id);
	$.ajax({
		url: window.serviceIP + "/api/scrapinfo/deleteMaterialScrapRecord",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		headers: {
			Token: localStorage.getItem('token')
		},
		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				scrapSelectScrapInfo();
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};

//重写scanQR方法
function scanQRBottomScrap() {
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
	recognitionQR(r);

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

function recognitionQR(qrCode) {
	$('#batteryBottomQRCode').val(qrCode);
	$('#repairReasonModal').modal('show');
}

function closeModal(modalName) {
	$("#" + modalName).modal('hide');
}

function saveBatteryQRScrap() {
	var formData = new FormData();
	formData.append("id", $('#batteryBottomQRCode').val());
	formData.append("scrapProcess", $('#scrapProcess').val());
	formData.append("repairReason", $('#repairReason').val());
	formData.append("updateStaff", localStorage.username);
	formData.append("updateStaffID", localStorage.userID);
	formData.append("scrapPlant", localStorage.plantID);
	$.ajax({
		url: window.serviceIP + "/api/scrapinfo/scrapByBatteryQrcode",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		headers: {
			Token: localStorage.getItem('token')
		},
		success: function(data) {
			if(data.status == 1) {
				alert('登记成功!');
				$("#repairReasonModal").modal('hide');
				scrapSelectScrapInfo();
			} else {
				alert("登记失败！" + data.message);
			}
		}
	});
}