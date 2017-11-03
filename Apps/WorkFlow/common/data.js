define([], function () {
    var hasError = false;
    var Re = {
        getListData:function(params){
        	var resultdata=[];
            $.ajax({
    			data: params,
    			url: 'http://127.0.0.1/WorkFlowWebService55/Query.asmx/GetWorkFlowActGroupNotSigned',   			
    			dataType: 'jsonp',
    			cache: false,
    			timeout: 5000,
    			success: function(data){ 
    				alert(data.msg);
    				if(data.result==true){
    					resultdata=data.data;
    				}
    			},
    			error: function(jqXHR, textStatus, errorThrown){
    				alert('error ' + textStatus + " " + errorThrown);  
    			}
    		});

            return resultdata;
        }
    };
    return Re;
});
