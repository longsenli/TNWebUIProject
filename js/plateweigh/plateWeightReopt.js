function addAPI() {
	window.alert("OK");
	//var queryArray = "$("#formAdd").serializeArray()";
	var queryArray = "{'str':'asdfdsf'}";
	window.alert(queryArray);

	var urlAPI = window.netServiceIP + "/api/UserInfo/changedata?str=ewrrt";
	$.ajax({
		url: urlAPI,
		type: "POST",
		dataType: "json",

		success: function(dataRes) {
			window.alert(dataRes);
			$("#detail").html('<h2>' + dataRes + '</h2>');
		}
	})
};

function postTest() {
	var str = '{"str":"fendouer"}'; //这是一个json字符串''
	var d = {};
	var t = $('#form1').serializeArray();

	$.each(t, function() {
		d[this.name] = this.value;
	});

	var urlAPI = window.netServiceIP + "/api/UserInfo/changedata";
	$.ajax({
		url: urlAPI,
		type: "post",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(d),
		//data:{str: "fendouer"		},
		success: function(dataRes) {
			window.alert(dataRes);
			$("#detail").html('<h2>' + dataRes + '</h2>');
		}
	})
};

function getWebAPI() {
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var productLine = $('#productLine option:selected').text();
	var productType = $('#productType option:selected').text();
	var urlAPI = window.netServiceIP + "/api/UserInfo/get?startTime=";
	urlAPI += startTime + "&endTime=" + endTime + "&procudtLine=" + productLine + "&productType=" + productType;
	$.ajax({
		url: urlAPI,
		type: "GET",
		dataType: "json",
		success: function(dataRes) {
			console.log($("#startTime").val() + $("#endTime").val() +
				$('#productLine option:selected').text() + $('#productType option:selected').text());
			//              $("#detail").html('<h2> '+ dataRes+' </h2>');
			var models = eval("(" + dataRes + ")");
			var xA = [];
			var yA = [];
			var minNum = 99999;
			var maxNum = 0;
			var yAF = [];
			var datares1 = [];
			var datares2 = [];
			var datares3 = [];
			var dataresF1 = [];
			var dataresF2 = [];
			var dataresF3 = [];
			var tmp1 = [];
			var tmp2;
			for(var i in models) {
				if(models[i].ProdutionLine.indexOf("负板1") > -1) {
					if(tmp1.indexOf('负板1') == -1)
						tmp1.push('负板1');
					xA.push(models[i].timehour);
					//          	yA.push(models[i].Weight.toFixed(2));
					dataresF1.push([models[i].timehour, models[i].Weight.toFixed(2)])
				} else if(models[i].ProdutionLine.indexOf("负板2") > -1) {
					if(tmp1.indexOf('负板2') == -1)
						tmp1.push('负板2');
					xA.push(models[i].timehour);
					//          	yAF.push(models[i].Weight.toFixed(2));
					dataresF2.push([models[i].timehour, models[i].Weight.toFixed(2)])
				} else if(models[i].ProdutionLine.indexOf("负板3") > -1) {
					if(tmp1.indexOf('负板3') == -1)
						tmp1.push('负板3');
					xA.push(models[i].timehour);
					//          	yAF.push(models[i].Weight.toFixed(2));
					dataresF3.push([models[i].timehour, models[i].Weight.toFixed(2)])
				} else if(models[i].ProdutionLine.indexOf("正板1") > -1) {
					if(tmp1.indexOf('正板1') == -1)
						tmp1.push('正板1');
					xA.push(models[i].timehour);
					//          	yAF.push(models[i].Weight.toFixed(2));
					datares1.push([models[i].timehour, models[i].Weight.toFixed(2)])
				} else if(models[i].ProdutionLine.indexOf("正板2") > -1) {
					if(tmp1.indexOf('正板2') == -1)
						tmp1.push('正板2');
					xA.push(models[i].timehour);
					//          	yAF.push(models[i].Weight.toFixed(2));
					datares2.push([models[i].timehour, models[i].Weight.toFixed(2)])
				} else if(models[i].ProdutionLine.indexOf("正板3") > -1) {
					if(tmp1.indexOf('正板3') == -1)
						tmp1.push('正板3');
					xA.push(models[i].timehour);
					//          	yAF.push(models[i].Weight.toFixed(2));
					datares3.push([models[i].timehour, models[i].Weight.toFixed(2)])
				}
				if(models[i].Weight > maxNum)
					maxNum = models[i].Weight;
				if(models[i].Weight < minNum)
					minNum = models[i].Weight;
			}

			var myChart = echarts.init(document.getElementById('report'));
			var option = {
				title: {
					text: '极板称重报表'
				},
				tooltip: {},
				legend: {
					orient: 'vertical', // 'vertical'
					x: 'right', // 'center' | 'left' | {number},
					y: 'top', // 'center' | 'bottom' | {number}
					//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
					data: tmp1
				},
				xAxis: {
					//					type: 'time',
					//					min:"2018-11-26",
					//					max:"2018-11-27"
					data: xA
				},
				yAxis: [{
					min: parseInt(minNum) - 1,
					max: parseInt(maxNum) + 1,
					splitNumber: parseInt((maxNum - minNum) / 10),
					axisLine: {
						lineStyle: {
							color: '#dc143c'
						}
					}
					//				},
					//				{
					//					min: 300,
					//					max: 350,
					//					splitNumber: parseInt((maxNum - minNum) / 10),
					//					axisLine: {
					//						lineStyle: {
					//							color: '#dc143c'
					//						}
					//					}
				}],
				series: [

					{
						name: '范围1',
						type: 'line',
						markLine: {
							data: [{
									yAxis: 470,
									name: '正板最小'
								},
								{
									yAxis: 480,
									name: '正板最大1'
								}, {
									yAxis: 330,
									name: '负板最小'
								}, {
									yAxis: 350,
									name: '负板最大'
								}
							],

						}
					},
					{
						name: '正板1',
						type: 'line',
						showAllSymbol: true,
						data: datares1,
						itemStyle: {
							normal: {
								label: {
									show: true
								}
							}
						}
					}, {
						name: '正板2',
						type: 'line',
						data: datares2
					}, {
						name: '正板3',
						type: 'line',
						data: datares3
					}, {
						name: '负板1',
						type: 'line',
						data: dataresF1
					}, {
						name: '负板2',
						type: 'line',
						data: dataresF2
					},
					{
						name: '负板3',
						type: 'line',
						//						yAxisIndex:1,
						// 显示数值
						//      itemStyle : { normal: {label : {show: true}}},
						data: dataresF3
					}
				]
			};
			console.log(dataresF1);
			myChart.setOption(option);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
};

function uploadFile() {
	var ofile = $("#file").get(0).files[0];
	var formData = new FormData();
	if(!ofile) {
		$.messager.alert('提示', '请上传文件!', 'info');
		return;
	}
	var size = ofile.size / 1024 / 1024;
	if(size > 5) {
		$.messager.alert('提示', '文件不能大于5M', 'info');
		return;
	}

	formData.append("file", ofile); //这个是文件，这里只是演示上传了一个文件，如果要上传多个的话将[0]去掉
	formData.append("F_ID", "123"); //这个是上传的其他参数
	formData.append("F_NAME", ofile.name);

	$.ajax({
		url: window.netServiceIP + "/api/UserInfo/Test",
		type: "POST",
		data: formData,
		cache: false, //不需要缓存
		processData: false,
		contentType: false,
		success: function(data) {
			window.alert(data);
			console.log(data)
			$.messager.alert('提示', '保存成功!', 'info');
			var ss = $.parseJSON(data);
			if(ss.MSG == 'OK') {
				$.messager.alert('提示', '保存成功!', 'info');

			}
		}
	});
};

function getWorkSum() {
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var staffName = $('#workerName option:selected').text();

	var urlAPI = window.netServiceIP + "/api/PlateWeigh/getStaffWorkSum?startTime=";
	urlAPI += startTime + "&endTime=" + endTime + "&staffName=" + staffName;
	$.ajax({
		url: urlAPI,
		type: "GET",
		dataType: "json",
		success: function(dataRes) {

			var models = eval("(" + dataRes + ")");
			var xA = [];
			var yA = [];
			var minNum = 99999;
			var maxNum = 0;

			for(var i in models) {
				xA.push(models[i].theOperator);
				yA.push(models[i].sumWeigh);
				if(maxNum < models[i].sumWeigh)
					maxNum = models[i].sumWeigh;
				if(minNum > models[i].sumWeigh)
					minNum = models[i].sumWeigh;
			}

			var myChart = echarts.init(document.getElementById('report'));
			var option = {
				title: {
					text: '工作量统计报表'
				},
				tooltip: {},
				legend: {
					orient: 'vertical', // 'vertical'
					x: 'right', // 'center' | 'left' | {number},
					y: 'top', // 'center' | 'bottom' | {number}
					//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
					data: ['工作量']
				},
				xAxis: {
					data: xA
				},
				yAxis: {
					min: parseInt(minNum) - 1,
					max: parseInt(maxNum) + 1,
					splitNumber: parseInt((maxNum - minNum) / 50),
					axisLine: {
						lineStyle: {
							color: '#dc143c'
						}
					}
				},
				series: [

					{
						name: '工作量',
						type: 'bar',
						data: yA,
						showAllSymbol: true,
						itemStyle: {
							normal: {
								label: {
									show: true
								}
							}
						},
						markLine: {
							data: [{
								type: 'average',
								name: '平均值'
							}]
						}
					}
				]
			};
			myChart.setOption(option);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
};

function addOption() {
	//根据id查找对象， 
	var obj = document.getElementById('workerName');
	obj.options.add(new Option('全部', '全部'));
	//添加一个选项 
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var urlAPI = window.netServiceIP + "/api/PlateWeigh/GetStaff?startTime=";
	urlAPI += startTime + "&endTime=" + endTime;
	$.ajax({
		url: urlAPI,
		type: "GET",
		dataType: "json",
		success: function(dataRes) {
			var models = eval("(" + dataRes + ")");
			for(var i in models) {
				obj.options.add(new Option(models[i].theOperator, models[i].theOperator));
			}
		}
	})
};

function setHidden() {
	var obj = document.getElementById('mainleft');
	var obj1 = document.getElementById('mainControlLeft');
	//	obj.style.display = (obj.style.display  == 'none') ? 'block' :'none';
	if(obj.style.display == 'none') {
		obj1.style.display = 'none';
		obj.style.display = 'block';
	} else {
		obj1.style.display = 'block';
		obj.style.display = 'none';
	}
}

function getWorkDetail() {
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var staffName = $('#workerName option:selected').text();

	var urlAPI = window.netServiceIP + "/api/PlateWeigh/getStaffWorkSum?startTime=";
	urlAPI += startTime + "&endTime=" + endTime + "&staffName=" + staffName;
	$.ajax({
		url: urlAPI,
		type: "GET",
		dataType: "json",
		success: function(dataRes) {

			var models = eval("(" + dataRes + ")");
			var xA = [];
			var yA = [];
			var minNum = 99999;
			var maxNum = 0;

			for(var i in models) {
				xA.push(models[i].theOperator);
				yA.push(models[i].sumWeigh);
				if(maxNum < models[i].sumWeigh)
					maxNum = models[i].sumWeigh;
				if(minNum > models[i].sumWeigh)
					minNum = models[i].sumWeigh;
			}

			var myChart = echarts.init(document.getElementById('report'));
			var option = {
				title: {
					text: '工作量统计报表'
				},
				tooltip: {},
				legend: {
					orient: 'vertical', // 'vertical'
					x: 'right', // 'center' | 'left' | {number},
					y: 'top', // 'center' | 'bottom' | {number}
					//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
					data: ['工作量']
				},
				xAxis: {
					data: xA
				},
				yAxis: {
					min: parseInt(minNum) - 1,
					max: parseInt(maxNum) + 1,
					splitNumber: parseInt((maxNum - minNum) / 50),
					axisLine: {
						lineStyle: {
							color: '#dc143c'
						}
					}
				},
				series: [

					{
						name: '工作量',
						type: 'bar',
						data: yA,
						showAllSymbol: true,
						itemStyle: {
							normal: {
								label: {
									show: true
								}
							}
						},
						markLine: {
							data: [{
								type: 'average',
								name: '平均值'
							}]
						}
					}
				]
			};
			myChart.setOption(option);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
};

function getWorkSummeryExcel() {

	$("#mytable tbody").html("");
	$("#mytable tr:not(:first)").empty("");

	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();

	var urlAPI = window.netServiceIP + "/api/PlateWeigh/GetStaffWorkSummery?startTime=";
	urlAPI += startTime + "&endTime=" + endTime;
	$.ajax({
		url: urlAPI,
		type: "GET",
		dataType: "json",
		success: function(dataRes) {

			var models = eval("(" + dataRes + ")");

			var c = document.getElementById('mytable'); //获得表格的信息
			var z = c.rows[0].cells; //如果不是空表，首先获得表格有多少列，先获取再插入新行
			for(var i in models) {

				var x = c.insertRow(c.rows.length);
				for(var j = 0; j < z.length; j++) { //依次向新行插入表格列数的单元格
					   
					var y = x.insertCell(j);
					if(j == 0)
						y.innerHTML = models[i].realtime; 
					if(j == 1)
						y.innerHTML = models[i].ProdutionLine; 
					if(j == 2)
						y.innerHTML = models[i].Specifications; 
					if(j == 3)
						y.innerHTML = models[i].theOperator; 
					if(j == 4)
						y.innerHTML = models[i].weightCount; 
					if(j == 5)
						y.innerHTML = models[i].avgWeight; 
					if(j == 6)
						y.innerHTML = models[i].badNumber; 
					if(j == 7)
						y.innerHTML = models[i].percentBad; 
				}
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
};

function getWeighQualifyStaff(addAll) {
	var today = new Date();
	today.setMonth(today.getMonth() - 1);

	var urlAPI = window.netServiceIP + "/api/PlateWeigh/GetStaff?startTime=";
	urlAPI += today.format("yyyy-MM-dd hh:mm:ss") + "&endTime=" + (new Date()).format("yyyy-MM-dd hh:mm:ss");
	$.ajax({
		url: urlAPI,
		type: "GET",
		dataType: "json",
		success: function(dataRes) {
			$("#weighQualifyStaff").find('option').remove();

			var models = eval("(" + dataRes + ")");
			if(addAll == 1) {
				$('#weighQualifyStaff').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString());
			}

			for (var  i  in  models)  {  
				$('#weighQualifyStaff').append(("<option value=" + models[i].theOperator.toString() + ">" + models[i].theOperator.toString()  + "</option>").toString())
			}
			$('#weighQualifyStaff').selectpicker('refresh');
			$('#weighQualifyStaff').selectpicker('render');   
			$('#weighQualifyStaff').selectpicker('mobile');
			getWeighQualifyLine(addAll);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
};

function getWeighQualifyLine(addAll) {
	var today = new Date();
	today.setMonth(today.getMonth() - 1);

	var urlAPI = window.netServiceIP + "/api/PlateWeigh/GetLine?startTime=";
	urlAPI += today.format("yyyy-MM-dd hh:mm:ss") + "&endTime=" + (new Date()).format("yyyy-MM-dd hh:mm:ss");
	$.ajax({
		url: urlAPI,
		type: "GET",
		dataType: "json",
		success: function(dataRes) {
			$("#weighQualifyLine").find('option').remove();

			var models = eval("(" + dataRes + ")");
			if(addAll == 1) {
				$('#weighQualifyLine').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString());
			}

			for (var  i  in  models)  {  
				$('#weighQualifyLine').append(("<option value=" + models[i].ProdutionLine.toString() + ">" + models[i].ProdutionLine.toString()  + "</option>").toString())
			}
			$('#weighQualifyLine').selectpicker('refresh');
			$('#weighQualifyLine').selectpicker('render');   
			$('#weighQualifyLine').selectpicker('mobile');
			getWeighQualifyType(addAll);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
};

function getWeighQualifyType(addAll) {
	var today = new Date();
	today.setMonth(today.getMonth() - 1);
	var urlAPI = window.netServiceIP + "/api/PlateWeigh/GetSpecifications?startTime=";
	urlAPI += today.format("yyyy-MM-dd hh:mm:ss") + "&endTime=" + (new Date()).format("yyyy-MM-dd hh:mm:ss");
	$.ajax({
		url: urlAPI,
		type: "GET",
		dataType: "json",
		success: function(dataRes) {
			$("#weighQualifyType").find('option').remove();

			var models = eval("(" + dataRes + ")");
			if(addAll == 1) {
				$('#weighQualifyType').append(("<option value=" + "-1" + ">" + "全部"  + "</option>").toString());
			}
			for (var  i  in  models)  {  
				$('#weighQualifyType').append(("<option value=" + models[i].Specifications.toString() + ">" + models[i].Specifications.toString()  + "</option>").toString())
			}
			$('#weighQualifyType').selectpicker('refresh');
			$('#weighQualifyType').selectpicker('render');   
			$('#weighQualifyType').selectpicker('mobile');

			$('#weighQualifyRange').selectpicker('refresh');
			$('#weighQualifyRange').selectpicker('render');   
			$('#weighQualifyRange').selectpicker('mobile');
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
};

function getWorkQualifiedRate() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "日期",
		"field": "realtime"
	});
	columnsArray.push({
		"title": "线别",
		"field": "ProdutionLine"
	});
	columnsArray.push({
		"title": "机长",
		"field": "theOperator"
	});
	columnsArray.push({
		"title": "型号",
		"field": "Specifications"
	});
	columnsArray.push({
		"title": "称重次数",
		"field": "weightCount"
	});
	columnsArray.push({
		"title": "不良次数",
		"field": "badNumber"
	});
	columnsArray.push({
		"title": "平均重量",
		"field": "avgWeight"
	});
	columnsArray.push({
		"title": $('#weighQualifyRange option:selected').text(),
		"field": "percentRes"
	});

	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();

	var urlAPI = window.netServiceIP + "/api/PlateWeigh/GetWorkQualifiedRate?startTime=";
	urlAPI += startTime + "&endTime=" + endTime + "&line=" + document.getElementById("weighQualifyLine").value +
		"&staff=" + document.getElementById("weighQualifyStaff").value +
		"&type=" + document.getElementById("weighQualifyType").value +
		"&range=" + document.getElementById("weighQualifyRange").value;
	$.ajax({
		url: urlAPI,
		type: "GET",
		dataType: "json",
		success: function(dataRes) {

			var models = eval("(" + dataRes + ")");

			$('#table').bootstrapTable('destroy').bootstrapTable({
				data: models,
				toolbar: '#toolbar1',
				singleSelect: true,
				clickToSelect: true,
				sortName: "recordTime",
				sortOrder: "desc",
				pageSize: 15,
				pageNumber: 1,
				pageList: "[10, 25, 50, 100, All]",
				//showToggle: true,
				//showRefresh: true,
				//showColumns: true,
				//search: true,
				pagination: true,
				columns: columnsArray
			});
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
};

function getStaffWeighShow() {
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();

	var urlAPI = window.netServiceIP + "/api/PlateWeigh/GetStaffWorkDetail?startTime=";
	urlAPI += startTime + "&endTime=" + endTime + "&staffName=" + document.getElementById("weighQualifyStaff").value +
		"&specifications=" + document.getElementById("weighQualifyType").value;
	$.ajax({
		url: urlAPI,
		type: "GET",
		dataType: "json",
		success: function(dataRes) {

			var models = eval("(" + dataRes + ")");
			console.log(models);
			var xA = [];
			var yA = [];
			var minNum = 99999;
			var maxNum = 0;
			var centerValue = 0;
			var total = 0;
			var overMin = 0;
			var overMax = 0;
			for(var i in models) {

				centerValue = models[i].WeightCenterValue;
				total++;
				if(models[i].Weight - centerValue > 5) {
					overMax++;
				}
				if(models[i].Weight - centerValue < -5) {
					overMin++;
				}
				xA.push(models[i].W_Time);
				yA.push(models[i].Weight);
				if(maxNum < models[i].Weight)
					maxNum = models[i].Weight;
				if(minNum > models[i].Weight)
					minNum = models[i].Weight;
			}
			document.getElementById("showDetail").innerHTML = "共称重" + total + "次,低于标准重量" + overMin + "次" +
				",高于标准重量" + overMax + ",合格次数为" + (total - overMax - overMin) + "次" +
				",合格率为" + Math.round(((total - overMax - overMin) * 1.0 / total) * 10000) / 100 + "%.";
			var myChart = echarts.init(document.getElementById('report'));
			var option = {
				title: {
					text: '个人称重趋势图'
				},
				tooltip: {
					trigger: 'axis'
				},
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
									name: '-5克合格线',
									yAxis: centerValue - 5
								},
								{
									name: '+5克合格线',
									yAxis: centerValue + 5
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
			alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
};

function getStaffWeighTimeInterval() {
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();

	var urlAPI = window.netServiceIP + "/api/PlateWeigh/GetStaffWeighInterval?startTime=";
	urlAPI += startTime + "&endTime=" + endTime + "&staffName=" + document.getElementById("weighQualifyStaff").value;
	$.ajax({
		url: urlAPI,
		type: "GET",
		dataType: "json",
		success: function(dataRes) {

			var models = eval("(" + dataRes + ")");
			console.log(models);
			var xA = [];
			var yA = [];
			var minNum = 99999;
			var maxNum = 0;

			for(var i in models) {

				xA.push(models[i].startTime1);
				yA.push(models[i].timeInterval);
				if(maxNum < models[i].timeInterval)
					maxNum = models[i].timeInterval;
				if(minNum > models[i].timeInterval)
					minNum = models[i].timeInterval;
			}
			//			document.getElementById("showDetail").innerHTML = "共称重" + total + "次,低于标准重量" + overMin + "次" +
			//				",高于标准重量" + overMax + ",合格次数为" + (total - overMax - overMin) + "次"
			var myChart = echarts.init(document.getElementById('report'));
			var option = {
				title: {
					text: '称重时间间隔趋势图'
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					orient: 'vertical', // 'vertical'
					x: 'right', // 'center' | 'left' | {number},
					y: 'top', // 'center' | 'bottom' | {number}
					//          data: ['正板1','正板2','正板3','负板1','负板2','负板3']
					data: ['称重时间间隔趋势图']
				},
				calculable: true,
				xAxis: {
					data: xA
				},
				yAxis: [{
					type: 'value',
					axisLabel: {
						formatter: '{value} s'
					}
				}],
				//				yAxis: {
				//					min: parseInt(minNum) - 1,
				//					max: parseInt(maxNum) + 1,
				//					splitNumber: parseInt((maxNum - minNum) / 5),
				//					axisLine: {
				//						lineStyle: {
				//							color: '#dc143c'
				//						}
				//					},
				//					axisLabel: {
				//						formatter: '{value} s'
				//					}
				//				},
				series: [

					{
						itemStyle: {
							normal: {
								lineStyle: {
									color: '#d3a4ff'
								}
							}
						},
						name: '称重时间间隔趋势图',
						type: 'line',
						data: yA,
						//showAllSymbol: true,

						markLine: {
							itemStyle: {
								normal: {
									borderWidth: 5,
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
								type: 'average',
								name: '平均值'
							}]
						}
					}
				]
			};
			myChart.setOption(option);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
};