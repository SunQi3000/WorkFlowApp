define([],function(){
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        this.urlParams = this.pageviewInstance.params;
        this.userName=localStorage.getItem("userName");//decodeURI(this.urlParams.userName);
        
    }
    pageLogic.prototype = {
       
        txt_user_init: function(sender, params) {
			this.txt_user = sender;
			this.txt_user.config.text=this.userName;
		},
        repeat_itemclick:function(sender,params){
          var title = sender.datasource.label;          
         // this.pageviewInstance.showTip({text:title,duration:800});
         if(title=="功能介绍"){
         	this.pageviewInstance.go("helpfile");
         }
         if(title=="关于我们"){
         	this.pageviewInstance.go("versionInfo");
         }
         if(title=="注销"){
         	localStorage.clear();
         	this.pageviewInstance.go("index");
         }
        },
        backIcon_click:function(sender,params){
          //this.pageviewInstance.goBack();
        },
    };
    
    return pageLogic;
});
