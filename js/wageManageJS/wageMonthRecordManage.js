function wageMonthRrecordManageIndustrialPlantSlctFun() {
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
				//console.log(models);
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id.toString() + ">" +
						models[i].name.toString() + "</option>").toString())
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
				wageMonthRrecordManageProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function wageMonthRrecordManageProcessSlctFun() {
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
				wageMonthRrecordManageProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function wageMonthRrecordManageProcessSlctFun() {
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
				wageMonthRrecordManageStaffInfoSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function wageMonthRrecordManageStaffInfoSlctFun() {
	$.ajax({
		url: window.serviceIP + "/user/getUserInfoByParam?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value +
			"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value,
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		success: function(dataRes) {
			$("#staffNameSlct").find('option').remove();
			$('#staffNameSlct').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString())

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#staffNameSlct').append(("<option value=" + models[i].name + ">" + models[i].name.toString()  + "</option>").toString());
				}
				//console.log($('#productionProcessSlct'));
				$('#staffNameSlct').selectpicker('refresh');
				$('#staffNameSlct').selectpicker('render');   

				//				if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
				//					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
				//					for(var j = 0; j < numbers.length; j++) {
				//						if($(numbers[j]).val().toString() == localStorage.getItem('processID')) {
				//							$(numbers[j]).attr("selected", "selected");
				//							$('#productionProcessSlct').selectpicker('hide');
				//
				//							$("#productionProcessLabel").css("display", "none");
				//						}
				//					}
				//					$('#productionProcessSlct').selectpicker('refresh');
				//					$('#productionProcessSlct').selectpicker('render'); 
				//
				//				}

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getPayStubDetail() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		width: 300,
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		width: 100,
		"title": "结算日期",
		"field": "closingDate",
		formatter: function(value, row, index) {

			if(value) {
				return(new Date(parseInt(value))).format("yyyy-MM-dd");
			}

		}
	});
	columnsArray.push({
		width: 100,
		"title": "员工",
		"field": "staffName"
	});
	columnsArray.push({
		width: 100,
		"title": "工资合计",
		"field": "finalWage"
	});
	columnsArray.push({
		width: 100,
		"title": "产量工资",
		"field": "productionWage"
	});
	columnsArray.push({
		width: 100,
		"title": "奖励金额",
		"field": "rewardingWage"
	});
	columnsArray.push({
		width: 100,
		"title": "处罚金额",
		"field": "punishmentWage"
	});
	columnsArray.push({
		width: 100,
		"title": "其他工资1",
		"field": "extdWage1"
	});
	columnsArray.push({
		width: 100,
		"title": "其他工资2",
		"field": "extdWage2"
	});
	columnsArray.push({
		width: 100,
		"title": "其他工资3",
		"field": "extdWage3"
	});
	columnsArray.push({
		width: 300,
		"title": "工资说明",
		"field": "remark"
	});

	var urlStr = window.serviceIP + "/api/wage/getPaystubDetail?staffName=" +
		document.PlantToLineSelectForm.staffNameSlct.value +
		"&plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value +
		"&startTime=" + document.getElementById("startTime").value +
		"&endTime=" + document.getElementById("endTime").value + "-33";

	$.ajax({
		url: urlStr,
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
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

function changePayStubDetail() {
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}

	$("#id").val(row[0].id);
	$("#staffName").val(row[0].staffName);
	$("#closingDate").val((new Date(parseInt(row[0].closingDate))).format("yyyy-MM-dd") );
	$("#productionWage").val(row[0].productionWage);
	$("#rewardingWage").val(row[0].rewardingWage);
	$("#punishmentWage").val(row[0].punishmentWage);
	$("#extdWage1").val(row[0].extdWage1);
	$("#extdWage2").val(row[0].extdWage2);
	$("#extdWage3").val(row[0].extdWage3);
	$("#remark").val(row[0].remark);
	$("#updaterName").val(localStorage.username);
	$("#updaterID").val(localStorage.userID);
	$("#payStubModal").modal('show');
}

function savePayStubDetail() {
	$("#saveModalBT").attr('disabled', true);
	var formMap = window.formToObject($("#payStubForm"));
	if(isNaN(formMap["productionWage"])) {
		alert("输入产量工资不是数字!");
		$("#saveModalBT").attr('disabled', false);
		return;
	}

	if(isNaN(formMap["rewardingWage"])) {
		alert("输入奖罚金额不是数字!");
		$("#saveModalBT").attr('disabled', false);
		return;
	}
	if(isNaN(formMap["punishmentWage"])) {
		alert("输入奖罚金额不是数字!");
		$("#saveModalBT").attr('disabled', false);
		return;
	}
	if(isNaN(formMap["extdWage1"])) {
		alert("输入金额不是数字!");
		$("#saveModalBT").attr('disabled', false);
		return;
	}
	if(isNaN(formMap["extdWage2"])) {
		alert("输入金额不是数字!");
		$("#saveModalBT").attr('disabled', false);
		return;
	}
	if(isNaN(formMap["extdWage3"])) {
		alert("输入金额不是数字!");
		$("#saveModalBT").attr('disabled', false);
		return;
	}
	delete formMap["staffName"];
	delete formMap["closingDate"];

	//formMap["updaterID"] = localStorage.userID;
	//formMap["repairbacknum"] = repairbacknum + parseInt(formMap["id"].split("###")[1].trim());
	//delete formMap["newrepairnumber"];
	$.ajax({
		url: window.serviceIP + "/api/wage/changePaystubDetail",
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				getPayStubDetail();
				$("#saveModalBT").attr('disabled', false);
				alert('保存成功!');
				closeModal();

			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
	$("#saveModalBT").attr('disabled', false);
}

function closeModal() {
	$("#payStubModal").modal('hide');
}

function deletePayStubDetail() {
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}

	$.ajax({
		url: window.serviceIP + "/api/wage/deletePaystubDetail?recordID=" + row[0].id,
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		//data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				getRewardingPunishmentDetail();
				alert('删除成功!');
			} else {
				alert("删除失败！" + data.message);
			}
		}
	});
}

function wageMonthRrecordManageRowClick(row) {
	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}