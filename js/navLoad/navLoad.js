function initSystemMenu() {
	var isFirstMenu;
	var userName = $.cookie('username');
	var userID = $.cookie('userID');
	//alert(userName + userID);
	$.ajax({
		type: "Post",
		url: window.serviceIP + "/menu/getUserMenuList?userID="+userID,
		dataType: "json",
		success: function(result) {
			// alert(result.data);
			var res = eval("(" + result.data + ")");
			// alert(res[0].nodes);
			var showlist = $("<ul class=\"sidebar-menu\"></ul>");

			$("<li><a href=\"index.html\"><i class=\"fa fa-dashboard fa-fw\" ></i> 首页</a></li>").appendTo(showlist);
			isFirstMenu = res.length;
			// alert(res);
			showall(res[0].nodes, showlist);
			// alert(showlist);
			// console.log(showlist)
			$("#ajax-side-menu").attr("style", "display:true;");
			$("#side-menu").attr("style", "display:none;");
			//添加雷立mes超连接
			$("<li><a href=\"http://192.168.82.253\"><i class=\"fa fa-mail-forward\" ></i> 镭立MES链接</a></li>").appendTo(showlist);
			// side-menu
			$("#ajax-load-menu").append(showlist);
		},
		error: function() {
			alert("菜单加载失败！")
		}
	});

	function showall(menu_list, parent) {
		// alert(menu_list[0].nodes);
		// alert(parent);
		for(var menu in menu_list) {
			// alert(menu_list[menu].nodes.length);
			if(menu_list[menu].nodes.length > 0) {
				var li = $("<li></li>");
				if(isFirstMenu == 0) {
					li = $("<li></li>");
				} else {
					li = $("<li class=\"treeview\"></li>");
					isFirstMenu = isFirstMenu - 1;
				}
				// alert(menu_list[menu].icon);
				$(li).append("<a href=\"#\"><i class='" + menu_list[menu].icon + "'></i> <span>" + menu_list[menu].text + "</span><i class=\"fa fa-angle-right pull-right\"></i></a>");
				var nextParent = $("<ul class=\"treeview-menu\"></ul>");
				$(nextParent).appendTo(li);
				$(li).appendTo(parent);
				showall(menu_list[menu].nodes, nextParent);
			} else {
				// alert(menu_list[menu].href);
				$("<li><a href=\"#\" onclick=\"showTab('" + menu_list[menu].text + "','" + menu_list[menu].href + "')\"><i class=\"fa fa-circle-o\"></i>" +
					menu_list[menu].text +
					"</a></li>").appendTo(parent);
			}
		}
	}
	// $("#div_menu").append("<li><a href=\"index.html\"><i class=\"fa fa-dashboard fa-fw\"></i> 首页</a></li>")

	// "<a href=\"javascript:;\" onclick=\"addTab('" + obj.menuName + "','" + obj.url + "')\" >" + obj.menuName + "</a>";

};

function showTab(menuName, url) {
	document.getElementById("container-page-text").innerHTML = menuName;
	$("#containerHTML").empty();
	// alert(window.netServiceIP+url);
	$("#containerHTML").load(window.webUiService + url);
}