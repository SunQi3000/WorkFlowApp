define(["../logic/noticeInfo"], function(pluginClass) {
	return {
		pluginClass: pluginClass,
		style: {
			backgroundColor: "#f1f1f1"
		},
		root: ["paga_header", "page_content"],
		components: {
			paga_header: {
				type: "view",
				root: ["backIcon", "right_icon", "header_title"],
				style: {
					height: "44px",
					borderBottom: "1px solid #e2e8ed",
					backgroundColor: "#F38236",
					justifyContent: "center",
					alignItems: "center"
				}
			},
			backIcon: {
				type: "icon",
				text: "",
				font:"FontAwesome_f0a8",
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
			header_title: {
				type: "text",
				text: "公告详情",
				style: {
					fontSize: 18,
					fontWeight: "bold",
					color: "#fff",
				}
			},
			right_icon: {
				type: "icon",
				font: "",
				style: {
					position: "absolute",
					right: "10px",
					color: "rgb(0, 147, 255)",
					top: "6px",
					width: "30px",
					height: "30px",
				},
				iconStyle: {
					fontSize: "20px"
				}
			},
			page_content: {
				type: "view",
				root: ["info_view","feed_view"],
				style: {
					flex: 1,
					overflowY: "auto",
					backgroundColor: "#f1f1f1"
				}
			},
			info_view: {
				type: "view",
				style: {
					backgroundColor: "#fff",
					flexDirection: "column",
					justifyContent:"center",
					paddingTop: 8,
					paddingBottom: 8,
					paddingLeft: 8,
					paddingRight: 8,
				},
				root: ["title_view","author_view","splitline", "content_view"]
			},
			title_view: {
				type: "view",
				style: {					
					justifyContent:"center",
					paddingLeft: 20,
					paddingRight: 20,
					paddingTop: 8,
					paddingBottom: 8
				},
				root: ["txt_title"]
			},
			author_view: {
				type: "view",
				style: {
					flexDirection: "row",
					justifyContent:"center"
				},
				root: ["txt_submitDate","txt_submitPersonName"]
			},
			content_view: {
				type: "view",
				style: {					
					justifyContent:"center",
					paddingTop: 8,
					paddingBottom: 15,
					paddingLeft: 8,
					paddingRight: 8,
				},
				root: ["txt_content"]
			},
			feed_view: {
				type: "view",
				style: {
					backgroundColor: "#f1f1f1",
					justifyContent:"center",
					paddingTop: 15,
					paddingBottom: 8,
					paddingLeft: 8,
					paddingRight: 8,
				},
				root: ["feed_textarea","btn_submit"]
			},
			txt_title: {
				type: "text",
				ref: true,
				text: "",				
				style: {
					justifyContent:"center",
					fontSize: 17,
					fontWeight:"bold",
					color: "#333"
				},
			},
			txt_submitDate: {
				type: "text",
				ref: true,
				text: "",
				style: {
					fontSize: 13,
					color: "#333"
				},
			},
			txt_submitPersonName: {
				type: "text",
				ref: true,
				text: "",
				preText:" (",
				nextText:")",
				style: {
					fontSize: 13,
					color: "#333"
				},
			},
			splitline: {
				type: "view",
				style: {
					left: 8,
					bottom: 0,
					right: 0,
					borderTop: "2px solid rgb(245, 245, 245)"
				}
			},
			txt_content: {
				type: "text",
				ref: true,
				text: "",
				style: {
					fontSize: 15,
					color: "#f00"
				},
			},
			
			feed_textarea:{
              type:"textarea",
              placeholder:"请输入回复信息",
              style:{
                height:100,
                paddingLeft:7,
                fontSize:15,
                paddingTop:5,
              },
            },
            btn_submit:{
              type:"button",
              mode:"2",
              style:{
                margin:"10px auto",
                backgroundColor: "#F38236",
                width:250,
                height:35,
                marginBottom:30
              },
              title:"回复"
            },
		}
	};
});