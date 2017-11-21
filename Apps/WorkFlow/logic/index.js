define(["utils"], function(utils) {

	function pageLogic(config) {
		this.pageviewInstance = config.pageview;
		var userId="";
		if(window.localStorage){
		 //alert('This browser supports localStorage');
		 if(localStorage.getItem("userId")){
		 	userId=localStorage.getItem("userId");
		 }		 
		}else{
		 //alert('This browser does NOT support localStorage');
		}
		
		if(userId.length>0){
			this.pageviewInstance.delegate("txt_username", function(target) {
			target.setValue(userId);
		});
		}else{
			this.pageviewInstance.delegate("txt_username", function(target) {
			target.focus();//focus 不起作用？？？
		});
		}
		
		
	}
	pageLogic.prototype = {

		txt_username_init: function(sender, params) {
			this.txt_username = sender;
		},

		txt_password_init: function(sender, params) {
			this.txt_password = sender;
		},
		
		btn_submit_click: function(sender, params) {
			//alert("aa");
			var params = {
				url: 'Login',
				dataType: 'jsonp',
				contentType: "application/json;charset=utf-8",
				type: 'post',
				data: {
					userid: this.txt_username.getValue(),
					password: this.txt_password.getValue(),
					dno: '',
					dToken: ''
				},
				success: function(data) {

					if(data.result) {
						localStorage.setItem("userCode",data.data.userCode);
						localStorage.setItem("userId",data.data.userId);
						localStorage.setItem("userName",data.data.userName);
						this.pageviewInstance.go("mainpage");
						
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
	return pageLogic;
});