define(["../logic/login"], function(pluginClass) {
	var Re = {
		pluginClass: pluginClass,
		style: {
			backgroundColor: "#f1f1f1"
		},
		root: ["page_header", "page_content"],
		components: {
			page_header: {
				type: "view",
				style: {
					height: "44px",
					borderBottom: "1px solid #eee",
					backgroundColor: "#F38236",
					justifyContent: "center",
					alignItems: "center"
				},
				root: ["page_header_title"]
			},
			page_header_title: {
				type: "text",
				text: "登  录",
				style: {
					fontSize: 18,
					fontWeight: "bold",
					color: "#fff",
				}
			},
			page_content: {
				type: "view",
				style: {
					flex: 1,
					overflowY: "auto",
					backgroundColor: "#ececec"
				},
				root: ["view_login", "view_button"]
			},
			view_login: {
				type: "view",
				style: {
					flex: 1,
					backgroundColor: "#f7f7f7",
					margin: "20px 20px,20px,20px",
					paddingTop: 80,
					paddingLeft: 10,
					paddingRight: 10,
					height: 120,
					border: "2px solid #dddddd",
				},
				root: ["txt_username", "txt_password", "check_view", "message_view"]
			},
			view_button: {
				type: "view",
				style: {
					flex: 1,
					overflowY: "auto"

				},
				root: ["btn_submit"]
			},
			txt_username: {
				ref: true,
				type: "input",
				style: {
					margin: "1px auto",
					height: 40,
					width: 250,
					backgroundColor: "#fff",
					fontSize: 17,
					paddingLeft: 7,
					border: "1px solid #eee",
				},
				placeholder: "请输入用户名"
			},
			txt_password: {
				type: "input",
				id: "txt_username",
				mode: "password",
				style: {
					margin: "5px auto",
					height: 40,
					width: 250,
					backgroundColor: "#fff",
					fontSize: 17,
					paddingLeft: 7,
					border: "1px solid #eee",
				},
				placeholder: "请输入密码"
			},

			check_view: {
				ref:true,
				type: "view",
				root: ["check_button", "check_text"],
				style: {
					margin: "5px auto",
					width: 250,
					paddingLeft: 7,
					paddingRight: 10,
					flexDirection: 'row',
					justifyContent: 'flex-start'
				}
			},
			check_button: {
				type: "checkbox",
				value: true

			},
			check_text: {
				type: "text",
				text: "绑定友空间帐号",
				style: {
					fontSize: 14,
					color: "gray",
					paddingLeft: 10,

				}
			},
			message_view: {
				type: "view",
				root: ["txt_message"],
				style: {
					margin: "5px auto",
					height: 40,
					width: 250,
					paddingLeft: 10,
					paddingRight: 10,
				}
			},
			txt_message: {
				ref: true,
				type: "text",
				text: "",
				style: {
					fontSize: 14,
					color: "red"

				}
			},
			btn_submit: {
				type: "button",
				mode: "2",
				style: {
					margin: "10px auto",
					width: 250,
					height: 35,
					marginBottom: 30,
					backgroundColor: "#F38236",
					fontSize: 17,
					fontWeight: "bold",
				},
				title: "登  录"
			},

		},

	};
	return Re;
});