window.serviceIP = "http://192.168.1.108:8080";
window.netServiceIP = "http://192.168.1.108:8088/";
window.webUiService = "http://127.0.0.1:8020/TNWebUIProject";
//window.webUiService = "http://192.168.1.106:8081";

//设置时间格式
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month 
		"d+": this.getDate(), //day 
		"h+": this.getHours(), //hour 
		"m+": this.getMinutes(), //minute 
		"s+": this.getSeconds(), //second 
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
		"S": this.getMilliseconds() //millisecond 
	}

	if(/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for(var k in o) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}

//将form数据转为json格式
function getFormDataToJson(formDataOrign) {
	var objData = {};
	var entries = formDataOrign.entries();
	for(var entry of entries) {
		objData[entry[0]] = entry[1];
	}
	return JSON.stringify(objData);
}

//将时间字符串转换为指定格式的时间字符串
function stringToDatetimeLocalType(str, style) {
	if(str == null || str == "undefined" || str.toString().length < 5) {
		return "";
	}
	var dt = new Date(str)
	if(style == null || style.length < 2) {
		style = "yyyy-MM-ddThh:mm:ss";
	}
	return dt.format(style);
}
//判断浏览器是手机还是PC
function judgeAgentInfo() {
	var userAgentInfo = navigator.userAgent;

	var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

	var mobile_flag = false;

	//根据userAgent判断是否是手机
	for(var v = 0; v < mobileAgents.length; v++) {
		if(userAgentInfo.indexOf(mobileAgents[v]) > 0) {
			mobile_flag = true;
			break;
		}
	}
	return mobile_flag;
}

function mesgNotice(tagmsg,message,linkedURL) {
	if(window.Notification && Notification.permission !== "denied") {
		Notification.requestPermission(function(status) {
			var notice_ = new Notification('新的消息', {
				tag: tagmsg,
				body: message,
				icon: '../image/logo.jpg',
				data: {
					url: linkedURL
				}
				//requireInteraction: true
			});
			setTimeout(function() {
				n.close();
			}, 10000);
			notice_.onclick = function() { //单击消息提示框，进入浏览器页面
				window.open(notice_.data.url, '_blank');
				// notice_.close(); 
			}
		});
	}
}