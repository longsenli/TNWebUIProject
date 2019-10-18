function selectNotificationGroup() {

	$.ajax({
		url: window.serviceIP + "/api/notification/getnotificationgroup",
		type: "GET",
		//data: formData,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				//console.log(models);
				for (var  i  in  models)  {  
					$('#notificationGroupSlct').append(("<option value=" + models[i].id.toString() + ">" +
						models[i].name.toString() + "</option>").toString())
				}
				$('#notificationGroupSlct').selectpicker('refresh');
				$('#notificationGroupSlct').selectpicker('render');  
				selectNotificationGroupStaffDetail(); 
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function selectNotificationGroupStaffDetail() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "员工ID",
		"field": "staffid"
	});
	columnsArray.push({
		"title": "员工姓名",
		"field": "staffname"
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
		url: window.serviceIP + "/api/notification/getnotificationstaffdetail?notificationGroupID=" +
			document.notificationGroupStaffDetailForm.notificationGroupSlct.value.toString(),
		type: "GET",
		//data: formData,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				$('#notificationGroupStaffTable').bootstrapTable('destroy').bootstrapTable({
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

function selectUserInfoDetail() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "员工ID",
		"field": "userID"
	});
	columnsArray.push({
		"title": "员工姓名",
		"field": "name"
	});
	columnsArray.push({
		"title": "厂区",
		"field": "industrialplant_name"
	});
	columnsArray.push({
		"title": "工序",
		"field": "productionprocess_name"
	});
	columnsArray.push({
		"title": "电话",
		"field": "mobilephone"
	});
	

	$.ajax({
		url: window.serviceIP + "/api/notification/getallbasicuserinfo",
		type: "GET",
		//data: formData,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				$('#userInfoTable').bootstrapTable('destroy').bootstrapTable({
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

function saveNotificationGroupStaffDetailInfo(type) {
	//使用getSelections即可获得，row是json格式的数据
	var rows = $.map($('#userInfoTable').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	var staffInfo = "";
	var staffName = "确认变更人员为:";
	for(var i = 0; i < rows.length; i++) {
		staffInfo += rows[i].userID + "###" + rows[i].name + "###";
		staffName += rows[i].name + ",";
	}
	if(!window.changeConfirmDlg(staffName)) {
		return;
	}
	var formData = new FormData();
	formData.append("groupID", document.notificationGroupStaffDetailForm.notificationGroupSlct.value.toString());
	formData.append("staffIDList", staffInfo);
	formData.append("operationType", type);
	formData.append("operatorName", localStorage.username);
	formData.append("operatorID", localStorage.userID);
	$.ajax({
		url: window.serviceIP + "/api/notification/changenotificationstaffbyparam",
		type: "POST",
		processData: false,
		contentType: false,
		data: formData,
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(data) {
			if(data.status == 1) {

				selectNotificationGroupStaffDetail();
				alert('保存成功!');

			} else {
				alert("保存失败！" + data.message);
			}
		}
	});
};

function NotificationGroupStaffDetailRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}


function deleteNotificationGroupStaffDetailInfo()
{
	var rows = $.map($('#notificationGroupStaffTable').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(rows.length != 1)
	{
		alert("请选择一行数据,当前行数为:" + rows.length)
	}

	var paramName = "确认删除人员:" + rows[0].name;

	if(!window.changeConfirmDlg(paramName)) {
		return;
	}
	var formData = new FormData();
	formData.append("groupID", document.notificationGroupParamDetailForm.notificationGroupSlct.value.toString());
	formData.append("staffID", rows[0].staffid);

	$.ajax({
		url: window.serviceIP + "/api/notification/deletenotificationgroupdetailbyparam",
		type: "POST",
		processData: false,
		contentType: false,
		data: formData,
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(data) {
			if(data.status == 1) {

				selectNotificationGroupStaffDetail();
				alert('删除成功!');

			} else {
				alert("删除失败！" + data.message);
			}
		}
	});
}
