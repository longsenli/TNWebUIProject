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
		"field": "dayTime"
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

		"title": "个人产量",
		"field": "shelfProduction"
	});
	columnsArray.push({

		"title": "岗位",
		"field": "name"
	});
	columnsArray.push({

		"title": "班次",
		"field": "classType1"
	});
	columnsArray.push({

		"title": "时长",
		"field": "classType2"
	});
	columnsArray.push({

		"title": "确认人",
		"field": "verifierName"
	});
	columnsArray.push({

		"title": "确认时间",
		"field": "verifyTime"
	});
//	columnsArray.push({
//
//		"title": "工资",
//		"field": "wage"
//	});
	//	columnsArray.push({
	//
	//		"title": "单价",
	//		"field": "unitPrice"
	//	});

	var urlStr = window.serviceIP + "/api/staffWorkDiary/getShelfWageDetail?staffID=" +
		localStorage.userID +
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


function getShelfTMPProduction()
{
		var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});

//	columnsArray.push({
//		"title": "厂区",
//		"field": "plantID",
//		visible: false
//	});
//	columnsArray.push({
//		"title": "流程",
//		"field": "processID",
//		visible: false
//	});
//	columnsArray.push({
//		"title": "产线",
//		"field": "lineID",
//		formatter: function(value, row, index) {
//			return $("#productionLineSlct option[value='" + value + "']").text();
//		}
//	});
//	if($("#productionProcessSlct").val() == windowProcessEnum.JZ|| $("#productionProcessSlct").val() == windowProcessEnum.JS
//	|| $("#productionProcessSlct").val() == windowProcessEnum.ZHQD) {
//		columnsArray.push({
//			"title": "工位",
//			"field": "worklocationID",
//			formatter: function(value, row, index) {
//				return $("#workingkLocationSlct option[value='" + value + "']").text();
//			}
//		});
//	}
//
//	columnsArray.push({
//		"title": "岗位",
//		"field": "extd1",
//		formatter: function(value, row, index) {
//			return $("#workContentSlct option[value='" + value + "']").text();
//		}
//	});

	columnsArray.push({
		"title": "物料型号",
		"field": "materialName"
	});

	columnsArray.push({
		"title": "物料型号",
		"field": "materialID",
		visible: false
	});
	columnsArray.push({
		"title": "总产量",
		"field": "totalProduction"
	});

	columnsArray.push({
		"title": "姓名",
		"field": "staffName"
	});
	columnsArray.push({
		"title": "姓名",
		"field": "staffID",
		visible: false
	});
	columnsArray.push({
		"title": "日期",
		"field": "dayTime"
	});
	columnsArray.push({
		"title": "白夜班",
		"field": "classType1"
	});
	columnsArray.push({
		"title": "时长",
		"field": "classType2"
	});

	columnsArray.push({
		"title": "个人产量",
		"field": "shelfProduction"
	});
	columnsArray.push({
		"title": "状态",
		"field": "status",
		formatter: function(value, row, index) {
			return "未确认";
		}
	});
//	columnsArray.push({
//		"title": "工价",
//		"field": "univalence",
//		editable: {
//			type: 'text',
//			title: '工价',
//			validate: function(value, row, index) {
//				if(!Number(value)) {
//					return "请输入合法数字";
//				}
//			}
//		}
//	});
//	columnsArray.push({
//		"title": "个人工资",
//		"field": "wage",
//		editable: {
//			type: 'text',
//			title: '个人工资',
//			validate: function(value, row, index) {
//				if(!Number(value)) {
//					return "请输入合法数字";
//				}
//			}
//		}
//	});

	var formData = new FormData();
	formData.append("staffID", localStorage.userID);
	formData.append("dayTime", document.getElementById("endTime").value);

	$.ajax({
		url: window.serviceIP + "/api/staffWorkDiary/getShelfDailyTMPDetail",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(dataRes) {
			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");

				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
					toolbarAlign: 'left',
					//singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 40,
					pageNumber: 1,
					uniqueId: "id",
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					search: true,
					searchAlign: 'right',
					pagination: true,
					columns: columnsArray
				});
				$("#table").bootstrapTable('resetSearch', localStorage.userID);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		},
		error: function(jqXHR, exception) {
			var msg = '';
			if(jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if(jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if(jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if(exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if(exception === 'timeout') {
				msg = 'Time out error.';
			} else if(exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert("请求出错," + msg);
		}
	});
}