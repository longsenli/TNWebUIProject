function LSworkOrderIndustrialPlantSlctFunEdit(flag,industrialplant_id, productionprocess_id, productionline_id) {
	console.log("产线id:"+productionline_id);
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

			$("#edit_industrialplant_id").find('option').remove();
			$('#edit_industrialplant_id').append(("<option value=''>" + "全部"  + "</option>").toString());
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {
					if (industrialplant_id==models[i].id) {
						$('#edit_industrialplant_id').append(("<option  selected='selected' value=" + models[i].id +">" + models[i].name.toString()  + "</option>").toString())
					}else{
						$('#edit_industrialplant_id').append(("<option value=" + models[i].id +">" + models[i].name.toString()  + "</option>").toString())
					}
				}
				$('#edit_industrialplant_id').selectpicker('refresh');
				$('#edit_industrialplant_id').selectpicker('render');   
				// $('#edit_industrialplant_id').selectpicker('mobile');
				if(flag = "1")
					LSworkOrderProductionProcessSlctFunEdit(productionprocess_id,productionline_id);
				else
					LSworkOrderProductionLineSlctFunEdit(productionline_id);
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function LSworkOrderProductionProcessSlctFunEdit(productionprocess_id,productionline_id) {
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
			$("#edit_productionprocess_id").find('option').remove();
			$('#edit_productionprocess_id').append(("<option value=''>" + "全部流程"  + "</option>").toString());
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					if (productionprocess_id==models[i].id) {
						$('#edit_productionprocess_id').append(("<option selected='selected' value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
					}else{
						$('#edit_productionprocess_id').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
					}
				}
				//console.log($('#edit_productionprocess_id'));
				$('#edit_productionprocess_id').selectpicker('refresh');
				$('#edit_productionprocess_id').selectpicker('render');   
				// $('#edit_productionprocess_id').selectpicker('mobile');
				LSworkOrderProductionLineSlctFunEdit(productionline_id);
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function LSworkOrderProductionLineSlctFunEdit(productionline_id) {
	//	return true;
	//	if(!($.isEmptyObject(first)) && first.toString().length > 1) {
	//
	//		return;
	//	}
	//alert("生产线选择");
	var formData = new FormData();
	formData.append("plantID", document.getElementById('edit_industrialplant_id').value);
	formData.append("processID", document.getElementById('edit_productionprocess_id').value);
	
	console.log("厂区:" + document.getElementById('edit_industrialplant_id').value + "流程:"+ document.getElementById('edit_productionprocess_id').value +"产线:"+document.getElementById('edit_productionline_id').value);
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

			$("#edit_productionline_id").find('option').remove();
			$('#edit_productionline_id').append(("<option value=''>" + "全部产线"  + "</option>").toString());

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					if (productionline_id==models[i].id) {
						$('#edit_productionline_id').append(("<option selected='selected' value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
					}else{
						$('#edit_productionline_id').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
					}
				}
				$('#edit_productionline_id').selectpicker('refresh');
				$('#edit_productionline_id').selectpicker('render');   
				// $('#edit_productionline_id').selectpicker('mobile');
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

//调用工位方法
function editSubOrderWorkingLocationSlctFun() {
	var formData = new FormData();
//	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
//	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
//	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	formData.append("plantID", $("#edit_industrialplant_id").val());
	formData.append("processID", $("#edit_productionprocess_id").val());
	formData.append("lineID", $("#edit_productionline_id").val());
//	console.log(document.addUserForm.industrialplant_id.value.toString())
//	console.log(document.addUserForm.productionprocess_id.value.toString())
//	console.log(document.addUserForm.productionline_id.value.toString())
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
			$("#edit_workingkLocationSlct").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				if(models.length < 1) {
					$("#edit_workingkLocationSlctLabel").hide();//.css("display", "none")
					$('#edit_workingkLocationSlct').selectpicker('hide');

				} 
//				else {
//					$("#edit_workingkLocationSlctLabel").show();//.attr("display", "block")
//					$('#edit_workingkLocationSlct').selectpicker('show');
//				}
				for (var  i  in  models)  {  
					$('#edit_workingkLocationSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#edit_workingkLocationSlct').selectpicker('refresh');
				$('#edit_workingkLocationSlct').selectpicker('render');   
				// $('#edit_workingkLocationSlct').selectpicker('mobile');
				if(localStorage.getItem('workingkLocation') != null && localStorage.getItem('workingkLocation') != 'undefined' && localStorage.getItem('workingkLocation').toString().length > 0) {	
					var numbers = $('#edit_workingkLocationSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('lineID')) {
							$(numbers[j]).attr("selected", "selected");
							//$('#edit_workingkLocationSlct').selectpicker('hide');
							//$("#edit_workingkLocationSlctLabel").css("display", "true");
						}
					}
					$('#edit_workingkLocationSlct').selectpicker('refresh');
					$('#edit_workingkLocationSlct').selectpicker('render'); 
				}
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};