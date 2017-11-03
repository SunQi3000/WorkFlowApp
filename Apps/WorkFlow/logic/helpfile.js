define([],function(){
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        //获取到url参数
        this.urlParams = this.pageviewInstance.params;
        var appconfig = this.pageviewInstance.getAppConfig();
		var pdfUrl = appconfig.helppdf;	
		//this.pdf_view.setSrc(pdfUrl);
		
		this.pageviewInstance.delegate("pdf_view",function(target){    		 
            target.setSrc(pdfUrl);
        });
        
    }
    pageLogic.prototype = {
        backIcon_click:function(sender,params){
            this.pageviewInstance.goBack();
        }        	
        
    };
    return pageLogic;
});
