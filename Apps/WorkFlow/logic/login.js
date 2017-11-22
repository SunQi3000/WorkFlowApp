define(["utils"], function(utils) {

	function pageLogic(config) {
		this.pageviewInstance = config.pageview;
		this.shParams = this.pageviewInstance.showPageParams;
		var indexError="";		
		if(this.shParams.indexError){
			//alert(this.shParams.indexError);
			indexError=this.shParams.indexError;
			this.pageviewInstance.delegate("txt_message", function(target) {
				target.setText(indexError);
			});
		}
		this.yyUserCode=this.shParams.yyUserCode||config.pageview.pageManager.appConfig.yyUserCode;;
		//是否能使用友空间
		this.IsYonyouCould=this.shParams.IsYonyouCould ||false;
		//登录按钮提交事件（普通登录或绑定友空间用户登录）
		this.loginFunctionName="Login";			
		if(this.IsYonyouCould){
			//友空间登录
			this.loginFunctionName="LoginAndBindYy";
		}else{
			//非友空间环境：隐藏绑定check
			this.pageviewInstance.delegate("check_view", function(target) {
				target.hide();
			});
		}
		var userId = "";
		if(window.localStorage) {
			//alert('This browser supports localStorage');
			if(localStorage.getItem("userId")) {
				userId = localStorage.getItem("userId");
			}
		} else {
			//alert('This browser does NOT support localStorage');
		}
		if(userId.length > 0) {
			this.pageviewInstance.delegate("txt_username", function(target) {
				target.setValue(userId);
			});
		} else {
			this.pageviewInstance.delegate("txt_username", function(target) {
				target.focus(); //focus 不起作用？？？
			});
		}

	};

	pageLogic.prototype = {
		onPageResume: function() {
			this.pageviewInstance.delegate("txt_message", function(target) {
				target.setText("");
			});
		},

		txt_username_init: function(sender, params) {
			this.txt_username = sender;
		},

		txt_password_init: function(sender, params) {
			this.txt_password = sender;
		},
		check_button_init: function(sender, params) {
			this.check_button = sender;
		},
		check_button_click: function(sender, params) {
			if(sender.value){
				sender.unSelected();
			}else{
				sender.selected();
			}
		},
		btn_submit_click: function(sender, params) {
			 	
			if(!this.check_button.value){
				this.loginFunctionName="Login";	
			}
			var params = {
				url: this.loginFunctionName,
				dataType: 'jsonp',
				contentType: "application/json;charset=utf-8",
				type: 'post',
				data: {
					userid: this.txt_username.getValue(),
					password: this.txt_password.getValue(),
					dno: '',
					dToken: '',
					yyUserCode: this.yyUserCode
				},
				success: function(data) {

					if(data.result) {
						SaveLocalUser(data.data.userCode, data.data.userId, data.data.userName)
						this.pageviewInstance.replaceGo("mainpage");

					} else {

						this.pageviewInstance.delegate("txt_message", function(target) {
							target.setText(data.msg);
						});
						//alert(data.msg);						
					}
					this.pageviewInstance.hideLoading(true);

				},
				error: function(data) {
					alert("服务器连接失败");
					this.pageviewInstance.hideLoading(true);

				}

			};
			this.pageviewInstance.ajax(params);
			this.pageviewInstance.showLoading({
				text: "正在加载"
			});
		},

	};
	//缓存用户信息
	function SaveLocalUser(code, id, name) {
		localStorage.setItem("userCode", code);
		localStorage.setItem("userId", id);
		localStorage.setItem("userName", name);
	};
	//友空间登录
	function YYLogin(sender) {
		var sendParams = {
			url: 'GetYyUserInfo',
			dataType: 'jsonp',
			contentType: "application/json;charset=utf-8",
			type: 'post',
			data: {
				yyCode: sender.yyCode
			},
			success: function(data) {
				if(data.result) {
					//alert("友空间用户编号：" + data.data.YyUserCode);
					sender.yyUserCode = data.data.YyUserCode;
					//config.pageview.pageManager.appConfig.yyUserCode = _this.yyUserCode;
					sender.pageviewInstance.pageManager.appConfig.yyUserCode = sender.yyUserCode;
					if(sender.yyUserCode && sender.yyUserCode != "") {
						//友空间用户自动登录
						params = {
							url: 'LoginByYy',
							dataType: 'jsonp',
							contentType: "application/json;charset=utf-8",
							type: 'post',
							data: {
								yyUserCode: sender.yyUserCode
							},
							success: function(data) {
								if(data.result) {
									SaveLocalUser(data.data.userCode, data.data.userId, data.data.userName)
									sender.pageviewInstance.replaceGo("mainpage");
								} else {
									//alert(data.msg);
									/*sender.pageviewInstance.delegate("txt_message", function(target) {
										target.setText(data.msg);
									});*/
								}
							},
						};
						sender.pageviewInstance.ajax(params);
					}
				} else {
					//alert(data.msg);
					sender.pageviewInstance.delegate("txt_message", function(target) {
						target.setText(data.msg);
					});
				}
				sender.pageviewInstance.hideLoading(true);
			},
			error: function(data) {
				sender.pageviewInstance.hideLoading(true);
			}
		};
		sender.pageviewInstance.ajax(sendParams);
		sender.pageviewInstance.showLoading({
			text: "正在加载"
		});
	}
	return pageLogic;
});