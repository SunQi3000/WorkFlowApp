define(["../logic/TabbarDemo"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["tabbar"],
        components:{
          tabbar:{
            type:"tabbarview",
            style:{
              flex:1
            },
            tabbarStyle:{
              position:"absolute",
              width:"100%",
              bottom:"0px",
              left:"0px",
              backgroundColor:"#fff"
            },
            root:[
              "message","contacts","app","my"
            ]
          },
          message:{
            type:"icon",
            selectedClassName:"yy-tabbar-item-selected",
            textPos:"bottom",
            font:"icomoon_e900",
            text:"消息",
            iconStyle:{
              fontSize:"20px"
            },
            textStyle:{
              marginTop:"2px"
            },
            style:{
              flex:1,
              height:"44px",
              justifyContent:"center",
              alignItems:"center"
            }
          },
          contacts:{
            type:"icon",
            textPos:"bottom",
            selectedClassName:"yy-tabbar-item-selected",
            font:"FontAwesome_f095",
            text:"通讯录",
            iconStyle:{
              fontSize:"20px"
            },
            textStyle:{
              marginTop:"2px"
            },
            style:{
              flex:1,
              height:"44px",
              justifyContent:"center",
              alignItems:"center"
            }
          },
          app:{
            type:"icon",
            textPos:"bottom",
            selectedClassName:"yy-tabbar-item-selected",
            font:"FontAwesome_f1b3",
            text:"应用",
            iconStyle:{
              fontSize:"20px"
            },
            textStyle:{
              marginTop:"2px"
            },
            style:{
              flex:1,
              height:"44px",
              justifyContent:"center",
              alignItems:"center"
            }
          },
          my:{
            type:"icon",
            textPos:"bottom",
            selectedClassName:"yy-tabbar-item-selected",
            font:"FontAwesome_f007",
            text:"我的",
            iconStyle:{
              fontSize:"20px"
            },
            textStyle:{
              marginTop:"2px"
            },
            style:{
              flex:1,
              height:"44px",
              justifyContent:"center",
              alignItems:"center"
            }
          }
        }
    };
});
