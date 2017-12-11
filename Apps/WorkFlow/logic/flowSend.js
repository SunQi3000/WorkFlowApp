define([], function() {
	var tipConfigs=[{
      text:"请先选择流向!",
      withoutBackCover:true,
      duration:1000,
      style:{      	
        width:200
      },
      textStyle:{
      	fontSize:15
      }
    },
    {
      text:"请先选择处理人!",
      withoutBackCover:true,
      duration:1000,
      style:{      	
        width:200
      },
      textStyle:{
      	fontSize:15
      }
    },
    {
      text:"请填写处理意见!",
      withoutBackCover:true,
      duration:1000,
      style:{      	
        width:200
      },
      textStyle:{
      	fontSize:15
      }
    },
	];
	function pageLogic(config) {
		this.pageviewInstance = config.pageview;
		this.urlParams = this.pageviewInstance.params;
		this.userCode = localStorage.getItem("userCode");
		this.router_data = [];

		this.routerFunc = "";
		if(this.urlParams.workflowfunc == "WorkFlowSend") {
			this.routerFunc = "GetWorkFlowSendRouter";
		}
		if(this.urlParams.workflowfunc == "WorkFlowBack") {
			this.routerFunc = "GetWorkFlowBackRouter";
		}

	};
	pageLogic.prototype = {
		onPageLoad: function() {
			if(this.urlParams.workflowfunc == "WorkFlowSignIn") {
				this.pageviewInstance.delegate("pagecontent", function(target) {
					target.hide();
				});
				var sendParams = {
					userCode: this.userCode,
					actCode: this.urlParams.actCode
				};
				Submit(this.urlParams, sendParams, this.pageviewInstance);
			}
			if(this.urlParams.auditSwitch == "0") {
				this.pageviewInstance.delegate("audit_wrapper", function(target) {
					target.hide();
				});
			}
			if(this.urlParams.workflowfunc == "WorkFlowFinish" || this.urlParams.workflowfunc == "WorkFlowTaskFinish") {

				this.pageviewInstance.delegate("router_Wrpper", function(target) {
					target.hide();
				});
				this.pageviewInstance.delegate("taskActor_Wrapper", function(target) {
					target.hide();
				});
			}
		},

		backIcon_click: function(sender, params) {
			/*var sendParams = {				
				actCode: this.urlParams.actCode,				
				ptype: this.urlParams.ptype
			};
			this.pageviewInstance.replaceGo("procedureInfo", sendParams);
			*/
			this.pageviewInstance.goBack();
		},
		taskActor_Selected_init: function(sender) {
			this.taskActor_Selected = sender;
		},
		radiolist_init: function(sender, params) {
			var routerParam={
				userCode: this.userCode,
				actCode: this.urlParams.actCode,
			}
			GetRouterData(this.routerFunc, this.pageviewInstance, routerParam, this.router_data);
			this.radiolist = sender;
			if(this.router_data.length > 0) {
				var defaultSelectedData = this.router_data[0];
				this.radiolist.setSelectedValue([defaultSelectedData]);
			}
		},
		radiolist_loaddata: function(sender, params) {
			var successCallback = params.success;
			var errorCallback = params.error;
			successCallback(this.router_data);
		},
		radiolist_selected: function(sender, params) {
			var oldtext=this.router_value.text;
			this.router_value.setText(params.selectedValue[0].label);	
			if(oldtext!=this.router_value.text){
				this.taskActor_value.setValue("");
				this.taskActor_Selected.setText("");
				delete this.pageviewInstance.innerPages["selectActor"];
        		delete this.pageviewInstance.innerPagesWrappers["selectActor"];
			}
		},

		router_value_didmount: function(sender, params) {
			this.router_value = sender;
			if(this.router_data.length > 0) {
				var defaultSelectedData = this.router_data[0];
				this.router_value.setText(defaultSelectedData.label);
			}
		},
		router_value_click: function(sender, paramas) {
			this.radiolist.show();
		},
		taskActor_value_init: function(sender, params) {
			this.taskActor_value = sender;
		},
		taskActor_value_click: function(sender, params) {
			var ReRouterCode = "";
			var selectedRouter = this.router_value.text;
			var routerFound = this.router_data.filter(function(item) {
				return(item.label === selectedRouter);
			});
			if(routerFound.length > 0) {
				ReRouterCode = routerFound[0].id;
			}
			if(ReRouterCode.length == 0) {
				//alert("请先选择流向");
				this.pageviewInstance.showTip(tipConfigs[0]);
				sender.blur();
				return false;
			}
			var sh = {
				pageKey: "selectActor",
				mode: "fromBottom",
				params: {
					userCode: this.urlParams.userCode,
					actCode: this.urlParams.actCode,
					routerCode: ReRouterCode
				}
			}
			this.pageviewInstance.showPage(sh);
		},
		audit_switch_change: function(sender, params) {
			var value = params.value;
			sender.setValue(value);
		},
		audit_switch_init: function(sender, params) {
			this.audit_switch = sender;
		},
		opinion_textarea_init: function(sender, params) {
			this.opinion_textarea = sender;
		},

		submitbtn_click: function(sender, params) {
			var ReRouterCode = "";
			var ReTaskActors = "";
			var ReAuditValue = "";
			var ReOpinion = this.opinion_textarea.getValue();

			var selectedRouter = this.router_value.text;
			var routerFound = this.router_data.filter(function(item) {
				return(item.label === selectedRouter);
			});
			if(routerFound.length > 0) {
				ReRouterCode = routerFound[0].id;
			}
			ReTaskActors = this.taskActor_Selected.getText();

			if(this.audit_switch.value) {
				ReAuditValue = "Approve";
			} else {
				ReAuditValue = "Reject";
			}
			if(this.urlParams.auditSwitch == "0") {
				ReAuditValue = "";
			}

			var sendParams;
			if(this.urlParams.workflowfunc == "WorkFlowSignIn") {
				sendParams = {
					userCode: this.userCode,
					actCode: this.urlParams.actCode
				};
			}
			if(this.urlParams.workflowfunc == "WorkFlowFinish" || this.urlParams.workflowfunc == "WorkFlowTaskFinish") {
				if(ReOpinion == "") {
					//alert("请填写处理意见");
					this.pageviewInstance.showTip(tipConfigs[2]);
					return false;
				}
				sendParams = {
					userCode: this.userCode,
					actCode: this.urlParams.actCode,
					opinion: ReOpinion,
					auditValue: ReAuditValue
				};
			}
			if(this.urlParams.workflowfunc == "WorkFlowSend" || this.urlParams.workflowfunc == "WorkFlowBack") {
				if(ReRouterCode == "") {
					//alert("请选择流向");
					this.pageviewInstance.showTip(tipConfigs[0]);
					return false;
				}
				if(ReTaskActors == "") {
					//alert("请选择处理人");
					this.pageviewInstance.showTip(tipConfigs[1]);
					return false;
				}
				if(ReOpinion == "") {
					//alert("请填写处理意见");
					this.pageviewInstance.showTip(tipConfigs[2]);
					return false;
				}

				sendParams = {
					userCode: this.userCode,
					actCode: this.urlParams.actCode,
					routerCode: ReRouterCode,
					taskActors: ReTaskActors,
					opinion: ReOpinion,
					auditValue: ReAuditValue
				};
			}

			//alert(JSON.stringify(sendParams));
			//this.opinion_textarea.setValue(JSON.stringify(sendParams));
			//todo: 提交等待?
			Submit(this.urlParams, sendParams, this.pageviewInstance);
		},
		
	};

	//获取流向
	function GetRouterData(urlFunction, sender, params, returnObj) {
		var sendParams = {
			url: urlFunction,
			dataType: 'jsonp',
			contentType: "application/json;charset=utf-8",
			type: 'post',
			data: params,
			success: function(data) {
				if(data.result) {
					returnObj.splice(0, returnObj.length);
					for(var i = 0; i < data.data.length; i++) {
						returnObj.push({
							"id": data.data[i].RouterCode,
							"label": data.data[i].Description
						});
					}
				} else {
					alert(data.msg);
				}
			},
		};
		sender.ajax(sendParams);
	};

	//提交事件
	function Submit(urlpm, params, sender) {
		var sendParams = {
			url: urlpm.workflowfunc,
			dataType: 'jsonp',
			contentType: "application/json;charset=utf-8",
			type: 'post',
			data: params,
			success: function(data) {
				if(data.result) {
					/*
					sender.replaceGo("procedureInfo", {						
						actCode: urlpm.actCode,						
						ptype: urlpm.ptype
					});*/
					this.pageviewInstance.goBack();
				} else {
					alert(data.msg);
				}
				sender.hideLoading(true);
			},
			error: function(data) {
				sender.hideLoading(true);
			}
		};
		sender.ajax(sendParams);
		sender.showLoading({
			text: "正在处理中..."
		});
	};

	return pageLogic;
});