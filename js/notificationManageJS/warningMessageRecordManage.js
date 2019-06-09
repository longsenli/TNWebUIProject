function selectWarningMessageRecord() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "消息内容",
		"field": "message"
	});
	columnsArray.push({
		"title": "级别",
		"field": "level"
	});
	columnsArray.push({
		"title": "类型",
		"field": "type"
	});
	columnsArray.push({
		"title": "上报人",
		"field": "updater"
	});

	columnsArray.push({
		"title": "更新时间",
		"field": "updatetime",
		formatter: function(value, row, index) {
			if(value) {
				return window.stringToDatetimeLocalType(value, "yyyy-MM-dd hh:mm:ss");
			}
		}
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
	var formData = new FormData();
	formData.append("startTime", document.getElementById("startTime").value);
	formData.append("endTime", document.getElementById("endTime").value);
	$.ajax({
		url: window.serviceIP + "/api/notification/getwaringmessagerecord",
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

function selectedWarningMessageRecordRow(param) {

	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "addRow") {

		$("#WarningMessageRecordForm" + " #updatetime").val((new Date()).format("yyyy-MM-dd hh:mm:ss"));
		$("#WarningMessageRecordForm" + " #operatorid").val(localStorage.userID);
		$("#WarningMessageRecordForm" + " #operatorname").val(localStorage.username);
		$("#WarningMessageRecordForm" + " #status").val("1");

		$('#myModal').modal('show');
	} else if(optionType == "editRow") {
		if(row.length != 1) {
			alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
			return;
		}

		for(var key in row[0]) {
			if(key == 0) {
				continue;
			}

			$("#WarningMessageRecordForm" + " #" + key).val(row[0][key])
			//$("#equipmentInfoManageForm" + " #" + key).attr("value", row[0][key]);
			//$("#equipmentInfoManageForm" + " #" + key).attr("value", row[0][key]);
		}
		$("#WarningMessageRecordForm" + " #updatetime").val((new Date()).format("yyyy-MM-dd hh:mm:ss"));
		$("#WarningMessageRecordForm" + " #operatorid").val(localStorage.userID);
		$("#WarningMessageRecordForm" + " #operatorname").val(localStorage.username);
		$("#WarningMessageRecordForm" + " #status").val("1");

		$('#myModal').modal('show');
	} else if(optionType == "deleteRow") {
		if(row.length != 1) {
			alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
			return;
		}

		deleteWarningMessageRecord(row[0]["id"]);
	}
}

function deleteWarningMessageRecord(id) {
	//	alert(equipID);
	//	var jsonStr = {};
	//	jsonStr.push({
	//		"equipID": equipID
	//	});
	//JSON.stringify(jsonStr);,
	var formData = new FormData();
	formData.append("id", id);
	$.ajax({
		url: window.serviceIP + "/api/notification/deteteWarningMessageRecord",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {

				selectWarningMessageRecord();
				alert('删除成功!');
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};

function saveWarningMessageRecordInfo() {

	var formData = new FormData($("#WarningMessageRecordForm")[0]);
	$.ajax({
		url: window.serviceIP + "/api/notification/changeWarningMessageRecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: window.getFormDataToJson(formData),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {

				selectWarningMessageRecord();
				alert('保存成功!');
				$("#myModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
};

function closecWarningMessageRecordInfo() {
	$("#myModal").modal('hide');
}

function WarningMessageRecordRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}
