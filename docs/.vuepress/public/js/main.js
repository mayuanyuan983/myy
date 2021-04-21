function init() {
	// console.log('123');
	//如果你要操作界面元素的时候，由于该函数在head部分，可能会出现界面未加载完成，而你要读取界面节点的情况
	//我们做一个延时加载

	
}
//延时加载
setTimeout("init()",500);
setInterval(function() {   
	var time = new Date();   // 程序计时的月从0开始取值后+1   
	var hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
	var minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
	var second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
	var t = hour + ":" + minute + ":" + second + ":" + time.getMilliseconds();
}, 100); 