////dates为数字类型，0代表今日,-1代表昨日，1代表明日，返回yyyy-mm-dd格式字符串，dates不传默认代表今日。
function getDate(dates) {
	var dd = new Date();
	var n = dates || 0;
	dd.setDate(dd.getDate() + n);
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;
	var d = dd.getDate();
	m = m < 10 ? "0" + m : m;
	d = d < 10 ? "0" + d : d;
	var day = y + "-" + m + "-" + d;
	return day;
};

////type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表本周，-1代表上周，1代表下周
//getMonday("s",1)  //得到下周一的yyyy-mm-dd格式日期
//getMonday("e",1)  //得到下周日的yyyy-mm-dd格式日期
function getMonday(type, dates) {
	var now = new Date();
	var nowTime = now.getTime();
	var day = now.getDay();
	var longTime = 24 * 60 * 60 * 1000;
	var n = longTime * 7 * (dates || 0);
	if(type == "s") {
		var dd = nowTime - (day - 1) * longTime + n;
	};
	if(type == "e") {
		var dd = nowTime + (7 - day) * longTime + n;
	};
	dd = new Date(dd);
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;
	var d = dd.getDate();
	m = m < 10 ? "0" + m : m;
	d = d < 10 ? "0" + d : d;
	var day = y + "-" + m + "-" + d;
	return day;
};