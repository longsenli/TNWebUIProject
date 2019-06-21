function drawRegion() {
	//获得画布元素
	var canvas1 = document.getElementById("canvas1");
	//获得2维绘图的上下文
	var ctx = canvas1.getContext("2d");

	//设置线宽
	ctx.lineWidth = 10;
	//设置线的颜色
	ctx.strokeStyle = "dodgerblue";

	//画一个空心的矩形，
	ctx.strokeRect(0, 0, 600, 600);

	//画一个实心矩形
	ctx.fillStyle = "aquamarine";
	ctx.fillRect(200, 200, 200, 200);

	//清除指定的矩形区域
	ctx.clearRect(250, 250, 100, 100);
}

function dbxDraw() {
	//获取Canvas对象(画布)
	var canvas = document.getElementById("canvas1");
	//简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
	if(canvas.getContext) {
		//获取对应的CanvasRenderingContext2D对象(画笔)
		var ctx = canvas.getContext("2d");

		//开始一个新的绘制路径
		ctx.beginPath();
		//设置线条颜色为蓝色
		ctx.strokeStyle = "blue";
		//设置路径起点坐标
		ctx.moveTo(20, 50);
		//绘制直线线段到坐标点(60, 50)
		ctx.lineTo(20, 100);
		//绘制直线线段到坐标点(60, 90)
		ctx.lineTo(70, 100);
		//先关闭绘制路径。注意，此时将会使用直线连接当前端点和起始端点。
		ctx.closePath();
		//最后，按照绘制路径画出直线
		ctx.stroke();
		ctx.fillStyle = "rgb(183,69,76)";
		ctx.fill();

		//开始一个新的绘制路径
		ctx.beginPath();
		//设置线条颜色为蓝色
		ctx.strokeStyle = "red";
		//设置路径起点坐标
		ctx.moveTo(120, 50);
		//绘制直线线段到坐标点(60, 50)
		ctx.lineTo(220, 100);
		//绘制直线线段到坐标点(60, 90)
		ctx.lineTo(170, 100);
		//先关闭绘制路径。注意，此时将会使用直线连接当前端点和起始端点。
		ctx.closePath();
		//最后，按照绘制路径画出直线
		ctx.stroke();
		ctx.fillStyle = "rgb(3,69,123)";
		ctx.fill();
	}
}

var regionMapInfo;
var locationArray = [];

function innitCavas() {

	$.ajax({
		url: window.serviceIP + "/api/safetyandep/getsalesorderdetailsst?mainRegionID=10001&startTime=" 
		+ document.getElementById("startTime").value.toString() + "&endTime=" + document.getElementById("endTime").value.toString(),
		type: "GET",
		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				regionMapInfo = models;
				var canvas = document.getElementById("canvas1");
				var heightCvs = document.getElementById("canvas1").height - 5;
				var widthCvs = document.getElementById("canvas1").width - 5;
				//简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
				if(canvas.getContext) {
					//获取对应的CanvasRenderingContext2D对象(画笔)
					var ctx = canvas.getContext("2d");
					//console.log(models);
					var tmpI = 0;
					console.log(models);
					for (var  i  in  models)  {  
						var locationSplit = models[i].shapeDrawParam.split(',');
						//开始一个新的绘制路径
						ctx.beginPath();
						//设置线条颜色为蓝色
						ctx.strokeStyle = models[i].outlineColor;
						//设置路径起点坐标
						//console.log(locationSplit[0] * widthCvs + "=======" + locationSplit[1] * heightCvs)
						ctx.moveTo(locationSplit[0] * widthCvs, locationSplit[1] * heightCvs);
						locationArray[tmpI * 4] = locationSplit[0] * widthCvs;
						locationArray[tmpI * 4 + 1] = locationSplit[1] * heightCvs;
						locationArray[tmpI * 4 + 2] = locationSplit[0] * widthCvs;
						locationArray[tmpI * 4 + 3] = locationSplit[1] * heightCvs;
						for(var j = 2; j < locationSplit.length; j += 2) {
							//绘制直线线段到坐标点(60, 50)
							//console.log(locationSplit[j] * widthCvs + "=======" + locationSplit[j + 1] * heightCvs)
							ctx.lineTo(locationSplit[j] * widthCvs, locationSplit[j + 1] * heightCvs);

							if(locationSplit[j] * widthCvs < locationArray[tmpI * 4]) {
								locationArray[tmpI * 4] = locationSplit[j] * widthCvs;
							}
							if(locationSplit[j] * widthCvs > locationArray[tmpI * 4 + 2]) {
								locationArray[tmpI * 4 + 2] = locationSplit[j] * widthCvs;
							}
							if(locationSplit[j + 1] * heightCvs < locationArray[tmpI * 4 + 1]) {
								locationArray[tmpI * 4 + 1] = locationSplit[j + 1] * heightCvs;
							}
							if(locationSplit[j + 1] * heightCvs > locationArray[tmpI * 4 + 3]) {
								locationArray[tmpI * 4 + 3] = locationSplit[j + 1] * heightCvs;
							}
						}
						ctx.lineTo(locationSplit[0] * widthCvs, locationSplit[1] * heightCvs);
						//绘制直线线段到坐标点(60, 90)
						//ctx.lineTo(70, 100);	
						//先关闭绘制路径。注意，此时将会使用直线连接当前端点和起始端点。
						//ctx.closePath();
						//最后，按照绘制路径画出直线
						ctx.stroke();
						if(models[i].dangerScore == 0) {
							ctx.fillStyle = "blue";
						} else if(models[i].dangerScore == 1) {
							ctx.fillStyle = "yellow";
						} else if(models[i].dangerScore == 2) {
							ctx.fillStyle = "sandybrown";
						} else {
							ctx.fillStyle = "red";
						}
						if(models[i].regionID == '10001')
							ctx.fillStyle = "white";
						//ctx.fillStyle = models[i].fillcolor;
						ctx.fill();
						if(models[i].regionID == '10001')
							ctx.fillStyle = "black";
						else
							ctx.fillStyle = "white";
						ctx.font = "20px Georgia";
						ctx.fillText(models[i].showName, locationSplit[0] * widthCvs + 5, locationSplit[1] * heightCvs + 30);
						tmpI++;
					}
				}

				// 监听画布
				canvas.addEventListener("mousemove", function(e) {
					// 鼠标x轴 >= 矩阵x轴 && 鼠标x轴 <= 矩阵x轴 + 矩阵宽度
					// 鼠标y轴 >= 矩阵y轴 && 鼠标y轴 <= 矩阵y轴 + 矩阵高度
					if(e.layerX >= 4 && e.layerX <= 4 && e.layerY >= 4 && e.layerY <= 4) {
						//alert("black");
					} else {
						//alert("red");
					}
				});

				canvas.addEventListener('click', function(e) {

					for(var i = 0;; i++) {
						if(regionMapInfo[i].regionID == '10001')
							continue;
						if(locationArray[i * 4] < e.layerX && locationArray[i * 4 + 2] > e.layerX && locationArray[i * 4 + 1] < e.layerY && locationArray[i * 4 + 3] > e.layerY) {
							//alert(regionMapInfo[i].regionName);	
							
								showModelTable(regionMapInfo[i].regionID);
							return;
						}
					}

				}, false)

			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function showModelTable(plantID)
{
		var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});

	columnsArray.push({
		title: '序号',
		field: 'rowNumber',
		formatter: function(value, row, index) {
			return index + 1;
		}
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});
	columnsArray.push({
		"title": "预警等级",
		"field": "dangerlevel"
	});
	columnsArray.push({
		"title": "安全隐患类型",
		"field": "hiddendangertype"
	});

	columnsArray.push({
		"title": "隐患描述",
		"field": "hiddendanger"
	});
	columnsArray.push({
		"title": "隐患图片",
		"field": "hiddendangerpicture"
	});
	columnsArray.push({
		"title": "报告人",
		"field": "reporter"
	});
	columnsArray.push({
		"title": "报告时间",
		"field": "reporttime"
	});
	columnsArray.push({
		"title": "处理方法",
		"field": "dealinfo"
	});

	columnsArray.push({
		"title": "处理照片",
		"field": "dealpicture"
	});

	columnsArray.push({
		"title": "处理人",
		"field": "dealstaff"
	});
	columnsArray.push({
		"title": "处理时间",
		"field": "dealtime"
	});
	columnsArray.push({
		"title": "备注",
		"field": "remark",
		formatter: function(value, row, index) {
			if(value == '1') {
				return '未处理';
			}
			if(value == '2') {
				return '已处理';
			}
			return '未处理';
		}
	});

	var formData = new FormData();
	formData.append("plantID", plantID);
	formData.append("selectLevel", '-1');
	formData.append("startTime", document.getElementById("startTime").value.toString());
	formData.append("endTime", document.getElementById("endTime").value.toString() + " 23:59:59");
	$.ajax({
		url: window.serviceIP + "/api/safetyandep/gethiddendangermanagerecord",
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
				for(var i = 0; i < models.length; i++) {
					models[i]["rowNumber"] = i + 1;
				}
				currentRowCount = 0;
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
				
				$("#myDealModal").modal('show');

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
