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
	formData.append("creator", $.cookie('username').toString());

	$.ajax({
		url: window.serviceIP + "/api/documentupload",
		type: "POST",
		data: formData,
		headers: {
			Token: $.cookie('token')
		},
		cache: false, //不需要缓存
		processData: false,
		contentType: false,
		success: function(dataRes) {
			//alert(window.serviceIP + "/api/documentupload");
			if(dataRes.status == 1) {
				alert('保存成功!');
			} else {
				alert("保存失败！" + dataRes.message);
			}

		}
	});
};

function initFileData(){
	filterFile();
}
function filterFile() {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "名称",
		"field": "名称",
		switchable: true,
		sortable: true
	});
	columnsArray.push({
		"title": "摘要",
		"field": "摘要",
		switchable: true,
		sortable: true
	});
	columnsArray.push({
		"title": "创建人",
		"field": "创建人",
		switchable: true,
		sortable: true
	});
	columnsArray.push({
		"title": "创建时间",
		"field": "创建时间",
		switchable: true,
		sortable: true
	});
	columnsArray.push({
		"title": "存储路径",
		"field": "存储路径",
		visible: false
	});
	var formData = new FormData($("#form2")[0]);
	$.ajax({
		url: window.serviceIP + "/api/documentSelect",
		type: "POST",
		data: formData,
		headers: {
			Token: $.cookie('token')
		},
		cache: false, //不需要缓存
		processData: false,
		contentType: false,
		async: false,
		success: function(dataRes) {
			if(dataRes.status == 1) {

				var models = eval("(" + dataRes.data + ")");
				var dataShow = [];
				for(var i = 0; i < models.length; i++) {
					var obj = {};

					obj["名称"] = "<a href=\""+models[i].location +"\"  onclick=\"exportFile(this)\" >" + models[i].name + "</a> "; 
					obj["摘要"] = models[i].summary;
					obj["创建人"] = models[i].creator;
					obj["创建时间"] = models[i].createtime;
					obj["存储路径"] = models[i].location;
					dataShow.push(obj);
				}
				$('#mytable').bootstrapTable('destroy').bootstrapTable({
					data: dataShow,
					toolbar: '#toolbar',
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
			} else {
				alert("查询失败！" + dataRes.message);
			}

		}
	});
};

function filterFileOld() {

	var formData = new FormData($("#form2")[0]);
	$("#mytable tbody").html("");
	$("#mytable tr:not(:first)").empty("");
	$.ajax({
		url: window.serviceIP + "/api/documentSelect",
		type: "POST",
		data: formData,
		headers: {
			Token: $.cookie('token')
		},
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
						//	if(j ==0)
						//	y.onclick = exportFile;
						if(j == 0)
							y.innerHTML = "<a href=\"#\"  onclick=\"exportFile(this)\" >" + models[i].name + "</a> "; 
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

function exportFile(obj) {  
	//alert(obj.innerHTML);
	var row = $.map($('#mytable').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	//console.log($(obj).attr('href'));

	var filename = obj.innerHTML;
	var form = $("<form>"); //定义一个form表单
	form.attr("style", "display:none");
	form.attr("target", "");
	form.attr("method", "post");
	form.attr("action", window.serviceIP + "/api/downloadFile");
	var input1 = $("<input>");
	input1.attr("type", "hidden");
	input1.attr("name", "filelocation");
	input1.attr("value", $(obj).attr('href'));
	form.append(input1);
	$("body").append(form); //将表单放置在web中
	form.submit(); //表单提交

	   
};