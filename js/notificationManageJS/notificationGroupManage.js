
function selectNotificationGroup() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "分组名称名称",
		"field": "name"
	});
	columnsArray.push({
		"title": "排序",
		"field": "sortnum"
	});
	columnsArray.push({
		"title": "简介",
		"field": "introduction"
	});
	columnsArray.push({
		"title": "分组类型",
		"field": "grouptype"
	});
	columnsArray.push({
		"title": "备注",
		"field": "remark"
	});
	columnsArray.push({
		"title": "更新人员",
		"field": "operatorname"
	});
	columnsArray.push({
		"title": "更新时间",
		"field": "updatetime",
		formatter: function(value, row, index) {
			if(value) {
				return window.stringToDatetimeLocalType(value,"yyyy-MM-dd hh:mm:ss");
			}
		}
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "operatorid",
		"field": "operatorid",
		visible: false
	});
	
	columnsArray.push({
		"title": "status",
		"field": "status",
		visible: false
	});

	$.ajax({
		url: window.serviceIP + "/api/notification/getnotificationgroup",
		type: "GET",
		//data: formData,
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

function selectedNotificationGroupRow(param) {

	//使用getSelections即可获得，row是json格式的数据
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});

	var optionType = param.getAttribute("id");
	if(optionType == "addRow") {

		$("#notificationGroupForm" + " #updatetime").val((new Date()).format("yyyy-MM-dd hh:mm:ss"));
		$("#notificationGroupForm" + " #operatorid").val(localStorage.userID);
		$("#notificationGroupForm" + " #operatorname").val(localStorage.username);
		$("#notificationGroupForm" + " #status").val("1");

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

			$("#notificationGroupForm" + " #" + key).val(row[0][key])
			//$("#equipmentInfoManageForm" + " #" + key).attr("value", row[0][key]);
			//$("#equipmentInfoManageForm" + " #" + key).attr("value", row[0][key]);
		}
		$("#notificationGroupForm" + " #updatetime").val((new Date()).format("yyyy-MM-dd hh:mm:ss"));
		$("#notificationGroupForm" + " #operatorid").val(localStorage.userID);
		$("#notificationGroupForm" + " #operatorname").val(localStorage.username);
		$("#notificationGroupForm" + " #status").val("1");

		$('#myModal').modal('show');
	} else if(optionType == "deleteRow") {
		if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}

		deleteNotificationGroup(row[0]["id"]);
	}
}

function deleteNotificationGroup(id) {
	//	alert(equipID);
	//	var jsonStr = {};
	//	jsonStr.push({
	//		"equipID": equipID
	//	});
	//JSON.stringify(jsonStr);,
	var formData = new FormData();
	formData.append("id", id);
	$.ajax({
		url: window.serviceIP + "/api/notification/detetenotificationgroup",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				
				selectNotificationGroup();
				alert('删除成功!');
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
};

function saveNotificationGroupInfo() {

	var formData = new FormData($("#notificationGroupForm")[0]);
	$.ajax({
		url: window.serviceIP + "/api/notification/changenotificationgroup",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: window.getFormDataToJson(formData),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				
				selectNotificationGroup();
				alert('保存成功!');
				$("#myModal").modal('hide');
			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
};

function closecNotificationGroupInfo()
{
	$("#myModal").modal('hide');
}

function notificationGroupRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}