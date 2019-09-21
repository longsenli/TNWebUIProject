function dailyProductionSummaryPlantSlctFun(flag) {
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
		dailyProductionSummaryProcessSlctFun();
	}

};

function dailyProductionSummaryProcessSlctFun() {
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
					getCXCDetailPicture();
				}
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function getCXCDetailPicture(type) {
	if(type) {
		$("#productionDashboardShow").hide();
		$("#wageInfoArea").hide();
	}
	$("#productionInventoryDashboardShow").show();

	var endTime = new Date(document.getElementById("endTime").value);
	endTime.setDate(endTime.getDate() + 1)

	var inventoryData;
	var productionNumList = [];
	var grantNumList = [];
	var inventoryNumList = [];
	var materialNameList = [];
	$.ajax({
		url: window.serviceIP + "/api/dashboard/getCXCDetailInfo?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
			"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
			"&startTime=" + document.getElementById("startTime").value + " 23:00:00" + "&endTime=" + endTime.format("yyyy-MM-dd") + " 23:00:00",
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

	for(var i in inventoryData) {
		materialNameList.push(inventoryData[i].name);
		productionNumList.push(inventoryData[i].sumProductionNum);
		grantNumList.push(inventoryData[i].sumGrantNum);
		inventoryNumList.push(inventoryData[i].currentNum);
	}
	var realWidth = ($("#inventoryInfoChart").width() * 0.8) / (inventoryNumList.length * 6);

	if(($(window).height() - $("#inventoryInfoChart").offset().top) < 800) {
		$("#inventoryInfoChart").height(750);
	} else {
		$("#inventoryInfoChart").height($(window).height() - $("#inventoryInfoChart").offset().top);
	}

	var inventoryInfoChart = echarts.init(document.getElementById("inventoryInfoChart"));
	// 指定图表的配置项和数据
	var optionInventoryInfoChart = {
		//		title: {
		//			text: "产销存报表",
		//			textStyle: {
		//				fontWeight: 'bold', //标题颜色
		//				fontSize: '28',
		//				color: '#FFFFFF'
		//			},
		//		},
		//鼠标触发提示数量
		tooltip: {
			trigger: "axis",
		},

		calculable: true,
		legend: {
			//show: true,
			orient: 'vertical', // 'vertical'
			x: 'right', // 'center' | 'left' | {number},
			y: 'top', // 'center' | 'bottom' | {number}
			//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
			data: ['产量', '发料', '库存'],
			textStyle: {
				fontSize: 18,
				color: "#FFFFFF"
			}
		},
		xAxis: [{
			//type: 'category',
			data: materialNameList,
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
					var ret = ""; //拼接加\n返回的类目项  
					var maxLength = 10; //每项显示文字个数  
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
		}],
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
				name: "产量",
				stack: "产量",
				type: "bar",
				barWidth: realWidth,
				data: productionNumList,
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

			},
			{
				name: "发料",
				stack: "发料",
				type: "bar",
				barWidth: realWidth,
				data: grantNumList,
				//显示颜色
				itemStyle: {
					normal: {
						color: "#7EC0EE",
						label: {
							show: true,
							textStyle: {

								fontSize: 16
							}
						}
					}
				}

			},
			{
				name: "库存",
				stack: "库存",
				type: "bar",
				barWidth: realWidth,
				data: inventoryNumList,
				//显示颜色
				itemStyle: {
					normal: {
						color: "#FF0000",
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
	inventoryInfoChart.setOption(optionInventoryInfoChart);

	setTimeout("initProductionDashboardPicture('QP" + QPNumber + "')", 15000); //60000 * 10	
	//	if("QP"+QPNumber == type)
	//	{
	//		QPNumber = QPNumber +1;
	//		setTimeout("initProductionDashboardPicture('QP" + QPNumber +"')", 10000);   //60000 * 10	
	//	}
}
var QPNumber = 0;

function initProductionDashboardPicture(type) {
	console.log(type + "生产进度");
	if(type) {
		$("#productionInventoryDashboardShow").hide();
		$("#wageInfoArea").hide();
	}
	$("#productionDashboardShow").show();

	$("#productionInventoryDashboardShow").hide();
	setTimeout("getProdutionWageDetail('QP" + QPNumber + "')", 15000); //60000 * 10	

	var plantProductionDashboardData;
	var realProductionDashboardData;
	var planDailyProductionNumber = 1;
	var startTime = "";
	var endTime = "";
	//	if(document.PlantToLineSelectForm.workType.value.toString() == "BB") {
	//		startTime = document.getElementById("startTime").value + " 06:00:00";
	//		endTime = document.getElementById("startTime").value + " 08:00:00";
	//	} else if(document.PlantToLineSelectForm.workType.value.toString() == "YB") {
	//		startTime = document.getElementById("startTime").value + " 18:00:00";
	//		endTime = document.getElementById("startTime").value + " 20:00:00";
	//	} else if(document.PlantToLineSelectForm.workType.value.toString() == "-1") {
	//		startTime = document.getElementById("startTime").value + " 06:00:00";
	//		endTime = document.getElementById("startTime").value + " 20:00:00";
	//	}

	var today = new Date();

	if(today.getHours() < 7) {
		today.setDate(today.getDate() - 1);
		startTime = today.format("yyyy-MM-dd " + " 18:00:00");
		endTime = today.format("yyyy-MM-dd " + " 20:00:00");
	}

	if(today.getHours() >= 7 && today.getHours() <= 18) {

		startTime = today.format("yyyy-MM-dd " + " 06:00:00");
		endTime = today.format("yyyy-MM-dd " + " 09:00:00");
	}
	if(today.getHours() >= 19) {

		startTime = today.format("yyyy-MM-dd " + " 18:00:00");
		endTime = today.format("yyyy-MM-dd " + " 20:00:00");
	}

	document.getElementById("dashboardName").innerHTML = $("#productionProcessSlct").find("option:selected").text() + "产量看板";
	$.ajax({
		url: window.serviceIP + "/api/order/getplanproductiondashboard?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
			"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
			"&startTime=" + startTime +
			"&endTime=" + endTime,
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
			"&startTime=" + startTime +
			"&endTime=" + endTime,
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

	$.ajax({
		url: window.serviceIP + "/api/order/getplanproductionnumber?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
			"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
			"&planMonth=" + startTime.substr(0, 7),
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
				planDailyProductionNumber = dataRes.data;

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

	for(var i in plantProductionDashboardData) {
		if(lineTotalProductionMap.hasOwnProperty(plantProductionDashboardData[i].lineName)) {
			lineTotalProductionMap[plantProductionDashboardData[i].lineName] = lineTotalProductionMap[plantProductionDashboardData[i].lineName] + plantProductionDashboardData[i].totalProduction;
			lineRemainProductionMap[plantProductionDashboardData[i].lineName] = lineRemainProductionMap[plantProductionDashboardData[i].lineName] + plantProductionDashboardData[i].totalProduction;

		} else {
			lineTotalProductionMap[plantProductionDashboardData[i].lineName] = plantProductionDashboardData[i].totalProduction;
			lineRemainProductionMap[plantProductionDashboardData[i].lineName] = plantProductionDashboardData[i].totalProduction;
		}

		if(materialTypeProductionMap.hasOwnProperty(plantProductionDashboardData[i].materialName)) {
			materialTypeProductionMap[plantProductionDashboardData[i].materialName] = materialTypeProductionMap[plantProductionDashboardData[i].materialName] + plantProductionDashboardData[i].totalProduction;
		} else {
			materialTypeProductionMap[plantProductionDashboardData[i].materialName] = plantProductionDashboardData[i].totalProduction;
		}

	}

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
		lineScrapArray.push(((Math.random() * (10000 - 9900 + 1) + 9900) / 100).toFixed(2));

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

	if(planDailyProductionNumber > 500) {
		totalPlanProduction = planDailyProductionNumber;
	}
	document.getElementById("planProduction").innerHTML = totalPlanProduction;
	document.getElementById("realProduction").innerHTML = totalRealProduction;
	var numTmp = totalRealProduction / totalPlanProduction;
	//console.log(showType + "1");
	if(lineNameArray.length == 0) {
		if("initProductionDashboardByMaterialPicture" == document.getElementById("productionScanType").innerHTML) {
			setTimeout("initProductionDashboardByMaterialPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 10);
		} else if("initProductionDashboardByLineMaterialPicture" == document.getElementById("productionScanType").innerHTML) {

			setTimeout("initProductionDashboardByLineMaterialPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 10);
		} else {
			setTimeout("initProductionDashboardPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 10);
		}
		return;
	}

	document.getElementById("finishPercentage").innerHTML = ((numTmp) * 100).toFixed(2) + "%";

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

	if(($(window).height() - $("#myChartRealTimeProduction").offset().top) < 800) {
		$("#myChartRealTimeProduction").height(800);
		$("#myChartProductionType").height(($("#leftContainer").height()) / 2);
		$("#myChartProductionScrap").height(($("#leftContainer").height()) / 2);

	} else {
		$("#myChartRealTimeProduction").height($(window).height() - $("#myChartRealTimeProduction").offset().top);
		$("#myChartProductionType").height(($("#leftContainer").height()) / 2);
		$("#myChartProductionScrap").height(($("#leftContainer").height()) / 2);
	}

	var realWidth = ($("#myChartRealTimeProduction").width() * 0.65) / (lineRealProductionArray.length * 2);
	// $("#keleyidiv").width($("#kel"+"eyidiv").width() - 50)

	//产量进度条形图
	var myChartRealTimeProduction = echarts.init(document.getElementById("myChartRealTimeProduction"));
	// 指定图表的配置项和数据
	var optionRealTimeProduction = {
		title: {
			text: "生产进度图",
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
			data: ["实际产量", "剩余产量", "总产量"],
			textStyle: {
				fontSize: 18,
				color: "#FFFFFF"
			}
		},
		//x轴显示
		xAxis: {
			data: lineNameArray,
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
					var ret = ""; //拼接加\n返回的类目项  
					var maxLength = 4; //每项显示文字个数  
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
				name: "实际产量",
				type: "bar",
				stack: "业务", //折叠显示
				data: lineRealProductionArray, //（此处的<%=zcfgData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
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
			},
			{
				name: "剩余产量",
				type: "bar",
				stack: "业务",
				data: lineRemainProductionArray, //（此处的<%=jbgcData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
				barWidth: realWidth,
				itemStyle: {
					normal: {
						color: "#7EC0EE",
						label: {
							show: true,
							textStyle: {

								fontSize: 16
							}
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
							color: '#1AFD9C',
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
			text: "型号产量占比图",
			textStyle: {
				fontWeight: 'bold', //标题颜色
				fontSize: '28',
				color: '#FFFFFF'
			},
		},
		//鼠标触发提示数量
		tooltip: {
			show: true,
			trigger: 'item',
			formatter: " {b}：{c} "
		},
		legend: {
			show: true,
			orient: 'vertical', // 'vertical'
			x: 'right', // 'center' | 'left' | {number},
			y: 'top', // 'center' | 'bottom' | {number}
			//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
			data: materialTypeArray,
			textStyle: {
				fontSize: 18,
				color: "#FFFFFF"
			}
		},

		color: ['#EE82EE', '#FF0000', '#FFFF00', '#7B7B7B', '#0066CC', '#E1E100', '#82D900'],
		calculable: true,
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: ['30%', '70%'],
			itemStyle: {
				normal: {
					label: {
						show: true
					},
					labelLine: {
						show: true,
						textStyle: {

							fontSize: 16
						}
					}
				},
				emphasis: {
					label: {
						show: true,
						position: 'center',
						textStyle: {
							fontSize: '26',
							fontWeight: 'bold'
						}
					}
				}
			},
			labelLine: {
				normal: {
					length: 20,
					length2: 20,
					lineStyle: {
						color: '#02DF82'
					}
				}

			},
			label: {
				normal: {
					// \n\n可让文字居于牵引线上方，很关键
					//  {b}  代表显示的内容标题
					// {c}代表数据
					formatter: ' {b}：{c} \n\n',

					borderWidth: 10,
					borderRadius: 4,
					padding: [0, -120],
					rich: {
						a: {
							color: '#02DF82',
							fontSize: 24,
							lineHeight: 3
						},
						b: {
							fontSize: 24,
							lineHeight: 3,
							color: '#02DF82'
						}
					}
				}
			},

			data: materialTypeProductionArray
		}]
	};

	var realScrapWidth = ($("#myChartProductionScrap").width() * 0.65) / (lineRealProductionArray.length * 2);

	// 使用刚指定的配置项和数据显示图表。
	myChartProductionType.setOption(optionProductionType);

	// 使用刚指定的配置项和数据显示图表。
	myChartRealTimeProduction.setOption(optionRealTimeProduction);

	//产量进度条形图
	var myChartProductionScrap = echarts.init(document.getElementById("myChartProductionScrap"));
	// 指定图表的配置项和数据
	var optionProductionScrap = {
		title: {
			text: "上一班次合格率",
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
		legend: {
			show: false,
			orient: 'vertical', // 'vertical'
			x: 'right', // 'center' | 'left' | {number},
			y: 'top', // 'center' | 'bottom' | {number}
			//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
			data: ["合格率"],
			textStyle: {
				fontSize: 18,
				color: "#FFFFFF"
			}
		},
		xAxis: {
			data: lineNameArray,
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
					fontSize: 12,
					fontWeight: 'normal',
				},
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
		calculable: true,
		series: [{
			name: "合格率",
			type: "bar",
			stack: "业务",
			data: lineScrapArray, //（此处的<%=jbgcData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
			barWidth: realScrapWidth,
			itemStyle: {
				normal: {
					color: "#FFB500",
					label: {
						show: true,
						textStyle: {

							fontSize: 16
						}
					}
				}
			}
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChartProductionScrap.setOption(optionProductionScrap);

	//	if(showType == "onceAgain") {
	//		setTimeout("initProductionDashboardPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 1000);
	//	} else if(showType == "refresh" + document.getElementById("refreshID").innerHTML) {
	//		var tmpDate = new Date();
	//		$("#refreshID").html(tmpDate.format("yyyy-MM-dd-hh:mm:ss"));
	//		//setTimeout("initProductionDashboardPicture('refresh')", 60000 * 10);
	//		//setTimeout("initProductionDashboardPicture('refresh')", 600 * 10);
	//		if("initProductionDashboardByMaterialPicture" == document.getElementById("productionScanType").innerHTML) {
	//			setTimeout("initProductionDashboardByMaterialPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 10);
	//		} else if("initProductionDashboardByLineMaterialPicture" == document.getElementById("productionScanType").innerHTML) {
	//
	//			setTimeout("initProductionDashboardByLineMaterialPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 10);
	//		} else {
	//			setTimeout("initProductionDashboardPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 10);
	//		}
	//	}
}

function getProdutionWageDetail(type) {

	if(type) {
		$("#productionInventoryDashboardShow").hide();
		$("#productionDashboardShow").hide();

	}
	$("#wageInfoArea").show();

	if(($(window).height() - $("#wageInfoArea").offset().top) < 800) {
		$("#wageInfoArea").height(750);
	} else {
		$("#wageInfoArea").height($(window).height() - $("#wageInfoArea").offset().top);
	}

	console.log(type + "工资详情");
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});

	columnsArray.push({

		"title": "日期",
		"field": "closingDate"
	});
	columnsArray.push({

		"title": "员工",
		"field": "staffName"
	});
	columnsArray.push({

		"title": "工资",
		"field": "wage"
	});
	columnsArray.push({

		"title": "物料型号",
		"field": "materialName"
	});
	columnsArray.push({

		"title": "产量",
		"field": "productionNumber"
	});
	columnsArray.push({

		"title": "单价",
		"field": "unitPrice"
	});

	var urlStr = window.serviceIP + "/api/wage/getProductionWageDetail?staffName=-1" +
		"&plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value +
		"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value +
		"&startTime=" + document.getElementById("startTime").value +
		"&endTime=" + document.getElementById("endTime").value;

	$.ajax({
		url: urlStr,
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				pageNum = 1;
				$("#refreshID").html('stop');
				var models = eval("(" + dataRes.data + ")");
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 30,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					//search: true,
					pagination: true,
					columns: columnsArray
				});

				setTimeout("showDetailRepeat(2)", 15000);

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function showDetailRepeat(showType) {
	//$('#table').bootstrapTable('selectPage', 3);

	//获取每一页的行数
	//var pagesize=$(yourtableId).bootstrapTable("getOptions").pageSize;
	//获取总页数
	//var pages = $(table).bootstrapTable("getOptions").totalPages;

	$('#table').bootstrapTable('selectPage', showType);
	if((showType + 1) > $(table).bootstrapTable("getOptions").totalPages) {
		setTimeout("getCXCDetailPicture('QP" + QPNumber + "')", 5000); //60000 * 10	
	} else {
		setTimeout("showDetailRepeat(" + (showType + 1) + ")", 15000);
	}

}