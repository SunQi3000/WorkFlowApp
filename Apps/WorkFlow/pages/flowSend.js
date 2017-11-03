define(["../logic/flowSend"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["page_header","pagecontent","checklist","radiolist","selectbtn"],
        components:{
            checklist:{
              type:"checklist",
              primaryKey:"id"
            },
            radiolist:{
              type:"radiolist",
              primaryKey:"id",
              labelKey:"label"
            },
            page_header:{
                type:"view",
                root:["backIcon","right_icon","header_title"],
                style:{
                    height:"44px",
                    borderBottom:"1px solid #e2e8ed",
                    backgroundColor:"#F38236",
                    justifyContent:"center",
                    alignItems:"center"
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
                type:"text",
                text:"",
                style:{
                  fontSize:17
                }
            },
            right_icon:{
                type: "icon",
				text: "",
				font: "",
				style: {
					position: "absolute",
					right: "10px",
					color: "#fff",
					top: "6px",
					width: "30px",
					height: "30px",
				},
				iconStyle: {
					fontSize: "20px"
				}
            },
            pagecontent:{
              type:"view",
              ref:true,
              style:{
                overflowY:"auto",
                flex:1,
                backgroundColor:"#f3f4f5"
              },
              root:["audit_wrapper","router_Wrpper","taskActor_Wrapper","opinion_label","opinion_textarea","submitbtn"]
            },

            splitline:{
              type:"view",
              style:{
                position:"absolute",
                left:8,
                bottom:0,
                right:0,
                borderTop:"1px solid rgb(245, 245, 245)"
              }
            },
            splitline2:{
              type:"view",
              style:{
                position:"absolute",
                left:8,
                bottom:0,
                right:0,
                borderTop:"1px solid rgb(245, 245, 245)"
              }
            },
           
            router_Wrpper:{
              type:"view",
              ref:true,
              style:{
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"stretch",
                height:40,
                backgroundColor:"#fff",
                marginTop:8,
                paddingLeft:8,
                paddingRight:8
              },
              root:["router_Label","router_value","splitline2"]
            },
            router_Label:{
              type:"text",
              text:"流向",
              style:{
                fontSize:17,
                color:"#999",
              },
              preText:"*",
              preTextStyle:{
                color:"red",
                marginRight:2,
                fontSize:17,
                paddingTop:4
              },
              
            },
            router_value:{
              type:"icon",
              textPos:"left",
              style:{flex:1,justifyContent:"flex-end"},
              text:"请选择",
              textStyle:{
                flex:1,
                fontSize:17,
                alignItems:"flex-end"
              },
              font:"icomoon_e913"
            },
            taskActor_Wrapper:{
              type:"view",
              ref: true,
              style:{
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"stretch",
                height:40,
                backgroundColor:"#fff",
                paddingLeft:8,
                paddingRight:8
              },
              root:["taskActor_Label","taskActor_value"]
            },
            taskActor_Label:{
              type:"text",
              text:"处理人",
              style:{
                fontSize:17,
                color:"#999",
              },
              preText:"*",
              preTextStyle:{
                color:"red",
                marginRight:2,
                fontSize:17,
                paddingTop:4
              },
              
            },
            taskActor_value:{
              ref:true,
              type:"icon",
              textPos:"left",
              style:{flex:1,justifyContent:"flex-end"},
              text:"请选择",
              textStyle:{
                flex:1,
                fontSize:17,
                alignItems:"flex-end"
              },
              font:"icomoon_e913"
            },

            audit_wrapper:{
              type:"view",
              style:{
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                marginTop:8,
                height:36,
                paddingLeft:8,
                paddingRight:8,
                backgroundColor:"#fff"
              },
              root:["audit_title","audit_switch"]
            },
            audit_switch:{
              type:"switch",
              value:false
            },
            audit_title:{
              type:"text",
              text:"是否同意",
              style:{
                fontSize:17,
                color:"#999",
              },
              preText:"*",
              preTextStyle:{
                color:"red",
                marginRight:2,
                fontSize:17,
                paddingTop:4
              }
            },
            submitbtn:{
              type:"button",
              mode:"2",
              style:{
                margin:"10px auto",
                width:300,
                height:35,
                marginBottom:30,
                backgroundColor:"#F38236"
              },
              title:"提交"
            },           
            opinion_label:{
              type:"text",
              text:"处理意见",
              style:{
                fontSize:17,
                color:"#999",
                padding:"4px 8px"
              },
              preText:"*",
              preTextStyle:{
                color:"red",
                marginRight:2,
                fontSize:17,
                paddingTop:4
              },
              
            },
            
            opinion_textarea:{
              type:"textarea",
              placeholder:"请输入处理意见",
              style:{
                height:100,
                paddingLeft:7,
                fontSize:17,
                paddingTop:5,
              },
            },
            selectbtn:{
              type:"button",
              mode:"2",
              style:{
                margin:"10px auto",
                width:300,
                height:35,
                marginBottom:30,
                backgroundColor:"#F38236"
              },
              title:"选择人员"
            },           
        }
    };
});
