function planProductionIndustrialPlantSlctFun(flag) {
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
			$("#plantid").find('option').remove();

			$('#industrialPlantSlct').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString());
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
					$('#plantid').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				$('#industrialPlantSlct').selectpicker('mobile');

				$('#plantid').selectpicker('refresh');
				$('#plantid').selectpicker('render');   
				$('#plantid').selectpicker('mobile');

				if($.cookie('plantID') != null && $.cookie('plantID') != 'undefined' && $.cookie('plantID').toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == $.cookie('plantID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#industrialPlantSlct').selectpicker('hide');

							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#industrialPlantSlct').selectpicker('refresh');
					$('#industrialPlantSlct').selectpicker('render'); 
				}
				planProductionProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function planProductionProcessSlctFun() {
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
			$("#processid").find('option').remove();
			$('#productionProcessSlct').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString());

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
					$('#processid').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				$('#productionProcessSlct').selectpicker('mobile');

				$('#processid').selectpicker('refresh');
				$('#processid').selectpicker('render');   
				$('#processid').selectpicker('mobile');

				if($.cookie('processID') != null && $.cookie('processID') != 'undefined' && $.cookie('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == $.cookie('processID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionProcessSlct').selectpicker('hide');

							$("#productionProcessLabel").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 

				}
				planProductionMaterialSlct();
				getPlanProductionRecord();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getPlanProductionRecord() {
	var columnsArray = [];
	//	columnsArray.push({
	//		checkbox: true
	//	});
	columnsArray.push({
		width: 200,
		"title": "厂区",
		"field": "厂区",
		formatter: function(value, row, index) {
			return $("#industrialPlantSlct option[value='" + row.plantid + "']").text();
		}
	});
	columnsArray.push({
		width: 150,
		"title": "流程",
		"field": "流程",
		formatter: function(value, row, index) {
			return $("#productionProcessSlct option[value='" + row.processid + "']").text();
		}
	});
	columnsArray.push({
		width: 150,
		"title": "月份",
		"field": "planmonth"
	});
	columnsArray.push({
		width: 150,
		"title": "物料名称",
		"field": "materialname"
	});

	columnsArray.push({
		width: 70,
		"title": "总计划产量",
		"field": "planproduction"
	});
	columnsArray.push({
		width: 70,
		"title": "计划日产量",
		"field": "plandailyproduction"
	});
	columnsArray.push({
		width: 70,
		"title": "实际产量",
		"field": "realproduction"
	});
	columnsArray.push({
		width: 200,
		"title": "完成率",
		"field": "accomplishmentratio"
	});
	columnsArray.push({
		width: 200,
		"title": "计划人员",
		"field": "operator"
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
	formData.append("startTime", document.getElementById("startTime").value);
	formData.append("endTime", document.getElementById("endTime").value);

	$.ajax({
		url: window.serviceIP + "/api/order/getplanproductionrecord",
		type: "POST",
		data: formData,
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
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
					singleSelect: true,
					clickToSelect: true,
					striped: true,
					sortName: "recordTime",
					sortOrder: "desc",
					pageSize: 30,
					pageNumber: 1,
					pageList: "[15, 30, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//search: true,
					//					fixedColumns: true, //固定列
					//					fixedNumber: 1, //固定前两列
					pagination: true,
					columns: columnsArray,
					onClickRow: function(row) {

						//$('.changeTableRowColor').removeClass('changeTableRowColor');
						//$(row).addClass('changeTableRowColor');
						planProductionSelectedRow = row;

					}
				});
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

};

var planProductionSelectedRow;

function selectedPlanProductionRow(param) {

	//使用getSelections即可获得，row是json格式的数据
	//	var row1 = $.map($('#table').bootstrapTable('getSelections'), function(row) {
	//		return row;
	//	});
	var optionType = param.getAttribute("id");
	var row = planProductionSelectedRow;
	$('#planProductionManageForm #plantid').selectpicker('refresh');
	$('#planProductionManageForm #plantid').selectpicker('render');   
	$('#planProductionManageForm #plantid').selectpicker('mobile');

	$('#planProductionManageForm #processid').selectpicker('refresh');
	$('#planProductionManageForm #processid').selectpicker('render');   
	$('#planProductionManageForm #processid').selectpicker('mobile');

	if(optionType == "planproduction_add") {
		var today = new Date();
		planProductionMaterialSlct();
		document.getElementById("planmonth").value = today.format("yyyy-MM");
		$('#planProductionModal').modal('show');
	} else if(optionType == "planproduction_edit") {
		if(row == null || row == 'undefined' || row.length < 1) {
			alert("请选择行数据!");
			return;
		}

		for(var key in row) {
			//alert(key +" " +row[key] );
			if(key == 0) {
				continue;
			}

			if(key == "planmonth") {
				$("#planProductionManageForm" + " #" + key).val(row[key]);
				continue;
			}

			if(key == "materialid") {
				planProductionMaterialSlct();
			}
			if(key == "plantid" || key == "processid" || key == "materialid") {

				var numbers = $("#planProductionManageForm" + " #" + key).find("option"); //获取select下拉框的所有值
				for(var j = 0; j < numbers.length; j++) {
					//console.log($(numbers[j]).val().toString().split("###")[0] + " ==== " + row[key]);
					if($(numbers[j]).val().toString().split("###")[0] == row[key]) {
						$(numbers[j]).attr("selected", "selected");
						//$(numbers[j]).selected = true;
					}
				}
				$('#' + key).selectpicker('refresh');
				$('#' + key).selectpicker('render'); 
				//$('#' + key).attr("disabled", "disabled");
				continue;

			}
			$("#planProductionManageForm" + " #" + key).val(row[key]);
		}

		$('#planProductionModal').modal('show');
	} else if(optionType == "planproduction_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}

		deletePlanProduction(row["id"]);
	}
};

function deletePlanProduction(id) {

	$.ajax({
		url: window.serviceIP + "/api/order/deleteplanproductionrecord?id=" + id,
		type: "GET",
		contentType: "application/json",
		dataType: "json",

		//data: window.getFormDataToJson(formData),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {

				getPlanProductionRecord();
				alert('计划已删除!');
			} else {
				alert("计划删除失败!" + data.message);
			}
		}
	});
}

function savePlanProductionChange() {

	var formData = new FormData($("#planProductionManageForm")[0]);
	formData.append("planmonth", window.stringToDatetimeLocalType(document.getElementById("planmonth").value, ("yyyy-MM")));
	formData.append("materialname", $("#planProductionManageForm #materialid").find("option:selected").text())
	if($('#operator').val().length < 2)
	{
		formData.append("operator", $.cookie('username'))
	}
	$.ajax({
		url: window.serviceIP + "/api/order/changeplanproductionrecord",
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
				getPlanProductionRecord();
				$("#planProductionModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
};

function planDailyProductionCompute() {

}

function planProductionRatioCompute() {

}

function planProductionRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	$(row).addClass('changeTableRowColor');
	$($(row).find("td")[0]).addClass('changeTableRowColor');
}

function closePlanProductionModal() {
	$("#planProductionModal").modal('hide');
}

function planProductionMaterialSlct() {
	//alert();
	//alert(document.planProductionManageForm.processid.value.toString());
	$.ajax({

		url: window.serviceIP + "/api/basicdata/getmaterialbyprocess?processID=" +
			$("#planProductionManageForm" + " #processid").val(),
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

			$("#materialid").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#materialid').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#materialid').selectpicker('refresh');
				$('#materialid').selectpicker('render');   
				$('#materialid').selectpicker('mobile');

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
}