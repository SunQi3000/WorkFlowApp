define(["../logic/index"], function(pluginClass) {
    var Re = {
        pluginClass: pluginClass,
        style: {
            backgroundColor: "#f0f3f4"
        },
        root: ["page_header","page_content"],
        components: {
            page_header:{
                type:"view",
                style:{
                    height:"44px",
                    borderBottom:"1px solid #eee",
                    backgroundColor:"#F38236",
                    justifyContent:"center",
                    alignItems:"center"               
                },
                root:["page_header_title"]
            },
            page_header_title:{
                type:"text",
                text:"登  录",
                style:{
                    fontSize:18,
                    fontWeight:"bold",
                    color:"#fff",
                }
            },
            page_content: {
                type: "view",
                style: {
                    flex: 1,
                    overflowY: "auto",
                    backgroundColor:"#f3f4f5"
                },
                root: ["view_login","view_button"]
            },
            view_login: {
                type: "view",
                style: {
                    flex: 1,
                    backgroundColor:"#ffffff",
                    paddingTop:30
                },
                root: ["txt_username","txt_password"]
            },
            view_button: {
                type: "view",
                style: {
                    flex: 1,
                    overflowY: "auto"
                    
                },
                root: ["btn_submit"]
            },
            txt_username:{
              type:"input",
              style:{
              	margin:"1px auto",
                height:40,
                width:300,
                backgroundColor:"#fff",
                fontSize:13,
                paddingLeft:7,
                border:"1px solid #eee",
              },
              placeholder:"请输入用户名"
            },
            txt_password:{
              type:"input",
              id:"txt_username",
              mode:"password",
              style:{              	
                margin:"5px auto",
                height:40,
                width:300,
                backgroundColor:"#fff",
                fontSize:13,
                paddingLeft:7,
                border:"1px solid #eee",
              },
              placeholder:"请输入密码"
            },
            btn_submit:{
              type:"button",
              mode:"2",
              style:{
                margin:"10px auto",
                width:300,
                height:35,
                marginBottom:30
              },
              title:"提交"
            },
            
        },

    };
    return Re;
});
