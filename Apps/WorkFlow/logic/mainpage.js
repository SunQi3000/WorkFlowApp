define([],function(){
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        //获取到url参数
        this.urlParams = this.pageviewInstance.params;
    }
    pageLogic.prototype = {
        
        mytodo_itemClick(){
        	alert("todo");
        	
        }
    };
    return pageLogic;
});
