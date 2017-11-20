define(["../logic/seemore"], function(pluginClass) {
	return {
		pluginClass: pluginClass,
		style: {
			backgroundColor: "#f0f3f4"
		},
		root: ["page_header", "content_wrapper"],
		components: {
			page_header: {
				type: "view",
				root: ["backIcon", "header_title"],
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
				style: {
					position: "absolute",
					left: "0px",
					color: "#fff",
					top: "7px",
					width: "50px",
					height: "30px",
				},
				textStyle: {
					fontSize: "15px"
				}
			},
			header_title: {
				type: "text",
				style: {
					fontSize: 18,
					fontWeight: "bold",
					color: "#fff",
				},
				text: "更多"
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
			content_wrapper: {
				type: "view",
				style: {
					flex: 1,
					overflowY: "auto"
				},
				root: ["userview", "repeat"]
			},
			userview:{
				type: "view",
				style: {
					backgroundColor: "#fff",
					padding: "6px 0px",
					flexDirection: "row",
					marginLeft: "7px",
					height: "40px",
					justifyContent: "flex-start",
					marginTop:"15px",
					marginBottom:"15px"
				},
				root: ["icon_user","txt_user"]
			},
			icon_user: {
				type: "icon",				
				font: "FontAwesome_f015",				
				iconStyle: {
					fontSize: "22px",
					marginLeft: 4,
					width: 30,
					color: "#8899a6"
				}
			},
			txt_user:{
				type: "text",
				ref:true,
				preText: "当前用户：",				
				style: {
					marginLeft: "8px",
					color: "#8899a6",
					fontSize: "16px"
				},				
				textStyle:{
					color: "#000",
				}
			},
			
			repeat: {
				type: "repeat",
				className: "demo-repeat-2",
				root: ["repeat_icon", "rp_right_icon"],
				items: [{
						label: "<a href='mailto:sunqib@yonyou.com' style='text-decoration:none;color: #8899a6;'>问题与意见</a>",
						icon: "FontAwesome_f199"
					},
					{
						label: "功能介绍",
						icon: "FontAwesome_f02d"
					},
					{
						label: "关于我们",
						icon: "FontAwesome_f05a"
					},
					{
						label: "注销",
						icon: "FontAwesome_f013"
					}
				],
				style: {
					backgroundColor: "#fff",
					flexDirection: "column",
					borderBottom: "1px solid #e2e8ed",
				},
				itemStyle: {
					backgroundColor: "#fff",
					padding: "6px 0px",
					flexDirection: "row",
				},
				splitStyle: {
					borderTop: "1px solid #e2e8ed",
					marginLeft: "40px",
					transform: "scaleY(.5)"
				},
			},
			rp_right_icon: {
				type: "icon",
				iconStyle: {
					fontSize: 14
				},
				style: {
					width: "30px",
					height: "30px"
				},
				font: "icomoon_e913"
			},
			repeat_icon: {
				type: "icon",
				font_bind: "icon",
				text_bind: "label",
				textStyle: {
					marginLeft: "8px",
					color: "#8899a6",
					fontSize: "16px"
				},
				textPos: "right",
				style: {
					flex: 1,
					width: "130px",
					marginLeft: "7px",
					height: "30px",
					justifyContent: "flex-start"
				},
				iconStyle: {
					fontSize: "22px",
					marginLeft: 4,
					width: 30,
					color: "#8899a6"
				}
			}
		}

	};
});