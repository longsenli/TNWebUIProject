function productionStatisticsPlantSlctFun(flag) {
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

				if(flag = "1") {
					productionStatisBatteryTypeSlctFun();
					productionStatisticsProcessSlctFun();
				} else
					productionStatisticsLineSlctFun();
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

function productionStatisticsProcessSlctFun() {
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

				productionStatisticsLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function productionStatisticsLineSlctFun() {
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

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function productionOutputStatistics() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		width: 300,
		"title": "日期",
		"field": "orderDay"
	});
	columnsArray.push({
		width: 300,
		"title": "班次",
		"field": "classType"
	});
	columnsArray.push({
		width: 300,
		"title": "产线",
		"field": "lineName"
	});
	columnsArray.push({
		width: 300,
		"title": "物料名称",
		"field": "materialName"
	});
	columnsArray.push({
		width: 300,
		"title": "总产量",
		"field": "outputTotal"
	});

	var urlStr = window.serviceIP + "/api/material/orderoutputstatistics?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString() +
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
					//					showColumns: true,
					search: true,
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
					pagination: true,
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function remnantProductStatistics() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		width: 300,
		"title": "物料名称",
		"field": "name"
	});
	columnsArray.push({
		width: 300,
		"title": "剩余数量",
		"field": "remnantTotalNum"
	});

	var endTime = new Date(document.getElementById("endTime").value);
	endTime.setDate(endTime.getDate() + 1)
	var urlStr = window.serviceIP + "/api/material/orderremnantproductstatistics?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 07:00:00" + "&endTime=" + endTime.format("yyyy-MM-dd") + " 06:59:59";

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
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function batteryStatisInventory() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "盘点时间",
		"field": "updatetime"
	});
	columnsArray.push({
		"title": "电池型号",
		"field": "电池型号",
		formatter: function(value, row, index) {
			return $("#batterytype option[value='" + row.batterytype + "']").text();
		}
	});
	columnsArray.push({
		"title": "batterytype",
		"field": "batterytype",
		visible: false
	});
	columnsArray.push({
		"title": "最新库存",
		"field": "currentstorage"
	});
	columnsArray.push({
		"title": "上次结余",
		"field": "laststorage"
	});
	columnsArray.push({
		"title": "生产入库",
		"field": "dailyproduction"
	});
	columnsArray.push({
		"title": "发货出库",
		"field": "dailyshipmentsnum"
	});
	columnsArray.push({
		"title": "报废数量",
		"field": "scrapnum"
	});
	columnsArray.push({
		"title": "报修数量",
		"field": "repairnum"
	});
	columnsArray.push({
		"title": "维修入库",
		"field": "repairbacknum"
	});

	columnsArray.push({
		"title": "借出数量",
		"field": "loannum"
	});
	columnsArray.push({
		"title": "借入数量",
		"field": "borrownum"
	});
	var endTime = new Date(document.getElementById("endTime").value);
	endTime.setDate(endTime.getDate() + 1)
	var urlStr = window.serviceIP + "/api/material/batterystatisinventory?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&lineID=" + document.PlantToLineSelectForm.productionLineSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 12:00:00" + "&endTime=" + endTime.format("yyyy-MM-dd") + " 06:59:59";

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
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function grantAndExpendStatistics() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		width: 300,
		"title": "产线名称",
		"field": "lineID",
		formatter: function(value, row, index) {
			if(row.lineID == '总计')
				return row.lineID;
			return $("#productionLineSlct option[value='" + row.lineID + "']").text();
		}
	});
	columnsArray.push({
		width: 300,
		"title": "物料名称",
		"field": "name"
	});
	columnsArray.push({
		width: 300,
		"title": "领取数量",
		"field": "grantNum"
	});
	columnsArray.push({
		width: 300,
		"title": "投料数量",
		"field": "expendNum"
	});

	var urlStr = window.serviceIP + "/api/material/grantdndexpendstatistics?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 00:00:00" + "&endTime=" + document.getElementById("endTime").value + " 23:59:59";

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
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function productionStatisticsRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	$(row).addClass('changeTableRowColor');
	$($(row).find("td")).addClass('changeTableRowColor');
}

function getMaterialInventoryStatistics() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	if(document.PlantToLineSelectForm.productionProcessSlct.value.toString() == window.windowProcessEnum.TB) {
		columnsArray.push({
			"title": "物料名称",
			"field": "name"
		});

		columnsArray.push({
			"title": "生产入库",
			"field": "productionNum"
		});

		columnsArray.push({
			"title": "盘点时间",
			"field": "updateTime"
		});
		columnsArray.push({
			"title": "备注",
			"field": "remark"
		});

	} else if(document.PlantToLineSelectForm.productionProcessSlct.value.toString() == window.windowProcessEnum.GH) {
		columnsArray.push({
			"title": "物料名称",
			"field": "name"
		});
		columnsArray.push({
			"title": "固化室数量",
			"field": "currentNum"
		});
		columnsArray.push({
			"title": "拖数",
			"field": "lastStorage"
		});
		columnsArray.push({
			"title": "入固化室数量",
			"field": "productionNum"
		});
		columnsArray.push({
			"title": "拖数",
			"field": "inNum"
		});
		columnsArray.push({
			"title": "出固化室数量",
			"field": "expendNum"
		});
		columnsArray.push({
			"title": "拖数",
			"field": "outNum"
		});
		columnsArray.push({
			"title": "计划需求",
			"field": "extend1"
		});
		columnsArray.push({
			"title": "周期",
			"field": "extend2"
		});
		columnsArray.push({
			"title": "盘点时间",
			"field": "updateTime"
		});
		columnsArray.push({
			"title": "备注",
			"field": "remark"
		});
	} else if(document.PlantToLineSelectForm.productionProcessSlct.value.toString() == window.windowProcessEnum.CD) {
		columnsArray.push({
			"title": "物料名称",
			"field": "name"
		});
		columnsArray.push({
			"title": "类型",
			"field": "extend5",
			formatter: function(value, row, index) {
				if(value == '1')
					return "一等品";
				else if(value == '2')
					return "二等品";
				else if(value == '3')
					return "一次返充";
				else if(value == '4')
					return "二次返充";
				else if(value == '5')
					return "补电";
				else
				return "状态不详";
			}
		});
		//			<option value=1>一等品</option>
		//			<option value=2>二等品</option>
		//			<option value=3>一次返充</option>
		//			<option value=4>二次返充</option>
		//			<option value=5>补电</option>
		columnsArray.push({
			"title": "在架数量",
			"field": "currentNum"
		});
		columnsArray.push({
			"title": "上次结余",
			"field": "lastStorage"
		});
		columnsArray.push({
			"title": "上架数量",
			"field": "productionNum"
		});
		columnsArray.push({
			"title": "报修数量",
			"field": "expendNum"
		});
		columnsArray.push({
			"title": "下架数量",
			"field": "outNum"
		});

		columnsArray.push({
			"title": "盘点时间",
			"field": "updateTime"
		});
		columnsArray.push({
			"title": "备注",
			"field": "remark"
		});
	} else {
		columnsArray.push({
			"title": "物料名称",
			"field": "name"
		});
		columnsArray.push({
			"title": "当前数量",
			"field": "currentNum"
		});
		columnsArray.push({
			"title": "上次结余",
			"field": "lastStorage"
		});
		columnsArray.push({
			"title": "生产入库",
			"field": "productionNum"
		});
		columnsArray.push({
			"title": "退返",
			"field": "inNum"
		});
		columnsArray.push({
			"title": "发料数量",
			"field": "expendNum"
		});
		columnsArray.push({
			"title": "其他出库",
			"field": "outNum"
		});
		columnsArray.push({
			"title": "计划需求",
			"field": "extend1"
		});
		columnsArray.push({
			"title": "周期",
			"field": "extend2"
		});
		columnsArray.push({
			"title": "盘点时间",
			"field": "updateTime"
		});
		columnsArray.push({
			"title": "备注",
			"field": "remark"
		});
	}

	var endTime = new Date(document.getElementById("endTime").value);
	endTime.setDate(endTime.getDate() + 1)

	var urlStr = window.serviceIP + "/api/material/getmaterialinventorystatistics?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 12:00:00" + "&endTime=" + endTime.format("yyyy-MM-dd") + " 12:00:00";

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

function getSecondaryMaterialInventoryStatistics() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});

	if(document.PlantToLineSelectForm.productionProcessSlct.value.toString() == window.windowProcessEnum.FB) {
		columnsArray.push({
			"title": "物料名称",
			"field": "name"
		});
		columnsArray.push({
			"title": "当前数量",
			"field": "currentNum"
		});
		columnsArray.push({
			"title": "上次结余",
			"field": "lastStorage"
		});
		columnsArray.push({
			"title": "固化室出库",
			"field": "inNum"
		});
		columnsArray.push({
			"title": "借入数量",
			"field": "gainNum"
		});
		columnsArray.push({
			"title": "投料数量",
			"field": "expendNum"
		});
		columnsArray.push({
			"title": "借出数量",
			"field": "outNum"
		});
		columnsArray.push({
			"title": "计划需求",
			"field": "extend1"
		});
		columnsArray.push({
			"title": "周期",
			"field": "extend2"
		});
		//	columnsArray.push({
		//		"title": "当日报修数量",
		//		"field": "todayRepair"
		//	});
		columnsArray.push({
			"title": "盘点时间",
			"field": "updateTime"
		});
		columnsArray.push({
			"title": "备注",
			"field": "remark"
		});
	} else if(document.PlantToLineSelectForm.productionProcessSlct.value.toString() == window.windowProcessEnum.BB) {

		columnsArray.push({
			"title": "物料名称",
			"field": "name"
		});
		columnsArray.push({
			"title": "当前数量",
			"field": "currentNum"
		});
		columnsArray.push({
			"title": "上次结余",
			"field": "lastStorage"
		});
		columnsArray.push({
			"title": "固化室出库",
			"field": "inNum"
		});
		columnsArray.push({
			"title": "借入数量",
			"field": "gainNum"
		});
		columnsArray.push({
			"title": "消耗数量",
			"field": "expendNum"
		});
		columnsArray.push({
			"title": "借出数量",
			"field": "outNum"
		});
		columnsArray.push({
			"title": "报废数量",
			"field": "outNum"
		});
		columnsArray.push({
			"title": "计划需求",
			"field": "extend1"
		});
		columnsArray.push({
			"title": "周期",
			"field": "extend2"
		});
		//	columnsArray.push({
		//		"title": "当日报修数量",
		//		"field": "todayRepair"
		//	});
		columnsArray.push({
			"title": "盘点时间",
			"field": "updateTime"
		});
		columnsArray.push({
			"title": "备注",
			"field": "remark"
		});
	} else if(document.PlantToLineSelectForm.productionProcessSlct.value.toString() == window.windowProcessEnum.JS) {
		columnsArray.push({
			"title": "物料名称",
			"field": "name"
		});
		columnsArray.push({
			"title": "当前数量",
			"field": "currentNum"
		});
		columnsArray.push({
			"title": "上次结余",
			"field": "lastStorage"
		});
		columnsArray.push({
			"title": "领料入库",
			"field": "gainNum"
		});
		columnsArray.push({
			"title": "其他入库",
			"field": "inNum"
		});
		columnsArray.push({
			"title": "投料数量",
			"field": "expendNum"
		});
		columnsArray.push({
			"title": "送维数量",
			"field": "outNum"
		});
		columnsArray.push({
			"title": "线边仓数量",
			"field": "onlineNum"
		});
		columnsArray.push({
			"title": "新增送维",
			"field": "todayRepair"
		});
		columnsArray.push({
			"title": "不良退返",
			"field": "extend1"
		});
		columnsArray.push({
			"title": "报废",
			"field": "extend2"
		});
		columnsArray.push({
			"title": "盘点时间",
			"field": "updateTime"
		});
		columnsArray.push({
			"title": "备注",
			"field": "remark"
		});
	} else {
		columnsArray.push({
			"title": "物料名称",
			"field": "name"
		});
		columnsArray.push({
			"title": "当前数量",
			"field": "currentNum"
		});
		columnsArray.push({
			"title": "上次结余",
			"field": "lastStorage"
		});
		columnsArray.push({
			"title": "领料入库",
			"field": "gainNum"
		});
		columnsArray.push({
			"title": "其他入库",
			"field": "inNum"
		});
		columnsArray.push({
			"title": "投料数量",
			"field": "expendNum"
		});
		columnsArray.push({
			"title": "送不良数量",
			"field": "outNum"
		});
		columnsArray.push({
			"title": "线边仓数量",
			"field": "onlineNum"
		});
		columnsArray.push({
			"title": "计划需求",
			"field": "extend1"
		});
		columnsArray.push({
			"title": "周期",
			"field": "extend2"
		});
		//	columnsArray.push({
		//		"title": "当日报修数量",
		//		"field": "todayRepair"
		//	});
		columnsArray.push({
			"title": "盘点时间",
			"field": "updateTime"
		});
		columnsArray.push({
			"title": "备注",
			"field": "remark"
		});
	}

	var endTime = new Date(document.getElementById("endTime").value);
	endTime.setDate(endTime.getDate() + 1)
	var urlStr = window.serviceIP + "/api/material/getsecondarymaterialinventorystatistics?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 12:00:00" + "&endTime=" + endTime.format("yyyy-MM-dd") + " 12:00:00";

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

function grantMaterialDetail() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "物料名称",
		"field": "name"
	});
	columnsArray.push({
		"title": "工单号",
		"field": "orderName"
	});
	columnsArray.push({
		"title": "数量",
		"field": "number"
	});
	columnsArray.push({
		"title": "发料人",
		"field": "operator"
	});
	columnsArray.push({
		"title": "发料时间",
		"field": "grantTime"
	});

	var urlStr = window.serviceIP + "/api/material/getgrantmaterialrecord?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
		"&startTime=" + document.getElementById("startTime").value + " 00:00:00" + "&endTime=" + document.getElementById("endTime").value + " 23:59:59";

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
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function changeMaterialInventory() {

	if(!($("#labelMaterialInventory").html() == "MaterialInventoryStatistics" || $("#labelMaterialInventory").html() == "SecondaryMaterialInventoryStatistics")) {
		alert("请先选择库存数据!");
		return;
	}

	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}
	if(row[0].id.length < 4) {
		alert("当前行数据无效,id不合法!" + row[0].id);
		return;
	}
	$("#changeMaterialInventoryModelForm" + " #id").val(row[0].id);
	$("#changeMaterialInventoryModelForm" + " #currentNum").val(row[0].currentNum);
	$("#changeMaterialInventoryModelForm" + " #remarkOld").val(row[0].remark + " ###### " + row[0].currentNum);
	$("#changeMaterialInventoryModelForm" + " #remark").val('');
	$("#myChangeModal").modal('show');
}

function saveMaterialInventory() {

	if(!($("#labelMaterialInventory").html() == "MaterialInventoryStatistics" || $("#labelMaterialInventory").html() == "SecondaryMaterialInventoryStatistics")) {
		alert("请先选择库存数据!");
		return;
	}
	if($("#changeMaterialInventoryModelForm" + " #remark").val().length < 2) {
		alert("请在备注中输入修改原因!")
		return;
	}
	var remarkDetail = (new Date()).format("yyyy-MM-dd hh:mm") + " " + localStorage.username + "," + $("#changeMaterialInventoryModelForm" +
			" #remarkOld").val().split("######")[1] +
		"修改为" + $("#changeMaterialInventoryModelForm" + " #currentNum").val() + ",原因: " + $("#changeMaterialInventoryModelForm" + " #remark").val() +
		". \r\n  " + $("#changeMaterialInventoryModelForm" + " #remarkOld").val().split("######")[0]
	var formData = new FormData();
	formData.append("id", $("#changeMaterialInventoryModelForm" + " #id").val());
	formData.append("currentNum", $("#changeMaterialInventoryModelForm" + " #currentNum").val());
	formData.append("remark", remarkDetail);
	formData.append("type", $("#labelMaterialInventory").html());
	$.ajax({
		url: window.serviceIP + "/api/material/changematerialinventorydata",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				if($("#labelMaterialInventory").html() == "MaterialInventoryStatistics") {
					getMaterialInventoryStatistics();
				}
				if($("#labelMaterialInventory").html() == "SecondaryMaterialInventoryStatistics") {
					getSecondaryMaterialInventoryStatistics();
				}
				alert('修改成功!');
				$("#myChangeModal").modal('hide');
			} else {
				alert("修改失败！" + data.message);
			}
		}
	});
}

function closeMaterialInventoryModel() {
	$("#myChangeModal").modal('hide');
}

function getSolidifyRoomDetail() {
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