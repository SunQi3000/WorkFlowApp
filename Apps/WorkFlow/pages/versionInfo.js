define(["../logic/versionInfo"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["page_header","page_content","page_footer"],
        components:{
            page_header:{
                type:"view",
                root:["backIcon","header_title"],
                style:{
                    height: "44px",
					borderBottom: "1px solid #e2e8ed",
					backgroundColor: "#F38236",
					justifyContent: "center",
					alignItems: "center"
                }
            },
            backIcon:{
              type: "icon",
				text: "",
				font: "FontAwesome_f0a8",
				style: {
					position: "absolute",
					left: "0px",
					color: "#fff",
					top: "7px",
					width: "50px",
					height: "30px",
				},
				iconStyle: {
					fontSize: "25px",
				}
            },
            header_title:{
                type: "text",
				style: {
					fontSize: 18,
					fontWeight: "bold",
					color: "#fff",
				},
				text: "关于我们"
            },
            page_content:{
                type:"view",
                style:{
                    overflowX:"auto",
                    overflowY:"auto",
                    backgroundColor:"#fff",                    
                },
                root:["title_view","version_view","content_view"]
            },
           title_view: {
				type: "view",
				style: {					
					justifyContent:"center",
					flexDirection: "row",					
					paddingLeft: 20,
					paddingRight: 20,
					paddingTop: 10,
					paddingBottom: 15
				},
				root: ["txt_title"]
			},
			version_view: {
				type: "view",
				style: {
					flexDirection: "row",
					justifyContent:"center"
				},
				root: ["txt_version"]
			},
			content_view: {
				type: "view",
				style: {					
					justifyContent:"center",
					
					paddingTop: 8,
					paddingBottom: 100,
					paddingLeft: 8,
					paddingRight: 8,
				},
				root: ["txt_content"]
			},
            txt_title:{
                type:"text",
                text: "",
                ref: true,
				style: {
					fontSize: 17,
					color: "#000"
				},
            },
            txt_version:{
                type:"text",
                text: "",
                ref: true,
				style: {
					fontSize: 17,
					color: "#000",
					paddingBottom:10
				},
            },
            txt_content:{
                type:"text",
                text: "",
                ref: true,
				style: {
					fontSize: 16,
					color: "#000"
				},
            },
            page_footer:{
                type:"view",
                style:{
                    height:40,
                    backgroundColor:"#fff",
                    borderTop:"1px solid #eee"
                }
            }


        }
    };
});
