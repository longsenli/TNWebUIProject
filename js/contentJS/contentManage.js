function publishIdea() {
	var strdata = $("#publishIdeaFrom").serializeArray();

	var ideaForm = new FormData($("#publishIdeaFrom")[0]);
	var formData = new FormData();
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
	alert(document.publishIdeaFrom.anonymity.value)
	if($('#anonymity').is(':checked')) {
		formData.append("creator", "匿名");
	} else {
		formData.append("creator", "lls");
	}
	alert(getFormData(formData));
	$.ajax({
		url: "http://192.168.1.104:8080/api/content/insertcontent",
		type: "POST",
		data: getFormData(formData),
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

function initConentData() {

	$.ajax({
		url: "http://192.168.1.104:8080/api/content/getcontenttype",
		type: "GET",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
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
				console.log(htmlStr);   
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
		url: "http://192.168.1.104:8080/api/content/getcontenttype",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
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

function filterContent() {
	var formData = new FormData($("#form2")[0]);
	$("#mytable tbody").html("");
	$("#mytable tr:not(:first)").empty("");
	$.ajax({
		url: "http://192.168.1.104:8080/api/content/selectcontent",
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
					x.onclick= showDetail;
					for(var j = 0; j < z.length; j++) { //依次向新行插入表格列数的单元格
						   
						var y = x.insertCell(j);
						//y.onclick = showDetail;
						//					if(j ==0)
						//						y.onclick = exportFile;
						if(j == 0)
							y.innerHTML = models[i].title;  //models[i].name
						if(j == 1)
							y.innerHTML = models[i].type; 
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
var ID = -1;
function showDetail()
{

ID = this.cells[5].childNodes[0].textContent;
	alert( this.rowIndex);
	 document.getElementById("selectedDetail").innerHTML = this.cells[4].childNodes[0].textContent;
	 var dataHtml = "";
	 dataHtml += "<span style=>" + "123" + "<span style=\"float:right\">" + "data[2]" + "</span><p><span class=\"msg\">" + "data[0]" + "</span></p>";
	document.getElementById("comment").innerHTML = dataHtml;
//	 var dataHtml = "", data = "";
//                for(var i = localStorage.length-1; i >= 0; i--)//效率更高的循环方法
//                {
//                    data = localStorage.getItem(localStorage.key(i)).split("|");
// 
//                        //dataHtml += "<p><span class=\"msg\">" + data[0] + "</span><span class=\"datetime\">" + data[1] + "</span><span>" + data[2]+"</span></p>";
//                    dataHtml += "<span style=>" + data[1] + "<span style=\"float:right\">" + data[2] + "</span><p><span class=\"msg\">" + data[0] + "<input style=\"float:right;border:none;border-radius:5px;\" id=\"clearBt\" type=\"button\" onclick=\"delete1(" + localStorage.key(i) + ");\" value=\"删除\"/>" + "</span></p>";
//                }
//                document.getElementById("comment").innerHTML = dataHtml;
};

function submitComment() {
	$.ajax({
		url: "http://192.168.1.104:8080/api/content/getcontenttype",
		type: "GET",

		contentType: "application/json",
		dataType: "json",
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
