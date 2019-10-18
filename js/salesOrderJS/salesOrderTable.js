function salesOrderPlantSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getindustrialplant",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		headers: {
			Token: localStorage.getItem('token')
		},
		processData: true,
		success: function(dataRes) {

			$("#salesOrderPlantSlct").find('option').remove();
			$('#salesOrderPlantSlct').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString())

			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#salesOrderPlantSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())

				}
				$('#salesOrderPlantSlct').selectpicker('refresh');
				$('#salesOrderPlantSlct').selectpicker('render');   
				// $('#salesOrderPlantSlct').selectpicker('mobile');

				$('#salesOrderStatus').selectpicker('refresh');
				$('#salesOrderStatus').selectpicker('render');   
				// $('#salesOrderStatus').selectpicker('mobile');

				salesOrderProductSlct();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function salesOrderProductSlct() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getmaterialbytype?typeID=1801",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		headers: {
			Token: localStorage.getItem('token')
		},
		processData: true,
		success: function(dataRes) {

			$("#salesOrderProductType").find('option').remove();
			$('#salesOrderProductType').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString())

			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#salesOrderProductType').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())

				}
				$('#salesOrderProductType').selectpicker('refresh');
				$('#salesOrderProductType').selectpicker('render');   
				// $('#salesOrderProductType').selectpicker('mobile');
				getSalesOrderDetail();
				//getEquipmentInfoDataCollector();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getSalesOrderDetail() {
	var columnsArray = [];
	//	columnsArray.push({
	//		checkbox: true
	//	});
	columnsArray.push({
		//		width: 200,
		"title": "工作中心名称",
		"field": "workshopname"
	});
	columnsArray.push({
		"title": "订单创建时间",
		"field": "salecreatetime"
	});
	columnsArray.push({
		"title": "基地销售订单",
		"field": "salesorder"
	});
	columnsArray.push({
		"title": "生产订单",
		"field": "productorder"
	});
	columnsArray.push({
		"title": "物料描述",
		"field": "productinfo"
	});

	columnsArray.push({
		"title": "区域名称",
		"field": "zonename"
	});
	columnsArray.push({
		"title": "客户信息",
		"field": "customer"
	});
	columnsArray.push({
		"title": "包装数量",
		"field": "production"
	});
	columnsArray.push({
		"title": "电池数量",
		"field": "salevolume"
	});
	columnsArray.push({
		"title": "订单状态",
		"field": "orderstatus"
	});
	columnsArray.push({
		"title": "发货时间",
		"field": "deliverytime"
	});

	var formData = new FormData($("#salesOrderSelectForm")[0]);
	$.ajax({
		url: window.serviceIP + "/api/salesorder/getsalesorderdetail",
		type: "POST",
		data: formData,
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
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
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//search: true,
					fixedColumns: true, //固定列
					fixedNumber: 1, //固定前两列
					pagination: true,
					columns: columnsArray,
					//					onClickRow: function(row) {
					//
					//						//$('.changeTableRowColor').removeClass('changeTableRowColor');
					//						//$(row).addClass('changeTableRowColor');
					//						workOrderSelectedRow = row;
					//					}
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function salesOrderStatusAnalysis() {
	var columnsArray = [];
	//	columnsArray.push({
	//		checkbox: true
	//	});
	columnsArray.push({
		//		width: 200,
		"title": "日期",
		"field": "日期"
	});
	columnsArray.push({
		"title": "厂区",
		"field": "厂区"
	});
	columnsArray.push({
		"title": "型号",
		"field": "型号"
	});
	columnsArray.push({
		"title": "规格",
		"field": "规格"
	});
	columnsArray.push({
		"title": "生产订单总量",
		"field": "生产订单总量"
	});

	columnsArray.push({
		"title": "已完成",
		"field": "已完成"
	});
	columnsArray.push({
		"title": "未完成",
		"field": "未完成"
	});

	var formData = new FormData($("#salesOrderSelectForm")[0]);
	$.ajax({
		url: window.serviceIP + "/api/salesorder/getsalesorderstatusanalysis",
		type: "POST",
		data: formData,
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		cache: false, //不需要缓存
		processData: false,
		contentType: false,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				//console.log(models);
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
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//search: true,
					fixedColumns: true, //固定列
					fixedNumber: 1, //固定前两列
					pagination: true,
					columns: columnsArray,
					//					onClickRow: function(row) {
					//
					//						//$('.changeTableRowColor').removeClass('changeTableRowColor');
					//						//$(row).addClass('changeTableRowColor');
					//						workOrderSelectedRow = row;
					//					}
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function salesOrderDailyWork() {
	var columnsArray = [];
	//	columnsArray.push({
	//		checkbox: true
	//	});
	columnsArray.push({
		//		width: 200,
		"title": "日期",
		"field": "日期"
	});
	columnsArray.push({
		"title": "厂区",
		"field": "厂区"
	});
	columnsArray.push({
		"title": "型号",
		"field": "型号"
	});
	columnsArray.push({
		"title": "规格",
		"field": "规格"
	});
	columnsArray.push({
		"title": "生产订单总量",
		"field": "生产订单总量"
	});

	columnsArray.push({
		"title": "已完成",
		"field": "已完成"
	});
	columnsArray.push({
		"title": "未完成",
		"field": "未完成"
	});

	var formData = new FormData($("#salesOrderSelectForm")[0]);
	$.ajax({
		url: window.serviceIP + "/api/salesorder/getsalesorderdailywork",
		type: "POST",
		data: formData,
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		cache: false, //不需要缓存
		processData: false,
		contentType: false,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				console.log(models);
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
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//search: true,
					fixedColumns: true, //固定列
					fixedNumber: 1, //固定前两列
					pagination: true,
					columns: columnsArray,
					//					onClickRow: function(row) {
					//
					//						//$('.changeTableRowColor').removeClass('changeTableRowColor');
					//						//$(row).addClass('changeTableRowColor');
					//						workOrderSelectedRow = row;
					//					}
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}