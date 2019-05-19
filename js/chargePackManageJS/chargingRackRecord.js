function chargingRackRecordIndustrialPlantSlctFun() {
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
				chargingRackRecordProductionProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function chargingRackRecordProductionProcessSlctFun() {
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
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				// $('#productionProcessSlct').selectpicker('mobile');

				var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
				for(var j = 0; j < numbers.length; j++) {
					if($(numbers[j]).val().toString() == window.windowProcessEnum.CD) {
						$(numbers[j]).attr("selected", "selected");
						$('#productionProcessSlct').selectpicker('hide');

						$("#productionProcessLabel").css("display", "none");
					}
				}
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render'); 

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

				setTimeout(function() {
					chargingRackRecordProductionLineSlctFun();
					chargingRackRecordMaterialSlct();
				}, 100);
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function chargingRackRecordProductionLineSlctFun() {

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
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			$("#productionLineSlct").find('option').remove();
			$("#lineid").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
					$('#lineid').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   
				// $('#productionLineSlct').selectpicker('mobile');

				$('#lineid').selectpicker('refresh');
				$('#lineid').selectpicker('render'); 

				//				if(localStorage.getItem('lineID') != null && localStorage.getItem('lineID') != 'undefined' && localStorage.getItem('lineID').toString().length > 0) {
				//					var numbers = $('#productionLineSlct').find("option"); //获取select下拉框的所有值
				//					for(var j = 0; j < numbers.length; j++) {
				//						if($(numbers[j]).val().toString() == localStorage.getItem('lineID')) {
				//							$(numbers[j]).attr("selected", "selected");
				//							$('#productionLineSlct').selectpicker('hide');
				//
				//							$("#productionLineLabel").css("display", "none");
				//						}
				//					}
				//					$('#productionLineSlct').selectpicker('refresh');
				//					$('#productionLineSlct').selectpicker('render'); 
				//				}

				setTimeout(function() {
					chargingRackRecordWorkingLocationSlctFun();
				}, 100);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function chargingRackRecordWorkingLocationSlctFun() {
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getworklocation",
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

			$("#workingkLocationSlct").find('option').remove();
			$("#worklocation").find('option').remove();
			$('#workingkLocationSlct').append(("<option value=" + "-1" +
				">" + "全部" + "</option>").toString());
			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				if(models.length < 1) {
					$("#workingkLocationSlctLabel").hide(); //.css("display", "none")
					$('#workingkLocationSlct').selectpicker('hide');

				} else {
					$("#workingkLocationSlctLabel").show(); //.attr("display", "block")
					$('#workingkLocationSlct').selectpicker('show');
				}
				for (var  i  in  models)  {  
					$('#workingkLocationSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
					$('#worklocation').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#workingkLocationSlct').selectpicker('refresh');
				$('#workingkLocationSlct').selectpicker('render');   
				// $('#workingkLocationSlct').selectpicker('mobile');

				$('#worklocation').selectpicker('refresh');
				$('#worklocation').selectpicker('render');  
				//				if(localStorage.getItem('workingkLocation') != null && localStorage.getItem('workingkLocation') != 'undefined' && localStorage.getItem('workingkLocation').toString().length > 0) {
				//					var numbers = $('#workingkLocationSlct').find("option"); //获取select下拉框的所有值
				//					for(var j = 0; j < numbers.length; j++) {
				//						if($(numbers[j]).val().toString() == localStorage.getItem('workingkLocation')) {
				//							$(numbers[j]).attr("selected", "selected");
				//							//$('#workingkLocationSlct').selectpicker('hide');
				//							//$("#workingkLocationSlctLabel").css("display", "true");
				//						}
				//					}
				//					$('#workingkLocationSlct').selectpicker('refresh');
				//					$('#workingkLocationSlct').selectpicker('render'); 
				//				}
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function chargingRackRecordMaterialSlct() {
	//alert();
	//alert(document.planProductionManageForm.processid.value.toString());
	$.ajax({

		url: window.serviceIP + "/api/basicdata/getmaterialbyprocess?processID=" +
			document.PlantToLineSelectForm.productionProcessSlct.value.toString(),
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

			$("#materialname").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#materialname').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  +
						"###" + models[i].description + "</option>").toString());
				}
				$('#materialname').selectpicker('refresh');
				$('#materialname').selectpicker('render');   
				// $('#materialid').selectpicker('mobile');

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
}

function getOnRackRecord(selectType) {

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
		"title": "位置",
		"field": "worklocation",
		formatter: function(value, row, index) {
			return $("#workingkLocationSlct option[value='" + row.worklocation + "']").text();
		}
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialname"
	});
	columnsArray.push({
		"title": "物料类型",
		"field": "materialtype",
		formatter: function(value, row, index) {
			return $("#materialtype option[value='" + row.materialtype + "']").text();
		}
	});
	columnsArray.push({
		"title": "materialid",
		"field": "materialid",
		visible: false
	});

	columnsArray.push({
		"title": "在架数量",
		"field": "realnumber"
	});
	columnsArray.push({
		"title": "上架数量",
		"field": "productionnumber"
	});
	columnsArray.push({
		"title": "上架人员",
		"field": "staffname"
	});
	columnsArray.push({
		"title": "上架日期",
		"field": "putondate",
		formatter: function(value, row, index) {
			if(value) {
				return value.toString().split(" ")[0];
			}
		}
	});
	columnsArray.push({
		"title": "报修数量",
		"field": "repairnumber"
	});
	columnsArray.push({
		"title": "报修详情",
		"field": "repaircombine"
	});
	columnsArray.push({
		"title": "下架人员",
		"field": "pulloffstaffname"
	});
	columnsArray.push({
		"title": "下架日期",
		"field": "pulloffdate",
		formatter: function(value, row, index) {
			if(value) {
				return value.toString().split(" ")[0];
			}

		}
	});
	columnsArray.push({
		"title": "备注",
		"field": "remark"
	});

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	formData.append("locationID", document.PlantToLineSelectForm.workingkLocationSlct.value.toString());
	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");
	formData.append("selectType", selectType);

	$.ajax({
		url: window.serviceIP + "/api/chargepack/getchargingrackrecord",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(dataRes) {
			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");

				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
					toolbarAlign: 'left',
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
					searchAlign: 'right',
					pagination: true,
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		},
		error: function(jqXHR, exception) {
			var msg = '';
			if(jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if(jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if(jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if(exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if(exception === 'timeout') {
				msg = 'Time out error.';
			} else if(exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert("请求出错," + msg);
		}
	});
};

function chargingRackRecordRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}

function closeChargingRackRecordModel(modelName) {
	$("#" + modelName).modal('hide');
}

function setPutOnNum() {
	var num = parseInt($("#chargingRackRecordAddForm" + " #materialname").find("option:selected").text().split("###")[1].trim());
	$("#chargingRackRecordAddForm" + " #productionnumber").val(num);
	$("#chargingRackRecordAddForm" + " #realnumber").val(num);
}

function addChargingRackRecord() {
	$('#chargingRackRecordAddForm #lineid').selectpicker('refresh');
	$('#chargingRackRecordAddForm #lineid').selectpicker('render'); 

	$('#chargingRackRecordAddForm #worklocation').selectpicker('refresh');
	$('#chargingRackRecordAddForm #worklocation').selectpicker('render'); 

	$('#chargingRackRecordAddForm #materialname').selectpicker('refresh');
	$('#chargingRackRecordAddForm #materialname').selectpicker('render'); 

	$('#chargingRackRecordAddForm #materialtype').selectpicker('refresh');
	$('#chargingRackRecordAddForm #materialtype').selectpicker('render'); 

	var numbers = $('#lineid').find("option"); //获取select下拉框的所有值
	for(var j = 0; j < numbers.length; j++) {
		if($(numbers[j]).val().toString() == document.PlantToLineSelectForm.productionLineSlct.value.toString()) {
			$(numbers[j]).attr("selected", "selected");
			break;
		}
	}
	$('#lineid').selectpicker('refresh');
	$('#lineid').selectpicker('render'); 
	if(document.PlantToLineSelectForm.workingkLocationSlct.value.toString() != '-1') {
		var numbersWorkingkLocationSlct = $('#worklocation').find("option"); //获取select下拉框的所有值
		for(var j = 0; j < numbersWorkingkLocationSlct.length; j++) {
			if($(numbersWorkingkLocationSlct[j]).val().toString() == document.PlantToLineSelectForm.workingkLocationSlct.value.toString()) {
				$(numbersWorkingkLocationSlct[j]).attr("selected", "selected");
				break;
			}
		}
		$('#worklocation').selectpicker('refresh');
		$('#worklocation').selectpicker('render'); 
	}
	setPutOnNum();
	$("#chargingRackRecordAddForm" + " #plantid").val(document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	$("#chargingRackRecordAddForm" + " #processid").val(document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	$("#chargingRackRecordAddForm" + " #staffid").val(localStorage.userID);
	$("#chargingRackRecordAddForm" + " #staffname").val(localStorage.username);
	var today = new Date();
	$("#chargingRackRecordAddForm" + " #putondate").val(today.format("yyyy-MM-dd"));

	$("#myAddModal").modal('show');
}

function repairChargingRackRecord() {
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}

	if(row[0].pulloffdate) {
		alert("已下架电池不能添加报修!");
		return;
	}
	//console.log(row[0]);
	$("#chargingRackRecordRepairForm" + " #id").val(row[0].id);
	$("#chargingRackRecordRepairForm" + " #realnumber").val(row[0].realnumber);
	$("#chargingRackRecordRepairForm" + " #repairnumber").val(row[0].repairnumber);
	$("#chargingRackRecordRepairForm" + " #repaircombine").val(row[0].repaircombine);
	$("#chargingRackRecordRepairForm" + " #remark").val(row[0].remark);
	//	if(row[0].repaircombine) {
	//		if(row[0].repaircombine.length > 50) {
	//			$("#chargingRackRecordRepairForm" + " #repaircombine").height((row[0].remark.length % 50) * 20);
	//		}
	//	}

	$("#chargingRackRecordRepairForm" + " #repairid").val(localStorage.userID);
	$("#chargingRackRecordRepairForm" + " #repairname").val(localStorage.username);
	var today = new Date();
	$("#chargingRackRecordRepairForm" + " #repairtime").val(today.format("yyyy-MM-dd hh:mm"));

	$("#myRepairModal").modal('show');

}

function disableChangeButton(buttonID, status) {
	$("#" + buttonID).attr('disabled', status);
}

function pullOffChargingRackRecord() {

	disableChangeButton("pullOffRackButton", true);
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		disableChangeButton("pullOffRackButton", false);
		return;
	}
	if(row[0].pulloffdate) {
		alert("该记录已下架,不要重复操作!");
		disableChangeButton("pullOffRackButton", false);
		return;
	}
	var formMap = {};
	formMap['id'] = row[0].id;
	formMap['putondate'] = row[0].putondate;
	formMap['realnumber'] = row[0].realnumber;
	formMap['materialtype'] = row[0].materialtype;
	formMap['materialid'] = row[0].materialid;
	formMap['materialname'] = row[0].materialname;
	formMap['plantid'] = row[0].plantid;
	formMap['lineid'] = row[0].lineid;
	formMap['pulloffstaffid'] = localStorage.userID;
	formMap['pulloffstaffname'] = localStorage.username;
	formMap['pulloffdate'] = new Date();

	$.ajax({
		url: window.serviceIP + "/api/chargepack/pulloffchargingrackrecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				getOnRackRecord('onRack');
				alert('下架成功!');
			} else {
				alert("下架失败！" + data.message);
			}
			disableChangeButton("pullOffRackButton", false);
		}
	});
}

function deleteChargingRackRecord() {
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}
	if(row[0].repaircombine || row[0].pulloffdate) {
		alert("该记录已有报修信息或者下架,不能删除!");
		return;
	}
	$.ajax({
		url: window.serviceIP + "/api/chargepack/detetechargingrackrecord?id=" + row[0].id,
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		//data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				getOnRackRecord('onRack');
				alert('删除成功!');
			} else {
				alert("保存失败！" + data.message);
			}

		}
	});
}

function saveChargingRackRecordModel(modelID, formID) {
	disableChangeButton(modelID + "SaveButton", true);
	var formMap = window.formToObject($("#" + formID));
	if(formMap.hasOwnProperty("materialname")) {
		formMap["realnumber"] = formMap["productionnumber"];
		var realnumber = parseInt(formMap["productionnumber"]);

		if(realnumber <= 0) {
			disableChangeButton(modelID + "SaveButton", false);
			alert("上架数量必须大于0!");
			return;
		}
		formMap["materialid"] = $("#chargingRackRecordAddForm" + " #materialname").val();
		formMap["materialname"] = $("#chargingRackRecordAddForm" + " #materialname").find("option:selected").text().split("###")[0].trim()
	}

	if(formID == 'chargingRackRecordRepairForm') {
		formMap["repaircombine"] = formMap["repairtime"] + " " + formMap["repairname"] + " " + formMap["newrepairnumber"] +
			" " + formMap["reason"] + "\r\n ----- " + formMap["repaircombine"];

		var realLast = parseInt(formMap["realnumber"])
		var realRepairLast = parseInt(formMap["repairnumber"])
		var realRepairNow = parseInt(formMap["newrepairnumber"])
		formMap["realnumber"] = realLast - realRepairNow;
		formMap["repairnumber"] = realRepairLast + realRepairNow;
		if(realLast < realRepairNow) {
			disableChangeButton(modelID + "SaveButton", false);
			alert("报修数量必须小于等于在架数量!")
			return;
		}
		delete formMap["newrepairnumber"];

	}
	$.ajax({
		url: window.serviceIP + "/api/chargepack/changechargingrackrecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				getOnRackRecord('onRack');
				alert('保存成功!');
				$("#" + modelID).modal('hide');

			} else {
				alert("保存失败！" + data.message);
			}
			disableChangeButton(modelID + "SaveButton", false);
		}
	});

}

var accept_webName = null;
//重写scanQR方法
function scanQR(webName) {
	//执行H5扫描二维码方法
	openBarcode();
	accept_webName = webName;
}

////////以下是H5+调用摄像头进行扫一扫
// alert(openBarcode())
var img = null;
var blist = [];

function scaned(t, r, f) {
	// alert('t='+t+'r='+r+'f='+f);
	//获取扫描二维码信息
	recognitionQR(accept_webName, r);
	// 					var d = new Date();
	// 					var h=d.getHours(),m=d.getMinutes(),s=d.getSeconds(),ms=d.getMilliseconds();
	// 					if(h < 10){ h='0'+h; }
	// 					if(m < 10){ m='0'+m; }
	// 					if(s < 10){ s='0'+s; }
	// 					if(ms < 10){ ms='00'+ms; }
	// 					else if(ms < 100){ ms='0'+ms; }
	// 					var ts = '['+h+':'+m+':'+s+'.'+ms+']';
	// 					var li=null,hl = document.getElementById('history');
	// 					if(blist.length > 0){
	// 						li = document.createElement('li');
	// 						li.className = 'ditem';
	// 						hl.insertBefore(li, hl.childNodes[0]);
	// 					} else{
	// 						li = document.getElementById('nohistory');
	// 					}
	// 					li.id = blist.length;
	// 					var html = '['+h+':'+m+':'+s+'.'+ms+']'+'　　'+t+'码<div class="hdata">';
	// 					html += r;
	// 					html += '</div>';
	// 					li.innerHTML = html;
	// 					li.setAttribute('onclick', 'selected(id)');
	// 					blist[blist.length] = {type:t,result:r,file:f};
	// 					update(t, r, f);

}

function selected(id) {
	var h = blist[id];
	update(h.type, h.result, h.file);
	if(h.result.indexOf('http://') == 0 || h.result.indexOf('https://') == 0) {
		plus.nativeUI.confirm(h.result, function(i) {
			if(i.index == 0) {
				plus.runtime.openURL(h.result);
			}
		}, '', ['打开', '取消']);
	} else {
		plus.nativeUI.alert(h.result);
	}
}

function update(t, r, f) {
	outSet('扫描成功：');
	outLine(t);
	outLine(r);
	outLine('\n图片地址：' + f);
	if(!f || f == 'null') {
		img.src = '../../vendor/H5+/img/barcode.png';
	} else {
		plus.io.resolveLocalFileSystemURL(f, function(entry) {
			img.src = entry.toLocalURL();
		});
		//img.src = 'http://localhost:13131/'+f;
	}
}

function onempty() {
	if(window.plus) {
		plus.nativeUI.alert('无扫描记录');
	} else {
		alert('无扫描记录');
	}
}

function cleanHistroy() {
	if(blist.length > 0) {
		var hl = document.getElementById('history');
		hl.innerHTML = '<li id="nohistory" class="ditem" onclick="onempty();">无历史记录	</li>';
	}
	plus.io.resolveLocalFileSystemURL('_doc/barcode/', function(entry) {
		entry.removeRecursively(function() {
			// Success
		}, function(e) {
			//alert( "failed"+e.message );
		});
	});
}
// 打开二维码扫描界面 
function openBarcode() {
	createWithoutTitle('barcode_scan.html', {
		titleNView: {
			type: 'float',
			backgroundColor: 'rgba(215,75,40,0.3)',
			titleText: '扫一扫',
			titleColor: '#FFFFFF',
			autoBackButton: true,
			buttons: [{
				fontSrc: '_www/helloh5.ttf',
				text: '相册',
				fontSize: '15px',
				onclick: 'javascript:scanPicture()'
			}]
		}
	});
}
// 打开自定义扫描界面 
function openBarcodeCustom() {
	createWithoutTitle('barcode_custom.html', {
		titleNView: {
			type: 'float',
			backgroundColor: 'rgba(215,75,40,0.3)',
			titleText: '扫一扫',
			titleColor: '#FFFFFF',
			autoBackButton: true,
			buttons: [{
				// fontSrc: '_www/helloh5.ttf',
				text: '相册',
				fontSize: '15px',
				onclick: 'javascript:switchFlash()'
			}]
		}
	});
}

function recognitionQR(webName, qrCode) {
	if(webName == 'chargingRackID')
		workLocationChangeByQR(qrCode);
}

function workLocationChangeByQR(qrCode) {
	var selected = false;

	var numbersWorkingkLocationSlct = $('#worklocation').find("option"); //获取select下拉框的所有值
	for(var j = 0; j < numbersWorkingkLocationSlct.length; j++) {
		if($(numbersWorkingkLocationSlct[j]).val().toString() == qrCode) {
			$(numbersWorkingkLocationSlct[j]).attr("selected", "selected");
			selected = true;
			break;
		}
	}
	if(selected) {
		$('#worklocation').selectpicker('refresh');
		$('#worklocation').selectpicker('render'); 
		setTimeout(function() {
			getOnRackRecord('onRack');
		}, 100);
	} else {
		alert("未找到二维码对应的信息,请重新扫描!" + qrCode);
	}

}
//		<!-- 模态框（Modal） -->
//		<div class="modal fade" id="myModal" role="dialog" aria-hidden="true" data-backdrop='static'>
//			<div class="modal-dialog" style="width:450px">
//				<div class="modal-content">
//					<div class="modal-header">
//						<button type="button" class="close" data-dismiss="modal">x</button>
//						<h4 class="modal-title" id="myModalLabel"> 充电架记录 </h4>
//					</div>
//					<div class="modal-body" id="modal-body" style="padding-left:20px;">
//						<form id="chargingRackRecordForm">
//							<input type="text" id="id" name="id" style="display:none" />
//							<input type="text" id="plantid" name="plantid" style="display:none" />
//							<input type="text" id="processid" name="processid" style="display:none" />
//							<input type="text" id="staffid" name="staffid" style="display:none" />
//							<input type="text" id="materialid" name="materialid" style="display:none" />
//							<input type="text" id="repairid" name="repairid" style="display:none" />
//							<input type="text" id="pulloffstaffid" name="pulloffstaffid" style="display:none" />
//							<input type="text" id="repaircombine" name="repaircombine" style="display:none" />
//							<input type="text" id="status" name="status" style="display:none" />
//							<input type="text" id="pulloffstaffname" name="pulloffstaffname" style="display:none" />
//							<input type="text" id="pulloffdate" name="pulloffdate" style="display:none" />
//
//							<!--<label> 产线： </label>-->
//							<br />
//							<select class="selectpicker" id="lineid" style="width:100px;" name="lineid">
//							</select>
//							<br />
//							<br />
//							<!--<label for="name">充电架:</label>
//							<br />-->
//							<select class="selectpicker" id="worklocation" name="worklocation" style="width:100px;">
//							</select>
//							<br />
//							<br />
//							<!--<label for="name">产品型号:</label>
//							<br />-->
//							<select class="selectpicker" id="materialname" name="materialname" style="width:100px;">
//							</select>
//							<br />
//							<br />
//							<select class="selectpicker" id="materialtype" name="materialtype" style="width:100px;">
//								<option value=1>一等品</option>
//								<option value=2>二等品</option>
//								<option value=3>一次返充</option>
//								<option value=4>二次返充</option>
//							</select>
//							<br />
//							<br />
//							<div class="form-inline row">
//								<label for="name">上架数量:</label>
//								<input type="text" class="form-control" onkeyup="value=value.replace(/[^0-9]/g,'')" id="productionnumber" name="productionnumber" placeholder="请输入上架数量">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">上架时间:</label>
//								<input type="date" class="form-control" id="putondate" name="putondate">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">上架人员:</label>
//								<input type="text" class="form-control" id="staffname" name="staffname" placeholder="请输入上架员工">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">报修数量:</label>
//								<input type="text" class="form-control" onkeyup="value=value.replace(/[^0-9]/g,'')" id="repairnumber" name="repairnumber" placeholder="请输入报修数量">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">报修原因:</label>
//								<input type="text" class="form-control" id="reason" name="reason" placeholder="请输入报修原因">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">报修人员:</label>
//								<input type="text" class="form-control" id="repairname" name="repairname" placeholder="请输入报修人员">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">报修时间:</label>
//								<input type="date" class="form-control" id="repairtime" name="repairtime" onchange="lineWorkOrderModalChange()">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">在架实际数量:</label>
//								<input type="text" class="form-control" onkeyup="value=value.replace(/[^0-9]/g,'')" id="realnumber" name="realnumber" placeholder="请输入报修数量">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">备注:</label>
//								<input type="text" class="form-control" id="remark" name="remark" placeholder="请输入备注">
//							</div>
//							<br />
//						</form>
//					</div>
//					<div class="modal-footer">
//						<button type="button" class="btn btn-default" onclick="saveChargingRackRecordModel()">保存 </button>
//						<button type="button" class="btn btn-default" onclick="closeChargingRackRecordModel()">关闭 </button>
//					</div>
//				</div>
//				<!-- /.modal-content -->
//			</div>
//			<!-- /.modal -->
//		</div>