function workOrderIndustrialPlantSlctFun() {
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
			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())

				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				$('#industrialPlantSlct').selectpicker('mobile');
				workOrderProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function workOrderProductionProcessSlctFun() {
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
					$('#productionProcessSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				$('#productionProcessSlct').selectpicker('mobile');
				workOrderProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};
function workOrderProductionLineSlctFun(){
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

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   
				$('#productionLineSlct').selectpicker('mobile');
				getWorkOrder();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getWorkOrder(){
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		 width:300,
		"title": "工单号",
		"field": "orderid"
	});
	columnsArray.push({
		width:300,
		"title": "产线",
		"field": "lineid"
	});
	columnsArray.push({
		width:300,
		"title": "状态",
		"field": "status"
	});
	columnsArray.push({
		width:300,
		"title": "批次数量",
		"field": "batchnum"
	});
	columnsArray.push({
		width:300,
		"title": "总产量",
		"field": "totalproduction"
	});
	columnsArray.push({
		width:300,
		"title": "报废数量",
		"field": "scrapnum"
	});
	columnsArray.push({
		width:300,
		"title": "输出产物",
		"field": "materialid"
	});
	columnsArray.push({
		width:300,
		"title": "计划开始时间",
		"field": "scheduledstarttime"
	});
	columnsArray.push({
		width:300,
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
		url: window.serviceIP + "/api/order/getworkorder",
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
					fixedColumns: true,//固定列
        			fixedNumber:2,//固定前两列
					pagination: true,
					columns: columnsArray,
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

};


function setLineModal() {
	$("#lineWorkOrderModal").find('option').remove();

	$("#productionLineSlct option").each(function() {
		$('#lineWorkOrderModal').append(("<option value=" + $(this).val() + ">" + $(this).text()  + "</option>").toString());

	})
	$('#lineWorkOrderModal').selectpicker('refresh');
	$('#lineWorkOrderModal').selectpicker('render');  
};

    
 
 
   
function selectedWorkOrderRow(param) {

	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	setLineModal();
	var optionType = param.getAttribute("id");
	if(optionType == "workorder_add") {
		//document.getElementById("workOrderManageForm").reset();
		$("#workOrderManageForm" + " #orderid").val( document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
		$("#workOrderManageForm" + " #plantid").val( document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
		$("#workOrderManageForm" + " #processid").val( document.PlantToLineSelectForm.productionProcessSlct.value.toString());
		$("#workOrderManageForm" + " #lineid").val( document.PlantToLineSelectForm.productionLineSlct.value.toString());

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
			if(key == "scheduledstarttime") {
				$("#workOrderManageForm" + " #" + key).val( window.stringToDatetimeLocalType(row[0][key]));
				continue;
			}
			$("#workOrderManageForm" + " #" + key).val(row[0][key]);
			//$("#workOrderManageForm" + " #" + key).attr("value", row[0][key]);
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

function deleteWorkOrder(orderid) {

}

function saveWorkOrderChange() {
	var formData = new FormData($("#workOrderManageForm")[0]);
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
};
//$(function(){
//	var $table = $('.table');
//var $fixedColumn = $table.clone().insertBefore($table).addClass('fixed-column');
// 
//$fixedColumn.find('th:not(:first-child),td:not(:first-child)').remove();
// 
//$fixedColumn.find('tr').each(function (i, elem) {
//  $(this).height($table.find('tr:eq(' + i + ')').height());
//});
//});
