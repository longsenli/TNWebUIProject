function hiddenDangerManagePlantSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getindustrialplantbyfilter?type=-1",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {

			$("#hiddenDangerPlantSlct").find('option').remove();
			$("#plantid").find('option').remove();

			$('#hiddenDangerPlantSlct').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString())

			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#hiddenDangerPlantSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())
					$('#plantid').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())

				}
				$('#hiddenDangerPlantSlct').selectpicker('refresh');
				$('#hiddenDangerPlantSlct').selectpicker('render');   

				$('#plantid').selectpicker('refresh');
				$('#plantid').selectpicker('render');   

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getHiddenDangerManageRecord(selectType) {

	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});

	columnsArray.push({
		title: '序号',
		field: 'rowNumber',
		formatter: function(value, row, index) {
			return index + 1;
		}
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "预警等级",
		"field": "dangerlevel"
	});
	columnsArray.push({
		"title": "安全隐患类型",
		"field": "hiddendangertype"
	});

	columnsArray.push({
		"title": "隐患描述",
		"field": "hiddendanger"
	});
	columnsArray.push({
		"title": "隐患图片",
		"field": "hiddendangerpicture"
	});
	columnsArray.push({
		"title": "报告人",
		"field": "reporter"
	});
	columnsArray.push({
		"title": "报告时间",
		"field": "reporttime"
	});
	columnsArray.push({
		"title": "处理方法",
		"field": "dealinfo"
	});

	columnsArray.push({
		"title": "处理照片",
		"field": "dealpicture"
	});

	columnsArray.push({
		"title": "处理人",
		"field": "dealstaff"
	});
	columnsArray.push({
		"title": "处理时间",
		"field": "dealtime"
	});
	columnsArray.push({
		"title": "备注",
		"field": "remark"
	});

	var formData = new FormData();
	formData.append("plantID", document.hiddenDangerSelectForm.hiddenDangerPlantSlct.value.toString());
	formData.append("selectLevel", document.hiddenDangerSelectForm.hiddenDangerLevel.value.toString());
	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");
	$.ajax({
		url: window.serviceIP + "/api/safetyandep/gethiddendangermanagerecord",
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
				for(var i = 0; i < models.length; i++) {
					models[i]["rowNumber"] = i + 1;
				}
				currentRowCount = 0;
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
					toolbarAlign: 'left',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 18,
					pageNumber: 1,
					pageList: "[18, 36, 50, 100, All]",
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
};

function hiddenDangerManageRecordRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}

function addHiddenDangerManageRecord() {

	$("#hiddenDangerManageRecordReportForm" + " #reporter").val(localStorage.username);
	var today = new Date();
	$("#hiddenDangerManageRecordReportForm" + " #reporttime").val(today.format("yyyy-MM-dd hh:mm"));

	$("#myReportModal").modal('show');
}

function dealHiddenDangerManageRecord() {

	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}

	//console.log(row[0]);
	$("#hiddenDangerManageRecordDealForm" + " #id").val(row[0].id);
	$("#hiddenDangerManageRecordDealForm" + " #remark").val(row[0].remark);

	$("#hiddenDangerManageRecordDealForm" + " #dealstaff").val(localStorage.username);
	var today = new Date();
	$("#hiddenDangerManageRecordDealForm" + " #dealtime").val(today.format("yyyy-MM-dd hh:mm"));

	$("#myDealModal").modal('show');
}

function closeHiddenDangerManageRecordModel(modelID) {
	$("#" + modelID).modal('hide');
	$("#" + modelID + "PictureUpload #pictureName").val("");
}

function deleteHiddenDangerManageRecord() {
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}
	if(row[0].dealInfo) {
		alert("该隐患已处理不能删除!");
		return;
	}
	$.ajax({
		url: window.serviceIP + "/api/safetyandep/detetehiddendangermanagerecord?id=" + row[0].id,
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		//data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: $.cookie('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				getHiddenDangerManageRecord();
				alert('删除成功!');
			} else {
				alert("删除失败！" + data.message);
			}

		}
	});
}

function saveHiddenDangerManageRecordModel(modelID, formID) {

	var picLoadName = "";

	if($("#" + modelID + "PictureUpload #pictureName").get(0).files[0]) {
		var formData = new FormData($("#" + modelID + "PictureUpload")[0]);
		$.ajax({
			url: window.serviceIP + "/api/safetyandep/pictureupload",
			type: "POST",
			data: formData,
			headers: {
				Token: $.cookie('token')
			},
			cache: false, //不需要缓存
			processData: false,
			contentType: false,
			async: false,
			success: function(dataRes) {
				if(dataRes.status == 1) {
					picLoadName = dataRes.data.toString();
					$("#" + modelID + "PictureUpload #pictureName").val("");
				} else {
					alert("保存失败！" + dataRes.message);
					return;
				}
			}
		});
	}
	var formMap = window.formToObject($("#" + formID));
	if(modelID == 'myReportModal')
		formMap['hiddenDangerPicture'] = picLoadName;
	if(modelID == 'myDealModal')
		formMap['dealPicture'] = picLoadName;
	$.ajax({
		url: window.serviceIP + "/api/safetyandep/changehiddendangermanagerecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				alert("保存成功！" + dataRes.message);
				getHiddenDangerManageRecord();
				closeHiddenDangerManageRecordModel(modelID);
			} else {
				alert("保存失败！" + dataRes.message);
			}
		}
	});

};