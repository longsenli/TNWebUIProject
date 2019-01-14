window.serviceIP = "http://127.0.0.1:8080";
window.netServiceIP = "http://127.0.0.1:8848/TNWebUIProject";
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

function getFormDataToJson(formDataOrign) {
	var objData = {};
	var entries = formDataOrign.entries();
	for(var entry in entries) {
		objData[entry[0]] = entry[1];
	}
	return JSON.stringify(objData);
}

function stringToDatetimeLocalType(str,style){
	if(str==null || str =="undefined" || str.toString().length < 5)
	{
		return "";
	}
var dt = new Date(str)
if(style ==null || style.length < 2)
{
	style = "yyyy-MM-ddThh:mm:ss";
}
return dt.format(style);
}
