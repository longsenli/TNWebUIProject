function SelectProductinLineFun(){
				getWorkOrder();
};
function getWorkOrder() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "工单号",
		"field": "orderid"
	});
	columnsArray.push({
		"title": "产线",
		"field": "lineid"
	});
	columnsArray.push({
		"title": "状态",
		"field": "status"
	});
	columnsArray.push({
		"title": "批次数量",
		"field": "batchnum"
	});
		columnsArray.push({
		"title": "总产量",
		"field": "totalproduction"
	});
		columnsArray.push({
		"title": "报废数量",
		"field": "scrapnum"
	});
		columnsArray.push({
		"title": "输出产物",
		"field": "materialid"
	});
		columnsArray.push({
		"title": "计划开始时间",
		"field": "scheduledstarttime"
	});
		columnsArray.push({
		"title": "计划结束时间",
		"field": "scheduledendtime"
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
		"title": "结束人员",
		"field": "finishstaff",
		visible: false
	});
	$.ajax({
		url: window.serviceIP + "/api/order/getworkorder" ,
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

function selectedWorkOrderRow(param) {

	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "workorder_add") {

		$("#workOrderManageForm" + " #plantid"  ).attr("value",document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
		$("#workOrderManageForm" + " #processid"  ).attr("value",document.PlantToLineSelectForm.productionProcessSlct.value.toString());
		$("#workOrderManageForm" + " #lineid"  ).attr("value",document.PlantToLineSelectForm.productionLineSlct.value.toString());

		$('#myModal').modal('show');
	} else if(optionType == "workorder_edit") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}

		for(var key in row[0]) {
			if(key == 0) {
				continue;
			}
			$("#workOrderManageForm" + " #" + key).attr("value", row[0][key]);
		}

		$('#myModal').modal('show');
	} else if(optionType == "workorder_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteWorkOrder(row[0]["id"]);
	}
};

function deleteWorkOrder(orderid){
	
}
function saveChange()
{
	var formData = new FormData($("#workOrderManageForm")[0]);
	console.log(formData);
	console.log(window.getFormDataToJson(formData));
	$.ajax({
		url: window.serviceIP + "/api/order/changeworkorder",
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
				getWorkOrder();
				$("#myModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}

		}
	});
}
