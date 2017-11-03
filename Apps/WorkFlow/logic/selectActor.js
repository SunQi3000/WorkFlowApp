define(["../common/data"], function(DemoData) {
	var actorData = {};

	function pageLogic(config) {
		this.pageviewInstance = config.pageview;
		//获取到url参数
		this.urlParams = this.pageviewInstance.params;
		this.shParams = this.pageviewInstance.showPageParams;
		//LoadData(this.pageviewInstance,this.urlParams);
	}
	pageLogic.prototype = {
		backIcon_click: function() {
			this.pageviewInstance.goBack();
		},
		header_right_text_click:function() {
			var selectedRows=this.listview.selectedRows;			
			var selectedName="";
			var selectedCode="";
			for(var i=0;i<selectedRows.length;i++){
				var rowdata=selectedRows[i].datasource;
				if(selectedName.length>0){
					selectedName+=";";
				}
				selectedName+=rowdata.userName+"("+rowdata.taskActorName+")";
				if(selectedCode.length>0){
					selectedCode+=";";
				}
				selectedCode+=rowdata.userCode+","+rowdata.taskActorCode;				
			}
			//this.pageviewInstance.ownerPage.plugin.taskActor_value.text=selectedName;
			
			this.pageviewInstance.ownerPage.delegate("taskActor_value", function(target) {
				target.setText(selectedName);
			});
			this.pageviewInstance.close();
		},

		//page_content 组件声明事件 让该组件具备下拉刷新的功能
		page_content_pulltorefresh: function(sender, params) {
			//刷新的时候执行加载第一页的数据
			var _this = this;

			this.listview.loadFirstPageData();

		},
		//page_content 组件声明事件 让该组件具备上拉加载更多的功能
		page_content_loadmore: function(sender, params) {
			//上拉
			this.listview.loadNextPageData();
		},
		page_content_reload: function(sender) {
			//当网络失败的时候 显示错误信息  提供再次加载的时机
			//重新调用列表重新加载方法
			this.listview.reload();
		},
		listview_afterload: function(sender, params) {
			var grid = this.listview;
			for(var key in grid.groups) {
				var group = grid.groups[key];
				for(var i = 0, j = group.rows.length; i < j; i++) {
					if(group.rows[i].datasource.selected) {
						group.rows[i].select();
					}
				}
			}
			// if(params.isFirstLoad){
			this.pageviewInstance.delegate("header_right_text", function(target) {
				target.setText(sender.selectedRows.length);
			});
			// }
		},
		//列表初始化 保留列表对象的引用
		listview_init: function(sender) {
			this.listview = sender;
			//this.listview.groupBy("taskActorCode");
			this.listview.setAjaxConfigParams({
				userCode: this.shParams.userCode,
				actCode: this.shParams.actCode,
				routerCode: this.shParams.routerCode,
			});

		},
		//列表实例话完成后 调用开始加载数据
		listview_didmount: function(sender) {
			sender.loadFirstPageData();
		},
		//列表返回数据的时候 如果获取成功则返回数据中的数组
		//失败的时候则直接return false;界面会显示重新加载的界面
		listview_parsedata: function(sender, params) {
			var result = params.data;
			if(!result.result) {
				return false;
			}
			var returnObj = [];
			for(var i = 0; i < result.data.length; i++) {
				if(!result.data[i].disabled) {
					var taskActorCode = result.data[i].taskActorCode;
					var taskActorName = result.data[i].taskActorName;
					var multiSelect = "s";
					if(result.data[i].multiSelect) {
						multiSelect = "m";
					}
					var UsersList = result.data[i].users;
					for(var j = 0; j < UsersList.length; j++) {
						returnObj.push({
							"id": taskActorCode.toString() + '_' + UsersList[j].userCode.toString(),
							"taskActorCode": taskActorCode,
							"taskActorName": taskActorName,
							"multiSelect": multiSelect,
							"userCode": UsersList[j].userCode,
							"userName": UsersList[j].userName,
							"selected": UsersList[j].selected
						});
					}
					var testSelect = 'm';
					if(result.data[i].multiSelect) {
						testSelect = "s";
					}
					for(var j = 0; j < UsersList.length; j++) {
						returnObj.push({
							"id": taskActorCode.toString() + '_' + UsersList[j].userCode.toString(),
							"taskActorCode": taskActorCode + 't',
							"taskActorName": taskActorName + 't',
							"multiSelect": testSelect,
							"userCode": UsersList[j].userCode,
							"userName": UsersList[j].userName,
							"selected": !UsersList[j].selected
						});
					}
				}
			}
			return returnObj;
		},
		listview_rowclick: function(sender) {

			var canSelect = true;
			var groupObj = sender.parent;
			var listObj = groupObj.parent;

			var multiSelect = groupObj.groupHeader.datasource.multiSelect;
			var groupCode = groupObj.groupValue;
			if(multiSelect == "s") {
				var found = listObj.selectedRows.filter(function(item) {
					return(item.datasource.taskActorCode === groupCode);
				});
				if(found.length > 0) {
					canSelect = false;
				} else {
					canSelect = true;
				}
				if(found.length==1){
					if(found[0].datasource.id==sender.datasource.id){
						canSelect = true;
					}
					
				}
			}
			if(canSelect) {
				sender.select();
			}			
			this.pageviewInstance.delegate("header_right_text", function(target) {
				target.setText(listObj.selectedRows.length);
			});
		},
	};

	return pageLogic;
});