define(["../logic/notice"], function(pluginClass) {
	return {
		pluginClass: pluginClass,
		style: {
			backgroundColor: "#f0f4f6"
		},
		root: ["paga_header", "page_content","page_footer"],
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
				text: "公告",
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
				root: ["listview"],
				style: {
					flex: 1,
					overflowY: "auto",
					backgroundColor: "#fff",
					
				}
			},
			listview: {
				type: "listview",
				root: ["row_view"],
				ajaxConfig: {
					url: "GetNoticeList",
					type: "GET",
					dataType: "jsonp",
					pageSize: 5,
					pageNumKey: "page",
					data: {
						pageSize: 5
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
					flexDirection: "row",
					justifyContent: 'space-between',
				},
				root: ["row_left", "row_right"]
			},
			row_left: {
				type: "view",
				root: ["row_title", "row_submitDate"],
				style: {
					flex:1,
					flexDirection: "column"
				}
			},
			row_right: {
				type: "view",
				root: ["row_go"],
				style: {
					flexDirection: "row"
				}

			},
			row_title: {
				type: "text",
				numberofline:1,
				style: {
					fontSize: 16,
					fontWeight:"bold",
					color: "#333"
				},
				text_bind: "title"
			},
			row_submitDate: {
				type: "text",
				style: {
					fontSize: 13,
					color: "#8899a6",
					paddingTop: 10,
				},
				text_bind: "submitDate"
			},
			row_go: {
				type: "icon",
				iconStyle: {
					fontSize: 16
				},
				style: {
					width: "30px",
					height: "30px"
				},
				font: "icomoon_e913"
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