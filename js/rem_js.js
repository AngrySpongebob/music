(function(win,doc){
	var h;
	win.addEventListener('resize',function() {
	clearTimeout(h);
		h = setTimeout(setUnitA, 300);
	}, false);
	win.addEventListener('pageshow',function(e) {
		if (e.persisted) {
			clearTimeout(h);
			h = setTimeout(setUnitA, 300);
		}
	}, false);
	var setUnitA=function(){
		//以320的设计图为标准      定义最初html的font-size为100像素
		doc.documentElement.style.fontSize = 100*(doc.documentElement.clientWidth/720) + 'px';	
		
		
		
		// 我以1080px 为标准计算的
		// 所以n等于新浏览器的宽度除以1080
		// 根元素100px乘以n 则是放大后的大小 

		
		//根据物理宽度   和   实际宽度  算出相应的数值
		
		
	};
	setUnitA();

})(window,document);