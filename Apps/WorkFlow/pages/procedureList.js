define(["../logic/procedureList"], function(pluginClass) {
	return {
		pluginClass: pluginClass,
		style: {
			backgroundColor: "#f0f4f6"
		},		
		root: ["page_header", "segment_wrapper", "page_content"],
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
				text: "ViewPager",
				style: {
					fontSize: 18,
					fontWeight: "bold",
					color: "#fff",
				}
			},
			right_icon: {
				type: "icon",
				font: "FontAwesome_f01e",
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
					title: "今日"
				}, {
					title: "本周"
				}, {
					title: "更早"
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
				root: ["listview"],
				style: {
					flex: 1,
					overflowY: "auto",
					backgroundColor: "#fff"
				}
			},
			listview: {
				type: "listview",
				root: ["row_view"],
				ajaxConfig: {
					url: "GetWorkFlowActListSigned",
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
				},
				rowStyle: {
					paddingTop: 15,
					paddingBottom: 15,
					borderBottom: "1px solid #eee",
					flexDirection: 'column'
				},
			},
			row_view: {
				type: "view",
				style: {
					flexDirection: "row",
					paddingTop: 5,
					paddingBottom: 4
				},
				root: ["row_content", "row_end"]
			},
			row_end: {
				type: "view",
				style: {
					flexDirection: "row",
					width: "10%",
					justifyContent: 'flex-center'
				},
				root: ["row_goto"]
			},
			row_goto: {
			  type:"icon",
              iconStyle:{
                fontSize:14
              },
              style:{
                width:"30px",
                height:"30px"
              },
              font:"icomoon_e913"
			},
			row_content: {
				type: "view",
				style: {
					flexDirection: "column",
					width: "90%"
				},
				root: ["row_line1", "row_line2"]
			},
			row_line1: {
				type: "view",
				root: ["row_title", "row_flowNumber"],
				style: {
					flexDirection: "column"
				}
			},
			row_line2: {
				type: "view",
				root: ["row_right"],
				style: {
					flexDirection: "row",
					justifyContent: 'flex-end'
				}
			},

			row_right: {
				type: "view",
				root: ["row_fromUserName", "row_fromDate"],
				style: {
					flexDirection: "column",

				}
			},
			row_title: {
				type: "text",
				style: {
					fontSize: 16,
					fontWeight:"bold",
					color: "#333",
				},
				text_bind: "title"
			},
			row_flowNumber: {
				type: "text",
				style: {
					fontSize: 14,
					color: "#333"
				},
				text_bind: "flowNumber"
			},

			row_fromUserName: {
				type: "text",
				style: {
					fontSize: 16,
					fontWeight:"bold",
					color: "#333",
					justifyContent: 'flex-end'
				},
				text_bind: "fromUserName"
			},
			row_fromDate: {
				type: "text",
				style: {
					fontSize: 13,
					color: "#333",
					whiteSpace: "nowrap",
					justifyContent: 'flex-end'
				},
				text_bind: "fromDate"
			},
		}
	};
});