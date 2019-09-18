function loginSuccess(result, realIP, unselectedMenu, username, password) {

	var userInfo = "";
	if(localStorage.userListMap) {
		userInfo = localStorage.userListMap;
	}

	localStorage.clear();
	localStorage.setItem('RemoteServiceIP', realIP);
	localStorage.setItem('unselectedMenu', unselectedMenu);
	localStorage.setItem('myDefaultIP', realIP);

	//登陆成功后获取token
	var token = JSON.parse(result.token);
	token.username = result.message.split("###")[0].trim() || '';
	token.userID = username || '';
	token.roleID = result.message.split("###")[1].trim() || '';
	token.password = password || '';

	if(result.message.split("###")[2].trim() != "-1" && result.message.split("###")[2].trim() != "null" && result.message.split("###")[2].trim().length > 1) {

		token.plantID = result.message.split("###")[2].trim();
		localStorage.setItem('plantID', result.message.split("###")[2].trim());
	}
	if(result.message.split("###")[3].trim() != "-1" && result.message.split("###")[3].trim() != "null" && result.message.split("###")[3].trim().length > 1) {

		token.processID = result.message.split("###")[3].trim();

		localStorage.setItem('processID', result.message.split("###")[3].trim());
	}
	if(result.message.split("###")[4].trim() != "-1" && result.message.split("###")[4].trim() != "null" && result.message.split("###")[4].trim().length > 1) {

		token.lineID = result.message.split("###")[4].trim();

		localStorage.setItem('lineID', result.message.split("###")[4].trim());
	}
	if(result.message.split("###")[5].trim() != "-1" && result.message.split("###")[5].trim() != "null" && result.message.split("###")[5].trim().length > 1) {
		token.workingkLocation = result.message.split("###")[5].trim();

		localStorage.setItem('workingkLocation', result.message.split("###")[5].trim());
	}

	localStorage.setItem('$Global_UserLogin_Info', JSON.stringify(token));
	localStorage.setItem("LocalUserName", username);
	localStorage.setItem("LocalUserPsw", password);

	localStorage.setItem('token', result.token);
	localStorage.setItem('username', result.message.split("###")[0].trim());
	localStorage.setItem('userID', username);
	localStorage.setItem('roleID', result.message.split("###")[1].trim());
	localStorage.setItem('password', password);

	if(userInfo.indexOf(username) < 0 && $('#savePSWCheck').is(':checked')) {
		if(userInfo.length > 2) {
			userInfo += "###";
		} 
		userInfo = userInfo + username + "###" + password;
	}

	localStorage.userListMap = userInfo;
	//
	//if(!localStorage.userListMap.hasOwnProperty(username))
	//{
	//	localStorage.userListMap[username] = password;
	//	console.log(username + "===" +localStorage.userListMap[username] + "==12==" + localStorage.userListMap.length);
	//}  
	//else{ 
	//	console.log(localStorage.userListMap[username] + "234")
	//}
	window.location.href = "app_productionIndex.html";

}

function initUserInfo() {
	$('ul li').remove();
	if(localStorage.userListMap) {
		//localStorage.userListMap = '';
		//console.log(localStorage.userListMap);
		var userList = localStorage.userListMap.split("###");

		//获取到Ul列表
		var ul = document.getElementById("userList");

		var liStr = "";
		for(var i = 0; i < userList.length; i += 2) {
			//alert(userList.length + "=====" + userList[0]);
			//<span class="glyphicon glyphicon-zoom-in" onclick="showUserList()" style="width:10%;height: 45px;display: inline;"  aria-hidden="true"></span>
			//liStr += "<li id='" + userList[i] + "' onclick='userSelected()'>" + userList[i] + "</li>";
			//'<span class="glyphicon glyphicon-zoom-in" onclick="userInfoshow()" style="width:10%;height: 45px;display: inline;"  aria-hidden="true"></span>' + "</li>";
			//创建元素Li
			var li = document.createElement("li");
			//向li中添加内容
			li.innerHTML = "<li id='" + userList[i] + "' onclick='userSelected()' style='font-size:40px'>" + userList[i] +"  &nbsp; &nbsp; "+
				'<span id = "' + userList[i] + '" class="glyphicon glyphicon-erase" onclick="deleteUserInfo()" style="width:10%;height: 20px;display: inline;"  aria-hidden="true"></span>' + "</li>";

			//向ul追加元素li
			ul.appendChild(li); 

			//						$('#userList').append(("<option value=" + userList[i+1] + ">" +
			//								userList[i] + "</option>").toString())
		}

		//ul.appendChild(liStr);
		//					console.log(localStorage.userListMap["test"] + "==");
		//					$.each(localStorage.userListMap, function(key, values) {
		//						console.log(key + "===" + values);
		//							$('#userList').append(("<option value=" + key + ">" +
		//								values + "</option>").toString())
		//					});
	}

}

function showUserList() {
	if(localStorage.userListMap.length < 3)
	return;
	$("#userListModal").modal('show');
}

function hideUserList() {
	$("#userListModal").modal('hide');

}
var deleteUserBt = false;

function deleteUserInfo() {
	
	deleteUserBt = true;
	var userList = localStorage.userListMap.split("###");

	var userInfo = "";
	for(var i = 0; i < userList.length; i += 2) {
		if(userList[i] == event.target.id) {
			continue;
		}
		if(userInfo.length > 2) {
			userInfo += "###";
		}
		userInfo += userList[i] + "###" + userList[i + 1];
	}
	localStorage.userListMap = userInfo;
	initUserInfo();

}

function userSelected() {
	if(deleteUserBt) {
		deleteUserBt = false;
		return;
	}
	deleteUserBt = false;
	var userList = localStorage.userListMap.split("###");
	for(var i = 0; i < userList.length; i += 2) {
		if(userList[i] == event.target.id) {
			$("#form-username").val(userList[i]);
			$("#form-password").val(userList[i + 1]);
			$("#userListModal").modal('hide');
			return;
		}
	}
}
//设置自定义服务器IP
function setRemoteServiceIP() {
	if(isValidIP($('#RemoteServiceIP').val())) {
		//修改form提交方法
		$('#login_form').attr('onsubmit', 'return defLogin()');
	} else {
		alert('输入不是合法的ip地址,请重新输入');
	}
}
//验证是不是合法ip地址
function isValidIP(ip) {
	var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
	return reg.test(ip);
}

//自定义服务器ip地址登录方法
function defLogin() {
	//				var defaultIP = "10.0.0.151:19001";
	var defaultIP = $('#RemoteServiceIP').val() + ':19001';
	//				alert('defaultIP:  '+defaultIP)
	if(localStorage.getItem('myDefaultIP')) {
		defaultIP = localStorage.getItem('myDefaultIP');
	}

	var unselectedMenu = localStorage.getItem('unselectedMenu');
	var username = document.getElementById("form-username").value;
	var password = document.getElementById("form-password").value;
	// var RemoteServiceIP1 = localStorage.getItem('RemoteServiceIP');

	// 				if(RemoteServiceIP1 != null && RemoteServiceIP1 != 'undefined' && RemoteServiceIP1 != "") {
	// 					window.serviceIP = 'http://' + RemoteServiceIP1 + '/ilpsService';
	// 				}
	// 				alert('RemoteServiceIP1' + RemoteServiceIP1)
	// 				alert('window.serviceIP' + window.serviceIP)
	$.ajax({
		type: 'POST',
		// url:'http://192.168.1.100:8080/api/login',
		//url: 'http://10.0.0.151:19001/ilpsService/api/login',
		url: 'http://' + defaultIP.trim() + '/ilpsService/api/login',
		dataType: "json",
		data: {
			'username': username,
			"password": password
		},
		async: true, //设置为false时,timeout不生效
		timeout: 5000,
		success: function(result) {
			if(result.status == "1") {
				loginSuccess(result, defaultIP.trim(), unselectedMenu, username, password);

			} else {
				var hintinfo = document.getElementById("hintinfo");
				hintinfo.innerHTML = '<font color="red">' + result.message + '</font>';
				//							hintinfo.innerText = "用户名或密码错误，请重新填写。";
			}
		},

		error: function(XMLHttpRequest, status, err) {
			//if(status != 'timeout')
		},
		complete: function(XMLHttpRequest, status) { //当请求完成时调用函数
			// alert(XMLHttpRequest.status + status);
			if(status == 'timeout' || status == 'error') { //status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
				alert(status + "，连接服务器失败，请检查配置信息及网络连接！")
				//							alert(status + "，连接MES网络服务器失败，正在尝试登录mes网服务器！")
				//							mes_login();
			}
		}

	});
	return false;
}

function appLoginPageload() {
	$("#form-username").val(localStorage.getItem('LocalUserName'));
	$("#form-password").val(localStorage.getItem('LocalUserPsw'));
	$("#loginPage_show_RemoteServiceIP").text('当前服务器地址: ' + localStorage.getItem('RemoteServiceIP'));
	// setRemoteServiceIP('10.0.0.151:19001');

}

function versionCompare() {
	var RemoteServiceIP1 = localStorage.getItem('RemoteServiceIP');
	if(RemoteServiceIP1 != null && RemoteServiceIP1 != 'undefined' && RemoteServiceIP1 != "") {
		window.webUiService = 'http://' + RemoteServiceIP1;
	}
	//alert(window.serviceIP ); 
	var versionNow;
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		versionNow = inf.version;
	});
	document.getElementById('versionInfo').innerText = "当前版本号: " + localStorage.getItem("versionNow");
	$.ajax({
		type: "get",
		url: window.serviceIP + '/api/getappversionbyclienttype?clientType=apk',
		async: true,
		success: function(res) {
			localStorage.setItem("versionNow", versionNow);
			document.getElementById('versionInfo').innerText = "当前版本号: " + localStorage.getItem("versionNow");
			//alert(res.message)
			if(res.message > versionNow) //比对版本号
			{

				plus.nativeUI.showWaiting("新版本app下载中，请稍等......");
				//updateAppRun(window.webUiService + '/pages/H5EE481DB_0308142119.apk');
				//									alert(window.webUiService + '/tnpyILPS_' + res.message.toString().trim() + '.apk')
				updateAppRun(window.webUiService + '/tnpyILPS_' + res.message.toString().trim() + '.apk');

				//							//console.log(new_version+'新版本'+version);
				//							plus.nativeUI.confirm("应用有新版本，是否立即下载更新？", function(event) {
				//								if(event.index == 1) {
				//									plus.nativeUI.showWaiting();
				//									//updateAppRun(window.webUiService + '/pages/H5EE481DB_0308142119.apk');
				//									//									alert(window.webUiService + '/tnpyILPS_' + res.message.toString().trim() + '.apk')
				//									updateAppRun(window.webUiService + '/tnpyILPS_' + res.message.toString().trim() + '.apk');
				//
				//									//updateAppRun("http://fast.yingyonghui.com/82576ac98a5bf68aa822332c681ce0d9/5c84684a/apk/6363734/4e788c5e4446c6edece446bc92eef0af");
				//									//ks.update_ksd(new_json.url); //更新函数,在下面
				//
				//								}
				//							}, '更新确认', ['取消', '确认']);
			}
		}
	});

}
//ks.update_ksd==========
function updateAppRun(url) {
	//console.log(url);
	//创建下载管理对象
	var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
		// 下载完成
		if(status == 200) { //下载成功后的回调函数
			//alert("下载成功，准备安装" + d.filename)
			plus.nativeUI.toast("下载成功，准备安装" + d.filename);
			//console.log(d);
			//安装程序，第一个参数是路径，默认的下载路径在_downloads里面
			//plus.runtime.install('_downloads/ksd.apk', {}, function() {
			plus.runtime.install(d.filename, {}, function() {
				plus.nativeUI.toast('安装成功');
			}, function() {
				plus.nativeUI.toast('安装失败');
			});
			plus.nativeUI.closeWaiting();
		} else {
			alert("下载失败 " + status);
			plus.nativeUI.closeWaiting();
		}
	});
	//dtask.addEventListener( "statechanged", onStateChanged, false );
	dtask.start(); //开始下载任务
}

function login() {
	var defaultIP = "10.0.0.151:19001";
	if(localStorage.getItem('myDefaultIP')) {
		defaultIP = localStorage.getItem('myDefaultIP');
	}

	var unselectedMenu = localStorage.getItem('unselectedMenu');
	var username = document.getElementById("form-username").value;
	var password = document.getElementById("form-password").value;
	// var RemoteServiceIP1 = localStorage.getItem('RemoteServiceIP');

	// 				if(RemoteServiceIP1 != null && RemoteServiceIP1 != 'undefined' && RemoteServiceIP1 != "") {
	// 					window.serviceIP = 'http://' + RemoteServiceIP1 + '/ilpsService';
	// 				}
	// 				alert('RemoteServiceIP1' + RemoteServiceIP1)
	// 				alert('window.serviceIP' + window.serviceIP)
	$.ajax({
		type: 'POST',
		// url:'http://192.168.1.100:8080/api/login',
		//url: 'http://10.0.0.151:19001/ilpsService/api/login',
		url: 'http://' + defaultIP.trim() + '/ilpsService/api/login',
		dataType: "json",
		data: {
			'username': username,
			"password": password
		},
		async: true, //设置为false时,timeout不生效
		timeout: 5000,
		success: function(result) {
			if(result.status == "1") {
				$("#loginButton").attr("disabled", false);
				loginSuccess(result, defaultIP.trim(), unselectedMenu, username, password);

			} else {
				var hintinfo = document.getElementById("hintinfo");
				hintinfo.innerHTML = '<font color="red">' + result.message + '</font>';
				//							hintinfo.innerText = "用户名或密码错误，请重新填写。";
			}
		},

		error: function(XMLHttpRequest, status, err) {
			//if(status != 'timeout')
		},
		complete: function(XMLHttpRequest, status) { //当请求完成时调用函数
			// alert(XMLHttpRequest.status + status);
			if(status == 'timeout' || status == 'error') { //status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
				// alert(status + "，连接服务器失败，请检查配置信息及网络连接！")
				//							alert(status + "，连接MES网络服务器失败，正在尝试登录mes网服务器！")
				mes_login();
			}
		}

	});
	return false;
}

//默认10.0.0.151登录调用方法
function mes_login() {

	var unselectedMenu = localStorage.getItem('unselectedMenu');
	var username = document.getElementById("form-username").value;
	var password = document.getElementById("form-password").value;
	// var RemoteServiceIP1 = localStorage.getItem('RemoteServiceIP');

	// 				if(RemoteServiceIP1 != null && RemoteServiceIP1 != 'undefined' && RemoteServiceIP1 != "") {
	// 					window.serviceIP = 'http://' + RemoteServiceIP1 + '/ilpsService';
	// 				}
	// 				alert('RemoteServiceIP1' + RemoteServiceIP1)
	// 				alert('window.serviceIP' + window.serviceIP)
	$.ajax({
		type: 'POST',
		// url:'http://192.168.1.100:8080/api/login',
		//url: 'http://10.0.0.151:19001/ilpsService/api/login',
		url: 'http://10.0.0.151:19001/ilpsService/api/login',
		dataType: "json",
		data: {
			'username': username,
			"password": password
		},
		async: true, //设置为false时,timeout不生效
		timeout: 5000,
		success: function(result) {
			if(result.status == "1") {
				$("#loginButton").attr("disabled", false);
				loginSuccess(result, '10.0.0.151:19001', unselectedMenu, username, password);

			} else {
				var hintinfo = document.getElementById("hintinfo");
				hintinfo.innerHTML = '<font color="red">' + result.message + '</font>';
				//							hintinfo.innerText = "用户名或密码错误，请重新填写。";
			}
		},

		error: function(XMLHttpRequest, status, err) {
			//						alert('出现错误,请联系管理员!')
		},
		complete: function(XMLHttpRequest, status) { //当请求完成时调用函数
			// alert(XMLHttpRequest.status + status)
			if(status == 'timeout' || status == 'error') { //status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
				// alert(status + "，连接服务器失败，请检查配置信息及网络连接！")
				//							alert(status + "，连接MES网络服务器失败，正在尝试登录mes网服务器！")
				second_login();
			}
		}

	});
	return false;
}

//mes段网络登录调用方法
function second_login() {

	//				alert('second_login被调用了')

	var unselectedMenu = localStorage.getItem('unselectedMenu');
	var username = document.getElementById("form-username").value;
	var password = document.getElementById("form-password").value;
	// var RemoteServiceIP1 = localStorage.getItem('RemoteServiceIP');
	// 				if(RemoteServiceIP1 != null && RemoteServiceIP1 != 'undefined' && RemoteServiceIP1 != "") {
	// 					window.serviceIP = 'http://' + RemoteServiceIP1 + '/ilpsService';
	// 				}
	// 					alert('RemoteServiceIP1' + RemoteServiceIP1)
	// 				alert('window.serviceIP' + window.serviceIP)
	$.ajax({
		type: 'POST',
		url: 'http://192.168.80.228:19001/ilpsService/api/login',
		dataType: "json",
		data: {
			'username': username,
			"password": password
		},
		async: true, //设置为false时,timeout不生效
		timeout: 5000,
		success: function(result) {
			if(result.status == "1") {
				$("#loginButton").attr("disabled", false);
				loginSuccess(result, '192.168.80.228:19001', unselectedMenu, username, password);

			} else {
				var hintinfo = document.getElementById("hintinfo");
				hintinfo.innerHTML = '<font color="red">' + result.message + '</font>';
				//							hintinfo.innerText = "用户名或密码错误，请重新填写。";
			}
		},

		error: function(xhr, status, err) {
			//					 	alert('出现错误,请联系管理员!')
		},
		complete: function(XMLHttpRequest, status) { //当请求完成时调用函数

			if(status == 'timeout' || status == 'error') { //status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
				//alert(status + "，连接服务器失败，请检查配置信息及网络连接！");
				ww_login();
				//							if(localStorage.roleID) {
				//								if(localStorage.roleID > windowRoleID.TJY)
				//									ww_login();
				//								else
				//									alert(status + "，连接服务器失败，请检查配置信息及网络连接！");;
				//							} else
				//								alert(status + "，连接服务器失败，请检查配置信息及网络连接！");
			}
		}

	});
	return false;
}

//mes段网络登录调用方法
function ww_login() {

	//				alert('second_login被调用了')

	var unselectedMenu = localStorage.getItem('unselectedMenu');
	var username = document.getElementById("form-username").value;
	var password = document.getElementById("form-password").value;
	// var RemoteServiceIP1 = localStorage.getItem('RemoteServiceIP');
	// 				if(RemoteServiceIP1 != null && RemoteServiceIP1 != 'undefined' && RemoteServiceIP1 != "") {
	// 					window.serviceIP = 'http://' + RemoteServiceIP1 + '/ilpsService';
	// 				}
	// 					alert('RemoteServiceIP1' + RemoteServiceIP1)
	// 				alert('window.serviceIP' + window.serviceIP)
	$.ajax({
		type: 'POST',
		url: 'http://117.158.49.108:19001/ilpsService/api/login',
		dataType: "json",
		data: {
			'username': username,
			"password": password
		},
		async: true, //设置为false时,timeout不生效
		timeout: 5000,
		success: function(result) {
			if(result.status == "1") {
				$("#loginButton").attr("disabled", false);
				loginSuccess(result, '117.158.49.108:19001', unselectedMenu, username, password);
			} else {
				var hintinfo = document.getElementById("hintinfo");
				hintinfo.innerHTML = '<font color="red">' + result.message + '</font>';
				//							hintinfo.innerText = "用户名或密码错误，请重新填写。";
			}
		},

		error: function(xhr, status, err) {
			//					 	alert('出现错误,请联系管理员!')
		},
		complete: function(XMLHttpRequest, status) { //当请求完成时调用函数
			$("#loginButton").attr("disabled", false);
			if(status == 'timeout' || status == 'error') { //status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
				alert(status + "，连接服务器失败，请检查配置信息及网络连接！")
			}
		}

	});
	return false;
}