function queryInventoryDashboardPlantSlctFun(flag) {
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
				// $('#industrialPlantSlct').selectpicker('mobile');

				if($.cookie('plantID') != null && $.cookie('plantID') != 'undefined' && $.cookie('plantID').toString().length > 0) {
					var numbers = $('#industrialPlantSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString().split("###")[0] == $.cookie('plantID')) {
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
				// $('#productionProcessSlct').selectpicker('mobile');

				if($.cookie('processID') != null && $.cookie('processID') != 'undefined' && $.cookie('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString().split("###")[0] == $.cookie('processID')) {
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
			"&dayTime=test",
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
			"&dayTime=test",
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
	for(var i in inventoryData) {
		materialNameInventory.push(inventoryData[i].name);
		inventoryNum.push(inventoryData[i].currentNum);
		if(inventoryData[i].currentNum > maxInventory)
			maxInventory = inventoryData[i].currentNum;
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
			trigger: "axis",
		},
		polar: [{
			indicator: materialNameInventoryPolar
		}],
		calculable: true,
		legend: {
			show: false,
			orient: 'vertical', // 'vertical'
			x: 'right', // 'center' | 'left' | {number},
			y: 'top', // 'center' | 'bottom' | {number}
			//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
			data: ["实际产量", "剩余产量", "总产量"],
			textStyle: {
				fontSize: 18,
				color: "#FFFFFF"
			}
		},

		series: [{
			name: "库存配比雷达图",
			type: "radar",
			stack: "业务", //折叠显示
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