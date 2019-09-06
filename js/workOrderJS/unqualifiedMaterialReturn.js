function unqualifiedMaterialReturnIndustrialPlantSlctFun(flag) {
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
				
				if(flag = "1")
					unqualifiedMaterialReturnProductionProcessSlctFun();
				else
					unqualifiedMaterialReturnProductionLineSlctFun();
			} else {
				alert("初始化厂区数据失败！" + dataRes.message);
			}
		}
	});
};

function unqualifiedMaterialReturnProductionProcessSlctFun() {
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
				// $('#productionProcessSlct').selectpicker('mobile');
				
					if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString().split("###")[0] == localStorage.getItem('processID')) {
							$(numbers[j]).attr("selected", "selected");
							//$('#productionProcessSlct').selectpicker('hide');

							//$("#productionProcessLabel").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 

				}
					
				unqualifiedMaterialReturnProductionLineSlctFun();
			} else {
				alert("初始化流程数据失败！" + dataRes.message);
			}
		}
	});
};

function unqualifiedMaterialReturnProductionLineSlctFun() {
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
		//			Token: $.cookie('token')
		//		},
		//processData: true,
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
				// $('#productionLineSlct').selectpicker('mobile');
				//unqualifiedMaterialReturnSelect();
			} else {
				alert("初始化产线数据失败！" + dataRes.message);
			}
		}
	});
};

function unqualifiedMaterialReturnSelect() {
	$('#ordertable').bootstrapTable('destroy');
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
//	columnsArray.push({
//		"title": "厂区",
//		"field": "inputPlantID",
//		formatter: function(value, row, index) {
//			return $("#industrialPlantSlct option[value='" + row.inputPlantID + "']").text();
//		}
//	});
//	columnsArray.push({
//		"title": "流程",
//		"field": "inputProcessID",
//		formatter: function(value, row, index) {
//			return $("#productionProcessSlct option[value='" + row.inputProcessID + "']").text();
//		}
//	});
	columnsArray.push({
		"title": "产线",
		"field": "inputLineID",
		formatter: function(value, row, index) {
			return $("#productionLineSlct option[value='" + row.inputLineID + "']").text();
		}
	});
	columnsArray.push({
		"title": "生产员工",
		"field": "inputer"
	});
	columnsArray.push({
		"title": "物料",
		"field": "materialName"
	});
	columnsArray.push({
		"title": "退返数量",
		"field": "materialNumber"
	});
	columnsArray.push({
		"title": "退返员工",
		"field": "returner"
	});
	columnsArray.push({
		"title": "退返日期",
		"field": "returnTime",
		formatter: function(value, row, index) {
			if(value) {
				return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			}
		}
	});
	
		columnsArray.push({
		"title": "维修入库",
		"field": "repairNumber"
	});
	columnsArray.push({
		"title": "维修入库时间",
		"field": "repairTime",
		formatter: function(value, row, index) {
			if(value) {
				return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			}
		}
	});
	
	var urlStr = window.serviceIP + "/api/material/getunqualifiedmaterialreturn?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + "&endTime=" + document.getElementById("endTime").value;

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
				$('#ordertable').bootstrapTable('destroy');
				$('#returntable').bootstrapTable('destroy').bootstrapTable({
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

function getOrderInfoDetail(recordID) {
	$('#returntable').bootstrapTable('destroy');
	if(!recordID)
		recordID = $('#subOrderName').val().trim();
	if(recordID.length < 2) {
		alert("请确认订单!")
		return;
	}

	var columnsArray = [];
	columnsArray.push({
		checkbox: true,
		formatter: function(value, row, index) {

			if(index == 0) {
				//$("#changeOrderProductionNum").val(row.productionnum);
				return {
					checked: true //设置选中
				};
			}
		}
	});
	columnsArray.push({
		"title": "工单号",
		"field": "subOrderID"
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialNameInfo"
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
		"field": "inputTime",
		formatter: function(value, row, index) {
			if(value) {
				return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			}

		}
	});
	columnsArray.push({
		"title": "出库人员",
		"field": "outputer"
	});
	columnsArray.push({
		"title": "出库时间",
		"field": "outputTime",
		formatter: function(value, row, index) {
			if(value) {
				return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			}
		}
	});
	columnsArray.push({
		"title": "投入工单",
		"field": "expendOrderID"
	});

	$.ajax({
		url: window.serviceIP + "/api/material/getmaterialrecorddetailbysuborderid?subOrderID=" + recordID,
		type: "GET",
		processData: true,
		contentType: "application/json",
		dataType: "json",
		//data: formData,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");

				if(models.length < 1) {
					alert("未获取到物料信息,请核对!" + recordID);
					return;
				}
				$('#returntable').bootstrapTable('destroy');
				$('#ordertable').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#usableMaterialTableToolbar',
					toolbarAlign: "left",
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
					search: false,
					searchAlign: 'left',
					pagination: true,
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function unqualifiedMaterialReturnDeleteReturnRecord() {
	//	return true;
	//	if(!($.isEmptyObject(first)) && first.toString().length > 1) {
	//
	//		return;
	//	}
	//alert("生产线选择");

	var selectRow = $.map($('#returntable').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(selectRow.length != 1 || $("#returntable").bootstrapTable('getVisibleColumns').length < 4) {
		alert("请选择行数据!");
		return;
	}

	$.ajax({
		url: window.serviceIP + "/api/material/deleteunqualifiedmaterialreturn?id=" + selectRow[0].id,
		type: "POST",
		//data: JSON.stringify(returnRecord).toString(),
		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,

		success: function(dataRes) {

			if(dataRes.status == 1) { 
				unqualifiedMaterialReturnSelect();
				alert("删除成功！");
			} else {
				alert("删除失败！" + dataRes.message);
			}
		}
	});
};

function unqualifiedMaterialReturnRowClick(row) {
	$('.changeTableRowColor').removeClass('changeTableRowColor');
	//alert($(row).find("td:eq(0)")[0].checked);
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
	//	if($(row).find("td:eq")[0])
	//	$(row).addClass('changeTableRowColor');
	//	$($(row).find("td")[1]).addClass('changeTableRowColor');
	//	$(row).find("td").addClass('changeTableRowColor');
}

function unqualifiedMaterialReturnAddReturnRecord() {
	//	return true;
	//	if(!($.isEmptyObject(first)) && first.toString().length > 1) {
	//
	//		return;
	//	}
	//alert("生产线选择");
	
	
	if(!$("#unqualifiedMaterialReturnNumber").val()) {
		alert("退返数量无效!");
		return;
	}
	var returnNum = parseFloat($("#unqualifiedMaterialReturnNumber").val());
	//console.log(returnNum);
	if(returnNum <= 0) {
		alert("退返数量必须大于0!");
		return;
	}

	var selectRow = $.map($('#ordertable').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(selectRow.length != 1 || $("#ordertable").bootstrapTable('getVisibleColumns').length < 4) {
		alert("请选择行数据!");
		return;
	}

	//console.log(selectRow[0].number);
	if(returnNum > selectRow[0].number) {
		alert("退返数量不能大于入库数量!");
		return;
	}
	var returnRecord = {};
	//formMap2["jsonStr"] = JSON.stringify(formMap).toString();

	returnRecord["plantID"] = selectRow[0].outputPlantID;
	returnRecord["processID"] = selectRow[0].outputProcessID;
	returnRecord["lineID"] = selectRow[0].outputLineID;
	returnRecord["materialRecordID"] = selectRow[0].id;
	returnRecord["subOrderID"] = selectRow[0].subOrderID;
	returnRecord["materialID"] = selectRow[0].materialID;
	returnRecord["materialName"] = selectRow[0].materialNameInfo;
	returnRecord["inputer"] = selectRow[0].inputer;
	returnRecord["inputerID"] = selectRow[0].inputerID;
	returnRecord["returner"] = localStorage.username;
	returnRecord["returnerID"] = localStorage.userID;
	returnRecord["inputPlantID"] = selectRow[0].inputPlantID;
	returnRecord["inputProcessID"] = selectRow[0].inputProcessID;
	returnRecord["inputLineID"] = selectRow[0].inputLineID;
	returnRecord["materialNumber"] = $("#unqualifiedMaterialReturnNumber").val();

	$.ajax({
		url: window.serviceIP + "/api/material/changeunqualifiedmaterialreturn",
		type: "POST",
		data: JSON.stringify(returnRecord).toString(),
		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,

		success: function(dataRes) {

			if(dataRes.status == 1) { 

				alert("添加成功！");
			} else {
				alert("初始化产线数据失败！" + dataRes.message);
			}
		}
	});
};

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
	// alert('t='+t+'r='+r+'f='+f);
	//获取扫描二维码信息
	recognitionQR(accept_webName, r);
	// 					var d = new Date();
	// 					var h=d.getHours(),m=d.getMinutes(),s=d.getSeconds(),ms=d.getMilliseconds();
	// 					if(h < 10){ h='0'+h; }
	// 					if(m < 10){ m='0'+m; }
	// 					if(s < 10){ s='0'+s; }
	// 					if(ms < 10){ ms='00'+ms; }
	// 					else if(ms < 100){ ms='0'+ms; }
	// 					var ts = '['+h+':'+m+':'+s+'.'+ms+']';
	// 					var li=null,hl = document.getElementById('history');
	// 					if(blist.length > 0){
	// 						li = document.createElement('li');
	// 						li.className = 'ditem';
	// 						hl.insertBefore(li, hl.childNodes[0]);
	// 					} else{
	// 						li = document.getElementById('nohistory');
	// 					}
	// 					li.id = blist.length;
	// 					var html = '['+h+':'+m+':'+s+'.'+ms+']'+'　　'+t+'码<div class="hdata">';
	// 					html += r;
	// 					html += '</div>';
	// 					li.innerHTML = html;
	// 					li.setAttribute('onclick', 'selected(id)');
	// 					blist[blist.length] = {type:t,result:r,file:f};
	// 					update(t, r, f);

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
	if(webName == 'materialReturn')
		getOrderInfoDetail(qrCode);
}

function onTextareaKeyDown() {

	if(event.keyCode == 13) { //如果按的是enter键 13是enter 
		event.preventDefault(); //禁止默认事件（默认是换行） 
		var recordID = $('#subOrderName').val().trim();
		
	
	if(recordID.length < 2) {
		//alert("请确认订单!")
		return;
	}
$('#returntable').bootstrapTable('destroy');
	var columnsArray = [];
	columnsArray.push({
		checkbox: true,
		formatter: function(value, row, index) {

			if(index == 0) {
				//$("#changeOrderProductionNum").val(row.productionnum);
				return {
					checked: true //设置选中
				};
			}
		}
	});
	columnsArray.push({
		"title": "工单号",
		"field": "subOrderID"
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialNameInfo"
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
		"field": "inputTime",
		formatter: function(value, row, index) {
			if(value) {
				return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			}

		}
	});
	columnsArray.push({
		"title": "出库人员",
		"field": "outputer"
	});
	columnsArray.push({
		"title": "出库时间",
		"field": "outputTime",
		formatter: function(value, row, index) {
			if(value) {
				return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			}
		}
	});
	columnsArray.push({
		"title": "投入工单",
		"field": "expendOrderID"
	});

	$.ajax({
		url: window.serviceIP + "/api/material/getmaterialrecorddetailbysuborderid?subOrderID=" + recordID,
		type: "GET",
		processData: true,
		contentType: "application/json",
		dataType: "json",
		//data: formData,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");

				if(models.length < 1) {
					alert("未获取到物料信息,请核对!" + recordID);
					return;
				}
				$('#returntable').bootstrapTable('destroy');
				$('#ordertable').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#usableMaterialTableToolbar',
					toolbarAlign: "left",
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
					search: false,
					searchAlign: 'left',
					pagination: true,
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
		$("#subOrderName").val("");
		document.getElementById('subOrderName').focus();
		//console.log($("#orderIDByBatch").val() + "=====huanh123");

	}
}

function addRepairNumber()
{
		var row = $.map($('#returntable').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1 || $("#returntable").bootstrapTable('getVisibleColumns').length < 4) {
		alert("请选择退返记录! " );
		return;
	}
	$("#id").val(row[0].id);
	$("#materialNumber").val(row[0].materialNumber);
	$("#addRepairModal").modal('show');
}

function saveRepairNumberDetail()
{
	if(isNaN($("#repairNumber").val())) {
		alert("输入入库数量不是合法数字!");
		return;
	}
	var materialNum  = parseInt($("#materialNumber").val());
	var repairNum = parseInt($("#repairNumber").val()); 
	if(repairNum > materialNum)
	{
		alert("输入入库数量超过退返数量,请重新输入!");
		return;
	}
	
		$.ajax({
		url: window.serviceIP + "/api/material/unqualifiedMaterialRepair?id=" + $("#id").val() + "&repairNumber=" + $("#repairNumber").val(),
		type: "POST",
		//data: JSON.stringify(returnRecord).toString(),
		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,

		success: function(dataRes) {

			if(dataRes.status == 1) { 
				unqualifiedMaterialReturnSelect();
				$("#addRepairModal").modal('hide');
				alert("修改成功！");
			} else {
				alert("修改失败！" + dataRes.message);
			}
		}
	});
	

}

function closeModal()
{
	$("#addRepairModal").modal('hide');
}
