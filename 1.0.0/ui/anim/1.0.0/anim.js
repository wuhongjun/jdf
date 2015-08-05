/**
*####动画函数####
* 
* 支持多元素批量生成动画;单个元素生成多帧动画;
* 
***Demo**
*
* [animate](../ui/animate/1.0.0/example/animate.html "Demo")
*
***参数**
*
*  - `trigger` {String}  'animate'
*
*	data-animate='{
*		<!--动画前样式-->
*		"from":"left:38px;transform:translateY(-100px);opacity:0",
*		<!--动画后样式-->
* 		"to":"left:38px;transform:translateY(80px);opacity:1,left:-38px;transform:translateY(80px);opacity:1",
* 		<!--动画速度-->
* 		"speed":600,
* 		<!--easing缓动函数-->
* 		"easing":"",
* 		<!--延时动画-->
* 		"delay":600,
* 	}'
*
* **update**
* 2014-8-27 13:52:34 by liuwei1
*
*/

;(function($, undefined) {
    $.ui.define('anim', {
		options: {
			trigger:'animate'
        },
		//所有元素列表
		elList:null,
		//当前动画元素列表
		currentList:{},
		//当前动画元素不初始化样式
		index:{},
		//初始化tag
		initTag:true,
        init:function(complete){
        	var me = this;
			
			var trigger = this.options.trigger;
			//强制使用样式回复到from初始状态
			var complete = typeof(complete) == "undefined" ? false :true;

			//减少遍历,提高性能
			if (this.initTag) {
				var dom =  this.el.find('*[data-'+trigger+']');
				this.elList = dom;
			}else {
				var dom = this.elList;
			}
			
			if (dom.size()>0) {
				dom.each(function(i){
					var animateData  = $(this).data(trigger);
					
					//加标识
					if (me.initTag) {
						me.index['index' + i] = i;
						$(this).attr(trigger+'-index',me.index['index' + i]);
					}

					var param = me.getParam(animateData);
					if (param.from) {
						if (!me.currentList['index'+i] || complete) {
							$(this).stop(true).css(param.from);
						}
					}
				})
			}

			this.initTag = false;
        },
		//更新一次,即重新缓存elList 
		//complete为true时强制更新
		update:function(complete){
			 this.initTag = true;
			 this.init(complete);
		},
		//触发 el为要触发元素的父级元素 
		trigger:function(el){
			var me = this;
			var trigger = this.options.trigger;

			if (typeof(el) == 'undefined') {
				return;
			}
			var dom =  el.find('*[data-'+trigger+']');
			if (dom.size()>0) {
				me.currentList = {};
				dom.each(function(i){
					var animateData  = $(this).data(trigger);
					var index = $(this).attr(trigger+'-index');
					me.currentList['index'+index] = 1;
					var param = me.getParam(animateData);

					var to = param.to;
					if (to) {
						for (var i in to  ){
							if (param.delay) {
								$(this).animate( null,{duration:param.delay} ).animate(to[i],param.speed,param.easeingFn,function(){
									me.init();
								});
							}else{
								$(this).animate(to[i],param.speed,param.easeingFn,function(){
									me.init();
								});
							};
						}
					}
				})
			}

			if(this.el.find('*[data-type]').size()>0){
				this.el.find('*[data-type]').each(function(i) {
					var _this = $(this);
					var type  = _this.data('type');
					_this.removeClass('animated '+type);
					_this.hide();
				});
			}

			// data-type="swing"
			// data-delay="300"
			if(el.find('*[data-type]').size()>0){
				el.find('*[data-type]').each(function(i) {
					var _this = $(this);
					var type  = _this.data('type');
					var delay  = _this.data('delay');
					delay = delay ? delay : 0;
					setTimeout(function(){
						_this.show();
						_this.addClass('animated '+type);
					},delay);
				});
			}
		},
		//从data-anmi上分离出css值
		getParam:function(animateData){
			var me = this;
			var from = animateData.from;
			var to = animateData.to || null;
			var speed = parseInt(animateData.speed) || null;
			var easeingFn = animateData.easing || null;
			var delay = parseInt(animateData.delay) || null;
			
			from = me.getCssValue(from);
			to = me.getCsssObject(to);
			
			return {
				delay:delay,
				from:from,
				to:to,
				speed:speed,
				easeingFn:easeingFn
			};
		},
		//left:38px;top:1px,left:38px;top:10px ==> [{'left':'38px','top':'1px'},{'left':'38px','top':'10px'}]
		getCsssObject:function(str){
			if (str == null) {
				return str;
			 }
			var strTemp = str.split(',');
			var result = [];
			for (var i=0  ; i<strTemp.length  ; i++ ){
				result.push(this.getCssValue(strTemp[i]));
			}
			return result;
		},
		//left:38px;transform:translateY(0px); ==> {'left':'38px','transform':'translateY(0px)'}
		getCssValue:function(str){
			var result = {};
			 if (str == null) {
				return str;
			 }
			str = str.split(';');
			for (var i = 0  ; i<str.length  ; i++ ){
				var j = str[i].split(':');
				if ($.trim(j[0])) {
					result[ $.trim(j[0]) ] = $.trim(j[1]) ;
				}
			}
			return result;
		}
    });
})(jQuery);