function publishIdea() {

	var formData = new FormData();
	//alert(document.publishIdeaFrom.type.value);
	formData.append("type", document.publishIdeaFrom.type.value);
	formData.append("title", document.publishIdeaFrom.title.value);
	formData.append("context", document.publishIdeaFrom.context.value);

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

	if($('#anonymity').is(':checked')) {
		formData.append("creator", "匿名");
	} else {
		formData.append("creator", $.cookie('username'));
	}
	//	alert(getFormData(formData));
	$.ajax({
		url: window.serviceIP + "/api/content/insertcontent",
		type: "POST",
		data: getFormData(formData),
		headers: {
			Token: $.cookie('token')
		},
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

function initConentData() {

	$.ajax({
		url: window.serviceIP + "/api/content/getcontenttype",
		type: "GET",
		headers: {
			Token: $.cookie('token')
		},
		contentType: "application/json",
		dataType: "json",
		processData: true,
		success: function(dataRes) {
			console.log(dataRes);
			//			$("#contentType option").remove();
			$("#contentType").find('option').remove();
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				console.log(models);
				var htmlStr = "";        
				for (var  i  in  models)  {  

					htmlStr += "<option value="  +  models[i].type  +  ">"  +  models[i].name  +  "</option>";    //$("#contentType").append("<option value=" + models[i].type + ">" + models[i].name + "</option>");  				        
				}  
				alert(htmlStr);
				$('#contentType').html(htmlStr);
				$('#contentType').selectpicker('refresh');

				$('#contentType').selectpicker('render');   
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}

		}
	});
};

function getFormData(formDataOrign) {
	var objData = {};

	for(var entry of formDataOrign.entries()) {
		objData[entry[0]] = entry[1];
	}
	return JSON.stringify(objData);
};

function initData() {

	$.ajax({
		url: window.serviceIP + "/api/content/getcontenttype",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		headers: {
			Token: $.cookie('token')
		},
		processData: true,
		success: function(dataRes) {
			console.log(dataRes);
			$("#typeAll").find('option').remove();
			$("#contentType").find('option').remove();
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");

				$('#typeAll').append(("<option value=" + "-1" + " selected='selected'>" + "全部"  + "</option>").toString())
				for (var  i  in  models)  {  
					$('#contentType').append(("<option value=" + models[i].type.toString() + ">" + models[i].name.toString()  + "</option>").toString())
					$('#typeAll').append(("<option value=" + models[i].type.toString() + ">" + models[i].name.toString()  + "</option>").toString())

				}
				$('#contentType').selectpicker('refresh');
				$('#contentType').selectpicker('render');  
				$('#typeAll').selectpicker('refresh');
				$('#typeAll').selectpicker('render');   
				filterContent();
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});

};

function filterContentT() {

	var formData = new FormData($("#form2")[0]);
	$("#mytable tbody").html("");
	$("#mytable tr:not(:first)").empty("");
	$.ajax({
		url: window.serviceIP + "/api/content/selectcontent",
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
					x.onclick = showDetail;
					for(var j = 0; j < z.length; j++) { //依次向新行插入表格列数的单元格
						   
						var y = x.insertCell(j);
						//y.onclick = showDetail;
						//					if(j ==0)
						//						y.onclick = exportFile;
						if(j == 0)
							y.innerHTML = models[i].title;  //models[i].name
						if(j == 1)
							y.innerHTML = $("#contentType").find("option:eq(" + (models[i].type - 1) + ")").text(); 
						if(j == 2)
							y.innerHTML = models[i].creator; 
						if(j == 3)
							y.innerHTML = models[i].createtime; 
						if(j == 4)
							y.innerHTML = models[i].context; 
						if(j == 5)
							y.innerHTML = models[i].id; 
					}
				}
				$('#mytable tr').find('td:eq(4)').hide();
				$('#mytable tr').find('th:eq(4)').hide();
				$('#mytable tr').find('td:eq(5)').hide();
				$('#mytable tr').find('th:eq(5)').hide();
			} else {
				alert("查询失败！" + dataRes.message);
			}

		}
	});
};

function filterContent() {

	var columnsArray = [];
	columnsArray.push({
		"title": "标题",
		"field": "标题"
	});
	columnsArray.push({
		"title": "类型",
		"field": "类型"
	});
	columnsArray.push({
		"title": "创建人",
		"field": "创建人"
	});
	columnsArray.push({
		"title": "创建时间",
		"field": "创建时间"
	});
	columnsArray.push({
		"title": "内容",
		"field": "内容",
	//	visible: false
	});
	columnsArray.push({
		"title": "ID",
		"field": "ID",
	//	visible: false
	});
	var formData = new FormData($("#form2")[0]);
	$("#mytable tbody").html("");
	$("#mytable tr:not(:first)").empty("");
	$.ajax({
		url: window.serviceIP + "/api/content/selectcontent",
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
				selectedContentID = "";
				document.getElementById("selectedDetail").innerHTML = "";
				document.getElementById("comment").innerHTML  = "";
				var models = eval("(" + dataRes.data + ")");
				var dataShow = [];
				for(var i = 0; i < models.length; i++) {
					var obj = {};

					obj["标题"] = models[i].title;
					obj["类型"] = $("#contentType").find("option:eq(" + (models[i].type - 1) + ")").text(); 
					obj["创建人"] = models[i].creator;
					obj["创建时间"] = models[i].createtime;
					obj["内容"] = models[i].context; 
					obj["ID"] = models[i].id;
					dataShow.push(obj);
				}
				$('#mytable').bootstrapTable('destroy').bootstrapTable({
					data: dataShow,
					toolbar: '#toolbar',
					//singleSelect: true,
					clickToSelect: true,
					sortName: "创建时间",
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
				$('#mytable tr').find('td:eq(4)').hide();
				$('#mytable tr').find('th:eq(4)').hide();
				$('#mytable tr').find('td:eq(5)').hide();
				$('#mytable tr').find('th:eq(5)').hide();
				var c = document.getElementById('mytable'); //获得表格的信息
				for(var i = 1; i <= models.length; i++) { //依次向新行插入表格列数的单元格
					c.rows[i].onclick = showDetail;
				}
			} else {
				alert("查询失败！" + dataRes.message);
			}

		}
	});
};
var selectedContentID = "";

function showDetail() {
	  $('.changeTableRowColor').removeClass('changeTableRowColor');
      $(this).addClass('changeTableRowColor');
	selectedContentID = this.cells[5].childNodes[0].textContent;

	document.getElementById("selectedDetail").innerHTML = this.cells[4].childNodes[0].textContent;
	$.ajax({
		url: window.serviceIP + "/api/comment/selectbycontentid?contentID=" + selectedContentID,
		type: "GET",
		headers: {
			Token: $.cookie('token')
		},
		cache: false, //不需要缓存
		processData: false,
		contentType: false,
		success: function(dataRes) {
			if(dataRes.status == 1) {
				var models = eval("(" + dataRes.data + ")");
				var dataHtml = "";
				for(var i in models) {

					dataHtml += "<span>" + models[i].commentor + "</span><span style=\"float:right\">" + models[i].createtime + "</span><p><textarea readonly=\"readonly\" style=\"background:darkgrey; resize:none;width: 99%\" rows=\"1\" class=\"msg\">" + models[i].text + "</textarea></p>";

				}
				document.getElementById("comment").innerHTML = dataHtml;
			} else {
				alert("查询失败！" + dataRes.message);
			}

		}
	});
};

function submitComment() {

	if(selectedContentID.length < 2) {
		alert("请先选择评论内容!");
		return;
	}

	var formData = new FormData();
	formData.append("text", document.commentForm.context.value);
	formData.append("contentID", selectedContentID);

	if($('#commentAnonymity').is(':checked')) {
		formData.append("commentor", "匿名");
	} else {
		formData.append("commentor", $.cookie('username').toString());
	}
	//alert(getFormData(formData));
	$.ajax({
		url: window.serviceIP + "/api/comment/insertcomment",
		type: "POST",
		data: getFormData(formData),
		headers: {
			Token: $.cookie('token')
		},
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