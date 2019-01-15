function infoCfgSetDisplay() {
	var tableSlctMap = {};
	tableSlctMap["sys_productionline"] = " infoTypeSlctLabel infoTypeSlct infoCfgPlantSlctLabel processSlctTypeLabel  infoCfgPlantSlct processSlctType ";
	tableSlctMap["sys_processmaterial"] = "  infoTypeSlctLabel infoTypeSlct  processSlctTypeLabel  processSlctType ";
	tableSlctMap["sys_material"] = "  infoTypeSlctLabel infoTypeSlct ";
	tableSlctMap["sys_materialrelation"] = "  infoTypeSlctLabel infoTypeSlct ";
	var cfgType = tableSlctMap[document.basicInfoCfgSelectForm.infoTypeSlct.value.toString()];

	$("#basicInfoCfgSelectForm").find('label').each(function() {
		//  param[$(this).attr('name')] = $(this).val();

		if(cfgType.indexOf(" " + $(this).attr('name') + " ") > -1) {
			// 改变 form 中指定 input 的值	
			$(this).show();
		} else {
			$(this).hide();
		}
	});
	$("#basicInfoCfgSelectForm").find('select').each(function() {
		//  param[$(this).attr('name')] = $(this).val();
		if(cfgType.indexOf(" " + this.name + " ") > -1) {
			// 改变 form 中指定 input 的值
			$(this).selectpicker('show');
		} else {
			$(this).selectpicker('hide');
		}
		//$(this).selectpicker('render');
	});

	//	var values = $($("#basicInfoCfgSelectForm").children()[0]).children();
	//
	//	for(var index = 0; index < values.length; index++) {
	//		console.log(values[index]);
	//		if(tableSlctMap[cfgType].toString().indexOf(" " + values[index].name + " ") > -1) {
	//			// 改变 form 中指定 input 的值
	//			values[index].style.display = "none";
	//			
	//		} else {
	//			values[index].style.display = "";
	//		}
	//	}

	//
	//	$("#basicInfoCfgSelectForm").find('input,textarea').each(function() {
	//		param[$(this).attr('name')] = $(this).val();
	//	});
};

function infoCfgPlantSlctFun() {
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

			$("#infoCfgPlantSlct").find('option').remove();
			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#infoCfgPlantSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#infoCfgPlantSlct').selectpicker('refresh');
				$('#infoCfgPlantSlct').selectpicker('render');   
				$('#infoCfgPlantSlct').selectpicker('mobile');
				LineCfgDatatbleFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function infoCfgProcessSlctFun() {
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
			$("#processSlctType").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#processSlctType').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#processSlctType').selectpicker('refresh');
				$('#processSlctType').selectpicker('render');   
				$('#processSlctType').selectpicker('mobile');
				LineCfgDatatbleFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function processMaterialProcessSlctFun() {
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
			$("#processSlctType").find('option').remove();
			$('#processSlctType').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString())
			$("#processid").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#processSlctType').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
					$('#processid').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#processSlctType').selectpicker('refresh');
				$('#processSlctType').selectpicker('render');   
				$('#processSlctType').selectpicker('mobile');

				$('#processid').selectpicker('refresh');
				$('#processid').selectpicker('render');   
				$('#processid').selectpicker('mobile');

				$('#inorout').selectpicker('refresh');
				$('#inorout').selectpicker('render');   
				$('#inorout').selectpicker('mobile');
				processMaterialTableFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function MaterialMaterialSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterial",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			$("#materialSlct").find('option').remove();
			$('#materialSlct').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString())
			$("#inmaterialid").find('option').remove();
			$("#outmaterialid").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#materialSlct').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
					$('#inmaterialid').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
					$('#outmaterialid').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#materialSlct').selectpicker('refresh');
				$('#materialSlct').selectpicker('render');   
				$('#materialSlct').selectpicker('mobile');

				$('#inmaterialid').selectpicker('refresh');
				$('#inmaterialid').selectpicker('render');   
				$('#inmaterialid').selectpicker('mobile');

				$('#outmaterialid').selectpicker('refresh');
				$('#outmaterialid').selectpicker('render');   
				$('#outmaterialid').selectpicker('mobile');

				materialMaterialTableFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function processMaterialMaterialTypeSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterialtype",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			$("#materialtypeid").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#materialtypeid').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#materialtypeid').selectpicker('refresh');
				$('#materialtypeid').selectpicker('render');   
				$('#materialtypeid').selectpicker('mobile');
				//$('#materialtypeid').selectpicker('hide');
				processMaterialProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function infoCfgMaterialTypeSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterialtype",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {

			$("#infoCfgMaterialTypeSlct").find('option').remove();
			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#infoCfgMaterialTypeSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#infoCfgMaterialTypeSlct').selectpicker('refresh');
				$('#infoCfgMaterialTypeSlct').selectpicker('render');   
				$('#infoCfgMaterialTypeSlct').selectpicker('mobile');
				materialCfgTableFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function LineCfgDatatbleFun() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "名称",
		"field": "name"
	});
	columnsArray.push({
		"title": "简称",
		"field": "shortname"
	});
	columnsArray.push({
		"title": "排列顺序",
		"field": "ordinal"
	});
	columnsArray.push({
		"title": "描述",
		"field": "description"
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
	formData.append("plantID", document.basicInfoCfgSelectForm.infoCfgPlantSlct.value.toString());
	formData.append("processID", document.basicInfoCfgSelectForm.processSlctType.value.toString());
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

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
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
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function selectedLineCfgRow(param) {

	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "equipment_add") {
		$("#lineConfigForm" + " #processid").val(document.basicInfoCfgSelectForm.processSlctType.value.toString());
		$("#lineConfigForm" + " #plantid").val(document.basicInfoCfgSelectForm.infoCfgPlantSlct.value.toString());

		$('#myModal').modal('show');
	} else if(optionType == "equipment_edit") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		for(var key in row[0]) {
			if(key == 0) {
				continue;
			}

			$("#lineConfigForm" + " #" + key).val(row[0][key])
			//$("#equipmentInfoManageForm" + " #" + key).attr("value", row[0][key]);
			//$("#equipmentInfoManageForm" + " #" + key).attr("value", row[0][key]);
		}
		$('#myModal').modal('show');
	} else if(optionType == "equipment_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteLineCfgInfo(row[0]["id"]);
	}
}

function deleteLineCfgInfo(equipID) {
	//	alert(equipID);
	//	var jsonStr = {};
	//	jsonStr.push({
	//		"equipID": equipID
	//	});
	//JSON.stringify(jsonStr);,
	var formData = new FormData();
	formData.append("id", id);
	$.ajax({
		url: window.serviceIP + "/api/equipment/deleteproductionline",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				LineCfgDatatbleFun();
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};

function addLineCfgInfo() {

	var formData = new FormData($("#lineConfigForm")[0]);
	$.ajax({
		url: window.serviceIP + "/api/basicdata/changeproductionline",
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
				LineCfgDatatbleFun();
				$("#myModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}

		}
	});
};

function materialCfgTableFun() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "名称",
		"field": "name"
	});
	columnsArray.push({
		"title": "简称",
		"field": "shortname"
	});

	columnsArray.push({
		"title": "描述",
		"field": "description"
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "status",
		"field": "status",
		visible: false
	});
	columnsArray.push({
		"title": "typeid",
		"field": "typeid",
		visible: false
	});
	var formData = new FormData();
	formData.append("typeID", document.basicInfoCfgSelectForm.infoCfgMaterialTypeSlct.value.toString());
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterialbytype",
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

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				$('#materialTable').bootstrapTable('destroy').bootstrapTable({
					data: models,
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
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function selectedMaterialCfgRow(param) {

	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "equipment_add") {
		$("#materialConfigForm" + " #typeid").val(document.basicInfoCfgSelectForm.infoCfgMaterialTypeSlct.value.toString());
		$("#materialConfigForm" + " #status").val(1);

		$('#myModal').modal('show');
	} else if(optionType == "equipment_edit") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		for(var key in row[0]) {
			if(key == 0) {
				continue;
			}

			$("#materialConfigForm" + " #" + key).val(row[0][key])
			//$("#equipmentInfoManageForm" + " #" + key).attr("value", row[0][key]);
			//$("#equipmentInfoManageForm" + " #" + key).attr("value", row[0][key]);
		}
		$('#myModal').modal('show');
	} else if(optionType == "equipment_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteMaterialCfg(row[0]["id"]);
	}
};

function deleteMaterialCfg(materialID) {
	//	alert(equipID);
	//	var jsonStr = {};
	//	jsonStr.push({
	//		"equipID": equipID
	//	});
	//JSON.stringify(jsonStr);,
	var formData = new FormData();
	formData.append("id", materialID);
	$.ajax({
		url: window.serviceIP + "/api/basicdata/deletematerial",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				materialCfgTableFun();
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};

function addMaterialCfgInfo() {

	var formData = new FormData($("#materialConfigForm")[0]);
	//console.log(formData);
	$.ajax({
		url: window.serviceIP + "/api/basicdata/changematerial",
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
				materialCfgTableFun();
				$("#myModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
};

function processMaterialTableFun() {
	var processMap = {};
	var materialMap = {};
	$("#processid option").each(function() {
		processMap[$(this).val()] = $(this).text();
	});
	$("#materialtypeid option").each(function() {
		materialMap[$(this).val()] = $(this).text();
		//          var val = $(this).val();
		//          var text = $(this).text();
		//          dep += '<option value="' + $(this).val() + '">' + $(this).text() + '</option>';          
	});

	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "id号",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "流程ID",
		"field": "processid",
		visible: false
	});
	columnsArray.push({
		"title": "流程",
		"field": "processname"
	});
	columnsArray.push({
		"title": "物料类型",
		"field": "materialtypeid",
		visible: false
	});
	columnsArray.push({
		"title": "物料类型",
		"field": "typename"
	});
	columnsArray.push({
		"title": "输入产出",
		"field": "inorout",
	});
	columnsArray.push({
		"title": "status",
		"field": "status",
		visible: false
	});
	var formData = new FormData();
	formData.append("processID", document.basicInfoCfgSelectForm.processSlctType.value.toString());
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getprocessmaterialtype",
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

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				var dataShow = [];
				for(var i = 0; i < models.length; i++) {
					var obj = {};

					obj["id"] = models[i].id; 
					obj["processid"] = models[i].processid;
					obj["processname"] = processMap[models[i].processid];
					obj["materialtypeid"] = models[i].materialtypeid;
					obj["typename"] = materialMap[models[i].materialtypeid];
					if(models[i].inorout == "1")
						obj["inorout"] = "输入"; 
					else
						obj["inorout"] = "产出"; 
					obj["status"] = models[i].status;

					dataShow.push(obj);
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
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function selectedProcessMaterialRow(param) {

	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "equipment_add") {
		$("#ProcessMaterialTypeForm" + " #status").val(1);

		$('#myModal').modal('show');
	} else if(optionType == "equipment_edit") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		for(var key in row[0]) {
			if(key == 0) {
				continue;
			}
			$("#ProcessMaterialTypeForm" + " #" + key).val(row[0][key])
			//$("#equipmentInfoManageForm" + " #" + key).attr("value", row[0][key]);
			//$("#equipmentInfoManageForm" + " #" + key).attr("value", row[0][key]);
		}
		$('#myModal').modal('show');
	} else if(optionType == "equipment_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteProcessMaterial(row[0]["id"]);
	}
};

function deleteProcessMaterial(materialID) {
	//	alert(equipID);
	//	var jsonStr = {};
	//	jsonStr.push({
	//		"equipID": equipID
	//	});
	//JSON.stringify(jsonStr);,
	var formData = new FormData();
	formData.append("id", materialID);
	$.ajax({
		url: window.serviceIP + "/api/basicdata/deleteprocessmaterialtype",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				processMaterialTableFun();
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};

function addProcessMaterial() {

	var formData = new FormData($("#ProcessMaterialTypeForm")[0]);
	//console.log(formData);
	$.ajax({
		url: window.serviceIP + "/api/basicdata/changeprocessmaterialtype",
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
				processMaterialTableFun();
				$("#myModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
};

function materialMaterialTableFun() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "id号",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "输入物料",
		"field": "inmaterialid"
	});
	columnsArray.push({
		"title": "输出物料",
		"field": "outmaterialid"
	});
	columnsArray.push({
		"title": "比例关系",
		"field": "proportionality"
	});
	columnsArray.push({
		"title": "status",
		"field": "status",
		visible: false
	});
	var formData = new FormData();
	formData.append("materialID", document.basicInfoCfgSelectForm.materialSlct.value.toString());
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterialrelationbymaterial",
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

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");

				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
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
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function selectedMaterialMaterialRow(param) {

	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "equipment_add") {

		$('#myModal').modal('show');
	} else if(optionType == "equipment_delete") {
		if(row.length < 1) {
			alert("请选择行数据!");
			return;
		}
		deleteMaterialMaterial(row[0]["id"]);
	}
};

function deleteMaterialMaterial(materialID) {
	//	alert(equipID);
	//	var jsonStr = {};
	//	jsonStr.push({
	//		"equipID": equipID
	//	});
	//JSON.stringify(jsonStr);,
	var formData = new FormData();
	formData.append("id", materialID);
	$.ajax({
		url: window.serviceIP + "/api/basicdata/deletematerialrelation",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				alert('删除成功!');
				materialMaterialTableFun();
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};

function addMaterialMaterialRelation() {

	var formData = new FormData($("#MaterialMaterialForm")[0]);
	//console.log(formData);
	$.ajax({
		url: window.serviceIP + "/api/basicdata/changematerialrelation",
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
				materialMaterialTableFun();
				$("#myModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
};

function infoCfgEquipTypeSlctFun() {
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

			$("#infoCfgEquipTypeSlct").find('option').remove();
			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#infoCfgEquipTypeSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#infoCfgEquipTypeSlct').selectpicker('refresh');
				$('#infoCfgEquipTypeSlct').selectpicker('render');   
				$('#infoCfgEquipTypeSlct').selectpicker('mobile');
				equipParamCfgTableFun();
				basicParamCfgTableFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function changeEquipParamConfigFun() {
	var row = $.map($('#basicParamTable').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	var paramList = "";
	for(var i = 0; i < row.length; i++) {
		paramList += row[i]["id"] + "###";
	}
	var formData = new FormData();
	formData.append("params", paramList);
	formData.append("equipmentTypeID", document.basicInfoCfgSelectForm.infoCfgEquipTypeSlct.value.toString());
	$.ajax({
		url: window.serviceIP + "/api/equipment/updateequipmentparam",
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

			//console.log(dataRes);
			if(dataRes.status == 1) { 
				equipParamCfgTableFun();

			} else {
				alert("跟新参数配置失败！" + dataRes.message);
			}
		}
	});
}

function basicParamCfgTableFun() {
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
		"title": "参数名",
		"field": "name"
	});
	columnsArray.push({
		"title": "描述",
		"field": "description"
	});
	columnsArray.push({
		"title": "值类型",
		"field": "type"
	});
	columnsArray.push({
		"title": "单位",
		"field": "units"
	});
	columnsArray.push({
		"title": "最大值",
		"field": "max"
	});
	columnsArray.push({
		"title": "最小值",
		"field": "min"
	});

	var formData = new FormData();
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getparameterinfo",
		type: "GET",
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");

				$('#basicParamTable').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar1',
					singleSelect: false,
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
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function equipParamCfgTableFun() {
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
		"title": "参数名",
		"field": "name"
	});
	columnsArray.push({
		"title": "描述",
		"field": "description"
	});
	columnsArray.push({
		"title": "值类型",
		"field": "type"
	});
	columnsArray.push({
		"title": "单位",
		"field": "units"
	});
	columnsArray.push({
		"title": "最大值",
		"field": "max"
	});
	columnsArray.push({
		"title": "最小值",
		"field": "min"
	});

	var formData = new FormData();
	formData.append("equipmentTypeID", document.basicInfoCfgSelectForm.infoCfgEquipTypeSlct.value.toString());
	$.ajax({
		url: window.serviceIP + "/api/equipment/getequipmentparam",
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

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");

				$('#equipParamTable').bootstrapTable('destroy').bootstrapTable({
					data: models,
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
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}