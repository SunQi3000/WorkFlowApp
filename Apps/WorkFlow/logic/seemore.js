define([],function(){
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        this.urlParams = this.pageviewInstance.params;
        this.userName=decodeURI(this.urlParams.userName);
        
    }
    pageLogic.prototype = {
       
        txt_user_init: function(sender, params) {
			this.txt_user = sender;
			this.txt_user.config.text=this.userName;
		},
        repeat_itemclick:function(sender,params){
          var title = sender.datasource.label;          
         // this.pageviewInstance.showTip({text:title,duration:800});
         if(title=="问题与意见"){
         	//
         }
         if(title=="注销"){
         	this.pageviewInstance.go("index");
         }
        },
        backIcon_click:function(sender,params){
          //this.pageviewInstance.goBack();
        },
    };
    return pageLogic;
});
