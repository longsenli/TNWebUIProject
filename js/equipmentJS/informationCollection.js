function getEquipmentType() {

	$.ajax({
		url: window.serviceIP + "/api/equipment/getequipmenttype",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		headers: {
			Token: $.cookie('token')
		},
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
				getEquipmentInfo();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

};

function getEquipmentInfo() {
	$.ajax({
		url: window.serviceIP + "/api/equipment/getequipmentinfo?typeID=" + document.equipmentSelectForm.equipmentType.value.toString(),
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
		url: window.serviceIP + "/api/equipment/getequipmentparam?equipmentTypeID=" + document.equipmentSelectForm.equipmentType.value.toString(),
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		headers: {
			Token: $.cookie('token')
		},
		processData: true,
		success: function(dataRes) {

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				var paramStr = "";
				var file = document.getElementById('pictureName');
				file.value = '';
				for (var  i  in  models)  {  
					paramStr += "&nbsp;&nbsp;&nbsp;&nbsp;<label id = \"labelName\"> " + models[i].name + "： </label>" + "<input type=\"text\" class=\"form-control\" id=\"" +
						models[i].id + "\" name=\"" + models[i].id + "\" style=\"width:100px;\" >";
					if(models[i].units == null) {
						paramStr += "&nbsp;&nbsp;";
					} else {
						paramStr += "&nbsp; <label> " + models[i].units + " </label>&nbsp;&nbsp;";
					}
				}

				document.getElementById("equipmentParam").innerHTML = paramStr;
				getEquipmentParamRecord();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

};

function saveEquipmentParam() {
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

	var columnsArray = [];

	var columnsID = new Array();
	var paramName = $("#equipmentParam label");
	//var paramID = $("#equipmentParam input");
	var m = 0;
	for(var i = 0; i < paramName.length; i++) {
		//alert("labelName" + paramName[i].getAttribute("id"));
		if("labelName" == (paramName[i].getAttribute("id"))) {
			//columnsID[m] = paramID[m].name;

			columnsArray.push({
				"title": paramName[i].innerHTML.replace(":", "").replace("：", ""),
				"field": paramName[i].innerHTML.replace(":", "").replace("：", ""),
				//				switchable: true,
				//				sortable: true
			});
			m++;
		}
	}
	columnsArray.push({
		"title": "记录者",
		"field": "记录者",
		switchable: true,
		sortable: true
	});
	columnsArray.push({
		"title": "记录时间",
		"field": "记录时间",
		switchable: true,
		sortable: true
	});
	columnsArray.push({
		"title": "图片记录",
		"field": "图片记录",
		switchable: true,
		sortable: true
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
					obj[columnsArray[j].title] = models[i + j].value;
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