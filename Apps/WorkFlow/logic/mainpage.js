define([],function(){
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        //获取到url参数
        this.urlParams = this.pageviewInstance.params;
    }
    pageLogic.prototype = {
        onPageResume: function(sender,params) {
        	//alert("onPageResume");
        	//alert(window.location.href);
        	window.location.reload();
        	
        },
        
        tabbar_init:function(sender,params){
        	this.tabbar=  sender;  	
        }
    };
    
    return pageLogic;
});
