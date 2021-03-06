function onlineMaterialIndustrialPlantSlctFun(flag) {
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

				if(flag = "1")
					onlineMaterialProductionProcessSlctFun();
				else
					onlineMaterialProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function onlineMaterialProductionProcessSlctFun() {
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
				// $('#productionProcessSlct').selectpicker('mobile');

				if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('processID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionProcessSlct').selectpicker('hide');

							$("#productionProcessLabel").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 

				}

				onlineMaterialProductionLineSlctFun();

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function onlineMaterialProductionLineSlctFun() {
	//	return true;
	//	if(!($.isEmptyObject(first)) && first.toString().length > 1) {
	//
	//		return;
	//	}
	//alert(document.PlantToLineSelectForm.industrialPlantSlct.value.toString().split("###")[0]);
	onlineMaterialMaterialSlct();
	if(document.PlantToLineSelectForm.productionProcessSlct.value.toString() == windowProcessEnum.ZH) {
		$("#onlineMaterial_merge").html("合并入库");
	} else if(document.PlantToLineSelectForm.productionProcessSlct.value.toString() == windowProcessEnum.JS) {
		$("#onlineMaterial_merge").html("统一送维");
	} else {
		$("#onlineMaterial_merge").html("合并记录");
	}
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
				// $('#productionLineSlct').selectpicker('mobile');

				$('#lineid').selectpicker('refresh');
				$('#lineid').selectpicker('render');   
				$('#lineid').selectpicker('mobile');

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
				getOnlineMaterial();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getOnlineMaterial() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});

	columnsArray.push({
		width: 150,
		"title": "产线",
		"field": "lineid",
		visible: false
	});
	columnsArray.push({
		width: 150,
		"title": "产线",
		"field": "lineName",
		formatter: function(value, row, index) {
			return $("#productionLineSlct option[value='" + row.lineid + "']").text();
		}
	});
	columnsArray.push({
		width: 200,
		"title": "输出产物",
		"field": "materialid",
		visible: false
	});
	columnsArray.push({
		width: 200,
		"title": "输出产物",
		"field": "materialName",
		formatter: function(value, row, index) {
			return $("#materialid option[value='" + row.materialid + "']").text();
		}
	});
	columnsArray.push({
		width: 100,
		"title": "数量",
		"field": "materialnum"
	});
	columnsArray.push({
		width: 300,
		"title": "状态",
		"field": "status",
		formatter: function(value, row, index) {
			if(row.status == '1') {
				return '在现场';
			}
			if(row.status == '2') {
				return '已合并';
			}
			if(row.status == '3') {
				return '合并记录';
			}
		}
	});

	columnsArray.push({
		width: 300,
		"title": "登记时间",
		"field": "updatetime"
	});
	columnsArray.push({
		width: 100,
		"title": "登记人员",
		"field": "operator"
	});

	columnsArray.push({
		width: 200,
		"title": "输出产物",
		"field": "materialid",
		visible: false
	});

	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "plantid",
		"field": "plantid",
		visible: false
	});
	columnsArray.push({
		"title": "processid",
		"field": "processid",
		visible: false
	});

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	formData.append("startTime", document.getElementById("startTime").value);
	formData.append("endTime", document.getElementById("endTime").value + " 23:59:59");

	$.ajax({
		url: window.serviceIP + "/api/order/getonlinematerialrecord",
		type: "POST",
		data: formData,
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		cache: false, //不需要缓存
		processData: false,
		contentType: false,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");

				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar1',
					singleSelect: false,
					clickToSelect: true,
					striped: true,
					sortName: "recordTime",
					sortOrder: "desc",
					pageSize: 15,
					pageNumber: 1,
					pageList: "[15, 30, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					search: true,
					//					fixedColumns: true, //固定列
					//					fixedNumber: 1, //固定前两列
					pagination: true,
					columns: columnsArray
					//					onClickRow: function(row) {
					//						onlineMaterialSelectedRow = row;
					//					}
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

};

function onlineMaterialMaterialSlct() {

	var urlStr = window.serviceIP + "/api/basicdata/getmaterialbyprocess?processID=" +
		document.PlantToLineSelectForm.productionProcessSlct.value.toString() + 
		"&plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString();
	if(document.PlantToLineSelectForm.productionProcessSlct.value.toString() == window.windowProcessEnum.JS) {
		urlStr = window.serviceIP + "/api/basicdata/getmaterialbyprocess?processID=" +
		window.windowProcessEnum.ZH + 
		"&plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString();
	}
	$.ajax({
		url: urlStr,
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

			$("#materialid").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#materialid').append(("<option style='margin-top: 5px;font-size: 18px;' value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#materialid').selectpicker('refresh');
				$('#materialid').selectpicker('render');   
				// $('#materialid').selectpicker('mobile');

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
};

function selectedOnlineMaterialRow(param) {
	//使用getSelections即可获得，row是json格式的数据
	//	var row1 = $.map($('#table').bootstrapTable('getSelections'), function(row) {
	//		return row;
	//	});
	var optionType = param.getAttribute("id");
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	$('#lineid').selectpicker('refresh');
	$('#lineid').selectpicker('render');   
	// $('#lineid').selectpicker('mobile');
	$('#materialid').selectpicker('refresh');
	$('#materialid').selectpicker('render');   
	// $('#materialid').selectpicker('mobile');
	if(optionType == "onlineMaterial_add") {

		$("#onlineMaterialModalForm" + " #plantid").val(document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
		$("#onlineMaterialModalForm" + " #processid").val(document.PlantToLineSelectForm.productionProcessSlct.value.toString());

		$('#onlineMaterialModal').modal('show');
	} else if(optionType == "onlineMaterial_merge") {
		if(row == null || row == 'undefined' || row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		mergeRecordIDList = '';
		sumMergeNumber = 0;
		for(var i = 0; i < row.length; i++) {
			if(row[i].status != '1') {
				alert('有记录已经入库,请确认,' + row[i].updatetime);
				return;
			}
			sumMergeNumber += row[i].materialnum;
			mergeRecordIDList += row[i].id + ',';
		}
		//		if(!window.changeConfirmDlg("是否合并" + row.length + "条记录,总产量为:" + sumMergeNumber)) {
		//			return;
		//		}
		$("#mergeMaterialName").val($("#materialid option[value='" + row[0].materialid + "']").text());
		$("#inputNumber").val(sumMergeNumber);
		mergeRecordIDList = mergeRecordIDList.substr(0, mergeRecordIDList.length - 1);
		$('#mergeNumberInput').modal('show');
		//mergeOnlineMaterialReocrd(mergeRecordIDList);
	} else if(optionType == "onlineMaterial_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		if(row.length > 1) {
			alert("每次只能选择一行处理,当前选择行数为:" + row.length);
			return;
		}

		if(row[0]["status"] != '1') {
			alert("该记录已经处理,不能被删除!");
			return;
		}
		deleteonlineMaterial(row[0]["id"]);
	}
};

function deleteonlineMaterial(id) {

	$.ajax({
		url: window.serviceIP + "/api/order/deleteonlinematerialrecord?id=" + id,
		type: "GET",
		contentType: "application/json",
		dataType: "json",

		//data: window.getFormDataToJson(formData),
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(data) {
			if(data.status == 1) {

				getOnlineMaterial();
				alert('删除成功!');
			} else {
				alert("删除失败!" + data.message);
			}
		}
	});
}

var mergeRecordIDList = "";
var sumMergeNumber = 0;

function mergeOnlineMaterialReocrd(mergeID) {

	//	if(isNaN(parseInt($("#materialnum").val())) || parseInt($("#materialnum").val()) < 1) {
	//		alert("请正确输入数量!");
	//		return;
	//	}
	//	var formMap = window.formToObject($("#onlineMaterialModalForm"));
	//	formMap["operator"] = localStorage.getItem('username');
	if(!mergeID && mergeRecordIDList.length > 2) {
		mergeID = mergeRecordIDList;

	} else {
		alert("请先选择处理的记录!");
		return;
	}

	if(isNaN(parseInt($("#inputNumber").val()))) {
		alert("请正确输入入库数量,当前输入不是数值!");
		return;
	}
	var inputNumber = parseInt($("#inputNumber").val());
	if(inputNumber > sumMergeNumber) {
		alert("请正确输入入库数量,不能大于当前线边仓数量!");
		return;
	}
	
	
	$("#onlineMaterial_merge").attr("disabled", false);
	$.ajax({
		url: window.serviceIP + "/api/order/mergeonlinematerialrecord?mergeID=" + mergeID + "&operator=" + localStorage.getItem('username') +
			"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() + "&inputNumber=" +inputNumber ,
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		//data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('保存成功!');
				closeInputNumber();
	
				getOnlineMaterial();

			} else {
				alert("保存失败！" + data.message);
			}
			$("#onlineMaterial_merge").attr("disabled", false);
		}
	});
};

function printOnlineMaterialReocrd() {

	var selectRow = $("#table").bootstrapTable('getSelections');
	for(var i = 0; i < selectRow.length; i++) {
		
		if(selectRow[i].status != '3')
			continue;
		var orderLength = selectRow[i].id.length;
		var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
		LODOP.PRINT_INIT("打印任务名"); //首先一个初始化语句
		//LODOP.ADD_PRINT_BARCODE(0,0,200,100,"Code39","*123ABC4567890*");
		LODOP.ADD_PRINT_BARCODE(20, 20, 100, 100, "QRCode", selectRow[i].id);

		LODOP.ADD_PRINT_TEXT(140, 5, 160, 50, selectRow[i].id); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		LODOP.ADD_PRINT_TEXT(10, 160, 130, 20, "日期: ");
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);
		LODOP.ADD_PRINT_TEXT(30, 160, 130, 40, selectRow[i].id.substr(orderLength - 12, 4) + "年" +
			selectRow[i].id.substr(orderLength - 8, 2) + "月" + selectRow[i].id.substr(orderLength - 6, 2) + "日"); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		LODOP.ADD_PRINT_TEXT(70, 160, 130, 100,$("#materialid option[value='" + selectRow[i].materialid + "']").text() + " * " + selectRow[i].materialnum); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		//LODOP.ADD_PRINT_HTM(5, 5, 200, 200, document.getElementById("QRImage")) //增加超文本项
		//LODOP.PREVIEW();
		LODOP.PRINT(); //最后一个打印(或预览、维护、设计)语句
	}
};

function saveOnlineMaterialReocrd() {

	if(isNaN(parseInt($("#materialnum").val())) || parseInt($("#materialnum").val()) < 1) {
		alert("请正确输入数量!");
		return;
	}
	var formMap = window.formToObject($("#onlineMaterialModalForm"));
	formMap["operator"] = localStorage.getItem('username');
	$("#saveOnlineMaterialRecordBT").attr("disabled", true);
	$.ajax({
		url: window.serviceIP + "/api/order/changeonlinematerialrecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('保存成功!');
				$("#onlineMaterialModal").modal('hide');
				getOnlineMaterial();
			} else {
				alert("保存失败！" + data.message);
			}
			$("#saveOnlineMaterialRecordBT").attr("disabled", false);
		}
	});
};

var onlineMaterialSelectedRow;

function onlineMaterialRowClick(row) {

	//$('.changeTableRowColor').removeClass('changeTableRowColor');
	//$(row).addClass('changeTableRowColor');
	//$($(row).find("td")[0]).addClass('changeTableRowColor');
}

function closeOnlineMaterialModal() {
	$("#onlineMaterialModal").modal('hide');
}

function closeInputNumber() {
	$("#mergeNumberInput").modal('hide');
	mergeRecordIDList = "";
	sumMergeNumber = 0;
}
