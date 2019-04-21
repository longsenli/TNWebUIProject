function batteryShipmentIndustrialPlantSlctFun(flag) {
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

				if($.cookie('plantID') != null && $.cookie('plantID') != 'undefined' && $.cookie('plantID').toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString().split("###")[0] == $.cookie('plantID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#industrialPlantSlct').selectpicker('hide');

							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#industrialPlantSlct').selectpicker('refresh');
					$('#industrialPlantSlct').selectpicker('render'); 

				}
				batteryShipmentBatteryTypeSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function batteryShipmentBatteryTypeSlctFun() {
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

			$("#materialID").find('option').remove();
			$("#batteryTypeForm").find('option').remove();

			$('#batteryTypeForm').append(("<option value=" + '-1' + ">" + '全部' + "</option>").toString());
			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#materialID').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
					$('#batteryTypeForm').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#materialID').selectpicker('refresh');
				$('#materialID').selectpicker('render');   
				// $('#materialID').selectpicker('mobile');

				$('#batteryTypeForm').selectpicker('refresh');
				$('#batteryTypeForm').selectpicker('render');   
				// $('#batteryTypeForm').selectpicker('mobile');

				getBatteryShipmentRecord();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
};

function selectedBatteryShipmentRow(param) {
	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "batteryShipment_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteBatteryShipmentRecord(row[0]["id"]);
	}
}

function deleteBatteryShipmentRecord(id) {

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/deletebatteryshipmentnumrecord?id=" + id,
		type: "POST",

		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				getBatteryShipmentRecord();
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
}

function addBatteryShipmentRecord() {
	var shipmentNum = 1;

	shipmentNum = $("#materialID").val().toString().trim();

	if($("#materialID").val().toString().trim().length < 1) {
		alert("请正确输入报废数量!");
		return;
	}
	var formData = new FormData($("#batteryShipmentCollapseForm")[0]);
	formData.append("operator", $.cookie('username'));
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("shipmentTime", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("batteryType", $("#materialID").find("option:selected").text());

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/addbatteryshipmentnumrecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: window.getFormDataToJson(formData),
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
				getBatteryShipmentRecord();
				//document.getElementById("scrapBatteryCollapseForm").reset();
				$("#scrapBatteryCollapseForm").collapse('hide');
				alert("添加发货记录成功！");
			} else {
				alert("添加发货记录失败！" + dataRes.message);
			}
		}
	});
};

function getBatteryShipmentRecord() {
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
		"title": "materialid",
		"field": "materialid",
		visible: false
	});
	columnsArray.push({
		"title": "电池型号",
		"field": "batterytype"
	});
	columnsArray.push({
		"title": "厂区",
		"field": "plantid",
		visible: false
	});
	columnsArray.push({
		"title": "发货数量",
		"field": "shipmentnum"
	});
	columnsArray.push({
		"title": "发货时间",
		"field": "shipmenttime"
	});
	columnsArray.push({
		"title": "填报人员",
		"field": "operator"
	});

	$.ajax({
		url: window.serviceIP + "/api/semifinishedbattery/getbatteryshipmentnumrecord?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString()
		 + "&typeID=" + document.PlantToLineSelectForm.batteryTypeForm.value.toString(),
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