define([],function(){
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        //获取到url参数
        this.urlParams = this.pageviewInstance.params;
    }
    pageLogic.prototype = {
        
        tabbar_itemClick:function(sender,params){
        	alert("todo");        	
        }
    };
    return pageLogic;
});
