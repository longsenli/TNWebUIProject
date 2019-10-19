//获取全局token等信息，放入变量$Global_UserLogin_Info, app_login.html中login登陆方法初始赋值，用户首次登陆成功后设置放入localStorage
var $Global_UserLogin_Info = JSON.parse(localStorage.getItem('$Global_UserLogin_Info'));
function changePswUserMng() {

	var newPsw = document.getElementById("newPsw").value;
	if(document.getElementById("oldPsw").value == newPsw)
	{

		alert("新旧密码不能一样！");
		return;
	}
	if(newPsw != (document.getElementById("confirmPsw").value))
	{
		alert("新密码不匹配！");
		return;
	}
	var formData = new FormData();
	formData.append("oldPsw", document.getElementById("oldPsw").value);
	formData.append("newPsw", newPsw);
	formData.append("userID", $Global_UserLogin_Info.userid); 
	$.ajax({
			url: window.serviceIP + "/api/user/changepsw",
			type: "POST",
			data: formData,
			headers: {
//				Token: localStorage.getItem('token')
			},
			cache: false, //不需要缓存
			processData: false,
			contentType: false,
			success: function(dataRes) {
				if(dataRes.status == 1) {

					alert("修改成功！请重新登录！");
					window.location.href = "../../pages/app_login.html";

				} 
				else {
					alert("修改失败！" + dataRes.message);
				}
			}
		});

	};