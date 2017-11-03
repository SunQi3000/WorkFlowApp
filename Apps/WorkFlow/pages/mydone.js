define(["../logic/mytodo"], function(pluginClass) {
	return {
		pluginClass: pluginClass,
		style: {
			backgroundColor: "#f0f4f6"
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
				style: {
					position: "absolute",
					left: "0px",
					color: "#fff",
					top: "7px",
					width: "50px",
					height: "30px",
				},
				textStyle: {
					fontSize: "14px"
				}
			},
			header_title: {
				type: "text",
				text: "我的已办",
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
					url: "GetWorkFlowActGroupDone",
					type: "GET",
					dataType: "jsonp",
					pageSize: 20,
					pageNumKey: "pageNum",
					data: {
						pageSize: 20
					},
				},
				style: {
					flexDirection: 'column',
					paddingLeft: 8,
					paddingRight: 8,
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
					justifyContent: 'space-between'
				},
				root: ["row_left", "row_right"]
			},
			row_left: {
				type: "view",
				root: ["row_name", "row_leftbracket", "row_count", "row_rightbracket"],
				style: {
					flexDirection: "row"
				}
			},
			row_right: {
				type: "view",
				root: ["row_go"],
				style: {
					flexDirection: "row"
				}

			},
			row_name: {
				type: "text",
				style: {
					fontSize: 13,
					color: "#333"
				},
				text_bind: "procedureName"
			},
			row_count: {
				type: "text",
				style: {
					fontSize: 13,
					color: "#333"
				},
				text_bind: "actCount"
			},
			row_leftbracket: {
				type: "text",
				text: " ( ",
				style: {
					fontSize: 13,
					color: "#333"
				},
			},
			row_rightbracket: {
				type: "text",
				text: " ) ",
				style: {
					fontSize: 13,
					color: "#333"
				},
			},
			row_go: {
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
		}
	};
});