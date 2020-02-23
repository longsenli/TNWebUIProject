function getStaffEpidemicTMPTRecordCompony() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getindustrialplantbyfilter?type=3",
		type: "GET",
		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		success: function(dataRes) {

			$("#componySlct").find('option').remove();
			$('#componySlct').append(("<option value=" + "-1" + ">" + "全部" + "</option>").toString())
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				//console.log(models);
				for (var  i  in  models)  {  
					$('#componySlct').append(("<option value=" + models[i].id.toString() + ">" +
						models[i].name.toString() + "</option>").toString())
				}
				$('#componySlct').selectpicker('refresh');
				$('#componySlct').selectpicker('render');  
var selected = false;
				if(localStorage.getItem('plantID') != null && localStorage.getItem('plantID') != 'undefined' && localStorage.getItem('plantID').toString().length > 0) {
					var numbers = $('#componySlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('plantID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#componySlct').selectpicker('hide');
							selected = true;
						}
					}
					
					$('#componySlct').selectpicker('refresh');
					$('#componySlct').selectpicker('render'); 

				} 
				if(!selected)
					{
						$('#componySlct').val("天能集团(河南)能源科技有限公司");
							$('#componySlct').selectpicker('refresh');
					$('#componySlct').selectpicker('render'); 
					}
				getStaffEpidemicTMPTRecordDepartmentSlct();

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function getStaffEpidemicTMPTRecordDepartmentSlct() {
	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/getStaffEpidemicBasicDepartmentInfo?compony=" + $('#componySlct').val(),
		type: "GET",
		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		success: function(dataRes) {

			$("#department").find('option').remove();
			$('#department').append(("<option value=" + "-1" + ">" + "全部" + "</option>").toString())

			$("#checkpoint").find('option').remove();
			$('#checkpoint').append(("<option value=" + "-1" + ">" + "全部" + "</option>").toString())
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				//console.log(models);
				for (var  i  in  models)  {  
					if("1" == models[i].type) {
						$('#department').append(("<option value=" + models[i].id.toString() + ">" +
							models[i].id.toString() + "</option>").toString())
					}

					if("2" == models[i].type) {
						$('#checkpoint').append(("<option value=" + models[i].id.toString() + ">" +
							models[i].name.toString() + "</option>").toString())
					}
				}
				$('#department').selectpicker('refresh');
				$('#department').selectpicker('render'); 

				$('#checkpoint').selectpicker('refresh');
				$('#checkpoint').selectpicker('render');   

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function saveStaffEpidemicTMPTRecord() {

	$("#saveBT").attr('disabled', true);
	var recordMapObjet = window.formToObject($("#staffTMPTRecordForm"));
	if(recordMapObjet["identityNO"] == "" || recordMapObjet["identityNO"].length < 10) {
		alert("请扫描员工二维码!");
		$("#saveBT").attr('disabled', false);
		return;
	}

	if(!recordMapObjet["temperature"] || recordMapObjet["temperature"] == "" || recordMapObjet["temperature"].length < 2) {
		alert("请扫描温度二维码!");
		$("#saveBT").attr('disabled', false);
		return;
	}
	recordMapObjet["updator"] = localStorage.userID;
	recordMapObjet["extd2"] = localStorage.roleID;
	if(localStorage.roleID.substr(0, 2) != "70") {
		alert("该账号没有登记权限,请确认后使用!");
		$("#saveBT").attr('disabled', false);
		return;
	}

	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/addStaffTMPTRecord",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(recordMapObjet).toString(),
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(dataRes) {

			if(dataRes.status == 1) { 
				$('#showImage').addClass('alert alert-success').html('登记成功!祝您生活愉快,请带好口罩,保持距离!').show().delay(3000).fadeOut();
				getStaffEpidemicTMPTRecord();
				//	$("#name").val("");

				$("#identityNO").val("");
			} else {
				$("#saveBT").attr('disabled', false);
				alert(dataRes.message);
			}
		}
	});
	$("#saveBT").attr('disabled', false);
};

function getStaffEpidemicBasicInfo(identityNo) {
	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/getStaffEpidemicBasicInfo?identityNo=" + identityNo,
		type: "GET",
		contentType: "application/json",
		//dataType: "json",
		//data: JSON.stringify(recordMapObjet).toString(),
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(dataRes) {

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				if(models.length < 1) {
					alert("未找到该身份证号信息,请检查身份证号是否正确!" + identityNo);
					return;
				}
				if(models[0].compony != localStorage.plantID) {
					alert("该员工不属于本公司,请核对!")
					return;
				}

				$("#name").val(models[0].name);
				$("#sex").val(models[0].sex);
				$("#department").val(models[0].department);
				$("#telephoneNumber").val(models[0].telephoneNumber);
				$("#identityNO").val(models[0].identityNO);
				$("#familyLocation").val(models[0].familyLocation);
				$("#extd1").val(models[0].extd1);
				$("#compony").val(models[0].compony);
				getStaffEpidemicTMPTRecord();
			} else {

				alert(dataRes.message);
			}
		}
	});
};

function saveOnClickRadio() {
	setTimeout(saveStaffEpidemicTMPTRecord(), 2000);
}

function getStaffEpidemicTMPTSelection(selectedOption) {
	selectedOption = selectedOption.trim();

	$("input:radio[value='" + selectedOption + "']").attr('checked', 'true');

	//	var numbers = $('#temperature').find("option"); //获取select下拉框的所有值
	//	var selectBL = false;
	//	for(var j = 0; j < numbers.length; j++) {
	//		if($(numbers[j]).val().toString() == selectedOption) {
	//			$(numbers[j]).attr("selected", "selected");
	//			selectBL = true;
	//		}
	//	}
	//	if(!selectBL) {
	//		alert("二维码不是有效体温信息," + selectedOption);
	//		return;
	//	}
	//	$('#temperature').selectpicker('refresh');
	//	$('#temperature').selectpicker('render'); 

	if($('#autoFinishOrderCheck').is(':checked')) {
		setTimeout(saveStaffEpidemicTMPTRecord(), 2000);
	}
};

function getStaffEpidemicTMPTRecord() {

	if($("#name").val() == '') {
		alert($("#name").attr('placeholder'));
		$("#name").focus();
		return false;
	}

	var columnsArray = [];
	columnsArray.push({
		"title": "员工姓名",
		"field": "name"
	});
	columnsArray.push({
		"title": "体        温",
		"field": "temperature"
	});
	columnsArray.push({
		"title": "登    记    时    间",
		"field": "updateTime"
	});
	columnsArray.push({
		"title": "性 别",
		"field": "sex"
	});
	columnsArray.push({
		"title": "  部          门  ",
		"field": "department"
	});

	columnsArray.push({
		"title": "手    机    号    码",
		"field": "telephoneNumber"
	});

	columnsArray.push({
		"title": "其他说明",
		"field": "remark"
	});

	var formData = new FormData();
	formData.append("name", $("#name").val());

	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/getStaffLatestEpidemicTMPTRecord",
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
				var resText = "";
				for(var i in models) {
					resText += "体温:" + models[i].temperature + "时间 :" + models[i].updateTime + "</br>"
				}

				$('#latestTMPTText').html(resText);

				//				$('#table').bootstrapTable('destroy').bootstrapTable({
				//					data: models,
				//					toolbar: '#materialidToolbar',
				//					toolbarAlign: 'left',
				//					singleSelect: true,
				//					clickToSelect: true,
				//					sortName: "orderSplitid",
				//					sortOrder: "asc",
				//					pageSize: 40,
				//					pageNumber: 1,
				//					uniqueId: "id",
				//					pageList: "[10, 25, 50, 100, All]",
				//					//showToggle: true,
				//					//showRefresh: true,
				//					//showColumns: true,
				//					search: true,
				//					searchAlign: 'right',
				//					pagination: true,
				//					//>>>>>>>>>>>>>>导出excel表格设置
				//					showExport: true, //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
				//					exportDataType: "all", //basic', 'all', 'selected'.
				//					exportTypes: ['doc', 'excel'], //导出类型'json','xml','png','csv','txt','sql','doc','excel','xlsx','pdf'
				//					//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
				//					exportOptions: { //导出参数
				//						//ignoreColumn: [0, 0], //忽略某一列的索引  
				//						fileName: '数据导出', //文件名称设置  
				//						worksheetName: 'Sheet1', //表格工作区名称  
				//						tableName: '数据导出表',
				//						excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
				//						//onMsoNumberFormat: DoOnMsoNumberFormat  
				//					},
				//					//导出excel表格设置<<<<<<<<<<<<<<<<
				//					columns: columnsArray
				//				});
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

function recognitionQR(qrCode) {
	if(qrCode.length == 18) {
		getStaffEpidemicBasicInfo(qrCode);
	} else {
		getStaffEpidemicTMPTSelection(qrCode);
	}
}

//重写scanQR方法
function scanLocationQR() {
	//执行H5扫描二维码方法
	openBarcode();
}

////////以下是H5+调用摄像头进行扫一扫
// alert(openBarcode())
var img = null;
var blist = [];

function scaned(t, r, f) {
	// alert('t='+t+'r='+r+'f='+f);
	//获取扫描二维码信息
	recognitionQR(r);

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

function getStaffEpidemicTMPTRecordByFilter() {

	var columnsArray = [];
	columnsArray.push({
		"title": "员工姓名",
		"field": "name"
	});

	columnsArray.push({
		"title": "性别",
		"field": "sex"
	});
	columnsArray.push({
		"title": "  部     门  ",
		"field": "department"
	});

	columnsArray.push({
		"title": "手    机    号    码",
		"field": "telephoneNumber"
	});
	columnsArray.push({
		"title": "身份证号",
		"field": "identityNO"
	});
	columnsArray.push({
		"title": "  籍             贯 ",
		"field": "familyLocation"
	});
	columnsArray.push({
		"title": "  现      住      址     ",
		"field": "extd1"
	});
	columnsArray.push({
		"title": "体     温",
		"field": "temperature"
	});

	columnsArray.push({
		"title": "其他说明",
		"field": "remark"
	});
	columnsArray.push({
		"title": "登记时间",
		"field": "updateTime"
	});

	columnsArray.push({
		"title": "登  记  地  点",
		"field": "updator"
	});

	var formData = new FormData();
	formData.append("name", $("#componySlct").val() + "___" + $("#checkpoint").val());
	formData.append("startTime", $("#startTime").val());
	formData.append("endTime", $("#endTime").val() + " 23:59:59");
	formData.append("department", $("#department").val());
	formData.append("tmptType", $("#temperature").val());
	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/getStaffTMPTRecord",
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
					//>>>>>>>>>>>>>>导出excel表格设置
					showExport: true, //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
					exportDataType: "all", //basic', 'all', 'selected'.
					exportTypes: ['doc', 'excel'], //导出类型'json','xml','png','csv','txt','sql','doc','excel','xlsx','pdf'
					//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
					exportOptions: { //导出参数
						//ignoreColumn: [0, 0], //忽略某一列的索引  
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

function getStaffEpidemicTMPTRecordByName() {
	if($("#selectedName").val() == '') {
		alert($("#selectedName").attr('placeholder'));
		$("#selectedName").focus();
		return false;
	}
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});

	columnsArray.push({
		"title": "员工姓名",
		"field": "name"
	});

	columnsArray.push({
		"title": "性别",
		"field": "sex"
	});
	columnsArray.push({
		"title": "  部     门  ",
		"field": "department"
	});

	columnsArray.push({
		"title": "手    机    号    码",
		"field": "telephoneNumber"
	});
	columnsArray.push({
		"title": "身份证号",
		"field": "identityNO"
	});
	columnsArray.push({
		"title": "  籍             贯 ",
		"field": "familyLocation"
	});
	columnsArray.push({
		"title": "  现      住      址     ",
		"field": "extd1"
	});
	columnsArray.push({
		"title": "体     温",
		"field": "temperature"
	});

	columnsArray.push({
		"title": "其他说明",
		"field": "remark"
	});
	columnsArray.push({
		"title": "登记时间",
		"field": "updateTime"
	});
	columnsArray.push({
		"title": "登  记  地  点",
		"field": "updator"
	});
	if($("#componySlct").val() == '-1') {
		alert("不能选择全部!请选择明确公司!");

		return false;
	}
	var formData = new FormData();
	formData.append("name", $("#selectedName").val());
	formData.append("startTime", $("#startTime").val());
	formData.append("endTime", $("#endTime").val() + " 23:59:59");
	formData.append("department", $("#componySlct").val() + "___compony");
	formData.append("tmptType", "-1");
	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/getStaffTMPTRecord",
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
					//>>>>>>>>>>>>>>导出excel表格设置
					showExport: true, //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
					exportDataType: "all", //basic', 'all', 'selected'.
					exportTypes: ['doc', 'excel'], //导出类型'json','xml','png','csv','txt','sql','doc','excel','xlsx','pdf'
					//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
					exportOptions: { //导出参数
						//ignoreColumn: [0, 0], //忽略某一列的索引  
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

function getStaffEpidemicBasicInfoByDepartment() {
	if($("#department").val() == '-1') {
		alert("不能选择全部!请选择明确部门!");

		return false;
	}
	if($("#componySlct").val() == '-1') {
		alert("不能选择全部!请选择明确公司!");

		return false;
	}
	var columnsArray = [];
	columnsArray.push({
		checkbox: true,
		formatter: function(value, row, index) {
			return {
				checked: true //设置选中
			};
		}
	});
	columnsArray.push({
		"title": "员工姓名",
		"field": "name"
	});

	columnsArray.push({
		"title": "性别",
		"field": "sex"
	});
	columnsArray.push({
		"title": "  部     门  ",
		"field": "department"
	});

	columnsArray.push({
		"title": "手    机    号    码",
		"field": "telephoneNumber"
	});
	columnsArray.push({
		"title": "身份证号",
		"field": "identityNO"
	});
	columnsArray.push({
		"title": "家庭住址",
		"field": "familyLocation"
	});

	var formData = new FormData();
	formData.append("department", $("#department").val());
	formData.append("compony", $("#componySlct").val());
	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/getStaffEpidemicBasicInfoByDepartment",
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
					pageSize: 100,
					pageNumber: 1,
					uniqueId: "id",
					pageList: "[50, 100, 150, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					search: true,
					searchAlign: 'right',
					pagination: true,
					//>>>>>>>>>>>>>>导出excel表格设置
					showExport: true, //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
					exportDataType: "all", //basic', 'all', 'selected'.
					exportTypes: ['doc', 'excel'], //导出类型'json','xml','png','csv','txt','sql','doc','excel','xlsx','pdf'
					//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
					exportOptions: { //导出参数
						//ignoreColumn: [0, 0], //忽略某一列的索引  
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

function printStaffQRCode() {
	//createQRCode();
	//	var img = document.getElementById("QRImage"); /// get image element
	//	var canvas = document.getElementsByTagName("canvas")[0]; /// get canvas element
	//	img.src = canvas.toDataURL("image/png"); /// update image

	var selectRow = $("#table").bootstrapTable('getSelections');

	//var arrayObj = new Array();
	for(var i = 0; i < selectRow.length; i++) {
		//console.log("dayin");

		var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
		LODOP.PRINT_INIT("打印任务名"); //首先一个初始化语句
		//LODOP.ADD_PRINT_BARCODE(0,0,200,100,"Code39","*123ABC4567890*");
		LODOP.ADD_PRINT_BARCODE(15, 70, 120, 120, "QRCode", selectRow[i].identityNO);

		LODOP.ADD_PRINT_TEXT(130, 60, 300, 250, selectRow[i].identityNO); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		LODOP.ADD_PRINT_TEXT(152, 60, 200, 250, selectRow[i].name); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);
		LODOP.PRINT(); //最后一个打印(或预览、维护、设计)语句
	}
}

function getStaffEpidemicBasicInfoByName() {
	if($("#selectedName").val() == '') {
		alert($("#selectedName").attr('placeholder'));
		$("#selectedName").focus();
		return false;
	}
	var columnsArray = [];
	columnsArray.push({
		checkbox: true,
		formatter: function(value, row, index) {
			return {
				checked: true //设置选中
			};
		}
	});
	columnsArray.push({
		"title": "员工姓名",
		"field": "name"
	});

	columnsArray.push({
		"title": "性别",
		"field": "sex"
	});
	columnsArray.push({
		"title": "  部     门  ",
		"field": "department"
	});

	columnsArray.push({
		"title": "手    机    号    码",
		"field": "telephoneNumber"
	});
	columnsArray.push({
		"title": "身份证号",
		"field": "identityNO"
	});
	columnsArray.push({
		"title": "籍          贯",
		"field": "familyLocation"
	});
	columnsArray.push({
		"title": "现       住        址",
		"field": "extd1"
	});
	var formData = new FormData();
	formData.append("name", $("#selectedName").val());

	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/getStaffEpidemicBasicInfoByName",
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
					pageSize: 100,
					pageNumber: 1,
					uniqueId: "id",
					pageList: "[50, 100, 150, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					search: true,
					searchAlign: 'right',
					pagination: true,
					//>>>>>>>>>>>>>>导出excel表格设置
					showExport: true, //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
					exportDataType: "all", //basic', 'all', 'selected'.
					exportTypes: ['doc', 'excel'], //导出类型'json','xml','png','csv','txt','sql','doc','excel','xlsx','pdf'
					//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
					exportOptions: { //导出参数
						//ignoreColumn: [0, 0], //忽略某一列的索引  
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

function deleteStaffEpidemicTMPTRecord() {
	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}
	if(!row[0].id) {
		alert("请先按照名称查询个人记录!");
		return;
	}
	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/deleteStaffTMPTRecord?id=" + row[0].id,
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		//data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(data) {
			if(data.status == 1) {
				getStaffEpidemicTMPTRecordByName();
				alert('删除成功!');
			} else {
				alert("保存失败！" + data.message);
			}

		}
	});
}

function getStaffEpidemicTMPTRecordBySummary() {
	if($("#componySlct").val() == '-1') {
		alert("不能选择全部!请选择明确公司!");

		return false;
	}
	var columnsArray = [];

	columnsArray.push({
		"title": "部         门",
		"field": "name"
	});

	columnsArray.push({
		"title": "数     量",
		"field": "number"
	});
	columnsArray.push({
		"title": "  含         义  ",
		"field": "type"
	});

	var formData = new FormData();
	formData.append("compony", $("#componySlct").val());
	formData.append("startTime", $("#startTime").val());

	formData.append("endTime", $("#endTime").val() + " 23:59:59");

	$.ajax({
		url: window.serviceIP + "/api/EpidemicManage/getTMPTRecordSummary",
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
					pageSize: 100,
					pageNumber: 1,
					uniqueId: "id",
					pageList: "[50, 100, 150, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					search: true,
					searchAlign: 'right',
					pagination: true,
					//>>>>>>>>>>>>>>导出excel表格设置
					showExport: true, //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
					exportDataType: "all", //basic', 'all', 'selected'.
					exportTypes: ['doc', 'excel'], //导出类型'json','xml','png','csv','txt','sql','doc','excel','xlsx','pdf'
					//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
					exportOptions: { //导出参数
						//ignoreColumn: [0, 0], //忽略某一列的索引  
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