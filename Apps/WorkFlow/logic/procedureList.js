define(["../js/func"], function() {
	function pageLogic(config) {
		this.pageviewInstance = config.pageview;
		//获取到url参数
		this.urlParams = this.pageviewInstance.params;
		this.userCode=localStorage.getItem("userCode");
		this.procedureName = localStorage.getItem("procedureName");

		this.selectedSeg = "今日";
		var strToday = getDate(); //当日 
		var strYesterday=getDate(-1);//昨天
		var strMonday = getMonday('s', 0);
		var strSunday = getMonday('e', 0);
		this.strTodayTimeStart = strToday + " 00:00:00";
		this.strTodayTimeEnd = strToday + " 23:59:59";
		this.strMondayTimeStart = strMonday + " 00:00:00";
		this.strSundayTimeEnd = strSunday + " 23:59:59";
		this.strYesterdayTimeEnd=strYesterday+ " 23:59:59";
		this.strYesterdayTimeStart="1900-1-1";
		

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
			//this.pageviewInstance.goBack();
			var param={           	
            	$$pn:this.urlParams.ptype
            };
		    this.pageviewInstance.replaceGo("mainpage",param);
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
			var beginDate="";
			var endDate="";
			var funcname="";
			if(this.urlParams.ptype=="mytodo"){
				funcname="GetWorkFlowActListNotSignedPaged"//取待办 
			}
			if(this.urlParams.ptype=="mydoing"){
				funcname="GetWorkFlowActListSignedPaged"//取在办
			}
			if(this.urlParams.ptype=="mydone"){
				funcname="GetWorkFlowActListDonePaged"//取已办
			}
			var fre = {
				userCode: this.userCode,
				procedureName: this.procedureName,
				beginDate:this.strTodayTimeStart,
				endDate:this.strTodayTimeEnd,
				page:1,
				pageCount:5
			};
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
			
			var result = params.data;
			if(!result.result) {
				return false;
			}
			
			return result.data.listdata;
		},
		listview_rowclick: function(sender) {
			sender.select();
			
			var param = {				
				actCode: sender.datasource.actCode,				
				ptype:this.urlParams.ptype
			};
			this.pageviewInstance.replaceGo("procedureInfo",param);
		},
		
		segment_change: function(sender, params) {

			this.selectedSeg = params.item.datasource.title;
			//this.listview.empty();
			var strBeginDate="";
			var strEndDate="";
			if(this.selectedSeg == "今日"){
				strBeginDate=this.strTodayTimeStart;
				strEndDate=this.strTodayTimeEnd;
			}
			if(this.selectedSeg == "本周"){
				strBeginDate=this.strMondayTimeStart;
				strEndDate=this.strSundayTimeEnd;
			}
			if(this.selectedSeg == "更早"){
				strBeginDate=this.strYesterdayTimeStart;
				strEndDate=this.strYesterdayTimeEnd;
			}
			var fre = {				
				beginDate:strBeginDate,
				endDate:strEndDate
				
			};
			this.listview.setAjaxConfigParams(fre);
			
			this.page_content_reload();
		}
	};
	return pageLogic;
});