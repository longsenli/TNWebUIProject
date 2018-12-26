function getEquipmentTypeTable() {

	$.ajax({
		url: window.serviceIP + "/api/equipment/getequipmenttype",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			console.log(dataRes);
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

function saveChange() {

	$("#myModal").modal('hide');
}

function selectedEquipRow(param)
{

	//使用getSelections即可获得，row是json格式的数据
var row = $.map($('#table').bootstrapTable('getSelections'),function (row) {
    return row;
});

	var optionType = param.getAttribute("id");
	if(optionType == "equipment_add") {
		operateType = "add";
		 $('#myModal').modal('show');
	}  else if(optionType == "equipment_edit") {
		operateType = "edit";
		if(row.length < 1)
		{
			alert("请选择行数据!");
			return;
		}
		console.log(row);
		$('#equipmentInfoManageForm buytime').attr("value","asdfas");
		//document.equipmentInfoManageForm.name = row[0].name;
		 $('#myModal').modal('show');
	}
}


function getEquipmentInfoTable() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "名称",
		"field": "name",
		switchable: true,
		sortable: true
	});
	columnsArray.push({
		"title": "购买时间",
		"field": "buytime",
		switchable: true,
		sortable: true
	});
	columnsArray.push({
		"title": "厂商",
		"field": "manufacturers",
		switchable: true,
		sortable: true
	});
	columnsArray.push({
		"title": "位置",
		"field": "location",
		switchable: true,
		sortable: true
	});
	$.ajax({
		url: window.serviceIP + "/api/equipment/getequipmentinfo?typeID=" + document.equipmentSelectForm.equipmentType.value.toString(),
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