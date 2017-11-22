define([],function(){
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        this.urlParams = this.pageviewInstance.params;
        this.userName=localStorage.getItem("userName");//decodeURI(this.urlParams.userName);
        this.yyUserCode = config.pageview.pageManager.appConfig.yyUserCode;
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
         	if (this.yyUserCode && this.yyUserCode != "")
			{
				var params = {
					url: 'UnBindYy',
					dataType: 'jsonp',
					contentType: "application/json;charset=utf-8",
					type: 'post',
					data: {
						yyUserCode: this.yyUserCode
					},
					success: function(data) {
						if(data.result) {
				         	this.pageviewInstance.replaceGo("index");
						} else {
							//alert(data.msg);
						}
					},
				};
				this.pageviewInstance.ajax(params);
			}else{
				this.pageviewInstance.replaceGo("index");
			}
         	
         }
        },
        backIcon_click:function(sender,params){
          //this.pageviewInstance.goBack();
        },
    };
    
    return pageLogic;
});
