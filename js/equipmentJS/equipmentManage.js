
function equipMngPlantSlctFun() {
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

			$("#equipMngPlantSlct").find('option').remove();
			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#equipMngPlantSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())

				}
				$('#equipMngPlantSlct').selectpicker('refresh');
				$('#equipMngPlantSlct').selectpicker('render');   
				$('#equipMngPlantSlct').selectpicker('mobile');
				getEquipmentInfoTable();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};
function getEquipmentTypeTable() {

	$.ajax({
		url: window.serviceIP + "/api/basicdata/getequipmenttype",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
	
			$("#equipmentType").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#equipmentType').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#equipmentType').selectpicker('refresh');
				$('#equipmentType').selectpicker('render');   
				$('#equipmentType').selectpicker('mobile');
				getEquipmentInfoTable();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

};
$(function() {
	$('#myModal').on('hide.bs.modal',
		function() {
			document.getElementById("equipmentInfoManageForm").reset();
		})
});


function selectedEquipRow(param) {

	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "equipment_add") {
		$("#equipmentInfoManageForm" + " #typeid"  ).attr("value",document.equipmentSelectForm.equipmentType.value.toString());
		$('#myModal').modal('show');
	} else if(optionType == "equipment_edit") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}

		for(var key in row[0]) {
			if(key == 0) {
				continue;
			}
			$("#equipmentInfoManageForm" + " #" + key).attr("value", row[0][key]);
		}

		$('#myModal').modal('show');
	} else if(optionType == "equipment_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteEquipmentInfo(row[0]["id"]);
	}
}

function getEquipmentInfoTable() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "名称",
		"field": "name"
	});
	columnsArray.push({
		"title": "购买时间",
		"field": "buytime"
	});
	columnsArray.push({
		"title": "厂商",
		"field": "manufacturers"
	});
	columnsArray.push({
		"title": "位置",
		"field": "location"
	});
	columnsArray.push({
		"title": "typeid",
		"field": "typeid",
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
	$.ajax({
		url: window.serviceIP + "/api/equipment/getequipmentinfo?typeID=" + document.equipmentSelectForm.equipmentType.value.toString()
		+"&plantID=" + document.equipmentSelectForm.equipMngPlantSlct.value.toString(),
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
				console.log(models);
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar1',
					singleSelect: true,
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

};

function deleteEquipmentInfo( equipID) {
	alert(equipID);
//	var jsonStr = {};
//	jsonStr.push({
//		"equipID": equipID
//	});
	//JSON.stringify(jsonStr);,
	var formData = new FormData();
	formData.append("equipID", equipID);
	$.ajax({
		url: window.serviceIP + "/api/equipment/deleteequipmentinfo",
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
				getEquipmentInfoTable();
				$("#myModal").modal('hide');
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};

function addEquipmentInfo() {

	var formData = new FormData($("#equipmentInfoManageForm")[0]);
	console.log(formData);
	$.ajax({
		url: window.serviceIP + "/api/equipment/changeequipmentinfo",
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
				getEquipmentInfoTable();
				$("#myModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}

		}
	});
};