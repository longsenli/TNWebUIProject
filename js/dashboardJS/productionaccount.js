function chargingRackRecordIndustrialPlantSlctFun() {
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
				if(localStorage.getItem('plantID') != null && localStorage.getItem('plantID') != 'undefined' && localStorage.getItem('plantID').toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('plantID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#industrialPlantSlct').selectpicker('hide');
							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#industrialPlantSlct').selectpicker('refresh');
					$('#industrialPlantSlct').selectpicker('render'); 

				}
				chargingRackRecordProductionProcessSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};
function chargingRackRecordProductionProcessSlctFun() {
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

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				$('#productionProcessSlct').append(("<option value='-1'>全部</option>").toString())
				for (var  i  in  models)  {  
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				// $('#productionProcessSlct').selectpicker('mobile');

				var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
//				for(var j = 0; j < numbers.length; j++) {
//					if($(numbers[j]).val().toString() == window.windowProcessEnum.CD) {
//						$(numbers[j]).attr("selected", "selected");
//						$('#productionProcessSlct').selectpicker('hide');
//
//						$("#productionProcessLabel").css("display", "none");
//					}
//				}
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render'); 

				//				if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
				//					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
				//					for(var j = 0; j < numbers.length; j++) {
				//						if($(numbers[j]).val().toString() == localStorage.getItem('processID')) {
				//							$(numbers[j]).attr("selected", "selected");
				//							$('#productionProcessSlct').selectpicker('hide');
				//
				//							$("#productionProcessLabel").css("display", "none");
				//						}
				//					}
				//					$('#productionProcessSlct').selectpicker('refresh');
				//					$('#productionProcessSlct').selectpicker('render'); 
				//
				//				}

				setTimeout(function() {
//					chargingRackRecordProductionLineSlctFun();

				}, 100);
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function chargingRackRecordProductionLineSlctFun() {

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getproductionline",
		type: "POST",
		data: formData,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			$("#productionLineSlct").find('option').remove();
			$("#lineid").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
					$('#lineid').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   
				// $('#productionLineSlct').selectpicker('mobile');

				$('#lineid').selectpicker('refresh');
				$('#lineid').selectpicker('render'); 
				$('#lineid').selectpicker('hide'); 

				if(localStorage.getItem('lineID') != null && localStorage.getItem('lineID') != 'undefined' && localStorage.getItem('lineID').toString().length > 0) {
					var numbers = $('#productionLineSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('lineID')) {
							$(numbers[j]).attr("selected", "selected");
							//$('#productionLineSlct').selectpicker('hide');

							//$("#productionLineLabel").css("display", "none");
						}
					}
					$('#productionLineSlct').selectpicker('refresh');
					$('#productionLineSlct').selectpicker('render'); 
				}

				setTimeout(function() {

					chargingRackRecordWorkingLocationSlctFun();
				}, 100);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function chargingRackRecordWorkingLocationSlctFun() {
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
//	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getworklocation",
		type: "POST",
		data: formData,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		success: function(dataRes) {

			$("#workingkLocationSlct").find('option').remove();
			$("#worklocation").find('option').remove();
			$('#workingkLocationSlct').append(("<option value=" + "-1" +
				">" + "全部" + "</option>").toString());
			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				if(models.length < 1) {
					$("#workingkLocationSlctLabel").hide(); //.css("display", "none")
					$('#workingkLocationSlct').selectpicker('hide');

				} else {
					$("#workingkLocationSlctLabel").show(); //.attr("display", "block")
					$('#workingkLocationSlct').selectpicker('show');
				}
				for (var  i  in  models)  {  
					$('#workingkLocationSlct').append(("<option value=" + models[i].id +
						">" + models[i].name + "</option>").toString());
					$('#worklocation').append(("<option value=" + models[i].id +
						">" + models[i].name + "###" + models[i].describeinfo + "</option>").toString());
				}
				$('#workingkLocationSlct').selectpicker('refresh');
				$('#workingkLocationSlct').selectpicker('render');   
				// $('#workingkLocationSlct').selectpicker('mobile');

				$('#worklocation').selectpicker('refresh');
				$('#worklocation').selectpicker('render');  

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getOnRackRecord(selectType) {
	$('#echarts_container').hide();
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
//	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
//	formData.append("locationID", document.PlantToLineSelectForm.workingkLocationSlct.value.toString());
	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");
	formData.append("selectType", selectType);
	$.ajax({
		url: window.serviceIP + "/api/dashboard/getproductAccountSummaryPlant",
//		url: "http://192.168.1.110:8080/api/dashboard/getproductAccountSummaryPlant",
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
				var columnsArray = [];
				for (var  i  in  models[0])  {
					if(i=='id'){
						continue;
					}
					if(i=='ordinal'){
						continue;
					}
					if(i=='flag'){
						continue;
					}
					columnsArray.push({
						"title": i,
						"field": i,
//						halign: "center",
//						"align": "center",
//						"valign": 'middle'
					});
				}
				$('#tableId').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
					toolbarAlign: 'left',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
//					pageSize: 15,
//					pageNumber: 1,
//					pageList: "[All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
//					search: true,
//					searchAlign: 'right',
//					pagination: true,
					//必须设置高度，否则无法固定表头
//					height:$(document).height()-170,
					columns: columnsArray,
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
					}
					//导出excel表格设置<<<<<<<<<<<<<<<<
				});
//				mergeCells(models, "厂区", 0, '#tableId')
				mergeCells1(models, "厂区", '#tableId')
				mergeCells1(models, "工序", '#tableId')
				mergeCells1(models, "班组", '#tableId')
//				mergeCells(models, "工序", 0, '#tableId')
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

function getstaffproductAccountSummaryPlant() {
	$('#echarts_container').hide();
	if(document.PlantToLineSelectForm.productionProcessSlct.value.toString()=='-1'){
		alert('工序不能为全部,请选择一个工序');return false;
	}
	
	if(!document.getElementById("startTime").value.toString().split('-')[1]==document.getElementById("endTime").value.toString().split('-')[1]){
		alert('时间范围必须为同一个月内');return false;
	}
	var formData1 = new FormData();
	formData1.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData1.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
//	formData1.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
//	formData1.append("locationID", document.PlantToLineSelectForm.workingkLocationSlct.value.toString());
	formData1.append("startTime", document.getElementById("startTime").value.toString());
	formData1.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");
	$.ajax({
		url: window.serviceIP + "/api/dashboard/getstaffproductAccountSummaryPlant",
//		url: "http://192.168.1.110:8080/api/dashboard/getstaffproductAccountSummaryPlant",
		type: "POST",
		data: formData1,
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
				var columnsArray = [];
				for (var  i  in  models[0])  {
					if(i=='id'){
						continue;
					}
					if(i=='orderflag'){
						continue;
					}
//					if(i=='班别'){
//						continue;
//					}
					columnsArray.push({
						"title": i,
						"field": i,
//						halign: "center",
//						"align": "center",
//						"valign": 'middle'
					});
				}
				$('#tableId').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
					toolbarAlign: 'left',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
//					pageSize: 15,
//					pageNumber: 1,
//					pageList: "[All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
//					search: true,
//					searchAlign: 'right',
//					pagination: true,
					//必须设置高度，否则无法固定表头
//					height:$(document).height()-170,
					columns: columnsArray,
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
					}
					//导出excel表格设置<<<<<<<<<<<<<<<<
				});

				mergeCells1(models, "厂区", '#tableId')
				mergeCells1(models, "工序", '#tableId')
				mergeCellsforName1(models, "姓名", '#tableId')

//				mergeCells(models, "工序", 0, '#tableId')
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


$('#tableId').on('load-success.bs.table', function (e,data) {
      alert(JSON.stringify(data));
});


function chargingRackRecordRowClick(row) {
	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}

/**
     * 合并行
     * @param data  原始数据（在服务端完成排序）
     * @param fieldName 合并属性名称数组
     * @param colspan 列数
     * @param target 目标表格对象
     */
function mergeCells(data, fieldName, colspan, target) {
            if (data.length == 0) {
                alert("不能传入空数据");
                return;
            }
            var numArr = [];
            var value = data[0][fieldName];
            var num = 0;
            for (var i = 0; i < data.length; i++) {
                if (value != data[i][fieldName]) {
                    numArr.push(num);
                    value = data[i][fieldName];
                    num = 1;
                    continue;
                }
                num++;
            }
            $(target).bootstrapTable('mergeCells', { index: 0, field: fieldName, colspan: colspan, rowspan: num })
            var merIndex = 0;
            for (var i = 0; i < numArr.length; i++) {
                $(target).bootstrapTable('mergeCells', { index: merIndex, field: fieldName, colspan: colspan, rowspan: num })
                merIndex += num;
            }
}


/**
* 合并列
* @param data  原始数据（在服务端完成排序）
* @param fieldName 合并属性数组
* @param target    目标表格对象
*/
function mergeColspan(data, fieldNameArr, target) {
            if (data.length == 0) {
                alert("不能传入空数据");
                return;
            }
            if (fieldNameArr.length == 0) {
                alert("请传入属性值");
                return;
            }
            var num = -1;
            var index = 0;
            for (var i = 0; i < data.length; i++) {
                num++;
                for (var v in fieldNameArr) {
                    index = 1;
                    if (data[i][fieldNameArr[v]] != data[i][fieldNameArr[0]]) {
                        index = 0;
                        break;
                    }
                }
                if (index == 0) {
                    continue;
                }
                $(target).bootstrapTable('mergeCells', { index: num, field: fieldNameArr[0], colspan: fieldNameArr.length, rowspan: 1 });
            }
}




/**
 * 合并单元格
 * 
 * @param data
 *            原始数据（在服务端完成排序）
 * @param fieldName
 *            合并属性名称
 * @param target
 *            目标表格对象
 */
function mergeCells1(data, fieldName, tableId) {
	// 声明一个map计算相同属性值在data对象出现的次数和
	var sortMap = {};
	for (var i = 0; i < data.length; i++) {
		for ( var prop in data[i]) {
			if (prop == fieldName) {
				var key = data[i][prop];
				if (sortMap.hasOwnProperty(key)) {
					sortMap[key] = sortMap[key] * 1 + 1;
				} else {
					sortMap[key] = 1;
				}
				break;
			}
		}
	}
	var index = 0;
	for ( var prop in sortMap) {
		var count = sortMap[prop] * 1;
		$(tableId).bootstrapTable('mergeCells', {
			index : index,
			field : fieldName,
			colspan : 1,
			rowspan : count
		});
		index += count;
	}
}


/**
 * 合并单元格
 * 
 * @param data
 *            原始数据（在服务端完成排序）
 * @param fieldName
 *            合并属性名称
 * @param target
 *            目标表格对象
 */
function mergeCellsforName1(data, fieldName, tableId) {
	var bai = 0;
	var ye =0 ;
	
	
	for (var i=0; i<data.length; i++ ){
		if(data[i].班别 =='白班' ){
			bai++;
		}
	}
	ye = data.length - bai;
	
	for (var i=0; i<bai; i++ ){
		// 声明一个map计算相同属性值在data对象出现的次数和
		var sortMap = {};
		for (var i = 0; i < bai; i++) {
			for ( var prop in data[i]) {
				if (prop == fieldName) {
					var key = data[i][prop];
					if (sortMap.hasOwnProperty(key)) {
						sortMap[key] = sortMap[key] * 1 + 1;
					} else {
						sortMap[key] = 1;
					}
					break;
				}
			}
		}
		var index = 0;
		for ( var prop in sortMap) {
			var count = sortMap[prop] * 1;
			$(tableId).bootstrapTable('mergeCells', {
				index : index,
				field : fieldName,
				colspan : 1,
				rowspan : count
			});
			index += count;
		}
	}
	
	for (var i=bai; i<data.length; i++ ){
		// 声明一个map计算相同属性值在data对象出现的次数和
		var sortMap = {};
		for (var i = bai; i < data.length; i++) {
			for ( var prop in data[i]) {
				if (prop == fieldName) {
					var key = data[i][prop];
					if (sortMap.hasOwnProperty(key)) {
						sortMap[key] = sortMap[key] * 1 + 1;
					} else {
						sortMap[key] = 1;
					}
					break;
				}
			}
		}
		var index = bai;
		for ( var prop in sortMap) {
			var count = sortMap[prop] * 1;
			$(tableId).bootstrapTable('mergeCells', {
				index : index,
				field : fieldName,
				colspan : 1,
				rowspan : count
			});
			index += count;
		}
	}
	
	
}

function getprocessproductAccountSummaryPlant() {
//	$('#echarts_container').hide();
	var formData1 = new FormData();
	formData1.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData1.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
//	formData1.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
//	formData1.append("locationID", document.PlantToLineSelectForm.workingkLocationSlct.value.toString());
	formData1.append("startTime", document.getElementById("startTime").value.toString());
	formData1.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");
	$.ajax({
		url: window.serviceIP + "/api/dashboard/getprocessproductAccountSummaryPlant",
//		url: "http://192.168.1.110:8080/api/dashboard/getstaffproductAccountSummaryPlant",
		type: "POST",
		data: formData1,
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
				var columnsArray = [];
				for (var  i  in  models[0])  {
					if(i=='id'){
						continue;
					}
					if(i=='orderflag'){
						continue;
					}
					if(i=='other'){
						continue;
					}
					columnsArray.push({
						"title": i,
						"field": i,
//						halign: "center",
//						"align": "center",
//						"valign": 'middle'
					});
				}
				//获取keys , 如果工序是全部则需要生成多个图表
				var colkeysArray = Object.keys(models[0]);  
				if(colkeysArray.length>=4){
					var show_chart ='';
					//循环创建多少个图表
					for(var i=0; i<((colkeysArray.length-1)/3); i++){
						//标题显示哪个工序;
						var htitle = '';
						 show_chart +='<div class="col-md-4 column"><h3 align="center">'+colkeysArray [i*3+1].substr(0,2)+'</h3><div id="show_chart'+i+'" style="height: 200px;width: 100%; display: block;"></div></div>';
					}
					
					$('#echarts_container').html(show_chart);
				}
				
				
				//创建图表
				for(var i=0; i<((colkeysArray.length-1)/3); i++){
						var wei = models[models.length-1][colkeysArray [i*3+1]];
						var shi = models[models.length-1][colkeysArray [i*3+2]];
						if(wei < 0){
							wei=0;
						}
						if(shi  < 0){
							shi=0;
						}
						var dom = document.getElementById("show_chart"+i);
						var myChart = echarts.init(dom);
						var app = {};
						option = null;
						option = {
						    series : [
						        {
						            type: 'pie',
						            radius : '55%',
						            center: ['50%', '60%'],
						            data:[
						                {value:wei, name:'未完成  '+wei},
						                {value:shi, name:'实际  '+shi},
						            ]
						        }
						    ]
						};
						if (option && typeof option === "object") {
						    myChart.setOption(option, true);
						}
						
					}
				//删除最后一条图表无用数据
				models.splice(models.length-1, 1); 
				$('#tableId').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
					toolbarAlign: 'left',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
//					pageSize: 15,
//					pageNumber: 1,
//					pageList: "[All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
//					search: true,
//					searchAlign: 'right',
//					pagination: true,
					//必须设置高度，否则无法固定表头
//					height:$(document).height()-170,
					columns: columnsArray,
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
					}
					//导出excel表格设置<<<<<<<<<<<<<<<<
				});
//				mergeCells(models, "厂区", 0, '#tableId')
				mergeCells1(models, "厂区", '#tableId')
				mergeCells1(models, "工序", '#tableId')
				mergeCells1(models, "姓名", '#tableId')
//				mergeCells(models, "工序", 0, '#tableId')
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


function getmonthproductAccountSummaryPlant() {
	$('#echarts_container').show();
	var formData1 = new FormData();
	formData1.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData1.append("processID", document.PlantToLineSelectForm.productionProcessSlct.value.toString());
//	formData1.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
//	formData1.append("locationID", document.PlantToLineSelectForm.workingkLocationSlct.value.toString());
	formData1.append("startTime", document.getElementById("startTime").value.toString());
	formData1.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");
	$.ajax({
		url: window.serviceIP + "/api/dashboard/getmonthproductAccountSummaryPlant",
//		url: "http://192.168.1.110:8080/api/dashboard/getmonthproductAccountSummaryPlant",
		type: "POST",
		data: formData1,
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
				var columnsArray = [];
				for (var  i  in  models[0])  {
					if(i=='id'){
						continue;
					}
					if(i=='orderflag'){
						continue;
					}
					
					if(i=='other'){
						continue;
					}
					columnsArray.push({
						"title": i,
						"field": i,
//						halign: "center",
//						"align": "center",
//						"valign": 'middle'
					});
				}
				
				
				
				
				var wei = models[models.length-1].计划数量;
				var shi = models[models.length-1].实际数量;
				if(wei < 0){
					wei=0;
				}
				if(shi  < 0){
					shi=0;
				}
				var dom = document.getElementById("echarts_container");
				var myChart = echarts.init(dom);
				var app = {};
				option = null;
				option = {
				    series : [
				        {
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:[
				                {value:wei, name:'未完成  '+wei},
				                {value:shi, name:'实际  '+shi},
				            ]
				        }
				    ]
				};
				if (option && typeof option === "object") {
				    myChart.setOption(option, true);
				}
				
				
				
				
				
				
				
				var dom1 = document.getElementById("echarts_container1");
				var myChart = echarts.init(dom1);
				var app1 = {};
				option1 = null;
				option1 = {
				    series : [
				        {
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:[
				                {value:wei, name:'未完成  '+wei},
				                {value:shi, name:'实际  '+shi},
				            ]
				        }
				    ]
				};
				if (option && typeof option1 === "object") {
				    myChart.setOption(option1, true);
				}
				
				
				
				
				
				
				
				
				
				
				var dom2 = document.getElementById("echarts_container2");
				var myChart = echarts.init(dom2);
				var app2 = {};
				option2 = null;
				option2 = {
				    series : [
				        {
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:[
				                {value:wei, name:'未完成  '+wei},
				                {value:shi, name:'实际  '+shi},
				            ]
				        }
				    ]
				};
				if (option && typeof option2 === "object") {
				    myChart.setOption(option2, true);
				}
				
				
				
				
				
				
				
				
				
				
				
				
//				window.onresize = myChart.resize();
				models.splice(models.length-1, 1); 
				$('#tableId').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
					toolbarAlign: 'left',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
//					pageSize: 15,
//					pageNumber: 1,
//					pageList: "[All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
//					search: true,
//					searchAlign: 'right',
//					pagination: true,
					//必须设置高度，否则无法固定表头
//					height:$(document).height()-170,
					columns: columnsArray,
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
					}
					//导出excel表格设置<<<<<<<<<<<<<<<<
				});
//				mergeCells(models, "厂区", 0, '#tableId')
				mergeCells1(models, "厂区", '#tableId')
				mergeCells1(models, "工序", '#tableId')
				mergeCells1(models, "姓名", '#tableId')
//				mergeCells(models, "工序", 0, '#tableId')
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
