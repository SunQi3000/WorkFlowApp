define(["../logic/selectActor"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["page_header","page_content"],
        components:{
            page_header:{
                type:"view",
                root:["backIcon","header_title","header_right_text"],
                style:{
                    height:"44px",
                    borderBottom:"1px solid #e2e8ed",
                    backgroundColor:"#F38236",
                    justifyContent:"center",
                    alignItems:"center"
                }
            },
            header_title:{
                type:"text",
                text:"选择处理人",
                style:{
                  fontSize:17,
                  fontWeight:"bold",
                  color:"#fff"
                }
            },
            header_right_text:{
                ref:true,
                type:"text",
                style:{
                    position:"absolute",
                    right:10,
                    top:12,
                    fontSize:14,
                    color:"#fff"
                },
                preText:"确定(",
                nextText:")",
                textStyle:{
                    color:"#fff"
                },
                text:"0"
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
            page_content:{
                type:"view",
                root:["listview"],
                style:{
                  flex:1,
                  overflowY:"auto",
                  backgroundColor:"#fff"
                }
            },
            listview:{
              type:"listview",
              selectedMode:"m",              
              root:["row_wrap"],              
              groupKey:"taskActorCode",
              groupHeader:["row_groupHeader"],
              ajaxConfig:{
                  url:"",
                  type: "GET",
				  dataType: "jsonp",
                  pageSize:99999,
                  pageNumKey:"pageNum",
                  data:{
                    pageSize:99999
                },
              },
              style:{
                flexDirection:'column',
               
              },
              rowStyle:{
              	paddingLeft:8,
                paddingTop:5,
                paddingBottom:5,
                borderBottom:"1px solid #eee",
                flexDirection:'column'
              },
              groupHeaderStyle:{
              	paddingTop:5,
                paddingBottom:5,
              	backgroundColor:"#f1f1f1"
              }
            },

            row_wrap:{
                type:"view",
                style:{
                    flexDirection:"row"
                },
                root:["row_checkicon","row_name"]
            },
            row_checkicon:{
                type:"icon",
                selectedClassName:"list-checkicon-selected",
                font:"FontAwesome_f1db",
                style:{
                    width:30
                },
                iconStyle:{
                    color:"rgb(0, 147, 255)",
                    fontSize:23
                }
            },
            row_name:{
                type:"text",
                style:{
                    fontSize:13,
                    color:"#333",
                    flex:1
                },
                text_bind:"userName"
            },
            row_groupHeader:{
                type:"text",
                style:{
                    fontSize:17,
                    fontWeight:"bold",
                    color:"#333",
                    paddingLeft:10,
                    paddingBottom:5,
                },
                text_bind:"taskActorName"
            }
        }
    };
});
