function queryDailyProductionPlantSlctFun(flag) {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getindustrialplant",
		type: "GET",
		async: false,
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
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				// $('#industrialPlantSlct').selectpicker('mobile');

				if(localStorage.getItem('plantID') != null && localStorage.getItem('plantID') != 'undefined' && localStorage.getItem('plantID').toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString().split("###")[0] == localStorage.getItem('plantID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#industrialPlantSlct').selectpicker('hide');

							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#industrialPlantSlct').selectpicker('refresh');
					$('#industrialPlantSlct').selectpicker('render'); 

				}

				$('#materialType').selectpicker('refresh');
				$('#materialType').selectpicker('render');   

				$('#materialType').selectpicker('hide');
				if(flag = "1") {
					setTimeout(queryDailyProductionProcessSlctFun(), 200);
				}
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

};

function productionStatisBatteryTypeSlctFun(flag) {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterialbyprocess?processID=1008",
		type: "GET",

		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		async: false,
		success: function(dataRes) {

			$("#batterytype").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#batterytype').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#batterytype').selectpicker('refresh');
				$('#batterytype').selectpicker('render');   
				// $('#batterytype').selectpicker('mobile');
				$('#batterytype').selectpicker('hide');
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
};

function queryDailyProductionProcessSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getproductionprocess",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		async: false,
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
				// $('#productionProcessSlct').selectpicker('mobile');

				if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString().split("###")[0] == localStorage.getItem('processID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionProcessSlct').selectpicker('hide');

							$("#productionProcessLabel").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 
				}

				setTimeout(queryDailyProductionLineSlctFun(), 200);
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

};

function queryDailyProductionLineSlctFun() {
	//	return true;
	//	if(!($.isEmptyObject(first)) && first.toString().length > 1) {
	//
	//		return;
	//	}
	//alert("生产线选择");

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
		async: false,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			$("#productionLineSlct").find('option').remove();
			$('#productionLineSlct').append(("<option value=" + "-1" + ">" + "全部产线"  + "</option>").toString());

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');  
				$('#productionLineSlct').selectpicker('hide');   
				// $('#productionLineSlct').selectpicker('mobile');

				setTimeout(queryDailyProductionWorkingLocationSlctFun(), 200);;
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function queryDailyProductionWorkingLocationSlctFun() {
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

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#workingkLocationSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#workingkLocationSlct').selectpicker('refresh');
				$('#workingkLocationSlct').selectpicker('render');   
				$('#workingkLocationSlct').selectpicker('hide');   
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getDailyProduction() {
	$('#tableInfoShow').show();
	$('#pictureInfoShow').hide();
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	if(' byLine byMaterial byWorkingLocation byStaff byClassType byStaffAndMaterial'.indexOf(document.PlantToLineSelectForm.queryType.value) > -1) {

		if(document.PlantToLineSelectForm.queryType.value.toString() == 'byStaff' ||
			document.PlantToLineSelectForm.queryType.value.toString() == 'byStaffAndMaterial') {
			columnsArray.push({
				width: 300,
				"title": "员工",
				"field": "inputer"
			});
		}
		if(document.PlantToLineSelectForm.queryType.value.toString() == 'byLine') {
			columnsArray.push({
				width: 300,
				"title": "产线",
				"field": "inputLineID",
				formatter: function(value, row, index) {
					return $("#productionLineSlct option[value='" + row.inputLineID + "']").text();
				}
			});
		}
		if(document.PlantToLineSelectForm.queryType.value.toString() == 'byMaterial' ||
			document.PlantToLineSelectForm.queryType.value.toString() == 'byStaffAndMaterial') {
			columnsArray.push({
				width: 300,
				"title": "物料",
				"field": "materialNameInfo"
			});
		}
		if(document.PlantToLineSelectForm.queryType.value.toString() == 'byWorkingLocation') {
			columnsArray.push({
				width: 300,
				"title": "工位",
				"field": "inputWorkLocationID",
				formatter: function(value, row, index) {
					return $("#workingkLocationSlct option[value='" + row.inputWorkLocationID + "']").text();
				}
			});
		}

		columnsArray.push({
			width: 300,
			"title": "班次",
			"field": "orderHour"
		});

		columnsArray.push({
			width: 300,
			"title": "日期",
			"field": "orderDay"
		});
		columnsArray.push({
			width: 300,
			"title": "总产量",
			"field": "sumProduction"
		});
	}
	if(document.PlantToLineSelectForm.queryType.value.toString() == 'byWage') {
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
			"title": "工资",
			"field": "wage"
		});
		columnsArray.push({
			width: 300,
			"title": "物料型号",
			"field": "materialName"
		});
		columnsArray.push({
			width: 300,
			"title": "产量",
			"field": "productionNumber"
		});
		columnsArray.push({
			width: 300,
			"title": "单价",
			"field": "unitPrice"
		});

	}
	if(document.PlantToLineSelectForm.queryType.value.toString() == 'byOrderDetail') {
		columnsArray.push({
			width: 300,
			"title": "日期",
			"field": "orderDay"
		});
		columnsArray.push({
			width: 300,
			"title": "班次",
			"field": "orderHour"
		});
		columnsArray.push({
			width: 300,
			"title": "工单号",
			"field": "subOrderID"
		});
		columnsArray.push({
			width: 300,
			"title": "物料型号",
			"field": "materialNameInfo"
		});
		columnsArray.push({
			width: 300,
			"title": "产量",
			"field": "number"
		});
		columnsArray.push({
			width: 300,
			"title": "完成人员",
			"field": "inputer"
		});
		columnsArray.push({
			width: 300,
			"title": "完成时间",
			"field": "inputTime",
			formatter: function(value, row, index) {
				//console.log(value);
				if(value) {
					return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
				}

			}
		});
	}

	if(document.PlantToLineSelectForm.queryType.value.toString() == 'byLineMaterial') {
		if(document.PlantToLineSelectForm.productionProcessSlct.value.toString() == windowProcessEnum.CD) {
			columnsArray.push({
				width: 300,
				"title": "日期",
				"field": "timeStr"
			});

			columnsArray.push({
				width: 300,
				"title": "产线",
				"field": "lineID",
				formatter: function(value, row, index) {
					return $("#productionLineSlct option[value='" + row.lineID + "']").text();
				}
			});

			columnsArray.push({
				width: 300,
				"title": "物料型号",
				"field": "materialName"
			});

			columnsArray.push({
				"title": "物料类型",
				"field": "materialType",
				formatter: function(value, row, index) {
					return $("#materialType option[value='" + row.materialType + "']").text();
				}
			});

			columnsArray.push({
				width: 300,
				"title": "上架数量",
				"field": "onTotalNum"
			});

			columnsArray.push({
				width: 300,
				"title": "下架数量",
				"field": "offTotalNum"
			});

			columnsArray.push({
				width: 300,
				"title": "不良数量",
				"field": "repairNum"
			});

			columnsArray.push({
				width: 300,
				"title": "实际下架",
				"field": "realNum"
			});

		} else {
			columnsArray.push({
				width: 300,
				"title": "产线",
				"field": "inputLineID",
				formatter: function(value, row, index) {
					return $("#productionLineSlct option[value='" + row.inputLineID + "']").text();
				}
			});

			columnsArray.push({
				width: 300,
				"title": "物料型号",
				"field": "materialNameInfo"
			});

			columnsArray.push({
				width: 300,
				"title": "班次",
				"field": "orderHour"
			});

			columnsArray.push({
				width: 300,
				"title": "日期",
				"field": "orderDay"
			});
			columnsArray.push({
				width: 300,
				"title": "总产量",
				"field": "sumProduction"
			});
		}
	}

	if(document.PlantToLineSelectForm.queryType.value.toString() == 'byLineExpend') {
		columnsArray.push({
			width: 300,
			"title": "产线",
			"field": "outputLineID",
			formatter: function(value, row, index) {
				return $("#productionLineSlct option[value='" + row.outputLineID + "']").text();
			}
		});

		columnsArray.push({
			width: 300,
			"title": "物料型号",
			"field": "materialNameInfo"
		});

		columnsArray.push({
			width: 300,
			"title": "班次",
			"field": "banci"
		});

		columnsArray.push({
			width: 300,
			"title": "日期",
			"field": "dayTime"
		});
		columnsArray.push({
			width: 300,
			"title": "投料数量",
			"field": "number"
		});
	}

	if(document.PlantToLineSelectForm.queryType.value.toString() == 'byStaffExpend') {
		columnsArray.push({
			width: 300,
			"title": "人员",
			"field": "outputer"
		});

		columnsArray.push({
			width: 300,
			"title": "物料型号",
			"field": "materialNameInfo"
		});

		columnsArray.push({
			width: 300,
			"title": "班次",
			"field": "banci"
		});

		columnsArray.push({
			width: 300,
			"title": "日期",
			"field": "dayTime"
		});
		columnsArray.push({
			width: 300,
			"title": "投料数量",
			"field": "number"
		});
	}

	if(document.PlantToLineSelectForm.queryType.value.toString() == 'byGrantMaterial') {
		columnsArray.push({
			width: 300,
			"title": "物料型号",
			"field": "materialName"
		});

		columnsArray.push({
			width: 300,
			"title": "数量",
			"field": "number"
		});
		columnsArray.push({
			width: 300,
			"title": "班次",
			"field": "classType"
		});
		columnsArray.push({
			width: 300,
			"title": "日期",
			"field": "grantDayTime"
		});

		columnsArray.push({
			width: 300,
			"title": "接收部门",
			"field": "acceptPlant"
		});

	}

	if(document.PlantToLineSelectForm.queryType.value.toString() == 'byGainMaterial') {
		columnsArray.push({
			width: 300,
			"title": "物料型号",
			"field": "materialName"
		});

		columnsArray.push({
			width: 300,
			"title": "数量",
			"field": "number"
		});
		columnsArray.push({
			width: 300,
			"title": "班次",
			"field": "classType"
		});
		columnsArray.push({
			width: 300,
			"title": "日期",
			"field": "grantDayTime"
		});

		columnsArray.push({
			width: 300,
			"title": "发放部门",
			"field": "grantPlant"
		});

	}

	if(document.PlantToLineSelectForm.queryType.value.toString() == 'byScrapMaterial') {
		columnsArray.push({
			width: 300,
			"title": "物料型号",
			"field": "materialName"
		});

		columnsArray.push({
			width: 300,
			"title": "报废数量",
			"field": "scrapNumber"
		});

		columnsArray.push({
			width: 300,
			"title": "班次",
			"field": "classType"
		});

		columnsArray.push({
			width: 300,
			"title": "报废日期",
			"field": "productDayStr"
		});

	}

	//console.log(document.PlantToLineSelectForm.queryType.value.toString().indexOf('And') );

	var urlStr = window.serviceIP + "/api/dashboard/getdailyproduction?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&queryTypeID=" + document.PlantToLineSelectForm.queryType.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 02:00:00" + "&endTime=" + document.getElementById("endTime").value + " 23:00:00";

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
					singleSelect: false,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 15,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//>>>>>>>>>>>>>>导出excel表格设置
					showExport: true, //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
					exportDataType: "basic", //basic', 'all', 'selected'.
					exportTypes: ['doc', 'excel'], //导出类型'json','xml','png','csv','txt','sql','doc','excel','xlsx','pdf'
					//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
					exportOptions: { //导出参数
						ignoreColumn: [0, 0], //忽略某一列的索引  
						fileName: '数据导出', //文件名称设置  
						worksheetName: 'Sheet1', //表格工作区名称  
						tableName: '数据导出表',
						excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
						//onMsoNumberFormat: DoOnMsoNumberFormat  
					},
					//导出excel表格设置<<<<<<<<<<<<<<<<
					search: true,
					pagination: true,
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getSelfProductionRecord() {
	$('#tableInfoShow').show();
	$('#pictureInfoShow').hide();
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});

	columnsArray.push({
		width: 300,
		"title": "姓名",
		"field": "inputer"
	});
	columnsArray.push({
		width: 300,
		"title": "物料型号",
		"field": "materialNameInfo"
	});
	columnsArray.push({
		width: 300,
		"title": "工单号",
		"field": "subOrderID"
	});

	columnsArray.push({
		width: 300,
		"title": "产量",
		"field": "number"
	});
	columnsArray.push({
		width: 300,
		"title": "完成时间",
		"field": "inputTime"
	});
	var time = new Date(document.getElementById("endTime").value);
	time.setDate(time.getDate() + 1);

	var urlStr = window.serviceIP + "/api/material/getShelfProductionRecord?staffID=" + localStorage.userID +
		"&startTime=" + document.getElementById("startTime").value + " 07:00:00" + "&endTime=" + time.format("yyyy-MM-dd") + " 07:00:00";

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
					singleSelect: false,
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

function getOrderInfoDetail(workOrder) {
	$('#tableInfoShow').show();
	$('#pictureInfoShow').hide();

	//console.log("gainMaterialByQR" + recordID);
	var recordID = $('#subOrderName').val().trim();

	if(workOrder) {
		recordID = workOrder;
	}
	if(recordID.length < 2) {
		alert("请输入工单号!")
		return;
	}

	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "工单号",
		"field": "subOrderID"
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialNameInfo"
	});
	columnsArray.push({
		"title": "数量",
		"field": "number"
	});
	columnsArray.push({
		"title": "入库人员",
		"field": "inputer"
	});
	columnsArray.push({
		"title": "入库时间",
		"field": "inputTime",
		formatter: function(value, row, index) {
			console.log(value);
			if(value) {
				return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			}

		}
	});
	columnsArray.push({
		"title": "发料人员",
		"field": "grantOperator"
	});
	columnsArray.push({
		"title": "发料时间",
		"field": "grantTime",
		formatter: function(value, row, index) {
			if(value) {
				return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			}
		}
	});

	columnsArray.push({
		"title": "投料人员",
		"field": "outputer"
	});
	columnsArray.push({
		"title": "投料时间",
		"field": "outputTime",
		formatter: function(value, row, index) {
			if(value) {
				return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			}
		}
	});
	columnsArray.push({
		"title": "投入工单",
		"field": "expendOrderID"
	});

	$.ajax({
		url: window.serviceIP + "/api/material/getmaterialrecorddetailbysuborderid?subOrderID=" + recordID,
		type: "GET",
		processData: true,
		contentType: "application/json",
		dataType: "json",
		//data: formData,
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");

				if(models.length < 1) {
					alert("未获取到物料信息,请核对!" + recordID);
					return;
				}
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#usableMaterialTableToolbar',
					toolbarAlign: "left",
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
					search: false,
					searchAlign: 'left',
					pagination: true,
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

//浇铸目前在窑中数据
function nowInDryingKilnjz() {
	$('#tableInfoShow').show();
	$('#pictureInfoShow').hide();
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "硬化窑名称",
		"field": "dryingKilnName"
	});
	columnsArray.push({
		"title": "工单批次号",
		"field": "suborderID"
	});
	columnsArray.push({
		"title": "厂区",
		"field": "plantname"
	});
	columnsArray.push({
		"title": "产线",
		"field": "linename"
	});
	columnsArray.push({
		"title": "工位",
		"field": "workLocationName"
	});
	columnsArray.push({
		"title": "入窑人",
		"field": "inputerName"
	});
	columnsArray.push({
		"title": "入窑时间",
		"field": "inputTime"
	});
	columnsArray.push({
		"title": "物料类型",
		"field": "materialName"
	});
	columnsArray.push({
		"title": "物料数量",
		"field": "materialQuantity"
	});
	var urlStr = window.serviceIP + "/api/dashboard/nowInDryingKilnjz?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&queryTypeID=" + document.PlantToLineSelectForm.queryType.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 02:00:00" + "&endTime=" + document.getElementById("endTime").value + " 23:00:00";

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
					singleSelect: false,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 15,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					showToggle: true,
					showRefresh: true,
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
};

var accept_webName = null;
//重写scanQR方法
function scanQR(grantType) {
	//执行H5扫描二维码方法
	openBarcode();
	accept_webName = grantType;
}

////////以下是H5+调用摄像头进行扫一扫
// alert(openBarcode())
var img = null;
var blist = [];

function scaned(t, r, f) {
	// alert('t='+t+'r='+r+'f='+f);
	//获取扫描二维码信息
	recognitionQR(accept_webName, r);
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
	$("#subOrderName").val(qrCode);
	getOrderInfoDetail();
}

function productionInfoPictureShow() {

	if(document.PlantToLineSelectForm.queryType.value.toString() != "byLine") {
		return;
	}
	var heightAll = 500;
	if($("#productionDashboardShow")) {
		if(($(window).height() - $("#leftContainer1").offset().top) < 800) {
			heightAll = 800 - 70;

		} else {
			//$("#productionDashboardShow").height($(window).height());
			heightAll = ($(window).height() - $("#productionPictureShow").offset().top) - 100;
		}
	}
	$("#leftContainer1").height(heightAll + 60);
	$("#productionPictureShow").height(heightAll);
	$('#tableInfoShow').hide();
	$('#pictureInfoShow').show();
	$('#table').bootstrapTable('destroy');
	var urlStr = window.serviceIP + "/api/dashboard/getdailyproduction?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&queryTypeID=" + document.PlantToLineSelectForm.queryType.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 02:00:00" + "&endTime=" + document.getElementById("endTime").value + " 23:00:00";

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
				var productionInfoData = eval("(" + dataRes.data + ")");

				var lineNameProductionMap = {};
				var lineBBProductionMap = {};
				var lineYBProductionMap = {};

				var lineNameArray = [];
				var lineBBProductionArray = [];
				var lineYBProductionArray = [];
				var lineProductionArray = [];
				var totalProduction = 0;
				var tmpNumber = 0;

				//MAP数据
				for(var i in productionInfoData) {
					if(productionInfoData[i].orderHour == "总计") {
						continue;
					}

					if(!lineNameProductionMap.hasOwnProperty(productionInfoData[i].inputLineID)) {
						lineNameProductionMap[productionInfoData[i].inputLineID] = productionInfoData[i].inputLineID;
					}
					if(productionInfoData[i].orderHour == "白班") {
						if(lineBBProductionMap.hasOwnProperty(productionInfoData[i].inputLineID)) {
							lineBBProductionMap[productionInfoData[i].inputLineID] = lineBBProductionMap[productionInfoData[i].inputLineID] + productionInfoData[i].sumProduction;
						} else {
							lineBBProductionMap[productionInfoData[i].inputLineID] = productionInfoData[i].sumProduction;
						}
						continue;
					}
					if(productionInfoData[i].orderHour == "夜班") {
						if(lineYBProductionMap.hasOwnProperty(productionInfoData[i].inputLineID)) {
							lineYBProductionMap[productionInfoData[i].inputLineID] = lineYBProductionMap[productionInfoData[i].inputLineID] + productionInfoData[i].sumProduction;
						} else {
							lineYBProductionMap[productionInfoData[i].inputLineID] = productionInfoData[i].sumProduction;
						}
						continue;
					}

				}

				//MAP数据转为数组
				$.each(lineNameProductionMap, function(key, values) {
					tmpNumber = 0;
					lineNameArray.push($("#productionLineSlct option[value='" + key + "']").text());
					if(lineBBProductionMap.hasOwnProperty(key)) {
						tmpNumber += lineBBProductionMap[key];
						totalProduction += lineBBProductionMap[key];
						lineBBProductionArray.push(lineBBProductionMap[key]);
					} else {
						lineBBProductionArray.push(0);
					}

					if(lineYBProductionMap.hasOwnProperty(key)) {
						tmpNumber += lineYBProductionMap[key];
						totalProduction += lineYBProductionMap[key];
						lineYBProductionArray.push(lineYBProductionMap[key]);
					} else {
						lineYBProductionArray.push(0);
					}
					lineProductionArray.push(tmpNumber);

				});

				var realWidth = ($("#productionPictureShow").width() * 0.65) / (lineNameArray.length * 2);

				//产量进度条形图
				var pictureShowECharts = echarts.init(document.getElementById("productionPictureShow"));
				// 指定图表的配置项和数据
				var optionProductionPicture = {
					title: {
						text: "产量汇总图(" + totalProduction + ")",
						textStyle: {
							fontWeight: 'bold', //标题颜色
							fontSize: '28',
							color: '#FFFFFF'
						},
						left: 'center'

						//			text: ‘十大高耗水行业用水量八减两增 ‘,    //标题
						//              backgroundColor: ‘#ff0000‘,            //背景
						//                      subtext: ‘同比百分比(%)‘,               //子标题
						//
						//              textStyle: {
						//                      fontWeight: ‘normal‘,              //标题颜色
						//                      color: ‘#408829‘
						//              },
						//
						//              x:"center"    
					},
					//鼠标触发提示数量
					tooltip: {
						trigger: "axis",
					},
					legend: {
						show: true,
						orient: 'vertical', // 'vertical'
						x: 'right', // 'center' | 'left' | {number},
						y: 'top', // 'center' | 'bottom' | {number}
						//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
						data: ["白班产量", "夜班产量", "总产量"],
						textStyle: {
							fontSize: 18,
							color: "#FFFFFF"
						}
					},
					//x轴显示
					xAxis: {
						data: lineNameArray,
						splitLine: {　　　　
							show: false　　
						},
						axisLine: {
							lineStyle: {
								color: '#FFFFFF',
								width: 2
							}
						},
						axisLabel: { //设置坐标轴刻度样式
							textStyle: {
								fontSize: 14,
								fontWeight: 'normal',
							},
							interval: 0,
							formatter: function(value) {
								//debugger
								var ret = ""; //拼接加\n返回的类目项  
								var maxLength = 4; //每项显示文字个数  
								var valLength = value.length; //X轴类目项的文字个数  
								var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
								if(rowN > 1) //如果类目项的文字大于3,  
								{
									for(var i = 0; i < rowN; i++) {
										var temp = ""; //每次截取的字符串  
										var start = i * maxLength; //开始截取的位置  
										var end = start + maxLength; //结束截取的位置  
										//这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
										temp = value.substring(start, end) + "\n";
										ret += temp; //凭借最终的字符串  
									}
									return ret;
								} else {
									return value;
								}
							}
						}
					},
					//y轴显示
					yAxis: {
						splitLine: {　　　　
							show: false　　
						},
						axisLine: {
							lineStyle: {
								color: '#FFFFFF',
								width: 2
							}
						},
						axisLabel: { //设置坐标轴刻度样式
							textStyle: {
								fontSize: 18,
								fontWeight: 'normal',
							},
						}
					},
					series: [{
							name: "白班产量",
							type: "bar",
							stack: "业务", //折叠显示
							data: lineBBProductionArray, //（此处的<%=zcfgData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
							barWidth: realWidth,
							//显示颜色
							itemStyle: {
								normal: {
									color: "#FFA500",
									label: {
										show: true,
										textStyle: {

											fontSize: 16
										}
									}
								}
							}
						},
						{
							name: "夜班产量",
							type: "bar",
							stack: "业务",
							data: lineYBProductionArray, //（此处的<%=jbgcData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
							barWidth: realWidth,
							itemStyle: {
								normal: {
									color: "#7EC0EE",
									label: {
										show: true,
										textStyle: {

											fontSize: 16
										}
									}
								}
							}
						},

						{
							name: '总量',
							type: 'bar',
							stack: '12',
							barWidth: 1,
							//				showAllSymbol: true,

							label: {
								normal: {
									show: true,
									position: 'top',
									//formatter: "     " +  '{value}',
									formatter: function(a) {
										return "     " + a.data;
									},
									textStyle: {
										color: '#1AFD9C',
										fontSize: 16
									}
								}
							},
							itemStyle: {
								normal: {
									color: 'rgba(128, 128, 128, 0.1)',
									label: {
										show: false
									}
								}
							},
							data: lineProductionArray
						}

					]
				};
				// 使用刚指定的配置项和数据显示图表。
				pictureShowECharts.setOption(optionProductionPicture);
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getSolidifyRoomDetail() {
	$('#tableInfoShow').show();
	$('#pictureInfoShow').hide();
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "materialName"
	});
	columnsArray.push({
		"title": "固化室",
		"field": "solidifyRoomID"
	});
	columnsArray.push({
		"title": "一段",
		"field": "total1D"
	});
	columnsArray.push({
		"title": "二段",
		"field": "total2D"
	});
	columnsArray.push({
		"title": "三段",
		"field": "total3D"
	});

	var urlStr = window.serviceIP + "/api/solidifyrecord/getSolidifyRoomDetail?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString();

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
					singleSelect: false,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 15,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//search: true,
					pagination: true,
					//>>>>>>>>>>>>>>导出excel表格设置
					showExport: true, //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
					exportDataType: "basic", //basic', 'all', 'selected'.
					exportTypes: ['doc', 'excel'], //导出类型'json','xml','png','csv','txt','sql','doc','excel','xlsx','pdf'
					//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
					exportOptions: { //导出参数
						ignoreColumn: [0, 0], //忽略某一列的索引  
						fileName: '数据导出', //文件名称设置  
						worksheetName: 'Sheet1', //表格工作区名称  
						tableName: '数据导出表',
						excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
						//onMsoNumberFormat: DoOnMsoNumberFormat  
					},
					//导出excel表格设置<<<<<<<<<<<<<<<<
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}