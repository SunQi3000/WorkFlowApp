define([],function(){
	var tipConfigs = [
    {
      text:"操作成功",
      textStyle:{
          marginTop:5
      },
      font:"FontAwesome_f00c",
      iconStyle:{
        w:30,
        fontSize:18,
        borderRadius:"100%",
        backgroundColor:"rgb(15,198,96)",
        color:"#fff"
      }
    }];
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        //获取到url参数
        this.urlParams = this.pageviewInstance.params;        
        LoadData(this.pageviewInstance,this.urlParams);

    }
    pageLogic.prototype = {
        backIcon_click:function(sender,params){
            this.pageviewInstance.goBack();
        },
        feed_textarea_init: function(sender, params) {
			this.feed_textarea = sender;
		},
        btn_submit_click: function(sender, params) {
			//alert("aa");
			var feed=this.pageviewInstance;
			var params = {
				url: 'AddNoticeFeedBack',
				dataType: 'jsonp',
				contentType: "application/json;charset=utf-8",
				type: 'post',
				data: {
					userCode: this.urlParams.userCode,
					noticeId: this.urlParams.noticeId,
					content: this.feed_textarea.getValue()
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
    function BindControl(sender,params){    	
    	sender.delegate("txt_title",function(target){    		 
            target.setText(params.title);
        });
        sender.delegate("txt_submitDate",function(target){
            target.setText(params.submitDate);
        });
        sender.delegate("txt_submitPersonName",function(target){
            target.setText(params.submitPersonName);
        });
        sender.delegate("txt_content",function(target){
            target.setText(params.content);
        });
        
    }
    function LoadData(sender,params){
    	var sendParams = {
				url: 'GetNotice',
				dataType: 'jsonp',
				contentType: "application/json;charset=utf-8",
				type: 'post',
				data: {
					userCode: params.userCode,
					noticeId: params.noticeId					
				},
				success: function(data) {
					if(data.result) {
						BindControl(sender,data.data);
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
