function materialCirculationPlantSlctFun() {
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

			$("#originalPlantSlct").find('option').remove();
			$('#originalPlantSlct').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString())

			$("#destinationPlantSlct").find('option').remove();
			$('#destinationPlantSlct').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString())

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#originalPlantSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
					$('#destinationPlantSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
					$('#originalPlantID').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
					$('#destinationPlantID').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#originalPlantSlct').selectpicker('refresh');
				$('#originalPlantSlct').selectpicker('render');   

				if(localStorage.getItem('plantID') != null && localStorage.getItem('plantID') != 'undefined' &&
					localStorage.getItem('plantID').toString().length > 0) {
					var numbers = $('#originalPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('plantID')) {
							$(numbers[j]).attr("selected", "selected");
							//							$('#industrialPlantSlct').selectpicker('hide');
							//							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#originalPlantSlct').selectpicker('refresh');
					$('#originalPlantSlct').selectpicker('render'); 
				}

				$('#originalPlantSlct').selectpicker('refresh');
				$('#originalPlantSlct').selectpicker('render');   

				$("#destinationPlantSlct").val($('#originalPlantSlct').val());
				$('#destinationPlantSlct').selectpicker('refresh');
				$('#destinationPlantSlct').selectpicker('render');   

				if("-1" != $('#originalPlantSlct').val()) {
					$("#originalPlantID").val($('#originalPlantSlct').val());
				}

				$('#originalPlantID').selectpicker('refresh');
				$('#originalPlantID').selectpicker('render');   
				if("-1" != $('#originalPlantSlct').val()) {
					$("#destinationPlantID").val($('#originalPlantSlct').val());
				}

				$('#destinationPlantID').selectpicker('refresh');
				$('#destinationPlantID').selectpicker('render');   

				materialCirculationProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function materialCirculationProcessSlctFun() {
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
			$("#processID").find('option').remove();
			$('#productionProcessSlct').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString())

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
					$('#processID').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())

				}

				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   

				if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('processID')) {
							$(numbers[j]).attr("selected", "selected");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render');  

				}
				if("-1" != $('#productionProcessSlct').val()) {
					$("#processID").val($('#productionProcessSlct').val());
				}

				$('#processID').selectpicker('refresh');
				$('#processID').selectpicker('render');   
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function initProcessMaterialInfo() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterialbyprocess?processID=" +
			$('#processID').val() + "&plantID=" + $('#originalPlantID').val(),
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

			$("#materialID").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");

				for (var  i  in  models)  {  

					$('#materialID').append(("<option style='margin-top: 5px;font-size: 18px;' value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#materialID').selectpicker('refresh');
				$('#materialID').selectpicker('render');   

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
}

function materialCirculationRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}

function selectMaterialCirculationRecord() {
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

		"title": "流出厂区",
		"field": "originalPlantID",
		formatter: function(value, row, index) {
			return $("#originalPlantSlct option[value='" + value + "']").text();
		}
	});
	columnsArray.push({
		"title": "流出工序",
		"field": "processID",
		formatter: function(value, row, index) {
			return $("#productionProcessSlct option[value='" + value + "']").text();
		}
	});
	columnsArray.push({
		"title": "流入厂区",
		"field": "destinationPlantID",
		formatter: function(value, row, index) {
			return $("#originalPlantSlct option[value='" + value + "']").text();
		}
	});
	columnsArray.push({
		"title": "流转类型",
		"field": "circulationType"
	});
	columnsArray.push({
		"title": "物料型号",
		"field": "materialName"
	});
	columnsArray.push({
		"title": "数量",
		"field": "number"
	});

	columnsArray.push({
		"title": "流出确认人",
		"field": "sender"
	});
	columnsArray.push({
		"title": "流出时间",
		"field": "sendTime"
	});
	columnsArray.push({
		"title": "流入确认人",
		"field": "accepter"
	});
	columnsArray.push({
		"title": "流入时间",
		"field": "acceptTime"
	});
	columnsArray.push({
		"title": "流转原因",
		"field": "circulationDescription"
	});
	columnsArray.push({
		"title": "备注",
		"field": "remark"
	});
	var formData = new FormData();
	formData.append("originalPlantID", $('#originalPlantSlct').val());
	formData.append("destinationPlantID", $('#destinationPlantSlct').val());
	formData.append("processID", $('#productionProcessSlct').val());
	formData.append("circulationType", $('#circulationSlctType').val());
	formData.append("startTime", document.getElementById("startTime").value);
	formData.append("endTime", document.getElementById("endTime").value + " 23:59:59");

	$.ajax({
		url: window.serviceIP + "/api/scrapinfo/getMaterialCirculationRecord",
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
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 40,
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

function saveMaterialCirculationRecord() {
	var formDataMap = window.formToObject($("#circulationModalForm"));

	formDataMap["materialName"] = $("#materialID").find("option:selected").text();
	formDataMap["sender"] = localStorage.username;

	$.ajax({
		url: window.serviceIP + "/api/scrapinfo/saveMaterialCirculationRecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		data: JSON.stringify(formDataMap).toString(),
		headers: {
			Token: localStorage.getItem('token')
		},
		success: function(data) {
			if(data.status == 1) {
				selectMaterialCirculationRecord();
				alert('保存成功!');
				$("#circulationModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
}

function confirmMaterialCirculationRecord() {
	
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
	if(row[0].sender) {
		if(row[0].sender.toString().length < 2) {
			alert("请选择有效记录,该记录可能是汇总记录!");
			return;
		}
	}
	else
	{
		alert("请选择有效记录,该记录可能是汇总记录!");
		return;
	}

	if(row[0].accepter) {
		if(row[0].accepter.length > 1) {
			alert("该记录已被确认!");
			return;
		}
	}

	var formData = new FormData();
	formData.append("id",row[0].id);
	formData.append("confirmStaff",localStorage.username);
	$.ajax({
		url: window.serviceIP + "/api/scrapinfo/confirmMaterialCirculationRecord",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		headers: {
			Token: localStorage.getItem('token')
		},
		success: function(data) {
			if(data.status == 1) {
				selectMaterialCirculationRecord();
				alert('保存成功!');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
}

function deleteMaterialCirculationRecord() {

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
	if(row[0].sender) {
		if(row[0].sender.toString().length < 2) {
			alert("请选择有效记录,该记录可能是汇总记录!");
			return;
		}
	}
	else
	{
		alert("请选择有效记录,该记录可能是汇总记录!");
		return;
	}

	if(row[0].accepter) {
		if(row[0].accepter.length > 1) {
			alert("该记录已被确认接收不能删除!");
			return;
		}
	}

	var formData = new FormData();
	formData.append("id", row[0].id);
	$.ajax({
		url: window.serviceIP + "/api/scrapinfo/deleteMaterialCirculationRecord",
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
				selectMaterialCirculationRecord();
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};

function closeModal(modalName) {
	$("#" + modalName).modal('hide');
}

function createMaterialCirculationModal() {

	if("-1" != $('#originalPlantSlct').val()) {
		$('#originalPlantID').val($('#originalPlantSlct').val())
	}
	$('#originalPlantID').selectpicker('refresh');
	$('#originalPlantID').selectpicker('render'); 

	if("-1" != $('#destinationPlantSlct').val()) {
		$('#destinationPlantID').val($('#destinationPlantSlct').val())
	}
	$('#destinationPlantID').selectpicker('refresh');
	$('#destinationPlantID').selectpicker('render'); 

	if("-1" != $('#productionProcessSlct').val()) {
		$('#processID').val($('#productionProcessSlct').val())
	}
	$('#processID').selectpicker('refresh');
	$('#processID').selectpicker('render'); 

	$('#circulationType').selectpicker('refresh');
	$('#circulationType').selectpicker('render'); 

	initProcessMaterialInfo();
	$("#circulationModal").modal('show');
}