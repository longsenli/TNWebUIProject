function hiddenDangerManagePlantSlctFun(type) {
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

			$("#plantid").find('option').remove();

			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#plantid').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())

				}

				$('#plantid').selectpicker('refresh');
				$('#plantid').selectpicker('render');   
				getHiddenDangerManageRecord(type);
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getLocationInfoSlct(dangerType) {
	$.ajax({
		url: window.serviceIP + "/api/safetyandep/getLocationInfoByQR?qrCode=-1",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {

			$("#locationInfoSlct").find('option').remove();
			$('#locationInfoSlct').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString())

			//console.log(dataRes);
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#locationInfoSlct').append(("<option value=" + models[i].id.toString() + ">" + models[i].name.toString()  + "</option>").toString())

				}

				$('#locationInfoSlct').selectpicker('refresh');
				$('#locationInfoSlct').selectpicker('render');   
				getRegularPerambulationRecord();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function hiddenDangerManageRecordRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}

function upload(path, dangerType) {
	var wt = plus.nativeUI.showWaiting();
	var task = plus.uploader.createUpload(window.serviceIP + "/api/safetyandep/pictureupload", {
			method: "POST"
		},
		function(t, status) { //上传完成
			// this.upLoadCount++;
			if(status == 200) {
				//console.log(fileLocation + "添加成功：" + t.responseText);
				res = JSON.parse(t.responseText)
				wt.close(); //关闭等待提示按钮 
				if(res.status == 1) {

					var formMap = window.formToObject($("#hiddenDangerManageRecordReportForm"));
					var today = new Date();
					formMap['hiddenDangerPicture'] = res.data;
					//formMap['reporttime'] = today.format("yyyy-MM-dd hh:mm");
					formMap['reporter'] = localStorage.username;
					formMap['hiddenDangerType'] = dangerType;
					//console.log(JSON.stringify(formMap).toString());

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
								fileLocation = "";
								getHiddenDangerManageRecord(dangerType);
								alert("保存成功！");
								$("#image-list").html("");
								document.getElementById("hiddenDangerManageRecordReportForm").reset();
							} else {
								alert("保存失败！" + dataRes.message);
							}
						}
					});
				}

				//  this.pictureList.push(entry.toLocalURL())
			} else {
				console.log("添加失败：" + status + t);
				wt.close(); //关闭等待提示按钮
			}
		}
	);
	task.addFile(path, {
		key: "pictureName"
	})
	task.start();
}

function addHiddenDangerManageRecord() {
	$('#dangerlevel').selectpicker('refresh');
	$('#dangerlevel').selectpicker('render'); 

	$('#hiddendangertype').selectpicker('refresh');
	$('#hiddendangertype').selectpicker('render'); 

	$('#plantid').selectpicker('refresh');
	$('#plantid').selectpicker('render'); 

	$("#hiddenDangerManageRecordReportForm" + " #reporter").val(localStorage.username);
	var today = new Date();
	$("#hiddenDangerManageRecordReportForm" + " #reporttime").val(today.format("yyyy-MM-dd hh:mm"));

	$("#myReportModal").modal('show');
}

//图片显示
function showPics(url, name) {
	//根据路径读取到文件 
	plus.io.resolveLocalFileSystemURL(url, function(entry) {
		entry.file(function(file) {
			var fileReader = new plus.io.FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onloadend = function(e) {
				var picUrl = e.target.result.toString();
				var picIndex = $("#picIndex").val();
				var nowIndex = parseInt(picIndex) + 1;
				$("#picIndex").val(nowIndex);
				var html = '';
				html += '<div class="image-item " id="item' + nowIndex + '">';
				//html += '<div class="image-close" οnclick="delPic(' + nowIndex + ')">X</div>';
				html += '<div><img src="' + picUrl + '" class="upload_img" style="width:50%;height:50%;"/></div>';
				html += '</div>';
				//html += $("#image-list").html();
				$("#image-list").html(html);
			}
		});
	});
}
//压缩图片  
function compressImage(url, filename) {
	var name = "_doc/upload/" + filename;
	plus.zip.compressImage({
			src: url, //src: (String 类型 )压缩转换原始图片的路径  
			dst: url, //压缩转换目标图片的路径  
			quality: 80, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100 
			width: 800,
			overwrite: true //overwrite: (Boolean 类型 )覆盖生成新文件  
		},
		function(zip) {
			//页面显示图片
			showPics(zip.target, name);
		},
		function(error) {
			plus.nativeUI.toast("压缩图片失败，请稍候再试");
		});
}

//调用手机摄像头并拍照
function getImage() {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			fileLocation = entry.toLocalURL();
			compressImage(entry.toLocalURL(), entry.name);
		}, function(e) {
			plus.nativeUI.toast("读取拍照文件错误：" + e.message);
		});
	}, function(e) {}, {
		filter: 'image'
	});
}
//从相册选择照片
function galleryImgs() {
	plus.gallery.pick(function(e) {
		var name = e.substr(e.lastIndexOf('/') + 1);
		compressImage(e, name);
	}, function(e) {}, {
		filter: "image"
	});
}

//点击事件，弹出选择摄像头和相册的选项
function showActionSheet() {
	getImage();
	return;

	var bts = [{
		title: "拍照"
	}, {
		title: "从相册选择"
	}];
	plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: bts
		},
		function(e) {
			if(e.index == 1) {
				getImage();
			} else if(e.index == 2) {
				galleryImgs();
			}
		}
	);
}

var fileLocation = "";

function saveHiddenDangerManageRecordModel(dangerType) {

	if(dangerType == "定点巡查") {
		if($("#hiddenDangerManageRecordReportForm #areaID").val().length < 5) {
			alert("请先扫描危险点二维码!");
			return;
		}
	}

	if(fileLocation && fileLocation.length > 5) {
		upload(fileLocation, dangerType);
	} else {
		alert("请拍照!");
	}

};

function getRegularPerambulationRecord() {
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
		"title": "巡查位置",
		"field": "areaID"
	});
	columnsArray.push({
		"title": "状态描述",
		"field": "hiddendanger"
	});
	columnsArray.push({
		"title": "巡点图片",
		"field": "hiddendangerpicture",
		formatter: function(value, row, index) {
			if(value)
				//				console.log('<img style="width:40px;height:40px;" src="http://' + "192.168.80.228:19001" + '/SafetyAndEPPicture/' +
				//					window.stringToDatetimeLocalType(row.reporttime, "yyyy-MM-dd") + '/' + value + '" onclick="wholeImg(this) "/ >')
				return '<img style="width:40px;height:40px;" src="http://' + window.IPOnly + ":19001" + '/SafetyAndEPPicture/' +
					window.stringToDatetimeLocalType(row.reporttime, "yyyy-MM-dd") + '/' + value + '" onclick="wholeImg(this) "/ >';
			//			return '<img style="width:5px;height:5px;" src="ftp://192.168.80.228:2121/TNFile/SafetyAndEPPicture/' 
			//			+ window.stringToDatetimeLocalType(row.reporttime,"yyyy-MM-dd")+'/' + value+'" onclick="wholeImg(this) "/ >' ;
			//			
			//				return '<img style="width:40px;height:40px;" src="http://' + window.IPOnly + ":" + window.PicturePort + '/TNFile/SafetyAndEPPicture/' +
			//					window.stringToDatetimeLocalType(row.reporttime, "yyyy-MM-dd") + '/' + value + '" onclick="wholeImg(this) "/ >';

			//			return '<a href="ftp://192.168.80.228:2121/TNFile/SafetyAndEPPicture/' 
			//			+ window.stringToDatetimeLocalType(row.reporttime,"yyyy-MM-dd")+'/' + value+'"  target="_blank" >' + value +"</a>";
			return '';
		}
	});
	columnsArray.push({
		"title": "巡查人",
		"field": "reporter"
	});
	columnsArray.push({
		"title": "巡查时间",
		"field": "reportTime"
		//		,
		//			formatter: function(value, row, index) {
		//				//console.log(value);
		//				if(value) {
		//					return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
		//				}
		//
		//			}
	});

	columnsArray.push({
		"title": "备注",
		"field": "remark"
	});
	var formData = new FormData();

	formData.append("equipID", document.hiddenDangerSelectForm.locationInfoSlct.value.toString());
	formData.append("staffName", "-1");
	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");
	$.ajax({
		url: window.serviceIP + "/api/safetyandep/getRegularInspectRecord",
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
				$("#table").show();
				$("#myChart").hide();
				var models = eval("(" + dataRes.data + ")");
				for(var i = 0; i < models.length; i++) {
					models[i]["rowNumber"] = i + 1;
				}

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
}

function closeImageShow() {
	$("#imageShow").css('display', 'none');
}

function wholeImg(_this) {

	//console.log($(window).width() + "===" + $(window).height()); 
	var img = document.getElementById("imageShow");
	img.style.width = $(window).width() * 0.8;
	img.style.height = $(window).height() * 0.8;
	img.src = $(_this).attr("src"); //将结果数据显示到img标签上
	$("#imageShow").css('display', 'block');
}

function getHiddenDangerManageRecord(dangerType) {

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

	if("隐患上报" == dangerType) {
		columnsArray.push({
			"title": "预警等级",
			"field": "dangerlevel"
		});
		columnsArray.push({
			"title": "具体位置",
			"field": "areaid"
		});
		columnsArray.push({
			"title": "隐患描述",
			"field": "hiddendanger"
		});
		columnsArray.push({
			"title": "隐患图片",
			"field": "hiddendangerpicture",
			formatter: function(value, row, index) {
				if(value)
					//				console.log(window.IPOnly); 
					//				console.log('<img style="width:40px;height:40px;" src="http://' +window.IPOnly+ ":19001" +  '/SafetyAndEPPicture/' +
					//					window.stringToDatetimeLocalType(row.reporttime, "yyyy-MM-dd") + '/' + value + '" onclick="wholeImg(this) "/ >')
					return '<img style="width:40px;height:40px;" src="http://' + window.IPOnly + ":19001" + '/SafetyAndEPPicture/' +
						window.stringToDatetimeLocalType(row.reporttime, "yyyy-MM-dd") + '/' + value + '" onclick="wholeImg(this) "/ >';

				//			return '<img style="width:5px;height:5px;" src="ftp://192.168.80.228:2121/TNFile/SafetyAndEPPicture/' 
				//			+ window.stringToDatetimeLocalType(row.reporttime,"yyyy-MM-dd")+'/' + value+'" onclick="wholeImg(this) "/ >' ;
				//			
				//					return '<img style="width:40px;height:40px;" src="http://' + window.IPOnly + ":" + window.PicturePort + '/TNFile/SafetyAndEPPicture/' +
				//						window.stringToDatetimeLocalType(row.reporttime, "yyyy-MM-dd") + '/' + value + '" onclick="wholeImg(this) "/ >';

				//			return '<a href="ftp://192.168.80.228:2121/TNFile/SafetyAndEPPicture/' 
				//			+ window.stringToDatetimeLocalType(row.reporttime,"yyyy-MM-dd")+'/' + value+'"  target="_blank" >' + value +"</a>";
				return '';
			}
		});
		columnsArray.push({
			"title": "报告人",
			"field": "reporter"
		});
		columnsArray.push({
			"title": "报告时间",
			"field": "reporttime"
			//			,
			//			formatter: function(value, row, index) {
			//				//console.log(value);
			//				if(value) {
			//					return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			//				}
			//
			//			}
		});

		columnsArray.push({
			"title": "处理方法",
			"field": "dealinfo"
		});

		columnsArray.push({
			"title": "处理照片",
			"field": "dealpicture",
			formatter: function(value, row, index) {
				if(value)
					return '<img style="width:40px;height:40px;" src="http://' + window.IPOnly + ":19001" + '/SafetyAndEPPicture/' +
						window.stringToDatetimeLocalType(row.reporttime, "yyyy-MM-dd") + '/' + value + '" onclick="wholeImg(this) "/ >';

				//				return '<a href="ftp://192.168.80.228:2121/TNFile/SafetyAndEPPicture/' +
				//					window.stringToDatetimeLocalType(row.dealtime, "yyyy-MM-dd") + '/' + value + '"  target="_blank" >' + value + "</a>";
				return '';
			}
		});

		columnsArray.push({
			"title": "处理人",
			"field": "dealstaff"
		});
		columnsArray.push({
			"title": "处理时间",
			"field": "dealtime"
			//			,
			//			formatter: function(value, row, index) {
			//				//console.log(value);
			//				if(value) {
			//					return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
			//				}
			//
			//			}
		});
		columnsArray.push({
			"title": "状态",
			"field": "status",
			formatter: function(value, row, index) {
				if(value == '1') {
					return '未处理';
				}
				if(value == '2') {
					return '已处理';
				}
				return '未处理';
			}
		});
	} else {

		columnsArray.push({
			"title": "巡查位置",
			"field": "areaid"
		});
		columnsArray.push({
			"title": "状态描述",
			"field": "hiddendanger"
		});
		columnsArray.push({
			"title": "巡点图片",
			"field": "hiddendangerpicture",
			formatter: function(value, row, index) {
				if(value)
					//				console.log('<img style="width:40px;height:40px;" src="http://' +window.IPOnly+ ":19001"  +  '/SafetyAndEPPicture/' +
					//					window.stringToDatetimeLocalType(row.reporttime, "yyyy-MM-dd") + '/' + value + '" onclick="wholeImg(this) "/ >')
					//								return '<img style="width:5px;height:5px;" src="ftp://192.168.80.228:2121/TNFile/SafetyAndEPPicture/' 
					//								+ window.stringToDatetimeLocalType(row.reporttime,"yyyy-MM-dd")+'/' + value+'" onclick="wholeImg(this) "/ >' ;
					//			
					return '<img style="width:40px;height:40px;" src="http://' + window.IPOnly + ":19001" + '/SafetyAndEPPicture/' +
						window.stringToDatetimeLocalType(row.reporttime, "yyyy-MM-dd") + '/' + value + '" onclick="wholeImg(this) "/ >';

				//			return '<a href="ftp://192.168.80.228:2121/TNFile/SafetyAndEPPicture/' 
				//			+ window.stringToDatetimeLocalType(row.reporttime,"yyyy-MM-dd")+'/' + value+'"  target="_blank" >' + value +"</a>";
				return '';
			}
		});
		columnsArray.push({
			"title": "巡查人",
			"field": "reporter"
		});
		columnsArray.push({
			"title": "巡查时间",
			"field": "reporttime",
			formatter: function(value, row, index) {
				//console.log(value);
				if(value) {
					return(new Date(parseInt(value))).format("yyyy-MM-dd hh:mm");
				}

			}
		});

		columnsArray.push({
			"title": "备注",
			"field": "remark"
		});

	}

	var formData = new FormData();
	formData.append("name", localStorage.username);
	formData.append("type", dangerType);

	$.ajax({
		url: window.serviceIP + "/api/safetyandep/getMyReprotDanger",
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

var accept_webName = null;
//重写scanQR方法
function scanQR(webName) {
	//执行H5扫描二维码方法
	openBarcode();
	accept_webName = webName;
}

////////以下是H5+调用摄像头进行扫一扫
// alert(openBarcode())
var img = null;
var blist = [];

function scaned(t, r, f) {
	//获取扫描二维码信息
	recognitionQR(accept_webName, r);
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

function recognitionQR(webName, qrCode) {
	selectLoactionInfo(qrCode);
}

function selectLoactionInfo(locationID) {

	$.ajax({
		url: window.serviceIP + "/api/safetyandep/getLocationInfoByQR?qrCode=" + locationID,
		type: "GET",
		contentType: "application/json",
		dataType: "json",
		//data: JSON.stringify(formMap).toString(),
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");

				if(models.length != 1) {
					alert("获取二维码信息失败,请重试或联系管理员！" + locationID);
					return;
				}

				$("#hiddenDangerManageRecordReportForm" + " #areaID").val(models[0]["name"]);
				$("#hiddenDangerManageRecordReportForm" + " #equipmentID").val(models[0]["id"]);

			} else {
				alert("请求失败！" + dataRes.message);
			}
		}
	});
}

function getRegularTimesPicture() {
	var formData = new FormData();
	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");
	$.ajax({
		url: window.serviceIP + "/api/safetyandep/getRegularLocationTimes",
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
				if(models.length < 1) {
					alert("未查找到数据!");
					return;
				}
				$("#table").hide();
				$("#myChart").show();
				var locationName = [];
				var inspectTimes = [];
				for(var i in models) {
					locationName.push(models[i].name);
					inspectTimes.push(models[i].num);
				}

				if(($(window).height() - $("#myChart").offset().top) < 800) {
					$("#myChart").height(800);

				} else {
					$("#myChart").height($(window).height() - $("#myChart").offset().top);

				}
				var realWidth = ($("#myChart").width() * 0.65) / (locationName.length * 2);

				//产量进度条形图
				var myDangerChart = echarts.init(document.getElementById("myChart"));
				// 指定图表的配置项和数据
				var optionRealTimeInfo = {
					title: {
						text: "定点巡查频次图",
						textStyle: {
							fontWeight: 'bold', //标题颜色
							fontSize: '28',
							color: '#FFFFFF'
						},

						//			text: ‘十大高耗水行业用水量八减两增 ‘,    //标题
						//              backgroundColor: ‘#ff0000‘,            //背景
						//                      subtext: ‘同比百分比(%)‘,               //子标题
						//
						//              textStyle: {
						//                      fontWeight: ‘normal‘,              //标题颜色
						//                      color: ‘#408829‘
						//              },
						//
						//              x:"center"    
					},
					//鼠标触发提示数量
					tooltip: {
						trigger: "axis",
					},
					legend: {
						show: true,
						orient: 'vertical', // 'vertical'
						x: 'right', // 'center' | 'left' | {number},
						y: 'top', // 'center' | 'bottom' | {number}
						//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
						data: ["频次"],
						textStyle: {
							fontSize: 18,
							color: "#FFFFFF"
						}
					},
					//x轴显示
					xAxis: {
						data: locationName,
						splitLine: {　　　　
							show: false　　
						},
						axisLine: {
							lineStyle: {
								color: '#FFFFFF',
								width: 2
							}
						},
						axisLabel: { //设置坐标轴刻度样式
							textStyle: {
								fontSize: 14,
								fontWeight: 'normal',
							},
							interval: 0,
							formatter: function(value) {
								//debugger
								if(!value) {
									return value;
								}
								var ret = ""; //拼接加\n返回的类目项  
								var maxLength = 6; //每项显示文字个数  
								var valLength = value.length; //X轴类目项的文字个数  
								var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
								if(rowN > 1) //如果类目项的文字大于3,  
								{
									for(var i = 0; i < rowN; i++) {
										var temp = ""; //每次截取的字符串  
										var start = i * maxLength; //开始截取的位置  
										var end = start + maxLength; //结束截取的位置  
										//这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
										temp = value.substring(start, end) + "\n";
										ret += temp; //凭借最终的字符串  
									}
									return ret;
								} else {
									return value;
								}
							}
						}
					},
					//y轴显示
					yAxis: {
						splitLine: {　　　　
							show: false　　
						},
						axisLine: {
							lineStyle: {
								color: '#FFFFFF',
								width: 2
							}
						},
						axisLabel: { //设置坐标轴刻度样式
							textStyle: {
								fontSize: 18,
								fontWeight: 'normal',
							},
						}
					},
					series: [{
							name: "频次",
							type: "bar",
							stack: "频次", //折叠显示
							data: inspectTimes, //（此处的<%=zcfgData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
							barWidth: realWidth,
							//显示颜色
							itemStyle: {
								normal: {
									color: "#FFA500",
									label: {
										show: true,
										textStyle: {

											fontSize: 16
										}
									}
								}
							}
						}

					]
				};
				// 使用刚指定的配置项和数据显示图表。
				myDangerChart.setOption(optionRealTimeInfo);
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