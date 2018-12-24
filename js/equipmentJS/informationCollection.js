function getEquipmentType() {

	$.ajax({
		url: window.serviceIP + "/api/equipment/getequipmenttype",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
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
		//		headers: {
		//			Token: $.cookie('token')
		//		},
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
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				var paramStr = "";
				for (var  i  in  models)  {  
					paramStr += "<label> " + models[i].name + "： </label>" + "<input type=\"text\" class=\"form-control\" id=\"" +
						models[i].id + "\" name=\"" + models[i].id + "\" style=\"width:100px;\" >";
					if(models[i].units == null) {
						paramStr += "&nbsp;&nbsp;";
					} else {
						paramStr += "&nbsp;&nbsp; <label> " + models[i].units + " </label>&nbsp;&nbsp;";
					}
				}
				
				document.getElementById("equipmentParam").innerHTML = paramStr;
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

};

function saveEquipmentParam() {
	var paramArray = new Array();
	alert($("#equipmentParam input").length);
	var params = $("#equipmentParam input");
	for(var i = 0; i < params.length; i++) {

		paramArray.push({
			recorder: "lls",
			equipmentTypeID: document.equipmentSelectForm.equipmentType.value.toString(),
			equipmentID: document.equipmentSelectForm.equipmentInfo.value.toString(),
			paramID: params[i].name,
			value: params[i].value
		});
	}
	alert(JSON.stringify(paramArray));
	$.ajax({
		url: window.serviceIP + "/api/equipment/saveequipmentparam",
		type: "POST",

		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(paramArray),
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				alert("保存成功！" + dataRes.message);
			} else {
				alert("保存失败！" + dataRes.message);
			}
		}
	});

};