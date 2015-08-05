/**
*####模拟滚动条####
* 
* 模拟原生滚动条,支持鼠标中轮滑动,内容变更可更新滚动条高度,另外加载时会默认使用原生滚动条.
* 
***Demo**
* [scrollbar](../ui/scrollbar/1.0.0/example/scrollbar.html "Demo")
*
***参数**
*
*  - 	`scrollClass` {String} 'ui-scrollbar-item' 滚动条class
*  - 	`mainClass` {String} 'ui-scrollbar-main' 主体clsass
*  - 	`wrapClass` {String} 'ui-scrollbar-wrap' 最外层class
*  - 	`width` {Number} 15 滚动条宽度
*  - 	`mixHeight ` {Number}  15 滚动条最小高度
*  - 	`step` {Number} 5 滚动条步进值
*  - 	`hasHeadTail` {Boolean} true 是否有头尾
*  - 	`headTailHeight ` {Number}  15 滚动条头尾高度
*  - 	`hasHeadTailM` {Boolean} false 是否有最上/和最下
*  - 	`headTailHeightM` {Number} 15 滚动条最上/和最下高度
*  - 	`limit` {Boolean} true 在滚动条最上面和最下面,继续滚动,是否阻止外围滚动条
*  - 	`zIndex` {Number} 10 zIndex
*
***举例**
* 
*js部分
*
*	var scrollbar = $('#scrollbar').scrollbar();
*	scrollbar.update();//更新时调用
* 
*html部分
*	
*	<div class="ui-scrollbar" id="scrollbar">
*		scrollbar
*	</div>		
*
* **update**
* 2013-11-13 9:11:39 by liuwei1
*
*/

;(function($, undefined) {
	$.ui.define('scrollbar', {
		 options: {
			hasCssLink:true,
			baseVersion:'1.0.0',
			cssLinkVersion:'1.0.0',
			scrollClass : 'ui-scrollbar-item',//滚动条class
			mainClass:'ui-scrollbar-main',//主体clsass
			wrapClass : 'ui-scrollbar-wrap',//最外层class
			width : 15,//滚动条宽度
			mixHeight : 15,//滚动条最小高度
			step :5, //滚动条步进值
			hasHeadTail:true,//是否有头尾
			headTailHeight : 15, //滚动条头尾高度

			hasHeadTailM:false,//是否有最上/和最下
			headTailHeightM:15, //滚动条最上/和最下高度

			limit:true, //在滚动条最上面和最下面,继续滚动,是否阻止外围滚动条
			zIndex:10//zIndex
		},
		//原理: 总体高度H  试图区域高度h1  滚动条高度h2  
		//(H-h1)/H = (h1-h2)/h1   即h2 = h1*h1 / H
		init:function(){
			var opts = this.options;
			if (!opts.hasHeadTail) {
				opts.headTailHeight = 0;
			}
			if (!opts.hasHeadTailM) {
				opts.headTailHeightM = 0;
			}else{
				opts.headTailHeight += opts.headTailHeightM;
				this.scrollBarTop = opts.headTailHeight;
			}

			this.create();
			this.scrollInit();
			this.bind();
			this.dragInit();
		},
		/**
		* 更新滚动条
		* @method update
		*/
		update:function(){
			this.scrollInit();
			this.dragInit();
		},
		/**
		* 创建滚动条
		* @method create
		*/
		create:function(){
			var opts = this.options;
			this.el.css({position:'absolute',left:0,top:0,overflow:'hidden'});

			this.wrapWidth = this.el.outerWidth();
			this.wrapHeight = this.el.outerHeight();

			var main = $(document.createElement('div'));
			main.addClass(opts.wrapClass);
			this.el.after(main);
			main.append(this.el);
			this.main = main;
			
			var scroll = $(document.createElement('div'));
			scroll.addClass(opts.scrollClass);
			this.el.after(scroll);
			this.scroll = scroll;

			this.main.css({
				position:'relative',
				overflow:'hidden',
				width:this.wrapWidth,
				height:this.wrapHeight,
				zIndex:opts.zIndex
			});
			
			var scrollCss = {
				position:'absolute',
				left:this.wrapWidth-opts.width,
				top:opts.headTailHeight,
				width:opts.width-2,
				zIndex:opts.zIndex+2
			}
			this.scroll.css(scrollCss);
			
			//scrollbar-head
			var scrollT = $(document.createElement('div'));
			//scrollbar-nail
			var scrollB = $(document.createElement('div'));

			if (opts.hasHeadTail) {
				this.el.after(scrollT);
				scrollT.addClass('ui-scrollbar-head');
				scrollT.css($.extend(scrollCss,{top:'auto',width:opts.width}));
				
				this.el.after(scrollB);
				scrollB.addClass('ui-scrollbar-nail');
				scrollB.css($.extend(scrollCss,{top:'auto',bottom:0,width:opts.width}));
			}

			if (opts.hasHeadTailM) {
				//scrollbar-head-max
				var scrollTM = $(document.createElement('div'));
				this.el.after(scrollTM);
				scrollTM.addClass('ui-scrollbar-head-max');
				scrollTM.css($.extend(scrollCss,{top:0,width:opts.width}));
				
				//scrollbar-nail-max
				var scrollBM = $(document.createElement('div'));
				this.el.after(scrollBM);
				scrollBM.addClass('ui-scrollbar-nail-max');
				scrollBM.css($.extend(scrollCss,{top:'auto',bottom:0,width:opts.width}));
				
				scrollT.css({top: opts.headTailHeightM});
				scrollB.css({bottom: opts.headTailHeightM});
			}

			var scrollBg = $(document.createElement('div'));
			this.el.after(scrollBg);
			scrollBg.addClass('ui-scrollbar-bg');
			scrollBg.css($.extend(scrollCss,{
				top:'auto',
				width:opts.width,
				zIndex:opts.zIndex+1
			}));
		},
		/**
		* 滚动条初始化
		* @method scrollInit
		*/
		scrollInit:function(){
			var opts = this.options;
			var itemHeight = this.el.find('.'+opts.mainClass).outerHeight();
			if ( itemHeight - this.wrapHeight <= 0){
				this.scroll.hide();
			}else{
				//itemHeight -= opts.headTailHeight*2;
				var H = this.H = itemHeight;//主体所有高度
				var h1  = this.h1 = this.wrapHeight;//可视区域高度
				var h2  = parseInt ( ( h1 * h1 ) / H ); //滚动条高度
				if (h2<opts.mixHeight) h2 = opts.mixHeight;
			    this.h2 = h2;
				this.el.css({height:H})
				this.scroll.css({height:h2}).show();
			}
			
			this.minTop = opts.headTailHeight;
			this.maxTop =  this.h1 - this.h2 - opts.headTailHeight;

			this.el.siblings('.ui-scrollbar-bg').css({height:h1})
		},
		bind:function(){
			var me = this;
			var opts = this.options;
			var mousewheelEvent = 'mousewheel';
			var isFirefox = $.browser.mozilla;
			if (isFirefox) mousewheelEvent = 'DOMMouseScroll';
			this.main.bind(mousewheelEvent,function(event){
				var stepValue;
				//jquery v1.6.4 + no event.wheelDelta
				var wheelValue = event.wheelDelta;
				if (isFirefox) wheelValue = - event.detail;
				if (wheelValue){
					me.mousewheel(wheelValue);
				}
				
				if (me.limit){
					event.preventDefault();
				}
			});

			this.scroll.bind('mouseover',function(){
				 $(this).addClass('ui-scrollbar-item-hover')
			}).bind('mouseout',function(){
				 $(this).removeClass('ui-scrollbar-item-hover')
			}).bind('mousedown',function(){
				 $(this).addClass('ui-scrollbar-item-on')
			}).bind('mouseup',function(){
				 $(this).removeClass('ui-scrollbar-item-on')
			})

			if (this.options.hasHeadTail) {
				this.el.siblings('.ui-scrollbar-head').bind('click',function(){
					me.mousewheel(1);
				}).bind('mouseover',function(){
					 $(this).addClass('ui-scrollbar-head-hover')
				}).bind('mouseout',function(){
					 $(this).removeClass('ui-scrollbar-head-hover')
				}).bind('mousedown',function(){
					 $(this).addClass('ui-scrollbar-head-on')
				}).bind('mouseup',function(){
					 $(this).removeClass('ui-scrollbar-head-on')
				})

				this.el.siblings('.ui-scrollbar-nail').bind('click',function(){
					me.mousewheel(-1);
				}).bind('mouseover',function(){
					 $(this).addClass('ui-scrollbar-nail-hover')
				}).bind('mouseout',function(){
					 $(this).removeClass('ui-scrollbar-nail-hover')
				}).bind('mousedown',function(){
					 $(this).addClass('ui-scrollbar-nail-on')
				}).bind('mouseup',function(){
					 $(this).removeClass('ui-scrollbar-nail-on')
				})
			}

			if(this.options.hasHeadTailM){
				this.el.siblings('.ui-scrollbar-head-max').bind('click',function(){
					for (var i=0; i<me.getStep(); i++){
						me.mousewheel(1);
					}
				}).bind('mouseover',function(){
					 $(this).addClass('ui-scrollbar-head-max-hover')
				}).bind('mouseout',function(){
					 $(this).removeClass('ui-scrollbar-head-max-hover')
				}).bind('mousedown',function(){
					 $(this).addClass('ui-scrollbar-head-max-on')
				}).bind('mouseup',function(){
					 $(this).removeClass('ui-scrollbar-head-max-on')
				})

				this.el.siblings('.ui-scrollbar-nail-max').bind('click',function(){
					for (var i=0; i<me.getStep(); i++){
						me.mousewheel(-1);
					}
				}).bind('mouseover',function(){
					 $(this).addClass('ui-scrollbar-nail-max-hover')
				}).bind('mouseout',function(){
					 $(this).removeClass('ui-scrollbar-nail-max-hover')
				}).bind('mousedown',function(){
					 $(this).addClass('ui-scrollbar-nail-max-on')
				}).bind('mouseup',function(){
					 $(this).removeClass('ui-scrollbar-nail-max-on')
				})
			}
			
			//滚动条空白条点击
			this.el.next('.ui-scrollbar-bg').bind('click',function(event){
				if (event.clientX > (me.wrapWidth - opts.width) ) {
					if (event.clientY - (me.scrollBarTop+me.h2) > 0 ) {
						me.mousewheel(-1);
					}else {
						me.mousewheel(1);
					}
				}
			})
		},
		//设置主体区域的top
		setTop:function(top,direction){
			this.scrollBarTop = top;

			var opts = this.options;
			if (direction<0) {
				//向下
				top +=  opts.headTailHeight;
			}else {
				//向上
				top -=  opts.headTailHeight;
			}
			var top = [( this.H - this.h1) / (this.h1-this.h2)] * top;
			this.el.css({top:-top});
		},
		/**
		* 拖拽初始化
		* @method dragInit
		*/
		dragInit:function(){
			var me = this;
			this.scroll.drag({
				lockX:true,
				minTop:me.minTop,
				maxTop: me.maxTop,
				drag:function(data){
					me.setTop(data.top,data.topDirection);
				}
			})
		},
		getStep:function(){
			var opts = this.options;
			var h1 = this.h1;
			var h2 = this.h2;
			var H  = this.H;
			var step = opts.step * parseInt( (H-h1) / h1);
			return step;
		},
		/**
		* 滚动条top值
		* @method scrollBarTop
		*/
		scrollBarTop:0,
		/**
		* mousewheel
		* @method mousewheel
		*/
		mousewheel:function(wheelValue){
			var opts = this.options;
			var h1 = this.h1;
			var h2 = this.h2;
			var H  = this.H;
			var step = this.getStep();
			var top = this.scrollBarTop;
			var scrollStepValue = ( 1 / step ) * (h1-h2);
			
			if (wheelValue<0){
				//向下
				top += scrollStepValue;
			}else{
				//向上
				top -= scrollStepValue;
			}

			if ( ( top > (h1 - h2) ) || top < 0 ){
				if ( opts.limit) {
					this.limit = false;
				}
			}else{
				this.limit = true;
			}
			
			if (wheelValue<0){
				//向下
				if (top > this.maxTop) {
					top = this.maxTop;
				}

			}else{
				//向下
				if (top < this.minTop) {
					top = this.minTop;
				}
			}

			this.scroll.css({top:top});
			this.setTop(top,wheelValue);
			this.scrollBarTop = top;
		}
	});
})(jQuery);