function productionDashboardPlantSlctFun(flag) {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getindustrialplant",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {

			$("#industrialPlantSlct").find('option').remove();
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				$('#industrialPlantSlct').selectpicker('mobile');

				if($.cookie('plantID') != null && $.cookie('plantID') != 'undefined' && $.cookie('plantID').toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == $.cookie('plantID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#industrialPlantSlct').selectpicker('hide');

							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#industrialPlantSlct').selectpicker('refresh');
					$('#industrialPlantSlct').selectpicker('render'); 

				}
				productionDashboardProcessSlctFun();

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function productionDashboardProcessSlctFun() {
	$.ajax({
		url: window.serviceIP + "/api/basicdata/getproductionprocess",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			$("#productionProcessSlct").find('option').remove();

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				for (var  i  in  models)  {  
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				$('#productionProcessSlct').selectpicker('mobile');

				if($.cookie('processID') != null && $.cookie('processID') != 'undefined' && $.cookie('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == $.cookie('processID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionProcessSlct').selectpicker('hide');

							$("#productionProcessLabel").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 

				}

				initProductionDashboardPicture();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function initProductionDashboardPicture() {
	var plantProductionDashboardData;
	var realProductionDashboardData;

	$.ajax({
		url: window.serviceIP + "/api/order/getplanproductiondashboard?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
			"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
			"&startTime=" + document.getElementById("startTime").value +
			"&endTime=" + document.getElementById("endTime").value,
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		async: false,
		success: function(dataRes) {

			if(dataRes.status == 1) { 
				plantProductionDashboardData = eval("(" + dataRes.data + ")");

			} else {
				alert("查询订单计划失败！" + dataRes.message);
				return;
			}
		}
	});

	$.ajax({
		url: window.serviceIP + "/api/order/getrealtimeproductiondashboard?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
			"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
			"&startTime=" + document.getElementById("startTime").value +
			"&endTime=" + document.getElementById("endTime").value,
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		async: false,
		success: function(dataRes) {

			if(dataRes.status == 1) { 
				realProductionDashboardData = eval("(" + dataRes.data + ")");

			} else {
				alert("查询产量数据失败！" + dataRes.message);
				return;
			}
		}
	});
	var lineName = [];
	var lineRealProductionMap = {};
	var lineTotalProductionMap = {};
	var lineQualifiedRateMap = {};
	var lineRemainProductionMap = {};
	var materialTypeProductionMap = {};

	console.log(plantProductionDashboardData);
	for(var i in plantProductionDashboardData) {
		if(lineTotalProductionMap.hasOwnProperty(plantProductionDashboardData[i].lineName)) {
			lineTotalProductionMap[plantProductionDashboardData[i].lineName] = lineTotalProductionMap[plantProductionDashboardData[i].lineName] + plantProductionDashboardData[i].totalProduction;
		} else {
			lineTotalProductionMap[plantProductionDashboardData[i].lineName] = plantProductionDashboardData[i].totalProduction;
		}

		if(materialTypeProductionMap.hasOwnProperty(plantProductionDashboardData[i].materialName)) {
			materialTypeProductionMap[plantProductionDashboardData[i].materialName] = materialTypeProductionMap[plantProductionDashboardData[i].materialName] + plantProductionDashboardData[i].totalProduction;
		} else {
			materialTypeProductionMap[plantProductionDashboardData[i].materialName] = plantProductionDashboardData[i].totalProduction;
		}

	}
	lineRemainProductionMap = lineTotalProductionMap;
	for(var i in realProductionDashboardData) {
		if(lineRealProductionMap.hasOwnProperty(realProductionDashboardData[i].lineName)) {
			lineRealProductionMap[realProductionDashboardData[i].lineName] = lineRealProductionMap[plantProductionDashboardData[i].lineName] + realProductionDashboardData[i].realProduction;
		} else {
			lineRealProductionMap[realProductionDashboardData[i].lineName] = realProductionDashboardData[i].realProduction;
		}
		lineRemainProductionMap[realProductionDashboardData[i].lineName] = lineRemainProductionMap[realProductionDashboardData[i].lineName] - lineRealProductionMap[realProductionDashboardData[i].lineName];
	}

	var totalPlanProduction = 0;
	var totalRealProduction = 0;
	$.each(lineRealProductionMap, function(key, values) {
		totalRealProduction += values;
	});
	var lineNameArray = [];
	var lineTotalProductionArray = [];
	var lineRealProductionArray = [];
	var lineRemainProductionArray = [];
	var lineScrapArray = [];
	$.each(lineTotalProductionMap, function(key, values) {
		totalPlanProduction += values;
		lineNameArray.push(key);
		lineTotalProductionArray.push(values);
		lineScrapArray.push(((Math.random() * (10000 - 9000 + 1) + 9000) / 100).toFixed(2));

		if(lineRealProductionMap.hasOwnProperty(key)) {
			lineRealProductionArray.push(lineRealProductionMap[key]);
			lineRemainProductionArray.push(values - lineRealProductionMap[key])
		} else {
			lineRealProductionArray.push(0);
			lineRemainProductionArray.push(values);
		}
	});
	var materialTypeProductionArray = [];
	var materialTypeArray = [];
	$.each(materialTypeProductionMap, function(key, values) {
		var mapMaterial = {};
		mapMaterial["value"] = values;
		mapMaterial["name"] = key;
		materialTypeArray.push(key);

		materialTypeProductionArray.push(mapMaterial);
	});
	document.getElementById("planProduction").innerHTML = totalPlanProduction;
	document.getElementById("realProduction").innerHTML = totalRealProduction;
	document.getElementById("finishPercentage").innerHTML = (totalRealProduction / totalPlanProduction).toFixed(2);
	//产量进度条形图
	var myChartRealTimeProduction = echarts.init(document.getElementById("myChartRealTimeProduction"));
	// 指定图表的配置项和数据
	var optionRealTimeProduction = {
		title: {
			text: "生产进度图"
		},
		//鼠标触发提示数量
		tooltip: {
			trigger: "axis",
		},
		legend: {
			show: false,
			orient: 'vertical', // 'vertical'
			x: 'right', // 'center' | 'left' | {number},
			y: 'top', // 'center' | 'bottom' | {number}
			//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
			data: ["实际产量", "剩余产量", "总产量"]
		},
		//x轴显示
		xAxis: {
			data: lineNameArray,
			splitLine: {　　　　
				show: false　　
			}
		},
		//y轴显示
		yAxis: {
			splitLine: {　　　　
				show: false　　
			}
		},
		series: [{
				name: "实际产量",
				type: "bar",
				stack: "业务", //折叠显示
				data: lineRealProductionArray, //（此处的<%=zcfgData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
				barWidth: 38,
				//显示颜色
				itemStyle: {
					normal: {
						color: "#005757",
						label: {
							show: true
						}
					}
				}
			},
			{
				name: "剩余产量",
				type: "bar",
				stack: "业务",
				data: lineRemainProductionArray, //（此处的<%=jbgcData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
				barWidth: 38,
				itemStyle: {
					normal: {
						color: "#FF8849",
						label: {
							show: true
						}
					}
				}
			},

			{
				name: '总量',
				type: 'bar',
				stack: '12',
				barWidth: 1,
				//				showAllSymbol: true,

				label: {
					normal: {
						show: true,
						position: 'top',
						//formatter: "     " +  '{value}',
						formatter: function(a) {
							return "     " + a.data;
						},
						textStyle: {
							color: '#f00',
							fontSize: 16
						}
					}
				},
				itemStyle: {
					normal: {
						color: 'rgba(128, 128, 128, 0.1)',
						label: {
							show: false
						}
					}
				},
				data: lineTotalProductionArray
			}

		]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChartRealTimeProduction.setOption(optionRealTimeProduction);

	//产量进度条形图
	var myChartProductionType = echarts.init(document.getElementById("myChartProductionType"));
	// 指定图表的配置项和数据
	var optionProductionType = {
		title: {
			text: "型号产量占比图"
		},
		//鼠标触发提示数量
		tooltip: {
			trigger: "axis",
		},
		legend: {
			show: false,
			orient: 'vertical', // 'vertical'
			x: 'right', // 'center' | 'left' | {number},
			y: 'top', // 'center' | 'bottom' | {number}
			//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
			data: lineNameArray
		},
		//		xAxis: {
		//			data: lineNameArray,
		//			splitLine: {　　　　
		//				show: false　　
		//			}
		//		},
		//		//y轴显示
		//		yAxis: {
		//			splitLine: {　　　　
		//				show: false　　
		//			}
		//		},
		calculable: true,
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: ['50%', '70%'],
			itemStyle: {
				normal: {
					label: {
						show: false
					},
					labelLine: {
						show: false
					}
				},
				emphasis: {
					label: {
						show: true,
						position: 'center',
						textStyle: {
							fontSize: '30',
							fontWeight: 'bold'
						}
					}
				}
			},
			data: materialTypeProductionArray
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChartProductionType.setOption(optionProductionType);

	// 使用刚指定的配置项和数据显示图表。
	myChartRealTimeProduction.setOption(optionRealTimeProduction);

	//产量进度条形图
	var myChartProductionScrap = echarts.init(document.getElementById("myChartProductionScrap"));
	// 指定图表的配置项和数据
	var optionProductionScrap = {
		title: {
			text: "上一班次合格率"
		},
		//鼠标触发提示数量
		tooltip: {
			trigger: "axis",
		},
		legend: {
			show: false,
			orient: 'vertical', // 'vertical'
			x: 'right', // 'center' | 'left' | {number},
			y: 'top', // 'center' | 'bottom' | {number}
			//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
			data: ["合格率"]
		},
		xAxis: {
			data: lineNameArray,
			splitLine: {　　　　
				show: false　　
			}
		},
		//y轴显示
		yAxis: {
			splitLine: {　　　　
				show: false　　
			}
		},
		calculable: true,
		series: [{
			name: "合格率",
			type: "bar",
			stack: "业务",
			data: lineScrapArray, //（此处的<%=jbgcData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
			barWidth: 38,
			itemStyle: {
				normal: {
					color: "#FF8849",
					label: {
						show: true
					}
				}
			}
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChartProductionScrap.setOption(optionProductionScrap);
}