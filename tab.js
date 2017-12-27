(function($){

	var Tab = function(tab) {
		var _this_ = this;
		//保存单个tab组件
		this.tab = tab;
		
		//默认配置参数
		this.config = {
			"triggerType": "mouseover",	//用来定义鼠标触摸发类型
			"effect": "default",		//用来定义切换效果，是直接切换还是淡入淡出效果
			"invoke": 1,				//
			"auto": false
		}
		//如果配置参数存在，新扩展默认的配置参数
		if(this.getConfig()) {
			$.extend(this.config, this.getConfig());
		}
		
		//保存tab标签列表、对应的内容列表
		this.tabItems = this.tab.find("ul.tab-nav li");
		this.constentItems = this.tab.find("div.content-wrap div.content-item");
		
		//保存配置参数
		var config = this.config;
		
		if(config.triggerType === "click") {
			this.tabItems.bind( config.triggerType, function(){
				_this_.invoke( $(this) );
			})
		} else if(config.triggerType === "mouseover" || config.triggerType !== "click") {
			this.tabItems.bind( "mouseover", function(){
				_this_.invoke( $(this) );
			})
		}
		
		//自动切换功能，当配置
		if(config.auto) {
			//定义全局的定时器
			this.timer = null;
			//计数器
			this.loop = 0;
			this.autoplay();
			
			this.tab.hover(function() {
				window.clearInterval(_this_.timer);
			}, function() {
				_this_.autoplay();
			})
		}
		
		//设置默认显示第几个tab
		if(config.invoke > 1) {
			this.invoke(this.tabItems.eq(config.invoke -1));
		}
		
	}
	
	Tab.prototype = {
		//自动间隔时间切换
		autoplay: function() {
			var _this_ = this,
				tabItems = this.tabItems,		//临时保存tab列表
				tabLength = tabItems.length,	//tab的个数
				config = this.config;
				
			this.timer = window.setInterval(function() {
				_this_.loop ++;
				if(_this_.loop >= tabLength) {
					_this_.loop = 0;
				}
				tabItems.eq(_this_.loop).trigger(config.triggerType);
				
			}, config.auto);
		},
		
		
		//事件驱动函数
		invoke: function(currentTab) {
			var _this_ = this;
			
			/**
			 * 要执行Tab的选中状态，当前选中的加上actived(标记为白底)
			 * 切换对应的tab内容，要根据配置参数的effect是default还是fade
			 * **/
			var index = currentTab.index();
			//tab选中状态
			currentTab.addClass("actived").siblings().removeClass("actived");
			var effect = this.config.effect;
			var conItems = this.constentItems
			if(effect === "default" || effect !== "fade") {
				conItems.eq(index).addClass("current").siblings().removeClass("current");
			} else if(effect === "fade") {
				conItems.eq(index).fadeIn("current").siblings().fadeOut("current");
			}
			
			//注意：如果配置了自动切换，记得把当前的loop的值设置成当前tab的index
			if(this.config.auto) {
				this.loop = index;
			}
		},
		
		
		//获取配置参数
		getConfig: function() {
			//拿一下tab elem节点上的data-config
			var config = this.tab.attr("data-config");
			//确保有配置参数
			if(config && config != '') {
				return $.parseJSON(config);
			} else {
				return null;
			}
		}
	}
	
	window.Tab = Tab;
})(jQuery)
