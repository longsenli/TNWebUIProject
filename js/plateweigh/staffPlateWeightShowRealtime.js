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

			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				//console.log(models);
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
				}
				$('#weighQualifyMaterialType').selectpicker('refresh');
				$('#weighQualifyMaterialType').selectpicker('render'); 

				$('#weighQualifyStaff').selectpicker('refresh');
				$('#weighQualifyStaff').selectpicker('render');   

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

var infoList = [];

function clearPicture() {
	infoList = [];
	echarts.init(document.getElementById('report1')).clear();
	document.getElementById("showDetail1").innerHTML = "";

	echarts.init(document.getElementById('report2')).clear();
	document.getElementById("showDetail2").innerHTML = "";
}

function getStaffWeighShow(showType) {
	if(showType) {
		if(showType != document.getElementById("refreshID").innerHTML) {
			return;
		}
		//console.log("refresh");
	}
	var tmpDate = new Date();
	$("#refreshID").html(tmpDate.format("yyyy-MM-dd-hh:mm:ss"));
	setTimeout("getStaffWeighShow('" + document.getElementById("refreshID").innerHTML + "')", 60000 * 2);
	var heightAll = ($(window).height() - $("#productionDashboardShow").offset().top) / document.getElementById("reportCount").value - 50;
	//var widthAll = $(window).width() - $("#productionDashboardShow").offset().left;

	var maxWeighQualifyRange = document.getElementById("weighQualifyRange").value * 1.0;
	var minWeighQualifyRange = document.getElementById("weighQualifyRange").value * (-1.0);
	if(document.getElementById("reportCount").value == 1 || infoList.length < 1 || showType) {
		if(!showType) {
			$("#report1").height(heightAll);
			infoList[0] = document.getElementById("plantSelect").value;
			infoList[1] = document.getElementById("weighQualifyStaff").value;
			infoList[2] = document.getElementById("weighQualifyMaterialType").value;
		}

		var urlAPI = window.serviceIP + "/api/plateweigh/getRealtimeRecord?plantID=";
		urlAPI += infoList[0] + "&staffName=" + infoList[1] + "&materialName=" + infoList[2];
		$.ajax({
			url: urlAPI,
			type: "GET",
			dataType: "json",
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
				for(var i in models) {

					centerValue = models[i].centerWeight;
					total++;
					if(models[i].weight - centerValue > maxWeighQualifyRange) {
						overMax++;
					}
					if(models[i].weight - centerValue < minWeighQualifyRange) {
						overMin++;
					}
					xA.push(models[i].time);
					yA.push(models[i].weight);
					if(maxNum < models[i].weight)
						maxNum = models[i].weight;
					if(minNum > models[i].weight)
						minNum = models[i].weight;
				}
				document.getElementById("showDetail1").innerHTML = "最近两小时共称重:" + total + ",±" + maxWeighQualifyRange + "g,低于标准:" + overMin +
					",高于标准:" + overMax + ",合格:" + (total - overMax - overMin) +
					",合格率为" + Math.round(((total - overMax - overMin) * 1.0 / total) * 10000) / 100 + "%.";
				//var percent = Math.round(((total - overMax - overMin) * 1.0 / total) * 10000) / 100 + "%";

				var myChart = echarts.init(document.getElementById('report1'));
				var option = {
					title: {
						text: infoList[1] +'称重趋势图'
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
						min: parseInt(minNum) - 1,
						max: parseInt(maxNum) + 1,
						splitNumber: parseInt((maxNum - minNum) / 5),
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
		if(!showType)
		return;
	}
	if(document.getElementById("reportCount").value > 1 && (infoList.length < 4 || showType )) {
		if(!showType) {
			$("#report2").height(heightAll);
			infoList[3] = document.getElementById("plantSelect").value;
			infoList[4] = document.getElementById("weighQualifyStaff").value;
			infoList[5] = document.getElementById("weighQualifyMaterialType").value;
		}
		if(showType && infoList.length < 5)
		{
			return;
		}
		var urlAPI = window.serviceIP + "/api/plateweigh/getRealtimeRecord?plantID=";
		urlAPI += infoList[3] + "&staffName=" + infoList[4] + "&materialName=" + infoList[5];
		$.ajax({
			url: urlAPI,
			type: "GET",
			dataType: "json",
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
				for(var i in models) {

					centerValue = models[i].centerWeight;
					total++;
					if(models[i].weight - centerValue > maxWeighQualifyRange) {
						overMax++;
					}
					if(models[i].weight - centerValue < minWeighQualifyRange) {
						overMin++;
					}
					xA.push(models[i].time);
					yA.push(models[i].weight);
					if(maxNum < models[i].weight)
						maxNum = models[i].weight;
					if(minNum > models[i].weight)
						minNum = models[i].weight;
				}
				document.getElementById("showDetail2").innerHTML = "最近两小时共称重:" + total + ",±" + maxWeighQualifyRange + "g,低于标准:" + overMin +
					",高于标准:" + overMax + ",合格:" + (total - overMax - overMin) +
					",合格率为" + Math.round(((total - overMax - overMin) * 1.0 / total) * 10000) / 100 + "%.";
				//var percent = Math.round(((total - overMax - overMin) * 1.0 / total) * 10000) / 100 + "%";

				var myChart = echarts.init(document.getElementById('report2'));
				var option = {
					title: {
						text: infoList[4] +'称重趋势图'
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
						data: xA
					},
					//				yAxis: [{
					//					type: 'value',
					//					axisLabel: {
					//						formatter: '{value} g'
					//					}
					//				}],
					yAxis: {
						min: parseInt(minNum) - 1,
						max: parseInt(maxNum) + 1,
						splitNumber: parseInt((maxNum - minNum) / 5),
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
										name: '-'+maxWeighQualifyRange+'克合格线',
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
										name: '+'+maxWeighQualifyRange+'克合格线',
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
		if(!showType)
		return;
	}
};