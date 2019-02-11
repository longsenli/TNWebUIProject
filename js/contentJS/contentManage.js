function publishIdea() {

	var formData = new FormData();
	//alert(document.publishIdeaFrom.type.value);
	formData.append("type", document.publishIdeaFrom.type.value);
	formData.append("title", document.publishIdeaFrom.title.value);
	formData.append("context", document.publishIdeaFrom.context.value);
	if($('#anonymity').is(':checked')) {
		formData.append("creator", "匿名");
	} else {
		formData.append("creator", $.cookie('username'));
	}
	$.ajax({
		url: window.serviceIP + "/api/content/insertcontent",
		type: "POST",
		data: window.getFormDataToJson(formData),
		headers: {
			Token: $.cookie('token')
		},
		cache: false, //不需要缓存
		processData: false,
		contentType: 'application/json; charset=UTF-8',
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
			$("#contentType").find('option').remove();
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				console.log(models);
				var htmlStr = "";        
				for (var  i  in  models)  {  

					htmlStr += "<option value="  +  models[i].type  +  ">"  +  models[i].name  +  "</option>";    //$("#contentType").append("<option value=" + models[i].type + ">" + models[i].name + "</option>");  				        
				}  

				$('#contentType').html(htmlStr);
				$('#contentType').selectpicker('refresh');

				$('#contentType').selectpicker('render');  
				$('.selectpicker').selectpicker('mobile'); 
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
};

function initContentTypeSlctData() {

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
				$('#typeAll').selectpicker('mobile');
				$('#contentType').selectpicker('mobile');
				filterContent();
			} else {
				alert("初始化数据失败！" + dataRes.message);
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
		visible: false
	});
	columnsArray.push({
		"title": "ID",
		"field": "ID",
		visible: false
	});
	var formData = new FormData($("#form2")[0]);
	formData.append('endTime', document.getElementById("endTime").value + " 23:59:59");
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
				document.getElementById("comment").innerHTML = "";
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
				//				columnsArray.splice(5, 1, {
				//					"title": "ID",
				//					"field": "ID",
				//					visible: false
				//				});
				//				columnsArray.splice(4, 1, {
				//					"title": "内容",
				//					"field": "内容",
				//					visible: false
				//				});
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
					columns: columnsArray,
					onClickRow: function(row) {

						//$('.changeTableRowColor').removeClass('changeTableRowColor');
						//$(row).addClass('changeTableRowColor');
						//workOrderSelectedRow = row;
						showDetail(row);
					}
				});
				//				$('#mytable tr').find('td:eq(4)').hide();
				//				$('#mytable tr').find('th:eq(4)').hide();
				//				$('#mytable tr').find('td:eq(5)').hide();
				//				$('#mytable tr').find('th:eq(5)').hide();

			} else {
				alert("查询失败！" + dataRes.message);
			}

		}
	});
};
////行点击事件
//$(function() {
//	 $("body").delegate('#mytable tr', 'click', function () {
//     showDetail(this);
//  });
//});

var selectedContentID = "";

function changeColorPublishIdea(row) {
	$('.changeTableRowColor').removeClass('changeTableRowColor');
	$(row).addClass('changeTableRowColor');
}

function showDetail(row) {

	//使用getSelections即可获得，row是json格式的数据
	//		var row1 = $.map($('#mytable').bootstrapTable('getSelections'), function(rowSlct) {
	//			return rowSlct;
	//		});
	//		console.log(row1[0]);
	//		console.log(row["ID"]);
	selectedContentID = row["ID"];
	document.getElementById("selectedDetail").innerHTML = row["内容"];
	//selectedContentID = row.cells[5].childNodes[0].textContent;

	//document.getElementById("selectedDetail").innerHTML = row.cells[4].childNodes[0].textContent;
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
	if(document.commentForm.context.value.length < 1) {
		alert("输入评论内容!");
		return;
	}
	var submitName = "";
	var formData = new FormData();
	formData.append("text", document.commentForm.context.value);
	formData.append("contentID", selectedContentID);

	if($('#commentAnonymity').is(':checked')) {
		formData.append("commentor", "匿名");
		submitName = "匿名";
	} else {
		formData.append("commentor", $.cookie('username').toString());
		submitName = $.cookie('username').toString();
	}
	//alert(getFormData(formData));
	$.ajax({
		url: window.serviceIP + "/api/comment/insertcomment",
		type: "POST",
		data: window.getFormDataToJson(formData),
		headers: {
			Token: $.cookie('token')
		},
		cache: false, //不需要缓存
		processData: false,
		contentType: 'application/json; charset=UTF-8',
		success: function(data) {
			if(data.status == 1) {
				alert('保存成功!');

				document.commentForm.context.value = "";

				var dataHtml = "";
				var nowTime = new Date();
				var nowStr = nowTime.format("yyyy-MM-dd hh:mm:ss");
				dataHtml += "<span>" + submitName + "</span><span style=\"float:right\">" + nowStr +
					"</span><p><textarea readonly=\"readonly\" style=\"background:darkgrey; resize:none;width: 99%\" rows=\"1\" class=\"msg\">" + document.commentForm.context.value + "</textarea></p>";
				dataHtml += document.getElementById("comment").innerHTML;
				document.getElementById("comment").innerHTML = dataHtml;
			} else {
				alert("保存失败！" + data.message);
			}

		}
	});

};