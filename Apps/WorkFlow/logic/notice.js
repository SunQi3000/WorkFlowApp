define([],function(){
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        //获取到url参数
        this.urlParams = this.pageviewInstance.params;
        this.userCode=localStorage.getItem("userCode");
    }
    pageLogic.prototype = {
        // right_icon_didmount:function(sender){
        // },
        
        backIcon_click:function(sender,params){
          //this.pageviewInstance.goBack();
        },
        //page_content 组件声明事件 让该组件具备下拉刷新的功能
        page_content_pulltorefresh:function(sender,params){
            //刷新的时候执行加载第一页的数据
            //this.listview.empty();
            this.listview.loadFirstPageData();
        },
        //page_content 组件声明事件 让该组件具备上拉加载更多的功能
        page_content_loadmore:function(sender,params){
            //上拉
            //this.listview.empty();
            this.listview.loadNextPageData();
        },
        page_content_reload:function(sender){
          //当网络失败的时候 显示错误信息  提供再次加载的时机
          //重新调用列表重新加载方法
          this.listview.empty();
          this.listview.reload();
        },
        //列表初始化 保留列表对象的引用
        listview_init:function(sender){
            this.listview = sender;
            this.listview.setAjaxConfigParams({userCode:this.userCode,page:'1',pageCount:'20'});
        },
        
        //列表实例话完成后 调用开始加载数据
        listview_didmount:function(sender){
            sender.loadFirstPageData();
        },
        //列表返回数据的时候 如果获取成功则返回数据中的数组
        //失败的时候则直接return false;界面会显示重新加载的界面
        listview_parsedata:function(sender,params){
            var result = params.data;
            if(!result.result){
                return false;
            }
            return result.data.listdata;
        },
        listview_rowclick:function(sender){
            sender.select();            
            var param={
            	noticeId:sender.datasource.noticeCode
            };
            this.pageviewInstance.go("noticeInfo",param);
        },
    };
    return pageLogic;
});