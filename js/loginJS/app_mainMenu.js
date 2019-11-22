function initMenu() {

	$(':button').each(function(i) {
		if($(this).html() != 'X') {
			if(localStorage.getItem('unselectedMenu').indexOf($(this).html().trim()) >= 0)
				$(this).css('display', 'none');
			else
				$(this).css('display', 'block');
		}
	});
}

function saveMyMenu() {
	var tableData = $("#table").bootstrapTable('getData');
	var selectedData = $("#table").bootstrapTable('getSelections');
	var selectedStr = "";
	for(var i = 0; i < selectedData.length; i++) {
		selectedStr += selectedData[i].text + "###";
	}
	selectedStr += "设置自选功能###"
	var unselectedMenu = "";
	for(var i = 0; i < tableData.length; i++) {
		if(selectedStr.indexOf(tableData[i].text + "##") < 0)
			unselectedMenu += tableData[i].text + "###";
	}
	localStorage.setItem('unselectedMenu', unselectedMenu);
	closeMyMenu();
	//console.log(localStorage.getItem('unselectedMenu'))
	initMenu();
}

function closeMyMenu() {
	$('#mySelectedMenuModel').modal('hide');
}

function suborderManageIndex() {
	window.location.href = "../pages/workOrder/app_subOrderTelephone.html";
}

function orderScrapIndex() {
	window.location.href = "../pages/workOrder/app_workOrderManageTelephone.html";
}

function scanOrderScrapIndex() {
	window.location.href = "../pages/workOrder/app_scrapInfoTelephone.html";
}

function batteryRepairIndex() {
	window.location.href = "../pages/semifinishedBattery/batteryRepairTelephone.html";
}

function batteryScrapIndex() {
	window.location.href = "../pages/semifinishedBattery/batteryScrapTelephone.html";
}

function batteryFlowIndex() {
	window.location.href = "../pages/semifinishedBattery/batteryBorrowReturnTelephone.html";
}

function materialStatisIndex() {
	window.location.href = "../pages/workOrder/productionStatisticsTelephone.html";
}

function selectedSelfFunction() {

	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "功能模块",
		"field": "text"
	});
	columnsArray.push({
		"title": "id",
		"field": "id",
		visible: false
	});

	var ary = new Array()
	$(':button').each(function(i) {

		if($(this).attr('id') && $(this).attr('id').toString().indexOf("html") >= 0)
		//if('X##保存##关闭#'.indexOf($(this).html().trim()) < 0) 
		{
			//alert($(this).html())
			var mapVal = {};
			mapVal["text"] = $(this).html();
			mapVal["id"] = $(this).attr('id');
			ary.push(mapVal)
		}

		//alert(i + "==" + $(this).html());

	});
	$('#table').bootstrapTable('destroy').bootstrapTable({
		data: ary,
		//toolbar: '#toolbar1',
		singleSelect: false,
		clickToSelect: true,
		//sortName: "recordTime",
		sortOrder: "desc",
		pageSize: 100,
		pageNumber: 1,
		pageList: "[10, 25, 50, 100, All]",
		showFooter: false,
		showPaginationSwitch: false,
		//showToggle: true, 
		//showRefresh: true,
		//showColumns: true,
		//search: true,
		pagination: true,
		columns: columnsArray
	});
	for(var i = 0; i < ary.length; i++) {
		if(localStorage.getItem('unselectedMenu').indexOf(ary[i].text) < 0)
			$('#table').bootstrapTable('check', i);
	}
	$('#mySelectedMenuModel').modal('show');
}