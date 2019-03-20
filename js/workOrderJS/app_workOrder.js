//获取全局token等信息，放入变量$Global_UserLogin_Info, app_login.html中login登陆方法初始赋值，用户首次登陆成功后设置放入localStorage
var $Global_UserLogin_Info = JSON.parse(localStorage.getItem('$Global_UserLogin_Info'));

function workOrderIndustrialPlantSlctFun(flag) {
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
					$('#industrialPlantSlct').append(("<option value=" + models[i].id + "###" + models[i].shortname + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				$('#industrialPlantSlct').selectpicker('mobile');

				if($Global_UserLogin_Info.plantID != null && $Global_UserLogin_Info.plantID != 'undefined' && $Global_UserLogin_Info.plantID.toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString().split("###")[0] == $Global_UserLogin_Info.plantID) {
							$(numbers[j]).attr("selected", "selected");
							$('#industrialPlantSlct').selectpicker('hide');

							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#industrialPlantSlct').selectpicker('refresh');
					$('#industrialPlantSlct').selectpicker('render'); 

				}

				if(flag = "1")
					workOrderProductionProcessSlctFun();
				else
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
					$('#productionProcessSlct').append(("<option value=" + models[i].id + "###" + models[i].shortname + ">" + models[i].name.toString()  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				$('#productionProcessSlct').selectpicker('mobile');

				if($Global_UserLogin_Info.processID != null && $Global_UserLogin_Info.processID != 'undefined' && $Global_UserLogin_Info.processID.toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString().split("###")[0] == $Global_UserLogin_Info.processID) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionProcessSlct').selectpicker('hide');

							$("#productionProcessLabel").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 

				}

				workOrderProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function workOrderProductionLineSlctFun() {
	//	return true;
	//	if(!($.isEmptyObject(first)) && first.toString().length > 1) {
	//
	//		return;
	//	}
	//alert(document.PlantToLineSelectForm.industrialPlantSlct.value.toString().split("###")[0]);
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString().split("###")[0]);
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString().split("###")[0]);
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
			$('#productionLineSlct').append(("<option value=" + "-1" + ">" + "全部产线"  + "</option>").toString());

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id + "###" + models[i].shortname + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   
				$('#productionLineSlct').selectpicker('mobile');

				if($Global_UserLogin_Info.lineID != null && $Global_UserLogin_Info.lineID != 'undefined' && $Global_UserLogin_Info.lineID.toString().length > 0) {
					var numbers = $('#productionLineSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString().split("###")[0] == $Global_UserLogin_Info.lineID) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionLineSlct').selectpicker('hide');

							$("#productionLineLabel").css("display", "none");
						}
					}
					$('#productionLineSlct').selectpicker('refresh');
					$('#productionLineSlct').selectpicker('render'); 

				}

				getWorkOrder();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getWorkOrder() {
	var columnsArray = [];
	//	columnsArray.push({
	//		checkbox: true
	//	});
	columnsArray.push({
		width: 200,
		"title": "工单号",
		"field": "orderid"
	});
	columnsArray.push({
		width: 150,
		"title": "产线",
		"field": "lineid",
		visible: false
	});
	columnsArray.push({
		width: 150,
		"title": "产线",
		"field": "lineName"
	});
	columnsArray.push({
		width: 300,
		"title": "状态",
		"field": "status",
		visible: false
	});
	columnsArray.push({
		width: 100,
		"title": "状态",
		"field": "statusName"
	});
	columnsArray.push({
		width: 70,
		"title": "批次数量",
		"field": "batchnum"
	});
	columnsArray.push({
		width: 70,
		"title": "计划产量",
		"field": "totalproduction"
	});
	columnsArray.push({
		width: 70,
		"title": "报废数量",
		"field": "scrapnum",
		visible: false
	});
	columnsArray.push({
		width: 200,
		"title": "输出产物",
		"field": "materialid",
		visible: false
	});
	columnsArray.push({
		width: 200,
		"title": "输出产物",
		"field": "materialName"
	});
	columnsArray.push({
		width: 300,
		"title": "计划开始时间",
		"field": "scheduledstarttime"
	});
	columnsArray.push({
		width: 300,
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
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString().split("###")[0]);
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString().split("###")[0]);
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString().split("###")[0]);

	$.ajax({
		url: window.serviceIP + "/api/order/getcustomworkorderbyparam",
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
					pageSize: 15,
					pageNumber: 1,
					pageList: "[15, 30, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//search: true,
					fixedColumns: true, //固定列
					fixedNumber: 1, //固定前两列
					pagination: true,
					columns: columnsArray,
					onClickRow: function(row) {

						//$('.changeTableRowColor').removeClass('changeTableRowColor');
						//$(row).addClass('changeTableRowColor');
						workOrderSelectedRow = row;
						initSplitDetailWorkOrder(row["id"]);
					}
				});
				$('#orderSplitTable').bootstrapTable('destroy');
				workOrderSelectedRow = null;
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

};

function setLineModal() {
	$("#lineid").find('option').remove();

	$("#productionLineSlct option").each(function() {
		if($(this).val() == "-1") {
			return;
		}
		$('#lineid').append(("<option value=" + $(this).val() + ">" + $(this).text()  + "</option>").toString());
	})
	$('#lineid').selectpicker('refresh');
	$('#lineid').selectpicker('render'); 
	$('#lineid').selectpicker('mobile');

	$('#status').selectpicker('refresh');
	$('#status').selectpicker('render'); 
	$('#status').selectpicker('mobile');
	$('#status').selectpicker('hide');

	$('#workshift').selectpicker('refresh');
	$('#workshift').selectpicker('render'); 
	$('#workshift').selectpicker('mobile');

	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterialbyprocess?processID=" +
			document.PlantToLineSelectForm.productionProcessSlct.value.toString().split("###")[0],
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
					$('#materialid').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "###" + models[i].description + "</option>").toString());
				}
				$('#materialid').selectpicker('refresh');
				$('#materialid').selectpicker('render');   
				$('#materialid').selectpicker('mobile');

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
};

function createWorkOrderID() {
	//console.log()
	//alert(document.workOrderManageForm.lineWorkOrderModal.value);
	//document.workOrderManageForm.lineWorkOrderModal.value.toString().split("###")[1];

	var orderID = document.PlantToLineSelectForm.industrialPlantSlct.value.toString().split("###")[1];
	orderID += document.PlantToLineSelectForm.productionProcessSlct.value.toString().split("###")[1];
	orderID += $("#workOrderManageForm" + " #lineid").find("option:selected").selectpicker('val').get('0').value.split("###")[1];
	orderID += $("#workOrderManageForm" + " #workshift").find("option:selected").selectpicker('val').get('0').value;

	orderID += window.stringToDatetimeLocalType(document.getElementById("scheduledstarttime").value, "yyyyMMdd");
	return orderID;
}

function lineWorkOrderModalChange() {
	var newOrder = createWorkOrderID();
	$("#workOrderManageForm" + " #orderid").val(newOrder.toString());
}

function selectedWorkOrderRow(param) {

	//使用getSelections即可获得，row是json格式的数据
	//	var row1 = $.map($('#table').bootstrapTable('getSelections'), function(row) {
	//		return row;
	//	});
	var optionType = param.getAttribute("id");
	var row = workOrderSelectedRow;
	if(optionType == "workorder_scrap") {
		if(row["status"] > windowOrderStatusEnum.closed) {
			alert("该工单未在生产状态,不能报废!");
			return;
		}
		createScrapModel();
		return;
	}
	setLineModal();

	if(optionType == "workorder_add") {
		//document.getElementById("workOrderManageForm").reset();

		//$(workOrderManageForm.elements).each(function() {
		//			$(this).attr('disabled', false);
		//		});
		$(workOrderManageForm.elements).each(function() {
			if($(this).attr("name") != "orderid")
				$(this).attr('readonly', false);
		});
		$("#workOrderManageForm" + " #orderid").val(createWorkOrderID());
		$("#workOrderManageForm" + " #plantid").val(document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
		$("#workOrderManageForm" + " #processid").val(document.PlantToLineSelectForm.productionProcessSlct.value.toString());
		//$("#workOrderManageForm" + " #lineid").val(document.PlantToLineSelectForm.productionLineSlct.value.toString());
		$("#workOrderManageForm" + " #scheduledstarttime").val(window.stringToDatetimeLocalType(new Date(), "yyyy-MM-dd"));
		lineWorkOrderModalChange();

		$('#myModal').modal('show');
	} else if(optionType == "workorder_edit") {
		if(row == null || row == 'undefined' || row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		//console.log(row);
		if(row["status"] != windowOrderStatusEnum.ordered) {
			alert("该工单已进入生产,不能修改!");
			return;
		}
		for(var key in row) {
			//alert(key +" " +row[key] );
			if(key == 0) {
				continue;
			}
			if(key != "status" && key != "scrapnum") {
				$("#workOrderManageForm" + " #" + key).attr('readonly', true);
			}
			if(key == "scheduledstarttime") {
				$("#workOrderManageForm" + " #" + key).val(window.stringToDatetimeLocalType(row[key], "yyyy-MM-dd"));
				var shiftName = "BB";

				if(window.stringToDatetimeLocalType(row[key], "hh") == "19") {
					shiftName = "YB";
				}
				var numbers = $("#workOrderManageForm" + " #workshift").find("option"); //获取select下拉框的所有值
				for(var j = 0; j < numbers.length; j++) {
					if($(numbers[j]).val().toString() == shiftName) {
						$(numbers[j]).attr("selected", "selected");
					}
				}
				$('#workshift').selectpicker('refresh');
				$('#workshift').selectpicker('render'); 
				$("#workOrderManageForm" + " #workshift").attr('readonly', 'true');
				$("#workOrderManageForm" + " #workshift").attr("disabled", "disabled");
				continue;
			}
			if(key == "status" || key == "lineid" || key == "materialid") {
				//				$("#workOrderManageForm" + " #" + key).selectpicker('deselectAll');
				var numbers = $("#workOrderManageForm" + " #" + key).find("option"); //获取select下拉框的所有值
				for(var j = 0; j < numbers.length; j++) {
					//console.log($(numbers[j]).val().toString().split("###")[0] + " ==== " + row[key]);
					if($(numbers[j]).val().toString().split("###")[0] == row[key]) {
						$(numbers[j]).attr("selected", "selected");
						//$(numbers[j]).selected = true;
					}
				}
				$('#' + key).selectpicker('refresh');
				$('#' + key).selectpicker('render'); 
				$('#' + key).attr("disabled", "disabled");
				continue;
				// $("#workOrderManageForm" + " #" + key).selectpicker('val',"");
			}
			$("#workOrderManageForm" + " #" + key).val(row[key]);

			//$("#workOrderManageForm" + " #" + key).attr("value", row[key]);
		}

		$('#myModal').modal('show');
	} else if(optionType == "workorder_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}

		deleteWorkOrder(row["id"]);
	}
};

function deleteWorkOrder(orderid) {

	$.ajax({
		url: window.serviceIP + "/api/order/changeworkorderstatus?ID=" + orderid + "&status=" + window.windowOrderStatusEnum.closed,
		type: "GET",
		contentType: "application/json",
		dataType: "json",

		//data: window.getFormDataToJson(formData),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {

				getWorkOrder();
				alert('订单已关闭!');
			} else {
				alert("订单关闭失败!" + data.message);
			}
		}
	});
}

function saveWorkOrderChange() {

	if(isNaN(parseInt($("#batchnum").val())) || parseInt($("#batchnum").val()) < 1) {
		alert("请正确输入批次数量!");
		return;
	}
	if(isNaN(parseInt($("#totalproduction").val())) || parseInt($("#totalproduction").val()) < 1) {
		alert("请正确输入生产总量!");
		return;
	}
	if($("#materialid").val() == "undefind" || $("#materialid").val() < 1 || $("#materialid").val() == "null") {
		alert("未选择输出物料!");
		return;
	}
	if($("#lineid").val() == "undefind" || $("#lineid").val() < 1 || $("#lineid").val() == "null") {
		alert("未选择产线!");
		return;
	}
	var formData = new FormData($("#workOrderManageForm")[0]);
	formData.append("lineid", formData.get("lineid").split("###")[0]);
	formData.append("plantid", formData.get("plantid").split("###")[0]);
	formData.append("processid", formData.get("processid").split("###")[0]);
	if(formData.get("workshift") == "BB")
		formData.append("scheduledstarttime", formData.get("scheduledstarttime") + " 07:00:00");
	else
		formData.append("scheduledstarttime", formData.get("scheduledstarttime") + " 19:00:00");
	//console.log(window.getFormDataToJson(formData));
	$.ajax({
		url: window.serviceIP + "/api/order/changeworkorder",
		type: "POST",
		//		contentType: "application/json",
		//		dataType: "json",
		processData: false,
		contentType: false,
		data: formData,
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

var workOrderSelectedRow;

function workOrderRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	$(row).addClass('changeTableRowColor');
	$($(row).find("td")[0]).addClass('changeTableRowColor');
}

function workOrderSetCount() {
	if($("#workOrderManageForm" + " #materialid").find("option:selected").text().split("###").length < 2) {
		return;
	}

	var result1 = parseInt($("#workOrderManageForm" + " #materialid").find("option:selected").text().split("###")[1].trim());
	var result2 = parseInt($("#workOrderManageForm" + " #batchnum").val().trim());
	$("#workOrderManageForm" + " #totalproduction").val(result1 * result2);
}

function createScrapModel() {
	var row = workOrderSelectedRow;
	$.ajax({
		url: window.serviceIP + "/api/scrapinfo/getmaterialscrapinfo?materialID=" + row["materialid"] + "&orderID=" + row["id"],
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			$("#scrapModalForm" + " #orderid").val(row["id"]);
			$("#scrapModalForm" + " #ordername").val(row["orderid"]);
			$("#scrapModalForm" + " #ordertime").val(window.stringToDatetimeLocalType(row["scheduledstarttime"], "yyyy-MM-dd"));
			var htmlInner = "";

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				var labelStyle = "";
				var textStyle = "";
				//alert($("#scrapModalForm #ordername").css("height").toString() + "----------" +$("#scrapModalForm #ordername").css("font-size").toString() );
				if($("#scrapModalForm #ordername").css("height").toString() == "80px" && $("#scrapModalForm #ordername").css("font-size").toString() == "36px") {
					labelStyle = " style=\"font-size:36px\" ";
					textStyle = " style=\"font-size:36px;height: 80px;\" ";

				}
				for (var  i  in  models)  {  
					htmlInner += "<label " + labelStyle + " >" + models[i].name + "</label>" + "<input type=\"text\" class=\"form-control\" " + textStyle +
						" onkeyup=\"value=value.replace(/[^0-9|^.]/g,'')\" id=\"" + models[i].id + "###" + models[i].name + "\" name=\"" + models[i].id +
						"###" + models[i].name + "\"  value = \"" + models[i].description + "\"  placeholder=\"请输入报废数量\">";
				}
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
			//console.log(htmlInner);
			document.getElementById("scrapContent").innerHTML = htmlInner;
			$('#scrapModal').modal('show');
		}
	});
}

function saveScrap() {

	var jsonMap = window.formToObject($("#scrapModalForm"));
	$.ajax({
		url: window.serviceIP + "/api/scrapinfo/savescrapinfo",
		type: "POST",
		//		contentType: "application/json",
		//		dataType: "json",

		data: JSON.stringify(jsonMap).toString(),
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: false,
		contentType: false,
		success: function(data) {
			if(data.status == 1) {
				alert('保存成功!');
				$("#scrapModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		},
		error: function(xhr, state, errorThrown) {

			JSON.stringify(xhr).toString()
		}
	});
}

function initSplitDetailWorkOrder(orderID) {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		width: 300,
		"title": "工单号",
		"field": "ordersplitid"
	});
	columnsArray.push({
		"title": "产品",
		width: 300,
		"field": "materialName"
	});
	columnsArray.push({
		"title": "产品",
		width: 300,
		"field": "materialid",
		visible: false
	});
	columnsArray.push({
		width: 300,
		"title": "产量",
		"field": "productionnum"
	});
	columnsArray.push({
		width: 300,
		"title": "状态",
		"field": "statusName"
	});
	columnsArray.push({
		width: 300,
		"title": "状态",
		"field": "status",
		visible: false
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "orderid",
		"field": "orderid",
		visible: false
	});
	$.ajax({
		url: window.serviceIP + "/api/order/getordersplitaftermap?orderID=" + orderID,
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
				$('#orderSplitTable').bootstrapTable('destroy').bootstrapTable({
					data: models,
					//toolbar: '#toolbar',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 30,
					pageNumber: 1,
					pageList: "[15, 30, 50, 100, All]",
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

function closeScrapModal() {
	$("#scrapModal").modal('hide');
}