/**
*####下拉菜单####
* 
***Demo**
* [dropdown](../ui/dropdown/1.0.0/example/dropdown.html "Demo")
*
***参数**
*
*  - `item` {String}  'ui-dropdown-item'  菜单className
*  - `trigger` {Boolse} false 
*  - `current`{String}  "ui-dropdown-hover"  菜单选中加的样式
*  - `bodyClass` {String}  'ui-dropdown-bd'  菜单主体class
*  - `subBodyClass` {String} 'ui-dropdown-sub'  菜单主体class
*  - `topspeed` {Boolean} false  极速模式
*  - `boundary` {Number} 10  边界值
*  - `enterDelay` {Number}  0  菜单进入时delay
*  - `leaveDelay`{Number}  0  菜单移除后delay
*  - `zIndex` {Number} 1000  菜单主体zindex
*  - `align` {String} 'bottom'  下面或者右侧
*  - `left` {Number} null  菜单主体left
*  - `top` {Number} null  菜单主体top
*  - `submenuLeft` {Number} 0  二级菜单距主体left
*  - `submenuTop` {Number}  0二级菜单距主体top
*  - `onchange` {Function} null 触发时回调
*  - `onmouseleave` {Function} null 离开时回调
*
***举例**
*html部分
* 
*	<div class="ui-dropdown clearfix" id="dropdown">
*		<ul>
*			<li class="ui-dropdown-item">
*				<a href="#">我的订单 </a> | 
*			</li>
*			<li class="ui-dropdown-item">
*				<a href="#">我的手机</a> | 
*			</li>
*			<li class="ui-dropdown-item">
*				<div class="ui-dropdown-hd">客户服务 ^</div>
*				<div class="ui-dropdown-bd">
*					<ul>
*						<li><a href="#" target="_blank"> 帮助中心 </a></li>
*						<li><a href="#" target="_blank"> 售后服务</a> </li>
*						<li><a href="#" target="_blank"> 在线客服</a> </li>
*					</ul>
*				</div>
*			</li>
*		</ul>
*	</div>
* 
* js部分
*
*	$('#dropdown').dropdown();
*
* **update**
* 2013-10-21 17:31:29 by liuwei1
*
*/
;(function($, undefined) {
	$.ui.define('dropdown', {
		 options: {
			hasCssLink:false,
			baseVersion:'1.0.0',
			cssLinkVersion:'1.0.0',
			item:'ui-dropdown-item',//菜单className
			trigger:false,
			current:"ui-dropdown-hover",//菜单选中加的样式
			bodyClass:'ui-dropdown-bd',//菜单主体class
			subBodyClass:'ui-dropdown-sub',//菜单主体class
			topspeed:false,//极速模式
			boundary:10,//边界值
			enterDelay:0,//菜单进入时delay
			leaveDelay:0,//菜单移除后delay
			zIndex:1000,//菜单主体zindex
			align:'bottom',//下面或者右侧
			left:null,//菜单主体left
			top:null,//菜单主体top
			submenuLeft:0,//二级菜单距主体left
			submenuTop:0,//二级菜单距主体top
			onchange:null,//触发时回调
			onmouseleave:null//离开时回调
        },
		init:function(){
			this.mouseLocs = [];
			this.lastDelayLoc = null; 
			this.create();
			this.bind();
		},
		create:function(){
			var opts = this.options;
			if (opts.trigger) {
				this.item = this.el;
			}else {
				this.item = this.el.find('.'+opts.item);
			}

			//this.item.css({position:'relative'});

			this.body = this.el.find('.'+opts.bodyClass);
			var topOrigin = opts.top;
			var leftOrigin = opts.left;
			if (opts.align == 'bottom') {
				if (opts.top == null) {
					opts.top = this.item.outerHeight();
				}
			}
			
			if (opts.align == 'right') {
				opts.top = 0;
				if (opts.left == null) {
					opts.left = this.item.outerWidth();
				}
			}
			
			if (topOrigin != null || leftOrigin != null) {
				this.body.css({
					position:'absolute',
					top:opts.top,
					left:opts.left,
					zIndex:opts.zIndex
				})
			}

			this.el.find('.'+opts.subBodyClass).css({
				//position:'relative',
				zIndex:opts.zIndex+1
			});
			this.bodyOuterWidth = this.body.outerWidth();
			this.bodyBorderWidth = 2*( this.getStyle(this.body[0],'borderWidth'));
		},
		bind:function(){
			var self = this;
			var opts = this.options;

			var showTag = false;
			var dropdownTimer,enterTimer; 
			var mouseLocsLength = 3;
		
			var currentItem = null;
			var delayItem = null;

            //防止内容更新时产生事件反复执行
            var isOpen = false;

			//主体绑定
			this.el.bind('mouseenter',function(){
				clearTimeout(dropdownTimer);
			});
			
			this.el.bind('mouseleave',function(){
				if (showTag){
					dropdownTimer = setTimeout(function(){
						self.removeClass();
					},opts.leaveDelay);
				}

				if (opts.onmouseleave) {
					opts.onmouseleave($(this));
				}
				currentItem = null;
			});

			//item绑定
			this.item.bind('mouseenter',function(){
                if ( isOpen ) {
                    return false;
                }
                var $this = $(this);

                var trigger = function(){
                    isOpen = true;
                    currentItem = $this.index();
                    self.removeClass();
                    $this.addClass(opts.current);

                    showTag = true;
                    if( opts.onchange ) {
                        opts.onchange($this);
                    }
                };

                enterTimer = setTimeout(function(){
                    if ( self.topspeed($this) == 0 ) {
                        trigger();
                        clearTimeout(delayItem);
                    }
                }, opts.enterDelay);
				
				//极速模式
				if (opts.topspeed){
					delayItem = setTimeout(function(){
						if (currentItem != $this.index()) {
							trigger();
						}
					},700)
				}
			});

			this.item.bind('mouseleave',function(){
				clearTimeout(enterTimer);
				clearTimeout(delayItem);
                isOpen = false;
			});
			
			//二级菜单绑定
			this.el.find('.'+opts.subBodyClass).bind('mouseenter',function(){
				var left = self.bodyOuterWidth - self.bodyBorderWidth + opts.submenuLeft;
				var padding = self.getStyle($(this)[0],'paddingLeft');
				left = $.browser.isIE6() ? left - padding : left;
				var top = 0 + opts.submenuTop;
				$(this).find('.' + opts.bodyClass).show().css({
					left:left,
					top:top
				});
			}).bind('mouseleave',function(){
				$(this).find('.' + opts.bodyClass).hide();
			});

			if (opts.topspeed){
				 $(document).mousemove(function(e){
					self.mouseLocs.push({x: e.pageX, y: e.pageY});
					if (self.mouseLocs.length > mouseLocsLength) {
						self.mouseLocs.shift();
					}
				 });
			}
		},
		removeClass:function(){
			 this.item.removeClass(this.options.current);
		},
		//取得元素的style
		getStyle:function(obj,type){
			if(!obj) {return};
			var b = window.getComputedStyle ? window.getComputedStyle(obj,null)[type] : obj.currentStyle[type];
			b = parseInt(b);
			if (!b) { b = 0;}
			return b;
		},
		/**
		* 极速模式
		* @method topspeed
		*/
		topspeed:function(){
			var opts = this.options;
			if (!opts.topspeed){
				return 0;	
			}
			
			var o = this.el;
			var offset = o.offset(),
			upperLeft = {
				x: offset.left,
				y: offset.top 
			},
			upperRight = {
				x: offset.left + o.outerWidth(),
				y: upperLeft.y
			},
			lowerLeft = {
				x: offset.left,
				y: offset.top + o.outerHeight()
			},
			lowerRight = {
				x: offset.left + o.outerWidth(),
				y: lowerLeft.y
			}
			loc = this.mouseLocs[this.mouseLocs.length - 1],
			prevLoc = this.mouseLocs[0];

			if (!loc) {
				return 0;
			}

			if (!prevLoc) {
				prevLoc = loc;
			}

			if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x ||
				prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
				return 0;
			}

			if (this.lastDelayLoc && loc.x == this.lastDelayLoc.x && loc.y == this.lastDelayLoc.y) {
				return 0;
			}

			//求倾斜率
			function slope(a, b) {
				return (b.y - a.y) / (b.x - a.x);
			}

			var decreasingCorner = upperRight,
				increasingCorner = lowerRight;

			 var	decreasingSlope = slope(loc, decreasingCorner),
					prevDecreasingSlope = slope(prevLoc, decreasingCorner),
					
					increasingSlope = slope(loc, increasingCorner),
					prevIncreasingSlope = slope(prevLoc, increasingCorner);

			if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
			    if ( (prevLoc.x-upperLeft.x) < opts.boundary){
					return 0;
				}
				this.lastDelayLoc = loc;
				return 300;
			}

			this.lastDelayLoc = null;
			return 0;			 
		}
	});
})(jQuery);