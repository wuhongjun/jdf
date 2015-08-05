/**
*####tips####
* 
* tips组件,是一个用于弹出一段内容的浮层,可用于提示,消息说明等.如果tips显示超过当前视野,经配置可自动显示在视野范围内的合适位置;定位基于父级元素,配置上左,上中,上右,左上,左中,左右等12个位置.
* 
***Demo**
* [tips](../ui/tips/1.0.0/example/tips.html "Demo")
*
***参数**
*
*   -  `tipsClass`   {String} 'ui-tips'    
*   -  `type`   {String} 'hover'    fixed || hover||click
*   -  `align`   {String} ['top','left']    位置
*   -  `autoWindow`   {Boole} true    自适应窗口
*   -  `autoResize`   {Boole} true    resize和scroll时,是否更新
*   -  `hasArrow`   {Boole} true    是否带箭头
*   -  `hasClose`   {Boole} true    是否带关闭
*	-  `closeName`	{String} ''     指定关闭tips的元素
*	-  `currClass`  {String} ''     指定触发tips的当前元素的class样式
*	-  `source`     {String} ''     指定填充tip的内容，当没有指定此属性时，则去读取元素的data-tips属性值
*   -  `zIndex`   {Number} 100    tips z-index
*   -  `onClose`   {Function} null    关闭时的回调函数，它会被传入两个回调参数：第一个参数表示当前触发tips事件的元素，第二个参数表示当前显示的tip
*   -  `diff`   {Number} 8     箭头高度值
*   -  `marginTop`   {Number} -4    marginTop容错值
*   -  `width` {Number} null //宽度
*   -  `mouseenterHideAll` {Boole} true mouseenter时先隐藏其它tips
*   -  `mouseleaveDelayTime` {Number} 500 mouseleaveDelayTime
*	-  `callback` {Function}//tip显示时的回调函数，它会被传入两个回调参数：第一个参数表示当前触发tips事件的元素，第二个参数表示当前显示的tip

*
***举例**
* 
*js部分
*
*	$('.tips').tips({
*		type:'hover',
*		hasArrow:true,
*		hasClose:true,
*		align:['top','left'],
*		autoWindow:true
*	});
* 
*html部分
*	
*<span class="tips" data-tips="this is test <a href='#'>more</a>">tips</span>
*
* **update**
* 2105-05-14 10:32:00 by chenxiaochun
* 修复tips在表格中的定位问题
*
* 2015-1-18 12:00:00 by liuwei1
* 修复IE7绑定性能问题
*
* 2014-12-10 16:14:00 by chenxiaochun
* 修复tips在dialog中不显示的问题
* 修复点击this.el内部中的元素时不显示tips的问题
*
* 2014-10-27 11:40:00 by chenxiaochun
* 添加三个参数：source，closeName，currClass
* 可以点击document关闭tips
*
* 2013-12-5 17:43:59 by liuwei1
*
*
*/

;(function($, undefined) {
	$.ui.define('tips', {
		 options: {
			sourceTrigger:null,
		 	trigger:null,
			hasCssLink:true,
			baseVersion:'1.0.0',
			cssLinkVersion:'1.0.0',
			tipsClass:'ui-tips',
			type:'hover',//fixed || hover||click
			align:['top','left'],//位置
			autoWindow:true,//自适应窗口
			autoResize:true,//resize和scroll时,是否更新
			hasArrow:true,//是否带箭头
			hasClose:true,//是否带关闭
			closeName: null,//可以指定用来关闭tip的元素
			currClass: '',//给触发tips的元素添加class样式
			zIndex:100,//tips z-index
			onClose:null,//关闭按钮点击时回调函数
			diff:8, //箭头高度值
			//marginTop:-1,//marginTop容错值
			//marginLeft:null,//marginLeft
			width:null,//宽度
			source: '',//可以直接给tip填充内容
			mouseenterHideAll:true,//mouseenter时先隐藏其它tips
			mouseleaveDelayTime:500,//mouseleaveDelayTime
			mouseenterDelayTime:0,//mouseenterDelayTime
			callback: function(){}//tip显示时的回调函数
		},
		init:function(){
			var me = this;
			var opts = this.options;
			this.create();
			this.tips = $('#uis-tips-'+this.guid+'');
			this.bindTag = true;

			//当点击文档中任意位置时，需要判断四个条件来决定是否隐藏当前的tips
			//1、target是否是this.el
			//2、target的parents是否是this.el
			//3、target是否是this.tips
			//4、target的parents是否是this.tips
			//5、当前是否有可见的tips
			// $(document).bind('click',function(e){
			// 	var target = e.target;
			// 	var $el = me.options.trigger ? me.el.find(me.options.trigger) : me.el;

			// 	if(!$(target).is($el) && !$(target).parents().is($el) && !$(target).is('.ui-tips') && !$(target).parents('.ui-tips').is('.ui-tips') && $('.ui-tips:visible').length){
			// 		me.hide();
			// 	}
			// });

			if (opts.type == 'fixed') {
				var $el = me.options.trigger ? me.el.find(me.options.trigger) : me.el;
				this.setInit($el);
			}
			
			if (opts.type == 'hover') {
				var mouseenterFn = function (){
					clearTimeout(me.mouseleave);
				}

				var mouseleaveFn = function(){
					me.mouseleave = setTimeout(function(){
						me.hide();
					}, opts.mouseleaveDelayTime);
				}

				var mouseenterFnEl = function(){
					var _this = $(this);
					clearTimeout(me.mouseenter);
					mouseenterFn();
					me.mouseenter = setTimeout(function(){
						me.hideAll();
						me.setInit(_this);
					}, opts.mouseenterDelayTime);
				}

				if(me.options.trigger){
					me.el.delegate(opts.trigger,'mouseenter',mouseenterFnEl);
					me.el.delegate(opts.trigger,'mouseleave',mouseleaveFn);		
				}else{
					me.el.bind('mouseenter',mouseenterFnEl);
					me.el.bind('mouseleave',mouseleaveFn);
				}
				
				me.tips.bind('mouseenter',mouseenterFn);
				me.tips.bind('mouseleave',mouseleaveFn);
			}

			if (opts.type == 'click') {
				var mouseupFn = function (){
					me.setInit($(this));
				}
				if(me.options.trigger){
					me.el.delegate(opts.trigger,'mouseup',mouseupFn);
				}else{
					me.el.bind('mouseup',mouseupFn);
				}
			}
			//me.update();
		},
		showBindEvent:function(e){
			var me = e.data;
			var target = e.target;
			var $el = me.options.trigger ? me.el.find(me.options.trigger) : me.el;
			if(!$(target).is($el) && !$(target).parents().is($el) && !$(target).is('.ui-tips') && !$(target).parents('.ui-tips').is('.ui-tips') && $('.ui-tips:visible').length){
				me.hide();
			}
		},
		/**
		 * @显示
		 * @method show
		 */
		show:function(){
			this.tips.show();
			//在el上添加一个class样式
			var $el = this.options.trigger ? this.el.find(this.options.trigger) : this.el;
			$el.addClass(this.options.currClass);
			$(document).bind('click',this,this.showBindEvent);
		},
		/**
		 * @隐藏
		 * @method hide
		 */
		hide:function(){
			this.tips.hide();
			//移除el上的class样式
			var $el = this.options.trigger ? this.el.find(this.options.trigger) : this.el;
			$el.removeClass(this.options.currClass);;
			//调用onclose回调
			if(this.options.onClose){this.options.onClose.call(null, $el, this.tips)};
			$(document).unbind('click',this,this.showBindEvent);
		},
		/**
		 * @隐藏所有tips
		 * @method hide
		 */
		hideAll:function (){
			if(this.options.mouseenterHideAll){
				$('.ui-tips').hide();
				$('.'+this.options.tipsClass).hide();
			}
		},
		setInit:function(el){
			var tipsContent = '';
			var source = this.options.source;
			var sourceTrigger = this.options.sourceTrigger;
			if(sourceTrigger){
				tipsContent = $(sourceTrigger).html();
			}else if(source){
				tipsContent = source;
			}else{
				tipsContent = el.attr('data-tips');
			}
				
			if (tipsContent) {
				this.tips.find('.ui-tips-main').html(tipsContent);
				this.update(el);
				this.show();
				if (this.bindTag) {
					this.bind();
				}
				this.options.callback.call(this.tips.find('.ui-tips-main'), el, this.tips);
			}
		},
		bind:function(){
			var me = this;
			var opts = this.options;

			//为关闭按钮绑定事件
			me.tips.find('.ui-tips-close').bind('click', function(){
				me.hide();
			});

			$(me.tips.find(me.options.closeName)).live('click', function(){
				me.hide();
			});

			if (opts.autoResize) {
				var $el = this.options.trigger ? this.el.find(this.options.trigger) : this.el;
				$(window).bind('resize',function(){
					me.update($el);
				});

				if(!$.browser.msie){
					$(window).scroll(function(){
						me.update($el);
					});
				}
			}
			this.bindTag = false;
		},
		create:function(){
			var opts = this.options;
			var arrowHtml = '';
			var zIndex = opts.zIndex+this.guid;

			if (opts.hasArrow) {
				arrowHtml = '<span class="ui-tips-arrow" style="z-index:'+zIndex+'"></span>';
			}
			var closeHtml = '';
			if (this.options.hasClose) {
				closeHtml = '<span class="ui-tips-close" style="z-index:'+zIndex+'">x</span>';
			}
			var templete = [
				'<div class="'+opts.tipsClass+' ui-tips-top" style="display:none;z-index:'+zIndex+'" id="uis-tips-'+this.guid+'">',
				'	<div class="ui-tips-main">',
				'	</div>',
				arrowHtml,
				closeHtml,
				'</div>'
			].join('');
			
			if (opts.type == 'fixed') {
				var $el = this.options.trigger ? this.el.find(this.options.trigger) : this.el;
				$(templete).appendTo($el);
			}else {
				$(templete).appendTo('body');
			}
		},
		update:function(el){
			var opts = this.options;
			this.align(opts.align[0],opts.align[1],el);
		},
		align:function(i,j,el){
			var opts = this.options;
			var diff = opts.diff;
			var offset = el.offset();
			var elW = el.outerWidth(true);
			var elH = el.outerHeight(true);

			var top = offset.top;
			var left = offset.left;

			var tips = this.tips;
			var tipsClass='ui-tips ui-tips-top';
			var tipsW = opts.width || tips.outerWidth();
			var tipsH = opts.height || tips.outerHeight();

			if ($.inArray(i, ['top','bottom','left','right']) != -1) {
				tipsClass = 'ui-tips ui-tips-'+i;
			}

			if ($.inArray(j, ['top','bottom','left','right','center']) != -1) {	
				if (i == 'top' || i=='bottom') {
					
					if ((left+tipsW) > $.page.clientWidth() && opts.autoWindow) { 
						j='right';
					}

					if ( left < tipsW && opts.autoWindow) {
						j='left';
					}

					if(top-tipsH-diff <$(document).scrollTop()  && opts.autoWindow) {
						i='top';
						tipsClass = 'ui-tips ui-tips-'+i;
					}

					if (top+tipsH+elH+diff > ($(document).scrollTop() +$.page.clientHeight())  && opts.autoWindow) {
						i='bottom';
						tipsClass = 'ui-tips ui-tips-'+i;
					}

					tipsClass += ' ui-tips-x-'+j;
					
					if (i=='top') {top = top+elH+diff;}
					if (i=='bottom') {top = top-tipsH-diff;}
					
					if (j=='left') {left = left;}
					if (j=='center') {left = left-tipsW/2+elW/2;}
					if (j=='right') {left = left-tipsW+elW;}
				}
				
				if (i == 'left' || i=='right') {
					if ((left+tipsW+elW+diff) > $.page.clientWidth()  && opts.autoWindow) {
						i = 'right';
						tipsClass = 'ui-tips ui-tips-'+i;
					}

					if ( left < tipsW && opts.autoWindow) {
						i='left';
						tipsClass = 'ui-tips ui-tips-'+i;
					}

					if ( (top-tipsH+elH+diff) < $(document).scrollTop()  && opts.autoWindow) {
						j='top';
					}
					
					if (top+tipsH-diff> ($(document).scrollTop() + $.page.clientHeight()) && opts.autoWindow) {
						j='bottom';
					}
				
					tipsClass += ' ui-tips-y-'+j;
					if (i == 'left') {left = left + elW+2*diff;}
					if (i == 'right') {left = left - tipsW-diff;}
					if (j=='top') {top = top - elH+diff}
					if (j=='center') {top = top-tipsH/2+elH}
					if (j=='bottom') {top = top-tipsH+elH/2+2*diff}
				}
			}

			if(this.options.tipsClass != 'ui-tips'){
				tipsClass += ' ' + this.options.tipsClass;
			}

			tips.attr('class', tipsClass);
			//if (opts.type =='hover') {
			//	tips.css({marginTop:opts.marginTop});
			//}else{
				tips.css({top:top,left:left});
			//}

			if (opts.width) tips.css({width:opts.width});
		}
	});
})(jQuery);