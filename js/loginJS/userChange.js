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

	localStorage.userListMap = userInfo;

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
			li.innerHTML = "<li id='" + userList[i] + "' onclick='userSelected()' style='font-size:40px'>" + userList[i] + "  &nbsp; &nbsp; " + "</li>";

			//向ul追加元素li
			ul.appendChild(li);

		}

	}

}

function userSelected() {
	var userNameSlct = "";
	var userPSWSlct = "";
	var userList = localStorage.userListMap.split("###");
	for(var i = 0; i < userList.length; i += 2) {
		if(userList[i] == event.target.id) {
			userNameSlct = userList[i];
			userPSWSlct = userList[i + 1];
		}
	}

	$.ajax({
		type: 'POST',
		// url:'http://192.168.1.100:8080/api/login',
		//url: 'http://10.0.0.151:19001/ilpsService/api/login',
		url: 'http://' + localStorage.getItem('myDefaultIP') + '/ilpsService/api/login',
		dataType: "json",
		data: {
			'username': userNameSlct,
			"password": userPSWSlct
		},
		async: true, //设置为false时,timeout不生效
		timeout: 5000,
		success: function(result) {
			if(result.status == "1") {
				loginSuccess(result, localStorage.getItem('myDefaultIP'), localStorage.getItem('unselectedMenu'), userNameSlct, userPSWSlct);

			} else {
				alert("登录失败！" + result.message);
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

}