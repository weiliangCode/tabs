;(function($){

	var Tab = function() {
		var _this_ = this;
		
		//默认配置参数
		
		this.config = {
			"triggerType": "mouseover",	//用来定义鼠标触摸发类型
			"effect": "default",		//用来定义切换效果，是直接切换还是淡入淡出效果
			"invoke": 1,				//
			"auto": false
		}
	}
	
	Tab.prototype = {
		
	}
	
	window.Tab = Tab;
})(jQuery)
