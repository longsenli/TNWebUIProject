function electricProductionShowPlantSlctFun(flag) {
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
		electricProductionShowProcessSlctFun();
	}
	
};

function electricProductionShowProcessSlctFun() {
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

function getElectricProductionPicture() {
	var endTime = new Date(document.getElementById("endTime").value);
	endTime.setDate(endTime.getDate() + 1)

	var inventoryData;
	var productionNumList = [];
	var electricNumList = [];
	var perElectricProdList = [];
	var dateStr = [];
	$.ajax({
		url: window.serviceIP + "/api/equipment/getElectricProductionRelation?plantID=" + document.PlantToLineSelectForm.industrialPlantSlct.value.toString() +
			"&processID=" + document.PlantToLineSelectForm.productionProcessSlct.value.toString() +
			"&startTime=" + document.getElementById("startTime").value +  "&endTime=" + endTime.format("yyyy-MM-dd") + " 23:00:00",
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
		dateStr.push(inventoryData[i].timeStr);
		productionNumList.push(inventoryData[i].totalProduction);
		electricNumList.push(inventoryData[i].totalElectric);
		perElectricProdList.push(inventoryData[i].prodPerElc);
	}
	var realWidth = ($("#inventoryInfoChart").width() * 0.8) / (perElectricProdList.length * 6);

	if(($(window).height() - $("#inventoryInfoChart").offset().top) < 800) {
		$("#inventoryInfoChart").height(750);
	} else {
		$("#inventoryInfoChart").height($(window).height() - $("#inventoryInfoChart").offset().top-60);
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
			data: ['产量', '电量', '每度电产量'],
			textStyle: {
				fontSize: 18,
				color: "#FFFFFF"
			}
		},
		xAxis: [{
			//type: 'category',
			data: dateStr,
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
				name: "电量",
				stack: "电量",
				type: "bar",
				barWidth: realWidth,
				data: electricNumList,
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
				name: "每度电产量",
				stack: "每度电产量",
				type: "bar",
				barWidth: realWidth,
				data: perElectricProdList,
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
}
