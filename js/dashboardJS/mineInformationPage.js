function getSelfProductionRecord() {
	var columnsArray = [];
//	columnsArray.push({
//		checkbox: true
//	});

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
		"title": "产量工资",
		"field": "wage"
	});
	columnsArray.push({
		width: 300,
		"title": "完成时间",
		"field": "inputTime"
	});

	var startTime = new Date();

	var timeStr = " 07:00:00";

	var today = new Date();
	if(today.getHours() < 7) {
		startTime.setDate(startTime.getDate() - 1)
		timeStr = " 19:00:00"
	} else if(today.getHours() > 18) {
		timeStr = " 19:00:00"
	}

	var urlStr = window.serviceIP + "/api/material/getShelfProductionRecord?staffID=" + localStorage.userID +
		"&startTime=" + startTime.format("yyyy-MM-dd") + timeStr + "&endTime=" + today.format("yyyy-MM-dd hh:mm:ss");

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

function getProdutionWageDetail() {
	var columnsArray = [];
//	columnsArray.push({
//		checkbox: true
//	});

	columnsArray.push({

		"title": "日期",
		"field": "closingDate"
	});
	columnsArray.push({

		"title": "员工",
		"field": "staffName"
	});

	columnsArray.push({

		"title": "物料型号",
		"field": "materialName"
	});
	columnsArray.push({

		"title": "产量",
		"field": "productionNumber"
	});
	columnsArray.push({

		"title": "工资",
		"field": "wage"
	});
	//	columnsArray.push({
	//
	//		"title": "单价",
	//		"field": "unitPrice"
	//	});

	var urlStr = window.serviceIP + "/api/wage/getProductionWageDetail?staffName=" +
		localStorage.userID +
		"&plantID=" + "-1" +
		"&processID=" + "-1" +
		"&startTime=" + document.getElementById("startTime").value +
		"&endTime=" + document.getElementById("endTime").value;

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
				pageNum = 1;
				$("#refreshID").html('stop');
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
					columns: columnsArray
				});

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}


