define([],function(){
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        //获取到url参数
        this.urlParams = this.pageviewInstance.params;
        var appconfig = this.pageviewInstance.getAppConfig();
		var pdfUrl = appconfig.helppdf;	
		//this.pdf_view.setSrc(pdfUrl);
		var appName="房地产专业版移动审批";
        var appVersion="版本 2.0.0";
        var appInfo="房地产专业版移动审批 软件®2017 所有 知识产权由 用友网络科技股份有限公司（ yonyou Network Technology Co., Ltd）拥有。";
		this.pageviewInstance.delegate("txt_title",function(target){    		 
            target.setText(appName);
        });
        this.pageviewInstance.delegate("txt_version",function(target){    		 
            target.setText(appVersion);
        });
        this.pageviewInstance.delegate("txt_content",function(target){    		 
            target.setText(appInfo);
        });
        
    }
    pageLogic.prototype = {
        backIcon_click:function(sender,params){
            this.pageviewInstance.goBack();
        }        	
        
    };
    return pageLogic;
});
