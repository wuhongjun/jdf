/**
*####跑马灯####
* 
***Demo**
* [marquee](../ui/marquee/1.0.0/example/marquee.html "Demo")
*
***参数**
*
*  - 	`align` {String}   'left' 向左或向上滚动left,top
*  - 	`step`  {Number} 1  步长
*  - 	`delay` {Number}  50 时间间隔
*  - 	`mainClass` {String}  'ui-marquee-main' 主体样式
*  - 	`itemClass` {String}  'ui-marquee-item' 列表样式
*  - 	`timeout` {Number}  1000 延时timeout后触发
*  - 	`autoStart` {Boolse}  true 自动触发
*
***举例**
* 
*js部分
*
*	$('#marquee').marquee();
* 
*html部分
*	
*	<div class="ui-marquee" id="marquee">
*		<ul class="ui-marquee-main">
*			<li class="ui-marquee-item"><a href="#" target="_blank">● 1 你敢抢？我减！我就敢减！</a> </li>
*			<li class="ui-marquee-item"><a href="#" target="_blank">● 2 京豆体系上线公告</a> </li>
*		</ul>
*	</div>		
*
* **update**
* 2013-11-12 9:11:39 by liuwei1
*
*/

;(function($, undefined) {
	$.ui.define('marquee', {
		 options: {
			align:'left',//向左或向上滚动left,top
			step : 1 ,//步长
			delay : 40,//时间间隔
			mainClass : 'ui-marquee-main',//主体样式
			itemClass : 'ui-marquee-item',//列表样式
			timeout : 1000,//延时timeout后第一次触发
			autoStart:true//自动触发
		},
		init:function(){
			var me = this;
			var opts = this.options;
			var el = this.el.find('.'+opts.mainClass);
			var main = this.el.find('.'+opts.mainClass);
			this.main = main;
			var item = this.el.find('.'+opts.itemClass);
			this.current = 0;
			
			var styleType = 'width';
			var rollType = 'left';
			var half = main.outerHeight();
			this.half = half;

			this.marqueeTimer = null;

			if (opts.align == 'top'){
				styleType = 'height';
				rollType = 'top';
			}else if (opts.align == 'left'){
				//以第一个元素为基准
				var width = item.eq(0).outerWidth();
				var itemSize = item.size();
				half = width*itemSize;
				this.half = half;
				item.css({'float':'left',width:width});
				if(itemSize==1){
					itemSize = 2;
				}
				itemSize = itemSize *2;
				main.css(styleType,half*itemSize);
			}

			this.rollType = rollType;
		
			this.el.css({position:'relative'});
			main.css({position:'absolute'});

			this.create();
			this.bind();

			if (opts.autoStart) {
				setTimeout(function(){
					me.start();
				},opts.timeout);
			}
		},
		destory:function(){
			clearInterval(this.marqueeTimer);
		},
		/**
		* 更新一次
		* @method update
		*/
		update:function(){
			 clearInterval(this.marqueeTimer);
			 this.create();
			 this.start();
		},
		create:function(){
			this.main[0].innerHTML += this.main[0].innerHTML;
		},
		start:function(){
			var me = this;
			var opts = this.options;
			var rollType = this.rollType;
			var direction = - 1;
			var half = this.half;

			var current = me.current;
			this.marqueeTimer = setInterval(function(){
				if (current >= half){
					current=0;
				}
				current += opts.step;
				me.current = current;
				me.main.css(rollType, direction * current);
			},opts.delay);

		},
		bind:function(){
			var me = this;
			this.el.bind('mouseenter',function(){
				clearInterval(me.marqueeTimer);
			})

			this.el.bind('mouseleave',function(){
				me.start();
			})
		}
	});
})(jQuery);