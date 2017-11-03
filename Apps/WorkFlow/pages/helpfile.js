define(["../logic/helpfile"],function(pluginClass){
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
				text: "功能介绍"
            },
            page_content:{
                type:"view",
                style:{
                    overflowX:"auto",
                    overflowY:"auto",
                    backgroundColor:"#f00"
                },
                root:["pdf_view"]
            },
           
            pdf_view:{
                type:"embed",
                ref:"true",
                style:{
                   height:"600",
                   width:"100%",
                   backgroundColor:"#fff",
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
