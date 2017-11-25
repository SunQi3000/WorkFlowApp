define(["utils"], function(utils) {
	return {
		init: function(PM) {
			var hostUrl = "";
			var helppdf = "";
			var SwitchCouldLogin = "false";
			//同步
			$.ajaxSettings.async = false;
			$.getJSON("/config.json", function(data) {
				$.each(data, function(index, obj) {
					if(index == "host") {
						hostUrl = obj.toString() + "/query.asmx";
						helppdf = obj.toString() + "/pdfjs/web/viewer.html?file=V60WorkFlow-help.pdf";
					}
					if(index == "yyCouldLogin") {
						SwitchCouldLogin = obj;
					}
				})
			});
			//关闭同步
			$.ajaxSettings.async = true;

			PM.start({
				host: hostUrl,
				helppdf: helppdf,
				root: "index",
				//全局变量
				yyUserCode: "",
				yyCouldLogin: SwitchCouldLogin,
				customerComponents: {},
				baseSize: {
					width: 375,
					height: 667
				},
				beforeSendAjax: function(config) {
					//发送ajax请求的时候全局捕获函数,前提是使用页面示例对象的ajax方法
					//这样可以减少ajax参数工作量
					//var pageInstance = config.pageviewInstance;
					//将当前页面的url参数token赋值给ajax请求参数
					//config.data.token = pageInstance.params["token"];
				},
				beforeGo: function(config) {
					//跳转页面的时候 可以在这里进行捕获 可以添加处理跳转的参数
					//这样可以减少跳转传参数工作量
					//var pageInstance = config.pageviewInstance;
					//将当前页面的url参数token带给下一页
					//config.params.token = pageInstance.params.token;
				},
				onAjaxResponse: function(params) {
					//ajax的响应的全局捕获机制
					/*if(!params.isSuccess){
						alert(params.data.msg);
					}*/

				},
				routerChange: function(arg) {
					//页面路由的全局捕获机制
					//return false 禁止页面跳转
				}
			});

		}
	};
});