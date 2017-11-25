const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(__dirname));

app.listen(3333, function() {	
    console.log("====================");
	console.log('http://localhost:3333/dist/index.html, Ctrl+C to stop');
	console.log("注意：移动审批服务已启动，关闭该窗口服务将停止.");
    console.log("====================");
})