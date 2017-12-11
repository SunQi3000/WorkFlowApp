define(["../logic/procedureInfo"], function(pluginClass) {
	return {
		pluginClass: pluginClass,
		style: {
			backgroundColor: "#f0f4f6"
		},
		root: ["page_header", "segment_wrapper", "page_content", "sharePoplayer"],
		components: {
			page_header: {
				type: "view",
				root: ["backIcon", "right_icon", "header_title"],
				style: {
					height: "44px",
					backgroundColor: "#F38236",
					justifyContent: "center",
					alignItems: "center"
				}
			},
			backIcon: {
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
			header_title: {
				type: "text",
				text: "ViewPager",
				style: {
					fontSize: 18,
					fontWeight: "bold",
					color: "#fff",
				}
			},
			right_icon: {
				type: "icon",
				text: "",
				font: "FontAwesome_f044",
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
			segment_wrapper: {
				type: "view",
				root: ["segment"],
				style: {
					height: 32,
					backgroundColor: "rgb(249, 249, 249)",
					justifyContent: "flex-start",
					borderBottom: "1px solid #e2e8ed",
					alignItems: "center"
				}
			},

			segment: {
				type: "segment_android",
				items: [{
					title: "业务信息"
				}, {
					title: "意见"
				}, {
					title: "流向"
				}],
				root: ["segment_item"],
				style: {
					height: 32,
					width: "100%"
				},

			},
			segment_item: {
				type: "icon",
				selectedClassName: "wf-sgm-item-selected",
				textStyle: {
					fontSize: 18,
					marginLeft: 3
				},
				iconStyle: {
					fontSize: 16
				}
			},
			page_content: {
				type: "view",
				root: ["attachment_view","pdf_view", "listview"],
				style: {
					flex: 1,
					overflowY: "auto",
					backgroundColor: "#fff"
				}
			},
			attachment_view:{
				ref:true,
				type: "view",
				root: ["attachment_icon"]
			},
			attachment_icon: {
				type: "icon",
				textPos: "left",
				style: {
					flex: 1,
					justifyContent: "flex-end",
					paddingRight: 30,
				},
				iconStyle:{
					fontSize: 30,
				},
				font: "FontAwesome_f0c6"
			},
			pdf_view: {
				type: "embed",				
				src: "",
				style: {
					height: "600",
					width: "100%",
					backgroundColor: "#fff",
				},
			},
			listview: {
				type: "listview",
				root: ["row_view"],
				ajaxConfig: {
					url: "GetWorkFlowPage",
					type: "GET",
					dataType: "jsonp",
					pageSize: 99999,
					pageNumKey: "pageNum",
					data: {
						pageSize: 99999
					},
				},
				style: {
					flexDirection: 'column',
					paddingLeft: 8,
					paddingRight: 8,
				},
				rowStyle: {
					paddingTop: 15,
					paddingBottom: 5,
					borderBottom: "1px solid #eee",
					flexDirection: 'column'
				},
			},
			row_view: {
				type: "view",
				style: {					
					flexDirection: "row"
				},
				root: ["row_content1"]
			},
			row_content1: {
				type: "view",
				style: {					
					flexDirection: "column",
					width: "100%"
				},
				root: ["row_line1", "row_line2", "row_line3"]
			},
			row_line1: {
				type: "view",
				root: ["left1", "right1"],
				style: {
					flexDirection: "row",
					justifyContent: 'space-between',
					paddingRight: 10,
				}
			},
			row_line2: {
				type: "view",
				root: ["left2", "right2"],
				style: {					
					flexDirection: "row",
					justifyContent: 'space-between',
					paddingRight: 10,
				}
			},
			row_line3: {
				type: "view",
				root: ["left3", "right3"],
				style: {
					flexDirection: "row",
					justifyContent: 'space-between',
					paddingRight: 10,
				}
			},

			left1: {
				type: "text",
				style: {
					fontSize: 16,
					fontWeight:"bold",
					color: "#333",
				},
				text_bind: "left1"
			},
			right1: {
				type: "text",
				numberofline: 1,
				style: {
					fontSize: 13,
					fontWeight:"bold",
					color: "#333"
				},
				text_bind: "right1"
			},
			left2: {
				type: "text",
				style: {
					fontSize: 13,
					color: "#8d8d8d",

				},
				text_bind: "left2"
			},
			right2: {
				type: "text",
				numberofline: 1,
				style: {
					fontSize: 13,
					color: "#8d8d8d",
				},
				text_bind: "right2"
			},
			left3: {
				type: "text",
				numberofline: 1,
				style: {
					fontSize: 13,
					color: "#8d8d8d",
				},
				text_bind: "left3"
			},
			right3: {
				type: "text",
				style: {
					fontSize: 13,
					color: "#8d8d8d",
				},
				text_bind: "right3"
			},
			sharePoplayer: {
				type: "poplayer",
				root: ["shareTitleWrapper", "shareMidWrapper", "cancelIcon"],
				mode: "bottom",
				bkCoverStyle: {
					backgroundColor: "rgba(0, 0, 0, 0.63)"
				},
				style: {
					height: 200,
					width: "100%",
					backgroundColor: "#f0f4f6",
					flexDirection: "column"
				}
			},
			shareTitleWrapper: {
				type: "view",
				style: {
					height: 28,
					justifyContent: "center",
					alignItems: "center"
				},
				root: ["shareTitle"]
			},
			shareMidWrapper: {
				type: "view",
				style: {
					flex: 1,
					backgroupColor:"#fff",
					marginTop: 20
				},
				root: ["shareRepeat"]
			},
			cancelIcon: {
				type: "icon",
				text: "取 消",
				style: {
					height: 50,
					backgroundColor: "#fff"
				},
				textStyle: {
					fontSize: 18,
					fontWeight:"bold",
					color: "#292f33"
				}
			},
			shareTitle: {
				type: "text",
				text: "－操作－",
				style: {
					color: "#8899a6",
					fontSize: 12
				}
			},			
			shareRepeat: {
				type: "repeat",				
				style: {										
					margin: "0 auto",
					width: "98%",
					alignItems: "center",
					justifyContent: "space-around"
				},
				itemStyle: {					
					height: 100,
					
				},
				root: ["shareIcon"]
			},
			shareIcon: {
				type: "icon",
				text: "分享",
				text_bind: "title",
				font_bind: "icon",
				iconStyle_bind: {
					color: "color"
				},
				iconStyle: {					
					display: "flex",
					fontSize: 30,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#f0f4f6",
					borderRadius: "100%",
				},
				textStyle: {
					marginTop: 8,
					fontSize: 16,
					color: "#292f33"
				},
				font: "icomoon_e914",
				textPos: "bottom"
			}
		}
	};
});