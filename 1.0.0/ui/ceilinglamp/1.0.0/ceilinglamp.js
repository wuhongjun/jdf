/**
*####吸顶灯####
* 
*当滚动条滚动至某个元素的顶部位置时,把它悬挂至页面最顶部,类似吸顶灯的效果
* 
***Demo**
*
* [ceilinglamp](../ui/ceilinglamp/1.0.0/example/ceilinglamp.html "Demo")
*
***参数**
*
*  - 	`arrive` {Object} null 到达某元素停止悬挂
*  - 	`arriveThreshold` {Number} 0 到达某元素停止悬挂的阈值
*  - 	`hasWrap` {Boolean} false 是否有外层wrap结构,false:添加wrap结构，true：不添加wrap结构
*  - 	`hasStyle` {Boolean} false 是否有样式，false添加样式，true不添加样式
*  - 	`currentClassName` {String} ui-ceilinglamp-current 悬挂起作用时的增加的样式名称
*  - 	`threshold` {Number} auto  显示或消失时阀值，默认'auto'等于原因的高度outerHeight(true)
*  - 	`zIndex` {Number} 100 悬挂时样式的z-index
*  - 	`top` {Number} 0 悬挂时距页面最上面的高度值
*  - 	`align` {String} null 显示视角控制 支持 top、bottom
*  - 	`scrollDelay` {Number} 0 页面滚动时，节流延迟时间 毫秒
*  - 	`onShow` {Function} null 显示时回调 this=ceilinglamp, args[0]=$当前节点
*  - 	`onHide` {Function} null 隐藏时回调 this=ceilinglamp, args[0]=$当前节点
***举例**
*
*js部分
*
*	$('#ceilinglamp').ceilinglamp();
* 
***html部分**
*	
*	<div class="ui-ceilinglamp" id="ceilinglamp">
*		<a href="#">吸顶灯</a>
*		</ul>
*	</div>		
*
* **update**
* 2013-11-12 9:11:39 by liuwei1
*
*/

;(function($, undefined) {
	$.ui.define('ceilinglamp', {
		 options: {
			arrive:null,
			arriveThreshold:0,
			hasWrap:false,//是否有外层wrap结构,false:添加wrap结构，true：不添加wrap结构
			hasStyle:false,//是否有样式，false添加样式，true不添加样式
			currentClassName:'ui-ceilinglamp-current',
			threshold:'auto',//显示或消失时阀值，默认'auto'等于操作节点的高度outerHeight(true)
			zIndex:100,
			top:0,
			align:null,//显示视角控制 支持 top、bottom
			scrollDelay:50, //页面滚动时，节流延迟时间 毫秒
			onShow:null,//显示时回调
			onHide:null//隐藏时回调
		},
		isShow:false,
		isPlay:false,
		init:function(){
			var self = this;
			self.offsetTop = self.el.offset().top;

			self.insert();
			self.showInit();
			self.bind();
		},
		insert:function(){
			var self = this;
			var opts = self.options;
			//如果dom.ready前后宽度有变化,值会取错,所以宽度交给css来控制
			//self.el.css({
			//	width: self.el.width(),
			//	height: self.el.height()
			//});

			if ( !opts.hasWrap ) {
				var wrap = 'ui-ceilinglamp-'+self.guid;
				self.el.wrap('<div class="'+wrap+'" style="width:'+self.el.outerWidth()+'px;height:'+self.el.outerHeight(true)+'px;"></div>');
				self.eleWrap = $('.'+wrap);
			}

			if ( opts.threshold == 'auto' ) {
				opts.threshold = self.el.outerHeight(true);
			}else
			if ( isNaN(parseInt(opts.threshold)) ) {
				opts.threshold = 0;
			}
			self.currentClass = opts.currentClassName;

			if ( !opts.hasStyle ) {
				var zIndex = opts.zIndex;
				var top = opts.top - parseInt(self.el.css('marginTop'), 10);

				var styles = "." + self.currentClass+"{position:fixed;top:"+top+"px;z-index:"+zIndex+"}";

				//IE6
				if ($.browser.isIE6()) {
					styles = "." + self.currentClass+"{position:absolute;z-index:"+zIndex+";top:expression(eval((document.documentElement||document.body).scrollTop+" + top + ") + 'px')}";
					//防止抖动
					$('html').eq(0).css('text-overflow', 'ellipsis');
				}
				//便于对IE6的处理
				self.insertStyles(styles);
			}
		},
		insertStyles:function(cssString){
			var doc = document,
			heads = doc.getElementsByTagName("head"),
			style = doc.createElement("style");

			style.setAttribute("type", "text/css");
			if (style.styleSheet) {
				style.styleSheet.cssText = cssString;
			} else {
				var cssText = doc.createTextNode(cssString);
				style.appendChild(cssText);
			}

			if (heads.length) {
				heads[0].appendChild(style);
			}
		},
		show:function(){
			var self = this;
			var opts = self.options;
			var hasShow = self.el.hasClass(self.currentClass);

			if ( !hasShow ) {
				self.el.addClass(self.currentClass);
				if ($.browser.isIE6()) {
					self.el.css({position:'absolute'});
				}

				if ( $.isFunction( opts.onShow )) {
					opts.onShow.call(self, self.el);
				}

				self.isShow = true;
			}

			//到达时处理
			if ( opts.arrive ) {
				var scrollTop = $(document).scrollTop();
				var arriveTop = opts.arrive.offset().top;
				if (scrollTop >= (arriveTop + opts.arriveThreshold) ) {
					var top = arriveTop - self.offsetTop + opts.arriveThreshold;
					self.el.css({
						position:'absolute',
						top:top
					});
				}else {
					if ($.browser.isIE6()){
						self.el.css({
							position:'absolute',
							top:scrollTop - self.offsetTop
						});
					}else {
						self.el[0].style.position='';
						self.el[0].style.top='';
					}
				}
			}

			//fix ie8- 在执行完onScroll后再执行onResize
			setTimeout(function(){self.isPlay = false;}, 10);
		},
		hide:function(){
			var self = this;
			var opts = self.options;
			var hasShow = self.el.hasClass(self.currentClass);

			if ( hasShow ) {
				self.isShow = false;
				self.el.removeClass(self.currentClass);
				//IE6 bug 会有top值,强制处理下
				if ( $.browser.isIE6() ) {
					self.el.css({position:'static'});
				}

				if ( $.isFunction( opts.onHide )) {
					opts.onHide.call(self, self.el);
				}
			}
		},
		showInit:function(){
			var self = this;
			var opts = self.options;
			var scrollTop = $(document).scrollTop();

			//当前元素上面如果有元素高度变化时offsetTop会有变化,需要初始化下
			if ( !self.el.hasClass(self.currentClass) ) {
				self.offsetTop = self.el.offset().top + opts.threshold;
			}
			if ( scrollTop > self.offsetTop ){
				self.show();
			}else{
				self.hide();
			}
		},
		onScroll: function(){
			var self = this;
			var opts = self.options;

			if ( opts.align != null ) {
				var scrollTop = $(document).scrollTop();
				var oldScrollTop = self.oldScrollTop;
				var align = oldScrollTop > scrollTop ? 'top' : 'bottom';
				if ( opts.align == align ) {
					self.showInit();
				} else {
					self.hide();
				}
				//fix ie6
				setTimeout(function(){self.oldScrollTop = scrollTop;},1);
			} else {
				self.showInit();
			}
		},
		bind:function(){
			var self = this;
			var opts = self.options;
			var thread = -1;
			self.oldScrollTop = $(document).scrollTop();

			$(window).scroll(function(){
				if ( !self.isShow ) {
					clearTimeout(thread);
					thread = setTimeout(function(){
						self.isPlay = true;
						self.onScroll();
					}, opts.scrollDelay);
				} else {
					self.isPlay = true;
					self.onScroll();
				}
			});

			$(window).resize(function(){
				if ( !self.isPlay ) {
					self.onScroll();
				}
			});
		}
	});
})(jQuery);