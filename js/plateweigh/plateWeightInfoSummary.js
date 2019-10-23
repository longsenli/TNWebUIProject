function industrialPlantSlctFun() {
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

			$("#plantSelect").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				//console.log(models);
				for (var  i  in  models)  {  
					$('#plantSelect').append(("<option value=" + models[i].id.toString() + ">" +
						models[i].name.toString() + "</option>").toString())
				}
				$('#plantSelect').selectpicker('refresh');
				$('#plantSelect').selectpicker('render');   
				// $('#industrialPlantSlct').selectpicker('mobile');
				if(localStorage.getItem('plantID') != null && localStorage.getItem('plantID') != 'undefined' && localStorage.getItem('plantID').toString().length > 0) {
					var numbers = $('#plantSelect').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('plantID')) {
							$(numbers[j]).attr("selected", "selected");

						}
					}
					$('#plantSelect').selectpicker('refresh');
					$('#plantSelect').selectpicker('render'); 

				}
				initBasicData();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function initBasicData() {
	$.ajax({
		url: window.serviceIP + "/api/plateweigh/getPlateWeighBasicData?plantID=" + document.getElementById("plantSelect").value,
		type: "GET",
		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		success: function(dataRes) {

			$("#weighQualifyStaff").find('option').remove();
			$("#weighQualifyMaterialType").find('option').remove();
			$("#weighBalanceID").find('option').remove();

			$('#weighQualifyStaff').append(("<option value= '-1' >全部</option>").toString());
			$('#weighQualifyMaterialType').append(("<option value= '-1' >全部</option>").toString());
			$('#weighBalanceID').append(("<option value= '-1' >全部</option>").toString());

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					if(models[i].type == "2") {
						$('#weighQualifyStaff').append(("<option value=" + models[i].name.toString() + ">" +
							models[i].name.toString() + "</option>").toString());
						continue;
					}
					if(models[i].type == "1") {
						$('#weighQualifyMaterialType').append(("<option value=" + models[i].name.toString() + ">" +
							models[i].name.toString() + "</option>").toString());
						continue;
					}
					if(models[i].type == "3") {
						$('#weighBalanceID').append(("<option value=" + models[i].name.toString() + ">" +
							models[i].name.toString() + "</option>").toString());
						continue;
					}
				}
				$('#weighQualifyMaterialType').selectpicker('refresh');
				$('#weighQualifyMaterialType').selectpicker('render'); 

				$('#weighQualifyStaff').selectpicker('refresh');
				$('#weighQualifyStaff').selectpicker('render');   

				$('#weighBalanceID').selectpicker('refresh');
				$('#weighBalanceID').selectpicker('render');  
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function getQualifiedRateInfo() {
	$('#pictureShow').hide();
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
		"title": "日期",
		"field": "dayString"
	});
	columnsArray.push({
		"title": "电子秤",
		"field": "balanceID"
	});
	columnsArray.push({
		"title": "物料型号",
		"field": "materialName"
	});

	columnsArray.push({
		"title": "责任人",
		"field": "Operator"
	});
	columnsArray.push({
		"title": "平均重量",
		"field": "avgWeight"
	});
	columnsArray.push({
		"title": "称重次数",
		"field": "weightNum"
	});
	columnsArray.push({
		"title": "合格次数",
		"field": "qualifiedNum"
	});
	columnsArray.push({
		"title": "超重次数",
		"field": "overNum"
	});

	columnsArray.push({
		"title": "低重次数",
		"field": "lowNum"
	});
	columnsArray.push({
		"title": "合格率",
		"field": "qualifiedRate"
	});

	var formData = new FormData();
	formData.append("plantID", $("#plantSelect").val());
	formData.append("balanceID", $("#weighBalanceID").val());
	formData.append("staffName", $("#weighQualifyStaff").val());
	formData.append("materialName", $("#weighQualifyMaterialType").val());
	formData.append("weighQualifyRange", $("#weighQualifyRange").val());
	formData.append("startTime", $("#startTime").val());
	formData.append("endTime", $("#endTime").val());
	$('#tableInfoShow').show();
	$.ajax({
		url: window.serviceIP + "/api/plateweigh/getQualifiedRateInfo",
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

function getPlateWeighRecord() {
	$('#pictureShow').hide();
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
		"title": "日期",
		"field": "time"
	});
	columnsArray.push({
		"title": "电子秤",
		"field": "balanceid"
	});
	columnsArray.push({
		"title": "物料型号",
		"field": "materialname"
	});

	columnsArray.push({
		"title": "责任人",
		"field": "operator"
	});
	columnsArray.push({
		"title": "重量",
		"field": "weight"
	});

	var formData = new FormData();
	formData.append("plantID", $("#plantSelect").val());
	formData.append("balanceID", $("#weighBalanceID").val());
	formData.append("staffName", $("#weighQualifyStaff").val());
	formData.append("materialName", $("#weighQualifyMaterialType").val());

	formData.append("startTime", $("#startTime").val());
	formData.append("endTime", $("#endTime").val());
	$('#tableInfoShow').show();
	$.ajax({
		url: window.serviceIP + "/api/plateweigh/getPlateWeighRecord",
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

function recordRowClick(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	if($(row).hasClass('selected')) {
		$(row).find("td").addClass('changeTableRowColor');
	}
}

function getPlateWeighRecordPicture() {
	var intervalWeigh = 6;
	$('#tableInfoShow').hide();
	$('#table').bootstrapTable('destroy');
	var formData = new FormData();
	formData.append("plantID", $("#plantSelect").val());
	formData.append("balanceID", $("#weighBalanceID").val());
	formData.append("staffName", $("#weighQualifyStaff").val());
	formData.append("materialName", $("#weighQualifyMaterialType").val());
	formData.append("startTime", $("#startTime").val());
	formData.append("endTime", $("#endTime").val());
	$('#pictureShow').show();
	var heightAll = 500;
	if($("#productionDashboardShow")) {
		if(($(window).height() - $("#leftContainer1").offset().top) < 800) {
			heightAll = 800 - 70;

		} else {
			//$("#productionDashboardShow").height($(window).height());
			heightAll = ($(window).height() - $("#report1").offset().top) - 70;
		}
	}
	$("#leftContainer1").height(heightAll + 60);
	$("#report1").height(heightAll);
	$.ajax({
		url: window.serviceIP + "/api/plateweigh/getPlateWeighRecord",
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
			if(dataRes.status != 1) { 
				alert("获取实时数据失败！" + dataRes.message);
				return;
			}
			var models = eval("(" + dataRes.data + ")");
			var xA = [];
			var yA = [];
			var minNum = 99999;
			var maxNum = 0;
			var centerValue = 0;
			var total = 0;
			var overMin = 0;
			var overMax = 0;
			var maxWeighQualifyRange = document.getElementById("weighQualifyRange").value * 1.0;
			var minWeighQualifyRange = document.getElementById("weighQualifyRange").value * (-1.0);
			for(var i in models) {

				centerValue = models[i].centerweight;
				total++;
				if(models[i].weight - centerValue > maxWeighQualifyRange) {
					overMax++;
				}
				if(models[i].weight - centerValue < minWeighQualifyRange) {
					overMin++;
				}
				xA.push(models[i].time.toString());
				yA.push(models[i].weight);
				if(maxNum < models[i].weight)
					maxNum = models[i].weight;
				if(minNum > models[i].weight)
					minNum = models[i].weight;
			}
			document.getElementById("showDetail1").innerHTML = "共称重:" + total + ",±" + maxWeighQualifyRange + "g,低于标准:" + overMin +
				",高于标准:" + overMax + ",合格:" + (total - overMax - overMin) +
				",合格率为" + Math.round(((total - overMax - overMin) * 1.0 / total) * 10000) / 100 + "%.";
			//var percent = Math.round(((total - overMax - overMin) * 1.0 / total) * 10000) / 100 + "%";

			var myChart = echarts.init(document.getElementById('report1'));
			var option = {
				title: {
					text: '称重趋势图'
				},
				tooltip: {
					trigger: 'axis'
				},
				color: ['#009393', '#ED7C30', '#80FF80', '#FF8096', '#800080'],
				legend: {
					orient: 'vertical', // 'vertical'
					x: 'right', // 'center' | 'left' | {number},
					y: 'top', // 'center' | 'bottom' | {number}
					//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
					data: ['称重趋势图']
				},
				calculable: true,
				xAxis: {
					data: xA,
					axisLabel: {
						formatter: '{value}'
					}
				},
				//				yAxis: [{
				//					type: 'value',
				//					axisLabel: {
				//						formatter: '{value} g'
				//					}
				//				}],
				yAxis: {
					min: centerValue - intervalWeigh,
					max: centerValue + intervalWeigh,
					splitNumber: 4,
					//					axisLine: {
					//						lineStyle: {
					//							color: '#dc143c'
					//						}
					//					},
					axisLabel: {
						formatter: '{value} g'
					}
				},
				series: [

					{
						itemStyle: {
							normal: {
								lineStyle: {
									color: '#009393'
								}
							}
						},
						name: '称重趋势图',
						type: 'line',
						data: yA,
						//showAllSymbol: true,

						markLine: {
							itemStyle: {
								normal: {
									borderWidth: 2,
									lineStyle: {
										type: 'solid',
										color: '#000079'
									},
									label: {
										show: true,
										position: 'end'
									}
								},
							},
							data: [{
									itemStyle: {
										normal: {
											lineStyle: {
												color: '#FF0000'
											}
										}
									},
									name: '-' + maxWeighQualifyRange + '克合格线',
									yAxis: centerValue - maxWeighQualifyRange
								},
								{
									itemStyle: {
										normal: {
											lineStyle: {
												color: '#FF0000'
											}
										}
									},
									name: '+' + maxWeighQualifyRange + '克合格线',
									yAxis: centerValue + maxWeighQualifyRange
								},
								{
									type: 'average',
									name: '平均值'
								}
							]
						}
					}
				]
			};
			myChart.setOption(option);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
}