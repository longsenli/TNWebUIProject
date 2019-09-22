function getSelfProductionRecord() {
	var columnsArray = [];
//	columnsArray.push({
//		checkbox: true
//	});

	columnsArray.push({
		width: 300,
		"title": "姓名",
		"field": "inputer"
	});
	columnsArray.push({
		width: 300,
		"title": "物料型号",
		"field": "materialNameInfo"
	});
	columnsArray.push({
		width: 300,
		"title": "工单号",
		"field": "subOrderID"
	});

	columnsArray.push({
		width: 300,
		"title": "产量",
		"field": "number"
	});
	columnsArray.push({
		width: 300,
		"title": "产量工资",
		"field": "wage"
	});
	columnsArray.push({
		width: 300,
		"title": "完成时间",
		"field": "inputTime"
	});

	var startTime = new Date();

	var timeStr = " 07:00:00";

	var today = new Date();
	if(today.getHours() < 7) {

		startTime.setDate(startTime.getDate() - 1)
		timeStr = " 19:00:00"
	} else if(today.getHours() > 18) {
		timeStr = " 19:00:00"
	}

	var urlStr = window.serviceIP + "/api/material/getShelfProductionRecord?staffID=" + localStorage.userID +
		"&startTime=" + startTime.format("yyyy-MM-dd") + timeStr + "&endTime=" + today.format("yyyy-MM-dd hh:mm:ss");

	$.ajax({
		url: urlStr,
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar',
					singleSelect: false,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
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
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

function getProdutionWageDetail() {
	var columnsArray = [];
//	columnsArray.push({
//		checkbox: true
//	});

	columnsArray.push({

		"title": "日期",
		"field": "closingDate"
	});
	columnsArray.push({

		"title": "员工",
		"field": "staffName"
	});

	columnsArray.push({

		"title": "物料型号",
		"field": "materialName"
	});
	columnsArray.push({

		"title": "产量",
		"field": "productionNumber"
	});
	columnsArray.push({

		"title": "工资",
		"field": "wage"
	});
	//	columnsArray.push({
	//
	//		"title": "单价",
	//		"field": "unitPrice"
	//	});

	var urlStr = window.serviceIP + "/api/wage/getProductionWageDetail?staffName=" +
		localStorage.userID +
		"&plantID=" + "-1" +
		"&processID=" + "-1" +
		"&startTime=" + document.getElementById("startTime").value +
		"&endTime=" + document.getElementById("endTime").value;

	$.ajax({
		url: urlStr,
		type: "GET",

		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				pageNum = 1;
				$("#refreshID").html('stop');
				var models = eval("(" + dataRes.data + ")");
				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
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
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}




<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/workOrder/app_finishWorkOrder.html" name="扫码入库">
						<span class="mui-icon"><svg class="icon" aria-hidden="true">
						  <use xlink:href="#icon-saoyisao1"></use>
						</svg></span>
						<!--<div class="mui-media-body"><font size="1" >生产工单管理</font></div>-->
					</a>扫码入库</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/workOrder/app_workOrderUseMaterial.html" name="扫码投料">
						<span class="mui-icon"><svg class="icon" aria-hidden="true">
						  <use xlink:href="#icon-saoyisao"></use>
						</svg></span>
						<!--<div class="mui-media-body"><font size="1" >生产工单管理</font></div>-->
					</a>扫码投料</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/workOrder/app_plasticUsedRecord.html" name="底壳扫码">
						<span class="mui-icon">
					        	<svg class="icon" aria-hidden="true">
					        	  <use xlink:href="#icon-saoma2"></use>
					        	</svg>
					        </span>
					</a>底壳扫码</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/workOrder/app_materialScrapManage.html" name="物料报废管理">
						<span class="mui-icon">
								<svg class="icon" aria-hidden="true">
								  <use xlink:href="#icon-RectangleCopy"></use>
								</svg>
							</span>
						<!--<div class="mui-media-body"><font size="1" >物料报废管理</font></div>-->
					</a>物料报废管理</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/workOrder/app_grantMaterialManage.html" name="物料发放管理">
						<span class="mui-icon">
		                    	<svg class="icon" aria-hidden="true">
		                    	  <use xlink:href="#icon-shengchanliucheng"></use>
		                    	</svg>
		                    </span>
						<!--<div class="mui-media-body">物料发放管理</div>-->
					</a>物料发放管理</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/workOrder/app_pushinDryingKiln.html" name="干燥窑物料管理">
						<span class="mui-icon">
								<svg class="icon" aria-hidden="true">
								  <use xlink:href="#icon-hongbei"></use>
								</svg>
							</span>
						<!--<div class="mui-media-body">干燥窑物料管理</div>-->
					</a>干燥窑物料管理</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/workOrder/app_solidificationRecordManage.html" name="固化室管理">
						<span class="mui-icon">
		                    	<svg class="icon" aria-hidden="true">
		                    	  <use xlink:href="#icon-home2"></use>
		                    	</svg>
		                    </span>
						<!--<div class="mui-media-body">固化室管理</div>-->
					</a>固化室管理</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/workOrder/pda_solidificationRecordManage.html" name="PDA固化室">
						<span class="mui-icon">
		                    	<svg class="icon" aria-hidden="true">
		                    	  <use xlink:href="#icon-PDA"></use>
		                    	</svg>
		                    </span>
						<!--<div class="mui-media-body">PDA固化室</div>-->
					</a>PDA固化室</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/chargePackManage/app_chargingRackRecord.html" name="充电流程管理">
						<span class="mui-icon">
					         	<svg class="icon" aria-hidden="true">
					         	  <use xlink:href="#icon--chongdianzhong"></use>
					         	</svg>
					         </span>
						<!--<div class="mui-media-body">充电流程管理</div>-->
					</a>充电流程管理</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/chargePackManage/app_tidyBatteryRecord.html" name="整理包装管理">
						<span class="mui-icon">
					         	<svg class="icon" aria-hidden="true">
					         	  <use xlink:href="#icon-baozhuang1"></use>
					         	</svg>
					         </span>
						<!--<div class="mui-media-body">整理包装管理</div>-->
					</a>整理包装管理</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/workOrder/new_app_onlineMaterialRecord.html" name="线边仓管理">
						<span class="mui-icon ">
								<svg class="icon" aria-hidden="true">
								  <use xlink:href="#icon-wodecangku"></use>
								</svg>
								</span>
					</a>线边仓管理</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/workOrder/new_app_productionStatisticsTelephone.html" name="物料库存查询">
						<span class="mui-icon">
								<svg class="icon" aria-hidden="true">
								  <use xlink:href="#icon-chakankucun"></use>
								</svg>
							</span>

					</a>物料库存查询</li>

				<!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a id="../pages/workOrder/new_app_unqualifiedMaterialReturn.html" name="物料红冲登记">
		                    <span class="mui-icon">
		                    	<svg class="icon" aria-hidden="true">
		                    	  <use xlink:href="#icon-icon_shoufukuanhongchongshenqing"></use>
		                    	</svg>
		                    </span>
		            </a>物料红冲登记</li>-->

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/dashboard/app_queryDailyProduction.html" name="生产信息查询">
						<span class="mui-icon">
		                    	<svg class="icon" aria-hidden="true">
		                    	  <use xlink:href="#icon-ico_wupinguanli_kucunchaxun"></use>
		                    	</svg>
		                    </span>
						<!--<div class="mui-media-body">生产信息查询</div>-->
					</a>生产信息查询</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/safetyAndEPManage/app_hiddenDangerReport.html" name="隐患上报">
						<span class="mui-icon">
					         	<svg class="icon" aria-hidden="true">
					         	  <use xlink:href="#icon-anquanyinhuan"></use>
					         	</svg>
					         </span>
						<!--<div class="mui-media-body">安全隐患排查</div>-->
					</a>隐患上报</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/safetyAndEPManage/app_hiddenDangerDeal.html" name="隐患处理">
						<span class="mui-icon">
					         	<svg class="icon" aria-hidden="true">
					         	  <use xlink:href="#icon-yinhuandian"></use>
					         	</svg>
					         </span>
						<!--<div class="mui-media-body">安全隐患排查</div>-->
					</a>隐患处理</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/safetyAndEPManage/app_regularPerambulation.html" name="定点巡查">
						<span class="mui-icon">
					         	<svg class="icon" aria-hidden="true">
					         	  <use xlink:href="#icon-yinhuanyifadian"></use>
					         	</svg>
					         </span>
						<!--<div class="mui-media-body">安全隐患排查</div>-->
					</a>定点巡查</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/contentManage/app_publishIdea.html" name="心声社区">
						<span class="mui-icon">
					         	<svg class="icon" aria-hidden="true">
					         	  <use xlink:href="#icon-_shequluntan"></use>
					         	</svg>
					         </span>
						<!--<div class="mui-media-body">心声社区</div>-->
					</a>心声社区
				</li> 
 
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/app_selectedSelfFunction.html" name="设置自选功能">
						<span class="mui-icon">
					         	<svg class="icon" aria-hidden="true">
					         	  <use xlink:href="#icon-shezhi"></use>
					         	</svg>
					         </span>
						<!--<div class="mui-media-body">设置自选功能</div>-->
					</a>设置自选功能</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a id="../pages/rights/new_app_changepassword.html" name="修改我的密码">
						<span class="mui-icon">
					         	<svg class="icon" aria-hidden="true">
					         	  <use xlink:href="#icon-mima"></use>
					         	</svg>
					         </span>
						<!--<div class="mui-media-body">修改我的密码</div>-->
					</a>修改我的密码</li>