define([], function() {

	function pageLogic(config) {
		this.pageviewInstance = config.pageview;
		this.urlParams = this.pageviewInstance.params;
		this.selectedSeg = "业务信息";
		this.pdfFileUrl = "";
		this.auditResult = "0"; //流程审批结果的显示项目:0-visible false,1-Approve&Reject

		//var params ={userCode: "100000",actCode:"114024"};  

		this.Button_signIn = {
			title: "签收",
			func: "WorkFlowSignIn",
			icon: "FontAwesome_f040",
			color: "rgb(253,210,64)"
		};
		this.Button_send = {
			title: "发送",
			func: "WorkFlowSend",
			icon: "FontAwesome_f1d8",
			color: "rgb(252,167,97)"
		};
		this.Button_taskFinish = {
			title: "完成",
			func: "WorkFlowTaskFinish",
			icon: "FontAwesome_f20a",
			color: "rgb(0,165,223)"
		};
		this.Button_finish = {
			title: "结束",
			func: "WorkFlowFinish",
			icon: "FontAwesome_f046",
			color: "rgb(0,256,0)"
		};
		this.Button_back = {
			title: "退回",
			func: "WorkFlowBack",
			icon: "FontAwesome_f112",
			color: "rgb(252,116,122)"
		};
		
		//todo：无法显示各种类型文件的附件，隐去该功能
		this.pageviewInstance.delegate("attachment_view", function(target) {
					target.hide();
				});
	}

	function LoadData(sender) {
		var sendParams = {
			url: 'GetWorkFlowPage',
			dataType: 'jsonp',
			contentType: "application/json;charset=utf-8",
			type: 'post',
			data: {
				userCode: sender.urlParams.userCode,
				actCode: sender.urlParams.actCode
			},
			success: function(data) {
				if(data.result) {
					sender.pdfFileUrl = data.data.pdfUrl.toString();
				} else {
					alert(data.msg);
				}
				sender.pageviewInstance.hideLoading(true);
			},
			error: function(data) {
				_this.pageviewInstance.hideLoading(true);
			}
		};
		sender.pageviewInstance.ajax(sendParams);
		sender.pageviewInstance.showLoading({
			text: "正在加载"
		});
	};
	
	pageLogic.prototype = {
		onPageLoad: function() {
			LoadData(this);
		},
		backIcon_click: function(sender, params) {
			//this.pageviewInstance.goBack();
			var param = {
				userCode: this.urlParams.userCode,
				procedureName: this.urlParams.procedureName,
				ptype: this.urlParams.ptype
			};
			this.pageviewInstance.replaceGo("procedureList", param);
		},
		header_title_init: function(sender, params) {
			this.header_title = sender;
			this.header_title.config.text = this.procedureName;
		},
		right_icon_click: function(sender, params) {
			this.poplayer.show();
		},
		sharePoplayer_init: function(sender, params) {
			this.poplayer = sender;
		},
		shareRepeat_init: function(sender, params) {
			this.shareRepeat = sender;
		},
		shareRepeat_itemclick: function(sender, params) {

			var param = {
				userCode: this.urlParams.userCode,
				actCode: this.urlParams.actCode,
				auditSwitch: this.auditResult,
				workflowfunc: sender.datasource.func,
				procedureName: this.urlParams.procedureName,
				ptype: this.urlParams.ptype
			};
			this.pageviewInstance.replaceGo("flowSend", param);
			this.poplayer.hide();
		},
		cancelIcon_click: function(sender, params) {
			this.poplayer.hide();
		},
		pdf_view_init: function(sender, params) {
			this.pdf_view = sender;
		},
		
		attachment_view_init: function(sender, params) {
			this.attachment_view = sender;
		},
		segment_item_init: function(sender, params) {
			//alert(sender.datasource.title);
			sender.config.text = sender.datasource.title;
			sender.config.font = sender.datasource.icon;
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
				actCode: this.urlParams.actCode
			};
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
			var listData = [];
			if(!result.result) {
				return false;
			}
			var au = result.data.auditResult;
			if(au.visible) {
				if(au.items.length > 0) {
					this.auditResult = "1";
				}
			} else {
				this.auditResult = "0";
			}

			var tt = result.data.toolbar;
			var items = [];
			/*items.push(this.Button_signIn);
		    items.push(this.Button_send);
		    items.push(this.Button_taskFinish);
		    items.push(this.Button_finish);
		    items.push(this.Button_back);
		   */
			if(tt.signInVisible) {
				items.push(this.Button_signIn);
			}
			if(tt.sendVisible) {
				items.push(this.Button_send);
			}
			if(tt.taskFinishVisible) {
				items.push(this.Button_taskFinish);
			}
			if(tt.finishVisible) {
				items.push(this.Button_finish);
			}
			if(tt.backVisible) {
				items.push(this.Button_back);
			}
			this.shareRepeat.bindData(items);
			if(this.selectedSeg == "业务信息") {
				var serverUrl = this.pageviewInstance.getAjaxHost();
				var pdfUrl = result.data.pdfUrl.toString().replace("\\", "/");
				//http://123.103.9.201:4031/workflowwebservice55/pdfjs/web/viewer.html?file=../../WorkFlowPdf/103941.pdf				
				pdfUrl = serverUrl.replace("query.asmx", "pdfjs/web/viewer.html?file=../../") + pdfUrl;
				this.pdf_view.setSrc(pdfUrl);
			}
			if(this.selectedSeg == "意见") {
				var arr = result.data.opinions;
				for(var i = 0; i < arr.length; i++) {
					listData.push({
						left1: arr[i].opinionConfirm + ' ' + arr[i].opinionText,
						right1: '',
						left2: '',
						right2: arr[i].actUserName + '(' + arr[i].taskActorName + ')',
						left3: '',
						right3: arr[i].opinionDate.toString()
					});
				}

			}
			if(this.selectedSeg == "流向") {
				var arr = result.data.directions;
				var listData = [];
				for(var i = 0; i < arr.length; i++) {
					listData.push({
						left1: arr[i].toTaskName,
						right1: arr[i].statusName,
						left2: arr[i].actUserName,
						right2: arr[i].signDate,
						left3: '',
						right3: ''
					});
				}
			}
			return listData;
		},

		segment_change: function(sender, params) {
			this.selectedSeg = params.item.datasource.title;

			if(this.selectedSeg == "业务信息") {
				//this.attachment_view.show();
				this.pdf_view.ShowIt();
				this.listview.HideIt();
			} else {
				//this.attachment_view.hide();
				this.pdf_view.HideIt();
				this.listview.ShowIt();
				this.listview.empty();
				this.page_content_reload();
			}

		},
		attachment_icon_click:function(sender, params) {
			var param = {				
				actCode: this.urlParams.actCode
			};
			this.pageviewInstance.go("attachmentList", param);
		}
	};
	return pageLogic;
});