function equipStatusMntPlantSlctFun() {
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
					$('#equipMngPlantSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())

				}
				$('#equipMngPlantSlct').selectpicker('refresh');
				$('#equipMngPlantSlct').selectpicker('render');   
				$('#equipMngPlantSlct').selectpicker('mobile');
				equipStatusMntEquipmentType();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function equipStatusMntEquipmentType() {

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
					$('#equipmentType').append(("<option value=" + models[i].id + ">" + models[i].name + "</option>").toString())
				}
				$('#equipmentType').selectpicker('refresh');
				$('#equipmentType').selectpicker('render');   
				$('#equipmentType').selectpicker('mobile');
				equipStatusMntParamType()
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function equipStatusMntParamType() {

	$.ajax({
		url: window.serviceIP + "/api/equipment/getequipmentparam?equipmentTypeID="
		+ document.equipmentSelectForm.equipmentType.value.toString(),
		type: "GET",
		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {

			$("#equipmentParamType").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#equipmentParamType').append(("<option value=" + models[i].id + "###" + models[i].units+ ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#equipmentParamType').selectpicker('refresh');
				$('#equipmentParamType').selectpicker('render');   
				$('#equipmentParamType').selectpicker('mobile');
				equipStatusMntInit()
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function equipStatusMntInit() {
	$.ajax({
		url: window.serviceIP + "/api/equipment/getlatestparamrecord?equipType=" 
		+ document.equipmentSelectForm.equipmentType.value.toString()
		+ "&plantID=" +document.equipmentSelectForm.equipMngPlantSlct.value.toString()
		+ "&paramID=" + document.equipmentSelectForm.equipmentParamType.value.toString().split("###")[0],
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		headers: {
			Token: $.cookie('token')
		},
		processData: true,
		success: function(dataRes) {
			var controller = "";
			var units = document.equipmentSelectForm.equipmentParamType.value.toString().split("###")[1];
			if(units == "undefined")
			{
				units = "";
			}
				if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for(var i in models){
				controller += "<div class =\"TempContral\"><div class =\"TempContralInner\">"
				+models[i].value + units +  "</div><br/><br/><br/>"
		+ "<label class =\"fontStyle\">&nbsp; 人员：" + models[i].recorder+"</label><label  class =\"fontStyle\">  &nbsp; 时间："
		+ models[i].recordTime + "</label><label class =\"fontStyle\">  &nbsp; 名称：" + models[i].equipName + "</label></div>"
		
				}
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
			document.getElementById("tempControlerShow").innerHTML = controller;
		}
	});

//	var controller = "";
//	for(var i = 0; i < 30; i++)
//	{
//		controller += "<div class =\"TempContral\"><div class =\"TempContralInner\">35℃</div><br/><br/><br/>"
//		+ "<label class =\"fontStyle\">&nbsp; 人员：** </label><br/><label  class =\"fontStyle\">  &nbsp; 时间： **</label><br/><label class =\"fontStyle\">  &nbsp; 位置： **</label></div>"
//	}
//		
//	document.getElementById("tempControlerShow").innerHTML = controller;
}