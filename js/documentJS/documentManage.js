function uploadFile() {
	var formData = new FormData($("#form1")[0]);
	//	var ofile = $("#file").get(0).files[0];
	//	var formData = new FormData();
	//	if(!ofile) {
	//		$.messager.alert('提示', '请上传文件!', 'info');
	//		return;
	//	}
	//	var size = ofile.size / 1024 / 1024;
	//	if(size > 5) {
	//		$.messager.alert('提示', '文件不能大于5M', 'info');
	//		return;
	//	}
	//
	//	formData.append("file", ofile); //这个是文件，这里只是演示上传了一个文件，如果要上传多个的话将[0]去掉
	//	formData.append("F_ID", "123"); //这个是上传的其他参数
	//	formData.append("F_NAME", ofile.name);
	formData.append("creator", "lls");

	$.ajax({
		url: "http://192.168.1.104:8080/api/documentupload",
		type: "POST",
		data: formData,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		cache: false, //不需要缓存
		processData: false,
		contentType: false,
		success: function(data) {
			if(data.status == 1) {
				alert('保存成功!');
			} else {
				alert("保存失败！" + data.message);
			}

		}
	});
};

function filterFile() {
	var formData = new FormData($("#form2")[0]);
$("#mytable tbody").html("");
	$("#mytable tr:not(:first)").empty("");
	$.ajax({
		url: "http://192.168.1.104:8080/api/documentSelect",
		type: "POST",
		data: formData,
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		cache: false, //不需要缓存
		processData: false,
		contentType: false,
		success: function(dataRes) {
			if(dataRes.status == 1) {
				var models = eval("(" + dataRes.data + ")");

				var c = document.getElementById('mytable'); //获得表格的信息
				var z = c.rows[0].cells; //如果不是空表，首先获得表格有多少列，先获取再插入新行
				for(var i in models) {

					var x = c.insertRow(c.rows.length);
					for(var j = 0; j < z.length; j++) { //依次向新行插入表格列数的单元格
						   
						var y = x.insertCell(j);
						//					if(j ==0)
						//						y.onclick = exportFile;
						if(j == 0)
							y.innerHTML = "<a href=\"#\"  onclick=\"exportFile()\" >" + models[i].name + "</a> ";  //models[i].name
						if(j == 1)
							y.innerHTML = models[i].summary; 
						if(j == 2)
							y.innerHTML = models[i].creator; 
						if(j == 3)
							y.innerHTML = models[i].createtime; 
					}
				}
			} else {
				alert("查询失败！" + dataRes.message);
			}

		}
	});
};

function exportFile() {  
	var filename = this.innerHTML.split(">")[1].split("<")[0];
	var form = $("<form>"); //定义一个form表单
	form.attr("style", "display:none");
	form.attr("target", "");
	form.attr("method", "post");
	form.attr("action", "http://192.168.1.104:8080/api/downloadFile");
	var input1 = $("<input>");
	input1.attr("type", "hidden");
	input1.attr("name", "filename");
	input1.attr("value", filename);
	form.append(input1);
	var input2 = $("<input>");
	input2.attr("type", "hidden");
	input2.attr("name", "filePath");
	input2.attr("value", "D:/upload");
	form.append(input2);

	$("body").append(form); //将表单放置在web中
	form.submit(); //表单提交

	   
};