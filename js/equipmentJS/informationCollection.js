function equipParamEquipmentType() {

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
				getEquipmentInfoDataCollector();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function equipDataPlantSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getindustrialplant",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		headers: {
			Token: $.cookie('token')
		},
		processData: true,
		success: function(dataRes) {

			$("#equipDataPlantSlct").find('option').remove();
			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#equipDataPlantSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())

				}
				$('#equipDataPlantSlct').selectpicker('refresh');
				$('#equipDataPlantSlct').selectpicker('render');   
				$('#equipDataPlantSlct').selectpicker('mobile');
				//getEquipmentInfoDataCollector();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};
//
//function getEquipmentType() {
//
//	$.ajax({
//		url: window.serviceIP + "/api/basicdata/getequipmenttype",
//		type: "GET",
//
//		contentType: "application/json",
//		dataType: "json",
//		headers: {
//			Token: $.cookie('token')
//		},
//		processData: true,
//		success: function(dataRes) {
//
//			$("#equipmentType").find('option').remove();
//
//			if(dataRes.status == 1) { 
//				var models = eval("(" + dataRes.data + ")");
//				for (var  i  in  models)  {  
//					$('#equipmentType').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString());
//
//				}
//				$('#equipmentType').selectpicker('refresh');
//				$('#equipmentType').selectpicker('render');   
//				$('#equipmentType').selectpicker('mobile');
//				getEquipmentInfo();
//			} else {
//				alert("初始化数据失败！" + dataRes.message);
//			}
//		}
//	});
//
//};

function getEquipmentInfoDataCollector() {
	$.ajax({
		url: window.serviceIP + "/api/equipment/getequipmentinfo?typeID=" + document.equipmentSelectForm.equipmentType.value.toString() +
			"&plantID=" + document.equipmentSelectForm.equipDataPlantSlct.value.toString(),
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		headers: {
			Token: $.cookie('token')
		},
		processData: true,
		success: function(dataRes) {

			$("#equipmentInfo").find('option').remove();
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#equipmentInfo').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())

				}
				$('#equipmentInfo').selectpicker('refresh');
				$('#equipmentInfo').selectpicker('render'); 
				$('#equipmentInfo').selectpicker('mobile'); 
				getEquipmentParam();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

};

function getEquipmentParam() {

	var paramArray = new Array();
	$.ajax({
		url: window.serviceIP + "/api/equipment/getequipmentparam?equipmentTypeID=" +
			document.equipmentSelectForm.equipmentType.value.toString(),
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		headers: {
			Token: $.cookie('token')
		},
		processData: true,
		success: function(dataRes) {

			if(dataRes.status == 1) { 
				var mobile_flag = window.judgeAgentInfo();
				var floatFlag = "";
				var textFlag = "style=' width:100px;'"
				if(mobile_flag) {
					floatFlag = "style=' float:left;'";
					textFlag = "style=' width:100px;float:left;'";
				}

				var models = eval("(" + dataRes.data + ")");
				//var paramStr = "<div class='form-inline row'>";
				var paramStr = "";
				var file = document.getElementById('pictureName');
				file.value = '';
				for (var  i  in  models)  { 
					paramStr += "<div  style=' margin-top:10px;float:left;'>" 
					paramStr += "<label " + floatFlag + " id = \"labelName\"> &nbsp;&nbsp;&nbsp;&nbsp;" + models[i].name + "： </label>" + "<input type=\"text\" class=\"form-control\" id=\"" +
						models[i].id + "\" name=\"" + models[i].id + "\" " + textFlag + ">";
					if(models[i].units == null) {
						paramStr += "<label  " + floatFlag + " > &nbsp; </label>";
					} else {
						paramStr += "<label  " + floatFlag + " > &nbsp;" + models[i].units + " &nbsp;&nbsp;</label>";
					}
					paramStr += "</div>";
				}
				//paramStr+="</div>";
				document.getElementById("equipmentParam").innerHTML = paramStr;

				getEquipmentParamRecord();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

};

function saveEquipmentParam() {
	if(document.equipmentSelectForm.equipmentInfo.value.toString().length < 1) {
		alert("请选择设备!");
		return false;
	}
	var params = $("#equipmentParam input");
	var picLoadName = "";
	for(var i = 0; i < params.length; i++) {
		picLoadName += params[i].value;
	}
	if(picLoadName.length < 1) {
		alert("请输入数据!");
		return;
	}
	picLoadName = "";
	if($("#pictureName").get(0).files[0]) {

		var formData = new FormData($("#pictureUpload_eqpData")[0]);
		$.ajax({
			url: window.serviceIP + "/api/equipment/pictureupload",
			type: "POST",
			data: formData,
			headers: {
				Token: $.cookie('token')
			},
			cache: false, //不需要缓存
			processData: false,
			contentType: false,
			async: false,
			success: function(dataRes) {
				if(dataRes.status == 1) {
					picLoadName = dataRes.data.toString();
					document.getElementById("pictureName").value = "";
				} else {
					alert("保存失败！" + dataRes.message);
					return;
				}
			}
		});
	}

	if($("#pictureName").get(0).files.length > 0 && picLoadName.length < 3) {
		return;
	}

	var paramArray = new Array();

	for(var i = 0; i < params.length; i++) {

		paramArray.push({
			recorder: $.cookie('username'),
			equipmentTypeID: document.equipmentSelectForm.equipmentType.value.toString(),
			equipmentID: document.equipmentSelectForm.equipmentInfo.value.toString(),
			paramID: params[i].name,
			pictureFile: picLoadName,
			value: params[i].value
		});
	}

	$.ajax({
		url: window.serviceIP + "/api/equipment/saveequipmentparam",
		type: "POST",

		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(paramArray),
		headers: {
			Token: $.cookie('token')
		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				alert("保存成功！" + dataRes.message);
				getEquipmentParamRecord();
			} else {
				alert("保存失败！" + dataRes.message);
			}
		}
	});

};

function getEquipmentParamRecord() {

	if(document.equipmentSelectForm.equipmentInfo.value == null || document.equipmentSelectForm.equipmentInfo.value.toString().length < 1) {
		$('#table').bootstrapTable('destroy');
		return;
	}

	var columnsArray = [];
	var columMap = {};
	var columnsID = new Array();
	var paramName = $("#equipmentParam label");
	var paramID = $("#equipmentParam input");
	var m = 0;
	for(var i = 0; i < paramName.length; i++) {
		//alert("labelName" + paramName[i].getAttribute("id"));
		if("labelName" == (paramName[i].getAttribute("id"))) {
			//columnsID[m] = paramID[m].name;
			var clmName = paramName[i].innerHTML.replace(":", "").replace("：", "");
			columMap[paramID[m].name] = clmName;

			columnsArray.push({
				"title": clmName,
				"field": clmName
				//				switchable: true,
				//				sortable: true
			});
			m++;
		}
	}
	columnsArray.push({
		"title": "记录者",
		"field": "记录者"
	});
	columnsArray.push({
		"title": "记录时间",
		"field": "记录时间"
	});
	columnsArray.push({
		"title": "图片记录",
		"field": "图片记录"
	});
	$.ajax({
		type: "GET",
		headers: {
			Token: $.cookie('token')
		},
		url: window.serviceIP + "/api/equipment/getequipmentparamrecord?equipID=" + document.equipmentSelectForm.equipmentInfo.value.toString(),
		contentType: "application/json;charset=utf-8",
		dataType: "json",

		success: function(dataRes) {

			var models = eval("(" + dataRes.data + ")");
			var dataShow = [];
			for(var i = 0; i < models.length;) {
				var obj = {};
				for(var j = 0; j < m; j++) {
					if(j == 0) {
						obj["记录者"] = models[i + j].recorder;
						obj["记录时间"] = models[i + j].recordtime;
						obj["图片记录"] = models[i + j].picturefile;
					}
					//obj[columnsArray[j].title] = models[i + j].value;
					obj[columMap[models[i + j].paramid]] = models[i + j].value;
				}
				dataShow.push(obj);
				i += m;
			}
			$('#table').bootstrapTable('destroy').bootstrapTable({
				data: dataShow,
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
		},
		error: function() {
			alert("错误");
		}
	});

};