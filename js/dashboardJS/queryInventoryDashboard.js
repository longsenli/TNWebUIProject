function queryInventoryDashboardPlantSlctFun(flag) {
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
				for (var  i  in  models)  {  
					$('#industrialPlantSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				$('#industrialPlantSlct').selectpicker('refresh');
				$('#industrialPlantSlct').selectpicker('render');   
				// $('#industrialPlantSlct').selectpicker('mobile');

				if(localStorage.getItem('plantID') != null && localStorage.getItem('plantID') != 'undefined' && localStorage.getItem('plantID').toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString().split("###")[0] == localStorage.getItem('plantID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#industrialPlantSlct').selectpicker('hide');

							$("#industrialPlantLabel").css("display", "none");
						}
					}
					$('#industrialPlantSlct').selectpicker('refresh');
					$('#industrialPlantSlct').selectpicker('render'); 

				}

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
	if(flag = "1") {
		queryInventoryDashboardProcessSlctFun();
	}
};

function queryInventoryDashboardProcessSlctFun() {
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
				for (var  i  in  models)  {  
					$('#productionProcessSlct').append(("<option value=" + models[i].id + ">" + models[i].name.toString()  + "</option>").toString())
				}
				//console.log($('#productionProcessSlct'));
				$('#productionProcessSlct').selectpicker('refresh');
				$('#productionProcessSlct').selectpicker('render');   
				// $('#productionProcessSlct').selectpicker('mobile');

				if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString().split("###")[0] == localStorage.getItem('processID')) {
							$(numbers[j]).attr("selected", "selected");
							$('#productionProcessSlct').selectpicker('hide');

							$("#productionProcessLabel").css("display", "none");
						}
					}
					$('#productionProcessSlct').selectpicker('refresh');
					$('#productionProcessSlct').selectpicker('render'); 

				}
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getInventoryInfo() {
	var inventoryData;
	var productionGrantData;
	$.ajax({
		url: window.serviceIP + "/api/dashboard/getinventoryinfo?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
			"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
			"&dayTime=" + document.getElementById("startTime").value,
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		async: false,
		success: function(dataRes) {

			if(dataRes.status == 1) { 
				inventoryData = eval("(" + dataRes.data + ")");

			} else {
				alert("查询库存失败！" + dataRes.message);
				return;
			}
		}
	});

	var materialNameInventory = [];
	var inventoryNum = [];
	var materialNameInventoryPolar = [];
	var maxInventory = 0;
	var intNumber = 0;

	var materialPlanExpend = [];
	var materialPlanExpendRealNum = [];
	var materialCycleTimeRealNum = [];
	
	var materialCycleTime = [];
	var materialCycleTimePolar = [];
	var maxPlan = 1;
	var maxCycleTime = 1;
	for(var i in inventoryData) {
		intNumber = parseInt(inventoryData[i].currentNum);
		materialNameInventory.push(inventoryData[i].name);
		inventoryNum.push(intNumber);

		materialPlanExpendRealNum.push(parseInt(inventoryData[i].planExpend));
		materialCycleTimeRealNum.push(parseInt(inventoryData[i].cycleTime));
		if(intNumber > maxInventory) {
			maxInventory = intNumber;
		}

		if(parseInt(inventoryData[i].planExpend) > maxPlan) {
			maxPlan = parseInt(inventoryData[i].planExpend);
		}
		if(parseInt(inventoryData[i].cycleTime) > maxCycleTime) {
			maxCycleTime = parseInt(inventoryData[i].cycleTime);
		}
	}
	

	for(var i in inventoryData) {
materialPlanExpend.push(materialPlanExpendRealNum[i] / maxPlan);
		materialCycleTime.push(materialCycleTimeRealNum[i] / maxCycleTime);
		materialNameInventoryPolar.push({
			"text": inventoryData[i].name,
			"max": maxInventory
		});
		materialCycleTimePolar.push({
			"text": inventoryData[i].name,
			"max": 1
		})
	}

	if(($(window).height() - $("#inventoryInfoChart").offset().top) < 800) {
		$("#inventoryInfoChart").height(800);
		$("#productionAndGrantInfoChart").height($("#inventoryInfoChart").height());
	} else {
		$("#inventoryInfoChart").height($(window).height() - $("#inventoryInfoChart").offset().top);
		$("#productionAndGrantInfoChart").height($("#inventoryInfoChart").height());
	}

	//产量进度条形图
	var inventoryInfoChart = echarts.init(document.getElementById("inventoryInfoChart"));
	// 指定图表的配置项和数据
	var optionInventoryInfoChart = {
		title: {
			text: "库存配比雷达图",
			textStyle: {
				fontWeight: 'bold', //标题颜色
				fontSize: '28',
				color: '#FFFFFF'
			},
		},
		//鼠标触发提示数量
		tooltip: {

		},
		radar: {
			// shape: 'circle',
			name: {
				textStyle: {
					fontSize: '14',
					color: '#fff',
					//backgroundColor: '#999',
					borderRadius: 3,
					padding: [3, 5]
				}
			},
			indicator: materialNameInventoryPolar
		},
		calculable: true,
		legend: {
			//show: true,
			orient: 'vertical', // 'vertical'
			x: 'right', // 'center' | 'left' | {number},
			y: 'top', // 'center' | 'bottom' | {number}
			//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
			data: ['剩余库存'],
			textStyle: {
				fontSize: 18,
				color: "#FFFFFF"
			}
		},
		series: [{
			name: "库存配比雷达图",
			type: "radar",
			data: [{
				value: inventoryNum,
				name: '剩余库存'
			}]
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	inventoryInfoChart.setOption(optionInventoryInfoChart);

	var cycleTimeChart = echarts.init(document.getElementById("productionAndGrantInfoChart"));
	// 指定图表的配置项和数据
	var optionCycleTimeChart = {
		title: {
			text: "库存配比雷达图",
			textStyle: {
				fontWeight: 'bold', //标题颜色
				fontSize: '28',
				color: '#FFFFFF'
			},
		},
		//鼠标触发提示数量
		tooltip: {

		},
		radar: {
			// shape: 'circle',
			name: {
				textStyle: {
					fontSize: '14',
					color: '#fff',
					//backgroundColor: '#999',
					borderRadius: 3,
					padding: [3, 5]
				}
			},
			indicator: materialCycleTimePolar
		},
		calculable: true,
		legend: {
			//show: true,
			orient: 'vertical', // 'vertical'
			x: 'right', // 'center' | 'left' | {number},
			y: 'top', // 'center' | 'bottom' | {number}
			//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
			data: ['计划消耗', '生产周期'],
			textStyle: {
				fontSize: 18,
				color: "#FFFFFF"
			}
		},
		series: [{
			name: "物料周期",
			type: "radar",
			data: [{
				value: materialPlanExpend,
				label: {
					normal: {
						show: true,
						position: 'top',
						//formatter: "     " +  '{value}',
						formatter: function(a) {
							return JSON.stringify(a) ;
						},
						textStyle: {
							color: '#1AFD9C',
							fontSize: 16
						}
					}
				},
				name: '计划消耗'
			}, {
				value: materialCycleTime,
				name: '生产周期'
			}]
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	cycleTimeChart.setOption(optionCycleTimeChart);

}

function getInventoryInfo_BAK() {
	var inventoryData;
	var productionGrantData;
	$.ajax({
		url: window.serviceIP + "/api/dashboard/getinventoryinfo?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
			"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
			"&dayTime=test",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		async: false,
		success: function(dataRes) {

			if(dataRes.status == 1) { 
				inventoryData = eval("(" + dataRes.data + ")");

			} else {
				alert("查询库存失败！" + dataRes.message);
				return;
			}
		}
	});

	$.ajax({
		url: window.serviceIP + "/api/dashboard/getproductionandgrantinfo?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
			"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
			"&dayTime=" + document.getElementById("startTime").value,
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		async: false,
		success: function(dataRes) {

			if(dataRes.status == 1) { 
				productionGrantData = eval("(" + dataRes.data + ")");

			} else {
				alert("查询库存失败！" + dataRes.message);
				return;
			}
		}
	});

	var materialNameInventory = [];
	var inventoryNum = [];
	var materialNameInventoryPolar = [];
	var maxInventory = 0;
	var intNumber = 0;
	for(var i in inventoryData) {
		intNumber = parseInt(inventoryData[i].currentNum);
		materialNameInventory.push(inventoryData[i].name);
		inventoryNum.push(intNumber);
		if(intNumber > maxInventory)
			maxInventory = intNumber;
	}
	for(var i in inventoryData) {

		materialNameInventoryPolar.push({
			"text": inventoryData[i].name,
			"max": maxInventory
		})
	}

	var productionDate = [];
	var productionMaterialName = [];
	var dayMaterialProduction = {};
	var dayMaterialGrant = {};

	for(var i in productionGrantData) {
		var dayTime = new Date(productionGrantData[i].updateTime);
		dayTime.setDate(dayTime.getDate() - 1)
		var dateStr = dayTime.format("yyyy-MM-dd");
		if($.inArray(dateStr, productionDate) == -1) {
			productionDate.push(dateStr);
		}
		if($.inArray(productionGrantData[i].name, productionMaterialName) == -1) {
			productionMaterialName.push(productionGrantData[i].name);
		}
		dayMaterialProduction[dateStr + "###" + productionGrantData[i].name] = productionGrantData[i].productionNum;
		dayMaterialGrant[dateStr + "###" + productionGrantData[i].name] = productionGrantData[i].expendNum;
	}

	var finalDataMaterialName = new Array();
	var finalDataNumber = new Array();
	for(var i in productionMaterialName) {

		finalDataMaterialName.push(productionMaterialName[i] + "产量");
		finalDataMaterialName.push(productionMaterialName[i] + "发料");
		finalDataNumber[i * 2] = new Array();
		finalDataNumber[i * 2 + 1] = new Array();

		for(var j in productionDate) {

			if(dayMaterialProduction.hasOwnProperty(productionDate[j] + "###" + productionMaterialName[i])) {
				finalDataNumber[i * 2].push(dayMaterialProduction[productionDate[j] + "###" + productionMaterialName[i]]);

			} else {
				finalDataNumber[i * 2].push(0);

			}

			if(dayMaterialGrant.hasOwnProperty(productionDate[j] + "###" + productionMaterialName[i])) {
				finalDataNumber[i * 2 + 1].push(dayMaterialGrant[productionDate[j] + "###" + productionMaterialName[i]]);

			} else {
				finalDataNumber[i * 2 + 1].push(0);

			}
		}
	}

	var productionAndGrantInfoChartData = [];
	for(var i in finalDataMaterialName) {
		productionAndGrantInfoChartData.push({
			calculable: true,
			"name": finalDataMaterialName[i],
			type: 'line',
			data: finalDataNumber[i]
		})
	}
	//	alert($(window).height()); //浏览器当前窗口可视区域高度
	//alert($(document).height()); //浏览器当前窗口文档的高度
	//alert($(document.body).height());//浏览器当前窗口文档body的高度
	//alert($(document.body).outerHeight(true));//浏览器当前窗口文档body的总高度 包括border padding margin
	//
	//alert($(window).width()); //浏览器当前窗口可视区域宽度
	//alert($(document).width());//浏览器当前窗口文档对象宽度
	//alert($(document.body).width());//浏览器当前窗口文档body的宽度
	//alert($(document.body).outerWidth(true));//浏览器当前窗口文档body的总宽度 包括border padding margin

	//alert($("#myChartRealTimeProduction").offset().top + "标签offset height : " +$("#myChartRealTimeProduction").height());

	if(($(window).height() - $("#inventoryInfoChart").offset().top) < 800) {
		$("#inventoryInfoChart").height(800);
		$("#productionAndGrantInfoChart").height($("#inventoryInfoChart").height());
	} else {
		$("#inventoryInfoChart").height($(window).height() - $("#inventoryInfoChart").offset().top);
		$("#productionAndGrantInfoChart").height($("#inventoryInfoChart").height());
	}

	//产量进度条形图
	var inventoryInfoChart = echarts.init(document.getElementById("inventoryInfoChart"));
	// 指定图表的配置项和数据
	var optionInventoryInfoChart = {
		title: {
			text: "库存配比雷达图",
			textStyle: {
				fontWeight: 'bold', //标题颜色
				fontSize: '28',
				color: '#FFFFFF'
			},
		},
		//鼠标触发提示数量
		tooltip: {

		},
		radar: {
			// shape: 'circle',
			name: {
				textStyle: {
					fontSize: '14',
					color: '#fff',
					//backgroundColor: '#999',
					borderRadius: 3,
					padding: [3, 5]
				}
			},
			indicator: materialNameInventoryPolar
		},
		calculable: true,
		legend: {
			//show: true,
			orient: 'vertical', // 'vertical'
			x: 'right', // 'center' | 'left' | {number},
			y: 'top', // 'center' | 'bottom' | {number}
			//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
			data: ['剩余库存'],
			textStyle: {
				fontSize: 18,
				color: "#FFFFFF"
			}
		},
		series: [{
			name: "库存配比雷达图",
			type: "radar",
			data: [{
				value: inventoryNum,
				name: '剩余库存'
			}]
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	inventoryInfoChart.setOption(optionInventoryInfoChart);

	//产量进度条形图
	var productionAndGrantInfoChart = echarts.init(document.getElementById("productionAndGrantInfoChart"));
	// 指定图表的配置项和数据
	var optionProductionAndGrantInfoChart = {
		title: {
			text: "生产发料变化图",
			textStyle: {
				fontWeight: 'bold', //标题颜色
				fontSize: '28',
				color: '#FFFFFF'
			}
		},
		calculable: true,
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
			data: finalDataMaterialName,
			textStyle: {
				fontSize: 14,
				color: "#FFFFFF"
			}
		},
		//x轴显示
		xAxis: {
			data: productionDate,
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
				interval: 0
			}
		},
		//y轴显示
		yAxis: {

			type: 'value',
			calculable: true,
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
		series: productionAndGrantInfoChartData
	};

	// 使用刚指定的配置项和数据显示图表。
	productionAndGrantInfoChart.setOption(optionProductionAndGrantInfoChart);

}