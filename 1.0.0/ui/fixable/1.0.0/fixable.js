/**
*####fixable固定位置####
* 
*可以使用元素固定在页面任意位置,并且位置不随滚动条滚动而改变
*兼容IE6的postion:fixed
*
***Demo**
* [fixable](../ui/fixable/1.0.0/example/fixable.html "Demo")
*
***参数**
*
*  - 	`context` {$jquery对象} null 相对上下文环境，默认为null，指向window窗口
*  - 	`delay` {Number}  50 	延迟时间，如果窗口发生变化，则自动更新坐标（目前只支持window大小变化）
*  - 	`x` {String}  'left'    左右
*  - 	`y` {String}   'top'    底尾部
*  - 	`xValue` {Number}  0   左右偏移值,center时为距中
*  - 	`yValue` {Number} 0   底尾部偏移值,center时为距中
*  - 	`zIndex` {Number} null   z-index
*
* core/browser.js , core/extend.js
*
***举例**
* 
*html部分
*	
*	<div class="ui-fixable" id="fixable">
*		fixable
*	</div>		
*
*js部分
*
*	$('#fixable').fixable({
*		x:'right', 
*		y:'bottom',
*		xValue:0,
*		yValue:0
*	})
* 
* **update**
* 2013-11-12 9:11:39 by liuwei1
*
*/

;(function($, undefined) {

	var windowList = [];
	function fixableGPS(self){
		//var opts = self.options;
		//if ( opts.context && opts.context != $(window) ) {
		//	runGpsMonitor(self, opts.context, opts.delay);
		//}
		windowList.push(self);
	}

	$(window).bind('resize', function() {
		$.each(windowList, function(i, fixable){
			fixable.onResize();
		});
	});

	//function runGpsMonitor(self, context, delay){
	//	var getXYWH = function(){
	//		return [
	//			context.css('left'),
	//			context.css('right'),
	//			context.css('top'),
	//			context.css('bottom'),
	//			context.css('width'),
	//			context.css('height')
	//		];
	//	};
	//	var old = getXYWH().join('');
	//	setInterval(function(){
	//		var _new = getXYWH().join('');
	//		if ( _new != old ) {
	//			convertPosition.call(self);
	//			old = _new;
	//		}
	//	}, delay);
	//}

	function offsetContext(xValue, yValue){
		var ele = this.el;
		var opts = this.options;
		var context = opts.context;
		var x = context.offset().left;
		var y = context.offset().top;
		var w = context.outerWidth();
		var h = context.outerHeight();
		var cw = $.page.clientWidth();
		var ch = $.page.clientHeight();

		var offset = {xValue:xValue, yValue:yValue};
		if ( opts.x == 'left') {
			if ( opts.xValue == 'center' ) {
				offset.xValue = ((w / 100) * 50) - (ele.outerWidth() / 2);
			} else
			if ( (''+xValue).indexOf('%') != -1 ) {
				offset.xValue = (w / 100) * parseInt(xValue);
			}
			offset.xValue += x;
		} else
		if ( opts.x == 'right') {
			if ( opts.xValue == 'center' ) {
				offset.xValue = ((w / 100) * 50) - (ele.outerWidth() / 2);
			}else
			if ( (''+xValue).indexOf('%') != -1 ) {
				offset.xValue = (w / 100) * parseInt(xValue);
			}
			offset.xValue += cw - (x+w);
		}

		//如果参考的环境高度大于窗口，则用窗口高度来计算
		var _ch = y + h > ch ? ch : h;

		if ( opts.y == 'top' ) {
			if ( opts.yValue == 'center' ) {
				offset.yValue = ((_ch / 100) * 50) - (ele.outerHeight() / 2);
			}else
			if ( (''+yValue).indexOf('%') != -1 ) {
				offset.yValue = (_ch / 100) * parseInt(yValue);
			}
			if ( y + h < ch ) {
				offset.yValue += y;
			}
		} else
		if ( opts.y == 'bottom') {
			if ( opts.yValue == 'center' ) {
				offset.yValue = ((_ch / 100) * 50) - (ele.outerHeight() / 2);
			}else
			if ( (''+yValue).indexOf('%') != -1 ) {
				offset.yValue = (_ch / 100) * parseInt(yValue);
			}

			//参照环境的Y+高度小于窗体时，处理
			if ( y + h < ch ) {
				offset.yValue += ch - (y + h);
			}
		}

		return offset;
	}

	function convertPosition(){
		var ele = this.el;
		var opts = this.options;
		var isLowBroswer = $.browser.isIE6();
		var currentStyle = {};
		var context = opts.context;
		var xValue = opts.xValue;
		var yValue = opts.yValue;

		if (xValue == 'center'){
			var w = ele.outerWidth() / 2 ;
			if (isLowBroswer){
				xValue = $.page.clientWidth() / 2 - w;
			}else{
				if (!context){
					currentStyle.marginLeft = - w;
				}
				xValue = '50%';
			}
		}

		if (yValue == 'center'){
			var h = ele.outerHeight() / 2;
			if (isLowBroswer){
				yValue = $.page.clientHeight() / 2 - h;
			}else{
				if (!context) {
					currentStyle.marginTop = -h;
				}
				yValue = '50%';
			}
		}

		if ( context ) {
			var offset = offsetContext.call(this, xValue, yValue);
			xValue = offset.xValue;
			yValue = offset.yValue;
		}

		if (isLowBroswer){
			currentStyle.position = 'absolute' ;

			if ( (''+xValue).indexOf('%') != -1 ) {
				xValue = ($.page.clientWidth() / 100) * parseInt(xValue);
			}
			if ( (''+yValue).indexOf('%') != -1 ) {
				yValue = ($.page.clientHeight() / 100) * parseInt(yValue);
			}

			//设置为1 ，为0时会出现无限拖
			if ( xValue < 0 ) xValue = 1;
			if ( yValue < 0 ) yValue = 1;

			if (opts.y == 'top'){
				ele[0].style.setExpression("top", "eval((document.documentElement||document.body).scrollTop+" + yValue + ") + 'px'");
			}

			if (opts.y == 'bottom'){
				ele[0].style.setExpression("top", "eval((document.documentElement||document.body).scrollTop+ "+ - yValue + " + (document.documentElement||document.body).clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0))+'px'");
			}

			if (opts.x == 'left'){
				ele[0].style.setExpression("left", "eval((document.documentElement||document.body).scrollLeft+" + xValue + ") + 'px'");
			}

			if (opts.x == 'right'){
				ele[0].style.setExpression("left", "(eval((document.documentElement||document.body).scrollLeft + "+ - xValue + " + (document.documentElement||document.body).clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0)) + 'px'");
			}
			//防止抖动
			$('html').eq(0).css('text-overflow', 'ellipsis');
		} else {
			currentStyle.position = 'fixed' ;
			currentStyle[opts.x] = xValue;
			currentStyle[opts.y] = yValue;
		}

		ele.css(currentStyle);

	}

	$.ui.define('fixable', {
		 options: {
			context:null,//相对环境
			delay:50,	//如果窗口发生变化，则自动列新坐标（目前只支持window大小变化）
			x:'left', //左右
			y:'top', //底尾部
			xValue:0 , //左右偏移值,center时为距中
			yValue:0,  //底尾部偏移值,center时为距中
		    zIndex:null// z-index
		},
		resizeThread: -1,
		init:function(){
			var self = this;
			var ele = self.el;
			var opts = self.options;
			if ( opts.zIndex != null ) {
				ele.css('z-index', opts.zIndex);
			}

			//防止指定的context不存在
			if ( opts.context && opts.context.length == 0 ) {
				opts.context = null;
			}

			//调整坐标
			convertPosition.call(self);

			//窗口变化时，自动调整坐标
			if ( self.options.delay >= 0 ) {
				fixableGPS(self);
			}
		},
		onResize:function(){
			var self = this;
			var opts = self.options;
			clearTimeout(self.resizeThread);
			self.resizeThread = setTimeout(function(){
				convertPosition.call(self);
			}, opts.delay);
		}
	});
})(jQuery);