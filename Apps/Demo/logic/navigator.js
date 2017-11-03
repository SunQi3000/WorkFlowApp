define([],function(){
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        //获取到url参数
        this.urlParams = this.pageviewInstance.params;
    }
    pageLogic.prototype = {
        backIcon_click:function(sender,params){
            this.pageviewInstance.goBack();
        },
        go_button_click:function(sender,params){
            this.pageviewInstance.go("navigatortarget",{type:"go方式跳转"});
        },
        repalcego_button_click:function(sender,params){
            this.pageviewInstance.replaceGo("navigatortarget",{type:"go replace方式跳转"});
        },
        show_button_fromBottom_button_click:function(sender,params){
            this.pageviewInstance.showPage({
                pageKey:"navigatortarget",
                mode:"fromBottom",
                params:{
                    type:"从下往上弹出页面"
                }
            });
        },
        show_button_fromLeft1_button_click:function(sender,params){
            this.pageviewInstance.showPage({
                pageKey:"navigatortargetFromLeft1",
                mode:"fromLeft1",
                params:{
                    type:"从左方式1弹出页面"
                }
            });
        },
        show_button_fromLeft2_button_click:function(sender,params){
            this.pageviewInstance.showPage({
                pageKey:"navigatortargetFromLeft2",
                mode:"fromLeft2",
                params:{
                    type:"从左方式2弹出页面"
                }
            });
        },
        show_button_fromLeft3_button_click:function(sender,params){
            this.pageviewInstance.showPage({
                pageKey:"navigatortargetFromLeft3",
                mode:"fromLeft3",
                params:{
                    type:"从左方式3弹出页面"
                }
            });
        },
        show_button_fromRight1_button_click:function(sender,params){
            this.pageviewInstance.showPage({
                pageKey:"navigatortargetFromRight1",
                mode:"fromRight1",
                params:{
                    type:"从右方式1弹出页面"
                }
            });
        },
        show_button_fromRight2_button_click:function(sender,params){
            this.pageviewInstance.showPage({
                pageKey:"navigatortargetFromRight2",
                mode:"fromRight2",
                params:{
                    type:"从右方式2弹出页面"
                }
            });
        },
        show_button_fromRight3_button_click:function(sender,params){
            this.pageviewInstance.showPage({
                pageKey:"navigatortargetFromRight3",
                mode:"fromRight3",
                params:{
                    type:"从右方式3弹出页面"
                }
            });
        }
    };
    return pageLogic;
});
