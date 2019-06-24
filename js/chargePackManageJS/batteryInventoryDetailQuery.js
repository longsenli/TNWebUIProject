function batteryInventoryDetailQueryIndustrialPlantSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getindustrialplant",
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
				//console.log(models);
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id.toString() + ">" +
						models[i].name.toString() + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				// $('#industrialPlantSlct').selectpicker('mobile');
//				if(localStorage.getItem('plantID') != null && localStorage.getItem('plantID') != 'undefined' && localStorage.getItem('plantID').toString().length > 0) {
//					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
//					for(var j = 0; j < numbers.length; j++) {
//						if($(numbers[j]).val().toString() == localStorage.getItem('plantID')) {
//							$(numbers[j]).attr("selected", "selected");
//							$('#industrialPlantSlct').selectpicker('hide');
//							$("#industrialPlantLabel").css("display", "none");
//						}
//					}
//					$('#industrialPlantSlct').selectpicker('refresh');
//					$('#industrialPlantSlct').selectpicker('render'); 
//
//				}
				
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};


function selectInventoryRecord() {

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
		"title": "物料名称",
		"field": "materialname"
	});
	columnsArray.push({
		"title": "库存数量",
		"field": "currenttotalnum"
	});
	
	columnsArray.push({
		"title": "整理台电池",
		"field": "ontidyingnum"
	});

	columnsArray.push({
		"title": "返充电池",
		"field": "backchargenum"
	});
	columnsArray.push({
		"title": "打堆数量",
		"field": "piletotalnum"
	});
	columnsArray.push({
		"title": "当日下架",
		"field": "pulloffnum"
	});
	columnsArray.push({
		"title": "新增打堆数量",
		"field": "pipenewnum"
	});
	columnsArray.push({
		"title": "打堆包装",
		"field": "packagenewnum"
	});

	columnsArray.push({
		"title": "盘点时间",
		"field": "checktime"
	});

//	columnsArray.push({
//		"title": "报修详情",
//		"field": "repaircombine"
//	});
//	columnsArray.push({
//		"title": "下架人员",
//		"field": "pulloffstaffname"
//	});
//	columnsArray.push({
//		"title": "下架日期",
//		"field": "pulloffdate",
//		formatter: function(value, row, index) {
//			if(value) {
//				
//				if(value > '2019')
//				return value.toString().split(" ")[0];
//				else 
//				return '-';
//			}
//
//		}
//	});
//	columnsArray.push({
//		"title": "备注",
//		"field": "remark"
//	});

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());

	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");

	$.ajax({
		url: window.serviceIP + "/api/chargepack/getbatteryinventoryrecord",
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
					pageSize: 15,
					pageNumber: 1,
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
};

function batteryInventoryDetailQueryRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}

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
	// alert('t='+t+'r='+r+'f='+f);
	//获取扫描二维码信息
	recognitionQR(accept_webName, r);
	// 					var d = new Date();
	// 					var h=d.getHours(),m=d.getMinutes(),s=d.getSeconds(),ms=d.getMilliseconds();
	// 					if(h < 10){ h='0'+h; }
	// 					if(m < 10){ m='0'+m; }
	// 					if(s < 10){ s='0'+s; }
	// 					if(ms < 10){ ms='00'+ms; }
	// 					else if(ms < 100){ ms='0'+ms; }
	// 					var ts = '['+h+':'+m+':'+s+'.'+ms+']';
	// 					var li=null,hl = document.getElementById('history');
	// 					if(blist.length > 0){
	// 						li = document.createElement('li');
	// 						li.className = 'ditem';
	// 						hl.insertBefore(li, hl.childNodes[0]);
	// 					} else{
	// 						li = document.getElementById('nohistory');
	// 					}
	// 					li.id = blist.length;
	// 					var html = '['+h+':'+m+':'+s+'.'+ms+']'+'　　'+t+'码<div class="hdata">';
	// 					html += r;
	// 					html += '</div>';
	// 					li.innerHTML = html;
	// 					li.setAttribute('onclick', 'selected(id)');
	// 					blist[blist.length] = {type:t,result:r,file:f};
	// 					update(t, r, f);

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

	if(webName == 'chargingRackID')
		workLocationChangeByQR(qrCode);
}

function workLocationChangeByQR(qrCode) {
	var selected = false;

$('#workingkLocationSlct').selectpicker('val',qrCode);
$('#workingkLocationSlct').selectpicker('refresh');
		$('#workingkLocationSlct').selectpicker('render'); 
		getOnRackRecord('onRack');
 //console.log($("#workingkLocationSlct").val())
		// $('#workingkLocationSlct').selectpicker('render'); 
//$("#weatherType").selectpicker('deselectAll'); 
//	var workingkLocationSlct = $('#workingkLocationSlct').find("option");
//	console.log(qrCode + "  befor " + document.PlantToLineSelectForm.workingkLocationSlct.value.toString());
//	for(var i = 0; i < workingkLocationSlct.length; i++) {
//
//		//$(workingkLocationSlct[i]).removeAttr("selected");
//		
//		if($(workingkLocationSlct[i]).val().toString() == qrCode) {
//			
//			$(workingkLocationSlct[i]).attr("selected", "true");
//			console.log(qrCode + " new  ");
//			selected = true;
//			//break;
//		}
//	}

//	var numbersWorkingkLocationSlct = $('#worklocation').find("option"); //获取select下拉框的所有值
//	for(var j = 0; j < numbersWorkingkLocationSlct.length; j++) {
//		$(numbersWorkingkLocationSlct[j]).removeAttr("selected");
//		if($(numbersWorkingkLocationSlct[j]).val().toString() == qrCode) {
//			$(numbersWorkingkLocationSlct[j]).attr("selected", "true");
//			selected = true;
//		}
//	}
//	if(selected) {
//console.log(qrCode + "  real " + document.PlantToLineSelectForm.workingkLocationSlct.value.toString());
////		$('#worklocation').selectpicker('refresh');
////		$('#worklocation').selectpicker('render'); 
//		$('#workingkLocationSlct').selectpicker('refresh');
//		$('#workingkLocationSlct').selectpicker('render'); 
//		getOnRackRecord('onRack');
//	} else {
//		alert("未找到二维码对应的信息,请重新扫描!" + qrCode);
//	}

}
//		<!-- 模态框（Modal） -->
//		<div class="modal fade" id="myModal" role="dialog" aria-hidden="true" data-backdrop='static'>
//			<div class="modal-dialog" style="width:450px">
//				<div class="modal-content">
//					<div class="modal-header">
//						<button type="button" class="close" data-dismiss="modal">x</button>
//						<h4 class="modal-title" id="myModalLabel"> 充电架记录 </h4>
//					</div>
//					<div class="modal-body" id="modal-body" style="padding-left:20px;">
//						<form id="batteryInventoryDetailQueryForm">
//							<input type="text" id="id" name="id" style="display:none" />
//							<input type="text" id="plantid" name="plantid" style="display:none" />
//							<input type="text" id="processid" name="processid" style="display:none" />
//							<input type="text" id="staffid" name="staffid" style="display:none" />
//							<input type="text" id="materialid" name="materialid" style="display:none" />
//							<input type="text" id="repairid" name="repairid" style="display:none" />
//							<input type="text" id="pulloffstaffid" name="pulloffstaffid" style="display:none" />
//							<input type="text" id="repaircombine" name="repaircombine" style="display:none" />
//							<input type="text" id="status" name="status" style="display:none" />
//							<input type="text" id="pulloffstaffname" name="pulloffstaffname" style="display:none" />
//							<input type="text" id="pulloffdate" name="pulloffdate" style="display:none" />
//
//							<!--<label> 产线： </label>-->
//							<br />
//							<select class="selectpicker" id="lineid" style="width:100px;" name="lineid">
//							</select>
//							<br />
//							<br />
//							<!--<label for="name">充电架:</label>
//							<br />-->
//							<select class="selectpicker" id="worklocation" name="worklocation" style="width:100px;">
//							</select>
//							<br />
//							<br />
//							<!--<label for="name">产品型号:</label>
//							<br />-->
//							<select class="selectpicker" id="materialname" name="materialname" style="width:100px;">
//							</select>
//							<br />
//							<br />
//							<select class="selectpicker" id="materialtype" name="materialtype" style="width:100px;">
//								<option value=1>一等品</option>
//								<option value=2>二等品</option>
//								<option value=3>一次返充</option>
//								<option value=4>二次返充</option>
//							</select>
//							<br />
//							<br />
//							<div class="form-inline row">
//								<label for="name">上架数量:</label>
//								<input type="text" class="form-control" onkeyup="value=value.replace(/[^0-9]/g,'')" id="productionnumber" name="productionnumber" placeholder="请输入上架数量">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">上架时间:</label>
//								<input type="date" class="form-control" id="putondate" name="putondate">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">上架人员:</label>
//								<input type="text" class="form-control" id="staffname" name="staffname" placeholder="请输入上架员工">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">报修数量:</label>
//								<input type="text" class="form-control" onkeyup="value=value.replace(/[^0-9]/g,'')" id="repairnumber" name="repairnumber" placeholder="请输入报修数量">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">报修原因:</label>
//								<input type="text" class="form-control" id="reason" name="reason" placeholder="请输入报修原因">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">报修人员:</label>
//								<input type="text" class="form-control" id="repairname" name="repairname" placeholder="请输入报修人员">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">报修时间:</label>
//								<input type="date" class="form-control" id="repairtime" name="repairtime" onchange="lineWorkOrderModalChange()">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">在架实际数量:</label>
//								<input type="text" class="form-control" onkeyup="value=value.replace(/[^0-9]/g,'')" id="realnumber" name="realnumber" placeholder="请输入报修数量">
//							</div>
//							<br />
//							<div class="form-inline row">
//								<label for="name">备注:</label>
//								<input type="text" class="form-control" id="remark" name="remark" placeholder="请输入备注">
//							</div>
//							<br />
//						</form>
//					</div>
//					<div class="modal-footer">
//						<button type="button" class="btn btn-default" onclick="savebatteryInventoryDetailQueryModel()">保存 </button>
//						<button type="button" class="btn btn-default" onclick="closebatteryInventoryDetailQueryModel()">关闭 </button>
//					</div>
//				</div>
//				<!-- /.modal-content -->
//			</div>
//			<!-- /.modal -->
//		</div>