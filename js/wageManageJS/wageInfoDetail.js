function wageInfoDetailIndustrialPlantSlctFun() {
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
				wageInfoDetailProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function wageInfoDetailProcessSlctFun() {
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

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function wageInfoDetailProcessSlctFun() {
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
				wageInfoDetailStaffInfoSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function wageInfoDetailStaffInfoSlctFun() {
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
			$("#staffID").find('option').remove();
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#staffNameSlct').append(("<option value=" + models[i].name + ">" + models[i].name.toString()  + "</option>").toString());
					$('#staffID').append(("<option value=" + models[i].userID + ">" + models[i].name.toString()  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#staffNameSlct').selectpicker('refresh');
				$('#staffNameSlct').selectpicker('render');   

				$('#staffID').selectpicker('refresh');
				$('#staffID').selectpicker('render');  
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

function getProdutionWageDetail() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});

	columnsArray.push({

		"title": "日期",
		"field": "closingDate"
	});
	columnsArray.push({

		"title": "员工",
		"field": "staffName"
	});
	columnsArray.push({

		"title": "工资",
		"field": "wage"
	});
	columnsArray.push({

		"title": "物料型号",
		"field": "materialName"
	});
	columnsArray.push({

		"title": "产量",
		"field": "productionNumber"
	});
//	columnsArray.push({
//
//		"title": "单价",
//		"field": "unitPrice"
//	});

	var urlStr = window.serviceIP + "/api/wage/getProductionWageDetail?staffName=" +
		document.PlantToLineSelectForm.staffNameSlct.value +
		"&plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value +
		"&startTime=" + document.getElementById("startTime").value +
		"&endTime=" + document.getElementById("endTime").value;

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
				pageNum = 1;
				$("#refreshID").html('stop');
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

function getRewardingPunishmentDetail() {
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
		width: 300,
		"title": "日期",
		"field": "closingDate"
	});
	columnsArray.push({
		width: 300,
		"title": "员工",
		"field": "staffName"
	});
	columnsArray.push({
		width: 300,
		"title": "奖罚金额",
		"field": "wage"
	});
	columnsArray.push({
		width: 300,
		"title": "原因",
		"field": "reason"
	});
	columnsArray.push({
		width: 300,
		"title": "奖罚人",
		"field": "updaterName"
	});

	var urlStr = window.serviceIP + "/api/wage/getRewardingPunishmentDetail?staffName=" +
		document.PlantToLineSelectForm.staffNameSlct.value +
		"&plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value +
		"&startTime=" + document.getElementById("startTime").value +
		"&endTime=" + document.getElementById("endTime").value + " 23:59:59";

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
				pageNum = 1;
				$("#refreshID").html('stop');
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

function addRewardingPunishmentDetail() {
	$('#staffName').selectpicker('refresh');
	$('#staffName').selectpicker('render');   
	$("#updaterName").val(localStorage.username);
	$("#updaterID").val(localStorage.userID);
	$("#addRewardingPunishmentModal").modal('show');
}

function saveRewardingPunishmentDetail() {
	$("#saveModelBT").attr('disabled', true);
	var formMap = window.formToObject($("#rewardingPunishmentForm"));
	if(isNaN(formMap["wage"])) {
		alert("输入奖罚金额不是数字!");
		$("#saveModelBT").attr('disabled', false);
		return;
	}

	formMap["staffName"] = $("#staffID").find("option:selected").text();

	//formMap["updaterID"] = localStorage.userID;
	//formMap["repairbacknum"] = repairbacknum + parseInt(formMap["id"].split("###")[1].trim());
	//delete formMap["newrepairnumber"];
	$.ajax({
		url: window.serviceIP + "/api/wage/changeRewardingPunishmentDetail",
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				getRewardingPunishmentDetail();
				$("#saveModelBT").attr('disabled', false);
				alert('保存成功!');
				closeModel();

			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
	$("#saveModelBT").attr('disabled', false);
}

function closeModel() {
	$("#addRewardingPunishmentModal").modal('hide');
}

function deleteRewardingPunishmentDetail() {
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}

	$.ajax({
		url: window.serviceIP + "/api/wage/deleteRewardingPunishmentDetail?recordID=" + row[0].id,
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

function wageInfoDetailRowClick(row) {
	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}
var pageNum = 1;

function showDetailRepeat(showType) {
	//$('#table').bootstrapTable('selectPage', 3);

	//获取每一页的行数
	//var pagesize=$(yourtableId).bootstrapTable("getOptions").pageSize;
	//获取总页数
	//var pages = $(table).bootstrapTable("getOptions").totalPages;

	if(showType) {
		if(showType != document.getElementById("refreshID").innerHTML) {
			return;
		}
		//console.log("refresh");
	}
	
	var tmpDate = new Date();
	$("#refreshID").html(tmpDate.format("yyyy-MM-dd-hh:mm:ss"));
	setTimeout("showDetailRepeat('" + document.getElementById("refreshID").innerHTML + "')", 1000 * 20);
	if(pageNum > $(table).bootstrapTable("getOptions").totalPages)
		pageNum = 1;
	$('#table').bootstrapTable('selectPage', pageNum);
	pageNum = pageNum +1;
}