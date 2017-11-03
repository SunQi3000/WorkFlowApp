define(["../js/func"], function() {
	function pageLogic(config) {
		this.pageviewInstance = config.pageview;
		//获取到url参数
		this.urlParams = this.pageviewInstance.params;
		this.procedureName = decodeURI(this.urlParams.procedureName);

		this.selectedSeg = "今日";
		

	}
	pageLogic.prototype = {

		header_title_init: function(sender, params) {
			this.header_title = sender;
			this.header_title.config.text = this.procedureName;
		},
		
		segment_item_init: function(sender, params) {
			//alert(sender.datasource.title);
			sender.config.text = sender.datasource.title;
			sender.config.font = sender.datasource.icon;
		},
		backIcon_click: function(sender, params) {
			this.pageviewInstance.goBack();
		},
		right_icon_click: function(sender, params) {
			this.page_content_reload();
		},
		//page_content 组件声明事件 让该组件具备下拉刷新的功能
		page_content_pulltorefresh: function(sender, params) {
			//刷新的时候执行加载第一页的数据
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
			this.listview.empty();
			this.listview.reload();
		},
		//列表初始化 保留列表对象的引用
		listview_init: function(sender) {
			this.listview = sender;
			var fre = {
				userCode: this.urlParams.userCode,
				procedureName: decodeURI(this.urlParams.procedureName)
			};
			var funcname="";
			if(this.urlParams.ptype=="mytodo"){
				funcname="GetWorkFlowActListNotSigned"//取待办 
			}
			if(this.urlParams.ptype=="mydoing"){
				funcname="GetWorkFlowActListSigned"//取在办
			}
			if(this.urlParams.ptype=="mydone"){
				funcname="GetWorkFlowActListDone"//取已办
			}
			this.listview.ajaxConfig.url=funcname;
			this.listview.setAjaxConfigParams(fre);
		},

		//列表实例话完成后 调用开始加载数据
		listview_didmount: function(sender) {
			sender.loadFirstPageData();
		},
		//列表返回数据的时候 如果获取成功则返回数据中的数组
		//失败的时候则直接return false;界面会显示重新加载的界面
		listview_parsedata: function(sender, params) {

			var strToday = getDate(); //当日 		
			var strMonday = getMonday('s', 0);
			var strSunday = getMonday('e', 0);
			var strTodayTimeStart = strToday + " 00:00:00";
			var strTodayTimeEnd = strToday + " 23:59:59";
			var strMondayTimeStart = strMonday + " 00:00:00";
			var strSundayTimeEnd = strSunday + " 23:59:59";

			var result = params.data;
			if(!result.result) {
				return false;
			}
			if(this.selectedSeg == "今日") {
				result.data = result.data.filter(function(item) {
					return(item.fromDate >= strTodayTimeStart && item.fromDate <= strTodayTimeEnd);
				});
			}
			if(this.selectedSeg == "本周") {
				result.data = result.data.filter(function(item) {
					return(item.fromDate >= strMondayTimeStart && item.fromDate <= strSundayTimeEnd);
				});
			}
			if(this.selectedSeg == "更早") {
				result.data = result.data.filter(function(item) {
					return item.fromDate < strTodayTimeStart;
				});
			}
			return result.data;
		},
		listview_rowclick: function(sender) {
			sender.select();
			//alert("ddd");
			var param = {
				userCode: this.urlParams.userCode,
				actCode: sender.datasource.actCode
			};
			this.pageviewInstance.go("procedureInfo",param);
		},
		
		segment_change: function(sender, params) {

			this.selectedSeg = params.item.datasource.title;
			this.listview.empty();
			this.page_content_reload();
		}
	};
	return pageLogic;
});