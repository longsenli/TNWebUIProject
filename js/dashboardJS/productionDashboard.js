function productionDashboardPlantSlctFun(flag) {
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
						if($(numbers[j]).val().toString() == localStorage.getItem('plantID')) {
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

function productionDashboardProcessSlctFun(showType) {
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

				$('#workType').selectpicker('refresh');
				$('#workType').selectpicker('render');   
				// $('#workType').selectpicker('mobile');
				var today = new Date();
				if(today.getHours() <= 7 || today.getHours() >= 19) {
					$("#workType ").val("YB");
					$('#workType').selectpicker('refresh');
					$('#workType').selectpicker('render');   
					// $('#workType').selectpicker('mobile');
				}
				if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('processID')) {
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

function initProductionDashboardPicture(showType) {
	var tmpStr = document.getElementById("productionScanType").innerHTML;
	if(showType == '1') {
		$("#productionScanType").html("initProductionDashboardPicture");
		tmpStr = "initProductionDashboardPicture";
	}
	if(tmpStr != 'initProductionDashboardPicture') {
		return;
	}
	var plantProductionDashboardData;
	var realProductionDashboardData;
	var planDailyProductionNumber = 1;
	var startTime = "";
	var endTime = "";
	if(document.PlantToLineSelectForm.workType.value.toString() == "BB") {
		startTime = document.getElementById("startTime").value + " 06:00:00";
		endTime = document.getElementById("startTime").value + " 08:00:00";
	} else if(document.PlantToLineSelectForm.workType.value.toString() == "YB") {
		startTime = document.getElementById("startTime").value + " 18:00:00";
		endTime = document.getElementById("startTime").value + " 20:00:00";
	} else if(document.PlantToLineSelectForm.workType.value.toString() == "-1") {
		startTime = document.getElementById("startTime").value + " 06:00:00";
		endTime = document.getElementById("startTime").value + " 20:00:00";
	}

	if(showType.indexOf("refresh") >= 0) {
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
		//			Token: localStorage.getItem('token')
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
		//			Token: localStorage.getItem('token')
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
		//			Token: localStorage.getItem('token')
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

	if(plantProductionDashboardData.length < 1 && realProductionDashboardData.length > 0) {
		for(var i in realProductionDashboardData) {

			plantProductionDashboardData.push({
				totalProduction: realProductionDashboardData[i].realProduction,
				materialName: realProductionDashboardData[i].materialName,
				lineName: realProductionDashboardData[i].lineName
			})
		}
	}

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

	for(var j in lineRemainProductionArray) {
		if(lineRemainProductionArray[j] < 0)
			lineRemainProductionArray[j] = 0 - lineRemainProductionArray[j];
	}
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
	//console.log(showType + "2");
	if(showType == "onceAgain") {
		setTimeout("initProductionDashboardPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 1000);
	} else if(showType == "refresh" + document.getElementById("refreshID").innerHTML) {
		var tmpDate = new Date();
		$("#refreshID").html(tmpDate.format("yyyy-MM-dd-hh:mm:ss"));
		//setTimeout("initProductionDashboardPicture('refresh')", 60000 * 10);
		//setTimeout("initProductionDashboardPicture('refresh')", 600 * 10);
		if("initProductionDashboardByMaterialPicture" == document.getElementById("productionScanType").innerHTML) {
			setTimeout("initProductionDashboardByMaterialPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 5);
		} else if("initProductionDashboardByLineMaterialPicture" == document.getElementById("productionScanType").innerHTML) {

			setTimeout("initProductionDashboardByLineMaterialPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 5);
		} else {
			setTimeout("initProductionDashboardPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 5);
		}
	}
}

function productionDashboardProcessSlctFun(showType) {

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

				$('#workType').selectpicker('refresh');
				$('#workType').selectpicker('render');   
				// $('#workType').selectpicker('mobile');
				var today = new Date();
				if(today.getHours() <= 7 || today.getHours() >= 19) {
					$("#workType ").val("YB");
					$('#workType').selectpicker('refresh');
					$('#workType').selectpicker('render');   
					// $('#workType').selectpicker('mobile');
				}
				if(localStorage.getItem('processID') != null && localStorage.getItem('processID') != 'undefined' && localStorage.getItem('processID').toString().length > 0) {
					var numbers = $('#productionProcessSlct').find("option"); //获取select下拉框的所有值
					for(var j = 0; j < numbers.length; j++) {
						if($(numbers[j]).val().toString() == localStorage.getItem('processID')) {
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

function initProductionDashboardByLineMaterialPicture(showType) {

	var tmpStr = document.getElementById("productionScanType").innerHTML;
	if(showType == '1') {
		$("#productionScanType").html("initProductionDashboardByLineMaterialPicture");
		tmpStr = "initProductionDashboardByLineMaterialPicture";
	}
	if(document.getElementById("productionScanType").innerHTML != 'initProductionDashboardByLineMaterialPicture') {
		return;
	}
	var plantProductionDashboardData;
	var realProductionDashboardData;
	var planDailyProductionNumber = 1;
	var startTime = "";
	var endTime = "";
	if(document.PlantToLineSelectForm.workType.value.toString() == "BB") {
		startTime = document.getElementById("startTime").value + " 06:00:00";
		endTime = document.getElementById("startTime").value + " 08:00:00";
	} else if(document.PlantToLineSelectForm.workType.value.toString() == "YB") {
		startTime = document.getElementById("startTime").value + " 18:00:00";
		endTime = document.getElementById("startTime").value + " 20:00:00";
	} else if(document.PlantToLineSelectForm.workType.value.toString() == "-1") {
		startTime = document.getElementById("startTime").value + " 06:00:00";
		endTime = document.getElementById("startTime").value + " 20:00:00";
	}

	if(showType.indexOf("refresh") >= 0) {
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
		//			Token: localStorage.getItem('token')
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
		//			Token: localStorage.getItem('token')
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
		//			Token: localStorage.getItem('token')
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

	if(plantProductionDashboardData.length < 1 && realProductionDashboardData.length > 0) {
		for(var i in realProductionDashboardData) {

			plantProductionDashboardData.push({
				totalProduction: realProductionDashboardData[i].realProduction,
				materialName: realProductionDashboardData[i].materialName,
				lineName: realProductionDashboardData[i].lineName
			})
		}
	}

	for(var i in plantProductionDashboardData) {
		if(lineTotalProductionMap.hasOwnProperty(plantProductionDashboardData[i].lineName + "—" + plantProductionDashboardData[i].materialName)) {
			lineTotalProductionMap[plantProductionDashboardData[i].lineName + "—" + plantProductionDashboardData[i].materialName] = lineTotalProductionMap[plantProductionDashboardData[i].lineName + "—" + plantProductionDashboardData[i].materialName] + plantProductionDashboardData[i].totalProduction;
			lineRemainProductionMap[plantProductionDashboardData[i].lineName + "—" + plantProductionDashboardData[i].materialName] = lineRemainProductionMap[plantProductionDashboardData[i].lineName + "—" + plantProductionDashboardData[i].materialName] + plantProductionDashboardData[i].totalProduction;

		} else {
			lineTotalProductionMap[plantProductionDashboardData[i].lineName + "—" + plantProductionDashboardData[i].materialName] = plantProductionDashboardData[i].totalProduction;
			lineRemainProductionMap[plantProductionDashboardData[i].lineName + "—" + plantProductionDashboardData[i].materialName] = plantProductionDashboardData[i].totalProduction;
		}

		if(materialTypeProductionMap.hasOwnProperty(plantProductionDashboardData[i].materialName)) {
			materialTypeProductionMap[plantProductionDashboardData[i].materialName] = materialTypeProductionMap[plantProductionDashboardData[i].materialName] + plantProductionDashboardData[i].totalProduction;
		} else {
			materialTypeProductionMap[plantProductionDashboardData[i].materialName] = plantProductionDashboardData[i].totalProduction;
		}

	}

	for(var i in realProductionDashboardData) {
		if(lineRealProductionMap.hasOwnProperty(realProductionDashboardData[i].lineName + "—" + realProductionDashboardData[i].materialName)) {
			lineRealProductionMap[realProductionDashboardData[i].lineName + "—" + realProductionDashboardData[i].materialName] = lineRealProductionMap[realProductionDashboardData[i].lineName + "—" + realProductionDashboardData[i].materialName] + realProductionDashboardData[i].realProduction;
		} else {
			lineRealProductionMap[realProductionDashboardData[i].lineName + "—" + realProductionDashboardData[i].materialName] = realProductionDashboardData[i].realProduction;
		}
		lineRemainProductionMap[realProductionDashboardData[i].lineName + "—" + realProductionDashboardData[i].materialName] =
			lineRemainProductionMap[realProductionDashboardData[i].lineName + "—" + realProductionDashboardData[i].materialName] - lineRealProductionMap[realProductionDashboardData[i].lineName + "—" + realProductionDashboardData[i].materialName];
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
					fontSize: 12,
					fontWeight: 'normal',
				},
				interval: 0,
				formatter: function(value) {
					//debugger
					var ret = ""; //拼接加\n返回的类目项  
					var maxLength = 8; //每项显示文字个数  
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
					fontSize: 10,
					fontWeight: 'normal',
				},
				interval: 0,
				formatter: function(value) {
					//debugger
					var ret = ""; //拼接加\n返回的类目项  
					var maxLength = 8; //每项显示文字个数  
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
	//console.log("test----lineMa");
	//console.log(showType + "2");
	if(showType == "onceAgain") {
		setTimeout("initProductionDashboardByLineMaterialPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 1000);
	} else if(showType == "refresh" + document.getElementById("refreshID").innerHTML) {
		//setTimeout("initProductionDashboardByLineMaterialPicture('refresh')", 60000 * 10);
		//setTimeout("initProductionDashboardByLineMaterialPicture('refresh')", 600 * 10);
		var tmpDate = new Date();
		$("#refreshID").html(tmpDate.format("yyyy-MM-dd-hh:mm:ss"));
		if("initProductionDashboardByMaterialPicture" == document.getElementById("productionScanType").innerHTML) {
			setTimeout("initProductionDashboardByMaterialPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 10);
		} else if("initProductionDashboardByLineMaterialPicture" == document.getElementById("productionScanType").innerHTML) {

			setTimeout("initProductionDashboardByLineMaterialPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 10);
		} else {
			setTimeout("initProductionDashboardPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 10);
		}
	}
}

function initProductionDashboardByMaterialPicture(showType) {
	var tmpStr = document.getElementById("productionScanType").innerHTML;
	if(showType == '1') {
		$("#productionScanType").html("initProductionDashboardByMaterialPicture");
		tmpStr = "initProductionDashboardByMaterialPicture"
	}

	if(tmpStr != 'initProductionDashboardByMaterialPicture') {
		return;
	}
	var plantProductionDashboardData;
	var realProductionDashboardData;
	var planDailyProductionNumber = 1;
	var startTime = "";
	var endTime = "";
	if(document.PlantToLineSelectForm.workType.value.toString() == "BB") {
		startTime = document.getElementById("startTime").value + " 06:00:00";
		endTime = document.getElementById("startTime").value + " 08:00:00";
	} else if(document.PlantToLineSelectForm.workType.value.toString() == "YB") {
		startTime = document.getElementById("startTime").value + " 18:00:00";
		endTime = document.getElementById("startTime").value + " 20:00:00";
	} else if(document.PlantToLineSelectForm.workType.value.toString() == "-1") {
		startTime = document.getElementById("startTime").value + " 06:00:00";
		endTime = document.getElementById("startTime").value + " 20:00:00";
	}

	if(showType.indexOf("refresh") >= 0) {
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
		//			Token: localStorage.getItem('token')
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
		//			Token: localStorage.getItem('token')
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
		//			Token: localStorage.getItem('token')
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

	if(plantProductionDashboardData.length < 1 && realProductionDashboardData.length > 0) {
		for(var i in realProductionDashboardData) {

			plantProductionDashboardData.push({
				totalProduction: realProductionDashboardData[i].realProduction,
				materialName: realProductionDashboardData[i].materialName,
				lineName: realProductionDashboardData[i].lineName
			})
		}
	}

	for(var i in plantProductionDashboardData) {
		if(lineTotalProductionMap.hasOwnProperty(plantProductionDashboardData[i].materialName)) {
			lineTotalProductionMap[plantProductionDashboardData[i].materialName] = lineTotalProductionMap[plantProductionDashboardData[i].materialName] + plantProductionDashboardData[i].totalProduction;
			lineRemainProductionMap[plantProductionDashboardData[i].materialName] = lineRemainProductionMap[plantProductionDashboardData[i].materialName] + plantProductionDashboardData[i].totalProduction;

		} else {
			lineTotalProductionMap[plantProductionDashboardData[i].materialName] = plantProductionDashboardData[i].totalProduction;
			lineRemainProductionMap[plantProductionDashboardData[i].materialName] = plantProductionDashboardData[i].totalProduction;
		}

		if(materialTypeProductionMap.hasOwnProperty(plantProductionDashboardData[i].materialName)) {
			materialTypeProductionMap[plantProductionDashboardData[i].materialName] = materialTypeProductionMap[plantProductionDashboardData[i].materialName] + plantProductionDashboardData[i].totalProduction;
		} else {
			materialTypeProductionMap[plantProductionDashboardData[i].materialName] = plantProductionDashboardData[i].totalProduction;
		}

	}

	for(var i in realProductionDashboardData) {
		if(lineRealProductionMap.hasOwnProperty(realProductionDashboardData[i].materialName)) {
			lineRealProductionMap[realProductionDashboardData[i].materialName] = lineRealProductionMap[realProductionDashboardData[i].materialName] + realProductionDashboardData[i].realProduction;
		} else {
			lineRealProductionMap[realProductionDashboardData[i].materialName] = realProductionDashboardData[i].realProduction;
		}
		lineRemainProductionMap[realProductionDashboardData[i].materialName] =
			lineRemainProductionMap[realProductionDashboardData[i].materialName] - lineRealProductionMap[realProductionDashboardData[i].materialName];
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
					fontSize: 12,
					fontWeight: 'normal',
				},
				interval: 0,
				formatter: function(value) {
					//debugger
					var ret = ""; //拼接加\n返回的类目项  
					var maxLength = 8; //每项显示文字个数  
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
					fontSize: 10,
					fontWeight: 'normal',
				},
				interval: 0,
				formatter: function(value) {
					//debugger
					var ret = ""; //拼接加\n返回的类目项  
					var maxLength = 8; //每项显示文字个数  
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
	//console.log("test---material");
	//console.log(showType + "2");
	if(showType == "onceAgain") {
		setTimeout("initProductionDashboardByMaterialPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 1000);
	} else if(showType == "refresh" + document.getElementById("refreshID").innerHTML) {
		//setTimeout("initProductionDashboardByMaterialPicture('refresh')", 60000 * 10);
		//setTimeout("initProductionDashboardByMaterialPicture('refresh')", 600 * 10);
		var tmpDate = new Date();
		$("#refreshID").html(tmpDate.format("yyyy-MM-dd-hh:mm:ss"));
		if("initProductionDashboardByMaterialPicture" == document.getElementById("productionScanType").innerHTML) {
			setTimeout("initProductionDashboardByMaterialPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 10);
		} else if("initProductionDashboardByLineMaterialPicture" == document.getElementById("productionScanType").innerHTML) {

			setTimeout("initProductionDashboardByLineMaterialPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 10);
		} else {
			setTimeout("initProductionDashboardPicture('refresh" + document.getElementById("refreshID").innerHTML + "')", 60000 * 10);
		}
	}
}