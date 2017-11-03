define(["utils"], function(utils) {

	function pageLogic(config) {
		this.pageviewInstance = config.pageview;		
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
						this.pageviewInstance.go("mainpage", {
							userCode: data.data.userCode,
							userName: data.data.userName
						});
					} else {
						alert(data.msg);
						this.pageviewInstance.go("mainpage", {
							userCode: "100000",
							userName: "系统管理员"
						});
					}
				},
			};
			this.pageviewInstance.ajax(params);
		},

	};
	return pageLogic;
});