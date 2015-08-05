/**
*####返回顶部####
* 
***Demo**
* [gotop](../ui/gotop/1.0.0/example/gotop.html "Demo")
*
***参数**
*
*  - `gotopClass` {String} null gotop按钮样式class，用于绑定执行gotop事件，如果不设置则指向当前对象
*  - `hasAnimate` {Boolse} false 滚动时是否有动画
*  - `delay` {Number} 500 滚动带动画延时时间
*  - `scrollTop` {Number} 50  滚动条高度达到此高度时显示
*
***举例**
* 
*	$('#gotop').gotop();
*
* **update**
* 2013-10-15 20:32:35 by liuwei1
*
*/

;(function($, undefined) {
	$.ui.define('gotop', {
		 options: {
			gotopClass:null,//gotop按钮样式class，用于绑定执行gotop事件，如果不设置则指向当前对象
			hasAnimate:false,//滚动时是否有动画
			delay:500,//滚动带动画延时时间
			scrollTop:50//滚动条高度达到此高度时显示
        },
		 /**
         * 显示
         * @method show
         */
		show:function(){
			this.el.show(); 
		},
		 /**
         * 关闭
         * @method hide
         */
		hide:function(){
			this.el.hide(); 
		},
		smartShow: function(){
			var self = this;
			var opts = this.options;
			var scrollTop = $(document).scrollTop();
			if ( scrollTop > opts.scrollTop ) {
				self.show();
			} else {
				self.hide();
			}
		},
		bind:function(){
			var self = this;
			var opts = this.options;
			var showTag = true;
			var windowScrollThread = -1;
			var goTop = this.el;
			if ( opts.gotopClass && $('.'+opts.gotopClass, this.el).length > 0 ) {
				goTop = $('.'+opts.gotopClass, this.el);
			}
			goTop.bind('click',function(){
				self.hide();
				if (opts.hasAnimate) {
					showTag = false;
					$('html,body').animate({
						scrollTop:0
					},opts.delay,null,function(){
						 showTag = true;
					});
				}else {
					$(document).scrollTop(0);
				}
			});

			$(window).scroll(function(){
				clearTimeout(windowScrollThread);
				windowScrollThread = setTimeout(function(){
					if (showTag) {
						self.smartShow();
					}
				}, 100);
			});
		},
		init:function(){
			this.bind();
			this.smartShow();
		}
	});
})(jQuery);