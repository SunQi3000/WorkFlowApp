define([],function(){
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        //获取到url参数
        this.urlParams = this.pageviewInstance.params;        
        //是否能使用友空间
		this.IsYonyouCould=false;		
		//是否启用友空间登录
		this.yyCouldLogin = config.pageview.pageManager.appConfig.yyCouldLogin;
		//友空间用户Code
		this.yyUserCode = "";
		//友空间yyCode
		this.yyCode = this.pageviewInstance.params.code;
		
		if(this.yyCouldLogin && this.yyCode && this.yyCode != "") {
			this.IsYonyouCould=true;			
		}
		if(this.IsYonyouCould){
			//友空间登录
			YYLogin(this);			
		}else{
		var thispage=this.pageviewInstance;
		var shParam={IsYonyouCould:this.IsYonyouCould,yyCode:this.yyCode,yyUserCode:this.yyUserCode};
        window.setTimeout(function(){
        	var code=this.yyCode;
              thispage.showPage({pageKey:"login",params:shParam,mode:"fromBottom"});              
            },1500);
		}
    }
    pageLogic.prototype = {
        onPageResume: function() {
        	var shParam={IsYonyouCould:this.IsYonyouCould,yyCode:this.yyCode,yyUserCode:this.yyUserCode};
			this.pageviewInstance.showPage({pageKey:"login",params:shParam,mode:"fromBottom"});   
		},
		page_content_click:function(sender,param) {
			var shParam={IsYonyouCould:this.IsYonyouCould,yyCode:this.yyCode,yyUserCode:this.yyUserCode};
			this.pageviewInstance.showPage({pageKey:"login",params:shParam,mode:"fromBottom"}); 
		}
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
									var shParam={indexError:data.msg,IsYonyouCould:sender.IsYonyouCould,yyCode:sender.yyCode,yyUserCode:sender.yyUserCode};
									sender.pageviewInstance.showPage({pageKey:"login",params:shParam,mode:"fromBottom"}); 
									
								}
							},
						};
						sender.pageviewInstance.ajax(params);
					}
				} else {
					//alert(data.msg);
					var shParam={indexError:data.msg,IsYonyouCould:sender.IsYonyouCould,yyCode:sender.yyCode,yyUserCode:sender.yyUserCode};									
					sender.pageviewInstance.showPage({pageKey:"login",params:shParam,mode:"fromBottom"});
				}
				sender.pageviewInstance.hideLoading(true);
			},
			error: function(data) {
				sender.pageviewInstance.hideLoading(true);
			}
		};
		sender.pageviewInstance.ajax(sendParams);
		sender.pageviewInstance.showLoading({
			text: ""
		});
	}
    return pageLogic;
});
