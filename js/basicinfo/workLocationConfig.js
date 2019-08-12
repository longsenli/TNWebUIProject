function workLocationPlantSlctFun() {
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

			$("#infoCfgPlantSlct").find('option').remove();
			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#infoCfgPlantSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#infoCfgPlantSlct').selectpicker('refresh');
				$('#infoCfgPlantSlct').selectpicker('render');   
				// $('#infoCfgPlantSlct').selectpicker('mobile');
				workLocationCfgProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function workLocationCfgProcessSlctFun() {
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
			$("#processSlctType").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#processSlctType').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#processSlctType').selectpicker('refresh');
				$('#processSlctType').selectpicker('render');   
				// $('#processSlctType').selectpicker('mobile');
				workLocationLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function workLocationLineSlctFun() {
	var formData = new FormData();
	formData.append("plantID", document.basicInfoCfgSelectForm.infoCfgPlantSlct.value.toString());
	formData.append("processID", document.basicInfoCfgSelectForm.processSlctType.value.toString());
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

			$("#lineSlctType").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#lineSlctType').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#lineSlctType').selectpicker('refresh');
				$('#lineSlctType').selectpicker('render');   
				// $('#lineSlctType').selectpicker('mobile');
				setTimeout(function() {
					workLocationDatatbleFun();
				}, 100);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function workLocationDatatbleFun() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "名称",
		"field": "name"
	});
	columnsArray.push({
		"title": "描述信息",
		"field": "describeinfo"
	});
	columnsArray.push({
		"title": "排列顺序",
		"field": "ordinal"
	});
	columnsArray.push({
		"title": "实际位置",
		"field": "location"
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
	columnsArray.push({
		"title": "lineid",
		"field": "lineid",
		visible: false
	});
	columnsArray.push({
		"title": "updatetime",
		"field": "updatetime",
		visible: false
	});
	columnsArray.push({
		"title": "operator",
		"field": "operator",
		visible: false
	});
	columnsArray.push({
		"title": "status",
		"field": "status",
		visible: false
	});
	var formData = new FormData();
	formData.append("plantID", document.basicInfoCfgSelectForm.infoCfgPlantSlct.value.toString());
	formData.append("processID", document.basicInfoCfgSelectForm.processSlctType.value.toString());
	formData.append("lineID", document.basicInfoCfgSelectForm.lineSlctType.value.toString());
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getworklocation",
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

				var models = eval("(" + dataRes.data + ")");
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar1',
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
					pagination: true,
					columns: columnsArray
				});
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function selectedWorkLocationRow(param) {

	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "workLocation_add") {
		$("#workLocationCfgForm" + " #processid").val(document.basicInfoCfgSelectForm.processSlctType.value.toString());
		$("#workLocationCfgForm" + " #plantid").val(document.basicInfoCfgSelectForm.infoCfgPlantSlct.value.toString());
		$("#workLocationCfgForm" + " #lineid").val(document.basicInfoCfgSelectForm.lineSlctType.value.toString());

		$("#workLocationCfgForm" + " #updatetime").val((new Date()).format("yyyy-MM-dd hh:mm:ss"));
		$("#workLocationCfgForm" + " #operator").val($.cookie('username'));
		$("#workLocationCfgForm" + " #status").val("1");

		$('#myModal').modal('show');
	} else if(optionType == "workLocation_edit") {
		if(row.length != 1) {
			alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
			return;
		}

		for(var key in row[0]) {
			if(key == 0) {
				continue;
			}

			$("#workLocationCfgForm" + " #" + key).val(row[0][key])
			//$("#equipmentInfoManageForm" + " #" + key).attr("value", row[0][key]);
			//$("#equipmentInfoManageForm" + " #" + key).attr("value", row[0][key]);
		}
		$("#workLocationCfgForm" + " #updatetime").val((new Date()).format("yyyy-MM-dd hh:mm:ss"));
		$("#workLocationCfgForm" + " #operator").val($.cookie('username'));
		$("#workLocationCfgForm" + " #status").val("1");

		$('#myModal').modal('show');
	} else if(optionType == "workLocation_delete") {
		if(row.length != 1) {
			alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
			return;
		}

		deleteWorkLocationInfo(row[0]["id"]);
	}
}

function deleteWorkLocationInfo(id) {
	//	alert(equipID);
	//	var jsonStr = {};
	//	jsonStr.push({
	//		"equipID": equipID
	//	});
	//JSON.stringify(jsonStr);,
	var formData = new FormData();
	formData.append("id", id);
	$.ajax({
		url: window.serviceIP + "/api/basicdata/deleteworklocation",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				workLocationDatatbleFun();
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};

function addWorkLocationInfo() {

	var formData = new FormData($("#workLocationCfgForm")[0]);
	$.ajax({
		url: window.serviceIP + "/api/basicdata/changeworklocation",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: window.getFormDataToJson(formData),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('保存成功!');
				workLocationDatatbleFun();
				$("#myModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
};

function printLocation() {
	//createQRCode();
	//	var img = document.getElementById("QRImage"); /// get image element
	//	var canvas = document.getElementsByTagName("canvas")[0]; /// get canvas element
	//	img.src = canvas.toDataURL("image/png"); /// update image

	var selectRow = $("#table").bootstrapTable('getSelections');

	//var arrayObj = new Array();
	for(var i = 0; i < selectRow.length; i++) {
		//console.log("dayin");

		var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
		LODOP.PRINT_INIT("打印任务名"); //首先一个初始化语句
		//LODOP.ADD_PRINT_BARCODE(0,0,200,100,"Code39","*123ABC4567890*");
		LODOP.ADD_PRINT_BARCODE(15, 70, 120, 120, "QRCode", selectRow[i].id);

		LODOP.ADD_PRINT_TEXT(133, 60, 200, 250, selectRow[i].id); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		LODOP.ADD_PRINT_TEXT(152, 60, 200, 250, selectRow[i].name); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);
		//
		//		LODOP.ADD_PRINT_TEXT(10, 160, 130, 20, "日期: ");
		//		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		//		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		//		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);
		//		LODOP.ADD_PRINT_TEXT(30, 160, 130, 40, selectRow[i].batterydate); //增加纯文本项

		//		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		//		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		//		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);
		//
		//		LODOP.ADD_PRINT_TEXT(70, 160, 130, 100, selectRow[i].materialname + " * " + selectRow[i].productionnum); //增加纯文本项
		//		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		//		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		//		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		//LODOP.ADD_PRINT_HTM(5, 5, 200, 200, document.getElementById("QRImage")) //增加超文本项
		//LODOP.PREVIEW();
		LODOP.PRINT(); //最后一个打印(或预览、维护、设计)语句
	}
}