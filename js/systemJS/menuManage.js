/*初始化bootstraptable数据选项*/
var options = {
	columns: [{
		title: '菜单名称',
		field: 'menuName',
		width: '20%',
		align: "center",
		formatter: function(index,row) {
			// console.log(row);
			if (row.icon == null || row == "") {
				return row.menuName;
			} else {
				// alert(row.icon);
				return '<i class="' + row.icon + '"></i> <span class="nav-label">' + row.menuName + '</span>';
				}
		}
	},
	{
		field: 'parentName',
		title: '上级菜单名称',
		width: '10',
		align: "center",
		formatter: function(index,row) {
			// console.log(row);
			if (row.parentName == null || row.parentName == "" || row =="") {
				return "主菜单";
			} else {
				return '<i class="' + row.icon + '"></i> <span class="nav-label">' + row.parentName + '</span>';
				}
		}
	},
	{
		field: 'orderNum',
		title: '排序',
		width: '10%',
		align: "center",
		visible:false
	},
	{
		field: 'url',
		title: '请求地址',
		width: '15%',
		align: "center"
	},
	{
		title: '类型',
		field: 'menuType',
		width: '10%',
		align: "center",
		formatter: function(value,item, index) {
			if (item.menuType == 'M') {
				return '<span class="label label-success">目录</span>';
			}
			else if (item.menuType == 'C') {
				return '<span class="label label-primary">菜单</span>';
			}
			else if (item.menuType == 'F') {
				return '<span class="label label-warning">按钮</span>';
			}
		}
	},
	{
		field: 'visible',
		title: '可见',
		width: '10%',
		align: "center",
		formatter: function(value,row, index) {
			if (row.visible == 1) {
				return '<span class="badge badge-primary">显示</span>';
			} else if (row.visible == 0) {
				return '<span class="badge badge-danger">隐藏</span>';
			}
		}
	},
	{
		field: 'perms',
		title: '权限标识',
		width: '15%',
		align: "center",
		"visible":false
	},
	{
		title: '操作',
		width: '20%',
		align: "center",
		formatter: function(value,row, index) {
			var actions = [];
			actions.push('<a class="btn btn-success btn-xs " id="aaaa" href="#" onclick="loadEditMenu(\'' + row.menuId + '\')"><i class="fa fa-edit"></i>编辑</a> ');
			actions.push('<a class="btn btn-info btn-xs " href="#" onclick="loadAddMenu(\'' + row.menuId + '\',\'' + row.menuName + '\')"><i class="fa fa-plus"></i>新增</a> ');
			// onclick=\"showInfo('"+A+"','"+B+"')\"
			
			// actions.push('<button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#addMenuModal" data-whatever="@mdo11">删除</button>');
			actions.push('<a class="btn btn-danger btn-xs " href="#" onclick="confirmDel(\'' + row.menuId + '\')"><i class="fa fa-remove"></i>删除</a>');
			return actions.join('');
		}
	}]
};
/*执行初始化bootstraptable方法*/
	// initDataGrid();
/*初始化bootstraptable数据方法*/
function initDataGrid(){
var $table = $("#dataGrid");
	$table.bootstrapTable('destroy').bootstrapTable({
		url: window.serviceIP + "/menu/listMenus",
		striped:true,
		type: "POST",
		contentType: "application/json",
		// dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		sidePagenation:'server',
		idField:'menuId',
		columns:options.columns,
		treeShowField: 'menuName',
		parentIdField: 'parentId',
		// clickToSelect: true,
		// showToggle: true,
		// showRefresh: true,
		// showColumns: true,
		// search: true,
		singleClick: true,
		onLoadSuccess: function(data) {
			// alert(data[4].parentName);
			$table.treegrid({
					initialState: 'collapsed',//收缩
					treeColumn: 0,//指明第几列数据改为树形
					expanderExpandedClass: 'glyphicon glyphicon-triangle-bottom',
					expanderCollapsedClass: 'glyphicon glyphicon-triangle-right',
					onChange: function() {
							$table.bootstrapTable('resetWidth');
					}
			});
			}
	});
}
/*
新增菜单页面加载方法
*/
function loadAddMenu(parentId,parentName){
	// alert(parentId);
	// alert(parentName);
	$("#addParentId").attr("value", parentId);
	var addParentName = ( parentName==null|| parentName==""||parentName=="undefined")?"主菜单": parentName;
	$('#addParentName').val(addParentName);
	$("#addMenuModal").modal("show");
}
//新增页面设置ztree setting
var addsetting = {
	view:{selectedMulti:false},
	data: {
		simpleData: {
			enable: true,
			idKey: "menuId",
			pIdKey: "parentId",
			name: "menuName",
			rootPId: 0
		}},
	callback:{onClick:addSetParent
	}
};
/*新增菜单modal加载上级菜单展示tree*/
function addListParent() {
 // var allTableData = $("#dataGrid").bootstrapTable('getData');//获取表格的所有内容行
 // var zNodes = new Array(allTableData.length);
 var zNodes = new Array();
 $.ajax({
		type : 'POST',
		url : window.serviceIP+ '/menu/listFolders',
		dataType: "json",
		async:false,
		success : function(result){
			for( i=0;i<result.length;i++)
				{
					zNodes[i]={menuId:result[i].menuId, parentId:result[i].parentId, name:result[i].menuName };	
				}
				$.fn.zTree.init($("#treeDemo"), addsetting, zNodes);
				$("#listParent").modal('show');
		}
	});
}
/*新增页面设置上级菜单方法*/
function addSetParent(event, treeId, treeNode){
	var treeId = treeNode.menuId;
	var treeName = treeNode.name;
	$("#listParent").modal('hide');
	// alert($("#addParentId").val());
	// alert(treeId);
	$("#addParentId").val(treeId);
	$("#addParentName").val(treeName);
}
/**
 * 提交新增调用方法
 */
function addMenu(){
	var param = $("#form-menu-add").serializeArray();
	// $("#addParentId").val();
	// $("#addParentName").val();
	// alert($("#addParentId").val());
	//设为disable则无法获取
	$.ajax({
		url:window.serviceIP + "/menu/addMenu",
		method:"post",
		data:param,
		dataType:"json",
		success:function(data){
			// alert(data.status);
			if(data.status=="1"){
				alert("新增成功");
				$("#addMenuModal").modal("hide");
				// initDataGrid();
				$("#dataGrid").bootstrapTable("refresh");
				
			}
		},
		error:function(data){
			alert("出现错误！");
		}
	});
}
/**
修改菜单页面加载方法
*/
function loadEditMenu(menuId){
	// alert(menuId);
	$.ajax({
		url:window.serviceIP + "/menu/listByMenuId?menuId="+menuId,
		method:"POST",
		// data:param,
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		dataType:"json",
		success:function(data){
			// var data1 = eval("(" + data.data + ")");
			var data1 = JSON.parse(data.data); 
			// alert(data1[0].menuId);
			if(data.status=="1"){
				// var newObj = JSON.parse(JSON.stringify(obj)); 
				// alert(data1);
				$("#editMenuId").attr("value", data1[0].menuId);
				$("#editParentId").attr("value", data1[0].parentId);
				var parentName = ( data1[0].parentName==null|| data1[0].parentName=="")?"主菜单": data1[0].parentName;
				$('#editParentName').val(parentName);
				$("#editMenuName").attr("value", data1[0].menuName);
				$("#editUrl").attr("value", data1[0].url);
				$("#editIcon").attr("value", data1[0].icon);
				if(data1[0].menuType!=null&&data1[0].menuType!=""){
					if(data1[0].menuType=="M"){$("#editMulu").iCheck('check');}
					if(data1[0].menuType=="C"){$("#editCaidan").iCheck('check');}
				}
				var vflag = data1[0].visible=="1"?true:false;
				if(vflag){$("#editXianshi").iCheck('check');}
				if(!vflag){$("#editYincang").iCheck('check');}
				
				$("#editIconFlag").attr("value", "edit");
				$("#editMenuModal").modal("show");
			}
		},
		error:function(data){
			alert("出现未知错误");
		}
	});
}
//修改页面设置ztree setting
var editsetting = {
	view:{selectedMulti:false},
	data: {
		simpleData: {
			enable: true,
			idKey: "menuId",
			pIdKey: "parentId",
			name: "menuName",
			rootPId: 0
		}},
	callback:{onClick:editSetParent
	}
};

/*修改菜单modal加载上级菜单展示tree*/
function editListParent() {
 // var allTableData = $("#dataGrid").bootstrapTable('getData');//获取表格的所有内容行
 // var zNodes = new Array(allTableData.length);
 var zNodes = new Array();
 $.ajax({
		type : 'POST',
		url : window.serviceIP+ '/menu/listFolders',
		dataType: "json",
		async:false,
		success : function(result){
			for( i=0;i<result.length;i++)
				{
					zNodes[i]={menuId:result[i].menuId, parentId:result[i].parentId, name:result[i].menuName };	
				}
				$.fn.zTree.init($("#treeDemo"), editsetting, zNodes);
				$("#listParent").modal('show');
		}
	});
}
	
/*edit设置上级菜单方法*/
function editSetParent(event, treeId, treeNode){
	var treeId = treeNode.menuId;
	var treeName = treeNode.name;
	//获取自己的menuId与后台接收到的ParentId比较,若一致则提示用户
	var menuId = $("#editMenuId").val();
	if(menuId==treeId){
		alert("不能将自己设置为上级菜单");
		return;
	}
	$("#listParent").modal('hide');
	$("#editParentId").val(treeId);
	$("#editParentName").val(treeName);
}
/**
 * 提交修改调用方法
 */
function updateMenu(){
	var param = $("#form-menu-edit").serializeArray();
	// alert(param);
	//设为disable则无法获取
	$.ajax({
		url:window.serviceIP + "/menu/updateMenu",
		method:"post",
		data:param,
		dataType:"json",
		success:function(data){
			// alert(data.status);
			if(data.status=="1"){
				alert("修改成功");
				$("#editMenuModal").modal("hide");
				initDataGrid();
				
			}
		},
		error:function(data){
			alert("wrong");
		}
	});
}
//确认删除提示
function confirmDel(menuId){
	$("#delMenuId").val(menuId);
	// alert();
	$("#confirmDelModal").modal();
}
/**
 * 删除菜单方法
 */
function deleteMenu(){
	$("#confirmDelModal").modal('hide');
	var menuId = $("#delMenuId").val();
	// alert(menuId);
	var allTableData = $("#dataGrid").bootstrapTable('getData');
	var len = allTableData.length;
	// alert(len);
	// alert(allTableData[0].parentId);
	for(var i=0;i<len;i++){
		var pid = allTableData[i].parentId;
		if(menuId==pid){
			alert('该菜单下存在子菜单，请先删除子菜单！');
			return ;
		}
	}
	$.ajax({
		url:window.serviceIP + "/menu/deleteMenu?menuId="+menuId,
		dataType:"json",
		traditional: true,//属性在这里设置
		method:"post",
// 			data:{
// 				"ids":ids
// 			},
		success:function(data){
			// alert(data.state);
			if(data.status == '1'){
				alert('删除成功');
				// initDataGrid();
				$("#dataGrid").bootstrapTable("refresh");
			}
		},
		error:function(data){
			alert("出现错误！");
		}
	});
}

$(function() {
		$("input[name='icon']").focus(function() {
			$(".icon-drop").show();
		});
		$("#form-menu-add").click(function(event) {
			var obj = event.srcElement || event.target;
			if (!$(obj).is("input[name='icon']")) {
				$(".icon-drop").hide();
			}
		});
		$('input').on('ifChecked', function(event){
			var menuType = $(event.target).val();
			if (menuType == "M") {
				$("#addUrl").parents(".form-group").hide();
				// $("#perms").parents(".form-group").hide();
				$("#addIcon").parents(".form-group").show();
			} else if (menuType == "C") {
				$("#addUrl").parents(".form-group").show();
				// $("#perms").parents(".form-group").show();
				$("#addIcon").parents(".form-group").hide();
			} else if (menuType == "F") {
				$("#addUrl").parents(".form-group").hide();
				// $("#perms").parents(".form-group").show();
				$("#addIcon").parents(".form-group").hide();
			}
			// alert('d');
			if (menuType == "M") {
				$("#editUrl").parents(".form-group").hide();
				// $("#perms").parents(".form-group").hide();
				$("#editIcon").parents(".form-group").show();
			} else if (menuType == "C") {
				$("#editUrl").parents(".form-group").show();
				// $("#perms").parents(".form-group").show();
				$("#editIcon").parents(".form-group").hide();
			} else if (menuType == "F") {
				$("#editUrl").parents(".form-group").hide();
				// $("#perms").parents(".form-group").show();
				$("#editIcon").parents(".form-group").hide();
			}
		});
	});
//加载图标html
$(document).ready(function(){
  $("#addIcon").click(function(){
    $('#addIconDiv').load("../../../pages/system/menu/icon.html");
  });
	$("#editIcon").click(function(){
		$('#editIconDiv').load("../../../pages/system/menu/icon.html");
	});
	//初始化icheck显示
	$('.i-checks').iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green',
	});
})
//关闭addmodal清空数据
$(function() {
	$('#addMenuModal').on('hidden.bs.modal',
		function() {
			$(this).removeData("bs.modal");
			document.getElementById("form-menu-add").reset();
		})
});

//关闭editmodal清空数据
$(function() {
	$('#editMenuModal').on('hidden.bs.modal',
		function() {
			$("#editIconFlag").val("");
			$(this).removeData("bs.modal");
			// document.getElementById("form-menu-edit").reset();
		})
});

// function itemOnclick(target){
// 	// alert('dianle');
// 	//找到当前节点id
// 	var nodeid = $(target).attr('data-nodeid');
// 	var tree = $('#tree');
// 	//获取当前节点对象
// 	var node = tree.treeview('getNode', nodeid);
// 	// alert(nodeid);
// 	if(node.state.expanded){ 
// 	    //处于展开状态则折叠
// 	    tree.treeview('collapseNode', node.nodeId);  
// 	} else {
// 	    //展开
// 	    tree.treeview('expandNode', node.nodeId);
// 	}
// }

