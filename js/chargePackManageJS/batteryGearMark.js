function batteryGearMarkIndustrialPlantSlctFun() {
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
				batteryGearMarkProductionLineSlctFun();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function batteryGearMarkProductionLineSlctFun() {
	var daySelect = new Date(document.getElementById("startTime").value);
	daySelect.setDate(daySelect.getDate() - 5);

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("startTime", daySelect.format("yyyy-MM-dd"));

	$.ajax({
		url: window.serviceIP + "/api/chargepack/getbatterygearlineinfo",
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
			//$("#lineid").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionLineSlct').append(("<option value=" + models[i].id +
						">" + models[i].id + "</option>").toString());
					//					$('#lineid').append(("<option value=" + models[i].id +
					//						">" + models[i].id + "</option>").toString());
				}
				$('#productionLineSlct').selectpicker('refresh');
				$('#productionLineSlct').selectpicker('render');   
				// $('#productionLineSlct').selectpicker('mobile');

				//				$('#lineid').selectpicker('refresh');
				//				$('#lineid').selectpicker('render'); 

				//				if(localStorage.getItem('lineID') != null && localStorage.getItem('lineID') != 'undefined' && localStorage.getItem('lineID').toString().length > 0) {
				//					var numbers = $('#productionLineSlct').find("option"); //获取select下拉框的所有值
				//					for(var j = 0; j < numbers.length; j++) {
				//						if($(numbers[j]).val().toString() == localStorage.getItem('lineID')) {
				//							$(numbers[j]).attr("selected", "selected");
				//							$('#productionLineSlct').selectpicker('hide');
				//
				//							$("#productionLineLabel").css("display", "none");
				//						}
				//					}
				//					$('#productionLineSlct').selectpicker('refresh');
				//					$('#productionLineSlct').selectpicker('render'); 
				//				}

				setTimeout(function() {
					batteryGearMarkWorkingLocationSlctFun();
				}, 100);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function batteryGearMarkWorkingLocationSlctFun() {
	var daySelect = new Date(document.getElementById("startTime").value);
	daySelect.setDate(daySelect.getDate() - 5);
	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	formData.append("startTime", daySelect.format("yyyy-MM-dd"));

	$.ajax({
		url: window.serviceIP + "/api/chargepack/getbatterygearlinelocationinfo",
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
			//			$("#worklocation").find('option').remove();
			//			$('#workingkLocationSlct').append(("<option value=" + "-1" +
			//				">" + "全部" + "</option>").toString());
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
						">" + models[i].id + "</option>").toString());
					//					$('#worklocation').append(("<option value=" + models[i].id +
					//						">" + models[i].id + "</option>").toString());
				}
				$('#workingkLocationSlct').selectpicker('refresh');
				$('#workingkLocationSlct').selectpicker('render');   
				// $('#workingkLocationSlct').selectpicker('mobile');

				//				$('#worklocation').selectpicker('refresh');
				//				$('#worklocation').selectpicker('render');  
				//				if(localStorage.getItem('workingkLocation') != null && localStorage.getItem('workingkLocation') != 'undefined' && localStorage.getItem('workingkLocation').toString().length > 0) {
				//					var numbers = $('#workingkLocationSlct').find("option"); //获取select下拉框的所有值
				//					for(var j = 0; j < numbers.length; j++) {
				//						if($(numbers[j]).val().toString() == localStorage.getItem('workingkLocation')) {
				//							$(numbers[j]).attr("selected", "selected");
				//							//$('#workingkLocationSlct').selectpicker('hide');
				//							//$("#workingkLocationSlctLabel").css("display", "true");
				//						}
				//					}
				//					$('#workingkLocationSlct').selectpicker('refresh');
				//					$('#workingkLocationSlct').selectpicker('render'); 
				//				}
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function batteryGearMarkMaterialSlct() {
	//alert();
	//alert(document.planProductionManageForm.processid.value.toString());
	$.ajax({

		url: window.serviceIP + "/api/basicdata/getmaterialbyprocess?processID=" +
			document.PlantToLineSelectForm.productionProcessSlct.value.toString(),
		type: "GET",

		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		//processData: true,
		processData: false,
		contentType: false,
		async: false,
		success: function(dataRes) {

			$("#materialname").find('option').remove();

			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#materialname').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  +
						"###" + models[i].eachbatchnumber + "</option>").toString());
				}
				$('#materialname').selectpicker('refresh');
				$('#materialname').selectpicker('render');   
				// $('#materialid').selectpicker('mobile');

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	}); 
}

function getBatteryGearRecord(selectType) {


	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
//	columnsArray.push({
//		title: '序号',
//		field: 'rowNumber',
//		formatter: function(value, row, index) {
//			return index + 1;
//		}
//	});
//columnsArray.push({
//		title: '序号',
//		field: 'rowNumber'
//	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "组号",
		"field": "groupid"
	});
	columnsArray.push({
		"title": "序号",
		"field": "sequencenumbers"
	});
		columnsArray.push({
		"title": "放电电压",
		"field": "realvoltage"
	});

	columnsArray.push({
		"title": "档位",
		"field": "voltagegroup"
	});
	columnsArray.push({
		"title": "分组",
		"field": "dischargetimegroup"
	});
	columnsArray.push({
		"title": "回路",
		"field": "loopnumber"
	});
	columnsArray.push({
		"title": "放电时长",
		"field": "dischargetimestring"
	});

	var formData = new FormData();
	formData.append("plantID", document.PlantToLineSelectForm.industrialPlantSlct.value.toString());
	formData.append("lineID", document.PlantToLineSelectForm.productionLineSlct.value.toString());
	formData.append("workLocation", document.PlantToLineSelectForm.workingkLocationSlct.value.toString());
	formData.append("altitude", document.PlantToLineSelectForm.workingkLocationAltitudeSlct.value.toString());
	formData.append("startTime", document.getElementById("startTime").value.toString());

	$.ajax({
		url: window.serviceIP + "/api/chargepack/getbatterygearrecordinfo",
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
				for(var i =0; i< models.length;i++)
				{
					models[i]["rowNumber"] = i+1;
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

function batteryGearMarkRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}
var currentRowCount = 0;

function intmapstring(number)
{
	if(number == "1")
	return '一';
	if(number == "2")
	return '二';
	if(number == "3")
	return '三';
	if(number == "4")
	return '四';
	if(number == "5")
	return '五';
	if(number == "6")
	return '六';
	if(number == "7")
	return '七';
	if(number == "8")
	return '八';
	if(number == "9")
	return '九';
	if(number == "0")
	return '零';
	return number;
}
//1从头播放  2指定位置播放
function startVoiceBroadcast(type) {
	var dataTable = $('#table').bootstrapTable('getData', false);
	var selectedRow = $('#table').bootstrapTable('getSelections');
	if(currentRowCount < 0)
		currentRowCount = 0;
	if(type == '1')
	currentRowCount = 0;
	var lastLoopnumber = '';
	var speakText = '';
	for(var i = currentRowCount; i < dataTable.length; i++) {
		var speech = new SpeechSynthesisUtterance();
		//设置朗读内容和属性
		if(lastLoopnumber == dataTable[i].loopnumber) {
			//speech.text = " ,序号,  " + dataTable[i].sequencenumbers + " ,电压档位,  " ;
			speech.text =  " ,  " ;
			if(dataTable[i].voltagegroup =='-1')
			{
				speech.text += "无分组";
			}
			else
			{
				speech.text += dataTable[i].voltagegroup ; 
			}
			speech.volume = 1;
			speech.rate = $("#speekRate").val();  //0.8
			speech.pitch = 1;
			speech.lang = 'zh-CN';
		} else {
			lastLoopnumber = dataTable[i].loopnumber;
			speech.text = " ,回路, " + dataTable[i].groupid + " ,序号,  " + dataTable[i].sequencenumbers + " ,放电时长分组,  " ;
			
			if(dataTable[i].dischargetimegroup < 0)
			{
				speech.text += "无分组," + dataTable[i].dischargetimegroup+" ,电压档位,  " 
			}
			else
			{
				speech.text += dataTable[i].dischargetimegroup +" ,电压档位,  "  ; 
			}
			
			if(dataTable[i].voltagegroup =='-1')
			{
				speech.text += "无分组"
			}
			else
			{
				speech.text += dataTable[i].voltagegroup ; 
			}
			speech.volume = 1;
			speech.rate = $("#speekRate").val() - 0.2;
			speech.pitch = 1;
			speech.lang = 'zh-CN';
		}
		//console.log(speech.text);
		speech.onstart = function(event) {
			currentRowCount++;
		};
if($("#statusVoiceBroadcastLabel").html() == "continue") {
		$("#statusVoiceBroadcastLabel").html("stop");
		$("#statusVoiceBroadcastButton").html("<span class='glyphicon glyphicon-ok-circle' aria-hidden='true'></span>暂停");
	}
		window.speechSynthesis.speak(speech);
		//console.log("123123" + window.speechSynthesis);
	}
}


function stopVoiceBroadcast() {
	//$("#statusVoiceBroadcastLabel").html("continue");

	if($("#statusVoiceBroadcastLabel").html() == "stop") {
		$("#statusVoiceBroadcastButton").html("<span class='glyphicon glyphicon-ok-circle' aria-hidden='true'></span>继续");
		$("#statusVoiceBroadcastLabel").html("continue"); //encodeURIComponent()
		currentRowCount--;
		window.speechSynthesis.cancel();
	} else if($("#statusVoiceBroadcastLabel").html() == "continue") {
		$("#statusVoiceBroadcastLabel").html("stop");
		$("#statusVoiceBroadcastButton").html("<span class='glyphicon glyphicon-ok-circle' aria-hidden='true'></span>暂停");
		startVoiceBroadcast("2");
	}

}

function selectedRowBeginVoiceBroadcast() {
	var selectedRow = $('#table').bootstrapTable('getSelections');
	if(selectedRow.length != 1) {
		alert("请选定行数据!")
		return;
	}
	currentRowCount = selectedRow[0].rowNumber - 1;
	startVoiceBroadcast("2");
}