function loadXMLDoc() {
	var xmlhttp;
	if(window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		document.getElementById("detail").innerHTML = xmlhttp.status;
		if(xmlhttp.status == 200) {
			document.getElementById("detail").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", window.netServiceIP+ "/api/UserInfo/get?id=2", true);
	xmlhttp.send();
};

function changetext() {
	$("#detail").html('<h2> data + </h2>');
};

function addAPI() {
	window.alert("OK");
	//var queryArray = "$("#formAdd").serializeArray()";
	var queryArray = "{'str':'asdfdsf'}";
	window.alert(queryArray);

	var urlAPI = window.netServiceIP+ "/api/UserInfo/changedata?str=ewrrt";
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

	var urlAPI = window.netServiceIP+ "/api/UserInfo/changedata";
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
	var urlAPI = window.netServiceIP+ "/api/UserInfo/get?startTime=";
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
		url: window.netServiceIP+ "/api/UserInfo/Test",
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

	var urlAPI = window.netServiceIP+ "/api/PlateWeigh/getStaffWorkSum?startTime=";
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
	var urlAPI = window.netServiceIP+ "/api/PlateWeigh/GetStaff?startTime=";
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

	var urlAPI = window.netServiceIP+ "/api/PlateWeigh/getStaffWorkSum?startTime=";
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

	var urlAPI = window.netServiceIP+ "/api/PlateWeigh/GetStaffWorkSummery?startTime=";
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

function testCity() {

	$("#mytable tbody").html("");
	$("#mytable tr:not(:first)").empty("");

	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();

	var urlAPI = window.serviceIP+ "/api/allpeople";
	$.ajax({
		url: urlAPI,
		type: "GET",
		dataType: "json",
		success: function(dataRes) {
			console.log(dataRes);
			//var models = eval("(" + dataRes + ")");
			var models = dataRes;
			console.log(models);
			var c = document.getElementById('mytable'); //获得表格的信息
			var z = c.rows[0].cells; //如果不是空表，首先获得表格有多少列，先获取再插入新行
			for(var i in models) {

				var x = c.insertRow(c.rows.length);
				for(var j = 0; j < z.length; j++) { //依次向新行插入表格列数的单元格
					   
					var y = x.insertCell(j);
					if(j == 0)
						y.innerHTML = models[i].id; 
					if(j == 1)
						y.innerHTML = models[i].name; 
					if(j == 2)
						y.innerHTML = models[i].sex; 
					if(j == 3)
						y.innerHTML = models[i].birthday; 
				}
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
};

function loginPage() {

	var urlAPI = window.serviceIP+ "/tokentest/login?name=1&psd=1";
	$.ajax({
		url: urlAPI,
		type: "GET",
		headers: {
			Token: '12334'
		},
		dataType: "json",
		success: function(dataRes) {
			console.log(dataRes);
			//var models = eval("(" + dataRes + ")");
			
			$.cookie("token", dataRes.token)
			window.location.href = "index.html";
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
};

function testToken() {

	var urlAPI = window.serviceIP+ "/tokentest/mainpage";
	$.ajax({
		contentType: "application/json; charset=utf-8",
		headers: {
			Token: $.cookie('token')
		},
		url: urlAPI,
		type: "GET",
		dataType: "json",
		success: function(dataRes) {
			console.log(dataRes);
			//var models = eval("(" + dataRes + ")");
			　
			alert(dataRes);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + "," + textStatus + "," + errorThrown);
		}
	});
};