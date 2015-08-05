/**
*####拖拽组件####
* 
* 拖拽的最简实现,可以锁定X,Y,拖动开始,拖动中,拖动结束时可加回调函数
* 拖动时加样式ui-drag-selected,回调中含有当前元素的top,left
* 
***Demo**
* [drag](../ui/drag/1.0.0/example/drag.html "Demo")
*
***参数**
*
*  - 	`lockX` {Boolse} false   锁定X
*  - 	`lockY`{Boolse}  false   锁定Y
*  - 	`start`  {Function}  null   开始拖动回调
*  - 	`drag`  {Function}  null   拖动中回调 返回left,top
*  - 	`end`   {Function} null   结束拖动回调
*  - 	`minLeft` {Number} null   left的最小值
*  - 	`maxLeft` {Number} null   left的最大值
*  - 	`minTop` {Number} null   top的最小值
*  - 	`maxTop` {Number} null top的最大值
*  - 	`dragMainClass` {String} '' 要拖动的主元素,默认为主体元素
*  - 	`dragClass` {String} null 'ui-drag-selected' 拖动时加的class
*  - 	`hasCursor` {Boolse} false 拖动元素加拖动手型
*  - 	`autoStart,` {Boolse} true
*  - 	`autoStartEvent,` {Boolse} null
*
***举例**
* 
*js部分
*
*	$('#drag').drag({
*		lockX:true,
*		minTop:0,
*		maxTop: 30,
*		drag:function(data){
*			//console.log(data.top+','+data.left+','+data.topDirection+','+data.leftDirection)
*		}
*	});
* 
*html部分
*	
*	<div class="ui-drag" id="drag">
*		drag
*	</div>		
*
* **update**
* 2013-11-13 11:11:00 by liuwei1
*
*/

;(function($, undefined) {
	$.ui.define('drag', {
		 options: {
			lockX : false,//锁定X
			lockY : false,//锁定Y
			start : null,//开始拖动回调
			drag : null,//拖动中回调 返回left,top
			end : null,//结束拖动回调
			minLeft:null,//left的最小值
			maxLeft:null,//left的最大值
			minTop:null,//top的最小值
			maxTop:null,//top的最大值
			dragMainClass:'',//要拖动的主元素,默认为主体元素
			dragClass:'ui-drag-selected',//拖动时加的class
			hasCursor:false,//主体元素加拖动手型
			autoStart:true,
			autoStartEvent:null
		},
		init:function(){
			var opts = this.options;
			this.styleInit(opts.autoStartEvent);
			if (opts.autoStart) {
				this.bind();
			}else {
				//this.el.css({position:'absolute'});
				this.mousedown(opts.autoStartEvent);
			}
			
			if (opts.hasCursor) {
				var el = opts.dragMainClass == '' ? this.el : this.el.find('.'+opts.dragMainClass);
				el.css({cursor:'move'})
			}
		},
		bind:function(){
			var self = this;
			var opts = this.options;
			this.el.bind('mousedown',function(event){
				if (opts.dragMainClass != '') {
					if (!( 
						$.contains($('.'+opts.dragMainClass)[0],event.target) 
						|| $(event.target).is('.'+opts.dragMainClass) 
					)){
						return;
					}
				}
				self.mousedown(event);
			});
		},
		styleInit:function(offset){
			var style = {
				position:'absolute'
			};
			 if(this.el.css('top') == 'auto') style.top = 0;
			 if(this.el.css('left') == 'auto') style.left = 0;

			if (offset) {
				style.top = offset.top;
				style.left = offset.left;
			}

			 this.el.css(style);
		},
		/**
         * mousedown
         * @method mousedown
         */
		mousedown:function(event){
			var self = this;
			var opts = this.options;
			var el = this.el;
			el.addClass(opts.dragClass);
		
			this.x = event.clientX;
			this.y = event.clientY;

			this.left = parseInt( el.css('left'));
			this.top = parseInt( el.css('top'));

			$(document).bind('mousemove',function(event){
				self.mousemove(event); 
			})

			if(opts.start != null) opts.start.call();
			if (event.preventDefault) {
				event.preventDefault();
			}
		},
		/**
         * mousemove
         * @method mousemove
         */
        //endOnce:true,
		mousemove:function(event){
			var me = this;
			var opts = this.options;
			var el = this.el;
			var dragCallbackTag = true;
			// topDirection <0向下 >0向上 ;leftDirection <0向右 >0向左
			var topDirection,leftDirection;

			var top,left;
			if (!opts.lockY){
				top = this.top + ( event.clientY - this.y);
				if (opts.minTop != null && top < opts.minTop){ top = opts.minTop; }
				if (opts.maxTop != null && top > opts.maxTop){ top = opts.maxTop;}
				topDirection = parseInt( el.css('top')) -  top;
				if (topDirection===0 && top == opts.minTop) {topDirection=1;}
				if (topDirection===0 && top == opts.maxTop) {topDirection=-1;}
				el.css({top:top});
			}

			if (!opts.lockX){
				left = this.left + ( event.clientX - this.x);
				if (opts.minLeft != null && left < opts.minLeft){ left = opts.minLeft; dragCallbackTag = false;}
				if (opts.maxLeft != null && left > opts.maxLeft){ left = opts.maxLeft; dragCallbackTag = false;}
				leftDirection = parseInt( el.css('left')) - left;
				if (leftDirection===0 && left == opts.minLeft) {leftDirection=1;}
				if (leftDirection===0 && left == opts.maxLeft) {leftDirection=-1;}
				el.css({left:left})
			}

			var arg = {};
			arg.left = left;
			arg.top = top;
			arg.topDirection = topDirection;
			arg.leftDirection = leftDirection;

			if (dragCallbackTag) {
				if(opts.drag != null) opts.drag.call(null,arg);
			}

			$(document).bind('mouseup',function(event){
				// if(me.endOnce){
					$(document).unbind('mousemove');
					el.removeClass(opts.dragClass);
					if(opts.end != null) opts.end.call(null);
					//me.endOnce = false;
				// }	
			})

			event.preventDefault();
		}
	});
})(jQuery);