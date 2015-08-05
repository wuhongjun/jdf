/**
*####accordion####
* 
***Demo**
* [accordion](../ui/accordion/1.0.0/example/accordion.html "Demo")
*
***参数**
*
*  - `itemClass` {String}  'ui-accordion-item'  item的className
*  - `mainClass` {String}  'ui-accordion-main'  主体的className
*  - `mainSelectedClass` {String}  'ui-accordion-selected'  主体选中时className
*  - `defaultSelected` {Number}  null  默认展开项
*  - `leaveSelected` {Number} -1 鼠标从手风琴移走时，默认展开的页面。指定从0开始的页面下标值即可。
*  - `widthDefault` {Number}  0  item默认宽度
*  - `widthCurrent` {Number}  0  当前选中的item宽度
*  - `speed`  350 {Number}  动画速度值
*  - `easing` {String}  'swing' 动画函数
*  - `type` {String}  null 布局是否是绝对定位
*  - `zIndex` {String}  1
*  - `isLeaveKeep` {Boolean}  鼠标离开时是否保持当前选中的节点
*  - `onSelect` {Function}  选中回调
*
***举例**
* 
*	$('#accordion').accordion();
*
* **update**
* 2015-04-09 09:41:00 by chenxiaochun
* 鼠标从手风琴移走时，可以默认展开一个页面
* 解决item加边框宽度不准确的问题
* 
* 2014-2-18 13:52:34 by liuwei1
*
*/
;(function($, undefined) {
	$.ui.define('accordion', {
		options: {
			itemClass:'ui-accordion-item',//item的className
			mainClass:'ui-accordion-main',//主体的className
			mainSelectedClass:'ui-accordion-selected',//主体选中时className
			defaultSelected:null,//默认展开项
			leaveSelected: -1,//鼠标移走时，默认展开的页面
			widthDefault:0,//item默认宽度
			widthCurrent:0,//当前选中的item宽度
			speed:350,//动画速度值
			easing:'swing',//动画函数
			type:null,//布局是否是绝对定位
			zIndex:1,
			isLeaveKeep:false,//鼠标离开时是否保持当前选中的节点
			onSelect: null//选中回调

        },
		init:function(){
			var self = this;
			var opts = self.options;
			self.el.css({overflow:'hidden'});
			self.item = self.el.find('.'+opts.itemClass);
			self.itemLast = self.item.eq(self.item.size()-1);

			var borderWidth = parseInt(self.item.css('border-left-width')) + parseInt(self.item.css('border-right-width'));

			if(isNaN(borderWidth)){
				borderWidth = 0;
			}
			var widthNotCurrent = 0;

			var size = self.item.size();
			var minSize = Math.ceil(opts.widthCurrent/opts.widthDefault);
			if ( opts.isLeaveKeep && size < minSize ) { //原来的逻辑太不严谨了，所以此次修改只针对新功能
				self.el.find('.'+opts.mainClass).css({width:opts.widthDefault*(minSize+1)});
				self.item.css({width:opts.widthDefault, overflow: 'hidden'});
				widthNotCurrent = self.widthNotCurrent = ( opts.widthDefault*(minSize) - opts.widthCurrent) / (minSize-1) - borderWidth;
				self.el.css({width:(opts.widthDefault+borderWidth)*minSize-((minSize-size)*widthNotCurrent)});
			} else {
				self.el.css({width:(opts.widthDefault+borderWidth)*self.item.size()});
				self.el.find('.'+opts.mainClass).css({width:opts.widthDefault*(self.item.size()+1)});
				self.item.css({width:opts.widthDefault, overflow: 'hidden'});
				widthNotCurrent = self.widthNotCurrent = ( opts.widthDefault*(self.item.size()) - opts.widthCurrent) / (self.item.size()-1) - borderWidth;
			}

			if(opts.type == null){
				self.bind();
				if(opts.defaultSelected != null){
					self.item.css('width', widthNotCurrent);
					self.item.eq(opts.defaultSelected).addClass(opts.mainSelectedClass).css('width',opts.widthCurrent);
				}
			}

			if(opts.type == "absolute"){
				self.item.css({position:"absolute"});
				self.bindAbsolute();
				var nextLeft = 0;
				var curWidth = 0;
				$.each(self.item,function(i){
					var _this = $( this );
					_this.css({left:nextLeft,zIndex:opts.zIndex+i});

					if ( opts.defaultSelected  == i ) {
						curWidth = opts.widthCurrent;
					} else {
						curWidth = widthNotCurrent;
					}
					nextLeft += curWidth;
				});

				self.item.eq(opts.defaultSelected).css('width',opts.widthCurrent);
			}

			if ($.isFunction(opts.onSelect) && opts.defaultSelected != null){
				opts.onSelect.call(self, self.item.eq(opts.defaultSelected));
			}
			self.currentIndex = opts.defaultSelected;
		},
		bind:function(){
			var self = this;
			var opts = self.options;
			var widthNotCurrent = self.widthNotCurrent;

			self.item.bind('mouseenter',function(){
				var _this = $(this);
				var width = widthNotCurrent;
				var index = self.item.index(_this);
				var isCall = self.currentIndex != index;
				$.each(self.item,function(i){
					if (i != index) {
						$(this).removeClass(opts.mainSelectedClass);
						$(this).stop(true).animate({width:width},opts.speed,opts.easing);
					}
				});

				_this.addClass(opts.mainSelectedClass);

				var borderWidth = +parseInt(self.item.css('border-left-width'))+parseInt(self.item.css('border-right-width'));
				if(isNaN(borderWidth)){
					borderWidth = 0;
				}
				_this.stop(true).animate({width:opts.widthCurrent+borderWidth},opts.speed,opts.easing,
				 function(){
					 self.currentIndex = index;
					 if (isCall && $.isFunction(opts.onSelect)){
						 opts.onSelect.call(self, _this);
					 }
				 });
			});

			if ( !opts.isLeaveKeep ) {
				self.el.bind('mouseleave', function(){
					var leaveSelected = opts.leaveSelected;
					if(leaveSelected > -1 ){
						self.item.eq(leaveSelected).trigger('mouseenter');
					}
				});

				self.item.bind('mouseleave',function(){
					self.item.stop(true).animate({width:opts.widthDefault},opts.speed,opts.easing);
				});
			}
		},
		bindAbsolute:function(){
			var self = this;
			var opts = self.options;
			var widthNotCurrent = self.widthNotCurrent;

			self.item.bind('mouseenter',function(){
				var _this = $(this);
				var index = self.item.index(_this);
				var isCall = self.currentIndex != index;
				var nextLeft = 0;
				var curWidth = 0;
				var curLeft = null;
				$.each(self.item,function(i){
					if ( i != index ) {
						$( this ).stop(true).animate({left:nextLeft},opts.speed,opts.easing);
					} else {
						curLeft = nextLeft;
					}

					if ( index == i ) {
						curWidth = opts.widthCurrent;
					} else {
						curWidth = widthNotCurrent;
					}
					nextLeft += curWidth;
				});

				_this.css('width',opts.widthCurrent).stop(true).animate({left:curLeft},opts.speed,opts.easing, function(){
					self.currentIndex = index;
					if (isCall && $.isFunction(opts.onSelect)){
						opts.onSelect.call(self, _this);
					}
				});
				_this.addClass(opts.mainSelectedClass);
			});

			if ( !opts.isLeaveKeep ) {
				self.item.bind('mouseleave', function () {
					$.each(self.item, function (i) {
						var left = (opts.widthDefault * i);
						$(this).stop(true).animate({left: left}, opts.speed, opts.easing);
					});
				});

				self.el.bind('mouseleave', function () {
					var leaveSelected = opts.leaveSelected;
					if (leaveSelected > -1) {
						self.item.eq(leaveSelected).trigger('mouseenter');
					}
				});
			}
		}
	});
})(jQuery);