define(["../logic/index"], function(pluginClass) {
	return {
		pluginClass: pluginClass,
		style: {
			backgroundColor: "#F38236"
		},
		root: ["page_content"],
		components: {

			page_content: {
				type: "view",
				style: {				
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: "#F38236"
				},
				root: ["imglogo"]
			},
			imglogo: {
				type: "image",
				src: "./imgs/logo.png",
				style: {
					margin: "10px auto",
					width: "330px",
					backgroundColor: "#F38236"
				}
			}
		}
	};
});