define([],function(){
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        //获取到url参数
        this.urlParams = this.pageviewInstance.params;        
        LoadData(this.pageviewInstance,this.urlParams);

    }
    pageLogic.prototype = {
        backIcon_click:function(sender,params){
            this.pageviewInstance.goBack();
        }
        
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
				},
			};
			sender.ajax(sendParams);    
    };
    return pageLogic;
});
