define([], function(calendarpicker) {
	function pageLogic(config) {
		this.pageviewInstance = config.pageview;
		this.urlParams = this.pageviewInstance.params;
		this.router_data = [];
		this.taskActor_data = [];

	};
	pageLogic.prototype = {
		onPageLoad: function() {
			if(this.urlParams.workflowfunc == "WorkFlowSignIn") {
				var sendParams = {
					userCode: this.urlParams.userCode,
					actCode: this.urlParams.actCode
				};
				Submit(this.urlParams.workflowfunc, sendParams, this.pageviewInstance);
			}
			if(this.urlParams.workflowfunc == "WorkFlowFinish" || this.urlParams.workflowfunc == "WorkFlowTaskFinish") {
				
				this.pageviewInstance.delegate("router_Wrpper", function(target) {
					target.hide();
					//target 为目标组件的实例对象
				});
				this.pageviewInstance.delegate("taskActor_Wrapper", function(target) {
					target.hide();
					//target 为目标组件的实例对象
				});
			}
		},

		backIcon_click: function(sender, params) {			
			var sendParams = {
				userCode: this.urlParams.userCode,
				actCode: this.urlParams.actCode
			};			
			this.pageviewInstance.replaceGo("procedureInfo",sendParams);
			//this.pageviewInstance.goBack();
		},
		radiolist_init: function(sender, params) {
			GetRouterData(this.pageviewInstance, this.urlParams, this.router_data);
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
			this.router_value.setText(params.selectedValue[0].label);
		},
		checklist_init: function(sender) {
			this.checklist = sender;
		},
		checklist_selected: function(sender, params) {
			var Re = [];
			for(var i = 0, j = params.selectedValue.length; i < j; i++) {
				Re.push(params.selectedValue[i].text);
			}
			this.taskActor_value.setText(Re.join(","));
		},
		checklist_loaddata: function(sender, params) {
			var selectedRouter = this.router_value.text;
			var routerFound = this.router_data.filter(function(item) {
				return(item.label === selectedRouter);
			});
			if(routerFound.length > 0) {
				var ReRouterCode = routerFound[0].id;
				GetTaskActorData(this.pageviewInstance, this.urlParams, ReRouterCode, this.taskActor_data);
			}
			var data = this.taskActor_data;
			var successCallback = params.success;
			var errorCallback = params.error;
			window.setTimeout(function() {
				successCallback(data);
			}, 1100);

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
			this.checklist.show();
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
				var strActors = this.taskActor_value.text;

				for(var i = 0; i < this.taskActor_data.length; i++) {
					var dd = this.taskActor_data[i];
					if(strActors.indexOf(dd.text) >= 0) {
						if(ReTaskActors.length > 0) {
							ReTaskActors += ";";
						}
						ReTaskActors += dd.userCode + "," + dd.taskActorCode;
					}
				}
			}

			if(this.audit_switch.value) {
				ReAuditValue = "Approve";
			} else {
				ReAuditValue = "Reject";
			}

			var sendParams;
			if(this.urlParams.workflowfunc == "WorkFlowSignIn") {
				sendParams = {
					userCode: this.urlParams.userCode,
					actCode: this.urlParams.actCode
				};
			}
			if(this.urlParams.workflowfunc == "WorkFlowFinish" || this.urlParams.workflowfunc == "WorkFlowTaskFinish") {
				if(ReOpinion == "") {
					alert("请填写处理意见");
				}
				sendParams = {
					userCode: this.urlParams.userCode,
					actCode: this.urlParams.actCode,
					opinion: ReOpinion,
					auditValue: ""
				};
			}
			if(this.urlParams.workflowfunc == "WorkFlowSend" || this.urlParams.workflowfunc == "WorkFlowBack") {
				if(ReRouterCode == "") {
					alert("请选择流向");
				}
				if(ReTaskActors == "") {
					alert("请选择处理人");
				}
				if(ReOpinion == "") {
					alert("请填写处理意见");
				}
				sendParams = {
					userCode: this.urlParams.userCode,
					actCode: this.urlParams.actCode,
					routerCode: ReRouterCode,
					taskActors: ReTaskActors,
					opinion: ReOpinion,
					auditValue: ReAuditValue
				};
			}

			//alert(JSON.stringify(sendParams));
			this.opinion_textarea.setValue(JSON.stringify(sendParams));
			Submit(this.urlParams.workflowfunc, sendParams, this.pageviewInstance);
		},
	};

	//获取流向
	function GetRouterData(sender, params, returnObj) {
		var sendParams = {
			url: 'GetWorkFlowSendRouter',
			dataType: 'jsonp',
			contentType: "application/json;charset=utf-8",
			type: 'post',
			data: {
				userCode: params.userCode,
				actCode: params.actCode
			},
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

	//获取处理人
	function GetTaskActorData(sender, params, routerId, returnObj) {
		var sendParams = {
			url: 'GetWorkFlowSendTaskActor',
			dataType: 'jsonp',
			contentType: "application/json;charset=utf-8",
			type: 'post',
			data: {
				userCode: params.userCode,
				actCode: params.actCode,
				routerCode: routerId,
			},
			success: function(data) {
				if(data.result) {
					returnObj.splice(0, returnObj.length);
					for(var i = 0; i < data.data.length; i++) {
						for(var j = 0; j < data.data[i].users.length; j++) {
							returnObj.push({
								"id": i.toString() + '_' + j.toString(),
								"taskActorCode": data.data[i].taskActorCode,
								"userCode": data.data[i].users[j].userCode,
								"text": data.data[i].users[j].userName + '(' + data.data[i].taskActorName + ')'
							});
						}
					}
				} else {
					alert(data.msg);
				}
			},
		};
		sender.ajax(sendParams);
	};

	//提交事件
	function Submit(urlFunction, params, sender) {
		var sendParams = {
			url: urlFunction,
			dataType: 'jsonp',
			contentType: "application/json;charset=utf-8",
			type: 'post',
			data: params,
			success: function(data) {
				if(data.result) {
					sender.go("procedureInfo", {
						userCode: params.userCode,
						actCode: params.actCode
					});
				} else {
					alert(data.msg);
				}
			}
		};
		sender.ajax(sendParams);
	};

	return pageLogic;
});