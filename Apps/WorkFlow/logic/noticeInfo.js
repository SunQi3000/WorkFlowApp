define([], function() {
	var tipConfigs = [{
		text: "操作成功",
		textStyle: {
			marginTop: 5
		},
		font: "FontAwesome_f00c",
		iconStyle: {
			w: 30,
			fontSize: 18,
			borderRadius: "100%",
			backgroundColor: "rgb(15,198,96)",
			color: "#fff"
		}
	},
	{
      text:"请输入回复信息!",
      withoutBackCover:true,
      duration:1000,
      style:{      	
        width:200
      },
      textStyle:{
      	fontSize:15
      }
    }
	];

	function pageLogic(config) {
		this.pageviewInstance = config.pageview;
		//获取到url参数
		this.urlParams = this.pageviewInstance.params;
		this.userCode = localStorage.getItem("userCode");
		LoadData(this.pageviewInstance, {
			userCode: this.userCode,
			noticeId: this.urlParams.noticeId
		});

	}
	pageLogic.prototype = {
		backIcon_click: function(sender, params) {
			this.pageviewInstance.goBack();
		},
		feed_textarea_init: function(sender, params) {
			this.feed_textarea = sender;
		},
		btn_submit_click: function(sender, params) {
			//alert("aa");
			var feedMessage=this.feed_textarea.getValue().trim();
			if(feedMessage.length==0){
				this.pageviewInstance.showTip(tipConfigs[1]);
				return false;
			}
			var feed = this.pageviewInstance;
			var params = {
				url: 'AddNoticeFeedBack',
				dataType: 'jsonp',
				contentType: "application/json;charset=utf-8",
				type: 'post',
				data: {
					userCode: this.userCode,
					noticeId: this.urlParams.noticeId,
					content: feedMessage
				},
				success: function(data) {
					if(data.result) {
						//alert(data.msg);
						this.pageviewInstance.showTip(tipConfigs[0]);
						this.pageviewInstance.goBack();
					} else {
						alert(data.msg);
					}
				},
			};
			this.pageviewInstance.ajax(params);

		},

	};

	function BindControl(sender, params) {
		sender.delegate("txt_title", function(target) {
			target.setText(params.title);
		});
		sender.delegate("txt_submitDate", function(target) {
			target.setText(params.submitDate);
		});
		sender.delegate("txt_submitPersonName", function(target) {
			target.setText(params.submitPersonName);
		});
		sender.delegate("txt_content", function(target) {
			target.setText(params.content);
		});

	}

	function LoadData(sender, params) {
		var sendParams = {
			url: 'GetNotice',
			dataType: 'jsonp',
			contentType: "application/json;charset=utf-8",
			type: 'post',
			data: params,
			success: function(data) {
				if(data.result) {
					BindControl(sender, data.data);
				} else {
					alert(data.msg);
				}
				sender.hideLoading(true);
			},
		};
		sender.ajax(sendParams);
		sender.showLoading({
			text: "正在加载"
		});
	};
	return pageLogic;
});