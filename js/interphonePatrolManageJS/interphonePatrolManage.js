function interphonePatrolManageIndustrialPlantSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getindustrialplantbyfilter?type=-1",
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
				$('#industrialPlantSlct').append(("<option value=" + "-1" + ">" +
					"全部" + "</option>").toString())
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id.toString() + ">" +
						models[i].name.toString() + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				$('#industrialPlantSlct').selectpicker('hide');   

				interphonePatrolManageProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function interphonePatrolManageProcessSlctFun() {
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
			$('#productionProcessSlct').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString())

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				$('#productionProcessSlct').selectpicker('hide');   
				patrolLocationSlctFun();

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function patrolLocationSlctFun() {
	var formData = new FormData();
	formData.append("plantID", "-1");
	formData.append("processID", "-1");
	$.ajax({
		url: window.serviceIP + "/api/interphonePatrol/getInterphonePatrolLocationInfo",
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
			$("#patrolLocationSlct").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#patrolLocationSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#patrolLocationSlct').selectpicker('refresh');
				$('#patrolLocationSlct').selectpicker('render');   
				$('#patrolLocationSlct').selectpicker('hide');   

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function scanQRRecordRowClick(row) {
	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}

function updateRowCell(id) {
	var row = $('#table').bootstrapTable("getRowByUniqueId", id);
	if(Math.abs(row["wage"] - row["shelfProduction"] * row["univalence"]) > 0.5) {
		row["wage"] = (row["shelfProduction"] * row["univalence"]).toFixed(2);
		$('#table').bootstrapTable('updateByUniqueId', {
			id: id,
			row: row
		});
	}
}

function getInterphonePatrolReport() {
	$("#scanType").html("--");
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});

	columnsArray.push({
		"title": "厂区",
		"field": "plantID",
		formatter: function(value, row, index) {
			return $("#industrialPlantSlct option[value='" + value + "']").text();
		}
	});

	columnsArray.push({
		"title": "岗位名称",
		"field": "patrolLocationName"
	});

	columnsArray.push({
		"title": "日期",
		"field": "dayTime"
	});

	columnsArray.push({
		"title": "第一次查岗结果",
		"field": "onlineFlag1"
	});
	columnsArray.push({
		"title": "第一次查岗时间",
		"field": "patrolTime1"
	});

	columnsArray.push({
		"title": "查岗人",
		"field": "patrolStaff1"
	});
	columnsArray.push({
		"title": "第二次查岗结果",
		"field": "onlineFlag2"
	});
	columnsArray.push({
		"title": "第二次查岗时间",
		"field": "patrolTime2"
	});

	columnsArray.push({
		"title": "查岗人",
		"field": "patrolStaff2"
	});
	columnsArray.push({
		"title": "第三次查岗结果",
		"field": "onlineFlag3"
	});
	columnsArray.push({
		"title": "第三次查岗时间",
		"field": "patrolTime3"
	});

	columnsArray.push({
		"title": "查岗人",
		"field": "patrolStaff3"
	});
	columnsArray.push({
		"title": "第四次查岗结果",
		"field": "onlineFlag4"
	});
	columnsArray.push({
		"title": "第四次查岗时间",
		"field": "patrolTime4"
	});

	columnsArray.push({
		"title": "查岗人",
		"field": "patrolStaff4"
	});
	var formData = new FormData();
	formData.append("plantID", "-1");
	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("startTime").value.toString());

	$.ajax({
		url: window.serviceIP + "/api/interphonePatrol/getInterphonePatrolRecordReport",
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
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 200,
					pageNumber: 1,
					uniqueId: "id",
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					search: true,
					searchAlign: 'right',
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
				var data = $('#table').bootstrapTable('getData', true);
				// 合并单元格
				//var fieldList = ["plantID", "processID"];
				mergeCells(data, "plantID", 1, $('#table'), ["plantID"]);
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

function addInterphonePatrolRecord() {
	$("#scanType").html("addInterphonePatrolRecord");
	var columnsArray = [];
	columnsArray.push({
		width: 100,
		"title": "厂区",
		"field": "plantID",
		align: 'center',
		formatter: function(value, row, index) {
			return $("#industrialPlantSlct option[value='" + value + "']").text();
		}
	});

	columnsArray.push({
		width: 200,
		"title": "岗位",
		"field": "name"
	});
	columnsArray.push({
		"title": "是否在岗",
		align: 'center',
		width: 100,
		formatter: function(value, row, index) {
			var s = '<label style="font-size: 20px;color: #3C763D"><input id="' + row.id + '_checkBox"   checked type="checkbox">在岗确认</label>';
			return s;
		}
	});
	columnsArray.push({
		"title": "备注",
		align: 'center',
		width: 200,
		formatter: function(value, row, index) {
			var s = '<input type="text" id="' + row.id + '_text" class="form-control" >';
			return s;
		}
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	var formData = new FormData();
	formData.append("plantID", "-1");
	formData.append("processID", "-1");
	$.ajax({
		url: window.serviceIP + "/api/interphonePatrol/getInterphonePatrolLocationInfo",
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
			$("#patrolLocationSlct").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");

				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
					toolbarAlign: 'left',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 200,
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
					//静态数据不执行此方法
					//					onLoadSuccess: function(data) {
					//						alert("ewrewr")
					//						var data = $('#table').bootstrapTable('getData', true);
					//						// 合并单元格
					//						var fieldList = ["plantID"];
					//						mergeCells(data, "plantID", 1, $('#table'), fieldList);
					//					}

				});
				var data = $('#table').bootstrapTable('getData', true);
				// 合并单元格
				//var fieldList = ["plantID", "processID"];
				mergeCells(data, "plantID", 1, $('#table'), ["plantID"]);
				mergeCells(data, "processID", 1, $('#table'), ["processID"]);
				$("td,th").addClass("text-center");

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

/**
 * 合并单元格
 * 
 * @param data
 *            原始数据（在服务端完成排序）
 * @param fieldName
 *            合并参照的属性名称
 * @param colspan
 *            合并开始列
 * @param target
 *            目标表格对象	 
 * @param fieldList
 *            要合并的字段集合
 */
function mergeCells(data, fieldName, colspan, target, fieldList) {
	// 声明一个map计算相同属性值在data对象出现的次数和
	var sortMap = {};
	for(var i = 0; i < data.length; i++) {
		for(var prop in data[i]) {
			//例如people.unit.name
			var fieldArr = fieldName.split(".");
			getCount(data[i], prop, fieldArr, 0, sortMap);
		}
	}
	var index = 0;
	for(var prop in sortMap) {
		var count = sortMap[prop];
		for(var i = 0; i < fieldList.length; i++) {
			$(target).bootstrapTable('mergeCells', {
				index: index,
				field: fieldList[i],
				colspan: colspan,
				rowspan: count
			});
		}
		index += count;
	}
}
/**
 * 递归到最后一层 统计数据重复次数
 * 比如例如people.unit.name 就一直取到name
 * 类似于data["people"]["unit"]["name"]
 */
function getCount(data, prop, fieldArr, index, sortMap) {
	if(index == fieldArr.length - 1) {
		if(prop == fieldArr[index]) {
			var key = data[prop];
			if(sortMap.hasOwnProperty(key)) {
				sortMap[key] = sortMap[key] + 1;
			} else {
				sortMap[key] = 1;
			}
		}
		return;
	}
	if(prop == fieldArr[index]) {
		var sdata = data[prop];
		index = index + 1;
		getCount(sdata, fieldArr[index], fieldArr, index, sortMap);
	}

}

function getInterphonePatrolDetail() {
	$("#scanType").html("--");
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});

	columnsArray.push({
		"title": "厂区",
		"field": "plantID",
		formatter: function(value, row, index) {
			return $("#industrialPlantSlct option[value='" + value + "']").text();
		}
	});

	columnsArray.push({
		"title": "岗位名称",
		"field": "patrolLocationName"
	});

	columnsArray.push({
		"title": "日期",
		"field": "dayTime"
	});

	columnsArray.push({
		"title": "巡岗次序",
		"field": "ordinal"
	});
	columnsArray.push({
		"title": "结果",
		"field": "onlineFlag"
	});
	columnsArray.push({
		"title": "巡岗时间",
		"field": "patrolTime"
	});

	columnsArray.push({
		"title": "巡岗人",
		"field": "patrolStaff"
	});

	var formData = new FormData();
	formData.append("plantID", "-1");
	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("startTime").value.toString());

	$.ajax({
		url: window.serviceIP + "/api/interphonePatrol/getInterphonePatrolRecordDetail",
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
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 200,
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

function showConfirmModal() {
	if($("#scanType").html() != "addInterphonePatrolRecord") {
		alert("请先填写巡查记录!");
		return;
	}
	$("#patrolStaff").val(localStorage.username);
	$("#interphonePatrolConfirmModal").modal('show');
}

function confirmInterphonePatrolRecord() {
	var tableData = $('#table').bootstrapTable('getData');

	if(!tableData || tableData.length < 1) {
		alert("请先编辑查岗信息再操作!")
		return;
	}

	var interphonePatrolRecordArray = [];
	for(var i in tableData) {
		var interphonePatrolRecordMap = {};
		interphonePatrolRecordMap["plantID"] = tableData[i].plantID;
		interphonePatrolRecordMap["processID"] = tableData[i].processID;
		interphonePatrolRecordMap["patrolLocationID"] = tableData[i].id;
		interphonePatrolRecordMap["patrolLocationName"] = tableData[i].name;

		if($('#' + tableData[i].id + "_checkBox").is(':checked')) {
			interphonePatrolRecordMap["onlineFlag"] = '1';
		} else {
			interphonePatrolRecordMap["onlineFlag"] = '0';
		}

		interphonePatrolRecordMap["content"] = $('#' + tableData[i].id + "_text").val();
		interphonePatrolRecordMap["ordinal"] = $('#timeNumber').val();
		interphonePatrolRecordMap["patrolStaff"] = $('#patrolStaff').val();
		interphonePatrolRecordMap["patrolStaffID"] = localStorage.userID;
		interphonePatrolRecordArray.push(interphonePatrolRecordMap);
	}

	var formData = new FormData();

	formData.append("recordJson", JSON.stringify(interphonePatrolRecordArray));

	$.ajax({
		url: window.serviceIP + "/api/interphonePatrol/addInterphonePatrolRecord",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: function(data) {
			if(data.status == 1) {

				alert("保存成功!" + data.message);
				$("#interphonePatrolConfirmModal").modal('hide');
				getInterphonePatrolReport();
			} else {
				alert("确认失败！" + data.message);
			}

		}
	});
}

function closeModal(modalName) {
	$("#" + modalName).modal('hide');
}