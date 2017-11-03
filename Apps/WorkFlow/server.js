const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(__dirname));

app.listen(1212, function() {
    console.log("====================");
	console.log('http://localhost:1212/dist/index.html, Ctrl+C to stop');
    console.log("====================");
})